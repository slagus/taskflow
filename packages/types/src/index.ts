export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export type TaskStatus = 'todo' | 'in_progress' | 'completed';

export interface Task {
  id: string;
  userId?: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  listOrder?: number;       // Order in the Simple List view
  kanbanOrder?: number;     // Order within its Kanban column
  category?: string;
  projectId?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt?: string;
}

export type CreateTaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;

export type UpdateTaskInput = Partial<CreateTaskInput>;

export type QuickFilterType = 'all' | 'due_today' | 'overdue' | 'high_priority';