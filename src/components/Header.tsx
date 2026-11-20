import React from 'react';
import { Sparkles, Moon, Sun, Smartphone, Monitor } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  isMobileFrame,
  setIsMobileFrame,
}) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-xl bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/30">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            Mi Agenda AI Studio
          </h1>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Curso Oficial 2026
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => setIsMobileFrame(!isMobileFrame)}
          title={isMobileFrame ? "Cambiar a vista de pantalla completa" : "Cambiar a marco de teléfono móvil"}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {isMobileFrame ? <Monitor className="w-5 h-5" /> : <Smartphone className="w-5 h-5" />}
        </button>

        <button
          onClick={() => setDarkMode(!darkMode)}
          title="Cambiar tema claro / oscuro"
          className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};
