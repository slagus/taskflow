import React from 'react';
import { Briefcase, FolderPlus, ListTodo, CheckCircle2, ArrowRight } from 'lucide-react';
import type { Task } from '@taskflow/types';
import type { ActiveScreen } from '../components/Sidebar';

interface ProjectsViewProps {
  tasks: Task[];
  onSelectProjectFilter: (categoryName: string) => void;
  onNavigateScreen: (screen: ActiveScreen) => void;
}

export function ProjectsView({ tasks, onSelectProjectFilter, onNavigateScreen }: ProjectsViewProps) {
  const projects = [
    {
      id: '1',
      name: 'Work & Career',
      description: 'Quarterly goals, client deliverables, and professional development.',
      color: 'bg-indigo-500',
    },
    {
      id: '2',
      name: 'Personal & Home',
      description: 'Household chores, maintenance, groceries, and personal errands.',
      color: 'bg-cyan-500',
    },
    {
      id: '3',
      name: 'Health & Fitness',
      description: 'Workout schedules, meal planning, and daily wellness tracking.',
      color: 'bg-emerald-500',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Project Workspaces</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Group your tasks into dedicated projects to stay organized and focused. Click a project to view its active tasks.
          </p>
        </div>
        
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center space-x-2 shadow-lg shadow-indigo-500/20">
          <FolderPlus className="h-4 w-4" />
          <span>New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projects.map((project) => {
          const projectTasks = tasks.filter((t) => t.projectId === project.id || t.category === project.name);
          const completedCount = projectTasks.filter((t) => t.status === 'completed').length;
          const totalCount = projectTasks.length;
          const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

          return (
            <div 
              key={project.id} 
              onClick={() => {
                onSelectProjectFilter(project.name);
                onNavigateScreen('dashboard');
              }}
              className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 p-6 rounded-xl backdrop-blur space-y-4 hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition group cursor-pointer shadow-sm hover:shadow-indigo-500/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`h-3 w-3 rounded-full ${project.color}`} />
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                    {project.name}
                  </h3>
                </div>
                <Briefcase className="h-5 w-5 text-slate-400 dark:text-slate-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition" />
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 min-h-[36px]">
                {project.description}
              </p>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Progress</span>
                  <span className="text-slate-800 dark:text-slate-200 font-semibold">{progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }} 
                  />
                </div>
              </div>

              {/* Footer Metrics */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/60 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center space-x-1.5">
                  <ListTodo className="h-3.5 w-3.5 text-slate-400" />
                  <span>{totalCount} tasks</span>
                </div>
                <div className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{completedCount} done</span>
                </div>
              </div>

              <div className="pt-1 flex items-center justify-end text-xs text-indigo-600 dark:text-indigo-400 font-medium opacity-0 group-hover:opacity-100 transition">
                <span>View project tasks</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}