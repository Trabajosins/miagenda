import React, { useState } from 'react';
import { CheckSquare, Plus, CheckCircle2, Circle, Clock, Trash2, Edit3, AlertCircle } from 'lucide-react';
import { Task } from '../types';

interface TasksTabProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onOpenNewTask: () => void;
  onEditTask: (task: Task) => void;
}

export const TasksTab: React.FC<TasksTabProps> = ({
  tasks,
  onToggleTask,
  onDeleteTask,
  onOpenNewTask,
  onEditTask,
}) => {
  const [filter, setFilter] = useState<'todas' | 'pendiente' | 'completada'>('todas');

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'todas') return true;
    return t.status === filter;
  });

  return (
    <div className="space-y-6 pb-24">
      {/* Header and Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Gestión de Tareas</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Entregas y proyectos del curso AI Studio</p>
        </div>
        <button
          onClick={onOpenNewTask}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm shadow-indigo-500/30 transition-colors"
        >
          <Plus className="w-4 h-4" /> Nueva Tarea
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'todas', label: `Todas (${tasks.length})` },
          { id: 'pendiente', label: `Pendientes (${tasks.filter(t => t.status === 'pendiente').length})` },
          { id: 'completada', label: `Completadas (${tasks.filter(t => t.status === 'completada').length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${
              filter === tab.id
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <CheckSquare className="w-12 h-12 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-900 dark:text-white">No hay tareas en esta vista</p>
            <p className="text-xs text-slate-500 mt-1">Crea una nueva tarea o cambia el filtro superior.</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isCompleted = task.status === 'completada';
            return (
              <div
                key={task.id}
                className={`bg-white dark:bg-slate-900 border rounded-2xl p-5 shadow-xs transition-all ${
                  isCompleted
                    ? 'border-slate-200 dark:border-slate-800 opacity-75 bg-slate-50/50 dark:bg-slate-900/50'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={() => onToggleTask(task.id)}
                    className="mt-1 text-indigo-600 dark:text-indigo-400 hover:scale-110 transition-transform shrink-0"
                    title={isCompleted ? "Marcar como pendiente" : "Marcar como completada"}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-50 dark:fill-emerald-950/40" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600 hover:text-indigo-600" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                        {task.category}
                      </span>
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                          task.priority === 'alta'
                            ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300'
                            : task.priority === 'media'
                            ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
                            : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                        }`}
                      >
                        Prioridad {task.priority}
                      </span>
                    </div>

                    <h3 className={`text-base font-bold text-slate-900 dark:text-white mb-1 ${isCompleted ? 'line-through text-slate-500 dark:text-slate-400' : ''}`}>
                      {task.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">
                      {task.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Entrega: <strong className="text-slate-700 dark:text-slate-300">{task.dueDate}</strong></span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onEditTask(task)}
                          title="Editar tarea"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteTask(task.id)}
                          title="Eliminar tarea"
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
