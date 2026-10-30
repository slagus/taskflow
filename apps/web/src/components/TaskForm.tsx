import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { TaskPriority, CreateTaskInput } from '@taskflow/types';

interface TaskFormProps {
  onSubmit: (input: CreateTaskInput) => void;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [category, setCategory] = useState('General');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({ title, description, status: 'todo', priority, category });
    setTitle('');
    setDescription('');
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-xl backdrop-blur">
      <h3 className="text-base font-semibold text-white mb-4">Create New Task</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input 
            type="text" 
            placeholder="Task title..." 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <input 
            type="text" 
            placeholder="Description (optional)" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <div className="flex space-x-2">
            <select 
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 flex-1"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
              <option value="urgent">Urgent</option>
            </select>
            <button 
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition flex items-center space-x-2 shadow-lg shadow-indigo-500/20"
            >
              <Plus className="h-4 w-4" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}