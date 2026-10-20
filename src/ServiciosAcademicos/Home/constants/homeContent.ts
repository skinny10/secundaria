import type { Metric } from '../types'

export const homeContent = {
  pageHeader: {
    eyebrow: 'MODO MAESTRO SENIOR · ALTO CONTRASTE ACTIVO',
    title: 'Directorio Escolar Inclusivo',
    icon: 'eye',
  },
  metrics: [
    {
      id: 'alumnos',
      tone: 'sky',
      icon: 'users',
      title: 'Alumnos en mi Grupo',
      value: '28 estudiantes',
      description: 'Ciclo Escolar Activo 2024-2025',
    },
    {
      id: 'dua',
      tone: 'menta',
      icon: 'clipboard-check',
      title: 'Con Plan DUA / Ajustes',
      value: '5 prioritarios',
      description: '100% de expedientes vigentes',
    },
    {
      id: 'psicologia',
      tone: 'peach',
      icon: 'heart',
      title: 'Psicóloga del Plantel',
      value: 'Dra. Claudia Méndez',
      description: 'Disponible en aula C-3',
      chip: { label: 'Ext. 104', tone: 'coffee' },
    },
  ] satisfies Metric[],
  filters: {
    search: {
      label: 'Buscar expediente de estudiante:',
      placeholder: 'Escriba nombre del alumno o matrícula',
      icon: 'search',
    },
    group: {
      label: 'Grupo Asignado:',
      value: '2° B - Turno Vespertino',
    },
    condition: {
      label: 'Ajuste DUA / Condición:',
      value: 'Todos los diagnósticos',
    },
    newFicha: { label: 'Nueva Ficha', icon: 'plus' },
  },
  list: {
    title: 'Expedientes con Soporte DUA Activo (3 visibles)',
    subtitle: 'Priorizados por intervención pedagógica continua en el aula ordinaria.',
    validated: { label: 'Fichas Validadas por USAER / SEE', icon: 'shield' },
  },
  studentCard: {
    adjustmentsLabel: 'Ajustes Razonables Inmediatos para el Aula:',
    addNote: { label: 'Agregar Nota', icon: 'file-text' },
    viewFicha: 'Ver Ficha DUA Completa',
  },
  pagination: {
    summary: 'Mostrando 3 de 28 alumnos registrados en turno vespertino',
    prev: 'Anterior',
    next: 'Siguiente',
    pages: [1, 2, 3],
    activePage: 1,
  },
} as const
