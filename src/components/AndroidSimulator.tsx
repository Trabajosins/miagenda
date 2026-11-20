import React, { useState } from 'react';
import { Plus, Check, Trash2, Smartphone, Code, FileText, AlertCircle, Calendar as CalendarIcon, Edit3, X, Search } from 'lucide-react';
import { KOTLIN_SOURCE_CODE } from '../data/kotlinCode';

type Priority = 'Baja' | 'Media' | 'Alta';

interface ActivityItem {
  id: string;
  text: string;
  date: string;
  priority: Priority;
  isCompleted: boolean;
}

export const AndroidSimulator: React.FC = () => {
  const getTodayString = () => new Date().toISOString().split('T')[0];

  const [activities, setActivities] = useState<ActivityItem[]>([
    { id: '1', text: 'Estudiar Kotlin básico', date: getTodayString(), priority: 'Alta', isCompleted: true },
    { id: '2', text: 'Practicar con Jetpack Compose', date: getTodayString(), priority: 'Media', isCompleted: false },
    { id: '3', text: 'Crear mi primera app', date: getTodayString(), priority: 'Baja', isCompleted: false },
  ]);
  const [inputText, setInputText] = useState('');
  const [inputDate, setInputDate] = useState(getTodayString());
  const [inputPriority, setInputPriority] = useState<Priority>('Media');
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Edit state
  const [editingActivity, setEditingActivity] = useState<ActivityItem | null>(null);
  const [editText, setEditText] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editPriority, setEditPriority] = useState<Priority>('Media');

  const [activeTab, setActiveTab] = useState<'simulator' | 'code' | 'explanation'>('simulator');

  const handleAddActivity = () => {
    if (!inputText.trim()) {
      setErrorMessage('Por favor, debes escribir una actividad.');
      return;
    }
    setErrorMessage('');
    const newItem: ActivityItem = {
      id: Date.now().toString(),
      text: inputText.trim(),
      date: inputDate || getTodayString(),
      priority: inputPriority,
      isCompleted: false,
    };
    setActivities([newItem, ...activities]);
    setInputText('');
    setInputDate(getTodayString());
    setInputPriority('Media');
  };

  const handleToggleComplete = (id: string) => {
    setActivities(
      activities.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };

  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter((item) => item.id !== id));
  };

  const handleStartEdit = (activity: ActivityItem) => {
    setEditingActivity(activity);
    setEditText(activity.text);
    setEditDate(activity.date);
    setEditPriority(activity.priority);
  };

  const handleSaveEdit = () => {
    if (!editText.trim() || !editingActivity) return;
    setActivities(
      activities.map((item) =>
        item.id === editingActivity.id
          ? { ...item, text: editText.trim(), date: editDate || getTodayString(), priority: editPriority }
          : item
      )
    );
    setEditingActivity(null);
  };

  const filteredActivities = activities.filter((item) =>
    item.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPriorityBadgeColor = (priority: Priority) => {
    switch (priority) {
      case 'Alta':
        return 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border-rose-200 dark:border-rose-800';
      case 'Media':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'Baja':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-6 shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <Smartphone className="w-5 h-5" />
          <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
            Proyecto Android Nativa
          </span>
        </div>
        <h2 className="text-2xl font-bold mb-2">Mi Agenda — Kotlin & Jetpack Compose</h2>
        <p className="text-emerald-100 text-sm leading-relaxed">
          Aplicación actualizada con barra de búsqueda en tiempo real para filtrar actividades por su nombre.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-slate-200 dark:bg-slate-900 p-1.5 rounded-2xl">
        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'simulator'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Smartphone className="w-4 h-4" /> Simulador de App
        </button>

        <button
          onClick={() => setActiveTab('code')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'code'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Code className="w-4 h-4" /> Código Kotlin (MainActivity.kt)
        </button>

        <button
          onClick={() => setActiveTab('explanation')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'explanation'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" /> Explicación de la Pantalla
        </button>
      </div>

      {/* Tab 1: Simulator */}
      {activeTab === 'simulator' && (
        <div className="flex flex-col items-center justify-center py-4">
          {/* Phone Frame */}
          <div className="w-full max-w-[380px] bg-slate-900 dark:bg-slate-950 rounded-[48px] p-4 shadow-2xl border-[6px] border-slate-800">
            {/* Phone Screen */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-[36px] overflow-hidden flex flex-col h-[720px] text-slate-900 dark:text-slate-100 shadow-inner relative">
              
              {/* Android Status Bar */}
              <div className="bg-emerald-700 text-white px-6 py-2 text-xs flex justify-between items-center font-mono">
                <span>09:50</span>
                <span className="text-[10px] bg-emerald-800 px-2 py-0.5 rounded">Android 15 · Jetpack Compose</span>
              </div>

              {/* Material 3 Top App Bar */}
              <div className="bg-emerald-600 text-white px-5 py-4 shadow-md flex items-center justify-between">
                <h1 className="text-lg font-bold tracking-tight">Mi Agenda</h1>
                <span className="text-xs bg-emerald-700 px-2 py-1 rounded-lg">
                  {activities.filter(a => !a.isCompleted).length} pendientes
                </span>
              </div>

              {/* Content Area */}
              <div className="flex-1 p-4 flex flex-col gap-2.5 overflow-y-auto">
                {/* Text input for activity */}
                <div>
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => {
                      setInputText(e.target.value);
                      if (errorMessage) setErrorMessage('');
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddActivity()}
                    placeholder="Escribe una actividad..."
                    className={`w-full px-4 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 ${
                      errorMessage ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-500'
                    }`}
                  />
                  {errorMessage && (
                    <p className="text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1 font-medium px-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errorMessage}
                    </p>
                  )}
                </div>

                {/* Date input and Priority selector */}
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={inputDate}
                    onChange={(e) => setInputDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700 dark:text-slate-200"
                  />
                  <select
                    value={inputPriority}
                    onChange={(e) => setInputPriority(e.target.value as Priority)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700 dark:text-slate-200 font-semibold"
                  >
                    <option value="Baja">🟢 Baja</option>
                    <option value="Media">🟡 Media</option>
                    <option value="Alta">🔴 Alta</option>
                  </select>
                </div>

                <button
                  onClick={handleAddActivity}
                  className="w-full h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center shadow-md active:scale-95 transition-transform"
                >
                  Agregar actividad
                </button>

                {/* Real-time Search Bar */}
                <div className="relative pt-1">
                  <Search className="absolute left-3.5 top-1/2 translate-y-0.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar actividad en tiempo real..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white"
                  />
                </div>

                {/* List of activities */}
                <div className="flex-1 space-y-2 overflow-y-auto pt-1">
                  {filteredActivities.length === 0 ? (
                    <div className="text-center py-10 text-slate-400 text-xs">
                      {searchQuery ? 'No se encontraron actividades con ese nombre.' : 'No hay actividades en la lista.'}
                    </div>
                  ) : (
                    filteredActivities.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs transition-all ${
                          item.isCompleted ? 'opacity-60 bg-emerald-50/50 dark:bg-emerald-950/20' : ''
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <input
                            type="checkbox"
                            checked={item.isCompleted}
                            onChange={() => handleToggleComplete(item.id)}
                            className="w-5 h-5 text-emerald-600 rounded-md border-slate-300 focus:ring-emerald-500 cursor-pointer shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <p
                                className={`text-sm font-medium truncate ${
                                  item.isCompleted ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'
                                }`}
                              >
                                {item.text}
                              </p>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityBadgeColor(item.priority)} shrink-0`}>
                                {item.priority}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                              <CalendarIcon className="w-3 h-3" /> {item.date}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 ml-2 shrink-0">
                          <button
                            onClick={() => handleStartEdit(item)}
                            title="Editar actividad"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteActivity(item.id)}
                            title="Eliminar actividad"
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Edit Modal / Dialog */}
              {editingActivity && (
                <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
                  <div className="w-full bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-700">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">Editar Actividad</h3>
                      <button
                        onClick={() => setEditingActivity(null)}
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Nombre</label>
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Fecha</label>
                      <input
                        type="date"
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Prioridad</label>
                      <select
                        value={editPriority}
                        onChange={(e) => setEditPriority(e.target.value as Priority)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 font-semibold"
                      >
                        <option value="Baja">🟢 Baja</option>
                        <option value="Media">🟡 Media</option>
                        <option value="Alta">🔴 Alta</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                      <button
                        onClick={() => setEditingActivity(null)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm"
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 text-center">
            Simulador actualizado con barra de búsqueda en tiempo real.
          </p>
        </div>
      )}

      {/* Tab 2: Kotlin Code */}
      {activeTab === 'code' && (
        <div className="bg-slate-900 rounded-2xl p-4 text-slate-100 font-mono text-xs overflow-x-auto shadow-xl">
          <div className="flex justify-between items-center pb-3 mb-3 border-b border-slate-800 text-slate-400">
            <span>MainActivity.kt (Con Búsqueda en Tiempo Real)</span>
            <button
              onClick={() => navigator.clipboard.writeText(KOTLIN_SOURCE_CODE)}
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[11px] font-sans font-semibold transition-colors"
            >
              Copiar Código
            </button>
          </div>
          <pre className="whitespace-pre overflow-x-auto leading-relaxed text-emerald-300">
            {KOTLIN_SOURCE_CODE}
          </pre>
        </div>
      )}

      {/* Tab 3: Explanation */}
      {activeTab === 'explanation' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 space-y-4 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Barra de Búsqueda en Tiempo Real con Jetpack Compose
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Para filtrar las actividades al instante mientras el usuario escribe:
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">1. Estado de Búsqueda (searchQuery)</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Se añadió un campo de texto OutlinedTextField en la parte superior de la lista cuya entrada actualiza una variable de estado searchQuery.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">2. Filtrado Dinámico (filter)</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Mediante la función <code>.filter &#123; item -&gt; item.text.contains(searchQuery, ignoreCase = true) &#125;</code>, la lista muestra únicamente las actividades que coinciden con la búsqueda en tiempo real.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
