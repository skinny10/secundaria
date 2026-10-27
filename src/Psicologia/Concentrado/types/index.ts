import type { IconName } from '../../../utils/types'

export type GradoGrupoFiltro = 'todos' | '1° K' | '1° H' | '1° B'
export type DiagnosticoFiltro = 'todos' | 'tea' | 'tdah' | 'auditiva'

export type CondicionClave = 'tea' | 'tdah' | 'auditiva'

export interface AlumnoConcentrado {
  id: string
  np: string
  nombre: string
  expediente: string
  curp: string
  edadSexo: string
  grado: string
  grupo: string
  gradoGrupo: string
  diagnosticoClave: CondicionClave
  diagnosticoLabel: string
  diagnosticoIcon: IconName
  diagnosticoTono: 'menta' | 'durazno' | 'azul'
  servicioMedico: string
  especialista: string
  especialistaIcon: IconName
}

export interface ResumenEstrategia {
  id: string
  titulo: string
  clave: CondicionClave
  chipLabel: string
  chipTono: 'menta' | 'durazno' | 'azul'
  descripcion: string
  barraColor: string
  total: number
}
