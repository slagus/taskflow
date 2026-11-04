import React from 'react';
import { ListTodo, Clock, CheckCircle2 } from 'lucide-react';
import type { Task } from '@taskflow/types';
import type { QuickFilterType } from '@taskflow/services';
import { AiTaskAdvisor } from '../../../components/AiTaskAdvisor';
import { QuickFilterChips } from '../../../components/QuickFilterChips';
import { PomodoroFocusTimer } from '../../../components/PomodoroFocusTimer';
import { ActivityStreamWidget } from '../../../components/ActivityStreamWidget';
import { TaskAnalyticsCharts } from '../../../components/TaskAnalyticsCharts';
import { TaskVelocityChart } from '../../../components/TaskVelocityChart';
import { MetricCard } from '../../../components/MetricCard';
import { TaskForm } from '../../../components/TaskForm';
import { TaskItem } from '../../../components/TaskItem';

interface LayoutProps {
  tasks: Task[];
  displayedTasks: Task[];
  metrics: { total: number; todo: number; inProgress: number; completed: number };
  filter: string;
  setFilter: (f: any) => void;
  quickFilter: QuickFilterType;
  setQuickFilter: (q: QuickFilterType) => void;
  createTask: (input: any) => void;
  toggleTaskStatus: (task: Task) => void;
  deleteTask: (id: string) => void;
}

export function StandardLayout(props: LayoutProps) {
  return (
    <div className="space-y-6">
      <AiTaskAdvisor tasks={props.tasks} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Total Tasks" value={props.metrics.total} icon={<ListTodo className="h-5 w-5 text-indigo-500" />} />
        <MetricCard title="In Progress" value={props.metrics.inProgress} icon={<Clock className="h-5 w-5 text-cyan-500" />} />
        <MetricCard title="Completed" value={props.metrics.completed} icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />} />
      </div>

      <TaskAnalyticsCharts tasks={props.tasks} />
      <TaskVelocityChart tasks={props.tasks} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 p-5 rounded-xl backdrop-blur space-y-4 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
              <QuickFilterChips activeQuickFilter={props.quickFilter} onSelectFilter={props.setQuickFilter} />
              <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-lg">
                {(['all', 'todo', 'in_progress', 'completed'] as const).map((tab) => (
                  <button key={tab} onClick={() => props.setFilter(tab)} className={`px-2.5 py-1 text-xs font-medium rounded-md transition capitalize ${props.filter === tab ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}>{tab.replace('_', ' ')}</button>
                ))}
              </div>
            </div>
            <TaskForm onSubmit={props.createTask} />
            <div className="space-y-2 pt-2">
              {props.displayedTasks.length === 0 ? <p className="text-center py-12 text-sm text-slate-500">No tasks match your filter.</p> : props.displayedTasks.map((t) => <TaskItem key={t.id} task={t} onToggleStatus={props.toggleTaskStatus} onDelete={props.deleteTask} />)}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <PomodoroFocusTimer />
          <ActivityStreamWidget />
        </div>
      </div>
    </div>
  );
}