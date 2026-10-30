import React, { ReactNode } from 'react';

interface MetricCardProps {
  title: string;
  value: number;
  icon: ReactNode;
}

export function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <div className="bg-slate-900/60 border border-slate-800/80 p-5 rounded-xl shadow-sm backdrop-blur">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-slate-400">{title}</span>
        {icon}
      </div>
      <p className="text-3xl font-bold text-white mt-2">{value}</p>
    </div>
  );
}