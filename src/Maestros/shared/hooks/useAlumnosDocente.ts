import { useCallback, useEffect, useState } from 'react'
import { mapAuthError } from '../../../Login/services/authService'
import { listarEstudiantesApi, type EstudianteApiDetalle } from '../../../utils/services/catalogosApi'

export function useAlumnosDocente() {
  const [alumnos, setAlumnos] = useState<EstudianteApiDetalle[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const cargar = useCallback(async (signal?: AbortSignal) => {
    setCargando(true)
    setError(null)
    try {
      const datos = await listarEstudiantesApi(signal)
      if (!signal?.aborted) setAlumnos(datos)
    } catch (err) {
      if (!signal?.aborted) setError(mapAuthError(err))
    } finally {
      if (!signal?.aborted) setCargando(false)
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    void cargar(controller.signal)
    return () => controller.abort()
  }, [cargar])

  return { alumnos, cargando, error, recargar: () => cargar() }
}
