export type QuestionType =
  | 'mcq'
  | 'msq'
  | 'numerical'
  | 'fill-blank'
  | 'ordering'
  | 'matching'
  | 'case-study';

export type QuestionCategory = 'quant' | 'reasoning' | 'cs-logic';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuestionOption {
  id: string;
  text: string;
  image?: string;
}

export interface QuestionContent {
  text: string;
  image?: string;
  table?: string[][];
  code?: string;
  codeLanguage?: string;
}

export interface QuestionExplanation {
  detailed: string;
  shortTrick?: string;
  commonMistake?: string;
  alternativeSolution?: string;
  timeSavingTip?: string;
}

export interface Question {
  id: string;
  dayNumber: number;
  sprintNumber: number;
  questionNumber: number;
  type: QuestionType;
  category: QuestionCategory;
  topic: string;
  subtopic: string;
  difficulty: Difficulty;
  expectedTimeSeconds: number;
  companyTags: string[];
  content: QuestionContent;
  options: QuestionOption[];
  correctAnswer: string | string[];
  explanation: QuestionExplanation;
  hints: string[];
}

export interface QuestionFilter {
  category?: QuestionCategory;
  topic?: string;
  subtopic?: string;
  difficulty?: Difficulty;
  companyTag?: string;
  type?: QuestionType;
  searchQuery?: string;
}
