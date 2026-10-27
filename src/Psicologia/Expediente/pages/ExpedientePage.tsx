import { useEffect, useState } from 'react'
import { PsicologiaTemplate } from '../../../Portal/shared/templates/PsicologiaTemplate'
import { MensajeEstado } from '../../../Portal/shared/molecules/MensajeEstado'
import {
  alumno,
  cicloEscolar,
  contactos,
  firmasIniciales,
  gruposMaterias,
  indicadoresAvance,
  metasPEI,
  migas,
  rolPsicologia,
  tasaDesescalada,
  ultimaRevision,
  validacion,
  vistaExpediente,
} from '../constants/expediente'
import { EncabezadoAlumno } from '../organisms/EncabezadoAlumno'
import { ResumenDiagnosticoCard } from '../organisms/ResumenDiagnosticoCard'
import { BarrerasBAPSection } from '../organisms/BarrerasBAPSection'
import { FortalezasYPerfil } from '../organisms/FortalezasYPerfil'
import { HistorialIntervencionesSection } from '../organisms/HistorialIntervencionesSection'
import { BarraAccionesPaso1 } from '../organisms/BarraAccionesPaso1'
import { TarjetaAvanceAdaptacion } from '../organisms/TarjetaAvanceAdaptacion'
import { TarjetaContactos } from '../organisms/TarjetaContactos'
import { TarjetaMetasPEI } from '../organisms/TarjetaMetasPEI'
import { TarjetaUltimaRevision } from '../organisms/TarjetaUltimaRevision'
import { PrintFichaDUA } from '../organisms/PrintFichaDUA'
import { MigasExpediente } from '../molecules/MigasExpediente'
import { destinoSidebar } from '../../../Portal/shared/constants/navigation'
import { PasosExpediente } from '../organisms/PasosExpediente'
import { Paso2PautasAjustes } from '../organisms/Paso2PautasAjustes'
import { Paso3ProtocoloCrisis } from '../organisms/Paso3ProtocoloCrisis'
import { Paso4AcuerdosFirmas } from '../organisms/Paso4AcuerdosFirmas'
import { AsidePaso3 } from '../organisms/AsidePaso3'
import { AsidePaso4 } from '../organisms/AsidePaso4'
import { Icon } from '../../../utils/atoms/Icon'
import {
  barrerasBAP,
  fortalezasBAP,
  historialIntervenciones,
  perfilCognitivo,
  resumenDiagnostico,
} from '../constants/diagnosticoBap'
import { folioExpedienteLegal } from '../constants/acuerdosLegales'
import type { FirmaExpediente } from '../types'
import type { SidebarKey } from '../../../Portal/shared/types'
import type { TonoMensaje } from '../../../Portal/shared/molecules/MensajeEstado'

const pasosExpediente = [
  { id: 1, label: '1. Diagnóstico y Barreras (BAP)', icon: 'brain' as const },
  { id: 2, label: '2. Pautas y Ajustes DUA Aula', icon: 'list-checks' as const },
  { id: 3, label: '3. Protocolo de Crisis Sensorial', icon: 'traffic-light' as const },
  { id: 4, label: '4. Acuerdos y Firmas Legales', icon: 'file-signature' as const },
]

function leerPaso(): number {
  if (typeof window === 'undefined') return 1
  const params = new URLSearchParams(window.location.search)
  const paso = Number(params.get('paso'))
  if (paso === 2 || paso === 3 || paso === 4) return paso
  return 1
}

