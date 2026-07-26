import { create } from 'zustand';
import type { DailyProgress, SprintResult, Answer, DayStatus } from '@/types';
import { StorageKeys, loadFromStorage, saveToStorage } from '@/lib/storage';
import { TOTAL_DAYS, SPRINTS_PER_DAY, XP_CORRECT_MEDIUM, XP_PERFECT_SPRINT, XP_PERFECT_DAY, XP_PER_LEVEL } from '@/config/constants';
import { getToday } from '@/lib/utils';

function createEmptySprint(sprintNumber: number): SprintResult {
  return {
    sprintNumber,
    answers: [],
    score: 0,
    totalQuestions: 10,
    timeSpent: 0,
    accuracy: 0,
    completedAt: null,
    status: 'not-started' as const,
  };
}

function createEmptyDay(dayNumber: number, status: DayStatus): DailyProgress {
  return {
    dayNumber,
    status,
    sprints: Array.from({ length: SPRINTS_PER_DAY }, (_, i) => createEmptySprint(i + 1)),
    completedAt: null,
    totalScore: 0,
    totalQuestions: 0,
    totalTime: 0,
    accuracy: 0,
    xpEarned: 0,
  };
}

interface ProgressState {
  currentDay: number;
  dailyProgress: DailyProgress[];
  totalXP: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
}

interface ProgressActions {
  initializeProgress: () => void;
  startDay: (dayNumber: number) => void;
  startSprint: (dayNumber: number, sprintNumber: number) => void;
  submitAnswer: (dayNumber: number, sprintNumber: number, answer: Answer) => void;
  completeSprint: (dayNumber: number, sprintNumber: number) => void;
  completeDay: (dayNumber: number) => void;
  addXP: (amount: number) => void;
  updateStreak: () => void;
}

interface PersistedProgress {
  currentDay: number;
  dailyProgress: DailyProgress[];
  totalXP: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
}

const initialState: ProgressState = {
  currentDay: 1,
  dailyProgress: [],
  totalXP: 0,
  level: 1,
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: null,
};

