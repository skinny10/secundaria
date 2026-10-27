import { useCallback, useMemo, useState } from 'react'
import {
  crearCanalizacionServicios,
  guardarCanalizacionServicios,
  leerCanalizacionesServicios,
} from '../../shared/services/canalizacionesStorage'
import type { Estudiante } from '../types'

function leerMatriculasTransferidas(): Set<string> {
  return new Set(
    leerCanalizacionesServicios()
      .map((registro) => registro.matricula)
      .filter(Boolean)
  )
}

export function useTransferenciasSEE(estudiantes: Estudiante[]) {
  const [matriculas, setMatriculas] = useState<Set<string>>(leerMatriculasTransferidas)

  const conTransferencias = useMemo(
    () =>
      estudiantes.map((estudiante) =>
        matriculas.has(estudiante.matricula)
          ? { ...estudiante, atencionSEE: 'en_atencion' as const }
          : estudiante
      ),
    [estudiantes, matriculas]
  )

  const transferir = useCallback((estudiante: Estudiante, motivo: string, notas: string) => {
    const registro = crearCanalizacionServicios(estudiante, motivo, notas)
    guardarCanalizacionServicios(registro)
    setMatriculas((previas) => {
      const siguientes = new Set(previas)
      siguientes.add(estudiante.matricula)
      return siguientes
    })
  }, [])

  const estaTransferido = useCallback(
    (estudiante: Estudiante) => matriculas.has(estudiante.matricula),
    [matriculas]
  )

  return { estudiantes: conTransferencias, transferir, estaTransferido }
}
