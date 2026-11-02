import { useCallback, useEffect, useRef, useState } from 'react'
import { ALTAS_ACTUALIZADAS_EVENT } from '../../../Portal/shared/constants/altas'
import { mapAuthError } from '../../../Login/services/authService'
import { listarEstudiantesPadron } from '../services/estudiantesApi'
import type { Estudiante } from '../../PadronGeneral/types'

export function useEstudiantesPadron() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const controllerRef = useRef<AbortController | null>(null)

  const cargar = useCallback(async () => {
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller
    setCargando(true)
    setError(null)
    try {
      const datos = await listarEstudiantesPadron(controller.signal)
      if (!controller.signal.aborted) setEstudiantes(datos)
    } catch (err) {
      if (!controller.signal.aborted) setError(mapAuthError(err))
    } finally {
      if (!controller.signal.aborted) setCargando(false)
    }
  }, [])

  useEffect(() => {
    void cargar()
    const onActualizar = () => void cargar()
    window.addEventListener(ALTAS_ACTUALIZADAS_EVENT, onActualizar)
    return () => {
      controllerRef.current?.abort()
      window.removeEventListener(ALTAS_ACTUALIZADAS_EVENT, onActualizar)
    }
  }, [cargar])

  return { estudiantes, cargando, error, recargar: cargar }
}
