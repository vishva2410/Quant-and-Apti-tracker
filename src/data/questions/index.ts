import { day01Questions } from './day-01';
import { day02Questions } from './day-02';
import { day03Questions } from './day-03';
import type { Question } from '@/types';

export const allQuestions: Record<number, Question[]> = {
  1: day01Questions,
  2: day02Questions,
  3: day03Questions,
};

export function getQuestionsForDay(day: number): Question[] {
  return allQuestions[day] || [];
}

export function getQuestionsForSprint(day: number, sprint: number): Question[] {
  return getQuestionsForDay(day).filter(q => q.sprintNumber === sprint);
}

export function getAllQuestions(): Question[] {
  return Object.values(allQuestions).flat();
}

export function getQuestionById(id: string): Question | undefined {
  return getAllQuestions().find(q => q.id === id);
}
