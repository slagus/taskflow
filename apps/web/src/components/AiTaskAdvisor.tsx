import React from 'react';
import { Sparkles } from 'lucide-react';
import { generateTaskAdvice } from '@taskflow/services';
import type { Task } from '@taskflow/types';

export function AiTaskAdvisor({ tasks }: { tasks: Task[] }) {
  const advice = generateTaskAdvice(tasks);

  return (
    <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 dark:border-indigo-500/30 p-4 rounded-xl flex items-center space-x-3 transition-colors">
      <div className="p-2 bg-indigo-600 text-white rounded-lg shadow-sm">
        <Sparkles className="h-4 w-4 animate-pulse" />
      </div>
      <div>
        <h4 className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">AI Task Assistant</h4>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-0.5">{advice}</p>
      </div>
    </div>
  );
}