import { Task, CreateTaskInput, UpdateTaskInput } from '@taskflow/types';

export interface ITaskRepository {
  getTasks(): Promise<Task[]>;
  getTaskById(id: string): Promise<Task | null>;
  createTask(input: CreateTaskInput): Promise<Task>;
  updateTask(id: string, input: UpdateTaskInput): Promise<Task>;
  deleteTask(id: string): Promise<boolean>;
}
