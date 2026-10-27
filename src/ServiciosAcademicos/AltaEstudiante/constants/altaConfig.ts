import { escuela } from '../../../Portal/shared/constants/escuela'
import type { IconName } from '../../../utils/types'
import type {
  CondicionCatalogo,
  DocumentoAlta,
  DocumentoCatalogo,
  EspecialistaSEE,
  GrupoAlta,
  InstitucionSalud,
  OpcionCatalogo,
  TurnoAlta,
} from '../types'

export const anioCiclo = Number(escuela.ciclo.split('-')[0])

export const altaConfig = {
  ciclo: escuela.ciclo,
  cicloEtiqueta: `Ciclo ${escuela.ciclo}`,
  anioCiclo,
  fechaReferenciaEdad: `${anioCiclo}-12-31`,
  edadMinima: 11,
  edadMaxima: 16,
  diasPlazoDocumento: 15,
  maxAlergias: 500,
  autoguardadoMs: 30_000,
  matriculaInicial: 881,
  pasos: [
    {
      id: 1,
      label: 'Identificación',
      titulo: 'Identificación y Datos Personales',
    },
    {
      id: 2,
      label: 'Familia y Salud',
      titulo: 'Contacto Familiar y Salud',
    },
    {
      id: 3,
      label: 'Diagnóstico y Asignación',
      titulo: 'Diagnóstico y Asignación',
    },
  ],
} as const

export const grados: OpcionCatalogo[] = [
  { value: '1°', label: '1° Grado' },
  { value: '2°', label: '2° Grado' },
  { value: '3°', label: '3° Grado' },
]

export const grupos: GrupoAlta[] = [
  { value: '1°|A', label: '1° Grado - Grupo A', grado: '1°', grupo: 'A' },
  { value: '1°|B', label: '1° Grado - Grupo B', grado: '1°', grupo: 'B' },
  { value: '1°|K', label: '1° Grado - Grupo K', grado: '1°', grupo: 'K' },
  { value: '2°|A', label: '2° Grado - Grupo A', grado: '2°', grupo: 'A' },
  { value: '2°|B', label: '2° Grado - Grupo B', grado: '2°', grupo: 'B' },
  { value: '2°|K', label: '2° Grado - Grupo K', grado: '2°', grupo: 'K' },
  { value: '3°|A', label: '3° Grado - Grupo A', grado: '3°', grupo: 'A' },
  { value: '3°|B', label: '3° Grado - Grupo B', grado: '3°', grupo: 'B' },
  { value: '3°|K', label: '3° Grado - Grupo K', grado: '3°', grupo: 'K' },
]

export const turnos: TurnoAlta[] = [
  { value: 'Matutino', label: 'Turno Matutino', horario: '07:30 a 13:40 h' },
  { value: 'Vespertino', label: 'Turno Vespertino', horario: '14:00 a 19:10 h' },
]

export const sexos: OpcionCatalogo[] = [
  { value: 'hombre', label: 'Hombre' },
  { value: 'mujer', label: 'Mujer' },
  { value: 'otro', label: 'Otro / No binario' },
]

export const parentescos: OpcionCatalogo[] = [
  { value: 'madre', label: 'Madre / Tutora Legal' },
  { value: 'padre', label: 'Padre / Tutor Legal' },
  { value: 'abuelo', label: 'Abuelo(a)' },
  { value: 'tio', label: 'Tío(a)' },
  { value: 'judicial', label: 'Tutor por resolución judicial' },
  { value: 'otro', label: 'Otro' },
]

export const institucionesSalud: InstitucionSalud[] = [
  {
    value: 'imss',
    label: 'IMSS — Régimen Ordinario / Bienestar',
    descripcion: 'Atención médica familiar y urgencias institucionales.',
    icono: 'briefcase-medical',
  },
  {
    value: 'issste',
    label: 'ISSSTE — Trabajadores del Estado',
    descripcion: 'Cobertura para derechohabientes y familiares.',
    icono: 'shield-check',
  },
  {
    value: 'isstech',
    label: 'ISSTECH — Servicio Estatal Chiapas',
    descripcion: 'Atención estatal para trabajadores del sector.',
    icono: 'id-card',
  },
  {
    value: 'privado',
    label: 'Privado — Gastos Médicos Mayores',
    descripcion: 'Póliza vigente con cobertura hospitalaria.',
    icono: 'heart',
  },
  {
    value: 'ninguno',
    label: 'Ninguno — Atención en Hospital Civil',
    descripcion: 'Sin afiliación; atención en unidad pública.',
    icono: 'folder',
  },
]

