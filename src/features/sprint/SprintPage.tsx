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
  ArrowLeft,
  Code2,
  FileText
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
    showHint,
    currentHintIndex,
    flaggedQuestions,
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
  const [scratchText, setScratchText] = useState('# Scratchpad / Rough Math Steps:\n- Let x be the cost price.\n- Marked Price = 1.4 * x\n- SP after 15% discount = 1.4 * 0.85 * x');
  const [leftTab, setLeftTab] = useState<'problem' | 'solution' | 'hints'>('problem');
  const [rightTab, setRightTab] = useState<'options' | 'scratchpad'>('options');
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

    setShowCorrectAnimation(answerRecord.isCorrect);
    setTimeout(() => setShowCorrectAnimation(null), 800);

    submitToProgress(dayNum, sprintNum, answerRecord);

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
      setLeftTab('problem');
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
      <div className="h-screen w-screen bg-[#0A0A0C] flex items-center justify-center text-zinc-400 font-mono text-sm">
        Loading Sprint Questions...
      </div>
    );
  }

  const timerColor = timeRemaining <= TIMER_CRITICAL_THRESHOLD
    ? 'text-red-500 timer-urgent'
    : timeRemaining <= TIMER_DANGER_THRESHOLD
    ? 'text-red-400'
    : timeRemaining <= TIMER_WARNING_THRESHOLD
    ? 'text-yellow-400 timer-warning'
    : 'text-zinc-300';

  return (
    <div className="h-screen w-screen bg-[#0A0A0C] text-zinc-100 font-sans flex flex-col overflow-hidden select-none">
      
      {/* Visual Flash Feedback */}
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

      {/* 1. TOP IDE NAVBAR (LeetCode Style) */}
      <header className="h-12 border-b border-[#1E1E24] bg-[#0F0F13] px-4 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/cheatsheet/${dayNum}`)}
            className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-100 transition-colors font-medium bg-zinc-900 hover:bg-zinc-800 px-2.5 py-1 rounded-md border border-zinc-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Cheat Sheet</span>
          </button>

          <span className="text-zinc-700">/</span>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
              Q{currentQuestionIndex + 1}/{questions.length}
            </span>
            <span className={cn('px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border', getDifficultyColor(currentQuestion.difficulty))}>
              {currentQuestion.difficulty}
            </span>
            <span className="text-xs text-zinc-400 truncate max-w-[200px]">{currentQuestion.topic}</span>
          </div>
        </div>

        {/* Center: Timer */}
        <div className={cn('flex items-center gap-2 font-mono text-base font-bold bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-md tabular-nums', timerColor)}>
          <Clock className="w-4 h-4 text-indigo-400" />
          <span>{formatTime(timeRemaining)}</span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {currentQuestion.companyTags.slice(0, 1).map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono hidden sm:inline">
              {tag}
            </span>
          ))}

          {!isAnswered ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className={cn(
                'px-4 py-1.5 rounded-md font-bold text-xs transition-all shadow-md cursor-pointer',
                selectedAnswer !== null
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                  : 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-800'
              )}
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-1.5 rounded-md font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/30 flex items-center gap-1 cursor-pointer"
            >
              <span>{isLastQuestion() ? 'Finish Sprint' : 'Next Question'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </header>

      {/* 2. SPLIT SCREEN WORKSPACE (50% Left Problem / 50% Right Options & Scratchpad) */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* LEFT PANEL (50% Width) - Problem Statement & Explanation */}
        <div className="w-1/2 flex flex-col border-r border-[#1E1E24] bg-[#0A0A0D] overflow-hidden">
          
          {/* Left Tabs Bar */}
          <div className="h-10 border-b border-[#1E1E24] bg-[#0F0F13] px-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLeftTab('problem')}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  leftTab === 'problem'
                    ? 'bg-zinc-800 text-zinc-100 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                Problem Statement
              </button>

              {isAnswered && (
                <button
                  onClick={() => setLeftTab('solution')}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    leftTab === 'solution'
                      ? 'bg-zinc-800 text-zinc-100 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5 text-emerald-400" />
                  Editorial Solution
                </button>
              )}

              <button
                onClick={() => { toggleHint(); setLeftTab('hints'); }}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  leftTab === 'hints' || showHint
                    ? 'bg-zinc-800 text-zinc-100 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                Hints
              </button>
            </div>

            <span className="text-[10px] font-mono text-zinc-500">
              Est. Time: {currentQuestion.expectedTimeSeconds}s
            </span>
          </div>

          {/* Left Content Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 select-text">
            <div>
              <div className="text-xs font-mono text-indigo-400 mb-2">Question {currentQuestionIndex + 1}</div>
              <h2 className="text-lg font-medium text-zinc-100 leading-relaxed whitespace-pre-wrap">
                {currentQuestion.content.text}
              </h2>

              {currentQuestion.content.code && (
                <pre className="mt-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800/80 font-mono text-xs text-zinc-300 overflow-x-auto">
                  {currentQuestion.content.code}
                </pre>
              )}

              {currentQuestion.content.table && (
                <div className="mt-4 border border-zinc-800 rounded-lg overflow-hidden bg-zinc-950">
                  <table className="w-full text-xs font-mono">
                    <tbody>
                      {currentQuestion.content.table.map((row, ri) => (
                        <tr key={ri} className={ri === 0 ? 'bg-zinc-900 border-b border-zinc-800 font-bold text-zinc-200' : 'border-b border-zinc-800/50'}>
                          {row.map((cell, ci) => (
                            <td key={ci} className="p-2.5 text-zinc-400">{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {(showHint || leftTab === 'hints') && currentQuestion.hints.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                  <Lightbulb className="w-4 h-4" />
                  Hint {currentHintIndex + 1}
                </div>
                <p className="text-xs text-amber-200/80 leading-relaxed">
                  {currentQuestion.hints[Math.min(currentHintIndex, currentQuestion.hints.length - 1)]}
                </p>
              </div>
            )}

            {isAnswered && (
              <div className="space-y-4 pt-4 border-t border-zinc-800">
                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2">
                  <h4 className="text-xs font-bold text-indigo-400 font-mono uppercase tracking-wider">Detailed Solution</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">
                    {currentQuestion.explanation.detailed}
                  </p>
                </div>

                {currentQuestion.explanation.shortTrick && (
                  <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                    <h4 className="text-xs font-bold text-emerald-400 font-mono uppercase tracking-wider mb-1">⚡ Short Trick</h4>
                    <p className="text-xs text-emerald-200/90 leading-relaxed">{currentQuestion.explanation.shortTrick}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL (50% Width) - Options Selector & Code Scratchpad */}
        <div className="w-1/2 flex flex-col bg-[#0A0A0D] overflow-hidden">
          
          <div className="h-10 border-b border-[#1E1E24] bg-[#0F0F13] px-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setRightTab('options')}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  rightTab === 'options'
                    ? 'bg-zinc-800 text-zinc-100 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                Select Answer Options
              </button>

              <button
                onClick={() => setRightTab('scratchpad')}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  rightTab === 'scratchpad'
                    ? 'bg-zinc-800 text-zinc-100 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                Scratchpad
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={toggleFlag}
                className={cn(
                  'p-1.5 rounded transition-colors text-xs',
                  flaggedQuestions.includes(currentQuestion.id)
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'text-zinc-500 hover:text-zinc-300'
                )}
                title="Flag question (F)"
              >
                <Flag className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setShowCalc(!showCalc)}
                className={cn(
                  'p-1.5 rounded transition-colors text-xs',
                  showCalc
                    ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                    : 'text-zinc-500 hover:text-zinc-300'
                )}
                title="Toggle Calculator (C)"
              >
                <Calculator className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {rightTab === 'options' ? (
              <div className="space-y-3">
                <div className="text-xs font-mono text-zinc-500 mb-2">
                  Select the correct choice (or press keys 1, 2, 3, 4):
                </div>

                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === option.id;
                  const isCorrectOption = isAnswered && option.id === currentQuestion.correctAnswer;
                  const isWrongSelected = isAnswered && isSelected && option.id !== currentQuestion.correctAnswer;

                  return (
                    <button
                      key={option.id}
                      onClick={() => !isAnswered && selectAnswer(option.id)}
                      disabled={isAnswered}
                      className={cn(
                        'w-full flex items-center gap-3.5 p-4 rounded-xl border text-left transition-all duration-150 cursor-pointer',
                        !isAnswered && !isSelected && 'bg-zinc-900/90 border-zinc-800 hover:border-indigo-500/40 hover:bg-zinc-900',
                        !isAnswered && isSelected && 'bg-indigo-600/10 border-indigo-500 text-indigo-100 shadow-md shadow-indigo-600/10',
                        isCorrectOption && 'bg-emerald-950/30 border-emerald-500/60 text-emerald-100',
                        isWrongSelected && 'bg-rose-950/30 border-rose-500/60 text-rose-100',
                        isAnswered && !isCorrectOption && !isWrongSelected && 'opacity-40 bg-zinc-950 border-zinc-800'
                      )}
                    >
                      <span
                        className={cn(
                          'w-7 h-7 rounded-md flex items-center justify-center text-xs font-bold font-mono shrink-0',
                          !isAnswered && !isSelected && 'bg-zinc-800 text-zinc-400',
                          !isAnswered && isSelected && 'bg-indigo-600 text-white',
                          isCorrectOption && 'bg-emerald-500 text-white',
                          isWrongSelected && 'bg-rose-500 text-white',
                          isAnswered && !isCorrectOption && !isWrongSelected && 'bg-zinc-800 text-zinc-600'
                        )}
                      >
                        {showKeyboardShortcuts && !isAnswered ? (index + 1) : String.fromCharCode(65 + index)}
                      </span>

                      <span className="flex-1 text-zinc-100 text-sm">{option.text}</span>

                      {isCorrectOption && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                      {isWrongSelected && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="h-full flex flex-col font-mono text-xs bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden">
                <div className="bg-zinc-900 px-3 py-1.5 text-zinc-500 border-b border-zinc-800 text-[11px]">
                  Rough Scratchpad / Step-by-Step Math Notes
                </div>
                <textarea
                  value={scratchText}
                  onChange={(e) => setScratchText(e.target.value)}
                  spellCheck={false}
                  placeholder="Type formulas or scratch work here..."
                  className="w-full flex-1 bg-transparent p-3 text-amber-200/90 font-mono text-xs leading-5 resize-none focus:outline-none select-text"
                />
              </div>
            )}
          </div>

          <div className="h-14 border-t border-[#1E1E24] bg-[#09090C] px-4 flex items-center justify-between shrink-0">
            <div className="text-[11px] text-zinc-500 font-mono hidden sm:block">
              {showKeyboardShortcuts && <span>Press <kbd className="px-1.5 py-0.5 bg-zinc-800 rounded text-zinc-300 border border-zinc-700">Enter ↵</kbd> to submit</span>}
            </div>

            <div className="flex items-center gap-3 ml-auto">
              {!isAnswered ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className={cn(
                    'px-6 py-2 rounded-lg font-bold text-xs transition-all shadow-md cursor-pointer',
                    selectedAnswer !== null
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                      : 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-800'
                  )}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 rounded-lg font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-md shadow-indigo-600/30 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{isLastQuestion() ? 'Finish Sprint' : 'Next Question'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
