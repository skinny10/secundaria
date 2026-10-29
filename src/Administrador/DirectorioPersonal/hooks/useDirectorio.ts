import { useMemo, useState } from 'react'
import { colaboradores } from '../constants/directorio'

export function useDirectorio(filters: { busqueda: string; rol: string; turno: string; estado: string }) {
  const [pagina, setPagina] = useState(1)
  const filtrados = useMemo(() => {
    const q = filters.busqueda.toLowerCase()
    return colaboradores.filter((c) => {
      if (q && !(c.nombre.toLowerCase().includes(q) || c.correo.toLowerCase().includes(q) || c.rol.toLowerCase().includes(q))) return false
      if (filters.rol && !c.rol.includes(filters.rol)) return false
      if (filters.turno && c.turno !== filters.turno) return false
      if (filters.estado && c.estado !== filters.estado) return false
      return true
    })
  }, [filters.busqueda, filters.rol, filters.turno, filters.estado])

  return { filtrados, pagina, setPagina, total: filtrados.length }
}
