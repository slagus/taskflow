import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Task, CreateTaskInput, TaskStatus } from '@taskflow/types';
import { 
  calculateMetrics, 
  filterAndSearchTasks, 
  createNewTaskEntity 
} from '@taskflow/services';
import { taskStorageService } from '../services/taskStorageService';

export function useTaskManagement() {
  const [tasks, setTasks] = useState<Task[]>(() => taskStorageService.getTasks());
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Sync state changes to browser storage via app service
  useEffect(() => {
    taskStorageService.saveTasks(tasks);
  }, [tasks]);

  // Compute metrics using shared package logic
  const metrics = useMemo(() => calculateMetrics(tasks), [tasks]);

  // CRUD Actions
  const createTask = useCallback((input: CreateTaskInput) => {
    const newTask = createNewTaskEntity(input);
    setTasks((prev) => [newTask, ...prev]);
  }, []);

  const toggleTaskStatus = useCallback((task: Task) => {
    const nextStatus: Record<TaskStatus, TaskStatus> = {
      todo: 'in_progress',
      in_progress: 'completed',
      completed: 'todo',
    };

    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? { ...t, status: nextStatus[t.status], updatedAt: new Date().toISOString() } : t))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return {
    tasks,
    loading,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    metrics,
    createTask,
    toggleTaskStatus,
    deleteTask,
    getFilteredTasks: (projectFilter?: string) => filterAndSearchTasks(tasks, filter, searchQuery, projectFilter),
  };
}