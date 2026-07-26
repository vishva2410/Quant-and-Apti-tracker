import { useEffect, useCallback, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Flag,
  Clock,
  ChevronRight,
  Lightbulb,
  Calculator,
  CheckCircle2,
  XCircle,
  Bookmark,
  Keyboard,
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
    questions,
    currentQuestionIndex,
    selectedAnswer,
    isAnswered,
    showExplanation,
    showHint,
    currentHintIndex,
    flaggedQuestions,
    answers,
    loadSprint,
    selectAnswer,
    submitAnswer,
    nextQuestion,
    toggleFlag,
    toggleHint,
    toggleExplanation,
    getCurrentQuestion,
    isLastQuestion,
  } = useQuizStore();

  const { timeRemaining, isRunning, timerType, startSprintTimer, tick, stop: stopTimer } = useTimerStore();
  const { submitAnswer: submitToProgress, completeSprint, startSprint } = useProgressStore();
  const { addToReview } = useReviewStore();
  const { showKeyboardShortcuts } = useSettingsStore();

  const [showCalc, setShowCalc] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [showCorrectAnimation, setShowCorrectAnimation] = useState<boolean | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentQuestion = getCurrentQuestion();

  // Load sprint questions
  useEffect(() => {
    const sprintQuestions = getQuestionsForSprint(dayNum, sprintNum);
    if (sprintQuestions.length > 0) {
      loadSprint(sprintQuestions);
      startSprint(dayNum, sprintNum);
      startSprintTimer();
      setQuestionStartTime(Date.now());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayNum, sprintNum]);

  // Timer tick
  useEffect(() => {
    if (isRunning && timerType === 'sprint') {
      timerRef.current = setInterval(() => {
        tick();
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, timerType, tick]);

  // Timer expired — auto-complete sprint
  useEffect(() => {
    if (timeRemaining <= 0 && timerType === 'sprint') {
      handleCompleteSprint();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRemaining, timerType]);

  const handleSubmitAnswer = useCallback(() => {
    if (!currentQuestion || isAnswered || selectedAnswer === null) return;

    const timeSpent = Math.round((Date.now() - questionStartTime) / 1000);
    submitAnswer();

    // Get the updated answer (last one in answers)
    const answerRecord = {
      questionId: currentQuestion.id,
      selectedAnswer: selectedAnswer,
      isCorrect: Array.isArray(currentQuestion.correctAnswer)
        ? JSON.stringify(selectedAnswer) === JSON.stringify(currentQuestion.correctAnswer)
        : selectedAnswer === currentQuestion.correctAnswer,
      timeSpent,
      isFlagged: flaggedQuestions.includes(currentQuestion.id),
      isSkipped: false,
    };

    // Show animation
    setShowCorrectAnimation(answerRecord.isCorrect);
    setTimeout(() => setShowCorrectAnimation(null), 800);

    // Submit to progress store
    submitToProgress(dayNum, sprintNum, answerRecord);

    // Add to review if wrong, slow, or flagged
    const reviewCategories: ReviewCategory[] = [];
    if (!answerRecord.isCorrect) reviewCategories.push('wrong');
    if (timeSpent > currentQuestion.expectedTimeSeconds * SLOW_ANSWER_MULTIPLIER) reviewCategories.push('slow');
    if (answerRecord.isFlagged) reviewCategories.push('flagged');
    if (reviewCategories.length > 0) {
      addToReview(currentQuestion.id, reviewCategories);
    }
  }, [currentQuestion, isAnswered, selectedAnswer, questionStartTime, flaggedQuestions, submitAnswer, submitToProgress, addToReview, dayNum, sprintNum]);

  const handleNext = useCallback(() => {
    if (isLastQuestion()) {
      handleCompleteSprint();
    } else {
      nextQuestion();
      setQuestionStartTime(Date.now());
    }
  }, [isLastQuestion, nextQuestion]);

  const handleCompleteSprint = useCallback(() => {
    stopTimer();
    completeSprint(dayNum, sprintNum);
    navigate(`/results/${dayNum}/${sprintNum}`);
  }, [stopTimer, completeSprint, dayNum, sprintNum, navigate]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key) {
        case '1': case '2': case '3': case '4': case '5':
          if (!isAnswered && currentQuestion?.options) {
            const idx = parseInt(e.key) - 1;
            const opt = currentQuestion.options[idx];
            if (opt) selectAnswer(opt.id);
          }
          break;
        case 'Enter':
          if (!isAnswered && selectedAnswer !== null) {
            handleSubmitAnswer();
          } else if (isAnswered) {
            handleNext();
          }
          break;
        case ' ':
          e.preventDefault();
          if (isAnswered) handleNext();
          break;
        case 'f':
          if (currentQuestion) toggleFlag();
          break;
        case 'h':
          toggleHint();
          break;
        case 'e':
          if (isAnswered) toggleExplanation();
          break;
        case 'c':
          setShowCalc(prev => !prev);
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, selectedAnswer, currentQuestion, handleSubmitAnswer, handleNext, selectAnswer, toggleFlag, toggleHint, toggleExplanation]);

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-[#09090B] flex items-center justify-center">
        <div className="text-[#71717A] text-lg">Loading questions...</div>
      </div>
    );
  }

  const timerColor = timeRemaining <= TIMER_CRITICAL_THRESHOLD
    ? 'text-red-500 timer-urgent'
    : timeRemaining <= TIMER_DANGER_THRESHOLD
    ? 'text-red-400'
    : timeRemaining <= TIMER_WARNING_THRESHOLD
    ? 'text-yellow-400 timer-warning'
    : 'text-[#A1A1AA]';

  return (
    <div className="min-h-screen bg-[#09090B] flex flex-col">
      {/* Correct/Wrong flash overlay */}
      <AnimatePresence>
        {showCorrectAnimation !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'fixed inset-0 z-50 pointer-events-none',
              showCorrectAnimation ? 'bg-[#22C55E]/5' : 'bg-[#EF4444]/5'
            )}
          />
        )}
      </AnimatePresence>

      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-[#09090B]/95 backdrop-blur-sm border-b border-[#1E1E23]">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Question info */}
            <div className="flex items-center gap-3">
              <span className={cn('px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border', getDifficultyColor(currentQuestion.difficulty))}>
                {currentQuestion.difficulty}
              </span>
              <span className="text-xs text-[#71717A]">{currentQuestion.topic}</span>
            </div>

            {/* Center: Timer */}
            <div className={cn('flex items-center gap-1.5 font-mono text-lg font-bold tabular-nums', timerColor)}>
              <Clock size={16} />
              {formatTime(timeRemaining)}
            </div>

            {/* Right: Question counter */}
            <div className="flex items-center gap-3">
              {currentQuestion.companyTags.slice(0, 1).map(tag => (
                <span key={tag} className="px-2 py-0.5 rounded-md bg-[#6366F1]/10 text-[#818CF8] text-[10px] font-semibold border border-[#6366F1]/20">
                  {tag}
                </span>
              ))}
              <span className="text-sm font-bold text-[#FAFAFA]">
                {currentQuestionIndex + 1}<span className="text-[#71717A]">/{questions.length}</span>
              </span>
            </div>
          </div>

          {/* Sprint progress dots */}
          <div className="flex items-center gap-1 mt-2">
            {questions.map((_, i) => (
              <div
                key={i}
                className={cn(
                  'flex-1 h-1 rounded-full transition-all duration-300',
                  i < currentQuestionIndex && answers[i]?.isCorrect && 'bg-[#22C55E]',
                  i < currentQuestionIndex && !answers[i]?.isCorrect && 'bg-[#EF4444]',
                  i === currentQuestionIndex && 'bg-[#6366F1]',
                  i > currentQuestionIndex && 'bg-[#27272A]'
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Question Area */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {/* Question Text */}
              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-semibold text-[#FAFAFA] leading-relaxed">
                  {currentQuestion.content.text}
                </h2>
                {currentQuestion.content.code && (
                  <pre className="mt-4 p-4 rounded-xl bg-[#0F0F12] border border-[#1E1E23] font-mono text-sm text-[#A1A1AA] overflow-x-auto">
                    {currentQuestion.content.code}
                  </pre>
                )}
                {currentQuestion.content.table && (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full text-sm">
                      <tbody>
                        {currentQuestion.content.table.map((row, ri) => (
                          <tr key={ri} className={ri === 0 ? 'bg-[#6366F1]/10' : 'bg-[#0F0F12]'}>
                            {row.map((cell, ci) => (
                              <td key={ci} className="px-3 py-2 border border-[#27272A] text-[#A1A1AA]">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === option.id;
                  const isCorrectOption = isAnswered && option.id === currentQuestion.correctAnswer;
                  const isWrongSelected = isAnswered && isSelected && option.id !== currentQuestion.correctAnswer;

                  return (
                    <motion.button
                      key={option.id}
                      whileHover={!isAnswered ? { scale: 1.01 } : undefined}
                      whileTap={!isAnswered ? { scale: 0.99 } : undefined}
                      onClick={() => !isAnswered && selectAnswer(option.id)}
                      disabled={isAnswered}
                      className={cn(
                        'w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200',
                        !isAnswered && !isSelected && 'bg-[#18181B] border-[#27272A] hover:border-[#6366F1]/40 hover:bg-[#18181B]/80',
                        !isAnswered && isSelected && 'bg-[#6366F1]/10 border-[#6366F1]/40 accent-glow',
                        isCorrectOption && 'bg-[#22C55E]/10 border-[#22C55E]/40 correct-glow',
                        isWrongSelected && 'bg-[#EF4444]/10 border-[#EF4444]/40 wrong-glow',
                        isAnswered && !isCorrectOption && !isWrongSelected && 'opacity-40'
                      )}
                    >
                      {/* Option letter */}
                      <span
                        className={cn(
                          'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0',
                          !isAnswered && !isSelected && 'bg-[#27272A] text-[#A1A1AA]',
                          !isAnswered && isSelected && 'bg-[#6366F1] text-white',
                          isCorrectOption && 'bg-[#22C55E] text-white',
                          isWrongSelected && 'bg-[#EF4444] text-white',
                          isAnswered && !isCorrectOption && !isWrongSelected && 'bg-[#27272A] text-[#71717A]'
                        )}
                      >
                        {showKeyboardShortcuts && !isAnswered ? (index + 1) : String.fromCharCode(65 + index)}
                      </span>

                      <span className="flex-1 text-[#FAFAFA] text-base">{option.text}</span>

                      {isCorrectOption && (
                        <CheckCircle2 size={20} className="text-[#22C55E] shrink-0" />
                      )}
                      {isWrongSelected && (
                        <XCircle size={20} className="text-[#EF4444] shrink-0" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Hint */}
              <AnimatePresence>
                {showHint && currentQuestion.hints.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-4 rounded-xl bg-[#F59E0B]/5 border border-[#F59E0B]/20"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Lightbulb size={14} className="text-[#F59E0B]" />
                      <span className="text-xs font-semibold text-[#F59E0B]">Hint</span>
                    </div>
                    <p className="text-sm text-[#A1A1AA]">
                      {currentQuestion.hints[Math.min(currentHintIndex, currentQuestion.hints.length - 1)]}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Explanation (shown after answering) */}
              <AnimatePresence>
                {isAnswered && showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 space-y-3"
                  >
                    <div className="p-4 rounded-xl bg-[#18181B] border border-[#27272A]">
                      <h4 className="text-xs font-bold text-[#6366F1] uppercase tracking-wider mb-2">Solution</h4>
                      <p className="text-sm text-[#A1A1AA] leading-relaxed whitespace-pre-line">
                        {currentQuestion.explanation.detailed}
                      </p>
                    </div>
                    {currentQuestion.explanation.shortTrick && (
                      <div className="p-3 rounded-xl bg-[#22C55E]/5 border border-[#22C55E]/20">
                        <h4 className="text-[10px] font-bold text-[#22C55E] uppercase tracking-wider mb-1">⚡ Short Trick</h4>
                        <p className="text-sm text-[#A1A1AA]">{currentQuestion.explanation.shortTrick}</p>
                      </div>
                    )}
                    {currentQuestion.explanation.commonMistake && (
                      <div className="p-3 rounded-xl bg-[#EF4444]/5 border border-[#EF4444]/20">
                        <h4 className="text-[10px] font-bold text-[#EF4444] uppercase tracking-wider mb-1">⚠️ Common Mistake</h4>
                        <p className="text-sm text-[#A1A1AA]">{currentQuestion.explanation.commonMistake}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="sticky bottom-0 bg-[#09090B]/95 backdrop-blur-sm border-t border-[#1E1E23]">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleFlag}
                className={cn(
                  'p-2 rounded-lg border transition-all',
                  flaggedQuestions.includes(currentQuestion.id)
                    ? 'bg-[#F59E0B]/10 border-[#F59E0B]/30 text-[#F59E0B]'
                    : 'bg-[#18181B] border-[#27272A] text-[#71717A] hover:text-[#A1A1AA]'
                )}
                title="Flag question (F)"
              >
                <Flag size={16} />
              </button>
              <button
                onClick={toggleHint}
                className="p-2 rounded-lg bg-[#18181B] border border-[#27272A] text-[#71717A] hover:text-[#A1A1AA] transition-all"
                title="Show hint (H)"
              >
                <Lightbulb size={16} />
              </button>
              <button
                onClick={() => setShowCalc(!showCalc)}
                className={cn(
                  'p-2 rounded-lg border transition-all',
                  showCalc
                    ? 'bg-[#6366F1]/10 border-[#6366F1]/30 text-[#6366F1]'
                    : 'bg-[#18181B] border-[#27272A] text-[#71717A] hover:text-[#A1A1AA]'
                )}
                title="Calculator (C)"
              >
                <Calculator size={16} />
              </button>
              {isAnswered && (
                <button
                  onClick={toggleExplanation}
                  className={cn(
                    'p-2 rounded-lg border transition-all',
                    showExplanation
                      ? 'bg-[#6366F1]/10 border-[#6366F1]/30 text-[#6366F1]'
                      : 'bg-[#18181B] border-[#27272A] text-[#71717A] hover:text-[#A1A1AA]'
                  )}
                  title="Explanation (E)"
                >
                  <Bookmark size={16} />
                </button>
              )}
            </div>

            {/* Keyboard hint */}
            {showKeyboardShortcuts && (
              <div className="hidden md:flex items-center gap-1 text-[10px] text-[#3F3F46]">
                <Keyboard size={12} />
                <span>1-4 select · Enter submit · Space next · F flag · H hint</span>
              </div>
            )}

            {/* Right: Submit/Next button */}
            <div>
              {!isAnswered ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className={cn(
                    'flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200',
                    selectedAnswer !== null
                      ? 'bg-[#6366F1] hover:bg-[#4F46E5] text-white accent-glow hover:scale-[1.02] active:scale-[0.98]'
                      : 'bg-[#27272A] text-[#71717A] cursor-not-allowed'
                  )}
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#6366F1] hover:bg-[#4F46E5] text-white font-semibold text-sm transition-all duration-200 accent-glow hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isLastQuestion() ? 'Finish Sprint' : 'Next'}
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
