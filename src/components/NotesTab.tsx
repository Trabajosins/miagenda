import React, { useState } from 'react';
import { BookOpen, Search, Plus, Tag, Trash2, Edit3, X, Calendar } from 'lucide-react';
import { Note } from '../types';

interface NotesTabProps {
  notes: Note[];
  onOpenNewNote: () => void;
  onEditNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
}

export const NotesTab: React.FC<NotesTabProps> = ({
  notes,
  onOpenNewNote,
  onEditNote,
  onDeleteNote,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [viewingNote, setViewingNote] = useState<Note | null>(null);

  const categories = ['todas', 'Prompt Engineering', 'Herramientas y APIs', 'Multimodal', 'Parámetros', 'Seguridad', 'General'];

  const filteredNotes = notes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          note.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'todas' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-24">
      {/* Header and Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Apuntes del Curso</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Conceptos y guías de Google AI Studio</p>
        </div>
        <button
          onClick={onOpenNewNote}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs flex items-center gap-2 shadow-sm shadow-indigo-500/30 transition-colors"
        >
          <Plus className="w-4 h-4" /> Nuevo Apunte
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar en apuntes por título, tema o etiquetas..."
          className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
        />
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Notes Grid / List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredNotes.length === 0 ? (
          <div className="col-span-full p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <BookOpen className="w-12 h-12 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-900 dark:text-white">No se encontraron apuntes</p>
            <p className="text-xs text-slate-500 mt-1">Prueba con otra búsqueda o crea un nuevo apunte.</p>
          </div>
        ) : (
          filteredNotes.map((note) => (
            <div
              key={note.id}
              onClick={() => setViewingNote(note)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">
                    {note.category}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {note.date}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {note.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                  {note.content}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {note.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-end gap-1 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEditNote(note);
                    }}
                    title="Editar apunte"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteNote(note.id);
                    }}
                    title="Eliminar apunte"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* View Note Modal */}
      {viewingNote && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full sm:max-w-xl bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {viewingNote.category}
              </span>
              <button
                onClick={() => setViewingNote(null)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="pt-4 space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {viewingNote.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>Creado el {viewingNote.date}</span>
              </div>

              <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                {viewingNote.content}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {viewingNote.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-lg"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    const noteToEdit = viewingNote;
                    setViewingNote(null);
                    onEditNote(noteToEdit);
                  }}
                  className="px-4 py-2.5 rounded-xl text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 transition-colors"
                >
                  Editar Apunte
                </button>
                <button
                  onClick={() => setViewingNote(null)}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
