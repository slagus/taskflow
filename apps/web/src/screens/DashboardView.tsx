import React, { useState } from 'react';
import { ListTodo, Clock, CheckCircle2 } from 'lucide-react';
import { useTaskManagement } from '../hooks/useTaskManagement';
import { applyQuickFilter, type QuickFilterType } from '@taskflow/services';
import { TaskAnalyticsCharts } from '../components/TaskAnalyticsCharts';
import { TaskVelocityChart } from '../components/TaskVelocityChart';
import { AiTaskAdvisor } from '../components/AiTaskAdvisor';
import { QuickFilterChips } from '../components/QuickFilterChips';
import { PomodoroFocusTimer } from '../components/PomodoroFocusTimer';
import { ActivityStreamWidget } from '../components/ActivityStreamWidget';
import { MetricCard } from '../components/MetricCard';
import { TaskForm } from '../components/TaskForm';
import { TaskItem } from '../components/TaskItem';

export function DashboardView() {
  const {
    tasks,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    metrics,
    createTask,
    toggleTaskStatus,
    deleteTask,
    getFilteredTasks,
  } = useTaskManagement();

  const [quickFilter, setQuickFilter] = useState<QuickFilterType>('all');

  // Apply quick filter on top of status/search filtering
  const baseFiltered = getFilteredTasks();
  const displayedTasks = applyQuickFilter(baseFiltered, quickFilter);

  return (
    <div className="space-y-6">
      {/* Top Header & AI Advisor Banner */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Dashboard Overview
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Welcome back! Here is your daily productivity summary and active task stream.
            </p>
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3.5 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 transition w-full md:w-64"
          />
        </div>

        {/* 1. AI Task Advisor Widget */}
        <AiTaskAdvisor tasks={tasks} />
      </div>

      {/* Top Metrics Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          title="Total Tasks"
          value={metrics.total}
          icon={<ListTodo className="h-5 w-5 text-indigo-500" />}
        />
        <MetricCard
          title="In Progress"
          value={metrics.inProgress}
          icon={<Clock className="h-5 w-5 text-cyan-500" />}
        />
        <MetricCard
          title="Completed"
          value={metrics.completed}
          icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />}
        />
      </div>

      {/* Analytics Charts Section */}
      <div className="space-y-6">
        <TaskAnalyticsCharts tasks={tasks} />
        <TaskVelocityChart tasks={tasks} />
      </div>

      {/* Main Dashboard Grid: Task Stream (Left) & Sidebar Tools (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Quick Filter Chips, Creation Form & Task List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 p-5 rounded-xl backdrop-blur space-y-4 shadow-sm transition-colors">
            {/* Quick Filter Chips */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
              <QuickFilterChips
                activeQuickFilter={quickFilter}
                onSelectFilter={setQuickFilter}
              />

              {/* Status Tab Filter */}
              <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-950 p-1 rounded-lg">
                {(['all', 'todo', 'in_progress', 'completed'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition capitalize ${
                      filter === tab
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
                    }`}
                  >
                    {tab.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Add Form */}
            <TaskForm onSubmit={createTask} />

            {/* Task Item List Stream */}
            <div className="space-y-2 pt-2">
              {displayedTasks.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    No tasks match your current filter criteria.
                  </p>
                </div>
              ) : (
                displayedTasks.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggleStatus={toggleTaskStatus}
                    onDelete={deleteTask}
                  />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Pomodoro Focus Timer & Activity Stream */}
        <div className="space-y-6">
          <PomodoroFocusTimer />
          <ActivityStreamWidget />
        </div>
      </div>
    </div>
  );
}