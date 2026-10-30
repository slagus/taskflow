import React from 'react';
import { CheckCircle2, Clock, AlertCircle, CheckSquare } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';
import { TaskForm } from '../components/TaskForm';
import { TaskItem } from '../components/TaskItem';
import type { Task, CreateTaskInput } from '@taskflow/types';
import type { TaskFilterTab } from '../hooks/useTaskManagement';

interface DashboardViewProps {
  tasks: Task[];
  loading: boolean;
  filter: TaskFilterTab;
  setFilter: (tab: TaskFilterTab) => void;
  metrics: { total: number; completed: number; inProgress: number; urgent: number };
  onCreateTask: (input: CreateTaskInput) => void;
  onToggleTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
}

export function DashboardView({
  tasks,
  loading,
  filter,
  setFilter,
  metrics,
  onCreateTask,
  onToggleTask,
  onDeleteTask,
}: DashboardViewProps) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Welcome back, Developer 👋</h1>
        <p className="text-sm text-slate-400 mt-1">Here is your productivity overview and active task stream.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard title="Total Tasks" value={metrics.total} icon={<CheckSquare className="h-5 w-5 text-indigo-400" />} />
        <MetricCard title="In Progress" value={metrics.inProgress} icon={<Clock className="h-5 w-5 text-cyan-400" />} />
        <MetricCard title="Completed" value={metrics.completed} icon={<CheckCircle2 className="h-5 w-5 text-emerald-400" />} />
        <MetricCard title="Urgent Focus" value={metrics.urgent} icon={<AlertCircle className="h-5 w-5 text-rose-400" />} />
      </div>

      <TaskForm onSubmit={onCreateTask} />

      {/* Task Feed Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">Task Stream</h3>
          
          <div className="flex space-x-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
            {(['all', 'todo', 'in_progress', 'completed'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition ${
                  filter === tab ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading your workspace...</div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/30 border border-slate-800/80 rounded-xl">
            <CheckSquare className="h-10 w-10 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400 font-medium">No tasks found</p>
            <p className="text-xs text-slate-600 mt-1">Create one above to get started.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskItem 
                key={task.id} 
                task={task} 
                onToggle={onToggleTask} 
                onDelete={onDeleteTask} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}