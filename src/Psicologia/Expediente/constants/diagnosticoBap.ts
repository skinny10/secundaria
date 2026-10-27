import type { IconName } from '../../../utils/types'

export interface BarreraBAP {
  id: string
  titulo: string
  categoria: string
  icono: IconName
  descripcion: string
  recomendacion: string
  impacto: 'Alto' | 'Medio' | 'Bajo'
}

export interface FortalezaBAP {
  id: string
  titulo: string
  descripcion: string
  evaluacion?: string
}

export interface HistorialIntervencion {
  id: string
  fecha: string
  tipo: string
  responsable: string
  descripcion: string
}

export interface PerfilCognitivo {
  id: string
  etiqueta: string
  valor: number
  unidad: string
  interpretacion: string
}

export const resumenDiagnostico = {
  titulo: '1. Resumen Diagnóstico Clínico Integral',
  encabezado: 'DOCUMENTACIÓN OFICIAL EXTERNA',
  especialista: 'Dra. Verónica Castillo Lara • Neuropediatría',
  tipoEvaluacion: 'Evaluación Integral Psicopedagógica y Neurológica',
  dictamenPrincipal: 'TEA Grado 1 - Trastorno del Espectro Autista',
  referenciaFecha: 'INEE/CONADIS • 08/09/2024',
  validado: 'Validado SEP-SEE',
  resumen:
    'Se identifica Trastorno del Espectro Autista Grado 1 con hipersensibilidad acústica, rigidez cognitiva ante cambios imprevistos y dificultades en la regulación ante sobrecarga sensorial. Presenta necesidades de apoyo en organización, anticipación y modulación sensorial. Se requiere Plan de Adecuaciones con enfoque DUA.',
  notaDocente:
    'Es fundamental garantizar anticipación, estructura visual, reducción de estímulos auditivos y un espacio de regulación. Las adecuaciones deben aplicarse de forma sistemática en todas las asignaturas, respetando el ritmo y las señales de autorregulación del alumno.',
}

export const barrerasBAP: BarreraBAP[] = [
  {
    id: 'instrucciones-verbales',
    titulo: 'Instrucciones verbales largas sin secuenciación visual',
    categoria: 'Barreras de acceso / Organización',
    icono: 'list-checks',
    descripcion:
      'Dificultad para procesar consignas extensas presentadas únicamente de forma oral. Requiere segmentación, apoyo visual y verificación de comprensión.',
    recomendacion: 'Usar secuencias visuales, consignas por pasos y confirmación activa.',
    impacto: 'Alto',
  },
  {
    id: 'hipersensibilidad-auditiva',
    titulo: 'Hipersensibilidad auditiva ante ruidos de choque súbito',
    categoria: 'Barreras sensoriales',
    icono: 'volume-x',
    descripcion:
      'Reacción de sobresalto y aumento de activación ante ruidos inesperados (golpes, gritos, timbres). Se requiere modulación auditiva.',
    recomendacion: 'Autorización de orejeras atenuantes, anticipación y ubicación estratégica.',
    impacto: 'Alto',
  },
  {
    id: 'rigidez-cambios',
    titulo: 'Rigidez ante alteraciones imprevistas de horario o suplencias',
    categoria: 'Barreras emocionales / Transición',
    icono: 'clock',
    descripcion:
      'Ansiedad y resistencia ante cambios no anticipados. Necesita información previa, rutinas visuales y tiempo para la transición.',
    recomendacion: 'Aviso anticipado, agenda visual y pase sensorial si hay sobrecarga.',
    impacto: 'Alto',
  },
]

export const fortalezasBAP: FortalezaBAP[] = [
  {
    id: 'visoespacial',
    titulo: 'Razonamiento visoespacial',
    descripcion:
      'Destaca en la interpretación de diagramas, mapas, esquemas y en la resolución de problemas con apoyo gráfico.',
    evaluacion: 'Fuerte',
  },
  {
    id: 'hiperfoco',
    titulo: 'Hiperfoco lógico-matemático',
    descripcion:
      'Capacidad para mantener atención sostenida en tareas de lógica, patrones numéricos y razonamiento sistemático cuando el entorno es predecible.',
    evaluacion: 'Fuerte',
  },
]

export const perfilCognitivo: PerfilCognitivo[] = [
  {
    id: 'atencion-sostenida',
    etiqueta: 'Atención Sostenida (ambiente estructurado)',
    valor: 85,
    unidad: '%',
    interpretacion: 'Adecuado con apoyos',
  },
  {
    id: 'procesamiento-verbal',
    etiqueta: 'Procesamiento Verbal',
    valor: 72,
    unidad: '%',
    interpretacion: 'Requiere andamiaje',
  },
  {
    id: 'procesamiento-visoespacial',
    etiqueta: 'Procesamiento Visoespacial',
    valor: 92,
    unidad: '%',
    interpretacion: 'Fuerte',
  },
  {
    id: 'flexibilidad-cognitiva',
    etiqueta: 'Flexibilidad Cognitiva',
    valor: 58,
    unidad: '%',
    interpretacion: 'Requiere anticipación',
  },
]

export const historialIntervenciones: HistorialIntervencion[] = [
  {
    id: 'h1',
    fecha: '12/09/2024',
    tipo: 'Observación de Aula',
    responsable: 'Dra. Claudia Méndez • Psicología SEE',
    descripcion:
      'Se observa buen desempeño en Matemáticas con apoyos visuales. Se identifica aumento de activación tras cambio de horario.',
  },
  {
    id: 'h2',
    fecha: '25/09/2024',
    tipo: 'Intervención Regulatoria',
    responsable: 'Lic. Mariana Hinojosa • Terapia Ocupacional',
    descripcion:
      'Aplicación de estrategias sensoriales en Rincón de Calma. Se autoriza uso de orejeras atenuantes y pase sensorial.',
  },
  {
    id: 'h3',
    fecha: '09/10/2024',
    tipo: 'Seguimiento Multidisciplinar',
    responsable: 'Consejo de Inclusión Escolar',
    descripcion:
      'Se acuerda Plan DUA, ubicación perimetral, anticipación de cambios y seguimiento quincenal. Se programa revisión 14/10/2024.',
  },
]
