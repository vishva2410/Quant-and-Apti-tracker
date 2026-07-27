import { useEffect, useCallback, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Flag, Clock, ChevronRight, Lightbulb, CheckCircle2, XCircle, Bookmark, Keyboard
} from 'lucide-react';
import { cn, formatTime, getDifficultyColor } from '@/lib/utils';
import { useQuizStore } from '@/stores/useQuizStore';
import { useTimerStore } from '@/stores/useTimerStore';
import { useProgressStore } from '@/stores/useProgressStore';
import { useReviewStore } from '@/stores/useReviewStore';
import { useSettingsStore } from '@/stores/useSettingsStore';
import { getQuestionsForSprint } from '@/data/questions';
import { TIMER_WARNING_THRESHOLD, TIMER_DANGER_THRESHOLD, TIMER_CRITICAL_THRESHOLD, SLOW_ANSWER_MULTIPLIER } from '@/config/constants';
import type { ReviewCategory } from '@/types';

export function SprintPage() {
  const { day, sprint } = useParams<{ day: string; sprint: string }>();
  const navigate = useNavigate();
  const dayNum = parseInt(day || '1');
  const sprintNum = parseInt(sprint || '1');

  const {
    questions, currentQuestionIndex, selectedAnswer, isAnswered, showExplanation,
    showHint, currentHintIndex, flaggedQuestions, answers,
    loadSprint, selectAnswer, submitAnswer, nextQuestion, toggleFlag, toggleHint,
    toggleExplanation, getCurrentQuestion, isLastQuestion,
  } = useQuizStore();

  const { timeRemaining, isRunning, timerType, startSprintTimer, tick, stop: stopTimer } = useTimerStore();
  const { submitAnswer: submitToProgress, completeSprint, startSprint } = useProgressStore();
  const { addToReview } = useReviewStore();
  const { showKeyboardShortcuts } = useSettingsStore();

  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [showCorrectAnimation, setShowCorrectAnimation] = useState<boolean | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentQuestion = getCurrentQuestion();

  useEffect(() => {
    const sprintQuestions = getQuestionsForSprint(dayNum, sprintNum);
    if (sprintQuestions.length > 0) {
      loadSprint(sprintQuestions);
      startSprint(dayNum, sprintNum);
      startSprintTimer();
      setQuestionStartTime(Date.now());
    }
  }, [dayNum, sprintNum]);

  useEffect(() => {
    if (isRunning && timerType === 'sprint') {
      timerRef.current = setInterval(() => tick(), 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRunning, timerType, tick]);

  useEffect(() => {
    if (timeRemaining <= 0 && timerType === 'sprint') handleCompleteSprint();
  }, [timeRemaining, timerType]);

  const handleSubmitAnswer = useCallback(() => {
    if (!currentQuestion || isAnswered || selectedAnswer === null) return;
    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
    submitAnswer();
    const answerRecord = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect: Array.isArray(currentQuestion.correctAnswer)
        ? JSON.stringify(selectedAnswer) === JSON.stringify(currentQuestion.correctAnswer)
        : selectedAnswer === currentQuestion.correctAnswer,
      timeSpent,
      isFlagged: flaggedQuestions.includes(currentQuestion.id),
      isSkipped: false,
    };
    setShowCorrectAnimation(answerRecord.isCorrect);
    setTimeout(() => setShowCorrectAnimation(null), 800);
    submitToProgress(dayNum, sprintNum, answerRecord);
    const reviewCategories: ReviewCategory[] = [];
    if (!answerRecord.isCorrect) reviewCategories.push('wrong');
    if (timeSpent > currentQuestion.expectedTimeSeconds * SLOW_ANSWER_MULTIPLIER) reviewCategories.push('slow');
    if (answerRecord.isFlagged) reviewCategories.push('flagged');
    if (reviewCategories.length > 0) addToReview(currentQuestion.id, reviewCategories);
  }, [currentQuestion, isAnswered, selectedAnswer, questionStartTime, flaggedQuestions, submitAnswer, submitToProgress, addToReview, dayNum, sprintNum]);

  const handleNext = useCallback(() => {
    if (isLastQuestion()) handleCompleteSprint();
    else { nextQuestion(); setQuestionStartTime(Date.now()); }
  }, [isLastQuestion, nextQuestion]);

  const handleCompleteSprint = useCallback(() => {
    stopTimer(); completeSprint(dayNum, sprintNum); navigate(`/results/${dayNum}/${sprintNum}`);
  }, [stopTimer, completeSprint, dayNum, sprintNum, navigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      switch (e.key) {
        case '1': case '2': case '3': case '4': case '5':
          if (!isAnswered && currentQuestion?.options) { const opt = currentQuestion.options[parseInt(e.key) - 1]; if (opt) selectAnswer(opt.id); } break;
        case 'Enter':
          if (!isAnswered && selectedAnswer !== null) handleSubmitAnswer(); else if (isAnswered) handleNext(); break;
        case ' ': e.preventDefault(); if (isAnswered) handleNext(); break;
        case 'f': if (currentQuestion) toggleFlag(); break;
        case 'h': toggleHint(); break;
        case 'e': if (isAnswered) toggleExplanation(); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, selectedAnswer, currentQuestion, handleSubmitAnswer, handleNext, selectAnswer, toggleFlag, toggleHint, toggleExplanation]);

  if (!currentQuestion) {
    return <div className="min-h-screen bg-[#09090B] flex items-center justify-center"><div className="text-zinc-500">Loading questions...</div></div>;
  }

  const timerColor = timeRemaining <= TIMER_CRITICAL_THRESHOLD ? 'text-red-500 timer-urgent'
    : timeRemaining <= TIMER_DANGER_THRESHOLD ? 'text-red-400'
    : timeRemaining <= TIMER_WARNING_THRESHOLD ? 'text-yellow-400 timer-warning' : 'text-zinc-300';

  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col">
      {/* Flash overlay */}
      <AnimatePresence>
        {showCorrectAnimation !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className={cn('fixed inset-0 z-50 pointer-events-none', showCorrectAnimation ? 'bg-emerald-500/5' : 'bg-red-500/5')} />
        )}
      </AnimatePresence>

      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-[#09090B]/95 backdrop-blur-sm border-b border-zinc-800/60">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className={cn('px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border', getDifficultyColor(currentQuestion.difficulty))}>
                {currentQuestion.difficulty}
              </span>
              <span className="text-xs text-zinc-500">{currentQuestion.topic}</span>
            </div>
            <div className={cn('flex items-center gap-1.5 font-mono text-lg font-bold tabular-nums', timerColor)}>
              <Clock size={16} /> {formatTime(timeRemaining)}
            </div>
            <div className="flex items-center gap-3">
              {currentQuestion.companyTags.slice(0, 1).map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 text-[10px] font-semibold border border-indigo-500/15">{tag}</span>
              ))}
              <span className="text-sm font-bold text-zinc-100">{currentQuestionIndex + 1}<span className="text-zinc-500">/{questions.length}</span></span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="flex items-center gap-1 mt-2">
            {questions.map((_, i) => (
              <div key={i} className={cn('flex-1 h-1 rounded-full transition-all duration-300',
                i < currentQuestionIndex && answers[i]?.isCorrect && 'bg-emerald-500',
                i < currentQuestionIndex && !answers[i]?.isCorrect && 'bg-red-500',
                i === currentQuestionIndex && 'bg-indigo-500',
                i > currentQuestionIndex && 'bg-zinc-800'
              )} />
            ))}
          </div>
        </div>
      </div>

      {/* Question area */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div key={currentQuestion.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
              
              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-zinc-100 leading-relaxed">{currentQuestion.content.text}</h2>
                {currentQuestion.content.code && (
                  <pre className="mt-4 p-4 rounded-xl bg-[#111113] border border-zinc-800/60 font-mono text-sm text-zinc-300 overflow-x-auto">{currentQuestion.content.code}</pre>
                )}
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === option.id;
                  const isCorrectOption = isAnswered && option.id === currentQuestion.correctAnswer;
                  const isWrongSelected = isAnswered && isSelected && option.id !== currentQuestion.correctAnswer;
                  return (
                    <motion.button key={option.id}
                      whileHover={!isAnswered ? { scale: 1.01 } : undefined}
                      whileTap={!isAnswered ? { scale: 0.99 } : undefined}
                      onClick={() => !isAnswered && selectAnswer(option.id)}
                      disabled={isAnswered}
                      className={cn(
                        'w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200',
                        !isAnswered && !isSelected && 'bg-[#111113] border-zinc-800/60 hover:border-indigo-500/30',
                        !isAnswered && isSelected && 'bg-indigo-500/10 border-indigo-500/40 accent-glow',
                        isCorrectOption && 'bg-emerald-500/10 border-emerald-500/40 correct-glow',
                        isWrongSelected && 'bg-red-500/10 border-red-500/40 wrong-glow',
                        isAnswered && !isCorrectOption && !isWrongSelected && 'opacity-40'
                      )}
                    >
                      <span className={cn('w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0',
                        !isAnswered && !isSelected && 'bg-zinc-800 text-zinc-400',
                        !isAnswered && isSelected && 'bg-indigo-600 text-white',
                        isCorrectOption && 'bg-emerald-500 text-white',
                        isWrongSelected && 'bg-red-500 text-white',
                        isAnswered && !isCorrectOption && !isWrongSelected && 'bg-zinc-800 text-zinc-600'
                      )}>
                        {showKeyboardShortcuts && !isAnswered ? (index + 1) : String.fromCharCode(65 + index)}
                      </span>
                      <span className="flex-1 text-zinc-100 text-base">{option.text}</span>
                      {isCorrectOption && <CheckCircle2 size={20} className="text-emerald-400 shrink-0" />}
                      {isWrongSelected && <XCircle size={20} className="text-red-400 shrink-0" />}
                    </motion.button>
                  );
                })}
              </div>

              {/* Hint */}
              <AnimatePresence>
                {showHint && currentQuestion.hints.length > 0 && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/15">
                    <div className="flex items-center gap-2 mb-1"><Lightbulb size={14} className="text-amber-400" /><span className="text-xs font-semibold text-amber-400">Hint</span></div>
                    <p className="text-sm text-zinc-300">{currentQuestion.hints[Math.min(currentHintIndex, currentQuestion.hints.length - 1)]}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Explanation */}
              <AnimatePresence>
                {isAnswered && showExplanation && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-4 space-y-3">
                    <div className="p-4 rounded-xl bg-[#111113] border border-zinc-800/60">
                      <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Solution</h4>
                      <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">{currentQuestion.explanation.detailed}</p>
                    </div>
                    {currentQuestion.explanation.shortTrick && (
                      <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
                        <h4 className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">⚡ Short Trick</h4>
                        <p className="text-sm text-zinc-300">{currentQuestion.explanation.shortTrick}</p>
                      </div>
                    )}
                    {currentQuestion.explanation.commonMistake && (
                      <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/15">
                        <h4 className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">⚠️ Common Mistake</h4>
                        <p className="text-sm text-zinc-300">{currentQuestion.explanation.commonMistake}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="sticky bottom-0 bg-[#09090B]/95 backdrop-blur-sm border-t border-zinc-800/60">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={toggleFlag} className={cn('p-2 rounded-lg border transition-all',
              flaggedQuestions.includes(currentQuestion.id) ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
            )} title="Flag (F)"><Flag size={16} /></button>
            <button onClick={toggleHint} className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-zinc-300 transition-all" title="Hint (H)"><Lightbulb size={16} /></button>
            {isAnswered && (
              <button onClick={toggleExplanation} className={cn('p-2 rounded-lg border transition-all',
                showExplanation ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
              )} title="Explanation (E)"><Bookmark size={16} /></button>
            )}
          </div>

          {showKeyboardShortcuts && (
            <div className="hidden md:flex items-center gap-1 text-[10px] text-zinc-600">
              <Keyboard size={12} /> <span>1-4 select · Enter submit · F flag · H hint</span>
            </div>
          )}

          <div>
            {!isAnswered ? (
              <button onClick={handleSubmitAnswer} disabled={selectedAnswer === null}
                className={cn('flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200',
                  selectedAnswer !== null ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20' : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                )}>Submit</button>
            ) : (
              <button onClick={handleNext}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-600/20">
                {isLastQuestion() ? 'Finish Sprint' : 'Next'} <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
