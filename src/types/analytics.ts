export interface TopicStats {
  topic: string;
  category: string;
  totalAttempted: number;
  totalCorrect: number;
  accuracy: number;
  averageTime: number;
  trend: 'improving' | 'declining' | 'stable';
}

export interface DailyStats {
  date: string;
  questionsAttempted: number;
  correctAnswers: number;
  accuracy: number;
  timeSpent: number;
  xpEarned: number;
}

export interface CompanyStats {
  company: string;
  totalAttempted: number;
  totalCorrect: number;
  accuracy: number;
}

export interface SprintStats {
  dayNumber: number;
  sprintNumber: number;
  accuracy: number;
  timeSpent: number;
  score: number;
}

export type ReviewCategory =
  | 'wrong'
  | 'skipped'
  | 'flagged'
  | 'slow'
  | 'repeated-mistake'
  | 'bookmarked';

export interface ReviewItem {
  questionId: string;
  categories: ReviewCategory[];
  addedAt: string;
  retryCount: number;
  lastRetryAt: string | null;
  lastRetryCorrect: boolean | null;
  notes: string;
  bookmarked: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'streak' | 'accuracy' | 'speed' | 'volume' | 'special';
  requirement: number;
  currentProgress: number;
  unlockedAt: string | null;
  xpReward: number;
}
