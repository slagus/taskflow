import React from 'react';
import { LayoutDashboard, CheckSquare, Briefcase } from 'lucide-react';

export type ActiveScreen = 'dashboard' | 'tasks' | 'projects';

interface SidebarProps {
  currentScreen: ActiveScreen;
  onSelectScreen: (screen: ActiveScreen) => void;
}

export function Sidebar({ currentScreen, onSelectScreen }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl flex flex-col hidden md:flex">
      <div className="p-6 flex items-center space-x-3 border-b border-slate-800">
        <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
          T
        </div>
        <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          TaskFlow
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <button
          onClick={() => onSelectScreen('dashboard')}
          className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg font-medium transition ${
            currentScreen === 'dashboard' 
              ? 'bg-indigo-600/10 text-indigo-400' 
              : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
          }`}
        >
          <LayoutDashboard className="h-5 w-5" />
          <span>Dashboard</span>
        </button>

        <button
          onClick={() => onSelectScreen('tasks')}
          className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg font-medium transition ${
            currentScreen === 'tasks' 
              ? 'bg-indigo-600/10 text-indigo-400' 
              : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
          }`}
        >
          <CheckSquare className="h-5 w-5" />
          <span>My Tasks</span>
        </button>

        <button
          onClick={() => onSelectScreen('projects')}
          className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg font-medium transition ${
            currentScreen === 'projects' 
              ? 'bg-indigo-600/10 text-indigo-400' 
              : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
          }`}
        >
          <Briefcase className="h-5 w-5" />
          <span>Projects</span>
        </button>
      </nav>

      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 flex justify-between items-center">
        <span>v1.0.0-demo</span>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Local Mode
        </span>
      </div>
    </aside>
  );
}