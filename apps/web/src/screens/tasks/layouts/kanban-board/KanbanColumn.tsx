import React from 'react';
import type { Task, TaskStatus } from '@taskflow/types';
import { KanbanCard } from './KanbanCard';

interface KanbanColumnProps {
  column: { id: TaskStatus; title: string; icon: React.ReactNode };
  columnTasks: Task[];
  isColumnHovered: boolean;
  draggedTaskId: string | null;
  dropIndex: number | null;
  recentlyMovedId: string | null;
  onDragOverColumn: (e: React.DragEvent, columnId: TaskStatus, totalCount: number) => void;
  onDragLeaveColumn: (e: React.DragEvent) => void;
  onDropColumn: (e: React.DragEvent, columnId: TaskStatus) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
  onDragEnd: () => void;
  onDragOverCard: (e: React.DragEvent, index: number) => void;
  onToggleStatus: (task: Task) => void;
  onDelete: (id: string) => void;
}

export function KanbanColumn({
  column,
  columnTasks,
  isColumnHovered,
  draggedTaskId,
  dropIndex,
  recentlyMovedId,
  onDragOverColumn,
  onDragLeaveColumn,
  onDropColumn,
  onDragStart,
  onDragEnd,
  onDragOverCard,
  onToggleStatus,
  onDelete,
}: KanbanColumnProps) {
  const draggedIndexInColumn = columnTasks.findIndex((t) => t.id === draggedTaskId);
  const isSelfAdjacent = draggedIndexInColumn !== -1 && (dropIndex === draggedIndexInColumn || dropIndex === draggedIndexInColumn + 1);

  return (
    <div
      onDragOver={(e) => onDragOverColumn(e, column.id, columnTasks.length)}
      onDragLeave={onDragLeaveColumn}
      onDrop={(e) => onDropColumn(e, column.id)}
      className={`bg-slate-50 dark:bg-slate-900/40 border rounded-2xl p-4 space-y-3 transition-colors ${
        isColumnHovered
          ? 'border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/20 ring-2 ring-indigo-500/20'
          : 'border-slate-200 dark:border-slate-800'
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          {column.icon}
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{column.title}</h3>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-[11px] font-medium text-slate-600 dark:text-slate-400">
          {columnTasks.length}
        </span>
      </div>

      {/* Cards Container */}
      <div className="space-y-2.5 min-h-[350px]">
        {columnTasks.length === 0 ? (
          <div className="h-full flex items-center justify-center py-16 pointer-events-none">
            <p className="text-xs text-slate-400 dark:text-slate-500 italic border border-dashed border-slate-200 dark:border-slate-800 w-full py-8 text-center rounded-xl">
              {isColumnHovered ? 'Drop task here' : 'Drag tasks here'}
            </p>
          </div>
        ) : (
          <>
            {columnTasks.map((task, index) => {
              const isBeingDragged = draggedTaskId === task.id;
              const isRecentlyMoved = recentlyMovedId === task.id;
              const showPlaceholderBefore = isColumnHovered && dropIndex === index && !isBeingDragged && !isSelfAdjacent;

              return (
                <React.Fragment key={task.id}>
                  {showPlaceholderBefore && (
                    <div className="h-16 w-full border-2 border-dashed border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/20 rounded-xl animate-pulse flex items-center justify-center my-1 pointer-events-none">
                      <span className="text-[11px] font-medium text-indigo-500 dark:text-indigo-400">Drop here</span>
                    </div>
                  )}

                  <KanbanCard
                    task={task}
                    isBeingDragged={isBeingDragged}
                    isRecentlyMoved={isRecentlyMoved}
                    onDragStart={onDragStart}
                    onDragEnd={onDragEnd}
                    onDragOverCard={onDragOverCard}
                    index={index}
                    onToggleStatus={onToggleStatus}
                    onDelete={onDelete}
                  />
                </React.Fragment>
              );
            })}

            {/* Bottom Placeholder */}
            {isColumnHovered && dropIndex === columnTasks.length && !isSelfAdjacent && (
              <div className="h-16 w-full border-2 border-dashed border-indigo-500 bg-indigo-50/20 dark:bg-indigo-950/20 rounded-xl animate-pulse flex items-center justify-center my-1 pointer-events-none">
                <span className="text-[11px] font-medium text-indigo-500 dark:text-indigo-400">Drop here</span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}