import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { DashboardView } from '../screens/DashboardView';
import { ProjectsView } from '../screens/ProjectsView';

export const routesConfig: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <DashboardView /> },
      { path: '/tasks', element: <DashboardView /> },
      { path: '/projects', element: <ProjectsView /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
];

export function AppRoutes() {
  return useRoutes(routesConfig);
}