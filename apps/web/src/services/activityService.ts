export interface ActivityItem {
  id: string;
  action: string;
  timestamp: string;
}

const ACTIVITY_KEY = 'taskflow_activities';

export const activityService = {
  getActivities(): ActivityItem[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(ACTIVITY_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  logActivity(action: string): void {
    if (typeof window === 'undefined') return;
    try {
      const current = activityService.getActivities();
      const newItem: ActivityItem = {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
        action,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      const updated = [newItem, ...current].slice(0, 8); // Keep last 8 actions
      localStorage.setItem(ACTIVITY_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to log activity:', error);
    }
  },
};