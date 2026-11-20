import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { HomeTab } from './components/HomeTab';
import { CalendarTab } from './components/CalendarTab';
import { TasksTab } from './components/TasksTab';
import { NotesTab } from './components/NotesTab';
import { ProgressTab } from './components/ProgressTab';
import { TaskModal } from './components/TaskModal';
import { ClassModal } from './components/ClassModal';
import { NoteModal } from './components/NoteModal';
import { Task, ClassEvent, Note, CourseModule } from './types';
import { initialTasks, initialClasses, initialNotes, initialModules } from './data/initialData';
import { Sparkles, Wifi, Battery, Signal } from 'lucide-react';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('ai_agenda_dark');
    return saved ? JSON.parse(saved) : false;
  });

  const [currentTab, setCurrentTab] = useState<TabType>('inicio');

  // Persistent states
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('ai_agenda_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [classes, setClasses] = useState<ClassEvent[]>(() => {
    const saved = localStorage.getItem('ai_agenda_classes');
    return saved ? JSON.parse(saved) : initialClasses;
  });

  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('ai_agenda_notes');
    return saved ? JSON.parse(saved) : initialNotes;
  });

  const [modules, setModules] = useState<CourseModule[]>(() => {
    const saved = localStorage.getItem('ai_agenda_modules');
    return saved ? JSON.parse(saved) : initialModules;
  });

  // Modal states
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  useEffect(() => {
    localStorage.setItem('ai_agenda_dark', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('ai_agenda_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('ai_agenda_classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('ai_agenda_notes', JSON.stringify(notes));
  }, [notes]);

  // Handlers for Tasks
  const handleToggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, status: t.status === 'pendiente' ? 'completada' : 'pendiente' } : t
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'status'> & { id?: string }) => {
    if (taskData.id) {
      setTasks(prev =>
        prev.map(t => (t.id === taskData.id ? { ...t, ...taskData } : t))
      );
    } else {
      const newTask: Task = {
        id: 't_' + Date.now(),
        title: taskData.title,
        description: taskData.description,
        dueDate: taskData.dueDate,
        priority: taskData.priority,
        category: taskData.category,
        status: 'pendiente',
      };
      setTasks(prev => [newTask, ...prev]);
    }
    setEditingTask(null);
  };

  const handleOpenEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  // Handlers for Classes
  const handleSaveClass = (classData: Omit<ClassEvent, 'id'> & { id?: string }) => {
    const newClass: ClassEvent = {
      id: 'c_' + Date.now(),
      ...classData,
    };
    setClasses(prev => [newClass, ...prev]);
  };

  const handleDeleteClass = (id: string) => {
    setClasses(prev => prev.filter(c => c.id !== id));
  };

  // Handlers for Notes
  const handleSaveNote = (noteData: Omit<Note, 'id' | 'date'> & { id?: string }) => {
    const todayStr = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
    if (noteData.id) {
      setNotes(prev =>
        prev.map(n => (n.id === noteData.id ? { ...n, ...noteData, date: todayStr } : n))
      );
    } else {
      const newNote: Note = {
        id: 'n_' + Date.now(),
        title: noteData.title,
        category: noteData.category,
        content: noteData.content,
        tags: noteData.tags,
        date: todayStr,
      };
      setNotes(prev => [newNote, ...prev]);
    }
    setEditingNote(null);
  };

  const handleOpenEditNote = (note: Note) => {
    setEditingNote(note);
    setIsNoteModalOpen(true);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const pendingTasksCount = tasks.filter(t => t.status === 'pendiente').length;

  return (
    <div className="min-h-screen bg-slate-900 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col items-center justify-center p-0 sm:p-4 transition-colors">
      
      {/* Mobile Phone Frame Container */}
      <div className="w-full sm:max-w-[410px] h-screen sm:h-[860px] bg-slate-50 dark:bg-slate-950 flex flex-col sm:rounded-[48px] sm:shadow-2xl sm:border-[8px] sm:border-slate-800 dark:sm:border-slate-700 overflow-hidden relative">
        
        {/* Realistic Mobile Status Bar */}
        <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 py-2 text-[11px] font-semibold text-slate-600 dark:text-slate-300 flex justify-between items-center z-40 select-none border-b border-slate-100 dark:border-slate-800/60">
          <span>09:43</span>
          <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-1.5 hidden sm:block" />
          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Top Header */}
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          isMobileFrame={true}
          setIsMobileFrame={() => {}}
        />

        {/* Main Scrollable Content */}
        <main className="flex-1 px-4 py-4 overflow-y-auto">
          {currentTab === 'inicio' && (
            <HomeTab
              tasks={tasks}
              classes={classes}
              notes={notes}
              onToggleTask={handleToggleTask}
              setCurrentTab={setCurrentTab}
              onOpenNewTask={() => {
                setEditingTask(null);
                setIsTaskModalOpen(true);
              }}
              onOpenNewClass={() => setIsClassModalOpen(true)}
            />
          )}

          {currentTab === 'calendario' && (
            <CalendarTab
              classes={classes}
              onOpenNewClass={() => setIsClassModalOpen(true)}
              onDeleteClass={handleDeleteClass}
            />
          )}

          {currentTab === 'tareas' && (
            <TasksTab
              tasks={tasks}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              onOpenNewTask={() => {
                setEditingTask(null);
                setIsTaskModalOpen(true);
              }}
              onEditTask={handleOpenEditTask}
            />
          )}

          {currentTab === 'notas' && (
            <NotesTab
              notes={notes}
              onOpenNewNote={() => {
                setEditingNote(null);
                setIsNoteModalOpen(true);
              }}
              onEditNote={handleOpenEditNote}
              onDeleteNote={handleDeleteNote}
            />
          )}

          {currentTab === 'progreso' && (
            <ProgressTab tasks={tasks} modules={modules} />
          )}
        </main>

        {/* Fixed Bottom Navigation */}
        <BottomNav
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          pendingTasksCount={pendingTasksCount}
        />

        {/* Modals */}
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => {
            setIsTaskModalOpen(false);
            setEditingTask(null);
          }}
          onSave={handleSaveTask}
          editingTask={editingTask}
        />

        <ClassModal
          isOpen={isClassModalOpen}
          onClose={() => setIsClassModalOpen(false)}
          onSave={handleSaveClass}
        />

        <NoteModal
          isOpen={isNoteModalOpen}
          onClose={() => {
            setIsNoteModalOpen(false);
            setEditingNote(null);
          }}
          onSave={handleSaveNote}
          editingNote={editingNote}
        />
      </div>
    </div>
  );
}
