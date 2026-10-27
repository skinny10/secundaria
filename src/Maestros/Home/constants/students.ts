import type { Student } from '../types'

export const students: Student[] = [
  {
    id: 'luis-peralta',
    initials: 'LP',
    name: 'Luis Andrés Peralta Grajales',
    matricula: 'NX-2024-881',
    salon: 'SALÓN 14 · 2° B',
    tone: 'menta',
    actionTone: 'forest',
    condition: {
      label: 'TEA Grado 1 (Soporte en Comunicación)',
      icon: 'message-circle',
      tone: 'menta',
    },
    adjustments: [
      {
        title: 'Anticipar cambios',
        description:
          'Avisar verbalmente y con tarjeta visual 5 minutos antes de transiciones de materia o timbre.',
      },
      {
        title: 'Protectores auditivos',
        description:
          'Uso libre de cancelador de ruido en recesos y clases de taller ruidosas.',
      },
      {
        title: 'Tiempo extra en exámenes',
        description:
          '+25% de tiempo adicional y lectura pausada de reactivos con lenguaje no metafórico.',
      },
    ],
    tracking: {
      icon: 'clock',
      text: 'Última revisión: Ayer, 16:30 hrs (Prof. Andrés Salazar)',
    },
  },
  {
    id: 'mateo-morales',
    initials: 'MM',
    name: 'Mateo Morales Rivas',
    matricula: 'NX-2024-0312',
    salon: 'SALÓN 08 · 1° B',
    tone: 'sky',
    actionTone: 'slate',
    condition: {
      label: 'TDAH Combinado (Atención e Impulsividad)',
      icon: 'zap',
      tone: 'sky',
    },
    adjustments: [
      {
        title: 'Asiento Frontal Estratégico',
        description:
          'Primera fila central, alejado de puertas, ventanas y estímulos de tránsito.',
      },
      {
        title: 'Consignas Cortas y Segmentadas',
        description:
          'Instrucciones de una en una; pausas activas motrices de 2 min tras bloques de 25 min.',
      },
    ],
    tracking: {
      icon: 'heart',
      text: 'Seguimiento: Dra. Claudia Méndez (Psicología)',
    },
  },
  {
    id: 'erik-molina',
    initials: 'EM',
    name: 'Erik Mateo Molina Rodríguez',
    matricula: 'NX-2024-0198',
    salon: 'SALÓN 04 · 1° K',
    tone: 'peach',
    actionTone: 'coffee',
    condition: {
      label: 'Dislexia Fonológica (Dificultad Lectora)',
      icon: 'book-open',
      tone: 'peach',
    },
    adjustments: [
      {
        title: 'Evaluaciones Orales y Auditivas',
        description: 'No penalizar ortografía; priorizar defensa verbal.',
      },
      {
        title: 'Tipo de Letra Accesible y Guías',
        description: 'Atkinson/OpenDyslexic 14pt con doble espaciado.',
      },
    ],
    tracking: {
      icon: 'graduation-cap',
      text: 'Tutor: Prof. Ramiro Peñaloza',
    },
  },
]
