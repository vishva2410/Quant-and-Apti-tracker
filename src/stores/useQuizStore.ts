import { create } from 'zustand';
import type { Question, Answer } from '@/types';

interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  selectedAnswer: string | string[] | null;
  isAnswered: boolean;
  showExplanation: boolean;
  flaggedQuestions: string[];
  answers: Answer[];
  showHint: boolean;
  currentHintIndex: number;
}

interface QuizActions {
  loadSprint: (questions: Question[]) => void;
  selectAnswer: (answer: string | string[]) => void;
  submitAnswer: () => void;
  nextQuestion: () => void;
  toggleFlag: () => void;
  toggleHint: () => void;
  toggleExplanation: () => void;
  getCurrentQuestion: () => Question | null;
  isLastQuestion: () => boolean;
  reset: () => void;
}

const initialState: QuizState = {
  questions: [],
  currentQuestionIndex: 0,
  selectedAnswer: null,
  isAnswered: false,
  showExplanation: false,
  flaggedQuestions: [],
  answers: [],
  showHint: false,
  currentHintIndex: 0,
};

export const useQuizStore = create<QuizState & QuizActions>()((set, get) => ({
  ...initialState,

  loadSprint: (questions: Question[]) => {
    set({
      ...initialState,
      questions,
    });
  },

  selectAnswer: (answer: string | string[]) => {
    if (get().isAnswered) return;
    set({ selectedAnswer: answer });
  },

  submitAnswer: () => {
    const { questions, currentQuestionIndex, selectedAnswer, flaggedQuestions } = get();
    const question = questions[currentQuestionIndex];
    if (!question || selectedAnswer === null) return;

    let isCorrect: boolean;
    if (Array.isArray(question.correctAnswer)) {
      const selected = Array.isArray(selectedAnswer) ? [...selectedAnswer].sort() : [selectedAnswer];
      isCorrect = JSON.stringify(selected) === JSON.stringify([...question.correctAnswer].sort());
    } else {
      isCorrect = selectedAnswer === question.correctAnswer;
    }

    const answer: Answer = {
      questionId: question.id,
      selectedAnswer,
      isCorrect,
      timeSpent: 0, // filled by SprintPage
      isFlagged: flaggedQuestions.includes(question.id),
      isSkipped: false,
    };

    set((state) => ({
      isAnswered: true,
      showExplanation: true,
      answers: [...state.answers, answer],
    }));
  },

  nextQuestion: () => {
    set((state) => ({
      currentQuestionIndex: state.currentQuestionIndex + 1,
      selectedAnswer: null,
      isAnswered: false,
      showExplanation: false,
      showHint: false,
      currentHintIndex: 0,
    }));
  },

  toggleFlag: () => {
    const question = get().getCurrentQuestion();
    if (!question) return;
    set((state) => ({
      flaggedQuestions: state.flaggedQuestions.includes(question.id)
        ? state.flaggedQuestions.filter((id) => id !== question.id)
        : [...state.flaggedQuestions, question.id],
    }));
  },

  toggleHint: () => {
    set((state) => ({
      showHint: !state.showHint,
      currentHintIndex: state.showHint ? state.currentHintIndex : Math.min(state.currentHintIndex + 1, (get().getCurrentQuestion()?.hints.length ?? 1) - 1),
    }));
  },

  toggleExplanation: () => {
    set((state) => ({ showExplanation: !state.showExplanation }));
  },

  getCurrentQuestion: () => {
    const { questions, currentQuestionIndex } = get();
    return questions[currentQuestionIndex] ?? null;
  },

  isLastQuestion: () => {
    const { questions, currentQuestionIndex } = get();
    return currentQuestionIndex >= questions.length - 1;
  },

  reset: () => {
    set(initialState);
  },
}));
