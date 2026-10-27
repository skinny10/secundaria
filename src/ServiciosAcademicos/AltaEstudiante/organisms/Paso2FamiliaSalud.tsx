import { useEffect, useRef, useState } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import type { IconName } from '../../../utils/types'
import {
  altaConfig,
  institucionesSalud,
  parentescos,
} from '../constants/altaConfig'
import { textosPaso2 } from '../constants/altaContent'
import {
  CampoAlta,
  GrupoAlta,
  SelectConIcono,
  clasesInput,
} from '../molecules/CamposAlta'
import { descripcionCampo } from '../molecules/campoUtils'
import { SeccionAlta } from '../molecules/SeccionAlta'
import { TarjetaRadio } from '../molecules/TarjetasSeleccion'
import { AvisoInfo, EstadoGuardado } from '../molecules/RetroalimentacionAlta'
import {
  BarraAccionesAlta,
  BotonPrimario,
  BotonSecundario,
  BotonTexto,
} from '../molecules/AccionesAlta'
import {
  detectarSugerencias,
  formatearNssImss,
  formatearTelefono,
  normalizarCorreo,
  permisoParaSugerencia,
  soloDigitos,
} from '../utils/salud'
import { idCampo } from '../validation/altaSchema'
import type { AltaBorrador, ErrorAlta } from '../types'

interface Paso2Props {
  draft: AltaBorrador
  errores: ErrorAlta[]
  guardando: boolean
  sucio: boolean
  guardadoMensaje?: string
  onCambio: (mutador: (draft: AltaBorrador) => AltaBorrador) => void
  onVolver: () => void
  onGuardar: () => void
  onContinuar: () => void
}

function iconoSugerencia(sugerencia: string): IconName {
  if (sugerencia.includes('Auriculares')) return 'headphones'
  if (sugerencia.includes('Filtro')) return 'sun'
  return 'armchair'
}

