import React, { useState } from 'react';
import { useTaskManagement } from './hooks/useTaskManagement';
import { Sidebar } from './components/Sidebar';
import type { ActiveScreen } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { DashboardView } from './screens/DashboardView';
import { ProjectsView } from './screens/ProjectsView';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('dashboard');
  
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
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans antialiased overflow-hidden">
      <Sidebar currentScreen={currentScreen} onSelectScreen={setCurrentScreen} />

      <main className="flex-1 flex flex-col overflow-y-auto">
        <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

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
            />
          ) : currentScreen === 'projects' ? (
            <ProjectsView />
          ) : null}
        </div>
      </main>
    </div>
  );
}