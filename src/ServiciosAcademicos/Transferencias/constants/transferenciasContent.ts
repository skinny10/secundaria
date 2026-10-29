import type { CondicionTransferencia, EspecialistaSEE, MotivoTransferencia, UrgenciaTransferencia } from '../types'

export const transferenciasContent = {
  banner: {
    rol: 'ROL: SERVICIOS ACADÉMICOS',
    vista: 'VISTA: TRANSFERENCIAS SEE',
    sistema: 'Sistema Oficial Estatal',
  },
  barraInformativa: {
    texto: 'PROTOCOLO OFICIAL SEE · ART. 41 LEY GENERAL DE EDUCACIÓN',
    chip: 'CÉDULA NORMATIVA 2024-B',
    icon: 'shield' as const,
  },
  migas: {
    padron: 'Padrón General',
    separador: '›',
    transferir: (nombre: string) => `${nombre} › Transferir a SEE`,
  },
  encabezado: {
    etiqueta: 'SERVICIOS ACADÉMICOS • DERIVACIÓN ESPECIALIZADA',
    titulo: 'Transferir Alumno a Gabinete de Psicología y SEE',
    icon: 'send' as const,
  },
  alumno: {
    etiqueta: 'EXPEDIENTE ALUMNO TITULAR',
    folioEtiqueta: 'FOLIO OFICIAL ÚNICO',
    copiar: 'Copiar folio',
    avisos: {
      activo: (folio: string) => `Ya existe una transferencia activa (${folio})`,
      ver: 'Ver en Transferencias',
    },
  },
  secciones: {
    1: {
      titulo: 'Motivo de Transferencia Inicial',
      ayuda: 'Seleccione una opción obligatoria',
    },
    2: {
      titulo: 'Diagnóstico / Condición Preliminar',
      ayuda: 'Conforme a Clasificación CIE-11 / DSM-5 escolar',
    },
    3: {
      titulo: 'Especialista o Gabinete Receptor',
      ayuda: 'Personal colegiado con cédula profesional activa',
    },
    4: {
      titulo: 'Nivel de Urgencia del Citatorio Inicial',
      ayuda: 'Seleccione una opción obligatoria',
    },
    5: {
      titulo: 'Notas y Recomendaciones para Psicología SEE',
      ayuda: 'Contexto adicional para el Gabinete. Evite datos clínicos innecesarios.',
      contador: (n: number) => `${n} / 500`,
    },
  },
  motivos: [
    {
      id: 'diagnostico_previo' as MotivoTransferencia,
      titulo: 'Ingreso con Diagnóstico Clínico Previo',
      descripcion: 'Presenta documentación médica avalada: TEA, TDAH, aptitudes sobresalientes o discapacidad.',
    },
    {
      id: 'dificultades_evaluacion' as MotivoTransferencia,
      titulo: 'Dificultades Detectadas en Evaluación Diagnóstica Inicial',
      descripcion: 'Barreras para el aprendizaje observadas directamente por el colegiado de profesores.',
    },
    {
      id: 'solicitud_padres' as MotivoTransferencia,
      titulo: 'Solicitud Formal de los Padres de Familia / Tutores',
      descripcion: 'Petición escrita formal mediante formato institucional de vinculación psicopedagógica.',
    },
  ],
  urgencias: [
    {
      id: 'ordinaria' as UrgenciaTransferencia,
      titulo: 'Ordinaria',
      descripcion: 'Próximos 15 días hábiles',
      icon: 'calendar' as const,
      barra: '#4A6075',
      plazoTexto: (fecha: string) => `Plazo: ${fecha}`,
    },
    {
      id: 'prioritaria' as UrgenciaTransferencia,
      titulo: 'Prioritaria',
      descripcion: 'Atención en 48 horas',
      icon: 'bell' as const,
      barra: '#7A4320',
      plazoTexto: () => 'Plazo: 48 horas',
    },
    {
      id: 'urgente' as UrgenciaTransferencia,
      titulo: 'Urgente',
      descripcion: 'Notificación inmediata',
      icon: 'alert-triangle' as const,
      barra: '#C62828',
      plazoTexto: () => 'Plazo: Inmediato',
    },
  ],
  acciones: {
    regresar: '↩ Regresar sin Cambios',
    confirmar: 'Confirmar Transferencia y Abrir Expediente SEE',
    revisar: 'Revisar',
    confirmarDialogo: 'Confirmar transferencia',
  },
  dialogo: {
    titulo: 'Confirmar Transferencia y Abrir Expediente SEE',
    texto: 'Se creará la transferencia, el expediente SEE y se actualizará el estatus del alumno.',
  },
  exito: {
    titulo: 'Transferencia creada correctamente',
    folio: 'Folio SEE',
    plazo: 'Plazo estimado',
    verPadron: 'Ver en Padrón General',
    imprimir: 'Imprimir constancia de transferencia',
  },
  errores: {
    motivo: 'Seleccione el motivo de transferencia',
    condicion: 'Seleccione la condición preliminar',
    especialista: 'Seleccione el especialista o gabinete receptor',
    urgencia: 'Seleccione el nivel de urgencia',
    observaciones: 'Debe corregir los campos obligatorios',
  },
  sinAlumno: {
    titulo: 'Sin alumno seleccionado',
    texto: 'Seleccione un alumno y use «Transferir a SEE» desde el Padrón General.',
    accion: 'Ir al Padrón General',
  },
  lateral: {
    titulo: 'Resumen de la Transferencia',
    alumno: 'Alumno',
    folio: 'Folio oficial',
    motivo: 'Motivo',
    condicion: 'Condición preliminar',
    especialista: 'Especialista receptor',
    urgencia: 'Urgencia',
    avisos: 'Avisos que se generarán',
  },
} as const

