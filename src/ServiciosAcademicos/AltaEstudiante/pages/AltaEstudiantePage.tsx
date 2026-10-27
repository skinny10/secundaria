import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { roles } from '../../../Portal/shared/constants/roles'
import type { SidebarKey } from '../../../Portal/shared/types'
import { ServiciosAcademicosTemplate } from '../../shared/templates/ServiciosAcademicosTemplate'
import { estudiantes as estudiantesBase } from '../../PadronGeneral/constants/padronData'
import { AltaStepper } from '../organisms/AltaStepper'
import { CabeceraPaso, EncabezadoAlta, BarraProgresoAlta } from '../organisms/EncabezadosAlta'
import { Paso1Identificacion } from '../organisms/Paso1Identificacion'
import { Paso2FamiliaSalud } from '../organisms/Paso2FamiliaSalud'
import { Paso3Diagnostico } from '../organisms/Paso3Diagnostico'
import {
  DialogoConfirmacion,
  DialogoSalida,
} from '../organisms/DialogosAlta'
import { ExitoAlta, ComprobanteAlta } from '../organisms/ExitoAlta'
import { AvisoErrores, AvisoInfo } from '../molecules/RetroalimentacionAlta'
import { BotonTexto } from '../molecules/AccionesAlta'
import { altaConfig } from '../constants/altaConfig'
import {
  dialogosAlta,
  erroresAlta,
  textosPaso2,
  textosPaso3,
} from '../constants/altaContent'
import {
  crearBorrador,
  crearResumenRegistro,
  finalizarAlta,
  guardarBorrador,
  obtenerBorrador,
} from '../services/altaRepository'
import { renapoService } from '../services/renapoService'
import { useEstudiantesAlta } from '../hooks/useEstudiantesAlta'
import {
  idCampo,
  primerPasoConError,
  validarAlta,
  validarPaso,
} from '../validation/altaSchema'
import type {
  AltaBorrador,
  ErrorAlta,
  RegistroAltaResultado,
  ResumenRegistro,
} from '../types'

type Paso = 1 | 2 | 3

interface RutaAlta {
  id?: string
  paso: Paso
  explicito: boolean
}

const HASH_ALTA = '#servicios-academicos/alta'

function leerRutaAlta(): RutaAlta {
  const hash = window.location.hash.replace('#', '')
  const [ruta, consulta = ''] = hash.split('?')
  const segmentos = ruta.split('/')
  if (segmentos[0] !== 'servicios-academicos' || segmentos[1] !== 'alta') {
    return { paso: 1, explicito: false }
  }
  const id = segmentos[2] ? decodeURIComponent(segmentos[2]) : undefined
  const parametros = new URLSearchParams(consulta)
  const valor = Number(parametros.get('paso'))
  const paso = valor === 2 || valor === 3 || valor === 1 ? (valor as Paso) : 1
  return { id, paso, explicito: parametros.has('paso') }
}

