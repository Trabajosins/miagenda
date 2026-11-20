import React from 'react';
import { Home, Calendar, CheckSquare, BookOpen, BarChart2 } from 'lucide-react';

export type TabType = 'inicio' | 'calendario' | 'tareas' | 'notas' | 'progreso';

interface BottomNavProps {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  pendingTasksCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  setCurrentTab,
  pendingTasksCount,
}) => {
  const tabs = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'calendario', label: 'Calendario', icon: Calendar },
    { id: 'tareas', label: 'Tareas', icon: CheckSquare, badge: pendingTasksCount > 0 ? pendingTasksCount : null },
    { id: 'notas', label: 'Notas', icon: BookOpen },
    { id: 'progreso', label: 'Progreso', icon: BarChart2 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe shadow-lg">
      <div className="grid grid-cols-5 h-16 items-center max-w-xl mx-auto px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id as TabType)}
              className={`relative flex flex-col items-center justify-center h-full transition-all duration-150 ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold scale-105'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {tab.badge !== null && (
                  <span className="absolute -top-1.5 -right-2 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] mt-1 tracking-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute bottom-1 w-1 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