export const especialistasSEE: EspecialistaSEE[] = [
  {
    id: 'claudia-mendez',
    nombre: 'Dra. Claudia Méndez',
    especialidad: 'Psicología',
    turno: 'Vespertino',
    cedula: 'CED-PSI-45872',
  },
  {
    id: 'jorge-ramirez',
    nombre: 'Lic. Jorge Ramírez',
    especialidad: 'Psicopedagogía',
    turno: 'Matutino',
    cedula: 'CED-PSP-39214',
  },
  {
    id: 'ana-torres',
    nombre: 'Mtra. Ana Torres',
    especialidad: 'Trabajo Social SEE',
    turno: 'Matutino',
    cedula: 'CED-TS-28461',
  },
]

export const condicionesTransferencia: CondicionTransferencia[] = [
  { value: 'tea-n1', label: 'Trastorno del Espectro Autista - Nivel 1' },
  { value: 'tdah', label: 'TDAH (Déficit de Atención e Hiperactividad)' },
  { value: 'dislexia', label: 'Dislexia' },
  { value: 'discapacidad-auditiva', label: 'Discapacidad auditiva' },
  { value: 'discapacidad-visual', label: 'Discapacidad visual' },
  { value: 'discapacidad-motriz', label: 'Discapacidad motriz' },
  { value: 'en-evaluacion', label: 'En evaluación' },
  { value: 'otra', label: 'Otra condición reportada por especialista' },
]

export function generarFolioSEE(): string {
  const ahora = new Date()
  const year = ahora.getFullYear()
  const rand = Math.floor(100 + Math.random() * 900)
  return `SEE-${year}-${rand}`
}

export function calcularVenceEn(urgencia: UrgenciaTransferencia): string {
  const ahora = new Date()
  if (urgencia === 'urgente') {
    return ahora.toISOString()
  }
  if (urgencia === 'prioritaria') {
    const fecha = new Date(ahora.getTime() + 48 * 60 * 60 * 1000)
    return fecha.toISOString()
  }
  // ordinaria: 15 días hábiles aproximados
  const fecha = new Date(ahora.getTime())
  fecha.setDate(fecha.getDate() + 15)
  return fecha.toISOString()
}

export function formatearPlazo(urgencia: UrgenciaTransferencia): string {
  if (urgencia === 'urgente') return 'Inmediato'
  if (urgencia === 'prioritaria') return '48 horas'
  const ahora = new Date()
  const fecha = new Date(ahora.getTime())
  fecha.setDate(fecha.getDate() + 15)
  return fecha.toLocaleDateString('es-MX', { day: '2-digit', month: '2-digit', year: 'numeric' })
}
