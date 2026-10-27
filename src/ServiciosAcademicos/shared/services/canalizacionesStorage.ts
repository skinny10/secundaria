import {
  CANALIZACIONES_ACTUALIZADAS_EVENT,
  CANALIZACIONES_SERVICIOS_STORAGE_KEY,
} from '../../../Portal/shared/constants/canalizaciones'
import { roles } from '../../../Portal/shared/constants/roles'
import type { Estudiante } from '../../PadronGeneral/types'

export interface CanalizacionServicios {
  id: string
  matricula: string
  marcaTemporal: string
  nombre: string
  apellidos: string
  grado: string
  grupo: string
  turno: string
  origen: 'SERVICIOS ACADÉMICOS'
  emisor: string
  asignatura: string
  estado: 'PENDIENTE'
  folio: string
  fechaEmision: string
  afectaDesempeno: null
  descripcion: string
  plan: string[]
}

function esCanalizacion(valor: unknown): valor is CanalizacionServicios {
  if (!valor || typeof valor !== 'object') return false
  const registro = valor as Partial<CanalizacionServicios>
  return (
    typeof registro.id === 'string' &&
    typeof registro.matricula === 'string' &&
    typeof registro.nombre === 'string' &&
    typeof registro.apellidos === 'string' &&
    registro.origen === 'SERVICIOS ACADÉMICOS'
  )
}

export function leerCanalizacionesServicios(): CanalizacionServicios[] {
  try {
    const raw = window.localStorage.getItem(CANALIZACIONES_SERVICIOS_STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(esCanalizacion) : []
  } catch {
    return []
  }
}

export function crearCanalizacionServicios(
  estudiante: Estudiante,
  motivo: string,
  notas: string
): CanalizacionServicios {
  const ahora = new Date()
  const marcaTemporal = ahora.toLocaleString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  const fechaEmision = ahora.toLocaleString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
  const usuario = roles.servicios_academicos.user.name
  const matriculaCorta = estudiante.matricula.replace(/\D/g, '').slice(-4)
  const folio = `SA-2024-${matriculaCorta}-${String(ahora.getTime()).slice(-4)}`

  return {
    id: `sae-${ahora.getTime()}`,
    matricula: estudiante.matricula,
    marcaTemporal,
    nombre: estudiante.nombre,
    apellidos: estudiante.apellidos,
    grado: estudiante.grado,
    grupo: estudiante.grupo,
    turno: estudiante.turno,
    origen: 'SERVICIOS ACADÉMICOS',
    emisor: usuario,
    asignatura: 'Servicios Escolares y Admisión',
    estado: 'PENDIENTE',
    folio,
    fechaEmision,
    afectaDesempeno: null,
    descripcion: `Motivo: ${motivo}. ${notas}`,
    plan: [
      'Valoración inicial por el equipo de Psicología y SEE',
      'Confirmar documentación administrativa del expediente',
    ],
  }
}

export function guardarCanalizacionServicios(registro: CanalizacionServicios): void {
  const previas = leerCanalizacionesServicios()
  window.localStorage.setItem(
    CANALIZACIONES_SERVICIOS_STORAGE_KEY,
    JSON.stringify([registro, ...previas])
  )
  window.dispatchEvent(new CustomEvent(CANALIZACIONES_ACTUALIZADAS_EVENT))
}
