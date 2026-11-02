import { useCallback, useEffect, useState } from 'react'
import { mapAuthError } from '../../../Login/services/authService'
import { listarCanalizacionesApi } from '../services/canalizacionesApi'
import {
  CANALIZACIONES_ACTUALIZADAS_EVENT,
  CANALIZACIONES_SERVICIOS_STORAGE_KEY,
} from '../../../Portal/shared/constants/canalizaciones'
import { ALTAS_ACTUALIZADAS_EVENT } from '../../../Portal/shared/constants/altas'
import { listarCanalizacionesAlta } from '../../../ServiciosAcademicos/AltaEstudiante/services/altaRepository'
import type { RegistroCanalizacion } from '../types'

interface CanalizacionExterna {
  id: string
  marcaTemporal: string
  nombre: string
  apellidos: string
  grado: string
  grupo: string
  turno: string
  origen: 'SERVICIOS ACADÉMICOS'
  emisor: string
  asignatura: string
  estado: 'PENDIENTE' | 'RECIBIDO'
  folio: string
  fechaEmision: string
  afectaDesempeno: boolean | null
  descripcion: string
  plan: string[]
}

function esTexto(valor: unknown): valor is string {
  return typeof valor === 'string'
}

function esCanalizacionExterna(valor: unknown): valor is CanalizacionExterna {
  if (!valor || typeof valor !== 'object') return false
  const registro = valor as Partial<CanalizacionExterna>
  return (
    esTexto(registro.id) &&
    esTexto(registro.marcaTemporal) &&
    esTexto(registro.nombre) &&
    esTexto(registro.apellidos) &&
    esTexto(registro.grado) &&
    esTexto(registro.grupo) &&
    esTexto(registro.turno) &&
    registro.origen === 'SERVICIOS ACADÉMICOS' &&
    esTexto(registro.emisor) &&
    esTexto(registro.asignatura) &&
    (registro.estado === 'PENDIENTE' || registro.estado === 'RECIBIDO') &&
    esTexto(registro.folio) &&
    esTexto(registro.fechaEmision) &&
    (registro.afectaDesempeno === null || typeof registro.afectaDesempeno === 'boolean') &&
    esTexto(registro.descripcion) &&
    Array.isArray(registro.plan) &&
    registro.plan.every(esTexto)
  )
}

function leerCanalizacionesExternas(): RegistroCanalizacion[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(CANALIZACIONES_SERVICIOS_STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(esCanalizacionExterna).map((registro) => ({ ...registro }))
  } catch {
    return []
  }
}

export function useCanalizacionesServicios() {
  const [registros, setRegistros] = useState<RegistroCanalizacion[]>(leerCanalizacionesExternas)
  const [registrosAlta, setRegistrosAlta] = useState<RegistroCanalizacion[]>([])
  const [registrosApi, setRegistrosApi] = useState<RegistroCanalizacion[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const cargarApi = useCallback(async (signal?: AbortSignal) => {
    setCargando(true)
    setError(null)
    try {
      const datos = await listarCanalizacionesApi(signal)
      if (!signal?.aborted) setRegistrosApi(datos)
    } catch (err) {
      if (!signal?.aborted) setError(mapAuthError(err))
    } finally {
      if (!signal?.aborted) setCargando(false)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    void cargarApi(controller.signal)
    return () => controller.abort()
  }, [cargarApi])

  useEffect(() => {
    let activo = true
    const cargarAltas = async () => {
      try {
        const altas = await listarCanalizacionesAlta()
        if (activo) setRegistrosAlta(altas)
      } catch {
        if (activo) setRegistrosAlta([])
      }
    }
    const actualizarLocales = () => setRegistros(leerCanalizacionesExternas())
    const actualizarTodo = () => {
      actualizarLocales()
      void cargarAltas()
    }
    void cargarAltas()
    window.addEventListener(CANALIZACIONES_ACTUALIZADAS_EVENT, actualizarLocales)
    window.addEventListener(ALTAS_ACTUALIZADAS_EVENT, actualizarTodo)
    window.addEventListener('storage', actualizarLocales)
    return () => {
      activo = false
      window.removeEventListener(CANALIZACIONES_ACTUALIZADAS_EVENT, actualizarLocales)
      window.removeEventListener(ALTAS_ACTUALIZADAS_EVENT, actualizarTodo)
      window.removeEventListener('storage', actualizarLocales)
    }
  }, [])

  return {
    registros: [...registrosApi, ...registrosAlta, ...registros],
    cargando,
    error,
    recargar: () => cargarApi(),
  }
}
