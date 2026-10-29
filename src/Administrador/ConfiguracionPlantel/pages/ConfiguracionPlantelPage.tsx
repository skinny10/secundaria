import { useEffect, useMemo, useState } from 'react'
import { AdministradorTemplate } from '../../shared/templates/AdministradorTemplate'
import { useAdminNavigation } from '../../shared/hooks/useAdminNavigation'
import { Icon } from '../../../utils/atoms/Icon'
import { ACTOR_ADMIN, configInicial } from '../constants/configInicial'
import { useConfiguracionPlantel } from '../hooks/useConfiguracionPlantel'
import { listarCambios } from '../utils/diff'
import { seccionDeRuta } from '../utils/validacion'
import type { SeccionConfigId } from '../types'
import { ConfigHeader } from '../molecules/ConfigHeader'
import { ConfigTabs } from '../molecules/ConfigTabs'
import { TarjetaIdentificacion } from '../molecules/TarjetaIdentificacion'
import { TarjetaDirector } from '../molecules/TarjetaDirector'
import { TarjetaCalendario } from '../molecules/TarjetaCalendario'
import { TarjetaJornadas } from '../molecules/TarjetaJornadas'
import { TarjetaIntervalos } from '../molecules/TarjetaIntervalos'
import { TarjetaEspacios } from '../molecules/TarjetaEspacios'
import { TarjetaCapacidadesDUA } from '../molecules/TarjetaCapacidadesDUA'
import { TarjetaProtocolos } from '../molecules/TarjetaProtocolos'
import { BarraGuardado } from '../molecules/BarraGuardado'
import { ModalConfiguracion } from '../organisms/ModalConfiguracion'
import type { ModoModal } from '../organisms/ModalConfiguracion'
import { registrarBloqueoConfiguracion } from '../services/plantelConfigStore'

function puedeConfigurarPlantel(): boolean {
  if (typeof window === 'undefined') return true
  try {
    const raw =
      window.localStorage.getItem('nexusedu:session') ??
      window.sessionStorage.getItem('nexusedu:session')
    if (!raw) return true
    const sesion = JSON.parse(raw) as { user?: { role?: string } }
    const rol = sesion?.user?.role
    return !rol || rol === 'directivo'
  } catch {
    return true
  }
}

interface Mensaje {
  tipo: 'exito' | 'error'
  texto: string
}

