import { create } from 'zustand';
import { StorageKeys, loadFromStorage, saveToStorage } from '@/lib/storage';
import { SPRINT_DURATION_SECONDS, BREAK_DURATION_SECONDS } from '@/config/constants';

interface TimerState {
  timeRemaining: number;
  isRunning: boolean;
  timerType: 'sprint' | 'break' | 'idle';
  isPaused: boolean;
}

interface TimerActions {
  startSprintTimer: () => void;
  startBreakTimer: () => void;
  tick: () => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  restoreTimer: () => void;
}

interface PersistedTimer {
  timeRemaining: number;
  timerType: 'sprint' | 'break' | 'idle';
  lastTickTimestamp: number;
}

export const useTimerStore = create<TimerState & TimerActions>()((set, get) => ({
  timeRemaining: 0,
  isRunning: false,
  timerType: 'idle',
  isPaused: false,

  startSprintTimer: () => {
    set({
      timeRemaining: SPRINT_DURATION_SECONDS,
      isRunning: true,
      timerType: 'sprint',
      isPaused: false,
    });
    saveToStorage(StorageKeys.TIMER, {
      timeRemaining: SPRINT_DURATION_SECONDS,
      timerType: 'sprint',
      lastTickTimestamp: Date.now(),
    });
  },

  startBreakTimer: () => {
    set({
      timeRemaining: BREAK_DURATION_SECONDS,
      isRunning: true,
      timerType: 'break',
      isPaused: false,
    });
    saveToStorage(StorageKeys.TIMER, {
      timeRemaining: BREAK_DURATION_SECONDS,
      timerType: 'break',
      lastTickTimestamp: Date.now(),
    });
  },

  tick: () => {
    const { timeRemaining, isRunning, isPaused } = get();
    if (!isRunning || isPaused) return;

    const newTime = Math.max(0, timeRemaining - 1);
    set({ timeRemaining: newTime });

    // Persist every tick
    saveToStorage(StorageKeys.TIMER, {
      timeRemaining: newTime,
      timerType: get().timerType,
      lastTickTimestamp: Date.now(),
    });
  },

  pause: () => {
    set({ isPaused: true, isRunning: false });
  },

  resume: () => {
    set({ isPaused: false, isRunning: true });
  },

  stop: () => {
    set({
      timeRemaining: 0,
      isRunning: false,
      timerType: 'idle',
      isPaused: false,
    });
    saveToStorage(StorageKeys.TIMER, {
      timeRemaining: 0,
      timerType: 'idle',
      lastTickTimestamp: Date.now(),
    });
  },

  restoreTimer: () => {
    const saved = loadFromStorage<PersistedTimer | null>(StorageKeys.TIMER, null);
    if (!saved || saved.timerType === 'idle') return;

    const elapsed = Math.floor((Date.now() - saved.lastTickTimestamp) / 1000);
    const remaining = Math.max(0, saved.timeRemaining - elapsed);

    if (remaining > 0) {
      set({
        timeRemaining: remaining,
        isRunning: true,
        timerType: saved.timerType,
        isPaused: false,
      });
    } else {
      set({
        timeRemaining: 0,
        isRunning: false,
        timerType: 'idle',
        isPaused: false,
      });
    }
  },
}));
