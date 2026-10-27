import { useCallback, useEffect, useMemo, useState } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { roles } from '../../../Portal/shared/constants/roles'
import type { SidebarKey } from '../../../Portal/shared/types'
import { ServiciosAcademicosTemplate } from '../../shared/templates/ServiciosAcademicosTemplate'
import { rutaAccion } from '../../shared/constants/rutas'
import { DialogoTransferencia } from '../molecules/DialogoTransferencia'
import { PaginacionPadron } from '../molecules/PaginacionPadron'
import { EncabezadoPadron } from '../organisms/EncabezadoPadron'
import { FiltrosPadron } from '../organisms/FiltrosPadron'
import { ListaEstudiantes } from '../organisms/ListaEstudiantes'
import { calcularKpis, estudiantes } from '../constants/padronData'
import { dialogoTransferencia } from '../constants/padronContent'
import { usePadronFiltros } from '../hooks/usePadronFiltros'
import { useTransferenciasSEE } from '../hooks/useTransferenciasSEE'
import { useEstudiantesAlta } from '../../AltaEstudiante/hooks/useEstudiantesAlta'
import type { DestinoModulo, Estudiante } from '../types'

export function PadronGeneralPage() {
  const { estudiantes: altas } = useEstudiantesAlta()
  const estudiantesConAltas = useMemo(() => {
    const idsAltas = new Set(altas.map((estudiante) => estudiante.id))
    return [...altas, ...estudiantes.filter((estudiante) => !idsAltas.has(estudiante.id))]
  }, [altas])
  const { estudiantes: conTransferencias, transferir, estaTransferido } =
    useTransferenciasSEE(estudiantesConAltas)
  const filtros = usePadronFiltros(conTransferencias)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [seleccionado, setSeleccionado] = useState<Estudiante | null>(null)
  const [aviso, setAviso] = useState<string | null>(null)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setCargando(false), 450)
    return () => window.clearTimeout(timeoutId)
  }, [])

  const kpis = useMemo(() => calcularKpis(conTransferencias), [conTransferencias])
  const pendientesActivo = filtros.estatus === 'cotejo_pendiente'

  const navegar = (key: SidebarKey) => {
    const item = roles.servicios_academicos.navItems.find((modulo) => modulo.key === key)
    window.location.hash = item?.hash ?? '#servicios-academicos/padron'
  }

  const navegarModulo = (destino: DestinoModulo, estudiante: Estudiante) => {
    window.location.hash = rutaAccion(destino, estudiante.id)
  }

  const filtrarPendientes = () => {
    filtros.setEstatus(pendientesActivo ? '' : 'cotejo_pendiente')
  }

  const reintentar = useCallback(() => {
    setError(null)
    setCargando(true)
    window.setTimeout(() => setCargando(false), 450)
  }, [])

  const cerrarDialogo = useCallback(() => setSeleccionado(null), [])

  const confirmarTransferencia = (motivo: string, notas: string) => {
    if (!seleccionado) return
    transferir(seleccionado, motivo, notas)
    setSeleccionado(null)
    setAviso(dialogoTransferencia.confirmacion)
  }

  return (
    <ServiciosAcademicosTemplate
      vista='PADRÓN GENERAL DE ESTUDIANTES'
      activeKey='padron'
      onNavigate={navegar}
      busqueda={filtros.textoBusqueda}
      onBuscar={filtros.setTexto}
    >
      <EncabezadoPadron
        valores={kpis}
        pendientesActivo={pendientesActivo}
        onFiltrarPendientes={filtrarPendientes}
      />

      <FiltrosPadron
        texto={filtros.textoBusqueda}
        grado={filtros.grado}
        estatus={filtros.estatus}
        onTexto={filtros.setTexto}
        onGrado={filtros.setGrado}
        onEstatus={filtros.setEstatus}
        onAlta={() => {
          window.location.hash = '#servicios-academicos/alta'
        }}
      />

      {aviso ? (
        <div
          role='status'
          className='flex w-full min-w-0 items-start justify-between gap-3 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-menta-soft)] px-4 py-3 text-[13px] font-semibold text-[var(--sa-on-menta-soft)]'
        >
          <span className='flex min-w-0 items-start gap-2'>
            <Icon name='circle-check' size={17} color='currentColor' className='mt-0.5 shrink-0' />
            {aviso}
          </span>
          <button
            type='button'
            onClick={() => setAviso(null)}
            aria-label={dialogoTransferencia.ariaCerrarAviso}
            className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg hover:bg-[var(--sa-card)]'
          >
            <Icon name='x' size={14} color='currentColor' />
          </button>
        </div>
      ) : null}

      <ListaEstudiantes
        cargando={cargando}
        error={error}
        visibles={filtros.visibles}
        onReintentar={reintentar}
        onLimpiar={filtros.limpiar}
        onNavegar={navegarModulo}
        onTransferir={setSeleccionado}
        estaTransferido={estaTransferido}
      />

      {!cargando && !error && filtros.visibles.length > 0 ? (
        <PaginacionPadron
          pagina={filtros.pagina}
          totalPaginas={filtros.totalPaginas}
          desde={filtros.desde}
          hasta={filtros.hasta}
          total={filtros.total}
          filtrados={filtros.filtrados.length}
          onPagina={filtros.irPagina}
        />
      ) : null}

      {seleccionado ? (
        <DialogoTransferencia
          key={seleccionado.id}
          estudiante={seleccionado}
          onCerrar={cerrarDialogo}
          onConfirmar={confirmarTransferencia}
        />
      ) : null}
    </ServiciosAcademicosTemplate>
  )
}
