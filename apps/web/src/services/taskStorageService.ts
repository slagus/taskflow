import type { Task } from '@taskflow/types';

const STORAGE_KEY = 'taskflow_tasks';

export const taskStorageService = {
  getTasks(): Task[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Failed to load tasks from storage:', error);
      return [];
    }
  },

  saveTasks(tasks: Task[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to storage:', error);
    }
  },
};