import React from 'react';
import { CheckCircle2, Trash2 } from 'lucide-react';
import type { Task } from '@taskflow/types';

interface TaskItemProps {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-xl flex items-center justify-between hover:border-slate-700 transition backdrop-blur group">
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => onToggle(task)}
          className={`h-5 w-5 rounded-md border flex items-center justify-center transition ${
            task.status === 'completed' 
              ? 'bg-emerald-500 border-emerald-500 text-white' 
              : task.status === 'in_progress'
              ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
              : 'border-slate-700 hover:border-slate-500'
          }`}
        >
          {task.status === 'completed' && <CheckCircle2 className="h-3.5 w-3.5" />}
        </button>
        <div>
          <h4 className={`text-sm font-medium ${task.status === 'completed' ? 'line-through text-slate-500' : 'text-slate-200'}`}>
            {task.title}
          </h4>
          {task.description && (
            <p className="text-xs text-slate-400 mt-0.5">{task.description}</p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold ${
          task.priority === 'urgent' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
          task.priority === 'high' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
          'bg-slate-800 text-slate-400'
        }`}>
          {task.priority}
        </span>
        <span className="text-xs text-slate-500 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">
          {task.category}
        </span>
        <button 
          onClick={() => onDelete(task.id)}
          className="text-slate-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition p-1"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}