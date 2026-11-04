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

  const createTask = useCallback((input: CreateTaskInput) => {
    setTasks((prev) => {
      const maxListOrder = prev.length > 0 ? Math.max(...prev.map((t) => t.listOrder ?? 0)) : -1;
      const targetStatus = input.status || 'todo';
      const statusTasks = prev.filter((t) => t.status === targetStatus);
      const maxKanbanOrder = statusTasks.length > 0 ? Math.max(...statusTasks.map((t) => t.kanbanOrder ?? 0)) : -1;

      const newTask = createNewTaskEntity(input, maxListOrder + 1, maxKanbanOrder + 1);
      return [newTask, ...prev];
    });
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

  const updateTask = useCallback((taskId: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, ...updates , updatedAt: new Date().toISOString() }
          : t
      )
    );
  }, []);


  // Reorder simple list view
  const reorderTaskList = useCallback((reorderedTaskIds: string[]) => {
    setTasks((prev) => {
      return prev.map((t) => {
        const newIndex = reorderedTaskIds.indexOf(t.id);
        return newIndex !== -1 ? { ...t, listOrder: newIndex, updatedAt: new Date().toISOString() } : t;
      });
    });
  }, []);

  const moveTaskToKanbanLaneWithPosition = useCallback((
    taskId: string, 
    targetStatus: TaskStatus, 
    targetIndex?: number
  ) => {
    setTasks((prev) => {
      const columnTasks = prev
        .filter((t) => t.status === targetStatus && t.id !== taskId)
        .sort((a, b) => (a.kanbanOrder ?? 0) - (b.kanbanOrder ?? 0));

      const taskToMove = prev.find((t) => t.id === taskId);
      if (!taskToMove) return prev;

      // Insert at the exact placeholder index tracked by the UI
      if (typeof targetIndex === 'number' && targetIndex >= 0) {
        columnTasks.splice(targetIndex, 0, { ...taskToMove, status: targetStatus });
      } else {
        columnTasks.push({ ...taskToMove, status: targetStatus });
      }

      const updatedColumnMap = new Map(
        columnTasks.map((t, index) => [t.id, index])
      );

      return prev.map((t) => {
        if (t.id === taskId) {
          return {
            ...t,
            status: targetStatus,
            kanbanOrder: updatedColumnMap.get(taskId) ?? 0,
            updatedAt: new Date().toISOString(),
          };
        }
        if (t.status === targetStatus && updatedColumnMap.has(t.id)) {
          return {
            ...t,
            kanbanOrder: updatedColumnMap.get(t.id)!,
            updatedAt: new Date().toISOString(),
          };
        }
        return t;
      });
    });
  }, []);

  const updateTaskStatus = useCallback((taskId: string, newStatus: TaskStatus) => {
    updateTask(taskId, { status: newStatus } );
  }, [updateTask]);

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
    updateTask,
    updateTaskStatus,
    reorderTaskList,
    moveTaskToKanbanLaneWithPosition,
    deleteTask,
    getFilteredTasks: (projectFilter?: string) => filterAndSearchTasks(tasks, filter, searchQuery, projectFilter),
  };
}