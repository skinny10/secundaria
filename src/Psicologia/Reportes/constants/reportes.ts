import type { FolioEmitido, GeneradorFormato } from '../types'

export const generadores: GeneradorFormato[] = [
  {
    id: 'concentrado',
    ciclo: '2024-2025',
    etiqueta: 'Formato Estatal Chiapas · DPP-SEE',
    chip: 'Obligatorio Ene/Jul',
    icono: 'calculator',
    iconoTono: 'menta',
    titulo: 'Concentrado Semestral Oficial SEE',
    descripcion:
      'Padrón consolidado de estudiantes con barreras para el aprendizaje (BAP), desglose estadístico por condición clínica y validación de vigencia en cobertura médica.',
    tipo: 'concentrado',
  },
  {
    id: 'oficio',
    ciclo: '2024-2025',
    etiqueta: 'Vinculación Hospitalaria y Social',
    chip: 'Interinstitucional',
    icono: 'mail',
    iconoTono: 'sky',
    titulo: 'Oficio de Canalización Externa',
    descripcion:
      'Remisión formal con validez jurídica para Neuropediatría, DIF Municipal, Hospital de Salud Mental o Centros de Atención Múltiple (CAM/USAER).',
    tipo: 'oficio',
  },
  {
    id: 'carta',
    ciclo: '2024-2025',
    etiqueta: 'Marco Jurídico · Art. 76 LGDNNA',
    chip: 'Firma Autógrafa',
    icono: 'file-signature',
    iconoTono: 'peach',
    titulo: 'Carta Compromiso y Minuta DUA / PEI',
    descripcion:
      'Instrumento tutelado donde padres o tutores legales consienten adaptaciones curriculares, uso de pases sensoriales y corresponsabilidad en el seguimiento clínico escolar.',
    tipo: 'carta',
  },
  {
    id: 'ficha',
    ciclo: '2024-2025',
    etiqueta: 'Uso Docente sin Datos Clínicos',
    chip: '8 Materias',
    icono: 'id-card',
    iconoTono: 'neutral',
    titulo: 'Ficha Resumen DUA para Colegiado',
    descripcion:
      'Tarjetón ejecutivo por estudiante para entrega a los 8 docentes de asignatura. Sintetiza adaptaciones de aula, tiempos extra y detonantes sin divulgar historial médico sensible.',
    tipo: 'ficha',
  },
]

export const foliosIniciales: FolioEmitido[] = [
  {
    folio: 'SEE-2024-F104',
    ciclo: '2024-2025',
    fecha: '18 Octubre 2024',
    estudiante: 'Mateo Gómez Morales',
    detalle: '3° Semestre B · Exp #0412',
    tramite: 'Canalización Neuropediatría',
    tipo: 'oficio',
    estatus: 'Firmado Psicología y Dirección',
    tono: 'menta',
    accion: 'PDF Firmado',
    accionIcono: 'file-text',
    grupo: '3B',
  },
  {
    folio: 'SEE-2024-F103',
    ciclo: '2024-2025',
    fecha: '16 Octubre 2024',
    estudiante: 'Valeria Ramos Estrada',
    detalle: '1° Semestre A · Exp #0533',
    tramite: 'Carta Compromiso Tutores DUA',
    tipo: 'carta',
    estatus: 'Pendiente Firma de Tutor',
    tono: 'gris',
    accion: 'Formato Blanco',
    accionIcono: 'printer',
    grupo: '1A',
  },
  {
    folio: 'SEE-2024-F102',
    ciclo: '2024-2025',
    fecha: '12 Octubre 2024',
    estudiante: 'Padrón Institucional 2024-B',
    detalle: 'Plantel Completo, 48 alumnos',
    tramite: 'Concentrado Semestral SEE',
    tipo: 'concentrado',
    estatus: 'Sello Supervisión Zona 014',
    tono: 'azul',
    accion: 'Paquete Sellado',
    accionIcono: 'package',
    grupo: 'institucional',
  },
  {
    folio: 'SEE-2024-F101',
    ciclo: '2024-2025',
    fecha: '08 Octubre 2024',
    estudiante: 'Emiliano Santos Ruiz',
    detalle: '5° Semestre B · Exp #0299',
    tramite: 'Canalización DIF / Psicología',
    tipo: 'oficio',
    estatus: 'Firmado Psicología y Dirección',
    tono: 'menta',
    accion: 'PDF Firmado',
    accionIcono: 'file-text',
    grupo: '5B',
  },
]

export const grupos = [
  { id: 'todos', label: 'Todos los grupos' },
  { id: '1A', label: '1° Semestre A' },
  { id: '3B', label: '3° Semestre B' },
  { id: '5B', label: '5° Semestre B' },
  { id: 'institucional', label: 'Institucional / Plantel' },
] as const

export const tiposDocumento = [
  { id: 'todos', label: 'Todos los formatos normativos' },
  { id: 'concentrado', label: 'Concentrado semestral SEE' },
  { id: 'oficio', label: 'Oficio de canalización externa' },
  { id: 'carta', label: 'Carta compromiso / minuta DUA' },
  { id: 'ficha', label: 'Ficha resumen DUA' },
] as const