function horaActual(): string {
  return new Date().toLocaleTimeString('es-MX', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function nombreEstudiante(draft: AltaBorrador): string {
  return [
    draft.identificacion.nombres,
    draft.identificacion.apellidoPaterno,
    draft.identificacion.apellidoMaterno,
  ]
    .filter(Boolean)
    .join(' ')
}

function erroresVerificacionCurp(draft: AltaBorrador): ErrorAlta[] {
  if (draft.identificacion.curp.length !== 18) return []
  if (draft.identificacion.curpVerificada.estatus === 'certificada') return []
  return [
    {
      campo: 'identificacion.curp',
      mensaje: erroresAlta.curpSinVerificar,
      paso: 1,
    },
  ]
}

export function AltaEstudiantePage() {
  const { estudiantes: estudiantesAlta } = useEstudiantesAlta()
  const [draft, setDraft] = useState<AltaBorrador | null>(null)
  const draftRef = useRef<AltaBorrador | null>(null)
  const versionRef = useRef(0)
  const colaGuardadoRef = useRef<Promise<boolean>>(Promise.resolve(true))
  const guardandoContadorRef = useRef(0)
  const sucioRef = useRef(false)
  const iniciadoRef = useRef(false)
  const saliendoRef = useRef(false)
  const [paso, setPaso] = useState<Paso>(1)
  const [completados, setCompletados] = useState<number[]>([])
  const [errores, setErrores] = useState<ErrorAlta[]>([])
  const [cargando, setCargando] = useState(true)
  const [errorCarga, setErrorCarga] = useState<string | null>(null)
  const [verificando, setVerificando] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [guardadoMensaje, setGuardadoMensaje] = useState<string>()
  const [sucio, setSucio] = useState(false)
  const [errorGuardado, setErrorGuardado] = useState<string | null>(null)
  const [salidaPendiente, setSalidaPendiente] = useState<(() => void) | null>(null)
  const [errorSalida, setErrorSalida] = useState<string | null>(null)
  const [confirmarDialogo, setConfirmarDialogo] = useState(false)
  const [registrando, setRegistrando] = useState(false)
  const [errorRegistro, setErrorRegistro] = useState<string | null>(null)
  const [resultado, setResultado] = useState<RegistroAltaResultado | null>(null)
  const [resumenFinal, setResumenFinal] = useState<ResumenRegistro | null>(null)
  const [intentoCarga, setIntentoCarga] = useState(0)

  const marcarSucio = useCallback((valor: boolean) => {
    sucioRef.current = valor
    setSucio(valor)
  }, [])

  useEffect(() => {
    if (iniciadoRef.current) return
    iniciadoRef.current = true
    const iniciar = async () => {
      setCargando(true)
      setErrorCarga(null)
      try {
        const ruta = leerRutaAlta()
        let borrador = ruta.id ? await obtenerBorrador(ruta.id) : null
        if (!borrador) borrador = await crearBorrador()
        const completadosGuardados = borrador.pasosCompletados ?? []
        const solicitado = ruta.explicito ? ruta.paso : borrador.pasoActual
        const pasoInicial = Math.min(Math.max(1, solicitado), 3) as Paso
        draftRef.current = borrador
        setDraft(borrador)
        setCompletados(completadosGuardados)
        setPaso(pasoInicial)
        setGuardadoMensaje(`Borrador cargado · ${horaActual()}`)
        marcarSucio(false)
      } catch {
        setErrorCarga('No fue posible cargar el borrador del alta. Reintente la operación.')
      } finally {
        setCargando(false)
      }
    }
    void iniciar()
  }, [intentoCarga, marcarSucio])

  useEffect(() => {
    if (!draft || saliendoRef.current) return
    const hash = `${HASH_ALTA}/${draft.id}?paso=${paso}`
    if (window.location.hash !== hash) {
      window.history.replaceState(null, '', hash)
    }
  }, [draft, paso])

  useEffect(() => {
    if (!draft || cargando) return
    const temporizador = window.setTimeout(() => {
      const titulo = document.getElementById(
        paso === 1 ? 'alta-titulo-vista' : 'alta-titulo-paso'
      )
      titulo?.focus()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 50)
    return () => window.clearTimeout(temporizador)
  }, [paso, cargando, draft])

  useEffect(() => {
    if (!sucio) return
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', onBeforeUnload)
    return () => window.removeEventListener('beforeunload', onBeforeUnload)
  }, [sucio])

  const persistir = useCallback(
    (borrador: AltaBorrador, mensaje: string): Promise<boolean> => {
      const version = versionRef.current
      guardandoContadorRef.current += 1
      setGuardando(true)
      setErrorGuardado(null)
      const tarea = colaGuardadoRef.current
        .catch(() => false)
        .then(async () => {
          try {
            const guardado = await guardarBorrador(borrador)
            if (versionRef.current === version) {
              draftRef.current = guardado
              setDraft(guardado)
              marcarSucio(false)
              setGuardadoMensaje(`${mensaje} · ${horaActual()}`)
            }
            return true
          } catch {
            setErrorGuardado(
              'No fue posible guardar el borrador. Verifique el almacenamiento del navegador e intente nuevamente.'
            )
            marcarSucio(true)
            return false
          }
        })
        .finally(() => {
          guardandoContadorRef.current -= 1
          if (guardandoContadorRef.current === 0) setGuardando(false)
        })
      colaGuardadoRef.current = tarea
      return tarea
    },
    [marcarSucio]
  )

  useEffect(() => {
    if (!sucio) return
    const temporizador = window.setInterval(() => {
      const actual = draftRef.current
      if (actual) void persistir(actual, dialogosAlta.autoguardado)
    }, altaConfig.autoguardadoMs)
    return () => window.clearInterval(temporizador)
  }, [sucio, persistir])

  useEffect(() => {
    if (errores.length === 0) return
    const temporizador = window.setTimeout(() => {
      enfocarCampo(errores[0].campo)
    }, 90)
    return () => window.clearTimeout(temporizador)
  }, [errores])

  const duplicado = useMemo(() => {
    const curp = draft?.identificacion.curp
    if (!curp || curp.length !== 18) return undefined
    const encontrado = [...estudiantesAlta, ...estudiantesBase].find(
      (estudiante) => estudiante.curp === curp
    )
    if (!encontrado) return undefined
    return {
      id: encontrado.id,
      nombre: `${encontrado.nombre} ${encontrado.apellidos}`.trim(),
      matricula: encontrado.matricula,
    }
  }, [draft?.identificacion.curp, estudiantesAlta])

  const actualizar = useCallback(
    (mutador: (actual: AltaBorrador) => AltaBorrador) => {
      const actual = draftRef.current
      if (!actual) return
      const siguiente = mutador(actual)
      versionRef.current += 1
      draftRef.current = siguiente
      setDraft(siguiente)
      setErrores([])
      setErrorGuardado(null)
      marcarSucio(true)
      setGuardadoMensaje(undefined)
    },
    [marcarSucio]
  )

  const verificarCurp = async () => {
    const actual = draftRef.current
    if (!actual) return
    const curp = actual.identificacion.curp
    if (curp.length !== 18) return
    setVerificando(true)
    const respuesta = await renapoService.verify(curp)
    const vigente = draftRef.current
    if (!vigente || vigente.identificacion.curp !== curp) {
      setVerificando(false)
      return
    }
    const verificado: AltaBorrador = {
      ...vigente,
      identificacion: {
        ...vigente.identificacion,
        curpVerificada: {
          estatus: respuesta.estatus,
          fecha: new Date().toISOString(),
          mensaje: respuesta.mensaje,
        },
      },
      documentos:
        respuesta.estatus === 'certificada'
          ? vigente.documentos.map((documento) =>
              documento.id === 'curp'
                ? { ...documento, recibido: true, estado: 'validado' as const }
                : documento
            )
          : vigente.documentos,
    }
    versionRef.current += 1
    draftRef.current = verificado
    setDraft(verificado)
    marcarSucio(true)
    setGuardadoMensaje(undefined)
    setErrores([])
    setVerificando(false)
  }

  const continuar = async () => {
    const actual = draftRef.current
    if (!actual) return
    const encontrados = [
      ...erroresVerificacionCurp(actual),
      ...validarPaso(actual, paso, { curpDuplicadaId: duplicado?.id }),
    ]
    if (encontrados.length > 0) {
      setErrores(encontrados)
      return
    }
    if (paso === 3) return
    const siguiente = (paso + 1) as Paso
    const siguientesCompletados = Array.from(new Set([...completados, paso])).sort()
    const actualizado: AltaBorrador = {
      ...actual,
      pasoActual: siguiente,
      pasosCompletados: siguientesCompletados,
    }
    versionRef.current += 1
    draftRef.current = actualizado
    setDraft(actualizado)
    const guardado = await persistir(actualizado, dialogosAlta.guardadoProgreso)
    if (guardado) {
      setCompletados(siguientesCompletados)
      setPaso(siguiente)
      setErrores([])
    }
  }

  const irAPaso = async (destino: number) => {
    if (destino === paso || destino < 1 || destino > 3) return
    const actual = draftRef.current
    if (!actual) return
    const actualizado: AltaBorrador = { ...actual, pasoActual: destino }
    versionRef.current += 1
    draftRef.current = actualizado
    setDraft(actualizado)
    const guardado = await persistir(actualizado, dialogosAlta.guardadoProgreso)
    if (guardado) {
      setPaso(destino as Paso)
      setErrores([])
    }
  }

  const volver = async () => {
    if (paso === 1) return
    const destino = (paso - 1) as Paso
    const actual = draftRef.current
    if (!actual) return
    const actualizado: AltaBorrador = { ...actual, pasoActual: destino }
    versionRef.current += 1
    draftRef.current = actualizado
    setDraft(actualizado)
    const guardado = await persistir(actualizado, dialogosAlta.guardadoProgreso)
    if (guardado) {
      setPaso(destino)
      setErrores([])
    }
  }

  const guardarManual = async () => {
    const actual = draftRef.current
    if (!actual) return
    await persistir(actual, dialogosAlta.guardado)
  }

  const solicitarSalida = useCallback((accion: () => void) => {
    const ejecutar = () => {
      saliendoRef.current = true
      accion()
    }
    if (sucioRef.current) {
      setErrorSalida(null)
      setSalidaPendiente(() => ejecutar)
      return
    }
    ejecutar()
  }, [])

  const navegar = (key: SidebarKey) => {
    if (key === 'alta') return
    const elemento = roles.servicios_academicos.navItems.find((item) => item.key === key)
    const hash = elemento?.hash ?? '#servicios-academicos/padron'
    solicitarSalida(() => {
      window.location.hash = hash
    })
  }

  const irAlPadron = () => {
    solicitarSalida(() => {
      window.location.hash = '#servicios-academicos/padron'
    })
  }

  const guardarYSalir = async () => {
    const actual = draftRef.current
    if (!actual) return
    setErrorSalida(null)
    saliendoRef.current = true
    const guardado = await persistir(actual, dialogosAlta.guardado)
    if (!guardado) {
      saliendoRef.current = false
      setErrorSalida(
        'No fue posible guardar el borrador. Puede reintentar o salir sin guardar los cambios de esta sesión.'
      )
      return
    }
    const accion = salidaPendiente
    setSalidaPendiente(null)
    marcarSucio(false)
    accion?.()
  }

  const descartarYSalir = () => {
    const accion = salidaPendiente
    saliendoRef.current = true
    setSalidaPendiente(null)
    setErrorSalida(null)
    marcarSucio(false)
    accion?.()
  }

  const solicitarRegistro = () => {
    const actual = draftRef.current
    if (!actual) return
    let encontrados = [
      ...erroresVerificacionCurp(actual),
      ...validarAlta(actual, { curpDuplicadaId: duplicado?.id }),
    ]
    encontrados = Array.from(
      new Map(encontrados.map((error) => [error.campo, error])).values()
    )
    if (encontrados.length > 0) {
      setErrores(encontrados)
      const pasoError = primerPasoConError(encontrados)
      if (pasoError !== paso) setPaso(pasoError)
      return
    }
    setErrorRegistro(null)
    setConfirmarDialogo(true)
  }

  const confirmarRegistro = async () => {
    const actual = draftRef.current
    if (!actual) return
    setRegistrando(true)
    setErrorRegistro(null)
    try {
      const resumen = crearResumenRegistro(actual)
      const guardado = await persistir(
        { ...actual, pasoActual: 3 },
        dialogosAlta.guardadoProgreso
      )
      if (!guardado) {
        setErrorRegistro(
          'No fue posible guardar la versión final del borrador. Intente nuevamente.'
        )
        return
      }
      const registro = await finalizarAlta(actual.id)
      setResumenFinal(resumen)
      setResultado(registro)
      setConfirmarDialogo(false)
      setCompletados([1, 2, 3])
      setErrores([])
      marcarSucio(false)
      window.history.replaceState(null, '', HASH_ALTA)
    } catch {
      setErrorRegistro(dialogosAlta.errorRegistro)
    } finally {
      setRegistrando(false)
    }
  }

  const registrarOtro = async () => {
    try {
      const nuevo = await crearBorrador()
      versionRef.current = 0
      draftRef.current = nuevo
      setDraft(nuevo)
      setResultado(null)
      setResumenFinal(null)
      setPaso(1)
      setCompletados([])
      setErrores([])
      setErrorRegistro(null)
      setErrorGuardado(null)
      setGuardadoMensaje(`Borrador nuevo · ${horaActual()}`)
      marcarSucio(false)
      window.history.replaceState(
        null,
        '',
        `${HASH_ALTA}/${nuevo.id}?paso=1`
      )
    } catch {
      setErrorCarga('No fue posible crear un nuevo borrador. Reintente la operación.')
    }
  }

  const vista = resultado
    ? 'ALTA DE ALUMNO (REGISTRO COMPLETADO)'
    : `ALTA DE ALUMNO (PASO ${paso}: ${altaConfig.pasos[paso - 1].label.toUpperCase()})`
  const resumenConfirmacion = draft ? crearResumenRegistro(draft) : null

  return (
    <ServiciosAcademicosTemplate
      vista={vista}
      activeKey='alta'
      onNavigate={navegar}
      hojaImpresion={
        resultado && resumenFinal ? (
          <ComprobanteAlta resultado={resultado} resumen={resumenFinal} />
        ) : undefined
      }
    >
      {cargando ? (
        <div
          role='status'
          aria-live='polite'
          className='flex min-h-[420px] w-full min-w-0 flex-col items-center justify-center gap-3 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-6 text-center shadow-[var(--shadow-sm)]'
        >
          <Icon
            name='refresh'
            size={28}
            color='var(--color-forest)'
            className='animate-spin'
          />
          <p className='text-[15px] font-semibold'>Cargando borrador del alta…</p>
        </div>
      ) : errorCarga ? (
        <div className='flex min-h-[380px] w-full min-w-0 flex-col items-center justify-center gap-3 rounded-2xl border border-[var(--sa-danger)] bg-[var(--sa-card)] p-6 text-center shadow-[var(--shadow-sm)]'>
          <Icon name='alert-triangle' size={30} color='var(--sa-danger)' />
          <h1 className='text-[22px] font-extrabold'>No se pudo abrir el alta</h1>
          <p className='max-w-md text-[14px] text-[var(--sa-muted)]'>{errorCarga}</p>
          <BotonTexto
            icono='refresh'
            onClick={() => {
              iniciadoRef.current = false
              setCargando(true)
              setErrorCarga(null)
              setIntentoCarga((valor) => valor + 1)
            }}
          >
            Reintentar
          </BotonTexto>
        </div>
      ) : resultado && resumenFinal ? (
        <ExitoAlta
          resultado={resultado}
          resumen={resumenFinal}
          onPadron={() => {
            window.location.hash = '#servicios-academicos/padron'
          }}
          onRegistrarOtro={() => {
            void registrarOtro()
          }}
          onImprimir={() => window.print()}
        />
      ) : draft ? (
        <>
          {paso === 1 ? (
            <EncabezadoAlta />
          ) : paso === 2 ? (
            <CabeceraPaso
              numero={2}
              etiqueta={textosPaso2.etiqueta}
              titulo='Información del Tutor Legal y Datos Clínicos Básicos'
              linea={textosPaso2.estudiante(
                nombreEstudiante(draft),
                draft.matriculaProvisional
              )}
              icono='users'
              chip='Protección LGDNNA'
            />
          ) : (
            <CabeceraPaso
              numero={3}
              etiqueta={textosPaso3.etiqueta}
              titulo='Diagnóstico, Documentación y Canalización'
              descripcion={textosPaso3.descripcion}
              linea={textosPaso2.estudiante(
                nombreEstudiante(draft),
                draft.matriculaProvisional
              )}
              icono='brain'
              chip='Protección LGDNNA'
            />
          )}

          <div className='flex w-full min-w-0 flex-col gap-2'>
            <AltaStepper
              activo={paso}
              completados={completados}
              onIr={(destino) => {
                void irAPaso(destino)
              }}
            />
            <BarraProgresoAlta activo={paso} />
          </div>

          <AvisoErrores
            errores={errores}
            onCampo={enfocarCampo}
            mensaje={
              errores.length > 0 && primerPasoConError(errores) !== paso
                ? 'Hay errores en otro paso del formulario'
                : erroresAlta.errorResumen
            }
          />

          {errorGuardado ? (
            <AvisoInfo
              tono='advertencia'
              titulo='No se guardó el borrador'
              accion={
                <BotonTexto icono='refresh' onClick={() => void guardarManual()}>
                  Reintentar
                </BotonTexto>
              }
            >
              {errorGuardado}
            </AvisoInfo>
          ) : null}

          {paso === 1 ? (
            <Paso1Identificacion
              draft={draft}
              errores={errores}
              verificando={verificando}
              duplicado={duplicado}
              guardando={guardando}
              sucio={sucio}
              guardadoMensaje={guardadoMensaje}
              onCambio={actualizar}
              onVerificarCurp={() => void verificarCurp()}
              onVerExpediente={irAlPadron}
              onGuardar={() => void guardarManual()}
              onContinuar={() => void continuar()}
            />
          ) : paso === 2 ? (
            <Paso2FamiliaSalud
              draft={draft}
              errores={errores}
              guardando={guardando}
              sucio={sucio}
              guardadoMensaje={guardadoMensaje}
              onCambio={actualizar}
              onVolver={() => void volver()}
              onGuardar={() => void guardarManual()}
              onContinuar={() => void continuar()}
            />
          ) : (
            <Paso3Diagnostico
              draft={draft}
              errores={errores}
              guardando={guardando}
              sucio={sucio}
              guardadoMensaje={guardadoMensaje}
              onCambio={actualizar}
              onVolver={() => void volver()}
              onFinalizar={solicitarRegistro}
            />
          )}
        </>
      ) : null}

      {salidaPendiente ? (
        <DialogoSalida
          guardando={guardando}
          error={errorSalida ?? undefined}
          onCancelar={() => {
            setSalidaPendiente(null)
            setErrorSalida(null)
          }}
          onDescartar={descartarYSalir}
          onGuardar={() => void guardarYSalir()}
        />
      ) : null}

      {confirmarDialogo && resumenConfirmacion ? (
        <DialogoConfirmacion
          resumen={resumenConfirmacion}
          registrando={registrando}
          error={errorRegistro ?? undefined}
          onRevisar={() => {
            setConfirmarDialogo(false)
            setErrorRegistro(null)
          }}
          onConfirmar={() => void confirmarRegistro()}
        />
      ) : null}
    </ServiciosAcademicosTemplate>
  )
}

function enfocarCampo(campo: string) {
  const exacto = document.getElementById(idCampo(campo))
  const porDato = document.querySelector<HTMLElement>(`[data-campo="${campo}"]`)
  const objetivo = exacto ?? porDato
  if (!objetivo) return
  objetivo.focus()
  objetivo.scrollIntoView({ block: 'center', behavior: 'smooth' })
}