export const useProgressStore = create<ProgressState & ProgressActions>()((set, get) => ({
  ...initialState,

  initializeProgress: () => {
    const saved = loadFromStorage<PersistedProgress | null>(StorageKeys.PROGRESS, null);
    if (saved && saved.dailyProgress && saved.dailyProgress.length > 0) {
      set({
        currentDay: saved.currentDay,
        dailyProgress: saved.dailyProgress,
        totalXP: saved.totalXP,
        level: saved.level,
        currentStreak: saved.currentStreak,
        longestStreak: saved.longestStreak,
        lastActiveDate: saved.lastActiveDate,
      });
    } else {
      const progress: DailyProgress[] = Array.from({ length: TOTAL_DAYS }, (_, i) =>
        createEmptyDay(i + 1, i === 0 ? 'available' : 'locked')
      );
      set({ dailyProgress: progress });
    }
    get().updateStreak();
  },

  startDay: (dayNumber: number) => {
    set((state) => ({
      dailyProgress: state.dailyProgress.map((d) =>
        d.dayNumber === dayNumber ? { ...d, status: 'in-progress' as DayStatus } : d
      ),
    }));
  },

  startSprint: (dayNumber: number, sprintNumber: number) => {
    set((state) => ({
      dailyProgress: state.dailyProgress.map((d) =>
        d.dayNumber === dayNumber
          ? {
              ...d,
              sprints: d.sprints.map((s) =>
                s.sprintNumber === sprintNumber ? { ...s, status: 'in-progress' as const } : s
              ),
            }
          : d
      ),
    }));
  },

  submitAnswer: (dayNumber: number, sprintNumber: number, answer: Answer) => {
    set((state) => ({
      dailyProgress: state.dailyProgress.map((d) =>
        d.dayNumber === dayNumber
          ? {
              ...d,
              sprints: d.sprints.map((s) =>
                s.sprintNumber === sprintNumber
                  ? { ...s, answers: [...s.answers, answer] }
                  : s
              ),
            }
          : d
      ),
    }));
  },

  completeSprint: (dayNumber: number, sprintNumber: number) => {
    set((state) => {
      const newProgress = state.dailyProgress.map((d) => {
        if (d.dayNumber !== dayNumber) return d;
        const newSprints = d.sprints.map((s) => {
          if (s.sprintNumber !== sprintNumber) return s;
          const correct = s.answers.filter((a) => a.isCorrect).length;
          const total = s.answers.length;
          const timeSpent = s.answers.reduce((sum, a) => sum + a.timeSpent, 0);
          return {
            ...s,
            score: correct,
            totalQuestions: total,
            accuracy: total > 0 ? Math.round((correct / total) * 100) : 0,
            timeSpent,
            completedAt: new Date().toISOString(),
            status: 'completed' as const,
          };
        });
        return { ...d, sprints: newSprints };
      });
      return { dailyProgress: newProgress };
    });

    // Award XP for sprint
    const day = get().dailyProgress.find((d) => d.dayNumber === dayNumber);
    const sprint = day?.sprints.find((s) => s.sprintNumber === sprintNumber);
    if (sprint) {
      let xp = 0;
      sprint.answers.forEach((a) => {
        if (a.isCorrect) xp += XP_CORRECT_MEDIUM; // simplified
      });
      if (sprint.accuracy === 100) xp += XP_PERFECT_SPRINT;
      get().addXP(xp);
    }

    // Check if all sprints complete → complete day
    const updatedDay = get().dailyProgress.find((d) => d.dayNumber === dayNumber);
    if (updatedDay && updatedDay.sprints.every((s) => s.status === 'completed')) {
      get().completeDay(dayNumber);
    }
  },

  completeDay: (dayNumber: number) => {
    set((state) => {
      const newProgress = state.dailyProgress.map((d) => {
        if (d.dayNumber === dayNumber) {
          const totalScore = d.sprints.reduce((sum, s) => sum + s.score, 0);
          const totalQuestions = d.sprints.reduce((sum, s) => sum + s.totalQuestions, 0);
          const totalTime = d.sprints.reduce((sum, s) => sum + s.timeSpent, 0);
          const accuracy = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;
          return {
            ...d,
            status: 'completed' as DayStatus,
            completedAt: new Date().toISOString(),
            totalScore,
            totalQuestions,
            totalTime,
            accuracy,
          };
        }
        // Unlock next day
        if (d.dayNumber === dayNumber + 1 && d.status === 'locked') {
          return { ...d, status: 'available' as DayStatus };
        }
        return d;
      });

      const nextDay = dayNumber < TOTAL_DAYS ? dayNumber + 1 : dayNumber;

      return {
        dailyProgress: newProgress,
        currentDay: nextDay,
        lastActiveDate: getToday(),
      };
    });

    // Perfect day bonus
    const day = get().dailyProgress.find((d) => d.dayNumber === dayNumber);
    if (day && day.accuracy === 100) {
      get().addXP(XP_PERFECT_DAY);
    }

    get().updateStreak();
  },

  addXP: (amount: number) => {
    set((state) => {
      const newXP = state.totalXP + amount;
      return {
        totalXP: newXP,
        level: Math.floor(newXP / XP_PER_LEVEL) + 1,
      };
    });
  },

  updateStreak: () => {
    const today = getToday();
    const { lastActiveDate } = get();

    if (!lastActiveDate) {
      set({ currentStreak: 1, longestStreak: 1, lastActiveDate: today });
      return;
    }

    if (lastActiveDate === today) return;

    const last = new Date(lastActiveDate);
    const now = new Date(today);
    const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      set((state) => {
        const newStreak = state.currentStreak + 1;
        return {
          currentStreak: newStreak,
          longestStreak: Math.max(state.longestStreak, newStreak),
          lastActiveDate: today,
        };
      });
    } else if (diffDays > 1) {
      set({ currentStreak: 1, lastActiveDate: today });
    }
  },
}));

// Persist on every change
useProgressStore.subscribe((state) => {
  saveToStorage(StorageKeys.PROGRESS, {
    currentDay: state.currentDay,
    dailyProgress: state.dailyProgress,
    totalXP: state.totalXP,
    level: state.level,
    currentStreak: state.currentStreak,
    longestStreak: state.longestStreak,
    lastActiveDate: state.lastActiveDate,
  });
});
