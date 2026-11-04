import type { Task, CreateTaskInput } from '@taskflow/types';

// Entity Factory: Create task data structure
export function createNewTaskEntity(
    input: CreateTaskInput, 
    listOrder: number = 0, 
    kanbanOrder: number = 0
  ): Task {
  return {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    title: input.title.trim(),
    description: input.description?.trim(),
    status: input.status || 'todo',
    priority: input.priority || 'medium',
    category: input.category,
    projectId: input.projectId,
    listOrder,
    kanbanOrder,
    dueDate: input.dueDate,
    createdAt: new Date().toISOString(),
  };
}