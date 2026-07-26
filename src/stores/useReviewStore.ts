import { create } from 'zustand';
import type { ReviewItem, ReviewCategory } from '@/types';
import { StorageKeys, loadFromStorage, saveToStorage } from '@/lib/storage';

interface ReviewState {
  reviewItems: ReviewItem[];
}

interface ReviewActions {
  initializeReview: () => void;
  addToReview: (questionId: string, categories: ReviewCategory[]) => void;
  removeFromReview: (questionId: string) => void;
  toggleBookmark: (questionId: string) => void;
  addNote: (questionId: string, note: string) => void;
  recordRetry: (questionId: string, wasCorrect: boolean) => void;
  getFilteredItems: (filter?: { category?: ReviewCategory; bookmarkedOnly?: boolean }) => ReviewItem[];
  getSmartRevisionQueue: () => ReviewItem[];
}

export const useReviewStore = create<ReviewState & ReviewActions>()((set, get) => ({
  reviewItems: [],

  initializeReview: () => {
    const saved = loadFromStorage<{ reviewItems: ReviewItem[] } | null>(StorageKeys.REVIEW, null);
    if (saved?.reviewItems) {
      set({ reviewItems: saved.reviewItems });
    }
  },

  addToReview: (questionId: string, categories: ReviewCategory[]) => {
    set((state) => {
      const existing = state.reviewItems.find((item) => item.questionId === questionId);
      if (existing) {
        return {
          reviewItems: state.reviewItems.map((item) =>
            item.questionId === questionId
              ? { ...item, categories: [...new Set([...item.categories, ...categories])] }
              : item
          ),
        };
      }
      const newItem: ReviewItem = {
        questionId,
        categories,
        addedAt: new Date().toISOString(),
        retryCount: 0,
        lastRetryAt: null,
        lastRetryCorrect: null,
        notes: '',
        bookmarked: false,
      };
      return { reviewItems: [...state.reviewItems, newItem] };
    });
  },

  removeFromReview: (questionId: string) => {
    set((state) => ({
      reviewItems: state.reviewItems.filter((item) => item.questionId !== questionId),
    }));
  },

  toggleBookmark: (questionId: string) => {
    set((state) => ({
      reviewItems: state.reviewItems.map((item) =>
        item.questionId === questionId ? { ...item, bookmarked: !item.bookmarked } : item
      ),
    }));
  },

  addNote: (questionId: string, note: string) => {
    set((state) => ({
      reviewItems: state.reviewItems.map((item) =>
        item.questionId === questionId ? { ...item, notes: note } : item
      ),
    }));
  },

  recordRetry: (questionId: string, wasCorrect: boolean) => {
    set((state) => ({
      reviewItems: state.reviewItems.map((item) =>
        item.questionId === questionId
          ? {
              ...item,
              retryCount: item.retryCount + 1,
              lastRetryAt: new Date().toISOString(),
              lastRetryCorrect: wasCorrect,
            }
          : item
      ),
    }));
  },

  getFilteredItems: (filter) => {
    const { reviewItems } = get();
    if (!filter) return reviewItems;

    return reviewItems.filter((item) => {
      if (filter.category && !item.categories.includes(filter.category)) return false;
      if (filter.bookmarkedOnly && !item.bookmarked) return false;
      return true;
    });
  },

  getSmartRevisionQueue: () => {
    const { reviewItems } = get();
    const priorityOrder: ReviewCategory[] = ['repeated-mistake', 'wrong', 'slow', 'skipped', 'flagged', 'bookmarked'];

    return [...reviewItems].sort((a, b) => {
      const aPriority = Math.min(...a.categories.map((c) => priorityOrder.indexOf(c)).filter((i) => i >= 0), 999);
      const bPriority = Math.min(...b.categories.map((c) => priorityOrder.indexOf(c)).filter((i) => i >= 0), 999);
      if (aPriority !== bPriority) return aPriority - bPriority;
      return new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime();
    });
  },
}));

// Persist
useReviewStore.subscribe((state) => {
  saveToStorage(StorageKeys.REVIEW, { reviewItems: state.reviewItems });
});
