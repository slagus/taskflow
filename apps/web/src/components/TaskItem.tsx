import React from 'react';
import { CheckCircle2, Circle, Clock, Trash2, Calendar, Tag } from 'lucide-react';
import type { Task } from '@taskflow/types';

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
}

const PRIORITY_BADGES: Record<Task['priority'], string> = {
  low: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700',
  medium: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20',
  high: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-500/20',
  urgent: 'bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-500/20',
};

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  const isCompleted = task.status === 'completed';
  const isInProgress = task.status === 'in_progress';

  return (
    <div className={`group bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 p-4 rounded-xl backdrop-blur flex items-center justify-between transition-all hover:border-slate-300 dark:hover:border-slate-700 shadow-sm ${
      isCompleted ? 'opacity-65' : ''
    }`}>
      <div className="flex items-start space-x-3.5 flex-1 min-w-0 pr-4">
        <button
          onClick={() => onToggle(task)}
          className="mt-0.5 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0"
        >
          {isCompleted ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-500" />
          ) : isInProgress ? (
            <Clock className="h-5 w-5 text-cyan-500" />
          ) : (
            <Circle className="h-5 w-5" />
          )}
        </button>

        <div className="space-y-1 min-w-0 flex-1">
          <div className="flex items-center space-x-2 flex-wrap gap-y-1">
            <span className={`text-sm font-medium transition-colors ${
              isCompleted 
                ? 'line-through text-slate-400 dark:text-slate-500' 
                : 'text-slate-900 dark:text-slate-100'
            }`}>
              {task.title}
            </span>

            {/* Priority Badge */}
            <span className={`text-[10px] px-2 py-0.5 rounded border capitalize font-semibold ${PRIORITY_BADGES[task.priority]}`}>
              {task.priority}
            </span>

            {/* Category / Type Badge */}
            {task.category && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center space-x-1">
                <Tag className="h-2.5 w-2.5" />
                <span>{task.category}</span>
              </span>
            )}
          </div>

          {task.description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
              {task.description}
            </p>
          )}

          {task.dueDate && (
            <div className="flex items-center space-x-1 text-[11px] text-slate-400 dark:text-slate-500 pt-0.5">
              <Calendar className="h-3 w-3" />
              <span>Due: {task.dueDate}</span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="text-slate-400 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all p-1.5 rounded-md hover:bg-rose-50 dark:hover:bg-rose-500/10 shrink-0"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}