export function ConfiguracionPlantelPage() {
  const permitido = useMemo(() => puedeConfigurarPlantel(), [])
  const navegarAdmin = useAdminNavigation()
  const {
    config,
    guardado,
    setConfig,
    seccion,
    setSeccion,
    errores,
    cambios,
    sinGuardar,
    validandoCCT,
    verificarCCT,
    descartar,
    guardar,
    restaurar,
  } = useConfiguracionPlantel()

  const [modal, setModal] = useState<ModoModal | null>(null)
  const [mensaje, setMensaje] = useState<Mensaje | null>(null)

  const erroresPorSeccion = useMemo(() => {
    const conteo: Record<SeccionConfigId, number> = { datos: 0, calendario: 0, turnos: 0, dua: 0 }
    Object.keys(errores).forEach((ruta) => {
      conteo[seccionDeRuta(ruta)] += 1
    })
    return conteo
  }, [errores])

  const cambiosRestaurar = useMemo(
    () => listarCambios(config, configInicial()),
    [config]
  )

  useEffect(() => {
    if (!permitido) {
      registrarBloqueoConfiguracion(
        'Intento de Acceso a Configuración del Plantel',
        'El rol activo no cuenta con privilegios de Administrador.'
      )
    }
  }, [permitido])

  useEffect(() => {
    if (!sinGuardar) return
    const onBeforeUnload = (evento: BeforeUnloadEvent) => {
      evento.preventDefault()
      evento.returnValue = ''
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [sinGuardar])

  useEffect(() => {
    if (!mensaje || mensaje.tipo !== 'exito') return
    const timer = window.setTimeout(() => setMensaje(null), 7000)
    return () => window.clearTimeout(timer)
  }, [mensaje])

  const navegar = (key: Parameters<typeof navegarAdmin>[0]) => {
    if (sinGuardar && !window.confirm('Hay cambios sin guardar. ¿Desea salir sin aplicarlos?')) {
      return
    }
    navegarAdmin(key)
  }

  const abrirGuardar = () => {
    if (validandoCCT) {
      setMensaje({
        tipo: 'error',
        texto: 'Espere a que termine la validación de la CCT contra el catálogo SEE/SEP.',
      })
      return
    }
    if (!sinGuardar) {
      setMensaje({ tipo: 'error', texto: 'No hay cambios pendientes por guardar.' })
      return
    }
    const rutasError = Object.keys(errores)
    if (rutasError.length > 0) {
      const primera = rutasError[0]
      setSeccion(seccionDeRuta(primera))
      setMensaje({
        tipo: 'error',
        texto: `Corrija ${rutasError.length} campo(s) antes de guardar. Revise la sección marcada.`,
      })
      window.setTimeout(() => document.getElementById(primera)?.focus(), 90)
      return
    }
    setModal('guardar')
  }

  const confirmar = (meta?: Parameters<typeof guardar>[0]) => {
    if (modal === 'guardar' && meta) {
      const siguiente = guardar(meta)
      setMensaje({
        tipo: 'exito',
        texto: `Configuración v${siguiente.version} aplicada y registrada en la bitácora inmutable.`,
      })
    } else if (modal === 'restaurar' && meta) {
      const siguiente = restaurar(meta)
      setSeccion('datos')
      setMensaje({
        tipo: 'exito',
        texto: `Valores por defecto restaurados en la versión v${siguiente.version}. Se notificó a SEE/SEP.`,
      })
    } else if (modal === 'descartar') {
      descartar()
      setMensaje({ tipo: 'exito', texto: 'Cambios descartados. Se restauró la última versión guardada.' })
    }
    setModal(null)
  }

  if (!permitido) {
    return (
      <AdministradorTemplate
        vista='ACCESO RESTRINGIDO'
        activeKey='configuracion'
        onNavigate={navegarAdmin}
        busqueda=''
        onBuscar={() => {}}
      >
        <div className='mx-auto flex w-full max-w-[1100px] flex-col gap-8 px-6 py-16'>
          <div className='rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-8 py-12 text-center shadow-sm'>
            <span className='mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[var(--semaforo-rojo-bg)] text-[var(--semaforo-rojo-fg)]'>
              <Icon name='lock' size={38} aria-hidden='true' />
            </span>
            <p className='mt-5 font-mono text-[20px] font-bold tracking-widest text-[var(--sa-muted)]'>
              ERROR 403
            </p>
            <h1 className='mt-1 text-[42px] font-extrabold text-[var(--sa-text)]'>
              Acceso restringido
            </h1>
            <p className='mx-auto mt-3 max-w-[720px] text-[20px] text-[var(--sa-muted)]'>
              La configuración general del plantel solo puede consultarla o modificarla el rol
              Administrador del Sistema. Solicite elevación de privilegios a la Mesa de Ayuda.
            </p>
            <button
              type='button'
              onClick={() => {
                window.location.hash = '#administrador/directorio'
              }}
              className='mt-7 inline-flex min-h-[56px] items-center gap-2 rounded-xl bg-[var(--color-forest)] px-6 text-[18px] font-bold text-[var(--sa-on-accent)] hover:brightness-95'
            >
              <Icon name='arrow-left' size={20} aria-hidden='true' />
              Volver al directorio
            </button>
          </div>
        </div>
      </AdministradorTemplate>
    )
  }

  return (
    <AdministradorTemplate
      vista='GESTIÓN INSTITUCIONAL Y CONFIGURACIÓN'
      activeKey='configuracion'
      onNavigate={navegar}
      busqueda=''
      onBuscar={() => {}}
    >
      <div className='mx-auto flex w-full max-w-[1900px] flex-col gap-7 px-4 py-6 text-[20px] leading-relaxed sm:px-7 lg:px-10'>
        <ConfigHeader
          config={config}
          sinGuardar={sinGuardar}
          onDescartar={() => {
            if (sinGuardar) setModal('descartar')
          }}
          onGuardar={abrirGuardar}
        />

        {mensaje ? (
          <div
            role={mensaje.tipo === 'error' ? 'alert' : 'status'}
            className={`flex items-start gap-3 rounded-xl px-4 py-3 text-[17px] font-semibold ${
              mensaje.tipo === 'error'
                ? 'bg-[var(--semaforo-rojo-bg)] text-[var(--semaforo-rojo-fg)]'
                : 'bg-[var(--semaforo-verde-bg)] text-[var(--semaforo-verde-fg)]'
            }`}
          >
            <Icon
              name={mensaje.tipo === 'error' ? 'alert-triangle' : 'circle-check'}
              size={20}
              className='mt-0.5 shrink-0'
              aria-hidden='true'
            />
            <p className='min-w-0 flex-1'>{mensaje.texto}</p>
            <button
              type='button'
              onClick={() => setMensaje(null)}
              aria-label='Cerrar mensaje'
              className='shrink-0 rounded p-1 hover:bg-black/10'
            >
              <Icon name='x' size={16} aria-hidden='true' />
            </button>
          </div>
        ) : null}

        <ConfigTabs activa={seccion} onCambiar={setSeccion} erroresPorSeccion={erroresPorSeccion} />

        <div
          id={`panel-${seccion}`}
          role='tabpanel'
          aria-labelledby={`tab-${seccion}`}
          className='flex min-w-0 flex-col'
        >
          {seccion === 'datos' ? (
            <div className='grid grid-cols-1 items-start gap-6 min-[1100px]:grid-cols-2'>
              <TarjetaIdentificacion
                config={config}
                errores={errores}
                onCambio={setConfig}
                onValidarCCT={verificarCCT}
                validandoCCT={validandoCCT}
              />
              <TarjetaDirector config={config} errores={errores} onCambio={setConfig} />
            </div>
          ) : null}

          {seccion === 'calendario' ? (
            <div className='grid grid-cols-1 items-start gap-6'>
              <TarjetaCalendario config={config} errores={errores} onCambio={setConfig} />
            </div>
          ) : null}

          {seccion === 'turnos' ? (
            <div className='grid grid-cols-1 items-start gap-6 min-[1100px]:grid-cols-2'>
              <div className='min-[1100px]:col-span-2'>
                <TarjetaJornadas config={config} errores={errores} onCambio={setConfig} />
              </div>
              <TarjetaIntervalos config={config} errores={errores} onCambio={setConfig} />
              <TarjetaEspacios config={config} errores={errores} onCambio={setConfig} />
            </div>
          ) : null}

          {seccion === 'dua' ? (
            <div className='grid grid-cols-1 items-start gap-6 min-[1100px]:grid-cols-2'>
              <TarjetaCapacidadesDUA config={config} errores={errores} onCambio={setConfig} />
              <TarjetaProtocolos config={config} errores={errores} onCambio={setConfig} />
            </div>
          ) : null}
        </div>

        <BarraGuardado
          config={guardado}
          cantidadCambios={cambios.length}
          onRestaurar={() => setModal('restaurar')}
          onGuardar={abrirGuardar}
        />
      </div>

      {modal ? (
        <ModalConfiguracion
          key={modal}
          modo={modal}
          cambios={modal === 'restaurar' ? cambiosRestaurar : cambios}
          version={config.version}
          actor={ACTOR_ADMIN}
          onCerrar={() => setModal(null)}
          onConfirmar={confirmar}
        />
      ) : null}
    </AdministradorTemplate>
  )
}
