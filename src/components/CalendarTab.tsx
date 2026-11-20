import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, User, Plus, Trash2, Video, FlaskConical, BookOpen } from 'lucide-react';
import { ClassEvent } from '../types';

interface CalendarTabProps {
  classes: ClassEvent[];
  onOpenNewClass: () => void;
  onDeleteClass: (id: string) => void;
}

export const CalendarTab: React.FC<CalendarTabProps> = ({
  classes,
  onOpenNewClass,
  onDeleteClass,
}) => {
  const [selectedType, setSelectedType] = useState<string>('todos');

  const filteredClasses = classes.filter((c) => {
    if (selectedType === 'todos') return true;
    return c.type === selectedType;
  });

  const getTypeIcon = (type: ClassEvent['type']) => {
    switch (type) {
      case 'clase':
        return <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />;
      case 'laboratorio':
        return <FlaskConical className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'estudio':
        return <Video className="w-4 h-4 text-violet-600 dark:text-violet-400" />;
      default:
        return <CalendarIcon className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
    }
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header and Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Calendario de Clases</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Próximas sesiones y laboratorios del curso</p>
        </div>
        <button
          onClick={onOpenNewClass}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm shadow-indigo-500/30 transition-colors"
        >
          <Plus className="w-4 h-4" /> Nueva Sesión
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'todos', label: 'Todas' },
          { id: 'clase', label: 'Clases' },
          { id: 'laboratorio', label: 'Laboratorios' },
          { id: 'estudio', label: 'Talleres' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedType(tab.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${
              selectedType === tab.id
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Classes List */}
      <div className="space-y-3">
        {filteredClasses.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <CalendarIcon className="w-12 h-12 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-900 dark:text-white">No hay sesiones en esta categoría</p>
            <p className="text-xs text-slate-500 mt-1">Programa una nueva clase con el botón superior.</p>
          </div>
        ) : (
          filteredClasses.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all relative group"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    {getTypeIcon(item.type)}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {item.type}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteClass(item.id)}
                  title="Eliminar sesión"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-slate-400" />
                  <span>Fecha: <strong className="text-slate-700 dark:text-slate-300">{item.date}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>Horario: <strong className="text-slate-700 dark:text-slate-300">{item.time}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>Lugar: <strong className="text-slate-700 dark:text-slate-300">{item.location}</strong></span>
                </div>
                {item.instructor && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" />
                    <span>Docente: <strong className="text-slate-700 dark:text-slate-300">{item.instructor}</strong></span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
