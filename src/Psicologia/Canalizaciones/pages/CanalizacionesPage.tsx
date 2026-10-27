import { useMemo, useState } from 'react'
import { PsicologiaTemplate } from '../../../Portal/shared/templates/PsicologiaTemplate'
import { CanalizacionesFilters } from '../organisms/CanalizacionesFilters'
import { CanalizacionesHeader } from '../organisms/CanalizacionesHeader'
import { FichaClinica } from '../organisms/FichaClinica'
import { IndicadoresRow } from '../organisms/IndicadoresRow'
import { RegistrosTable } from '../organisms/RegistrosTable'
import { indicadores, registros as registrosIniciales } from '../constants/canalizaciones'
import { destinoSidebar } from '../../../Portal/shared/constants/navigation'
import { useCanalizacionesServicios } from '../hooks/useCanalizacionesServicios'
import type { SidebarKey } from '../../../Portal/shared/types'

export function CanalizacionesPage() {
  const externos = useCanalizacionesServicios()
  const registros = useMemo(() => [...externos, ...registrosIniciales], [externos])
  const [seleccionadoId, setSeleccionadoId] = useState(
    () => externos[0]?.id ?? registrosIniciales[8].id
  )
  const seleccionado = registros.find((registro) => registro.id === seleccionadoId) ?? registros[0]
  const indicadoresActuales = useMemo(() => {
    const total = 24 + externos.length
    const enEspera = 6 + externos.filter((registro) => registro.estado === 'PENDIENTE').length
    return indicadores.map((indicador) => {
      if (indicador.id === 'total') return { ...indicador, valor: String(total) }
      if (indicador.id === 'espera') return { ...indicador, valor: String(enEspera) }
      return indicador
    })
  }, [externos])

  const navegar = (key: SidebarKey) => {
    window.location.hash = destinoSidebar(key)
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

      <div className='grid w-full min-w-0 grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_clamp(320px,26vw,380px)]'>
        <RegistrosTable
          registros={registros}
          seleccionado={seleccionado}
          onSeleccionar={(registro) => setSeleccionadoId(registro.id)}
        />
        <FichaClinica seleccionado={seleccionado} />
      </div>
    </PsicologiaTemplate>
  )
}
