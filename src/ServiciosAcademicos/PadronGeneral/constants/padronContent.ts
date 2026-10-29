import { escuela } from '../../../Portal/shared/constants/escuela'
import type { IconName } from '../../../utils/types'
import type {
  AccionEstudiante,
  ConfiguracionAtencion,
  ConfiguracionBloque,
  ConfiguracionEstatus,
  AtencionSEE,
  EstatusExpediente,
  KpiPadron,
  OpcionFiltro,
  TipoBloque,
} from '../types'

export const cicloActivo = `CICLO ACTIVO ${escuela.ciclo.replace('-', '–')}`

export const encabezadoPadron = {
  eyebrow: cicloActivo,
  titulo: 'Padrón Oficial de Estudiantes y Admisión',
  descripcion:
    'Directorio institucional auditado con protocolo visual adaptado para personal directivo y de apoyo académico.',
  icono: 'graduation-cap' as IconName,
  ariaIcono: 'Birrete institucional',
  ariaFiltrarPendientes: 'Filtrar padrón por pendientes de cotejo',
}

export const kpisPadron: KpiPadron[] = [
  {
    id: 'total',
    etiqueta: 'Total Alumnos',
    icon: 'users',
    tono: 'gris',
    valor: 0,
  },
  {
    id: 'nee',
    etiqueta: 'En Atención SEE / NEE',
    icon: 'brain',
    tono: 'azul',
    valor: 0,
  },
  {
    id: 'pendientes',
    etiqueta: 'Pendientes Cotejo',
    icon: 'alert-triangle',
    tono: 'rosa',
    valor: 0,
  },
]

export const busquedaPadron = {
  etiqueta: 'BÚSQUEDA RÁPIDA EN EXPEDIENTES',
  placeholder: 'Escriba Nombre, Apellidos, Matrícula o CURP…',
  ariaLabel: 'Buscar estudiante por nombre, apellidos, matrícula o CURP',
  botonAlta: 'Registrar Nuevo Alumno',
  botonAltaAria: 'Registrar nuevo alumno en Alta de Estudiante',
  iconoBusqueda: 'search' as IconName,
  iconoAlta: 'plus-circle' as IconName,
}

export const filtrosPadron = {
  gradoLabel: 'Grado y Grupo:',
  gradoTodos: 'Todos los Grados (1°, 2°, 3°)',
  estatusLabel: 'Estatus SEE / NEE:',
  estatusTodos: 'Todos los Estatus',
  sincronizacion: 'Cotejo Sincronizado con Plataforma Estatal SEE',
  iconoSincronizacion: 'shield-check' as IconName,
}

export const opcionesEstatus: OpcionFiltro[] = [
  { value: '', label: filtrosPadron.estatusTodos },
  { value: 'completo', label: 'Expediente completo' },
  { value: 'cotejo_pendiente', label: 'Cotejo pendiente' },
  { value: 'validado', label: 'Expediente validado' },
  { value: 'en_atencion', label: 'En Atención SEE' },
  { value: 'usaer', label: 'USAER Especializado' },
  { value: 'dua', label: 'Perfil DUA Activo' },
]

export const configuracionEstatus: Record<EstatusExpediente, ConfiguracionEstatus> = {
  completo: { icon: 'circle-check', tono: 'menta' },
  cotejo_pendiente: { icon: 'alert-triangle', tono: 'rosa' },
  validado: { icon: 'shield-check', tono: 'bosque' },
}

export const configuracionAtencion: Record<
  Exclude<AtencionSEE, 'ninguna'>,
  ConfiguracionAtencion
> = {
  en_atencion: {
    etiqueta: 'En Atención SEE',
    icon: 'heart',
    tono: 'azul',
  },
  usaer: {
    etiqueta: 'USAER Especializado',
    icon: 'briefcase-medical',
    tono: 'azul',
  },
  dua: {
    etiqueta: 'Perfil DUA Activo',
    icon: 'book-open',
    tono: 'azul',
  },
}

export const configuracionBloque: Record<TipoBloque, ConfiguracionBloque> = {
  adecuaciones: {
    icon: 'sliders',
    tono: 'menta',
    chipTono: 'gris',
    chipIcon: 'clock',
  },
  urgente: {
    icon: 'alert-triangle',
    tono: 'rosa',
    chipTono: 'rosa',
    chipIcon: 'calendar',
  },
  protocolo: {
    icon: 'book-open',
    tono: 'azul',
    chipTono: 'gris',
    chipIcon: 'circle-check',
  },
}

