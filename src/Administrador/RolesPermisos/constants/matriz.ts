import type { IconName } from '../../../utils/types'

export interface ModuloPermiso {
  id: string
  nombre: string
  descripcion: string
  categoria: 'clinico' | 'operativo' | 'administrativo'
  icono: IconName
  chip?: string
}

export const modulos: ModuloPermiso[] = [
  {
    id: 'padrón',
    nombre: 'Consulta de Padrón y Datos Generales',
    descripcion: 'Acceso a nombres, matrículas, grupo, tutor legal y datos de contacto de emergencia.',
    categoria: 'operativo',
    icono: 'users',
  },
  {
    id: 'expediente-clinico',
    nombre: 'Acceso a Expediente Clínico Confidencial (15 Docs)',
    descripcion: 'Diagnósticos clínicos CIE-11, historia neurológica, peritajes externos y farmacoterapia activa.',
    categoria: 'clinico',
    icono: 'file-text',
    chip: 'LGDNNA',
  },
  {
    id: 'dictamen-dua',
    nombre: 'Emisión y Firma de Dictamen Oficial DUA',
    descripcion: 'Generación de ajustes curriculares razonables y validez para evaluaciones extraordinarias SEP.',
    categoria: 'clinico',
    icono: 'file-signature',
  },
  {
    id: 'bitacora-aula',
    nombre: 'Registro de Observación en Bitácora de Aula',
    descripcion: 'Registro diario de conducta, fatiga sensorial, periodos de atención y efectividad de apoyos.',
    categoria: 'operativo',
    icono: 'book-open',
  },
  {
    id: 'pases-qr',
    nombre: 'Validación y Escaneo de Pases Sensoriales QR',
    descripcion: 'Control de tránsito hacia salas multisensoriales o pausas activas autorizadas.',
    categoria: 'operativo',
    icono: 'qr-code',
  },
  {
    id: 'alta-cotejo',
    nombre: 'Alta de Alumnos y Cotejo de Documentos SEP',
    descripcion: 'Carga de CURP, acta de nacimiento, boletas previas y validación en Sistema Integral.',
    categoria: 'administrativo',
    icono: 'clipboard',
  },
  {
    id: 'cuentas',
    nombre: 'Creación y Desactivación de Cuentas Institucionales',
    descripcion: 'Alta de correos del dominio colegionorte.edu.mx y asignación de credenciales federadas.',
    categoria: 'administrativo',
    icono: 'plus-circle',
  },
  {
    id: 'concentrado-see',
    nombre: 'Exportación de Concentrado Semestral Oficial SEE',
    descripcion: 'Paquete de cumplimiento y estadísticas de avance inclusivo para auditorías de zona escolar.',
    categoria: 'administrativo',
    icono: 'download',
  },
]
