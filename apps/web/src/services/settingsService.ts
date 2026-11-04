export type LayoutVariant = 'standard' | 'command_center' | 'focus' | 'tabbed';

export interface AppSettings {
  defaultPriority: 'low' | 'medium' | 'high' | 'urgent';
  defaultWorkspace: string;
  enableNotifications: boolean;
  compactView: boolean;
  layoutVariant: LayoutVariant;
}

const SETTINGS_KEY = 'taskflow_settings';

const DEFAULT_SETTINGS: AppSettings = {
  defaultPriority: 'medium',
  defaultWorkspace: 'Work & Career',
  enableNotifications: true,
  compactView: false,
  layoutVariant: 'standard', // <--- Default layout
};

export const settingsService = {
  getSettings(): AppSettings {
    if (typeof window === 'undefined') return DEFAULT_SETTINGS;
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  },

  saveSettings(settings: AppSettings): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  },
};