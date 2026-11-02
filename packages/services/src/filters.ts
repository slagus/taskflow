import type { Task, QuickFilterType } from '@taskflow/types';


// Filter and Search
export function filterAndSearchTasks(
  tasks: Task[], 
  filter: string, 
  searchQuery: string, 
  projectFilter?: string
) {
  return tasks.filter((task) => {
    // Project / Category Workspace Filter
    if (projectFilter && task.category !== projectFilter && task.projectId !== projectFilter) {
      return false;
    }

    // Status Tab Filter
    if (filter !== 'all' && task.status !== filter) {
      return false;
    }

    // Search Query Filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(query);
      const matchesDesc = task.description?.toLowerCase().includes(query) || false;
      const matchesCategory = task.category?.toLowerCase().includes(query) || false;
      if (!matchesTitle && !matchesDesc && !matchesCategory) return false;
    }

    return true;
  });
}


export function applyQuickFilter(tasks: Task[], quickFilter: QuickFilterType): Task[] {
  const todayStr = new Date().toISOString().split('T')[0];
  switch (quickFilter) {
    case 'due_today':
      return tasks.filter((t) => t.dueDate === todayStr && t.status !== 'completed');
    case 'overdue':
      return tasks.filter((t) => t.dueDate && t.dueDate < todayStr && t.status !== 'completed');
    case 'high_priority':
      return tasks.filter((t) => (t.priority === 'high' || t.priority === 'urgent') && t.status !== 'completed');
    default:
      return tasks;
  }
}