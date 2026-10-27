import { useCallback, useEffect, useState } from 'react'
import { ALTAS_ACTUALIZADAS_EVENT } from '../../../Portal/shared/constants/altas'
import { listarEstudiantesAlta } from '../services/altaRepository'
import type { Estudiante } from '../../PadronGeneral/types'

export function useEstudiantesAlta() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([])
  const [cargando, setCargando] = useState(true)

  const cargar = useCallback(async () => {
    try {
      setEstudiantes(await listarEstudiantesAlta())
    } finally {
      setCargando(false)
    }
  }, [])

  useEffect(() => {
    void cargar()
    const onActualizar = () => {
      void cargar()
    }
    window.addEventListener(ALTAS_ACTUALIZADAS_EVENT, onActualizar)
    return () => window.removeEventListener(ALTAS_ACTUALIZADAS_EVENT, onActualizar)
  }, [cargar])

  return { estudiantes, cargando }
}
