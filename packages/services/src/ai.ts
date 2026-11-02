import type { Task } from '@taskflow/types';

export function generateTaskAdvice(tasks: Task[]): string {
  const todayStr = new Date().toISOString().split('T')[0];
  const overdue = tasks.filter((t) => t.dueDate && t.dueDate < todayStr && t.status !== 'completed').length;
  const urgent = tasks.filter((t) => (t.priority === 'high' || t.priority === 'urgent') && t.status !== 'completed').length;
  const completedToday = tasks.filter((t) => t.status === 'completed' && t.updatedAt?.split('T')[0] === todayStr).length;

  if (overdue > 0) {
    return `⚠️ You have ${overdue} overdue task${overdue > 1 ? 's' : ''}. Let's clear those out first to restore momentum!`;
  }
  if (urgent > 0) {
    return `🔥 You have ${urgent} high-priority or urgent task${urgent > 1 ? 's' : ''} waiting. Focus on the most critical item today.`;
  }
  if (completedToday > 0) {
    return `✨ Great job! You've completed ${completedToday} task${completedToday > 1 ? 's' : ''} today. Keep up the steady pace.`;
  }
  return `💡 All caught up! Create a new task or select a project workspace to get started.`;
}