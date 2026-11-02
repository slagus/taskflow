import React from 'react';
import { Flame, Clock, AlertCircle, Layers } from 'lucide-react';
import type { QuickFilterType } from '@taskflow/services';

interface QuickFilterChipsProps {
  activeQuickFilter: QuickFilterType;
  onSelectFilter: (filter: QuickFilterType) => void;
}

export function QuickFilterChips({ activeQuickFilter, onSelectFilter }: QuickFilterChipsProps) {
  const chips: { id: QuickFilterType; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Tasks', icon: <Layers className="h-3.5 w-3.5" /> },
    { id: 'due_today', label: 'Due Today', icon: <Clock className="h-3.5 w-3.5" /> },
    { id: 'overdue', label: 'Overdue', icon: <AlertCircle className="h-3.5 w-3.5" /> },
    { id: 'high_priority', label: 'High Priority', icon: <Flame className="h-3.5 w-3.5" /> },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.id}
          onClick={() => onSelectFilter(chip.id)}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            activeQuickFilter === chip.id
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-indigo-500/50'
          }`}
        >
          {chip.icon}
          <span>{chip.label}</span>
        </button>
      ))}
    </div>
  );
}