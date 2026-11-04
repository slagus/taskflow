import React from 'react';
import type { Task } from '@taskflow/types';
import { TaskItem } from '../../../../components/TaskItem'; // adjust import path as needed

interface KanbanCardProps {
  task: Task;
  isBeingDragged: boolean;
  isRecentlyMoved: boolean;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDragEnd: () => void;
  onDragOverCard: (e: React.DragEvent, index: number) => void;
  index: number;
  onToggleStatus: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function KanbanCard({
  task,
  isBeingDragged,
  isRecentlyMoved,
  onDragStart,
  onDragEnd,
  onDragOverCard,
  index,
  onToggleStatus,
  onDelete,
}: KanbanCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragEnd={onDragEnd}
      onDragOver={(e) => onDragOverCard(e, index)}
      className={`cursor-grab active:cursor-grabbing transition-all duration-200 ${
        isBeingDragged
          ? 'opacity-30 scale-[0.98]'
          : isRecentlyMoved
          ? 'ring-2 ring-indigo-500 shadow-lg shadow-indigo-500/20 scale-[1.02] bg-indigo-50/40 dark:bg-indigo-950/40 animate-pulse rounded-xl'
          : 'hover:-translate-y-0.5'
      }`}
    >
      <div className="space-y-1">
        {task.projectId ? (
          <div className="px-2 py-0.5 text-[10px] font-medium bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-md w-fit">
            📁 {task.projectId}
          </div>
        ) : (
          <div className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md w-fit">
            📌 Free Task
          </div>
        )}
        <TaskItem task={task} onToggleStatus={onToggleStatus} onDelete={onDelete} />
      </div>
    </div>
  );
}