import { useMemo, useState } from 'react'
import { PsicologiaTemplate } from '../../../Portal/shared/templates/PsicologiaTemplate'
import { CanalizacionesFilters } from '../organisms/CanalizacionesFilters'
import { CanalizacionesHeader } from '../organisms/CanalizacionesHeader'
import { FichaClinica } from '../organisms/FichaClinica'
import { IndicadoresRow } from '../organisms/IndicadoresRow'
import { RegistrosTable } from '../organisms/RegistrosTable'
import { indicadores } from '../constants/canalizaciones'
import { destinoSidebar } from '../../../Portal/shared/constants/navigation'
import { useCanalizacionesServicios } from '../hooks/useCanalizacionesServicios'
import { idApiCanalizacion, marcarCanalizacionRecibida } from '../services/canalizacionesApi'
import { mapAuthError } from '../../../Login/services/authService'
import type { SidebarKey } from '../../../Portal/shared/types'
import type { RegistroCanalizacion } from '../types'

function porcentaje(valor: number, total: number): number {
  return total === 0 ? 0 : Math.round((valor / total) * 100)
}

export function CanalizacionesPage() {
  const { registros, cargando, error, recargar } = useCanalizacionesServicios()
  const [seleccionadoId, setSeleccionadoId] = useState<string | null>(null)
  const [firmando, setFirmando] = useState(false)
  const [errorAccion, setErrorAccion] = useState<string | null>(null)
  const seleccionado =
    registros.find((registro) => registro.id === seleccionadoId) ?? registros[0]

  const indicadoresActuales = useMemo(() => {
    const total = registros.length
    const valores: Record<string, number> = {
      total,
      afectados: registros.filter((registro) => registro.afectaDesempeno === true).length,
      docente: registros.filter((registro) => registro.origen === 'DOCENTE').length,
      social: registros.filter((registro) => registro.origen === 'T. SOCIAL').length,
      espera: registros.filter((registro) => registro.estado === 'PENDIENTE').length,
    }
    return indicadores.map((indicador) =>
      indicador.id in valores
        ? {
            ...indicador,
            valor: String(valores[indicador.id]),
            barra: indicador.id === 'total' ? (total ? 100 : 0) : porcentaje(valores[indicador.id], total),
          }
        : indicador
    )
  }, [registros])

  const navegar = (key: SidebarKey) => {
    window.location.hash = destinoSidebar(key)
  }

  const firmarRecibido = async (registro: RegistroCanalizacion) => {
    if (idApiCanalizacion(registro) === undefined || registro.estado === 'RECIBIDO') return
    setFirmando(true)
    setErrorAccion(null)
    try {
      await marcarCanalizacionRecibida(registro)
      await recargar()
    } catch (err) {
      setErrorAccion(mapAuthError(err))
    } finally {
      setFirmando(false)
    }
  }

  return (
    <PsicologiaTemplate
      rol='Psicología (SEE)'
      vista='Registro y Control de Canalizaciones'
      activeKey='canalizaciones'
      onNavigate={navegar}
    >
      <CanalizacionesHeader />

      <IndicadoresRow indicadores={indicadoresActuales} />

      <CanalizacionesFilters />

      {error || errorAccion ? (
        <div role='alert' className='rounded-xl border border-[#C62828] bg-[#FFF4F4] p-3 text-[14px] font-bold text-[#C62828]'>
          {errorAccion ?? error}
        </div>
      ) : null}

      {cargando && registros.length === 0 ? (
        <p role='status' className='text-[14px] text-[var(--sa-muted)]'>Cargando canalizaciones…</p>
      ) : null}

      {seleccionado ? (
        <div className='grid w-full min-w-0 grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_clamp(320px,26vw,380px)]'>
          <RegistrosTable
            registros={registros}
            seleccionado={seleccionado}
            onSeleccionar={(registro) => setSeleccionadoId(registro.id)}
          />
          <FichaClinica
            seleccionado={seleccionado}
            firmando={firmando}
            onFirmarRecibido={
              idApiCanalizacion(seleccionado) !== undefined && seleccionado.estado === 'PENDIENTE'
                ? () => void firmarRecibido(seleccionado)
                : undefined
            }
          />
        </div>
      ) : !cargando ? (
        <p className='rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 text-[14px] text-[var(--sa-muted)]'>
          No hay canalizaciones registradas.
        </p>
      ) : null}
    </PsicologiaTemplate>
  )
}
