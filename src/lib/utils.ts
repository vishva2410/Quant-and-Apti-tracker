import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatTimeVerbose(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

export function getAccuracyColor(accuracy: number): string {
  if (accuracy >= 80) return 'text-green-400';
  if (accuracy >= 60) return 'text-yellow-400';
  if (accuracy >= 40) return 'text-orange-400';
  return 'text-red-400';
}

export function getAccuracyBgColor(accuracy: number): string {
  if (accuracy >= 80) return 'bg-green-500/10';
  if (accuracy >= 60) return 'bg-yellow-500/10';
  if (accuracy >= 40) return 'bg-orange-500/10';
  return 'bg-red-500/10';
}

export function getDifficultyColor(difficulty: 'easy' | 'medium' | 'hard'): string {
  switch (difficulty) {
    case 'easy': return 'text-green-400 bg-green-500/10 border-green-500/20';
    case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
    case 'hard': return 'text-red-400 bg-red-500/10 border-red-500/20';
  }
}

export function getXPForLevel(level: number): number {
  return level * 500;
}

export function getLevelFromXP(xp: number): number {
  return Math.floor(xp / 500) + 1;
}

export function getXPProgressInLevel(xp: number): number {
  return xp % 500;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getToday(): string {
  return new Date().toISOString().split('T')[0];
}
