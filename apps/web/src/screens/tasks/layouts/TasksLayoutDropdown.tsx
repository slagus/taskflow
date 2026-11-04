import React, { useEffect, useRef } from 'react';
import { List, Columns3, Check } from 'lucide-react';
import type { TasksLayoutVariant } from '../../../services/settingsService';
import { overlayService } from '../../../services/overlayService';

interface TasksLayoutDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  activeLayout: TasksLayoutVariant;
  onSelectLayout: (variant: TasksLayoutVariant) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  closeGuard?: () => boolean | Promise<boolean>;
}

export function TasksLayoutDropdown({
  isOpen,
  onClose,
  activeLayout,
  onSelectLayout,
  triggerRef,
  closeGuard = () => true,
}: TasksLayoutDropdownProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const overlayId = 'tasks-layout-popover';

  useEffect(() => {
    if (isOpen) {
      overlayService.register({ id: overlayId, onClose, closeGuard });
    } else {
      overlayService.unregister(overlayId);
    }
    return () => overlayService.unregister(overlayId);
  }, [isOpen, onClose, closeGuard]);

  useEffect(() => {
    async function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (triggerRef.current && triggerRef.current.contains(target)) return;

      if (popoverRef.current && !popoverRef.current.contains(target)) {
        if (closeGuard) {
          const allowed = await closeGuard();
          if (!allowed) return;
        }
        onClose();
      }
    }

    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, closeGuard, triggerRef]);

  if (!isOpen) return null;

  const options: { id: TasksLayoutVariant; label: string; description: string; icon: React.ReactNode }[] = [
    {
      id: 'list',
      label: 'Normal Task List',
      description: 'Clean sequential stream with quick-add form.',
      icon: <List className="h-4 w-4 text-indigo-500" />,
    },
    {
      id: 'kanban',
      label: 'Kanban Board',
      description: 'Visual column layout structured by task progress status.',
      icon: <Columns3 className="h-4 w-4 text-cyan-500" />,
    },
  ];

  return (
    <div
      ref={popoverRef}
      className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 p-3 space-y-1.5 animate-fade-in"
    >
      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800/80 mb-1">
        <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Tasks Layout</h4>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Select view style</p>
      </div>

      {options.map((opt) => {
        const isSelected = activeLayout === opt.id;
        return (
          <button
            key={opt.id}
            onClick={async () => {
              if (closeGuard) {
                const allowed = await closeGuard();
                if (!allowed) return;
              }
              onSelectLayout(opt.id);
              onClose();
            }}
            className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start space-x-3 relative ${
              isSelected ? 'bg-indigo-50 dark:bg-indigo-950/40 text-slate-900 dark:text-white font-medium' : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
            }`}
          >
            <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0 mt-0.5">{opt.icon}</div>
            <div className="pr-6">
              <div className="text-xs font-semibold text-slate-900 dark:text-white">{opt.label}</div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">{opt.description}</p>
            </div>
            {isSelected && (
              <div className="absolute top-3 right-3 text-indigo-600 dark:text-indigo-400">
                <Check className="h-4 w-4" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}