export const condiciones: CondicionCatalogo[] = [
  {
    value: 'tea-n1',
    label: 'TEA (Trastorno del Espectro Autista - Nivel 1)',
    descripcion: 'Apoyos de comunicación, anticipación y regulación sensorial.',
  },
  {
    value: 'tdah',
    label: 'TDAH (Déficit de Atención e Hiperactividad)',
    descripcion: 'Ajustes de organización, tiempos y autorregulación.',
  },
  {
    value: 'dislexia',
    label: 'Dislexia',
    descripcion: 'Apoyos de lectura, escritura y evaluación.',
  },
  {
    value: 'discapacidad-auditiva',
    label: 'Discapacidad auditiva',
    descripcion: 'Apoyos visuales, acústicos y de comunicación.',
  },
  {
    value: 'discapacidad-visual',
    label: 'Discapacidad visual',
    descripcion: 'Materiales accesibles y orientación espacial.',
  },
  {
    value: 'discapacidad-motriz',
    label: 'Discapacidad motriz',
    descripcion: 'Ajustes de movilidad, mobiliario y acceso.',
  },
  {
    value: 'otra',
    label: 'Otra condición reportada por especialista',
    descripcion: 'El equipo SEE completará la valoración inicial.',
  },
  {
    value: 'evaluacion',
    label: 'En evaluación',
    descripcion: 'Sin dictamen definitivo; canalización inicial solicitada.',
  },
]

export const especialistasSEE: EspecialistaSEE[] = [
  {
    value: 'claudia-mendez',
    label: 'Dra. Claudia Méndez - Gabinete SEE',
    especialidad: 'Especialista en Neurodiversidad',
  },
  {
    value: 'norberto-vazquez',
    label: 'Dr. Norberto Vázquez López',
    especialidad: 'Neuropediatría',
  },
  {
    value: 'lucia-hernandez',
    label: 'Mtra. Lucía Hernández',
    especialidad: 'Psicopedagogía y DUA',
  },
  {
    value: 'sergio-torres',
    label: 'Lic. Sergio Torres',
    especialidad: 'Trabajo Social y enlace familiar',
  },
]

export const documentosIngreso: DocumentoCatalogo[] = [
  {
    id: 'acta',
    nombre: 'Acta de Nacimiento (Original y Copia cotejada)',
    chip: 'RECIBIDO',
    chipTono: 'menta',
    requisitoMinimo: true,
  },
  {
    id: 'curp',
    nombre: 'CURP Certificada actualizada',
    chip: 'VALIDADO RENAPO',
    chipTono: 'azul',
    requisitoMinimo: true,
  },
  {
    id: 'certificado',
    nombre: 'Certificado de Primaria / Boleta anterior',
    chip: 'CON CALIFICACIONES',
    chipTono: 'gris',
    requisitoMinimo: false,
  },
  {
    id: 'dictamen',
    nombre: 'Dictamen Médico o Psicológico externo',
    chip: 'SELLADO',
    chipTono: 'menta',
    requisitoMinimo: false,
  },
  {
    id: 'cartilla',
    nombre: 'Cartilla Nacional de Salud (Pendiente entrega en 15 días)',
    chip: 'PLAZO ACTIVO',
    chipTono: 'durazno',
    requisitoMinimo: false,
  },
]

export const entidadesCurp: Record<string, string> = {
  AS: 'Aguascalientes',
  BC: 'Baja California',
  BS: 'Baja California Sur',
  CC: 'Campeche',
  CL: 'Coahuila',
  CM: 'Colima',
  CS: 'Chiapas',
  CH: 'Chihuahua',
  DF: 'Ciudad de México',
  DG: 'Durango',
  GT: 'Guanajuato',
  GR: 'Guerrero',
  HG: 'Hidalgo',
  JC: 'Jalisco',
  MC: 'Estado de México',
  MN: 'Michoacán',
  MS: 'Morelos',
  NT: 'Nayarit',
  NL: 'Nuevo León',
  OC: 'Oaxaca',
  PL: 'Puebla',
  QT: 'Querétaro',
  QR: 'Quintana Roo',
  SP: 'San Luis Potosí',
  SL: 'Sinaloa',
  SR: 'Sonora',
  TC: 'Tabasco',
  TS: 'Tamaulipas',
  TL: 'Tlaxcala',
  VZ: 'Veracruz',
  YN: 'Yucatán',
  ZS: 'Zacatecas',
  NE: 'Nacido en el extranjero',
}

