import React, { useState, useRef } from 'react';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useTaskManagement } from '../../hooks/useTaskManagement';
import { settingsService, type TasksLayoutVariant } from '../../services/settingsService';
import { TaskListLayout } from './layouts/task-list';
import { KanbanBoardLayout } from './layouts/kanban-board';
import { TasksLayoutDropdown } from './layouts/TasksLayoutDropdown';

export function TasksView() {
  const { tasks, createTask, toggleTaskStatus, updateTaskStatus, reorderTaskList, moveTaskToKanbanLaneWithPosition, deleteTask } = useTaskManagement();
  
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState('all');
  const triggerRef = useRef<HTMLButtonElement>(null);

  const [tasksLayout, setTasksLayout] = useState<TasksLayoutVariant>(() => {
    return settingsService.getSettings().tasksLayoutVariant || 'list';
  });

  const handleLayoutChange = (variant: TasksLayoutVariant) => {
    setTasksLayout(variant);
    const settings = settingsService.getSettings();
    settingsService.saveSettings({ ...settings, tasksLayoutVariant: variant });
  };

  const handleCloseGuard = () => {
    return true;
  };
  
  const handleProjectChange = (project) => {
    setSelectedProject(project);
  };

 
  return (
    <div className="space-y-6">
      {/* Header with Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Tasks Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            View, organize, and track all your workflow items independently.
          </p>
        </div>

        <div className="relative self-start md:self-auto">
          <button
            ref={triggerRef}
            onClick={() => setIsPopoverOpen((prev) => !prev)}
            className="flex items-center space-x-2 px-3.5 py-2 text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 text-slate-700 dark:text-slate-300 rounded-xl shadow-sm transition"
          >
            <SlidersHorizontal className="h-4 w-4 text-indigo-500" />
            <span>Tasks View</span>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isPopoverOpen ? 'rotate-180' : ''}`} />
          </button>

          <TasksLayoutDropdown
            isOpen={isPopoverOpen}
            onClose={() => setIsPopoverOpen(false)}
            activeLayout={tasksLayout}
            onSelectLayout={handleLayoutChange}
            triggerRef={triggerRef}
            closeGuard={handleCloseGuard}
          />
        </div>
      </div>

      {/* Render Active View Variant */}
      {tasksLayout === 'list' && (
        <TaskListLayout
          tasks={tasks}
          onCreateTask={createTask}
          onToggleStatus={toggleTaskStatus}
          onReorderList={reorderTaskList}
          onDelete={deleteTask}
        />
      )}

      {tasksLayout === 'kanban' && (
        <KanbanBoardLayout
          tasks={tasks}
          onToggleStatus={toggleTaskStatus}
          onDelete={deleteTask}
          onMoveToLane={moveTaskToKanbanLaneWithPosition}
          onUpdateStatus={updateTaskStatus}
          onSelectProject={handleProjectChange}
          selectedProject={selectedProject}
        />
      )}
    </div>
  );
}