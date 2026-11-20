import React from 'react';
import { BarChart2, CheckCircle2, Clock, Award, BookOpen, CheckSquare, Sparkles } from 'lucide-react';
import { Task, CourseModule } from '../types';

interface ProgressTabProps {
  tasks: Task[];
  modules: CourseModule[];
}

export const ProgressTab: React.FC<ProgressTabProps> = ({ tasks, modules }) => {
  const completedTasks = tasks.filter((t) => t.status === 'completada').length;
  const pendingTasks = tasks.filter((t) => t.status === 'pendiente').length;
  const totalTasks = tasks.length;
  const taskCompletionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const totalLessons = modules.reduce((acc, m) => acc + m.totalLessons, 0);
  const completedLessons = modules.reduce((acc, m) => acc + m.completedLessons, 0);
  const moduleCompletionRate = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="space-y-6 pb-24">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Progreso del Curso</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Resumen de metas y avance académico</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
            <CheckSquare className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            {completedTasks} <span className="text-sm font-normal text-slate-400">/ {totalTasks}</span>
          </h3>
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Tareas Entregadas</p>
          <p className="text-[11px] text-indigo-600 dark:text-indigo-400 mt-1 font-medium">{taskCompletionRate}% completado</p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
            {completedLessons} <span className="text-sm font-normal text-slate-400">/ {totalLessons}</span>
          </h3>
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">Lecciones Vistas</p>
          <p className="text-[11px] text-violet-600 dark:text-violet-400 mt-1 font-medium">{moduleCompletionRate}% completado</p>
        </div>
      </div>

      {/* Achievement Banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg shadow-orange-500/20 flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
          <Award className="w-8 h-8 text-white" />
        </div>
        <div>
          <h4 className="text-base font-bold mb-1">¡Vas por excelente camino!</h4>
          <p className="text-xs text-orange-100 leading-relaxed">
            Has completado la mayoría de los módulos fundamentales de Google AI Studio. Mantén el ritmo para obtener tu certificación.
          </p>
        </div>
      </div>

      {/* Course Modules Breakdown */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Progreso por Módulos
        </h3>

        <div className="space-y-3">
          {modules.map((mod) => {
            const percent = Math.round((mod.completedLessons / mod.totalLessons) * 100);
            return (
              <div
                key={mod.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {mod.title}
                  </h4>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {percent}%
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                  {mod.description}
                </p>

                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mb-2 overflow-hidden">
                  <div
                    className="bg-indigo-600 dark:bg-indigo-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{mod.completedLessons} de {mod.totalLessons} lecciones completadas</span>
                  {percent === 100 && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completado
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
