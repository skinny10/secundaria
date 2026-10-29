import { useCallback, useEffect, useMemo, useState } from 'react'
import type { MetaGuardado, PlantelConfig, SeccionConfigId } from '../types'
import { validarConfig } from '../utils/validacion'
import { listarCambios } from '../utils/diff'
import {
  guardarConfigPlantel,
  leerConfigPlantel,
  restaurarConfigPlantel,
  suscribirConfigPlantel,
} from '../services/plantelConfigStore'
import { validarCCT } from '../services/sepService'

const SECCIONES: SeccionConfigId[] = ['datos', 'calendario', 'turnos', 'dua']

function leerSeccion(): SeccionConfigId {
  if (typeof window === 'undefined') return 'datos'
  const query = window.location.hash.split('?')[1] ?? ''
  const valor = new URLSearchParams(query).get('seccion') as SeccionConfigId | null
  return valor && SECCIONES.includes(valor) ? valor : 'datos'
}

export function useConfiguracionPlantel() {
  const [guardado, setGuardado] = useState<PlantelConfig>(leerConfigPlantel)
  const [config, setConfig] = useState<PlantelConfig>(guardado)
  const [seccion, setSeccionEstado] = useState<SeccionConfigId>(leerSeccion)
  const [validandoCCT, setValidandoCCT] = useState(false)

  useEffect(() => {
    const sincronizar = () => {
      const actual = leerConfigPlantel()
      setGuardado(actual)
      setConfig(actual)
    }
    return suscribirConfigPlantel(sincronizar)
  }, [])

  useEffect(() => {
    const onHashChange = () => setSeccionEstado(leerSeccion())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const setSeccion = useCallback((siguiente: SeccionConfigId) => {
    setSeccionEstado(siguiente)
    const url = `${window.location.pathname}${window.location.search}#administrador/configuracion?seccion=${siguiente}`
    window.history.replaceState(null, '', url)
  }, [])

  const errores = useMemo(() => validarConfig(config), [config])
  const cambios = useMemo(() => listarCambios(guardado, config), [guardado, config])
  const sinGuardar = cambios.length > 0

  const verificarCCT = useCallback(async (cct: string) => {
    setValidandoCCT(true)
    setConfig((actual) => ({
      ...actual,
      identidad: { ...actual.identidad, cct: cct.toUpperCase(), cctValidacion: 'pendiente' },
    }))
    const resultado = await validarCCT(cct)
    setConfig((actual) => ({
      ...actual,
      identidad: { ...actual.identidad, cctValidacion: resultado.estado },
    }))
    setValidandoCCT(false)
    return resultado
  }, [])

  const descartar = useCallback(() => setConfig(guardado), [guardado])

  const guardar = useCallback(
    (meta: MetaGuardado) => {
      const siguiente = guardarConfigPlantel(config, meta)
      setGuardado(siguiente)
      setConfig(siguiente)
      return siguiente
    },
    [config]
  )

  const restaurar = useCallback((meta: MetaGuardado) => {
    const siguiente = restaurarConfigPlantel(meta)
    setGuardado(siguiente)
    setConfig(siguiente)
    return siguiente
  }, [])

  return {
    config,
    guardado,
    setConfig,
    seccion,
    setSeccion,
    errores,
    cambios,
    sinGuardar,
    validandoCCT,
    verificarCCT,
    descartar,
    guardar,
    restaurar,
  }
}
