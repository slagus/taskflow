import React, { useState } from 'react';
import type { Task } from '@taskflow/types';
import { AiTaskAdvisor } from '../../../components/AiTaskAdvisor';
import { QuickFilterChips } from '../../../components/QuickFilterChips';
import { PomodoroFocusTimer } from '../../../components/PomodoroFocusTimer';
import { ActivityStreamWidget } from '../../../components/ActivityStreamWidget';
import { TaskAnalyticsCharts } from '../../../components/TaskAnalyticsCharts';
import { TaskVelocityChart } from '../../../components/TaskVelocityChart';
import { TaskForm } from '../../../components/TaskForm';
import { TaskItem } from '../../../components/TaskItem';

export function TabbedWorkspaceLayout(props: any) {
  const [dashboardTab, setDashboardTab] = useState<'overview' | 'analytics' | 'focus'>('overview');

  return (
    <div className="space-y-6">
      <div className="flex space-x-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button onClick={() => setDashboardTab('overview')} className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${dashboardTab === 'overview' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400'}`}>Overview & Tasks</button>
        <button onClick={() => setDashboardTab('analytics')} className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${dashboardTab === 'analytics' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400'}`}>Analytics & Velocity</button>
        <button onClick={() => setDashboardTab('focus')} className={`px-4 py-2 rounded-lg text-xs font-semibold transition ${dashboardTab === 'focus' ? 'bg-indigo-600 text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400'}`}>Focus & Activity</button>
      </div>

      {dashboardTab === 'overview' && (
        <div className="space-y-4">
          <AiTaskAdvisor tasks={props.tasks} />
          <QuickFilterChips activeQuickFilter={props.quickFilter} onSelectFilter={props.setQuickFilter} />
          <TaskForm onSubmit={props.createTask} />
          <div className="space-y-2 pt-2">
            {props.displayedTasks.map((t: Task) => <TaskItem key={t.id} task={t} onToggleStatus={props.toggleTaskStatus} onDelete={props.deleteTask} />)}
          </div>
        </div>
      )}

      {dashboardTab === 'analytics' && (
        <div className="space-y-6">
          <TaskAnalyticsCharts tasks={props.tasks} />
          <TaskVelocityChart tasks={props.tasks} />
        </div>
      )}

      {dashboardTab === 'focus' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PomodoroFocusTimer />
          <ActivityStreamWidget />
        </div>
      )}
    </div>
  );
}