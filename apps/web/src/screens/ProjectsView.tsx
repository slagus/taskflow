import React from 'react';
import { Briefcase, FolderPlus, ListTodo, CheckCircle2 } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string;
  taskCount: number;
  completedCount: number;
  color: string;
}

const SAMPLE_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Work & Career',
    description: 'Quarterly goals, client deliverables, and professional development.',
    taskCount: 8,
    completedCount: 5,
    color: 'bg-indigo-500',
  },
  {
    id: '2',
    name: 'Personal & Home',
    description: 'Household chores, maintenance, groceries, and personal errands.',
    taskCount: 4,
    completedCount: 2,
    color: 'bg-cyan-500',
  },
  {
    id: '3',
    name: 'Health & Fitness',
    description: 'Workout schedules, meal planning, and daily wellness tracking.',
    taskCount: 6,
    completedCount: 6,
    color: 'bg-emerald-500',
  },
];

export function ProjectsView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Project Workspaces</h1>
          <p className="text-sm text-slate-400 mt-1">
            Group your tasks into dedicated projects to stay organized and focused.
          </p>
        </div>
        
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center space-x-2 shadow-lg shadow-indigo-500/20">
          <FolderPlus className="h-4 w-4" />
          <span>New Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SAMPLE_PROJECTS.map((project) => {
          const progress = Math.round((project.completedCount / project.taskCount) * 100);

          return (
            <div 
              key={project.id} 
              className="bg-slate-900/60 border border-slate-800/80 p-6 rounded-xl backdrop-blur space-y-4 hover:border-slate-700 transition group cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`h-3 w-3 rounded-full ${project.color}`} />
                  <h3 className="text-base font-semibold text-white group-hover:text-indigo-400 transition">
                    {project.name}
                  </h3>
                </div>
                <Briefcase className="h-5 w-5 text-slate-500" />
              </div>

              <p className="text-xs text-slate-400 min-h-[36px]">
                {project.description}
              </p>

              {/* Progress Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">Progress</span>
                  <span className="text-slate-200 font-semibold">{progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }} 
                  />
                </div>
              </div>

              {/* Footer Metrics */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/60 text-xs text-slate-500">
                <div className="flex items-center space-x-1.5">
                  <ListTodo className="h-3.5 w-3.5" />
                  <span>{project.taskCount} tasks</span>
                </div>
                <div className="flex items-center space-x-1.5 text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>{project.completedCount} done</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}