export function ExpedientePage() {
  const [pasoActivo, setPasoActivo] = useState<number>(() => leerPaso())
  const [firmas, setFirmas] = useState<FirmaExpediente[]>(firmasIniciales)
  const [mensaje, setMensaje] = useState<{ texto: string; tono: TonoMensaje } | null>(null)
  const [dictamen, setDictamen] = useState<string | null>(null)
  const [borrador, setBorrador] = useState<string | null>(null)
  const [paso3Completado, setPaso3Completado] = useState(false)

  useEffect(() => {
    const onPop = () => setPasoActivo(leerPaso())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const cambiarPaso = (id: number) => {
    setPasoActivo(id)
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.set('paso', String(id))
      window.history.pushState({}, '', url.toString())
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const navegar = (key: SidebarKey) => {
    window.location.hash = destinoSidebar(key)
  }

  const guardarBorrador = () => {
    const marca = new Date().toLocaleString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
    try {
      window.localStorage.setItem(
        'nexusedu:expediente:borrador',
        JSON.stringify({ expediente: alumno.folio, marca })
      )
    } catch {
      setBorrador(marca)
      setMensaje({ texto: 'Borrador generado en memoria (almacenamiento local no disponible).', tono: 'alerta' })
      return
    }
    setBorrador(marca)
    setMensaje({
      texto: 'Borrador guardado sin validación: no requiere firmas completas para conservarse.',
      tono: 'exito',
    })
  }

  const solicitarFirma = (firma: FirmaExpediente) => {
    if (dictamen) {
      setMensaje({
        texto: 'El expediente está bloqueado por dictamen emitido; no es posible modificar las firmas.',
        tono: 'alerta',
      })
      return
    }
    const acepta = window.confirm(
      `¿Enviar solicitud de firma a ${firma.nombre} (${firma.rol})? El sello institucional electrónico se aplica al confirmar la solicitud.`
    )
    if (!acepta) return
    setFirmas((previas) =>
      previas.map((item) =>
        item.id === firma.id ? { ...item, firmado: true, solicitada: true } : item
      )
    )
    setMensaje({
      texto: `Solicitud enviada a ${firma.nombre}. Sello institucional electrónico aplicado.`,
      tono: 'exito',
    })
  }

  const aprobarDictamen = () => {
    if (dictamen) {
      setMensaje({
        texto: `El dictamen ${dictamen} ya fue emitido. Cualquier modificación generará un nuevo folio y requerirá aprobación colegiada.`,
        tono: 'info',
      })
      return
    }
    if (!paso3Completado) {
      setMensaje({
        texto: 'No se puede emitir el dictamen: primero confirma la revisión del protocolo de crisis en el paso 3.',
        tono: 'alerta',
      })
      return
    }
    const pendientes = firmas.filter((firma) => !firma.firmado)
    if (pendientes.length > 0) {
      setMensaje({
        texto: `No se puede emitir el dictamen: faltan firmas de ${pendientes
          .map((firma) => firma.rol)
          .join(', ')}.`,
        tono: 'alerta',
      })
      return
    }
    const acepta = window.confirm(
      `¿Confirma emitir y firmar el dictamen oficial con folio ${folioExpedienteLegal}? Quedará registrado en el libro de Reportes Oficiales y el expediente se bloqueará para edición.`
    )
    if (!acepta) return
    setDictamen(folioExpedienteLegal)
    setMensaje({
      texto: `Dictamen emitido y registrado en el libro de Reportes Oficiales con el folio ${folioExpedienteLegal}.`,
      tono: 'exito',
    })
  }

  const continuarPaso3 = () => {
    const acepta = window.confirm(
      '¿Confirmas que el protocolo de crisis sensorial fue revisado y está listo para continuar con acuerdos y firmas legales?'
    )
    if (!acepta) return
    setPaso3Completado(true)
    setMensaje({
      texto: 'Protocolo de crisis revisado. Paso 3 marcado como completado.',
      tono: 'exito',
    })
    cambiarPaso(4)
  }

  const imprimirProtocolo = () => {
    setMensaje({
      texto: 'Se prepara la versión imprimible del protocolo. La información clínica sensible se omite en el documento.',
      tono: 'info',
    })
    window.print()
  }

  const descargarExpediente = () => {
    setMensaje({
      texto: 'Se prepara el expediente completo foliado en formato imprimible. La descarga digital firmada está pendiente de integración.',
      tono: 'info',
    })
    window.print()
  }

  const avisar = (texto: string) => {
    setMensaje({ texto, tono: 'info' })
  }

  const pasosCompletados = [1, 2, ...(paso3Completado ? [3] : []), ...(dictamen ? [4] : [])]

  const verLog = () => {
    setMensaje({
      texto: `Bitácora multidisciplinar: ${ultimaRevision.titulo} — ${ultimaRevision.detalle}.`,
      tono: 'info',
    })
  }

  return (
    <PsicologiaTemplate
      rol={rolPsicologia}
      vista={vistaExpediente}
      activeKey='expedientes'
      onNavigate={navegar}
      hojaImpresion={
        <PrintFichaDUA
          alumno={alumno}
          grupos={gruposMaterias}
          firmas={firmas}
          ciclo={cicloEscolar}
          folio={dictamen}
        />
      }
    >
      <MigasExpediente
        migas={migas}
        estadoValidacion={dictamen ? 'emitido' : 'vigente'}
        textoValidacion={dictamen ? validacion.emitido : validacion.vigente}
      />

      {mensaje ? <MensajeEstado tono={mensaje.tono}>{mensaje.texto}</MensajeEstado> : null}

      <EncabezadoAlumno
        alumno={alumno}
        onGuardarBorrador={guardarBorrador}
        onImprimir={() => window.print()}
        onAprobar={aprobarDictamen}
        dictamenEmitido={Boolean(dictamen)}
        borrador={borrador}
        ampliado={pasoActivo === 3 || pasoActivo === 4}
        acciones={
          pasoActivo === 3 ? (
            <>
              <button
                type='button'
                onClick={guardarBorrador}
                className='inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-field)] px-3.5 text-[12.5px] font-bold'
              >
                <Icon name='save' size={16} color='currentColor' className='shrink-0' />
                Guardar Borrador
              </button>
              <button
                type='button'
                onClick={imprimirProtocolo}
                className='inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[var(--sa-sky)] px-3.5 text-[12.5px] font-bold text-[var(--sa-steel)] transition hover:brightness-95'
              >
                <Icon name='printer' size={16} color='currentColor' className='shrink-0' />
                Imprimir Protocolo
              </button>
              <button
                type='button'
                onClick={continuarPaso3}
                className='inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[var(--color-forest)] px-3.5 text-[12.5px] font-bold text-[var(--sa-on-accent)] transition hover:brightness-95'
              >
                Siguiente Paso
                <Icon name='arrow-right' size={16} color='currentColor' className='shrink-0' />
              </button>
            </>
          ) : pasoActivo === 4 ? (
            <>
              <button
                type='button'
                onClick={descargarExpediente}
                className='inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-field)] px-3.5 text-[12.5px] font-bold'
              >
                <Icon name='download' size={16} color='currentColor' className='shrink-0' />
                Descargar Expediente Completo Foliado
              </button>
              <button
                type='button'
                onClick={aprobarDictamen}
                disabled={Boolean(dictamen)}
                className='inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[var(--color-forest)] px-3.5 text-[12.5px] font-bold text-[var(--sa-on-accent)] transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70'
              >
                <Icon name='circle-check' size={16} color='currentColor' className='shrink-0' />
                {dictamen ? 'Dictamen Emitido' : 'Emitir y Firmar Dictamen Oficial SEE'}
              </button>
            </>
          ) : undefined
        }
      />

      <PasosExpediente
        pasos={pasosExpediente}
        activo={pasoActivo}
        onCambiar={cambiarPaso}
        completados={pasosCompletados}
        mostrarEtiquetaActivo={pasoActivo === 3}
      />

      <div className='grid grid-cols-1 items-start gap-5 min-[1100px]:grid-cols-[minmax(0,1fr)_clamp(280px,26vw,340px)]'>
        <div className='flex min-w-0 flex-col gap-4'>
          <section
            id='panel-paso-1'
            role='tabpanel'
            aria-labelledby='tab-paso-1'
            className={pasoActivo === 1 ? 'flex flex-col gap-4' : 'hidden'}
          >
            <ResumenDiagnosticoCard resumen={resumenDiagnostico} />
            <BarrerasBAPSection barreras={barrerasBAP} />
            <FortalezasYPerfil fortalezas={fortalezasBAP} perfil={perfilCognitivo} />
            <HistorialIntervencionesSection historial={historialIntervenciones} />
            <BarraAccionesPaso1
              estado='Expediente en integración · Pendiente de revisión'
              onRevisarDiagnostico={() => setMensaje({ texto: 'Se abre la documentación oficial externa para revisión.', tono: 'info' })}
              onContinuarPaso2={() => cambiarPaso(2)}
            />
          </section>
          <section
            id='panel-paso-2'
            role='tabpanel'
            aria-labelledby='tab-paso-2'
            className={pasoActivo === 2 ? 'flex flex-col gap-4' : 'hidden'}
          >
            <Paso2PautasAjustes />
          </section>
          <section
            id='panel-paso-3'
            role='tabpanel'
            aria-labelledby='tab-paso-3'
            className={pasoActivo === 3 ? 'flex flex-col gap-4' : 'hidden'}
          >
            <Paso3ProtocoloCrisis onAviso={avisar} bloqueado={Boolean(dictamen)} />
          </section>
          <section
            id='panel-paso-4'
            role='tabpanel'
            aria-labelledby='tab-paso-4'
            className={pasoActivo === 4 ? 'flex flex-col gap-4' : 'hidden'}
          >
            <Paso4AcuerdosFirmas
              firmas={firmas}
              onSolicitarFirma={solicitarFirma}
              onAviso={avisar}
              bloqueado={Boolean(dictamen)}
            />
          </section>
        </div>

        <aside className='flex min-w-0 flex-col gap-4'>
          {pasoActivo === 3 ? (
            <AsidePaso3 onAviso={avisar} />
          ) : pasoActivo === 4 ? (
            <AsidePaso4 onAviso={avisar} />
          ) : (
            <>
              <TarjetaAvanceAdaptacion indicadores={indicadoresAvance} tasa={tasaDesescalada} />
              <TarjetaContactos contactos={contactos} />
              <TarjetaMetasPEI metas={metasPEI} />
              <TarjetaUltimaRevision
                titulo={ultimaRevision.titulo}
                detalle={ultimaRevision.detalle}
                accion={ultimaRevision.accion}
                onVerLog={verLog}
              />
            </>
          )}
        </aside>
      </div>
    </PsicologiaTemplate>
  )
}
