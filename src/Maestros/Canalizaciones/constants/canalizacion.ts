import type { CanalizacionAlumno, Manifestacion, Prioridad } from '../types'

export const alumnoCanalizacion: CanalizacionAlumno = {
  nombre: 'Luis Andrés Peralta Grajales',
  matricula: '02B-VES-001',
  grupo: '2° B Vespertino',
  asignatura: 'Español II',
  docente: 'Prof. Andrés Salazar',
  turno: 'Turno Vespertino',
}

export const manifestaciones: Manifestacion[] = [
  {
    id: 'desregulacion',
    label: 'Desregulación sensorial o auditiva',
    icon: 'ear',
    checked: false,
  },
  {
    id: 'consignas',
    label: 'Dificultad para seguir consignas verbales extensas',
    icon: 'headphones',
    checked: false,
  },
  {
    id: 'aislamiento',
    label: 'Aislamiento social o mutismo situacional',
    icon: 'user-cog',
    checked: false,
  },
  {
    id: 'lectura-calculo',
    label: 'Dificultad de lectura o cálculo matemático',
    icon: 'bookmark',
    checked: false,
  },
]

export const prioridades: Prioridad[] = [
  {
    id: 'ordinaria',
    title: 'Ordinaria',
    description: 'Atención programada regular en un lapso de 10 a 15 días hábiles.',
    icon: 'clock',
  },
  {
    id: 'prioritaria',
    title: 'Prioritaria',
    description: 'Revisión clínica y entrevista docente en un plazo máximo de 48 horas.',
    icon: 'trending-up',
  },
  {
    id: 'urgente',
    title: 'Urgente Inmediata',
    description: 'Riesgo inminente o crisis aguda. Notificación inmediata a dirección y SEE.',
    icon: 'circle-x',
  },
]

export const canalizacionContent = {
  header: {
    etiqueta: 'PROTOCOLO SEE / GABINETE PSICOPEDAGÓGICO',
    titulo: 'Formato Oficial de Canalización Docente a Psicología y SEE',
    descripcion:
      'Complete los datos observados en el aula. Su reporte será atendido por el Gabinete de Psicología y archivado en el expediente oficial del alumno.',
    icon: 'clipboard' as const,
  },
  pasos: {
    paso1: {
      numero: '1',
      etiqueta: 'PASO 1 · EN PROGRESO',
      titulo: 'Datos del Alumno y Motivo Principal',
      activo: true,
    },
    paso2: {
      numero: '2',
      etiqueta: 'PASO 2 · SIGUIENTE',
      titulo: 'Observaciones de Aula y Prioridad',
      activo: false,
    },
  },
  seccion1: {
    titulo: '1. Identificación Escolar',
    icon: 'user-cog' as const,
    alumnoLabel: 'Nombre Completo del Alumno *',
    alumnoTag: 'Matrícula vinculada',
    asignaturaLabel: 'Asignatura y Grupo Evaluado *',
    asignaturaTag: 'Docente asignado',
    alumnoValue:
      'Luis Andrés Peralta Grajales — 2° B Vespertino',
    asignaturaValue:
      'Español II — Turno Vespertino (Prof. Andrés Salazar)',
    info: {
      titulo: 'Ficha previa: Perfil DUA Nivel 1 activo',
      texto:
        'El alumno cuenta con adaptaciones vigentes en apoyos visuales y tiempo extendido. Registre si estas adecuaciones siguen respondiendo o si el incidente amerita revaloración clínica.',
      icon: 'info' as const,
    },
  },
  seccion2: {
    titulo: '2. Factores Observados en Aula',
    icon: 'star' as const,
    preguntaAfecta:
      '¿Las características del alumno afectan significativamente su aprendizaje o convivencia cotidiana? *',
    siLabel: 'SÍ, AFECTA EL DESEMPEÑO',
    noLabel: 'NO, ES PREVENTIVO',
    manifestacionesTitulo: 'Manifestaciones o barreras para el aprendizaje identificadas:',
    descripcionLabel:
      'Describa detalladamente la situación observada en el salón de clases y qué apoyos brindó: *',
    descripcionPlaceholder:
      'Durante la actividad grupal de hoy, el alumno mostró signos de saturación por el ruido circundante: cubrió sus oídos y dejó de responder a las preguntas del equipo. Se le ofreció trasladarse al rincón de calma del aula y utilizar sus protectores auditivos de atenuación, logrando estabilizarse tras 15 minutos, aunque no retomó la lectura colectiva.',
    ayudaRedaccion: 'Redacción objetiva y libre de juicios de valor.',
    prioridadTitulo: 'Nivel de Prioridad Sugerido para la Intervención: *',
    maxCaracteres: 1000,
  },
  acciones: {
    cancelar: '← Cancelar / Volver',
    guardar: 'Guardar Borrador',
    enviar: 'Enviar Canalización Oficial a Psicología',
  },
  avisoPrivacidad: {
    titulo: 'AVISO DE PRIVACIDAD ESCOLAR',
    texto:
      'Este informe constituye un documento oficial de acompañamiento pedagógico tutelado por la Ley General de Educación y la LGDNNA. El registro queda bajo resguardo estricto del Gabinete de Psicología Educativa y la Secretaría de Educación Estatal.',
    icon: 'shield' as const,
  },
}
