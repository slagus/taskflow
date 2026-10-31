import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react';
import type { TaskPriority, TaskStatus, CreateTaskInput } from '@taskflow/types';

interface TaskFormProps {
  onSubmit: (input: CreateTaskInput) => void;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [category, setCategory] = useState<string>('');
  const [projectId, setProjectId] = useState<string>('');
  const [dueDate, setDueDate] = useState('');
  const [isAdvanced, setIsAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const input: CreateTaskInput = {
      title,
      description: description.trim() ? description : undefined,
      status,
      priority,
      category: category ? category : undefined,
      projectId: projectId ? projectId : undefined,
      dueDate: dueDate ? dueDate : undefined,
    };

    onSubmit(input);
    setTitle('');
    setDescription('');
    setCategory('');
    setProjectId('');
    setDueDate('');
    setIsAdvanced(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 p-6 rounded-xl backdrop-blur space-y-4 shadow-sm transition-all duration-300">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">Create New Task</h3>
        <button
          type="button"
          onClick={() => setIsAdvanced(!isAdvanced)}
          className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 flex items-center space-x-1 font-medium transition-colors"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          <span>{isAdvanced ? 'Hide advanced fields' : 'Show advanced / granular details'}</span>
          {isAdvanced ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Quick Default Single-Line View */}
        <div className="flex items-center space-x-3">
          <input 
            type="text" 
            placeholder="What needs to be done? (Press Enter or click Add)" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2.5 text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button 
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 shadow-lg shadow-indigo-500/20 whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </button>
        </div>

        {/* Animated Container (Accordion Expand) */}
        <div 
          className={`grid transition-all duration-300 ease-in-out ${
            isAdvanced ? 'grid-rows-[1fr] opacity-100 pt-4 border-t border-slate-200 dark:border-slate-800/80' : 'grid-rows-[0fr] opacity-0 pt-0 border-t-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 transition-opacity duration-300 ${isAdvanced ? 'opacity-100 delay-100' : 'opacity-0'}`}>
              <div className="lg:col-span-2">
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Description</label>
                <textarea 
                  placeholder="Add optional notes, context, or links..." 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Project Workspace (Optional)</label>
                <select 
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-800 dark:text-slate-300 focus:outline-none focus:border-indigo-500 transition"
                >
                  <option value="">(None - Uses Global Default)</option>
                  <option value="1">📁 Work & Career</option>
                  <option value="2">📁 Personal & Home</option>
                  <option value="3">📁 Health & Fitness</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Task Type / Category (Optional)</label>
                <select 
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-800 dark:text-slate-300 focus:outline-none focus:border-indigo-500 transition"
                >
                  <option value="">(None - Uses Default)</option>
                  <option value="Feature">⚡ Feature</option>
                  <option value="Bug">🐛 Bug Fix</option>
                  <option value="Chore">🧹 Chore</option>
                  <option value="Planning">📅 Planning</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Priority</label>
                <select 
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as TaskPriority)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-800 dark:text-slate-300 focus:outline-none focus:border-indigo-500 transition"
                >
                  <option value="low">Low Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Initial Status</label>
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value as TaskStatus)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-800 dark:text-slate-300 focus:outline-none focus:border-indigo-500 transition"
                >
                  <option value="todo">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="lg:col-span-2">
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Due Date</label>
                <input 
                  type="date" 
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-800 dark:text-slate-300 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}