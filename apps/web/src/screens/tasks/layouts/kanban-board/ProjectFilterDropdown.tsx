import React, { useEffect, useRef } from 'react';
import { FolderKanban, Check, Pin } from 'lucide-react';
import { overlayService } from '../../../../services/overlayService';

interface ProjectFilterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProject: string;
  onSelectProject: (projectId: string) => void;
  uniqueProjects: string[];
  triggerRef: React.RefObject<HTMLElement | null>;
}

export function ProjectFilterDropdown({
  isOpen,
  onClose,
  selectedProject,
  onSelectProject,
  uniqueProjects,
  triggerRef,
}: ProjectFilterDropdownProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const overlayId = 'project-filter-popover';

  useEffect(() => {
    if (isOpen) {
      overlayService.register({ id: overlayId, onClose });
    } else {
      overlayService.unregister(overlayId);
    }
    return () => overlayService.unregister(overlayId);
  }, [isOpen, onClose]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (triggerRef.current && triggerRef.current.contains(target)) return;

      if (popoverRef.current && !popoverRef.current.contains(target)) {
        onClose();
      }
    }

    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={popoverRef}
      className="absolute left-0 top-full mt-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 p-2 space-y-1 animate-fade-in"
    >
      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800/80 mb-1">
        <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">Filter Project</h4>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Select a project scope</p>
      </div>

      {/* All Tasks Option */}
      <button
        onClick={() => {
          onSelectProject('all');
          onClose();
        }}
        className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between text-xs font-medium ${
          selectedProject === 'all'
            ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'
            : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
        }`}
      >
        <div className="flex items-center space-x-2">
          <FolderKanban className="h-3.5 w-3.5 text-slate-400" />
          <span>All Tasks</span>
        </div>
        {selectedProject === 'all' && <Check className="h-3.5 w-3.5" />}
      </button>

      {/* Free Tasks Option */}
      <button
        onClick={() => {
          onSelectProject('free');
          onClose();
        }}
        className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between text-xs font-medium ${
          selectedProject === 'free'
            ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'
            : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
        }`}
      >
        <div className="flex items-center space-x-2">
          <Pin className="h-3.5 w-3.5 text-slate-400" />
          <span>Free Tasks</span>
        </div>
        {selectedProject === 'free' && <Check className="h-3.5 w-3.5" />}
      </button>

      {uniqueProjects.length > 0 && <div className="border-t border-slate-100 dark:border-slate-800/80 my-1" />}

      {/* Unique Project Options */}
      {uniqueProjects.map((projId) => {
        const isSelected = selectedProject === projId;
        return (
          <button
            key={projId}
            onClick={() => {
              onSelectProject(projId);
              onClose();
            }}
            className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center justify-between text-xs font-medium ${
              isSelected
                ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
            }`}
          >
            <div className="flex items-center space-x-2 truncate">
              <span className="text-xs">📁</span>
              <span className="truncate">{projId}</span>
            </div>
            {isSelected && <Check className="h-3.5 w-3.5 shrink-0" />}
          </button>
        );
      })}
    </div>
  );
}