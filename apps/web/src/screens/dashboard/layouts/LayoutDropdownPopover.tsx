import React, { useEffect, useRef } from 'react';
import { LayoutTemplate, Columns2, Focus, Layers, Check } from 'lucide-react';
import type { LayoutVariant } from '../../../services/settingsService';
import { overlayService } from '../../../services/overlayService';

interface LayoutDropdownPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  activeLayout: LayoutVariant;
  onSelectLayout: (variant: LayoutVariant) => void;
  closeGuard?: () => boolean | Promise<boolean>;
  triggerRef: React.RefObject<HTMLElement | null>; // <--- Pass trigger ref
}

interface VariantOption {
  id: LayoutVariant;
  label: string;
  description: string;
  icon: React.ReactNode;
}

export function LayoutDropdownPopover({
  isOpen,
  onClose,
  activeLayout,
  onSelectLayout,
  closeGuard = () => true,
  triggerRef,
}: LayoutDropdownPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const overlayId = 'dashboard-layout-popover';

  // Register with overlay service stack when open
  useEffect(() => {
    if (isOpen) {
      overlayService.register({
        id: overlayId,
        onClose,
        closeGuard,
      });
    } else {
      overlayService.unregister(overlayId);
    }
    return () => {
      overlayService.unregister(overlayId);
    };
  }, [isOpen, onClose, closeGuard]);

  // Click outside listener (ignoring clicks on the trigger button itself)
  useEffect(() => {
    async function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      // If click is on the trigger button, let the button's own onClick handler manage the toggle
      if (triggerRef.current && triggerRef.current.contains(target)) {
        return;
      }

      // If click is outside the popover content
      if (popoverRef.current && !popoverRef.current.contains(target)) {
        if (closeGuard) {
          const allowed = await closeGuard();
          if (!allowed) return;
        }
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, closeGuard, triggerRef]);

  if (!isOpen) return null;

  const variants: VariantOption[] = [
    {
      id: 'standard',
      label: 'Standard Grid',
      description: 'Balanced layout with metrics top and task stream left.',
      icon: <LayoutTemplate className="h-4 w-4 text-indigo-500" />,
    },
    {
      id: 'command_center',
      label: 'Command Center',
      description: 'Asymmetric Bento grid for high-density monitoring.',
      icon: <Columns2 className="h-4 w-4 text-cyan-500" />,
    },
    {
      id: 'focus',
      label: 'Focus Mode',
      description: 'Task-first wide stream with compact sidebar utilities.',
      icon: <Focus className="h-4 w-4 text-purple-500" />,
    },
    {
      id: 'tabbed',
      label: 'Tabbed Workspace',
      description: 'Minimalist view separating stream, analytics, and timers.',
      icon: <Layers className="h-4 w-4 text-emerald-500" />,
    },
  ];

  return (
    <div
      ref={popoverRef}
      className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 p-3 space-y-1.5 transition-all animate-fade-in"
    >
      <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800/80 mb-1">
        <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
          Dashboard Variant
        </h4>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
          Select workspace density
        </p>
      </div>

      {variants.map((variant) => {
        const isSelected = activeLayout === variant.id;
        return (
          <button
            key={variant.id}
            onClick={async () => {
              if (closeGuard) {
                const allowed = await closeGuard();
                if (!allowed) return;
              }
              onSelectLayout(variant.id);
              onClose();
            }}
            className={`w-full text-left p-2.5 rounded-xl transition-all flex items-start space-x-3 relative ${
              isSelected
                ? 'bg-indigo-50 dark:bg-indigo-950/40 text-slate-900 dark:text-white font-medium'
                : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
            }`}
          >
            <div className="p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0 mt-0.5">
              {variant.icon}
            </div>
            <div className="pr-6">
              <div className="text-xs font-semibold text-slate-900 dark:text-white">
                {variant.label}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                {variant.description}
              </p>
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