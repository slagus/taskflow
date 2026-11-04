import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { DashboardView } from '../screens/dashboard';
import { TasksView } from '../screens/tasks';
import { ProjectsView } from '../screens/ProjectsView';
import { SettingsView } from '../screens/SettingsView';

export const routesConfig: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <DashboardView /> },
      { path: '/tasks', element: <TasksView /> },
      { path: '/projects', element: <ProjectsView /> },
      { path: '/settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
];

export function AppRoutes() {
  return useRoutes(routesConfig);
}