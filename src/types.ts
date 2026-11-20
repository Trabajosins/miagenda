export type TaskStatus = 'pendiente' | 'completada';
export type TaskPriority = 'baja' | 'media' | 'alta';

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string; // YYYY-MM-DD
  priority: TaskPriority;
  status: TaskStatus;
  category: string;
}

export interface ClassEvent {
  id: string;
  title: string;
  type: 'clase' | 'laboratorio' | 'entrega' | 'estudio';
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  location: string; // e.g. "Aula Virtual / Google Meet"
  instructor?: string;
  completed?: boolean;
}

export interface Note {
  id: string;
  title: string;
  category: string;
  content: string;
  date: string;
  tags: string[];
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  totalLessons: number;
  completedLessons: number;
}
