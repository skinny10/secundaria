import { useMemo, useState } from 'react'
import { PsicologiaTemplate } from '../../../Portal/shared/templates/PsicologiaTemplate'
import { foliosIniciales, generadores } from '../constants/reportes'
import { GeneradoresSection } from '../organisms/GeneradoresSection'
import { HistorialFolios } from '../organisms/HistorialFolios'
import { EncabezadoReportes } from '../organisms/EncabezadoReportes'
import { ReportesFilters } from '../organisms/ReportesFilters'
import { CadenaCustodia } from '../organisms/CadenaCustodia'
import { PreviewDialog } from '../organisms/PreviewDialog'
import { MigajasReportes } from '../molecules/MigajasReportes'
import { MensajeEstado } from '../../../Portal/shared/molecules/MensajeEstado'
import { destinoSidebar } from '../../../Portal/shared/constants/navigation'
import type { FolioEmitido, GeneradorFormato, TipoDocumento } from '../types'
import type { SidebarKey } from '../../../Portal/shared/types'

export function ReportesPage() {
  const [ciclo, setCiclo] = useState('2024-2025')
  const [tipo, setTipo] = useState<'todos' | TipoDocumento>('todos')
  const [grupo, setGrupo] = useState('todos')
  const [busqueda, setBusqueda] = useState('')
  const [folios, setFolios] = useState<FolioEmitido[]>(foliosIniciales)
  const [siguiente, setSiguiente] = useState(105)
  const [mensaje, setMensaje] = useState<string | null>(null)
  const [preview, setPreview] = useState<GeneradorFormato | null>(null)

  const autorizado = true
  const ultimoFolio = folios[0]?.folio ?? 'SEE-2024-F104'
  const q = busqueda.trim().toLowerCase()

  const generadoresVisibles = useMemo(
    () =>
      generadores.filter((generador) => {
        const coincideCiclo = generador.ciclo === ciclo
        const coincideTipo = tipo === 'todos' || generador.tipo === tipo
        const coincideBusqueda =
          q === '' ||
          `${generador.etiqueta} ${generador.titulo} ${generador.descripcion}`
            .toLowerCase()
            .includes(q)
        return coincideCiclo && coincideTipo && coincideBusqueda
      }),
    [ciclo, tipo, q]
  )

  const foliosVisibles = useMemo(
    () =>
      folios.filter((folio) => {
        const coincideCiclo = folio.ciclo === ciclo
        const coincideTipo = tipo === 'todos' || folio.tipo === tipo
        const coincideGrupo = grupo === 'todos' || folio.grupo === grupo
        const coincideBusqueda =
          q === '' ||
          `${folio.folio} ${folio.estudiante} ${folio.detalle} ${folio.tramite}`
            .toLowerCase()
            .includes(q)
        return coincideCiclo && coincideTipo && coincideGrupo && coincideBusqueda
      }),
    [folios, ciclo, tipo, grupo, q]
  )

  const navegar = (key: SidebarKey) => {
    window.location.hash = destinoSidebar(key)
  }

  const registrarFolio = (tipoDocumento: TipoDocumento) => {
    const numero = siguiente
    const folio = `SEE-2024-F${numero}`
    const nuevo: FolioEmitido = {
      folio,
      ciclo,
      fecha: '22 Octubre 2024',
      estudiante:
        tipoDocumento === 'oficio'
          ? 'Oficio de Canalización Externa'
          : tipoDocumento === 'carta'
            ? 'Carta Compromiso y Minuta DUA'
            : 'Padrón Institucional 2024-B',
      detalle:
        tipoDocumento === 'concentrado'
          ? 'Plantel Completo, 48 alumnos'
          : 'Documento generado en este periodo',
      tramite:
        tipoDocumento === 'oficio'
          ? 'Canalización Externa / SEE'
          : tipoDocumento === 'carta'
            ? 'Carta Compromiso Tutores DUA'
            : tipoDocumento === 'ficha'
              ? 'Ficha Resumen DUA'
              : 'Concentrado Semestral SEE',
      tipo: tipoDocumento,
      estatus: 'Sello Supervisión Zona 014',
      tono: 'azul',
      accion: 'Paquete Sellado',
      accionIcono: 'package',
      grupo: 'institucional',
    }
    setFolios((prev) => [nuevo, ...prev])
    setSiguiente((prev) => prev + 1)
    setMensaje(`Se generó y registró el folio ${folio} en el libro de folios.`)
  }

  const confirmar = (texto: string) => {
    const acepta = window.confirm(
      `¿Confirma ${texto}? La acción quedará registrada en el libro de folios.`
    )
    if (acepta) {
      setMensaje(`Acción confirmada: ${texto}. Registro actualizado en el libro de folios.`)
    }
  }

  const accionFila = (folio: FolioEmitido) => {
    const acepta = window.confirm(`¿Confirma la acción «${folio.accion}» para ${folio.folio}?`)
    if (acepta) {
      setMensaje(`El folio ${folio.folio} quedó registrado con la acción «${folio.accion}».`)
    }
  }

  return (
    <PsicologiaTemplate
      rol='Psicología (SEE)'
      vista='Centro de Reportes Oficiales y Oficios'
      activeKey='reportes'
      onNavigate={navegar}
      busqueda={busqueda}
      onBuscar={setBusqueda}
    >
      <MigajasReportes />

      {mensaje ? <MensajeEstado>{mensaje}</MensajeEstado> : null}

      <EncabezadoReportes ultimoFolio={ultimoFolio} />

      <ReportesFilters
        ciclo={ciclo}
        onCiclo={setCiclo}
        tipo={tipo}
        onTipo={setTipo}
        grupo={grupo}
        onGrupo={setGrupo}
        busqueda={busqueda}
        onBuscar={setBusqueda}
      />

      <GeneradoresSection
        generadores={generadoresVisibles}
        autorizado={autorizado}
        onGenerar={registrarFolio}
        onPreview={setPreview}
        onConfirmar={confirmar}
        onImprimir={() => window.print()}
      />

      <HistorialFolios
        folios={foliosVisibles}
        onAccion={accionFila}
        onActualizar={() =>
          setMensaje('Libro de folios actualizado con los últimos movimientos.')
        }
      />

      <CadenaCustodia />

      <PreviewDialog
        preview={preview}
        autorizado={autorizado}
        onClose={() => setPreview(null)}
        onGenerar={registrarFolio}
      />
    </PsicologiaTemplate>
  )
}
