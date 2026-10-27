import { useMemo, useRef, useState } from 'react'
import { PsicologiaTemplate } from '../../../Portal/shared/templates/PsicologiaTemplate'
import { destinoSidebar } from '../../../Portal/shared/constants/navigation'
import {
  accesosRapidos,
  canalizaciones,
  condiciones,
  conteoUrgencias,
  documentosAuditoria,
  integridadGlobal,
  paginaTamano,
  totalAlumnos,
} from '../constants/dashboard'
import { AccesosRapidos } from '../organisms/AccesosRapidos'
import { AuditoriaExpediente } from '../organisms/AuditoriaExpediente'
import { DistribucionCondiciones } from '../organisms/DistribucionCondiciones'
import { EncabezadoBienvenida } from '../organisms/EncabezadoBienvenida'
import { IndicadoresGrid } from '../organisms/IndicadoresGrid'
import { PieConfidencialidad } from '../organisms/PieConfidencialidad'
import { TablaCanalizaciones } from '../organisms/TablaCanalizaciones'
import type { FiltroUrgencia } from '../types'
import type { SidebarKey } from '../../../Portal/shared/types'

export function DashboardPage() {
  const [filtro, setFiltro] = useState<FiltroUrgencia>('todas')
  const [pagina, setPagina] = useState(1)
  const tablaRef = useRef<HTMLDivElement | null>(null)

  const filtradas = useMemo(
    () =>
      filtro === 'todas'
        ? canalizaciones
        : canalizaciones.filter((registro) => registro.urgencia === filtro),
    [filtro]
  )

  const totalPaginas = Math.max(1, Math.ceil(filtradas.length / paginaTamano))
  const paginaActual = Math.min(pagina, totalPaginas)
  const visibles = filtradas.slice(
    (paginaActual - 1) * paginaTamano,
    paginaActual * paginaTamano
  )

  const navegar = (key: SidebarKey) => {
    window.location.hash = destinoSidebar(key)
  }

  const cambiarFiltro = (nuevo: FiltroUrgencia) => {
    setFiltro(nuevo)
    setPagina(1)
  }

  const cambiarPagina = (nueva: number) => {
    setPagina(Math.min(Math.max(1, nueva), totalPaginas))
  }

  const verLista = () => {
    const nodo = tablaRef.current
    if (!nodo) return
    const destino = nodo.getBoundingClientRect().top + window.scrollY - 48
    window.scrollTo({ top: Math.max(0, destino), behavior: 'smooth' })
  }

  return (
    <PsicologiaTemplate
      rol='Psicología (SEE)'
      vista='Dashboard y Gestión Clínica'
      sistemaBanner='SISTEMA OFICIAL SEP'
      activeKey='dashboard'
      onNavigate={navegar}
    >
      <EncabezadoBienvenida />

      <AccesosRapidos
        accesos={accesosRapidos}
        onNavegar={(destino) => {
          window.location.hash = destino
        }}
      />

      <IndicadoresGrid onVerLista={verLista} />

      <div className='grid w-full min-w-0 grid-cols-1 items-stretch gap-3 min-[1100px]:grid-cols-[minmax(0,1fr)_clamp(300px,28vw,360px)]'>
        <DistribucionCondiciones condiciones={condiciones} total={totalAlumnos} />
        <AuditoriaExpediente documentos={documentosAuditoria} integridad={integridadGlobal} />
      </div>

      <TablaCanalizaciones
        filtro={filtro}
        conteos={conteoUrgencias}
        visibles={visibles}
        totalFiltrado={filtradas.length}
        totalPaginas={totalPaginas}
        pagina={paginaActual}
        onFiltro={cambiarFiltro}
        onPagina={cambiarPagina}
        onAbrir={() => {
          window.location.hash = 'expediente'
        }}
        contenedorRef={tablaRef}
      />

      <PieConfidencialidad />
    </PsicologiaTemplate>
  )
}
