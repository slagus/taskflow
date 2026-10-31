/*
import React, { useState } from 'react';
import { useTaskManagement } from './hooks/useTaskManagement';
import { useTheme } from './hooks/useTheme';
import { Sidebar } from './components/Sidebar';
import type { ActiveScreen } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { DashboardView } from './screens/DashboardView';
import { ProjectsView } from './screens/ProjectsView';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('dashboard');
  const [projectFilter, setProjectFilter] = useState<string>('');
  
  const { theme, toggleTheme } = useTheme();
  
  const {
    tasks,
    loading,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    metrics,
    createTask,
    toggleTaskStatus,
    deleteTask,
  } = useTaskManagement();

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased overflow-hidden transition-colors">
      <Sidebar currentScreen={currentScreen} onSelectScreen={(screen) => {
        setCurrentScreen(screen);
        if (screen !== 'dashboard') setProjectFilter(''); // clear filter when leaving dashboard
      }} />

      <main className="flex-1 flex flex-col overflow-y-auto">
        <Navbar 
          searchQuery={searchQuery} 
          onSearchChange={setSearchQuery} 
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <div className="p-8 max-w-6xl mx-auto w-full">
          {currentScreen === 'dashboard' || currentScreen === 'tasks' ? (
            <DashboardView 
              tasks={tasks}
              loading={loading}
              filter={filter}
              setFilter={setFilter}
              metrics={metrics}
              onCreateTask={createTask}
              onToggleTask={toggleTaskStatus}
              onDeleteTask={deleteTask}
              selectedCategoryFilter={projectFilter}
              onClearCategoryFilter={() => setProjectFilter('')}
            />
          ) : currentScreen === 'projects' ? (
            <ProjectsView 
              tasks={tasks}
              onSelectProjectFilter={(categoryName) => setProjectFilter(categoryName)}
              onNavigateScreen={setCurrentScreen}
            />
          ) : null}
        </div>
      </main>
    </div>
  );
}

*/

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}