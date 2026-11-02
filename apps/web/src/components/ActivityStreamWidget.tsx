import React, { useState, useEffect } from 'react';
import { Activity, Clock } from 'lucide-react';
import { activityService, type ActivityItem } from '../services/activityService';

export function ActivityStreamWidget() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);

  useEffect(() => {
    setActivities(activityService.getActivities());
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 p-5 rounded-xl backdrop-blur shadow-sm space-y-3 transition-colors">
      <div className="flex items-center space-x-2 pb-2 border-b border-slate-100 dark:border-slate-800/80">
        <div className="p-1.5 bg-cyan-50 dark:bg-cyan-600/10 text-cyan-600 dark:text-cyan-400 rounded-lg">
          <Activity className="h-4 w-4" />
        </div>
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Recent Activity</h3>
      </div>

      {activities.length === 0 ? (
        <p className="text-xs text-slate-500 dark:text-slate-500 py-4 text-center">No recent actions recorded yet.</p>
      ) : (
        <div className="space-y-2.5">
          {activities.map((act) => (
            <div key={act.id} className="flex items-start justify-between text-xs gap-2">
              <span className="text-slate-700 dark:text-slate-300 font-medium truncate">{act.action}</span>
              <span className="text-slate-400 dark:text-slate-500 flex items-center shrink-0">
                <Clock className="h-3 w-3 mr-1" />
                {act.timestamp}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}