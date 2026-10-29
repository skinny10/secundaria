import {
  CONFIG_EVENT,
  CONFIG_STORAGE_KEY,
  configInicial,
} from '../constants/configInicial'
import type { MetaGuardado, PlantelConfig } from '../types'
import { registrarEventoConfiguracion } from './auditoriaService'

const CANAL = 'nexusedu:plantel-config'

const listeners = new Set<() => void>()

let canal: BroadcastChannel | null = null
if (typeof window !== 'undefined' && typeof BroadcastChannel !== 'undefined') {
  canal = new BroadcastChannel(CANAL)
  canal.onmessage = () => notificar(leerConfig(), false)
}

function esConfigValida(valor: unknown): valor is PlantelConfig {
  if (!valor || typeof valor !== 'object') return false
  const posible = valor as Partial<PlantelConfig>
  return (
    typeof posible.version === 'number' &&
    typeof posible.actualizadoEn === 'string' &&
    !!posible.identidad &&
    Array.isArray(posible.turnos) &&
    Array.isArray(posible.espacios) &&
    !!posible.protocolos
  )
}

function leerConfig(): PlantelConfig {
  if (typeof window === 'undefined') return configInicial()
  try {
    const raw = window.localStorage.getItem(CONFIG_STORAGE_KEY)
    if (!raw) return configInicial()
    const parsed = JSON.parse(raw) as unknown
    return esConfigValida(parsed) ? parsed : configInicial()
  } catch {
    return configInicial()
  }
}

function notificar(config: PlantelConfig, emitir: boolean) {
  if (emitir && canal) canal.postMessage({ version: config.version })
  if (typeof window !== 'undefined' && emitir) {
    window.dispatchEvent(new CustomEvent(CONFIG_EVENT, { detail: config }))
  }
  listeners.forEach((listener) => listener())
}

function persistir(config: PlantelConfig, emitir: boolean) {
  window.localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(config))
  notificar(config, emitir)
}

export function leerConfigPlantel(): PlantelConfig {
  return leerConfig()
}

export function guardarConfigPlantel(config: PlantelConfig, meta: MetaGuardado): PlantelConfig {
  const anterior = leerConfig()
  const siguiente: PlantelConfig = {
    ...config,
    version: anterior.version + 1,
    actualizadoPor: meta.actor,
    actualizadoEn: new Date().toISOString(),
  }
  persistir(siguiente, true)
  registrarEventoConfiguracion({
    accion: 'Actualización de Configuración General del Plantel',
    detalle: `Versión v${anterior.version} → v${siguiente.version} · ${meta.motivo}`,
    severidad: meta.reautenticado ? 'alta' : 'media',
    actor: meta.actor,
  })
  return siguiente
}

export function restaurarConfigPlantel(meta: MetaGuardado): PlantelConfig {
  const anterior = leerConfig()
  const base = configInicial()
  const siguiente: PlantelConfig = {
    ...base,
    version: anterior.version + 1,
    actualizadoPor: meta.actor,
    actualizadoEn: new Date().toISOString(),
  }
  persistir(siguiente, true)
  registrarEventoConfiguracion({
    accion: 'Restauración de Valores por Defecto del Plantel',
    detalle: `Versión v${anterior.version} → v${siguiente.version} · ${meta.motivo}`,
    severidad: 'critica',
    actor: meta.actor,
  })
  return siguiente
}

export function registrarBloqueoConfiguracion(accion: string, detalle: string) {
  registrarEventoConfiguracion({
    accion,
    detalle,
    severidad: 'media',
    resultado: 'bloqueado',
  })
}

export function suscribirConfigPlantel(listener: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  listeners.add(listener)

  const onStorage = (event: StorageEvent) => {
    if (event.key === CONFIG_STORAGE_KEY) listener()
  }
  window.addEventListener('storage', onStorage)

  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}