export function Paso2FamiliaSalud({
  draft,
  errores,
  guardando,
  sucio,
  guardadoMensaje,
  onCambio,
  onVolver,
  onGuardar,
  onContinuar,
}: Paso2Props) {
  const [sugerenciasDetectadas, setSugerenciasDetectadas] = useState<string[]>([])
  const [descartadas, setDescartadas] = useState<string[]>([])
  const [anuncio, setAnuncio] = useState('')
  const anuncioRef = useRef<number | null>(null)
  const errorDe = (campo: string) => errores.find((error) => error.campo === campo)?.mensaje
  const institucion = institucionesSalud.find(
    (opcion) => opcion.value === draft.salud.institucion
  )
  const errorInstitucion = errorDe('salud.institucion')
  const errorNss = errorDe('salud.nss')
  const errorAlergias = errorDe('salud.alergias')

  useEffect(() => {
    const temporizador = window.setTimeout(() => {
      const detectadas = detectarSugerencias(draft.salud.alergias).filter(
        (sugerencia) =>
          !descartadas.includes(sugerencia) && !draft.salud.sugerencias.includes(sugerencia)
      )
      setSugerenciasDetectadas(detectadas)
    }, 220)
    return () => window.clearTimeout(temporizador)
  }, [draft.salud.alergias, draft.salud.sugerencias, descartadas])

  useEffect(
    () => () => {
      if (anuncioRef.current) window.clearTimeout(anuncioRef.current)
    },
    []
  )

  const anunciar = (texto: string) => {
    setAnuncio(texto)
    if (anuncioRef.current) window.clearTimeout(anuncioRef.current)
    anuncioRef.current = window.setTimeout(() => setAnuncio(''), 3200)
  }

  const actualizarTutor = (
    campo: keyof AltaBorrador['tutor'],
    valor: string
  ) => {
    onCambio((actual) => ({ ...actual, tutor: { ...actual.tutor, [campo]: valor } }))
  }

  const actualizarSalud = (campo: keyof AltaBorrador['salud'], valor: string | string[]) => {
    onCambio((actual) => ({ ...actual, salud: { ...actual.salud, [campo]: valor } }))
  }

  const agregarSugerencia = (sugerencia: string) => {
    onCambio((actual) => ({
      ...actual,
      salud: {
        ...actual.salud,
        sugerencias: actual.salud.sugerencias.includes(sugerencia)
          ? actual.salud.sugerencias
          : [...actual.salud.sugerencias, sugerencia],
      },
    }))
    anunciar(`Sugerencia añadida: ${sugerencia}`)
  }

  const quitarSugerencia = (sugerencia: string) => {
    onCambio((actual) => ({
      ...actual,
      salud: {
        ...actual.salud,
        sugerencias: actual.salud.sugerencias.filter((item) => item !== sugerencia),
      },
    }))
    anunciar(`Sugerencia descartada: ${sugerencia}`)
  }

  return (
    <div className='flex w-full min-w-0 flex-col gap-4'>
      <p className='sr-only' role='status' aria-live='polite'>
        {anuncio}
      </p>

      <SeccionAlta
        titulo={textosPaso2.secciones.tutor.titulo}
        subtitulo={textosPaso2.secciones.tutor.subtitulo}
        icono='users'
        chip={
          <span className='rounded-full border border-[var(--sa-border)] bg-[var(--sa-card)] px-2.5 py-1 text-[10px] font-extrabold tracking-[0.05em] text-[var(--sa-coffee)] uppercase'>
            {textosPaso2.secciones.tutor.chip}
          </span>
        }
      >
        <div className='grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2'>
          <CampoAlta
            id={idCampo('tutor.nombre')}
            etiqueta={textosPaso2.campos.nombreTutor}
            requerido
            icono='users'
            ayuda={textosPaso2.campos.ayudaNombreTutor}
            error={errorDe('tutor.nombre')}
            className='sm:col-span-2'
          >
            <input
              id={idCampo('tutor.nombre')}
              data-campo='tutor.nombre'
              value={draft.tutor.nombre}
              onChange={(event) => actualizarTutor('nombre', event.target.value)}
              autoComplete='off'
              aria-invalid={Boolean(errorDe('tutor.nombre'))}
              aria-describedby={descripcionCampo(
                idCampo('tutor.nombre'),
                textosPaso2.campos.ayudaNombreTutor,
                errorDe('tutor.nombre')
              )}
              className={clasesInput}
            />
          </CampoAlta>

          <CampoAlta
            id={idCampo('tutor.parentesco')}
            etiqueta={textosPaso2.campos.parentesco}
            requerido
            error={errorDe('tutor.parentesco')}
          >
            <SelectConIcono
              id={idCampo('tutor.parentesco')}
              value={draft.tutor.parentesco}
              onChange={(valor) => actualizarTutor('parentesco', valor)}
              invalid={Boolean(errorDe('tutor.parentesco'))}
              ariaDescribedBy={descripcionCampo(
                idCampo('tutor.parentesco'),
                undefined,
                errorDe('tutor.parentesco')
              )}
            >
              <option value=''>Seleccione el parentesco</option>
              {parentescos.map((opcion) => (
                <option key={opcion.value} value={opcion.value}>
                  {opcion.label}
                </option>
              ))}
            </SelectConIcono>
          </CampoAlta>

          <CampoAlta
            id={idCampo('tutor.telefono')}
            etiqueta={textosPaso2.campos.telefono}
            requerido
            icono='phone'
            ayuda={textosPaso2.campos.ayudaTelefono}
            error={errorDe('tutor.telefono')}
            extra={
              <span className='text-[10px] font-extrabold tracking-[0.06em] text-[var(--sa-muted)] uppercase'>
                {textosPaso2.campos.telefonoEtiqueta}
              </span>
            }
          >
            <input
              id={idCampo('tutor.telefono')}
              data-campo='tutor.telefono'
              type='tel'
              inputMode='numeric'
              value={draft.tutor.telefono}
              onChange={(event) =>
                actualizarTutor('telefono', formatearTelefono(event.target.value))
              }
              placeholder='961-123-4567'
              autoComplete='off'
              aria-invalid={Boolean(errorDe('tutor.telefono'))}
              aria-describedby={descripcionCampo(
                idCampo('tutor.telefono'),
                textosPaso2.campos.ayudaTelefono,
                errorDe('tutor.telefono')
              )}
              className={cn(clasesInput, 'font-mono tracking-[0.04em]')}
            />
          </CampoAlta>

          <CampoAlta
            id={idCampo('tutor.correo')}
            etiqueta={textosPaso2.campos.correo}
            requerido
            icono='mail'
            ayuda={textosPaso2.campos.ayudaCorreo}
            error={errorDe('tutor.correo')}
          >
            <input
              id={idCampo('tutor.correo')}
              data-campo='tutor.correo'
              type='email'
              inputMode='email'
              value={draft.tutor.correo}
              onChange={(event) => actualizarTutor('correo', event.target.value)}
              onBlur={(event) => actualizarTutor('correo', normalizarCorreo(event.target.value))}
              autoComplete='off'
              aria-invalid={Boolean(errorDe('tutor.correo'))}
              aria-describedby={descripcionCampo(
                idCampo('tutor.correo'),
                textosPaso2.campos.ayudaCorreo,
                errorDe('tutor.correo')
              )}
              className={clasesInput}
            />
          </CampoAlta>

          <CampoAlta
            id={idCampo('tutor.domicilio')}
            etiqueta={textosPaso2.campos.domicilio}
            requerido
            icono='map-pin'
            ayuda={textosPaso2.campos.ayudaDomicilio}
            error={errorDe('tutor.domicilio')}
            className='sm:col-span-2'
          >
            <textarea
              id={idCampo('tutor.domicilio')}
              data-campo='tutor.domicilio'
              value={draft.tutor.domicilio}
              onChange={(event) => actualizarTutor('domicilio', event.target.value)}
              rows={2}
              aria-invalid={Boolean(errorDe('tutor.domicilio'))}
              aria-describedby={descripcionCampo(
                idCampo('tutor.domicilio'),
                textosPaso2.campos.ayudaDomicilio,
                errorDe('tutor.domicilio')
              )}
              className={cn(clasesInput, 'h-auto min-h-[72px] resize-y py-2.5')}
            />
          </CampoAlta>
        </div>
      </SeccionAlta>

      <SeccionAlta
        titulo={textosPaso2.secciones.salud.titulo}
        subtitulo={textosPaso2.secciones.salud.subtitulo}
        icono='briefcase-medical'
        chip={
          <span className='rounded-full bg-[var(--sa-menta-soft)] px-2.5 py-1 text-[10px] font-extrabold tracking-[0.05em] text-[var(--sa-on-menta-soft)] uppercase'>
            {textosPaso2.secciones.salud.chip}
          </span>
        }
      >
        <GrupoAlta
          id={idCampo('salud.institucion')}
          leyenda={textosPaso2.campos.institucion}
          requerido
          icono='shield-check'
          descripcion={textosPaso2.campos.ayudaInstitucion}
          error={errorInstitucion}
        >
          <div className='grid min-w-0 grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3'>
            {institucionesSalud.map((opcion) => (
              <TarjetaRadio
                key={opcion.value}
                id={`${idCampo('salud.institucion')}-${opcion.value}`}
                name='alta-institucion-salud'
                label={opcion.label}
                descripcion={opcion.descripcion}
                icono={opcion.icono}
                checked={draft.salud.institucion === opcion.value}
                onChange={() =>
                  onCambio((actual) => ({
                    ...actual,
                    salud: {
                      ...actual.salud,
                      institucion: opcion.value,
                      nss: opcion.value === 'ninguno' ? '' : actual.salud.nss,
                    },
                  }))
                }
              />
            ))}
          </div>
        </GrupoAlta>

        {institucion && institucion.value !== 'ninguno' ? (
          <div className='grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2'>
            <CampoAlta
              id={idCampo('salud.nss')}
              etiqueta={textosPaso2.campos.nss}
              requerido
              icono='id-card'
              ayuda={textosPaso2.campos.ayudaNss}
              error={errorNss}
              extra={
                <span className='text-[10px] font-extrabold tracking-[0.06em] text-[var(--sa-muted)] uppercase'>
                  {institucion.value === 'imss'
                    ? textosPaso2.campos.nssEtiquetaImss
                    : textosPaso2.campos.nssEtiquetaOtro}
                </span>
              }
            >
              <input
                id={idCampo('salud.nss')}
                data-campo='salud.nss'
                inputMode='numeric'
                value={draft.salud.nss}
                onChange={(event) =>
                  actualizarSalud(
                    'nss',
                    institucion.value === 'imss'
                      ? formatearNssImss(event.target.value)
                      : soloDigitos(event.target.value, 20)
                  )
                }
                placeholder={institucion.value === 'imss' ? '1234-56-7890-1' : 'Identificador de afiliado'}
                aria-invalid={Boolean(errorNss)}
                aria-describedby={descripcionCampo(
                  idCampo('salud.nss'),
                  textosPaso2.campos.ayudaNss,
                  errorNss
                )}
                className={cn(clasesInput, 'font-mono tracking-[0.04em]')}
              />
            </CampoAlta>
          </div>
        ) : institucion?.value === 'ninguno' ? (
          <AvisoInfo>
            Sin seguridad social. En una emergencia se activará el protocolo de traslado
            al Hospital Civil más cercano.
          </AvisoInfo>
        ) : null}

        <CampoAlta
          id={idCampo('salud.clinica')}
          etiqueta={textosPaso2.campos.clinica}
          icono='briefcase-medical'
          ayuda={textosPaso2.campos.ayudaClinica}
          extra={
            <span className='text-[10px] font-extrabold tracking-[0.06em] text-[var(--sa-muted)] uppercase'>
              {textosPaso2.campos.clinicaEtiqueta}
            </span>
          }
        >
          <input
            id={idCampo('salud.clinica')}
            data-campo='salud.clinica'
            value={draft.salud.clinica}
            onChange={(event) => actualizarSalud('clinica', event.target.value)}
            placeholder='Ej. UMF 13 Tuxtla Gutiérrez'
            aria-describedby={idAyudaClinica()}
            className={clasesInput}
          />
        </CampoAlta>

        <CampoAlta
          id={idCampo('salud.alergias')}
          etiqueta={textosPaso2.campos.alergias}
          requerido
          icono='heart'
          ayuda={textosPaso2.campos.ayudaAlergias}
          error={errorAlergias}
          extra={
            <span
              className={cn(
                'text-[11px] font-bold',
                draft.salud.alergias.length >= altaConfig.maxAlergias * 0.9
                  ? 'text-[var(--sa-danger)]'
                  : 'text-[var(--sa-muted)]'
              )}
            >
              {textosPaso2.campos.contador(
                draft.salud.alergias.length,
                altaConfig.maxAlergias
              )}
            </span>
          }
        >
          <textarea
            id={idCampo('salud.alergias')}
            data-campo='salud.alergias'
            value={draft.salud.alergias}
            onChange={(event) => actualizarSalud('alergias', event.target.value)}
            rows={4}
            maxLength={altaConfig.maxAlergias}
            placeholder={textosPaso2.campos.alergiasPlaceholder}
            aria-invalid={Boolean(errorAlergias)}
            aria-describedby={descripcionCampo(
              idCampo('salud.alergias'),
              textosPaso2.campos.ayudaAlergias,
              errorAlergias
            )}
            className={cn(clasesInput, 'h-auto min-h-[112px] resize-y py-3')}
          />
        </CampoAlta>

        <div aria-live='polite' className='flex min-w-0 flex-col gap-2'>
          {sugerenciasDetectadas.map((sugerencia) => (
            <article
              key={sugerencia}
              className='flex min-w-0 flex-col gap-2 rounded-xl border border-[var(--sa-green)] bg-[var(--sa-menta-soft)] p-3 sm:flex-row sm:items-start sm:justify-between'
            >
              <div className='flex min-w-0 items-start gap-2.5'>
                <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--sa-card)] text-[var(--color-forest)]'>
                  <Icon name={iconoSugerencia(sugerencia)} size={18} color='currentColor' />
                </span>
                <div className='min-w-0'>
                  <div className='flex min-w-0 flex-wrap items-center gap-2'>
                    <p className='text-[14px] leading-snug font-extrabold'>
                      {textosPaso2.campos.adaptacionTitulo}
                    </p>
                    <span className='rounded-full border border-[var(--sa-green)] bg-[var(--sa-card)] px-2 py-0.5 text-[10px] font-extrabold tracking-[0.04em] text-[var(--sa-on-menta-soft)] uppercase'>
                      {textosPaso2.campos.adaptacionChip}
                    </span>
                  </div>
                  <p className='mt-1 text-[14px] font-semibold text-[var(--sa-on-menta-soft)]'>
                    {sugerencia}
                  </p>
                  <p className='mt-0.5 text-[12px] leading-snug text-[var(--sa-muted)]'>
                    {permisoParaSugerencia(sugerencia)}
                  </p>
                </div>
              </div>
              <div className='flex shrink-0 items-center gap-1 self-end sm:self-start'>
                <BotonTexto icono='plus' onClick={() => agregarSugerencia(sugerencia)}>
                  Añadir
                </BotonTexto>
                <BotonTexto
                  icono='x'
                  onClick={() => {
                    setDescartadas((actual) => [...actual, sugerencia])
                    anunciar(`Sugerencia descartada: ${sugerencia}`)
                  }}
                >
                  {textosPaso2.campos.descartar}
                </BotonTexto>
              </div>
            </article>
          ))}
        </div>

        {draft.salud.sugerencias.length > 0 ? (
          <div className='flex min-w-0 flex-col gap-2 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-3'>
            <p className='text-[13px] font-bold text-[var(--sa-muted)]'>
              Adaptaciones agregadas al expediente
            </p>
            <ul className='flex min-w-0 flex-wrap gap-2'>
              {draft.salud.sugerencias.map((sugerencia) => (
                <li key={sugerencia}>
                  <span className='inline-flex min-h-[36px] min-w-0 items-center gap-1.5 rounded-full border border-[var(--sa-border)] bg-[var(--sa-field)] py-1 pr-1 pl-3 text-[13px] font-semibold'>
                    <Icon name='check' size={14} color='var(--sa-success-fg)' />
                    <span className='min-w-0 break-words'>{sugerencia}</span>
                    <button
                      type='button'
                      onClick={() => quitarSugerencia(sugerencia)}
                      aria-label={`${textosPaso2.campos.descartar}: ${sugerencia}`}
                      className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--sa-muted)] hover:bg-[var(--sa-card)] focus-visible:outline-2 focus-visible:outline-[var(--color-forest)]'
                    >
                      <Icon name='x' size={14} color='currentColor' />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </SeccionAlta>

      <BarraAccionesAlta
        nota={
          <div className='flex min-w-0 flex-col gap-1.5'>
            <EstadoGuardado
              mensaje={guardadoMensaje}
              guardando={guardando}
              sucio={sucio}
            />
            <p className='flex items-start gap-1.5'>
              <Icon name='lock' size={14} color='currentColor' className='mt-0.5 shrink-0' />
              Los datos clínicos son confidenciales y solo los consulta el equipo SEE.
            </p>
          </div>
        }
      >
        <BotonSecundario
          icono='arrow-left'
          onClick={onVolver}
          className='w-full sm:w-auto'
        >
          {textosPaso2.acciones.volver}
        </BotonSecundario>
        <BotonSecundario
          icono='save'
          onClick={onGuardar}
          disabled={guardando}
          className='w-full sm:w-auto'
        >
          {textosPaso2.acciones.guardar}
        </BotonSecundario>
        <BotonPrimario
          iconoFinal='arrow-right'
          onClick={onContinuar}
          disabled={guardando}
          className='w-full sm:w-auto'
        >
          {textosPaso2.acciones.continuar}
        </BotonPrimario>
      </BarraAccionesAlta>
    </div>
  )
}

function idAyudaClinica(): string {
  return `${idCampo('salud.clinica')}-ayuda`
}

