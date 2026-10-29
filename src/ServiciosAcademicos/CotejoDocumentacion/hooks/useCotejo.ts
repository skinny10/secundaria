import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { roles } from '../../../Portal/shared/constants/roles'
import { calcularResumen, crearExpedienteCotejoFicticio } from '../constants/cotejoContent'
import type { CotejoExpediente } from '../types'

interface UseCotejoParams {
  expedienteId?: string
}

export function useCotejo({ expedienteId }: UseCotejoParams) {
  const [expediente, setExpediente] = useState<CotejoExpediente | null>(null)
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [cambios, setCambios] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inicialRef = useRef<string>('')

  useEffect(() => {
    let activo = true
    const cargar = async () => {
      setCargando(true)
      setError(null)
      try {
        if (!expedienteId) {
          if (activo) {
            setExpediente(null)
            setCargando(false)
          }
          return
        }
        const data = crearExpedienteCotejoFicticio(expedienteId)
        if (activo) {
          setExpediente(data)
          inicialRef.current = JSON.stringify(data)
          setCambios(false)
          setCargando(false)
        }
      } catch (e) {
        if (activo) {
          setError('No se pudo cargar el expediente para cotejo')
          setCargando(false)
        }
      }
    }
    cargar()
    return () => {
      activo = false
    }
  }, [expedienteId])

  const resumen = useMemo(() => {
    if (!expediente) return { cotejados: 0, pendientes: 0, total: 0 }
    return calcularResumen(expediente.documentos)
  }, [expediente])

  const toggleDocumento = useCallback((docId: string) => {
    setExpediente((prev) => {
      if (!prev) return prev
      const ahora = new Date().toISOString()
      const documentos = prev.documentos.map((doc) => {
        if (doc.id !== docId) return doc
        if (doc.estado === 'cotejado') {
          return {
            ...doc,
            estado: 'pendiente' as const,
            fechaCotejo: undefined,
            verificadoPor: undefined,
          }
        }
        return {
          ...doc,
          estado: 'cotejado' as const,
          fechaCotejo: ahora.slice(0, 10),
          verificadoPor: roles.servicios_academicos.user.name,
        }
      })
      const siguiente = { ...prev, documentos, actualizadoEn: ahora }
      setCambios(JSON.stringify(siguiente) !== inicialRef.current)
      return siguiente
    })
  }, [])

  const setObservaciones = useCallback((texto: string) => {
    setExpediente((prev) => {
      if (!prev) return prev
      const siguiente = { ...prev, observaciones: { ...prev.observaciones, texto } }
      setCambios(JSON.stringify(siguiente) !== inicialRef.current)
      return siguiente
    })
  }, [])

  const guardar = useCallback(async () => {
    if (!expediente) return { ok: false, motivo: 'sin_expediente' }
    if (resumen.pendientes > 0 && expediente.observaciones.texto.trim().length === 0) {
      return { ok: false, motivo: 'observaciones_requeridas' }
    }
    setGuardando(true)
    await new Promise((resolve) => setTimeout(resolve, 400))
    const ahora = new Date().toISOString()
    const guardado = { ...expediente, actualizadoEn: ahora }
    inicialRef.current = JSON.stringify(guardado)
    setExpediente(guardado)
    setCambios(false)
    setGuardando(false)
    return { ok: true, expediente: guardado }
  }, [expediente, resumen.pendientes])

  const tieneCambios = cambios
  const hayObservacionesRequeridas = resumen.pendientes > 0 && (expediente?.observaciones.texto.trim().length || 0) === 0

  return {
    expediente,
    cargando,
    guardando,
    resumen,
    tieneCambios,
    hayObservacionesRequeridas,
    error,
    toggleDocumento,
    setObservaciones,
    guardar,
  }
}
