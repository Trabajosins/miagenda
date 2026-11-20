import { Task, ClassEvent, Note, CourseModule } from '../types';

export const initialTasks: Task[] = [
  {
    id: 't1',
    title: 'Crear un prompt estructurado con System Instructions',
    description: 'Diseñar un prompt de rol para un asistente de atención médica utilizando system instructions estrictas en Google AI Studio.',
    dueDate: '2026-05-22',
    priority: 'alta',
    status: 'pendiente',
    category: 'Prompt Engineering'
  },
  {
    id: 't2',
    title: 'Configurar Function Calling para consultar clima y hora',
    description: 'Definir esquemas JSON tools para conectar Gemini con funciones simuladas de API externa.',
    dueDate: '2026-05-25',
    priority: 'media',
    status: 'pendiente',
    category: 'Herramientas y APIs'
  },
  {
    id: 't3',
    title: 'Pruebas de modelos multimodales con video',
    description: 'Subir un clip de 30 segundos y pedir a gemini-2.5-flash que extraiga marcas de tiempo de eventos clave.',
    dueDate: '2026-05-18',
    priority: 'baja',
    status: 'completada',
    category: 'Multimodal'
  },
  {
    id: 't4',
    title: 'Ajuste de temperatura y top-P para creatividad',
    description: 'Comparar respuestas con temperatura 0.0 (determinista) frente a 1.0 (creativo) en generación de cuentos.',
    dueDate: '2026-05-15',
    priority: 'media',
    status: 'completada',
    category: 'Parámetros'
  },
  {
    id: 't5',
    title: 'Evaluar umbrales de seguridad en Safety Settings',
    description: 'Probar cómo reacciona el modelo ante entradas con contenido sensible ajustando los filtros de bloqueo.',
    dueDate: '2026-06-02',
    priority: 'alta',
    status: 'pendiente',
    category: 'Seguridad'
  }
];

export const initialClasses: ClassEvent[] = [
  {
    id: 'c1',
    title: 'Fundamentos de Modelos Gemini y AI Studio',
    type: 'clase',
    date: '2026-05-20',
    time: '10:00 - 11:30',
    location: 'Google Meet / Sala 1',
    instructor: 'Dra. Elena Vargas'
  },
  {
    id: 'c2',
    title: 'Laboratorio Práctico: Function Calling y Declaración de Schemas',
    type: 'laboratorio',
    date: '2026-05-22',
    time: '15:00 - 17:00',
    location: 'Laboratorio de Cómputo B',
    instructor: 'Ing. Carlos Mendoza'
  },
  {
    id: 'c3',
    title: 'Taller de Prompts Avanzados y Few-Shot Learning',
    type: 'clase',
    date: '2026-05-25',
    time: '10:00 - 11:30',
    location: 'Google Meet / Sala 1',
    instructor: 'Dra. Elena Vargas'
  },
  {
    id: 'c4',
    title: 'Sesión de Dudas y Revisión de Proyecto Final',
    type: 'estudio',
    date: '2026-05-30',
    time: '16:00 - 18:00',
    location: 'Discord de la Comunidad',
    instructor: 'Tutor Académico'
  }
];

export const initialNotes: Note[] = [
  {
    id: 'n1',
    title: 'Diferencia entre Temperatura, Top-P y Top-K',
    category: 'Parámetros',
    date: '14 May 2026',
    tags: ['temperatura', 'top-p', 'muestreo'],
    content: 'La temperatura controla la aleatoriedad de las predicciones de tokens (0.0 = determinista y repetible, 1.0 = creativo y variado). Top-P (nucleus sampling) limita el conjunto de tokens considerados a aquellos cuya probabilidad acumulada alcanza P. Top-K restringe la selección a los K tokens más probables.'
  },
  {
    id: 'n2',
    title: 'Cómo estructurar System Instructions eficaces',
    category: 'Prompt Engineering',
    date: '16 May 2026',
    tags: ['system-instructions', 'rol', 'restricciones'],
    content: '1. Definir claramente el rol del modelo (ej: "Eres un experto en ciberseguridad").\n2. Establecer directrices de formato (ej: "Responde siempre en formato JSON estructurado").\n3. Incluir ejemplos de caso de borde y restricciones de tono.'
  },
  {
    id: 'n3',
    title: 'Estructura para Function Calling',
    category: 'Herramientas y APIs',
    date: '18 May 2026',
    tags: ['tools', 'json-schema', 'apis'],
    content: 'Para usar function calling en Google AI Studio se declaran objetos JSON con nombre, descripción y parámetros tipados (properties con tipo string, number, array). El modelo decide cuándo invocar la función basándose en la consulta del usuario y devuelve los argumentos requeridos.'
  },
  {
    id: 'n4',
    title: 'Capacidades Multimodales en Gemini 2.5',
    category: 'Multimodal',
    date: '19 May 2026',
    tags: ['video', 'audio', 'imagenes'],
    content: 'Gemini procesa de forma nativa video (hasta 2 horas de video o audio a alta velocidad de muestreo), imágenes de alta resolución y documentos PDF complejos sin necesidad de OCR externo previo.'
  }
];

export const initialModules: CourseModule[] = [
  {
    id: 'm1',
    title: 'Módulo 1: Introducción a Google AI Studio',
    description: 'Interfaz, API keys, tipos de modelos (Flash, Pro) y primeros prompts.',
    totalLessons: 5,
    completedLessons: 5
  },
  {
    id: 'm2',
    title: 'Módulo 2: Prompt Engineering Avanzado',
    description: 'Few-shot prompting, system instructions y cadenas de razonamiento.',
    totalLessons: 6,
    completedLessons: 4
  },
  {
    id: 'm3',
    title: 'Módulo 3: Function Calling y Datos Dinámicos',
    description: 'Conexión de modelos con APIs externas y bases de datos locales.',
    totalLessons: 5,
    completedLessons: 2
  },
  {
    id: 'm4',
    title: 'Módulo 4: Multimodalidad y Aplicaciones Reales',
    description: 'Procesamiento de audio, video, imágenes y despliegue final.',
    totalLessons: 4,
    completedLessons: 1
  }
];
