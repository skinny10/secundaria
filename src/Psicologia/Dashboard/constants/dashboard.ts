import type {
  AccesoRapido,
  CanalizacionDashboard,
  CondicionDistribucion,
  DocumentoAuditoria,
} from '../types'

export const folioSesion = 'EXP-SEE-2025-084-BC'
export const totalAlumnos = 48
export const expedientesResguardo = 100
export const eficaciaAula = 92
export const expedientesObservados = 6
export const integridadGlobal = '94.2'
export const hashConfidencial = 'SHA256: 9f8e...7b21 [ENCRIPTADO]'
export const paginaTamano = 4

export const accesosRapidos: AccesoRapido[] = [
  {
    id: 'valoracion',
    titulo: '+ Nueva Valoración',
    detalle: 'Protocolo Psicopedagógico',
    icono: 'clipboard',
    tono: 'primario',
    destino: 'expediente',
  },
  {
    id: 'concentrado',
    titulo: 'Concentrado SEE',
    detalle: 'Padrón Semestral General',
    icono: 'trending-up',
    tono: 'azul',
    destino: 'reportes',
  },
  {
    id: 'auditoria',
    titulo: 'Auditoría Docs',
    detalle: '15 Requisitos Oficiales',
    icono: 'folder',
    tono: 'durazno',
    destino: 'expediente',
  },
  {
    id: 'dictamen',
    titulo: 'Emitir Dictamen',
    detalle: 'Reporte Oficial y Firmas',
    icono: 'file-signature',
    tono: 'menta',
    destino: 'reportes',
  },
]

export const condiciones: CondicionDistribucion[] = [
  {
    id: 'tea',
    nombre: 'TEA',
    alumnos: 18,
    porcentaje: '37.5',
    ajustes: 'Anticipación visual, rutinas estructuradas y apoyos de comunicación.',
    color: 'var(--sa-bar-forest)',
  },
  {
    id: 'tdah',
    nombre: 'TDAH',
    alumnos: 15,
    porcentaje: '31.2',
    ajustes: 'Fragmentación de tareas, pausas activas y monitoreo de atención.',
    color: 'var(--sa-bar-slate)',
  },
  {
    id: 'ansiedad',
    nombre: 'Ansiedad',
    alumnos: 9,
    porcentaje: '18.8',
    ajustes: 'Protocolos de desescalada y evaluación en espacios tranquilos.',
    color: 'var(--sa-bar-coffee)',
  },
  {
    id: 'sensorial',
    nombre: 'Sensorial / Motriz',
    alumnos: 6,
    porcentaje: '12.5',
    ajustes: 'Materiales ampliados, pase sensorial y apoyos de motricidad fina.',
    color: 'var(--sa-bar-gray)',
  },
]

export const documentosAuditoria: DocumentoAuditoria[] = [
  { id: 'doc-1', nombre: 'Ficha de Identificación del Alumno', valor: '100%', estado: 'completo' },
  { id: 'doc-2', nombre: 'Consentimiento Informado de Tutores', valor: '96%', estado: 'completo' },
  { id: 'doc-3', nombre: 'Valoración Psicopedagógica Inicial', valor: '90%', estado: 'parcial' },
  { id: 'doc-4', nombre: 'Plan de Ajustes Curriculares DUA', valor: '88%', estado: 'parcial' },
  { id: 'doc-5', nombre: 'Dictamen y Firmas SEE', valor: '6 Pend.', estado: 'pendiente' },
]

