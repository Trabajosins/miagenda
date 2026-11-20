import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Note } from '../types';

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Omit<Note, 'id' | 'date'> & { id?: string }) => void;
  editingNote?: Note | null;
}

export const NoteModal: React.FC<NoteModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingNote,
}) => {
  const [title, setTitle] = useState(editingNote?.title || '');
  const [category, setCategory] = useState(editingNote?.category || 'Prompt Engineering');
  const [content, setContent] = useState(editingNote?.content || '');
  const [tagsInput, setTagsInput] = useState(editingNote?.tags.join(', ') || 'ai-studio, gemini');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    const tags = tagsInput.split(',').map((t) => t.trim()).filter(Boolean);
    onSave({
      id: editingNote?.id,
      title,
      category,
      content,
      tags,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full sm:max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {editingNote ? 'Editar Apunte' : 'Nuevo Apunte de Estudio'}
          </h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Título del Apunte *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Mejores prácticas para System Instructions"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Categoría
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Prompt Engineering">Prompt Engineering</option>
                <option value="Herramientas y APIs">Herramientas y APIs</option>
                <option value="Multimodal">Multimodal</option>
                <option value="Parámetros">Parámetros</option>
                <option value="Seguridad">Seguridad</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Etiquetas (separadas por coma)
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="prompt, gemini, roles"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Contenido de los Apuntes *
            </label>
            <textarea
              rows={6}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escribe tus notas, fórmulas o conceptos clave del curso..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 shadow-sm shadow-indigo-500/30 transition-colors"
            >
              {editingNote ? 'Guardar Cambios' : 'Guardar Apunte'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
