import React from 'react';
import { Sparkles, Calendar, CheckSquare, BookOpen, Clock, ArrowRight, CheckCircle2, AlertCircle, Plus } from 'lucide-react';
import { Task, ClassEvent, Note } from '../types';
import { TabType } from './BottomNav';

interface HomeTabProps {
  tasks: Task[];
  classes: ClassEvent[];
  notes: Note[];
  onToggleTask: (id: string) => void;
  setCurrentTab: (tab: TabType) => void;
  onOpenNewTask: () => void;
  onOpenNewClass: () => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  tasks,
  classes,
  notes,
  onToggleTask,
  setCurrentTab,
  onOpenNewTask,
  onOpenNewClass,
}) => {
  const pendingTasks = tasks.filter((t) => t.status === 'pendiente');
  const completedCount = tasks.filter((t) => t.status === 'completada').length;
  const totalTasks = tasks.length;
  const progressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  const nextClass = classes[0]; // Upcoming class
  const urgentTasks = pendingTasks.slice(0, 3);

  return (
    <div className="space-y-6 pb-24">
      {/* Hero Welcome Card */}
      <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 rounded-3xl p-6 text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-6 -translate-y-6 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
            Google AI Studio Course
          </span>
          <span className="text-xs font-medium text-indigo-200">
            {progressPercent}% completado
          </span>
        </div>

        <h2 className="text-2xl font-bold tracking-tight mb-2">
          ¡Hola de nuevo, Estudiante! 👋
        </h2>
        <p className="text-indigo-100 text-sm mb-5 leading-relaxed">
          Tienes {pendingTasks.length} tareas pendientes y tu próxima clase te espera pronto. Sigue avanzando en tu dominio de la IA.
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-black/20 rounded-full h-2.5 mb-2 overflow-hidden">
          <div
            className="bg-white h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-indigo-200">
          <span>{completedCount} de {totalTasks} tareas listas</span>
          <button
            onClick={() => setCurrentTab('progreso')}
            className="hover:underline flex items-center gap-1 font-medium"
          >
            Ver progreso <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onOpenNewTask}
          className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs hover:border-indigo-500 dark:hover:border-indigo-500 transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Nueva Tarea</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Añadir entrega</p>
          </div>
        </button>

        <button
          onClick={onOpenNewClass}
          className="flex items-center gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs hover:border-violet-500 dark:hover:border-violet-500 transition-all text-left group"
        >
          <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Programar</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Nueva clase o lab</p>
          </div>
        </button>
      </div>

      {/* Next Class Banner */}
      {nextClass && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Próxima Sesión Programada
              </span>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              {nextClass.date}
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
            {nextClass.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-4">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {nextClass.time}
            </span>
            <span>·</span>
            <span>{nextClass.location}</span>
            {nextClass.instructor && (
              <>
                <span>·</span>
                <span>{nextClass.instructor}</span>
              </>
            )}
          </div>

          <button
            onClick={() => setCurrentTab('calendario')}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            Ver calendario completo <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Urgent Pending Tasks */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Tareas Pendientes ({pendingTasks.length})
          </h3>
          <button
            onClick={() => setCurrentTab('tareas')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Ver todas
          </button>
        </div>

        {urgentTasks.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-900 dark:text-white">¡Estás al día con todo!</p>
            <p className="text-xs text-slate-500 mt-1">No hay tareas pendientes en este momento.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {urgentTasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3.5 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all"
              >
                <button
                  onClick={() => onToggleTask(task.id)}
                  className="mt-0.5 w-6 h-6 rounded-lg border-2 border-slate-300 dark:border-slate-600 flex items-center justify-center text-transparent hover:border-indigo-600 dark:hover:border-indigo-400 transition-colors shrink-0"
                >
                  <CheckCircle2 className="w-4 h-4 text-transparent hover:text-indigo-600" />
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 truncate">
                      {task.category}
                    </span>
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        task.priority === 'alta'
                          ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300'
                          : task.priority === 'media'
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
                          : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                      }`}
                    >
                      {task.priority}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    {task.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">
                    {task.description}
                  </p>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Entrega: {task.dueDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
