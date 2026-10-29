import type { EventoAuditoria } from '../../BitacoraAuditoria/constants/eventos'
import { ACTOR_ADMIN, AUDIT_STORAGE_KEY } from '../constants/configInicial'

const EVENTO_AUDITORIA = 'nexusedu:auditoria-config'

const listeners = new Set<() => void>()

function leer(): EventoAuditoria[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(AUDIT_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as EventoAuditoria[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function persistir(eventos: EventoAuditoria[]) {
  window.localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(eventos))
  window.dispatchEvent(new CustomEvent(EVENTO_AUDITORIA))
  listeners.forEach((listener) => listener())
}

function hashAleatorio(): string {
  return Math.random().toString(16).slice(2, 10)
}

function dosDigitos(valor: number): string {
  return String(valor).padStart(2, '0')
}

function fechaRelativa(fecha: Date): string {
  const hora = `${dosDigitos(fecha.getHours())}:${dosDigitos(fecha.getMinutes())} hrs`
  const hoy = new Date()
  const mismoDia =
    fecha.getDate() === hoy.getDate() &&
    fecha.getMonth() === hoy.getMonth() &&
    fecha.getFullYear() === hoy.getFullYear()
  if (mismoDia) return `Hoy, ${hora}`
  return `${fecha.toLocaleDateString('es-MX', { day: '2-digit', month: 'short' })} ${hora}`
}

function fechaAbsoluta(fecha: Date): string {
  const dia = fecha.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
  const hora = `${dosDigitos(fecha.getHours())}:${dosDigitos(fecha.getMinutes())}:${dosDigitos(fecha.getSeconds())}`
  return `${dia} — ${hora} UTC-6`
}

export interface RegistroAuditoria {
  accion: string
  detalle: string
  severidad?: 'info' | 'media' | 'alta' | 'critica'
  resultado?: 'exito' | 'bloqueado' | 'fallido'
  actor?: string
  rol?: string
}

export function registrarEventoConfiguracion(registro: RegistroAuditoria): EventoAuditoria {
  const eventos = leer()
  const fecha = new Date()
  const anterior = eventos[0]
  const folio = `AUD-${String(6 + eventos.length).padStart(4, '0')}`

  const evento: EventoAuditoria = {
    id: `cfg-${fecha.getTime()}`,
    folio,
    fechaRelativa: fechaRelativa(fecha),
    fechaAbsoluta: fechaAbsoluta(fecha),
    fechaUTC: fecha.toISOString(),
    actor: {
      tipo: 'usuario',
      nombre: registro.actor ?? ACTOR_ADMIN,
      empleadoId: 'EMP-8491',
      rol: registro.rol ?? 'Administrador del Sistema',
      rolId: 'administrador',
    },
    accion: registro.accion,
    modulo: 'Configuración General del Plantel',
    objeto: { titulo: 'Configuración del plantel', detalle: registro.detalle },
    severidad: registro.severidad ?? 'info',
    resultado: registro.resultado ?? 'exito',
    hash: hashAleatorio(),
    hashPrevio: anterior?.hash ?? '000000',
    ip: '187.190.45.12',
  }

  persistir([evento, ...eventos])
  return evento
}

export function eventosConfiguracion(): EventoAuditoria[] {
  return leer()
}

export function suscribirAuditoria(listener: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  listeners.add(listener)
  window.addEventListener(EVENTO_AUDITORIA, listener)
  const onStorage = (event: StorageEvent) => {
    if (event.key === AUDIT_STORAGE_KEY) listener()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener(EVENTO_AUDITORIA, listener)
    window.removeEventListener('storage', onStorage)
  }
}
