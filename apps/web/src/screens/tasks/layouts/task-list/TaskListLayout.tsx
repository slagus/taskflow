import React, { useState } from 'react';
import type { Task } from '@taskflow/types';
import { TaskForm } from '../../../../components/TaskForm';
import { TaskItem } from '../../../../components/TaskItem';
import { GripVertical } from 'lucide-react';

interface TaskListLayoutProps {
  tasks: Task[];
  onCreateTask: (input: any) => void;
  onToggleStatus: (task: Task) => void;
  onDelete: (id: string) => void;
  onReorderList: (reorderedIds: string[]) => void;
}

export function TaskListLayout({ tasks, onCreateTask, onToggleStatus, onDelete, onReorderList }: TaskListLayoutProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const sortedTasks = [...tasks].sort((a, b) => (a.listOrder ?? 0) - (b.listOrder ?? 0));

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedId(id);
    e.dataTransfer.setData('text/plain', id);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedId || draggedId === targetId) return;

    const ids = sortedTasks.map((t) => t.id);
    const draggedIndex = ids.indexOf(draggedId);
    const targetIndex = ids.indexOf(targetId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      ids.splice(draggedIndex, 1);
      ids.splice(targetIndex, 0, draggedId);
      onReorderList(ids);
    }
    setDraggedId(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 p-5 rounded-xl backdrop-blur space-y-4 shadow-sm">
      <TaskForm onSubmit={onCreateTask} />
      <div className="space-y-2 pt-2">
        {sortedTasks.length === 0 ? (
          <p className="text-center py-12 text-sm text-slate-500">No tasks found.</p>
        ) : (
          sortedTasks.map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={(e) => handleDragStart(e, task.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, task.id)}
              className={`flex items-center space-x-2 transition-all ${
                draggedId === task.id ? 'opacity-40 border border-dashed border-indigo-500 rounded-xl' : ''
              }`}
            >
              <div className="cursor-grab text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1">
                <GripVertical className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <TaskItem task={task} onToggleStatus={onToggleStatus} onDelete={onDelete} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}