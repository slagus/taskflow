import type { Task, CreateTaskInput } from '@taskflow/types';

// Entity Factory: Create task data structure
export function createNewTaskEntity(input: CreateTaskInput): Task {
  return {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    title: input.title.trim(),
    description: input.description?.trim(),
    status: input.status || 'todo',
    priority: input.priority || 'medium',
    category: input.category,
    projectId: input.projectId,
    dueDate: input.dueDate,
    createdAt: new Date().toISOString(),
  };
}