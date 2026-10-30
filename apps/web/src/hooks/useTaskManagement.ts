import { useEffect, useState } from 'react';
import { getTaskRepository } from '@taskflow/database';
import type { ITaskRepository } from '@taskflow/database';
import type { Task, CreateTaskInput, TaskStatus } from '@taskflow/types';

export type TaskFilterTab = 'all' | 'todo' | 'in_progress' | 'completed';

export function useTaskManagement() {
  const [repo, setRepo] = useState<ITaskRepository | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<TaskFilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const taskRepo = getTaskRepository();
    setRepo(taskRepo);
    taskRepo.getTasks().then((data) => {
      setTasks(data);
      setLoading(false);
    });
  }, []);

  const createTask = async (input: CreateTaskInput) => {
    if (!repo) return;
    const created = await repo.createTask(input);
    setTasks([created, ...tasks]);
  };

  const toggleTaskStatus = async (task: Task) => {
    if (!repo) return;
    const nextStatus: TaskStatus = 
      task.status === 'todo' ? 'in_progress' : 
      task.status === 'in_progress' ? 'completed' : 'todo';

    const updated = await repo.updateTask(task.id, { status: nextStatus });
    setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
  };

  const deleteTask = async (id: string) => {
    if (!repo) return;
    await repo.deleteTask(id);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Filter and search logic
  const filteredTasks = tasks.filter((t) => {
    const matchesTab = filter === 'all' || t.status === filter;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (t.description?.toLowerCase() ?? '').includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Metrics
  const metrics = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'completed').length,
    inProgress: tasks.filter((t) => t.status === 'in_progress').length,
    urgent: tasks.filter((t) => t.priority === 'urgent' && t.status !== 'completed').length,
  };

  return {
    tasks: filteredTasks,
    allTasksCount: tasks.length,
    loading,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    metrics,
    createTask,
    toggleTaskStatus,
    deleteTask,
  };
}