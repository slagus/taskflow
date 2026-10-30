import { Task, CreateTaskInput, UpdateTaskInput } from '@taskflow/types';
import { ITaskRepository } from './repository';

const INITIAL_MOCK_TASKS: Task[] = [
  {
    id: '1',
    title: 'Design TaskFlow Design System',
    description: 'Create tokens for color, typography, and atomic buttons',
    status: 'in_progress',
    priority: 'high',
    category: 'Design',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Configure Turborepo Monorepo',
    description: 'Setup workspace structure for Web, Mobile, and Shared packages',
    status: 'completed',
    priority: 'urgent',
    category: 'Engineering',
    createdAt: new Date().toISOString(),
  },
];

export class LocalTaskRepository implements ITaskRepository {
  private tasks: Task[];

  constructor() {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('taskflow_demo_tasks');
      this.tasks = stored ? JSON.parse(stored) : INITIAL_MOCK_TASKS;
      this.persist();
    } else {
      this.tasks = INITIAL_MOCK_TASKS;
    }
  }

  private persist() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('taskflow_demo_tasks', JSON.stringify(this.tasks));
    }
  }

  async getTasks(): Promise<Task[]> {
    return [...this.tasks];
  }

  async getTaskById(id: string): Promise<Task | null> {
    return this.tasks.find((t) => t.id === id) || null;
  }

  async createTask(input: CreateTaskInput): Promise<Task> {
    const newTask: Task = {
      ...input,
      id: globalThis.crypto?.randomUUID() || Math.random().toString(36).substring(2, 9),
      createdAt: new Date().toISOString(),
    };
    this.tasks.unshift(newTask);
    this.persist();
    return newTask;
  }

  async updateTask(id: string, input: UpdateTaskInput): Promise<Task> {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index === -1) throw new Error('Task not found');
    this.tasks[index] = { ...this.tasks[index], ...input, updatedAt: new Date().toISOString() };
    this.persist();
    return this.tasks[index];
  }

  async deleteTask(id: string): Promise<boolean> {
    const initialLen = this.tasks.length;
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.persist();
    return this.tasks.length < initialLen;
  }
}
