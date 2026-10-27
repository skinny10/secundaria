import type { IconName } from '../../../utils/types'
import type { TonoChip } from '../../../Portal/shared/types'

export interface SegmentoDictamen {
  texto: string
  negrita?: boolean
}

export interface CajaDictamen {
  id: string
  etiqueta: string
  valor: string
  detalle: string
  icono: IconName
  acento?: boolean
}

export interface CompromisoParte {
  id: string
  parte: string
  tono: TonoChip
  icono: IconName
  items: string[]
  chip: string
}

export interface MetaTrimestre {
  id: string
  titulo: string
  porcentaje: number
  descripcion: string
}

export interface DocumentoExpediente {
  id: string
  nombre: string
  actual?: boolean
}

export interface AcuerdosLegales {
  dictamen: {
    titulo: string
    subtitulo: string
    chip: string
    cajaTitulo: string
    parrafo: SegmentoDictamen[]
    cajas: CajaDictamen[]
  }
  compromisos: {
    titulo: string
    subtitulo: string
    partes: CompromisoParte[]
  }
  firmas: {
    titulo: string
    subtitulo: string
  }
  validacion: {
    titulo: string
    subtitulo: string
    leyenda: string
    accion: string
  }
  metas: MetaTrimestre[]
  resumen: {
    titulo: string
    filas: { id: string; etiqueta: string; valor: string; acento?: boolean }[]
    documentosTitulo: string
    documentos: DocumentoExpediente[]
    adicionales: string
  }
  auditoria: {
    titulo: string
    texto: string
  }
}

export const acuerdosLegales: AcuerdosLegales = {
  dictamen: {
    titulo: 'Dictamen de Acreditación y Ajustes Razonables',
    subtitulo: 'Marco jurídico: Artículo 41 Ley General de Educación',
    chip: 'Vigente 2024-2025',
    cajaTitulo: 'Declaratoria Oficial Institucional',
    parrafo: [
      { texto: 'En estricto cumplimiento al ' },
      { texto: 'Artículo 41 de la Ley General de Educación', negrita: true },
      {
        texto:
          ' y las normas específicas de control escolar de la Educación Básica y Secundaria, el Servicio de Educación Especial (SEE) de la zona determina la ',
      },
      { texto: 'Idoneidad Plena y Obligatoriedad', negrita: true },
      { texto: ' del Plan de Ajustes Razonables (DUA) formulado para el alumno ' },
      { texto: 'Mateo Gómez Morales', negrita: true },
      {
        texto:
          '. Este dictamen certifica que los apoyos metodológicos, temporales, de evaluación diversificada y uso de pases de autorregulación no constituyen dispensa curricular sino garantías equitativas de permanencia, aprendizaje y acreditación académica formal.',
      },
    ],
    cajas: [
      {
        id: 'acreditacion',
        etiqueta: 'Estatus de acreditación',
        valor: 'Aprobatoria DUA',
        detalle: 'Evaluación flexible ponderada',
        icono: 'shield-check',
      },
      {
        id: 'temporal',
        etiqueta: 'Adecuación temporal',
        valor: '+50% Tiempo',
        detalle: 'En pruebas escritas y proyectos',
        icono: 'clock',
      },
      {
        id: 'entorno',
        etiqueta: 'Entorno sensorial',
        valor: 'Espacio Seguro',
        detalle: 'Pase de descompresión activo',
        icono: 'headphones',
        acento: true,
      },
    ],
  },
  compromisos: {
    titulo: 'Cuadro de Compromisos y Responsabilidades Tripartitas',
    subtitulo:
      'Articulación vinculante entre el plantel, el hogar y la unidad de apoyo psicológico',
    partes: [
      {
        id: 'escuela',
        parte: 'Escuela y Colegiado',
        tono: 'azul',
        icono: 'users',
        items: [
          'Aplicar pautas DUA e indicaciones visuales en todas las materias.',
          'Admitir el pase sensorial de salida inmediata a zona de calma sin sanción.',
          'Diversificar instrumentos evaluativos (rúbricas adaptadas).',
        ],
        chip: 'Docentes Notificados (8/8)',
      },
      {
        id: 'familia',
        parte: 'Familia / Tutor Legal',
        tono: 'cafe',
        icono: 'heart',
        items: [
          'Asistencia obligatoria a las sesiones de seguimiento quincenal.',
          'Refrendar valoración neuropediátrica semestral ante el SEE.',
          'Garantizar kit personal de audífonos atenuadores en mochila.',
        ],
        chip: 'Sr. Roberto Morales (Tutor)',
      },
      {
        id: 'especialista',
        parte: 'Especialista SEE',
        tono: 'menta',
        icono: 'briefcase-medical',
        items: [
          'Monitoreo quincenal del diario de conducta y bienestar en aula.',
          'Revisión y ajuste trimestral de metas PEI con los docentes.',
          'Acompañamiento en simulacros y eventos masivos escolares.',
        ],
        chip: 'Dra. Claudia Méndez',
      },
    ],
  },
  firmas: {
    titulo: 'Firmas Digitales y Endosos Oficiales',
    subtitulo: 'Certificación electrónica bajo estándar NOM-151 y Cédula SEP',
  },
  validacion: {
    titulo: 'Validación Cifrada e Inspección SEP / SEE',
    subtitulo: 'Consulta pública para supervisión de zona escolar',
    leyenda: 'Registro inmutable sincronizado con el servidor central de la SEP',
    accion: 'Copiar Hash SHA',
  },
  metas: [
    {
      id: 'autorregulacion',
      titulo: 'Autorregulación Sensorial',
      porcentaje: 85,
      descripcion: 'Uso preventivo de audífonos y solicitud autónoma de pase.',
    },
    {
      id: 'proyectos',
      titulo: 'Entrega de Proyectos DUA',
      porcentaje: 70,
      descripcion: 'Presentación de esquemas gráficos en lugar de exámenes memorísticos.',
    },
    {
      id: 'equipos',
      titulo: 'Interacción en Equipos Reducidos',
      porcentaje: 50,
      descripcion: 'Participación colaborativa en díadas asignadas por el tutor.',
    },
  ],
  resumen: {
    titulo: 'Resumen de Expediente',
    filas: [
      { id: 'diagnostico', etiqueta: 'Diagnóstico Base', valor: 'TEA Nivel 1 (DSM-5 / CIE-11)' },
      { id: 'apertura', etiqueta: 'Fecha Apertura', valor: '26 Agosto 2024' },
      { id: 'anexos', etiqueta: 'Documentos Anexos', valor: '15/15 Completados' },
      {
        id: 'revision',
        etiqueta: 'Próxima Revisión SEE',
        valor: '15 Diciembre 2024',
        acento: true,
      },
    ],
    documentosTitulo: 'Documentos del expediente',
    documentos: [
      { id: '01', nombre: 'Ficha Psicopedagógica Integral' },
      { id: '02', nombre: 'Diagnóstico Clínico Neuropediátrico' },
      { id: '03', nombre: 'Plan Ajustes Razonables Aula (DUA)' },
      { id: '04', nombre: 'Protocolo Prevención Desregulación' },
      { id: '05', nombre: 'Dictamen y Firmas Art. 41 LGE (Actual)', actual: true },
    ],
    adicionales: '+ 10 documentos adicionales foliados',
  },
  auditoria: {
    titulo: 'Aviso de Auditoría SEE',
    texto:
      'Este expediente fue refrendado con firma biométrica. Las modificaciones posteriores generarán un nuevo folio y requerirán aprobación colegiada.',
  },
}

export const folioExpedienteLegal = 'EXP-SEE-2024-084-BC'
