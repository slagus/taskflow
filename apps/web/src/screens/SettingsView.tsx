import React, { useState } from 'react';
import { Settings, Sliders, Bell, LayoutGrid, ShieldCheck, Check, LayoutTemplate, Columns3 } from 'lucide-react';
import { settingsService, type AppSettings, type LayoutVariant, type TasksLayoutVariant } from '../services/settingsService';

export function SettingsView() {
  const [settings, setSettings] = useState<AppSettings>(() => settingsService.getSettings());
  const [savedMessage, setSavedMessage] = useState(false);

  const handleUpdate = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    settingsService.saveSettings(updated);

    // Show temporary saved toast
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Workspace Settings</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your personal productivity defaults, preferences, and local workspace configurations.
          </p>
        </div>

        {savedMessage && (
          <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 text-xs font-medium animate-fade-in">
            <Check className="h-3.5 w-3.5" />
            <span>Settings saved</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {/* Task Creation Defaults */}
        <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 p-6 rounded-xl backdrop-blur space-y-4 shadow-sm transition-colors">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 dark:border-slate-800/80">
            <div className="p-2 bg-indigo-50 dark:bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 rounded-lg">
              <Sliders className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Task Creation Defaults</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Configure default options applied during quick-add.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Default Task Priority</label>
              <select
                value={settings.defaultPriority}
                onChange={(e) => handleUpdate('defaultPriority', e.target.value as AppSettings['defaultPriority'])}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-800 dark:text-slate-300 focus:outline-none focus:border-indigo-500 transition"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Default Project Workspace</label>
              <select
                value={settings.defaultWorkspace}
                onChange={(e) => handleUpdate('defaultWorkspace', e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-800 dark:text-slate-300 focus:outline-none focus:border-indigo-500 transition"
              >
                <option value="Work & Career">📁 Work & Career</option>
                <option value="Personal & Home">📁 Personal & Home</option>
                <option value="Health & Fitness">📁 Health & Fitness</option>
              </select>
            </div>
          </div>
        </div>

        {/* Interface Preferences & Layouts */}
        <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 p-6 rounded-xl backdrop-blur space-y-4 shadow-sm transition-colors">
          <div className="flex items-center space-x-3 pb-4 border-b border-slate-100 dark:border-slate-800/80">
            <div className="p-2 bg-cyan-50 dark:bg-cyan-600/10 text-cyan-600 dark:text-cyan-400 rounded-lg">
              <LayoutGrid className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">Interface & Layout Defaults</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Configure how your dashboard and tasks pages render by default.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Dashboard Layout Variant */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Default Dashboard Variant
              </label>
              <select
                value={settings.layoutVariant}
                onChange={(e) => handleUpdate('layoutVariant', e.target.value as LayoutVariant)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-800 dark:text-slate-300 focus:outline-none focus:border-indigo-500 transition"
              >
                <option value="standard">Standard Grid</option>
                <option value="command_center">Command Center (Bento)</option>
                <option value="focus">Focus Mode (Task First)</option>
                <option value="tabbed">Tabbed Workspace</option>
              </select>
            </div>

            {/* Tasks Page Layout Variant */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Default Tasks View
              </label>
              <select
                value={settings.tasksLayoutVariant}
                onChange={(e) => handleUpdate('tasksLayoutVariant', e.target.value as TasksLayoutVariant)}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-800 dark:text-slate-300 focus:outline-none focus:border-indigo-500 transition"
              >
                <option value="list">Normal Task List</option>
                <option value="kanban">Kanban Board</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Compact Task Cards</span>
                <p className="text-xs text-slate-500 dark:text-slate-400">Reduce padding on task list rows for higher information density.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.compactView}
                onChange={(e) => handleUpdate('compactView', e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-slate-100 dark:border-slate-800/60">
              <div>
                <span className="text-sm font-medium text-slate-900 dark:text-slate-200">Desktop Notifications</span>
                <p className="text-xs text-slate-500 dark:text-slate-400">Get alerted when tasks are due or marked urgent.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.enableNotifications}
                onChange={(e) => handleUpdate('enableNotifications', e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
            </label>
          </div>
        </div>

        {/* System Info */}
        <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 p-6 rounded-xl backdrop-blur space-y-3 shadow-sm transition-colors">
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 rounded-lg">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">System & Storage Status</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Environment and repository diagnostics.</p>
            </div>
          </div>
          <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
            <span>Storage Driver: <strong className="text-slate-800 dark:text-slate-200">Local Browser Storage</strong></span>
            <span>App Version: <strong className="text-slate-800 dark:text-slate-200">v1.0.0-prod</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}