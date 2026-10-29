import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { roles } from '../../../Portal/shared/constants/roles'
import {
  calcularVenceEn,
  condicionesTransferencia,
  especialistasSEE,
  generarFolioSEE,
  transferenciasContent,
} from '../constants/transferenciasContent'
import type { DatosAlumnoTransferencia, MotivoTransferencia, Transferencia, UrgenciaTransferencia } from '../types'
import { estudiantes } from '../../PadronGeneral/constants/padronData'
import { leerCanalizacionesServicios } from '../../shared/services/canalizacionesStorage'

interface UseTransferirParams {
  alumnoId?: string
}

export function useTransferir({ alumnoId }: UseTransferirParams) {
  const [alumno, setAlumno] = useState<DatosAlumnoTransferencia | null>(null)
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [motivo, setMotivo] = useState<MotivoTransferencia | ''>('')
  const [condicionPreliminar, setCondicionPreliminar] = useState('')
  const [especialistaId, setEspecialistaId] = useState('')
  const [urgencia, setUrgencia] = useState<UrgenciaTransferencia | ''>('')
  const [notas, setNotas] = useState('')
  const [errores, setErrores] = useState<Record<string, string>>({})
  const [transferenciaActiva, setTransferenciaActiva] = useState<Transferencia | null>(null)
  const inicialRef = useRef('')

  useEffect(() => {
    let activo = true
    const cargar = async () => {
      setCargando(true)
      if (!alumnoId) {
        if (activo) {
          setAlumno(null)
          setCargando(false)
        }
        return
      }
      const encontrado = estudiantes.find((e) => e.id === alumnoId)
      if (!encontrado) {
        if (activo) {
          setAlumno(null)
          setCargando(false)
        }
        return
      }
      const data: DatosAlumnoTransferencia = {
        id: encontrado.id,
        matricula: encontrado.matricula,
        nombreCompleto: `${encontrado.nombre} ${encontrado.apellidos}`,
        nombre: encontrado.nombre,
        apellidos: encontrado.apellidos,
        grado: encontrado.grado,
        grupo: encontrado.grupo,
        turno: encontrado.turno,
        curp: encontrado.curp,
        condicionPrincipal: encontrado.documentos?.pendientes?.[0],
      }
      // Prellenado
      if (encontrado.origenAlta) {
        setMotivo('diagnostico_previo')
      }
      if (encontrado.documentos?.pendientes?.length) {
        setCondicionPreliminar(condicionesTransferencia[0].value)
      }
      setEspecialistaId(especialistasSEE[0].id)
      inicialRef.current = JSON.stringify({ motivo: '', condicionPreliminar: '', especialistaId: especialistasSEE[0].id, urgencia: '', notas: '' })
      if (activo) {
        setAlumno(data)
        setCargando(false)
      }
      // Buscar transferencia activa
      const canalizaciones = leerCanalizacionesServicios()
      const activa = canalizaciones.find((c) => c.matricula === encontrado.matricula)
      if (activa && activo) {
        setTransferenciaActiva({
          id: activa.id,
          folio: activa.folio,
          alumnoId: encontrado.id,
          matricula: activa.matricula,
          motivo: 'diagnostico_previo',
          condicionPreliminar: condicionesTransferencia[0].label,
          especialistaId: especialistasSEE[0].id,
          urgencia: 'ordinaria',
          creadaPor: activa.emisor,
          creadaEn: activa.fechaEmision,
          venceEn: calcularVenceEn('ordinaria'),
          estado: 'pendiente_recepcion',
        })
      }
    }
    cargar()
    return () => {
      activo = false
    }
  }, [alumnoId])

  const tieneCambios = useMemo(() => {
    const actual = JSON.stringify({ motivo, condicionPreliminar, especialistaId, urgencia, notas })
    return actual !== inicialRef.current
  }, [motivo, condicionPreliminar, especialistaId, urgencia, notas])

  const validar = useCallback(() => {
    const err: Record<string, string> = {}
    if (!motivo) err.motivo = transferenciasContent.errores.motivo
    if (!condicionPreliminar) err.condicion = transferenciasContent.errores.condicion
    if (!especialistaId) err.especialista = transferenciasContent.errores.especialista
    if (!urgencia) err.urgencia = transferenciasContent.errores.urgencia
    setErrores(err)
    return Object.keys(err).length === 0
  }, [motivo, condicionPreliminar, especialistaId, urgencia])

  const guardar = useCallback(async (): Promise<{ ok: boolean; transferencia?: Transferencia }> => {
    if (!alumno || !motivo || !condicionPreliminar || !especialistaId || !urgencia) {
      validar()
      return { ok: false }
    }
    setGuardando(true)
    await new Promise((r) => setTimeout(r, 400))
    const folio = generarFolioSEE()
    const transferencia: Transferencia = {
      id: `tr-${Date.now()}`,
      folio,
      alumnoId: alumno.id,
      matricula: alumno.matricula,
      motivo,
      condicionPreliminar,
      especialistaId,
      urgencia,
      notas: notas.trim() || undefined,
      creadaPor: roles.servicios_academicos.user.name,
      creadaEn: new Date().toISOString(),
      venceEn: calcularVenceEn(urgencia),
      estado: 'pendiente_recepcion',
    }
    inicialRef.current = JSON.stringify({ motivo, condicionPreliminar, especialistaId, urgencia, notas })
    setGuardando(false)
    setTransferenciaActiva(transferencia)
    return { ok: true, transferencia }
  }, [alumno, motivo, condicionPreliminar, especialistaId, urgencia, notas, validar])

  const especialistaSeleccionado = useMemo(() => especialistasSEE.find((e) => e.id === especialistaId), [especialistaId])

  return {
    alumno,
    cargando,
    guardando,
    motivo,
    setMotivo,
    condicionPreliminar,
    setCondicionPreliminar,
    especialistaId,
    setEspecialistaId,
    urgencia,
    setUrgencia,
    notas,
    setNotas,
    errores,
    validar,
    tieneCambios,
    transferenciaActiva,
    guardar,
    especialistaSeleccionado,
  }
}
