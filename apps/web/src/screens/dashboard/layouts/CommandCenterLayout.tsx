import React from 'react';
import { ListTodo, Clock, CheckCircle2 } from 'lucide-react';
import type { Task } from '@taskflow/types';
import type { QuickFilterType } from '@taskflow/services';
import { AiTaskAdvisor } from '../../../components/AiTaskAdvisor';
import { QuickFilterChips } from '../../../components/QuickFilterChips';
import { PomodoroFocusTimer } from '../../../components/PomodoroFocusTimer';
import { TaskAnalyticsCharts } from '../../../components/TaskAnalyticsCharts';
import { TaskVelocityChart } from '../../../components/TaskVelocityChart';
import { MetricCard } from '../../../components/MetricCard';
import { TaskForm } from '../../../components/TaskForm';
import { TaskItem } from '../../../components/TaskItem';

export function CommandCenterLayout(props: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="md:col-span-4"><AiTaskAdvisor tasks={props.tasks} /></div>
      
      <div className="md:col-span-3 grid grid-cols-3 gap-4">
        <MetricCard title="Total" value={props.metrics.total} icon={<ListTodo className="h-5 w-5 text-indigo-500" />} />
        <MetricCard title="Active" value={props.metrics.inProgress} icon={<Clock className="h-5 w-5 text-cyan-500" />} />
        <MetricCard title="Done" value={props.metrics.completed} icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />} />
      </div>
      <div className="md:col-span-1"><PomodoroFocusTimer /></div>

      <div className="md:col-span-2"><TaskAnalyticsCharts tasks={props.tasks} /></div>
      <div className="md:col-span-2"><TaskVelocityChart tasks={props.tasks} /></div>

      <div className="md:col-span-4 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 p-5 rounded-xl space-y-4 shadow-sm">
        <QuickFilterChips activeQuickFilter={props.quickFilter} onSelectFilter={props.setQuickFilter} />
        <TaskForm onSubmit={props.createTask} />
        <div className="space-y-2 pt-2">
          {props.displayedTasks.map((t: Task) => <TaskItem key={t.id} task={t} onToggleStatus={props.toggleTaskStatus} onDelete={props.deleteTask} />)}
        </div>
      </div>
    </div>
  );
}