import type { IconName } from '../../../utils/types'
import type { SidebarKey } from '../../../Portal/shared/types'
import type { ModuloServicios } from './rutas'

export interface ModuloProximamenteConfig {
  modulo: ModuloServicios
  activeKey: SidebarKey
  vista: string
  icon: IconName
  titulo: string
  descripcion: string
  detalleAlumno?: string
}

export const modulosProximamente: Record<ModuloServicios, ModuloProximamenteConfig> = {
  padron: {
    modulo: 'padron',
    activeKey: 'padron',
    vista: 'PADRÓN GENERAL DE ESTUDIANTES',
    icon: 'users',
    titulo: 'Padrón General',
    descripcion: 'Módulo principal disponible.',
  },
  alta: {
    modulo: 'alta',
    activeKey: 'alta',
    vista: 'ALTA DE ESTUDIANTE',
    icon: 'plus-circle',
    titulo: 'Alta de Estudiante',
    descripcion:
      'El formulario de inscripción y actualización de datos administrativos se encuentra en preparación.',
    detalleAlumno: 'Datos administrativos del alumno seleccionado',
  },
  cotejo: {
    modulo: 'cotejo',
    activeKey: 'cotejo',
    vista: 'COTEJO Y DOCUMENTACIÓN',
    icon: 'clipboard-check',
    titulo: 'Cotejo y Documentación',
    descripcion:
      'La revisión documental y la validación de los 15 documentos oficiales estarán disponibles en este módulo.',
    detalleAlumno: 'Expediente administrativo del alumno seleccionado',
  },
  transferencias: {
    modulo: 'transferencias',
    activeKey: 'transferencias',
    vista: 'TRANSFERENCIAS SEE',
    icon: 'share',
    titulo: 'Transferencias SEE',
    descripcion:
      'El historial y seguimiento de canalizaciones enviadas al equipo de Psicología y SEE se encuentra en preparación.',
    detalleAlumno: 'Canalización administrativa del alumno seleccionado',
  },
  estadisticas: {
    modulo: 'estadisticas',
    activeKey: 'estadisticas',
    vista: 'ESTADÍSTICAS ESCOLARES',
    icon: 'trending-up',
    titulo: 'Estadísticas Escolares',
    descripcion:
      'Los indicadores de admisión, documentación y atención SEE se integrarán en este módulo institucional.',
  },
  expediente: {
    modulo: 'expediente',
    activeKey: 'padron',
    vista: 'EXPEDIENTE ADMINISTRATIVO',
    icon: 'folder',
    titulo: 'Expediente administrativo',
    descripcion:
      'La consulta administrativa del expediente está en preparación. Este rol no accede al contenido clínico del expediente de Psicología.',
    detalleAlumno: 'Consulta solicitada para el alumno',
  },
  ficha: {
    modulo: 'ficha',
    activeKey: 'padron',
    vista: 'FICHA ESCOLAR',
    icon: 'id-card',
    titulo: 'Ficha Escolar',
    descripcion:
      'La ficha escolar administrativa se encuentra en preparación y conservará la protección de datos de los menores.',
    detalleAlumno: 'Ficha solicitada para el alumno',
  },
}

export const textosModulo = {
  chip: 'Próximamente',
  encabezado: 'Módulo en preparación',
  volver: 'Volver a Padrón General',
  aviso:
    'Los datos mostrados en esta vista son administrativos. El acceso al contenido clínico está restringido al rol de Psicología y SEE.',
  aria: 'Módulo en preparación',
}
