import { create } from 'zustand';
import { StorageKeys, loadFromStorage, saveToStorage } from '@/lib/storage';

type FontSize = 'normal' | 'large' | 'xl';

interface SettingsState {
  pauseOnTabSwitch: boolean;
  showTimer: boolean;
  showKeyboardShortcuts: boolean;
  soundEnabled: boolean;
  fontSize: FontSize;
}

interface SettingsActions {
  initializeSettings: () => void;
  toggleSetting: (key: keyof Omit<SettingsState, 'fontSize'>) => void;
  setFontSize: (size: FontSize) => void;
}

const defaultSettings: SettingsState = {
  pauseOnTabSwitch: true,
  showTimer: true,
  showKeyboardShortcuts: true,
  soundEnabled: false,
  fontSize: 'large',
};

export const useSettingsStore = create<SettingsState & SettingsActions>()((set) => ({
  ...defaultSettings,

  initializeSettings: () => {
    const saved = loadFromStorage<SettingsState | null>(StorageKeys.SETTINGS, null);
    if (saved) {
      set(saved);
    }
  },

  toggleSetting: (key) => {
    set((state) => ({
      [key]: !state[key],
    }));
  },

  setFontSize: (size: FontSize) => {
    set({ fontSize: size });
  },
}));

// Persist
useSettingsStore.subscribe((state) => {
  saveToStorage(StorageKeys.SETTINGS, {
    pauseOnTabSwitch: state.pauseOnTabSwitch,
    showTimer: state.showTimer,
    showKeyboardShortcuts: state.showKeyboardShortcuts,
    soundEnabled: state.soundEnabled,
    fontSize: state.fontSize,
  });
});
