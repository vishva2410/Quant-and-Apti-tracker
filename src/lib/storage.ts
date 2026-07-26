const STORAGE_PREFIX = 'aptiquant_';

export const StorageKeys = {
  PROGRESS: `${STORAGE_PREFIX}progress`,
  TIMER: `${STORAGE_PREFIX}timer`,
  REVIEW: `${STORAGE_PREFIX}review`,
  SETTINGS: `${STORAGE_PREFIX}settings`,
  ACHIEVEMENTS: `${STORAGE_PREFIX}achievements`,
  ANALYTICS: `${STORAGE_PREFIX}analytics`,
} as const;

export function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (stored === null) return defaultValue;
    return JSON.parse(stored) as T;
  } catch {
    return defaultValue;
  }
}

export function saveToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to save to localStorage [${key}]:`, error);
  }
}

export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove from localStorage [${key}]:`, error);
  }
}
