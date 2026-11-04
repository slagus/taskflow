import React, { useState, useRef } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useTaskManagement } from '../../hooks/useTaskManagement';
import { applyQuickFilter, type QuickFilterType } from '@taskflow/services';
import { settingsService, type LayoutVariant } from '../../services/settingsService';

import { StandardLayout } from './layouts/StandardLayout';
import { CommandCenterLayout } from './layouts/CommandCenterLayout';
import { FocusModeLayout } from './layouts/FocusModeLayout';
import { TabbedWorkspaceLayout } from './layouts/TabbedWorkspaceLayout';
import { LayoutDropdownPopover } from './layouts/LayoutDropdownPopover';

export function DashboardView() {
  const {
    tasks,
    filter,
    setFilter,
    metrics,
    createTask,
    toggleTaskStatus,
    deleteTask,
    getFilteredTasks,
  } = useTaskManagement();

  const [quickFilter, setQuickFilter] = useState<QuickFilterType>('all');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null); // <--- Add ref for trigger button

  const [layoutVariant, setLayoutVariant] = useState<LayoutVariant>(() => {
    return settingsService.getSettings().layoutVariant;
  });

  const handleLayoutChange = (variant: LayoutVariant) => {
    setLayoutVariant(variant);
    const currentSettings = settingsService.getSettings();
    settingsService.saveSettings({ ...currentSettings, layoutVariant: variant });
  };

  const handleCloseGuard = () => {
    return true; 
  };

  const baseFiltered = getFilteredTasks();
  const displayedTasks = applyQuickFilter(baseFiltered, quickFilter);

  const layoutProps = {
    tasks,
    displayedTasks,
    metrics,
    filter,
    setFilter,
    quickFilter,
    setQuickFilter,
    createTask,
    toggleTaskStatus,
    deleteTask,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Dashboard Overview
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Welcome back! Here is your active workspace stream.
          </p>
        </div>

        <div className="relative self-start md:self-auto">
          <button
            ref={triggerRef} // <--- Attach ref here
            onClick={() => setIsPopoverOpen((prev) => !prev)}
            className="flex items-center space-x-2 px-3.5 py-2 text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 text-slate-700 dark:text-slate-300 rounded-xl shadow-sm transition"
          >
            <SlidersHorizontal className="h-4 w-4 text-indigo-500" />
            <span>Layout Variant</span>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isPopoverOpen ? 'rotate-180' : ''}`} />
          </button>

          <LayoutDropdownPopover
            isOpen={isPopoverOpen}
            onClose={() => setIsPopoverOpen(false)}
            activeLayout={layoutVariant}
            onSelectLayout={handleLayoutChange}
            closeGuard={handleCloseGuard}
            triggerRef={triggerRef} // <--- Pass ref down
          />
        </div>
      </div>

      {/* Render Active Layout Variant */}
      {layoutVariant === 'standard' && <StandardLayout {...layoutProps} />}
      {layoutVariant === 'command_center' && <CommandCenterLayout {...layoutProps} />}
      {layoutVariant === 'focus' && <FocusModeLayout {...layoutProps} />}
      {layoutVariant === 'tabbed' && <TabbedWorkspaceLayout {...layoutProps} />}
    </div>
  );
}