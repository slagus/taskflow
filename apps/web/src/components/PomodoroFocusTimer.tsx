import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw } from 'lucide-react';

export function PomodoroFocusTimer() {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => setSecondsLeft((prev) => prev - 1), 1000);
    } else if (secondsLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft]);

  const formatTime = () => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 p-5 rounded-xl backdrop-blur shadow-sm space-y-4 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-rose-50 dark:bg-rose-600/10 text-rose-600 dark:text-rose-400 rounded-lg">
            <Timer className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Focus Timer</h3>
        </div>
        <span className="text-xs bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded font-medium">25m Sprint</span>
      </div>

      <div className="text-center py-2">
        <div className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-mono">
          {formatTime()}
        </div>
      </div>

      <div className="flex items-center justify-center space-x-2">
        <button
          onClick={() => setIsActive(!isActive)}
          className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg text-xs font-medium transition flex items-center justify-center space-x-1.5 shadow"
        >
          {isActive ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          <span>{isActive ? 'Pause' : 'Start Focus'}</span>
        </button>
        <button
          onClick={() => { setIsActive(false); setSecondsLeft(25 * 60); }}
          className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <RotateCcw className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}