export const meses = [
  { value: '01', label: 'Enero (01)' },
  { value: '02', label: 'Febrero (02)' },
  { value: '03', label: 'Marzo (03)' },
  { value: '04', label: 'Abril (04)' },
  { value: '05', label: 'Mayo (05)' },
  { value: '06', label: 'Junio (06)' },
  { value: '07', label: 'Julio (07)' },
  { value: '08', label: 'Agosto (08)' },
  { value: '09', label: 'Septiembre (09)' },
  { value: '10', label: 'Octubre (10)' },
  { value: '11', label: 'Noviembre (11)' },
  { value: '12', label: 'Diciembre (12)' },
]

export const sugerenciasPorPalabra: Array<{
  patrones: string[]
  sugerencia: string
  permiso: string
}> = [
  {
    patrones: ['ruido', 'auditiva', 'sonido', 'hiperacusia'],
    sugerencia: 'Auriculares atenuadores de sonido',
    permiso: 'Se habilitará permiso de uso de auriculares atenuadores de sonido en el Paso 3.',
  },
  {
    patrones: ['luz', 'visual', 'fluorescente'],
    sugerencia: 'Filtro visual para luz fluorescente',
    permiso: 'Se habilitará ubicación con filtro visual y control de luz en el Paso 3.',
  },
  {
    patrones: ['movimiento', 'inquieto', 'fidget', 'regulación'],
    sugerencia: 'Objeto regulador y pausas activas',
    permiso: 'Se habilitará permiso de objeto regulador y pausas activas en el Paso 3.',
  },
]

export const iconosAlta = {
  identidad: 'id-card' as IconName,
  asignacion: 'graduation-cap' as IconName,
  familia: 'users' as IconName,
  salud: 'briefcase-medical' as IconName,
  condicion: 'brain' as IconName,
  documentos: 'folder' as IconName,
  derivacion: 'handshake' as IconName,
  edad: 'calendar' as IconName,
  calendario: 'calendar' as IconName,
  candado: 'lock' as IconName,
  escudo: 'shield-check' as IconName,
  usuarioCheck: 'circle-check' as IconName,
  alerta: 'alert-triangle' as IconName,
  oreja: 'ear-off' as IconName,
  guardar: 'save' as IconName,
  continuar: 'arrow-right' as IconName,
  volver: 'arrow-left' as IconName,
  finalizar: 'user-cog' as IconName,
  telefono: 'phone' as IconName,
  correo: 'mail' as IconName,
  domicilio: 'map-pin' as IconName,
  clinica: 'briefcase-medical' as IconName,
  check: 'check' as IconName,
  documento: 'file-text' as IconName,
  especialista: 'person' as IconName,
  exito: 'circle-check' as IconName,
  imprimir: 'printer' as IconName,
  registrarOtro: 'plus-circle' as IconName,
  padron: 'users' as IconName,
} as const

export function crearDocumentosIniciales(): DocumentoAlta[] {
  return documentosIngreso.map((documento) => ({
    id: documento.id,
    nombre: documento.nombre,
    recibido: documento.id === 'acta' || documento.id === 'certificado' || documento.id === 'dictamen',
    estado:
      documento.id === 'cartilla'
        ? 'pendiente'
        : documento.id === 'curp'
          ? 'pendiente'
          : documento.id === 'acta'
            ? 'recibido'
            : 'validado',
    ...(documento.id === 'cartilla'
      ? { fechaLimite: sumarDias(fechaHoyLocal(), altaConfig.diasPlazoDocumento) }
      : {}),
  }))
}

export function fechaHoyLocal(): string {
  const hoy = new Date()
  const offset = hoy.getTimezoneOffset()
  return new Date(hoy.getTime() - offset * 60_000).toISOString().slice(0, 10)
}

function sumarDias(fechaIso: string, dias: number): string {
  const fecha = new Date(`${fechaIso}T12:00:00`)
  fecha.setDate(fecha.getDate() + dias)
  const offset = fecha.getTimezoneOffset()
  return new Date(fecha.getTime() - offset * 60_000).toISOString().slice(0, 10)
}
