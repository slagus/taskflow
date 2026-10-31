import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { useTheme } from '../hooks/useTheme';

interface AppLayoutProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function AppLayout({ searchQuery, onSearchChange }: AppLayoutProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased overflow-hidden transition-colors">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-y-auto">
        <Navbar 
          searchQuery={searchQuery} 
          onSearchChange={onSearchChange} 
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <div className="p-8 max-w-6xl mx-auto w-full">
          {/* Outlet renders the matching child screen (DashboardView, ProjectsView, SettingsView, etc.) */}
          <Outlet />
        </div>
      </main>
    </div>
  );
}