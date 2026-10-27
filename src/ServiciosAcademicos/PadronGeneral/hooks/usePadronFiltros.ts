import { useCallback, useEffect, useMemo, useState } from 'react'
import { claveGrupo } from '../constants/padronData'
import { paginacionPadron } from '../constants/padronContent'
import type { Estudiante } from '../types'
import { useDebouncedValue } from './useDebouncedValue'

const ESTATUS_EXPEDIENTE = new Set(['completo', 'cotejo_pendiente', 'validado'])

function normalizar(valor: string): string {
  return valor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function leerParametrosIniciales() {
  const params = new URLSearchParams(window.location.search)
  const pagina = Number.parseInt(params.get('pagina') ?? '1', 10)
  return {
    q: params.get('q') ?? '',
    grado: params.get('grado') ?? '',
    estatus: params.get('estatus') ?? '',
    pagina: Number.isFinite(pagina) && pagina > 0 ? pagina : 1,
  }
}

export function usePadronFiltros(estudiantes: Estudiante[]) {
  const inicial = leerParametrosIniciales()
  const [textoBusqueda, setTextoBusqueda] = useState(inicial.q)
  const [grado, setGradoState] = useState(inicial.grado)
  const [estatus, setEstatusState] = useState(inicial.estatus)
  const [pagina, setPaginaState] = useState(inicial.pagina)
  const q = useDebouncedValue(textoBusqueda, 300)

  const filtrados = useMemo(() => {
    const consulta = normalizar(q)

    return estudiantes.filter((estudiante) => {
      const coincideTexto =
        consulta.length === 0 ||
        normalizar(
          `${estudiante.nombre} ${estudiante.apellidos} ${estudiante.matricula} ${estudiante.curp}`
        ).includes(consulta)

      if (!coincideTexto) return false
      if (grado && claveGrupo(estudiante) !== grado) return false
      if (!estatus) return true
      if (ESTATUS_EXPEDIENTE.has(estatus)) return estudiante.estatusExpediente === estatus
      return estudiante.atencionSEE === estatus
    })
  }, [estudiantes, q, grado, estatus])

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / paginacionPadron.tamanoPagina))
  const paginaActual = Math.min(pagina, totalPaginas)
  const desdeIndice = (paginaActual - 1) * paginacionPadron.tamanoPagina
  const visibles = filtrados.slice(
    desdeIndice,
    desdeIndice + paginacionPadron.tamanoPagina
  )

  useEffect(() => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (grado) params.set('grado', grado)
    if (estatus) params.set('estatus', estatus)
    if (paginaActual > 1) params.set('pagina', String(paginaActual))
    const query = params.toString()
    const url = `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`
    window.history.replaceState(null, '', url)
  }, [q, grado, estatus, paginaActual])

  const setTexto = useCallback((valor: string) => {
    setTextoBusqueda(valor)
    setPaginaState(1)
  }, [])

  const setGrado = useCallback((valor: string) => {
    setGradoState(valor)
    setPaginaState(1)
  }, [])

  const setEstatus = useCallback((valor: string) => {
    setEstatusState(valor)
    setPaginaState(1)
  }, [])

  const limpiar = useCallback(() => {
    setTextoBusqueda('')
    setGradoState('')
    setEstatusState('')
    setPaginaState(1)
  }, [])

  const irPagina = useCallback(
    (nueva: number) => {
      setPaginaState(Math.min(Math.max(1, nueva), totalPaginas))
    },
    [totalPaginas]
  )

  const hayFiltros = textoBusqueda.length > 0 || grado.length > 0 || estatus.length > 0

  return {
    textoBusqueda,
    setTexto,
    grado,
    setGrado,
    estatus,
    setEstatus,
    pagina: paginaActual,
    totalPaginas,
    filtrados,
    visibles,
    hayFiltros,
    limpiar,
    irPagina,
    desde: filtrados.length === 0 ? 0 : desdeIndice + 1,
    hasta: Math.min(desdeIndice + paginacionPadron.tamanoPagina, filtrados.length),
    total: estudiantes.length,
  }
}