export const canalizaciones: CanalizacionDashboard[] = [
  {
    id: 'can-1',
    iniciales: 'ML',
    nombre: 'Mateo Luna Ruiz',
    grado: '2° Año',
    grupo: 'B',
    folio: '#891',
    docente: 'Prof. Roberto Garza',
    materia: 'Matemáticas II',
    motivo:
      'Bloqueo ante evaluaciones escritas, crisis de llanto e hiperventilación durante exámenes.',
    urgencia: 'Prioritaria',
    etiquetaUrgencia: 'Prioritaria (Crisis)',
    tonoUrgencia: 'rosa',
  },
  {
    id: 'can-2',
    iniciales: 'SP',
    nombre: 'Sofía Paredes Vega',
    grado: '1° Año',
    grupo: 'A',
    folio: '#893',
    docente: 'Mtra. Elena Estrada',
    materia: 'Lengua Española I',
    motivo:
      'Dificultad para sostener la atención en tareas largas y constantes olvidos de material.',
    urgencia: 'Ordinaria',
    etiquetaUrgencia: 'Ordinaria (TDAH/DA)',
    tonoUrgencia: 'azul',
  },
  {
    id: 'can-3',
    iniciales: 'DC',
    nombre: 'Diego Castillo Nava',
    grado: '3° Año',
    grupo: 'C',
    folio: '#895',
    docente: 'Prof. Carlos Saldívar',
    materia: 'Física y Química',
    motivo:
      'Sensibilidad auditiva al ruido del laboratorio y necesidad de pase sensorial durante prácticas.',
    urgencia: 'Prioritaria',
    etiquetaUrgencia: 'Prioritaria (Sensorial)',
    tonoUrgencia: 'rosa',
  },
  {
    id: 'can-4',
    iniciales: 'VT',
    nombre: 'Valeria Torres Mora',
    grado: '2° Año',
    grupo: 'D',
    folio: '#899',
    docente: 'Mtra. Patricia Lozano',
    materia: 'Historia Universal',
    motivo:
      'Baja visión: requiere materiales ampliados y ubicación estratégica en el aula.',
    urgencia: 'Ordinaria',
    etiquetaUrgencia: 'Ordinaria (Visual)',
    tonoUrgencia: 'gris',
  },
  {
    id: 'can-5',
    iniciales: 'RG',
    nombre: 'Regina Gómez Salas',
    grado: '1° Año',
    grupo: 'C',
    folio: '#901',
    docente: 'Prof. Héctor Villalobos',
    materia: 'Geografía',
    motivo:
      'Episodios de desregulación emocional ante cambios de actividad no anticipados.',
    urgencia: 'Prioritaria',
    etiquetaUrgencia: 'Prioritaria (Crisis)',
    tonoUrgencia: 'rosa',
  },
  {
    id: 'can-6',
    iniciales: 'IT',
    nombre: 'Iker Treviño Ramos',
    grado: '3° Año',
    grupo: 'A',
    folio: '#903',
    docente: 'Mtra. Silvia Nájera',
    materia: 'Inglés III',
    motivo:
      'Impulsividad en participaciones y dificultad para concluir actividades en el tiempo asignado.',
    urgencia: 'Ordinaria',
    etiquetaUrgencia: 'Ordinaria (TDAH/DA)',
    tonoUrgencia: 'azul',
  },
  {
    id: 'can-7',
    iniciales: 'AE',
    nombre: 'Andrea Espinoza Cruz',
    grado: '2° Año',
    grupo: 'A',
    folio: '#907',
    docente: 'Prof. Marco Beltrán',
    materia: 'Educación Física',
    motivo:
      'Limitación motriz fina que requiere adaptación de ejercicios y apoyos de coordinación.',
    urgencia: 'Ordinaria',
    etiquetaUrgencia: 'Ordinaria (Motriz)',
    tonoUrgencia: 'gris',
  },
  {
    id: 'can-8',
    iniciales: 'JL',
    nombre: 'Julián Leal Ortiz',
    grado: '1° Año',
    grupo: 'D',
    folio: '#911',
    docente: 'Mtra. Rocío Carmona',
    materia: 'Biología',
    motivo:
      'Hipoacusia leve: solicita apoyo visual y ubicación en las primeras filas del aula.',
    urgencia: 'Ordinaria',
    etiquetaUrgencia: 'Ordinaria (Auditiva)',
    tonoUrgencia: 'azul',
  },
  {
    id: 'can-9',
    iniciales: 'NF',
    nombre: 'Natalia Fuentes Ríos',
    grado: '3° Año',
    grupo: 'B',
    folio: '#915',
    docente: 'Prof. Óscar Peña',
    materia: 'Matemáticas III',
    motivo:
      'Ansiedad ante exposiciones frente al grupo y bloqueo en la resolución de problemas.',
    urgencia: 'Ordinaria',
    etiquetaUrgencia: 'Ordinaria (Ansiedad)',
    tonoUrgencia: 'gris',
  },
  {
    id: 'can-10',
    iniciales: 'EM',
    nombre: 'Emiliano Mata Solís',
    grado: '2° Año',
    grupo: 'C',
    folio: '#919',
    docente: 'Mtra. Lucía Ibarra',
    materia: 'Español II',
    motivo:
      'Dificultad para copiar del pizarrón y fatiga visual durante periodos prolongados.',
    urgencia: 'Ordinaria',
    etiquetaUrgencia: 'Ordinaria (Visual)',
    tonoUrgencia: 'azul',
  },
  {
    id: 'can-11',
    iniciales: 'PA',
    nombre: 'Paula Arriaga Núñez',
    grado: '1° Año',
    grupo: 'B',
    folio: '#923',
    docente: 'Prof. Daniel Varela',
    materia: 'Física I',
    motivo:
      'Respuesta aversiva a estímulos táctiles en actividades experimentales con materiales.',
    urgencia: 'Ordinaria',
    etiquetaUrgencia: 'Ordinaria (Sensorial)',
    tonoUrgencia: 'gris',
  },
  {
    id: 'can-12',
    iniciales: 'SB',
    nombre: 'Santiago Bravo Luna',
    grado: '3° Año',
    grupo: 'D',
    folio: '#927',
    docente: 'Mtra. Alba Quiroz',
    materia: 'Historia II',
    motivo:
      'Requiere apoyo de motricidad gruesa para desplazamientos y actividades de exposición.',
    urgencia: 'Ordinaria',
    etiquetaUrgencia: 'Ordinaria (Motriz)',
    tonoUrgencia: 'azul',
  },
]

export const totalCanalizaciones = canalizaciones.length

export const conteoUrgencias = {
  todas: totalCanalizaciones,
  prioritarias: canalizaciones.filter((registro) => registro.urgencia === 'Prioritaria').length,
  ordinarias: canalizaciones.filter((registro) => registro.urgencia === 'Ordinaria').length,
} as const

export function fechaCorte(ahora = new Date()): string {
  const partes = new Intl.DateTimeFormat('es-MX', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).formatToParts(ahora)
  const valor = (tipo: Intl.DateTimeFormatPartTypes) =>
    partes.find((parte) => parte.type === tipo)?.value ?? ''
  return `${valor('weekday')}, ${valor('day')} de ${valor('month')} de ${valor('year')}`
}
