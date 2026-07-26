export type DayStatus = 'locked' | 'available' | 'in-progress' | 'completed';

export interface Answer {
  questionId: string;
  selectedAnswer: string | string[] | null;
  isCorrect: boolean;
  timeSpent: number; // seconds
  isFlagged: boolean;
  isSkipped: boolean;
}

export interface SprintResult {
  sprintNumber: number;
  answers: Answer[];
  score: number;
  totalQuestions: number;
  timeSpent: number; // seconds
  accuracy: number; // 0-100
  completedAt: string | null; // ISO date
  status: 'not-started' | 'in-progress' | 'completed';
}

export interface DailyProgress {
  dayNumber: number;
  status: DayStatus;
  sprints: SprintResult[];
  completedAt: string | null;
  totalScore: number;
  totalQuestions: number;
  totalTime: number;
  accuracy: number;
  xpEarned: number;
}

export interface OverallProgress {
  currentDay: number;
  currentSprint: number;
  totalQuestionsAttempted: number;
  totalCorrect: number;
  totalTimeSpent: number; // seconds
  overallAccuracy: number;
  currentStreak: number;
  longestStreak: number;
  totalXP: number;
  level: number;
  dailyProgress: DailyProgress[];
  lastActiveDate: string | null;
}
