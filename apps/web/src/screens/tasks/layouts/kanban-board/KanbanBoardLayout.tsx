import React, { useState, useRef } from 'react';
import type { Task, TaskStatus, CreateTaskInput } from '@taskflow/types';
import { Clock, ListTodo, CheckCircle2, FolderKanban, Plus, ChevronDown } from 'lucide-react';
import { KanbanColumn } from './KanbanColumn';
import { TaskForm } from '../../../../components/TaskForm'; // adjust path
import { ProjectFilterDropdown } from './ProjectFilterDropdown';

interface KanbanBoardLayoutProps {
  tasks: Task[];
  onCreateTask: (input: CreateTaskInput) => void;
  onToggleStatus: (task: Task) => void;
  onDelete: (id: string) => void;
  onMoveToLane: (taskId: string, newStatus: TaskStatus, targetIndex?: number) => void;
  selectedProject?: string;
  onSelectProject: (projectId: string) => void;
}

export function KanbanBoardLayout({
  tasks,
  onCreateTask,
  onToggleStatus,
  onDelete,
  onMoveToLane,
  selectedProject = 'all',
  onSelectProject,
}: KanbanBoardLayoutProps) {
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [activeColumnHover, setActiveColumnHover] = useState<TaskStatus | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);
  const [recentlyMovedId, setRecentlyMovedId] = useState<string | null>(null);
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
  
  const [isProjectPopoverOpen, setIsProjectPopoverOpen] = useState<boolean>(false);
  const projectTriggerRef = useRef<HTMLButtonElement>(null);

  const uniqueProjects = Array.from(
    new Set(tasks.map((t) => t.projectId).filter(Boolean))
  ) as string[];

  const columns: { id: TaskStatus; title: string; icon: React.ReactNode }[] = [
    { id: 'todo', title: 'To Do', icon: <ListTodo className="h-4 w-4 text-indigo-500" /> },
    { id: 'in_progress', title: 'In Progress', icon: <Clock className="h-4 w-4 text-cyan-500" /> },
    { id: 'completed', title: 'Completed', icon: <CheckCircle2 className="h-4 w-4 text-emerald-500" /> },
  ];

  const filteredTasks = selectedProject === 'all'
    ? tasks
    : selectedProject === 'free'
    ? tasks.filter((t) => !t.projectId)
    : tasks.filter((t) => t.projectId === selectedProject);

  const getProjectLabel = () => {
    if (selectedProject === 'all') return 'All Tasks';
    if (selectedProject === 'free') return 'Free Tasks';
    return selectedProject;
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    setDraggedTaskId(taskId);
    e.dataTransfer.setData('text/plain', taskId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
    setActiveColumnHover(null);
    setDropIndex(null);
  };

  const handleDragOverColumn = (e: React.DragEvent, columnId: TaskStatus, totalCount: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (activeColumnHover !== columnId) setActiveColumnHover(columnId);
    if (dropIndex === null) setDropIndex(totalCount);
  };

  const handleDragLeaveColumn = (e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setActiveColumnHover(null);
      setDropIndex(null);
    }
  };

  const handleDragOverCard = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;
    const targetIdx = e.clientY < midpoint ? index : index + 1;
    if (dropIndex !== targetIdx) setDropIndex(targetIdx);
  };

  const handleDrop = (e: React.DragEvent, targetStatus: TaskStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('text/plain') || draggedTaskId;
    const isCurrentColumnHovered = activeColumnHover === targetStatus;
    
    if (!taskId || !isCurrentColumnHovered || dropIndex === null) {
      handleDragEnd();
      return;
    }

    const columnTasks = filteredTasks
      .filter((t) => t.status === targetStatus)
      .sort((a, b) => (a.kanbanOrder ?? 0) - (b.kanbanOrder ?? 0));

    const draggedOriginalIdx = columnTasks.findIndex((t) => t.id === taskId);
    let adjustedIndex = dropIndex;
    if (draggedOriginalIdx !== -1 && draggedOriginalIdx < dropIndex) {
      adjustedIndex = dropIndex - 1;
    }

    if (draggedOriginalIdx !== -1 && (dropIndex === draggedOriginalIdx || dropIndex === draggedOriginalIdx + 1)) {
      handleDragEnd();
      return;
    }

    onMoveToLane(taskId, targetStatus, adjustedIndex);
    setRecentlyMovedId(taskId);
    setTimeout(() => {
      setRecentlyMovedId((currentId) => (currentId === taskId ? null : currentId));
    }, 1200);
    handleDragEnd();
  };

  return (
    <div className="space-y-6">
      {/* Board Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
        
        {/* Project Selector Popover Trigger */}
        <div className="relative">
          <button
            ref={projectTriggerRef}
            onClick={() => setIsProjectPopoverOpen((prev) => !prev)}
            className="flex items-center space-x-2 px-3.5 py-2 text-xs font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-700 dark:text-slate-300 rounded-xl shadow-sm transition"
          >
            <FolderKanban className="h-4 w-4 text-indigo-500" />
            <span>Project: {getProjectLabel()}</span>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isProjectPopoverOpen ? 'rotate-180' : ''}`} />
          </button>

          <ProjectFilterDropdown
            isOpen={isProjectPopoverOpen}
            onClose={() => setIsProjectPopoverOpen(false)}
            selectedProject={selectedProject}
            onSelectProject={onSelectProject}
            uniqueProjects={uniqueProjects}
            triggerRef={projectTriggerRef}
          />
        </div>

        {/* New Task Toggle Button */}
        <button
          onClick={() => setShowTaskForm(!showTaskForm)}
          className="flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>{showTaskForm ? 'Close Form' : 'New Task'}</span>
        </button>
      </div>

      {/* Collapsible Task Creation Form */}
      {showTaskForm && (
        <div className="bg-white dark:bg-slate-900/60 border border-indigo-500/30 p-5 rounded-xl shadow-md transition-all">
          <h4 className="text-xs font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-3">Create New Task</h4>
          <TaskForm 
            onSubmit={(input) => {
              onCreateTask(input);
              setShowTaskForm(false);
            }} 
          />
        </div>
      )}

      {/* Kanban Board Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {columns.map((col) => {
          const columnTasks = filteredTasks
            .filter((t) => t.status === col.id)
            .sort((a, b) => (a.kanbanOrder ?? 0) - (b.kanbanOrder ?? 0));

          return (
            <KanbanColumn
              key={col.id}
              column={col}
              columnTasks={columnTasks}
              isColumnHovered={activeColumnHover === col.id}
              draggedTaskId={draggedTaskId}
              dropIndex={dropIndex}
              recentlyMovedId={recentlyMovedId}
              onDragOverColumn={handleDragOverColumn}
              onDragLeaveColumn={handleDragLeaveColumn}
              onDropColumn={handleDrop}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragOverCard={handleDragOverCard}
              onToggleStatus={onToggleStatus}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
}