export const accionesPorEstatus: Record<EstatusExpediente, AccionEstudiante[]> = {
  completo: [
    {
      id: 'ver-expediente',
      etiqueta: 'Ver Expediente',
      icon: 'file-text',
      tono: 'neutral',
      tipo: 'navegar',
      destino: 'expediente',
    },
    {
      id: 'cotejo-documental',
      etiqueta: 'Cotejo Documental',
      icon: 'clipboard-check',
      tono: 'neutral',
      tipo: 'navegar',
      destino: 'cotejo',
    },
    {
      id: 'transferir-see',
      etiqueta: 'Transferir a SEE',
      icon: 'share',
      tono: 'forest',
      tipo: 'navegar',
      destino: 'transferencias',
    },
  ],
  cotejo_pendiente: [
    {
      id: 'ficha-escolar',
      etiqueta: 'Ficha Escolar',
      icon: 'id-card',
      tono: 'neutral',
      tipo: 'navegar',
      destino: 'ficha',
    },
    {
      id: 'validar-documentos',
      etiqueta: 'Validar Documentos',
      icon: 'check',
      tono: 'coffee',
      tipo: 'navegar',
      destino: 'cotejo',
    },
  ],
  validado: [
    {
      id: 'ver-expediente',
      etiqueta: 'Ver Expediente',
      icon: 'file-text',
      tono: 'neutral',
      tipo: 'navegar',
      destino: 'expediente',
    },
    {
      id: 'actualizar-datos',
      etiqueta: 'Actualizar Datos',
      icon: 'pen',
      tono: 'slate',
      tipo: 'navegar',
      destino: 'alta',
    },
  ],
}

export const textosLista = {
  ariaLista: 'Listado de estudiantes del padrón general',
  cargando: 'Cargando padrón oficial de estudiantes…',
  esqueletoAria: 'Cargando estudiantes',
  errorTitulo: 'No fue posible consultar el padrón',
  errorTexto:
    'La conexión con la Plataforma Estatal SEE no respondió. Intente nuevamente para recuperar el directorio auditado.',
  errorBoton: 'Reintentar consulta',
  vacioTitulo: 'Sin resultados en el padrón',
  vacioTexto:
    'No se encontraron estudiantes con la búsqueda y los filtros seleccionados. Ajuste los criterios o restablezca la consulta.',
  vacioBoton: 'Limpiar filtros',
  fotoAlt: (nombre: string) => `Fotografía de ${nombre}`,
  matricula: (matricula: string) => `MATRÍCULA: ${matricula}`,
  curp: (curp: string) => `CURP: ${curp}`,
  tutor: (nombre: string, parentesco: string) => `Tutor: ${nombre} (${parentesco})`,
  edad: (edad: number) => `${edad} Años cumplidos`,
  gradoGrupo: (grado: string, grupo: string, turno: string) =>
    `${grado} ${grupo} ${turno}`,
  documentacion: {
    completo: (validados: number, total: number) =>
      `Expediente Completo (${validados}/${total} docs)`,
    cotejo_pendiente: (pendientes: number) =>
      `Cotejo Pendiente (${pendientes} docs por validar)`,
    validado: 'Expediente Validado',
  },
  ariaFoto: (nombre: string) => `Avatar con iniciales de ${nombre}`,
}

export const paginacionPadron = {
  aria: 'Paginación del padrón general',
  infoIcon: 'info' as IconName,
  anterior: '‹ Anterior',
  siguiente: 'Siguiente ›',
  resumen: 'Mostrando registros',
  al: 'al',
  dePadron: 'de un padrón general de',
  estudiantes: 'estudiantes',
  deCoincidencias: 'de',
  coincidencias: 'coincidencias',
  pagina: 'Página',
  paginaDe: 'de',
  tamanoPagina: 30,
  ariaAnterior: 'Ir a la página anterior del padrón',
  ariaSiguiente: 'Ir a la página siguiente del padrón',
}

export const dialogoTransferencia = {
  titulo: 'Transferir estudiante a SEE',
  descripcion:
    'La canalización será visible para el departamento de Psicología y SEE. No se comparte contenido clínico desde Servicios Académicos.',
  motivoLabel: 'Motivo de la canalización',
  motivoPlaceholder: 'Seleccione un motivo institucional',
  motivos: [
    'Valoración psicopedagógica inicial',
    'Seguimiento de atención SEE / NEE',
    'Adecuaciones curriculares y DUA',
    'Actualización de expediente administrativo',
  ],
  notasLabel: 'Notas administrativas para el equipo SEE',
  notasPlaceholder: 'Describa brevemente la situación administrativa detectada…',
  cancelar: 'Cancelar',
  confirmar: 'Confirmar transferencia',
  ariaCerrar: 'Cerrar diálogo de transferencia',
  ariaCerrarAviso: 'Cerrar aviso de transferencia',
  errorMotivo: 'Seleccione un motivo para continuar.',
  errorNotas: 'Agregue una nota administrativa breve para el equipo SEE.',
  confirmacion: 'Canalización creada y visible en el Registro de Canalizaciones de Psicología.',
}

export const opcionesAlumno = {
  ariaAvatar: 'Avatar del estudiante',
}

export const etiquetasAcciones = {
  transferido: 'Transferido a SEE',
  abrirExpediente: 'Abrir expediente administrativo del estudiante',
}
