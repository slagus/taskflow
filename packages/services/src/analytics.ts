
import type { Task } from '@taskflow/types';

export interface PriorityDistribution {
  name: string;
  count: number;
  color: string;
}

export interface StatusDistribution {
  status: string;
  count: number;
}

export interface VelocityDataPoint {
  date: string;
  completed: number;
}

export function getPriorityChartData(tasks: Task[]): PriorityDistribution[] {
  const priorities = [
    { name: 'Low', key: 'low', color: '#64748b' },
    { name: 'Medium', key: 'medium', color: '#3b82f6' },
    { name: 'High', key: 'high', color: '#f59e0b' },
    { name: 'Urgent', key: 'urgent', color: '#f43f5e' },
  ];

  return priorities.map((p) => ({
    name: p.name,
    count: tasks.filter((t) => t.priority === p.key).length,
    color: p.color,
  }));
}

export function getStatusChartData(tasks: Task[]): StatusDistribution[] {
  return [
    { status: 'To Do', count: tasks.filter((t) => t.status === 'todo').length },
    { status: 'In Progress', count: tasks.filter((t) => t.status === 'in_progress').length },
    { status: 'Completed', count: tasks.filter((t) => t.status === 'completed').length },
  ];
}

export function getTaskVelocityData(tasks: Task[]): VelocityDataPoint[] {
  const days = 7;
  const result: VelocityDataPoint[] = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const displayDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    // Count tasks completed on this date (using updatedAt or completion timestamp)
    const count = tasks.filter((t) => {
      if (t.status !== 'completed' || !t.updatedAt) return false;
      return t.updatedAt.split('T')[0] === dateStr;
    }).length;

    result.push({ date: displayDate, completed: count });
  }

  return result;
}