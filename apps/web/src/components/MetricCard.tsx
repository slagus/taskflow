import React from 'react';

interface MetricCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

export function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 p-5 rounded-xl backdrop-blur flex items-center justify-between shadow-sm transition-colors">
      <div>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{value}</p>
      </div>
      <div className="p-3 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
        {icon}
      </div>
    </div>
  );
}