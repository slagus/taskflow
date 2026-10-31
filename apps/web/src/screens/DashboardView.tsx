import React from 'react';
import { useTaskManagement } from '../hooks/useTaskManagement';
import { TaskForm } from '../components/TaskForm';
import { TaskItem } from '../components/TaskItem';
import { MetricCard } from '../components/MetricCard';
import { CheckSquare, ListTodo, Clock, CheckCircle2, Search } from 'lucide-react';
import type { Task } from '@taskflow/types';

interface DashboardViewProps {
  selectedCategoryFilter?: string;
  onClearCategoryFilter?: () => void;
}

export function DashboardView({ selectedCategoryFilter, onClearCategoryFilter }: DashboardViewProps) {
  // Encapsulate hook connection directly inside the dashboard
  const {
    tasks,
    loading,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    metrics,
    createTask,
    toggleTaskStatus,
    deleteTask,
  } = useTaskManagement();

  // Filter tasks if a project/category filter is active from the Projects screen
  const displayedTasks = selectedCategoryFilter 
    ? tasks.filter(t => t.category === selectedCategoryFilter || t.projectId === selectedCategoryFilter)
    : tasks;

  return (
    <div className="space-y-6">
      {/* Header & Optional Project Filter Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {selectedCategoryFilter ? `Project: ${selectedCategoryFilter}` : 'Welcome back, Developer 👋'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {selectedCategoryFilter 
              ? `Showing tasks filtered for workspace "${selectedCategoryFilter}"`
              : 'Here is your productivity overview and active task stream.'}
          </p>
        </div>

        {selectedCategoryFilter && (
          <button
            onClick={onClearCategoryFilter}
            className="self-start text-xs bg-indigo-50 dark:bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 px-3 py-1.5 rounded-lg font-medium hover:bg-indigo-100 dark:hover:bg-indigo-600/20 transition"
          >
            Clear Filter ×
          </button>
        )}
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard title="Total Tasks" value={metrics.total} icon={<ListTodo className="h-5 w-5 text-indigo-500" />} />
        <MetricCard title="In Progress" value={metrics.inProgress} icon={<Clock className="h-5 w-5 text-cyan-500" />} />
        <MetricCard title="Completed" value={metrics.completed} icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />} />
      </div>

      {/* Quick-Add Task Form */}
      <TaskForm onSubmit={createTask} />

      {/* Toolbar: Search & Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        {/* Local Search Input for Dashboard */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400 dark:text-slate-500" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..." 
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors w-full sm:w-auto justify-end">
          {(['all', 'todo', 'in_progress', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition ${
                filter === tab
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800/60'
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Task List / Loading / Empty States */}
      {loading ? (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">Loading your workspace...</div>
      ) : displayedTasks.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800/80 rounded-xl shadow-sm transition-colors">
          <CheckSquare className="h-10 w-10 text-slate-400 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-slate-800 dark:text-slate-300 font-medium">No tasks found</p>
          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">Create one above to get started.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayedTasks.map((task: Task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={toggleTaskStatus} 
              onDelete={deleteTask} 
            />
          ))}
        </div>
      )}
    </div>
  );
}