import React from 'react';
import type { Task } from '@taskflow/types';
import { AiTaskAdvisor } from '../../../components/AiTaskAdvisor';
import { QuickFilterChips } from '../../../components/QuickFilterChips';
import { PomodoroFocusTimer } from '../../../components/PomodoroFocusTimer';
import { ActivityStreamWidget } from '../../../components/ActivityStreamWidget';
import { TaskAnalyticsCharts } from '../../../components/TaskAnalyticsCharts';
import { TaskForm } from '../../../components/TaskForm';
import { TaskItem } from '../../../components/TaskItem';

export function FocusModeLayout(props: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8 space-y-4">
        <AiTaskAdvisor tasks={props.tasks} />
        <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 p-5 rounded-xl space-y-4 shadow-sm">
          <QuickFilterChips activeQuickFilter={props.quickFilter} onSelectFilter={props.setQuickFilter} />
          <TaskForm onSubmit={props.createTask} />
          <div className="space-y-2 pt-2">
            {props.displayedTasks.map((t: Task) => <TaskItem key={t.id} task={t} onToggleStatus={props.toggleTaskStatus} onDelete={props.deleteTask} />)}
          </div>
        </div>
      </div>
      <div className="lg:col-span-4 space-y-6">
        <PomodoroFocusTimer />
        <ActivityStreamWidget />
        <TaskAnalyticsCharts tasks={props.tasks} />
      </div>
    </div>
  );
}