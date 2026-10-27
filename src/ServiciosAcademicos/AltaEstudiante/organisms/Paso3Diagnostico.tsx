import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import {
  condiciones,
  documentosIngreso,
  especialistasSEE,
} from '../constants/altaConfig'
import { textosDocumentos, textosPaso3 } from '../constants/altaContent'
import {
  CampoAlta,
  GrupoAlta,
  clasesInput,
} from '../molecules/CamposAlta'
import { descripcionCampo } from '../molecules/campoUtils'
import { SeccionAlta } from '../molecules/SeccionAlta'
import { TarjetaCheckbox, TarjetaRadio } from '../molecules/TarjetasSeleccion'
import { AvisoInfo, EstadoGuardado } from '../molecules/RetroalimentacionAlta'
import {
  BarraAccionesAlta,
  BotonPrimario,
  BotonSecundario,
} from '../molecules/AccionesAlta'
import { formatearFechaCorta } from '../utils/edad'
import { idCampo } from '../validation/altaSchema'
import type {
  AltaBorrador,
  DocumentoAlta,
  DocumentoCatalogo,
  ErrorAlta,
} from '../types'

interface Paso3Props {
  draft: AltaBorrador
  errores: ErrorAlta[]
  guardando: boolean
  sucio: boolean
  guardadoMensaje?: string
  onCambio: (mutador: (draft: AltaBorrador) => AltaBorrador) => void
  onVolver: () => void
  onFinalizar: () => void
}

function estadoDocumento(
  documento: DocumentoCatalogo,
  actual: DocumentoAlta
): { texto: string; tono: 'menta' | 'gris' | 'azul' | 'durazno' } {
  if (!actual.recibido) {
    if (documento.id === 'cartilla') {
      return { texto: textosDocumentos.estadoPlazo, tono: 'durazno' }
    }
    return { texto: textosDocumentos.estadoPendiente, tono: 'gris' }
  }
  if (documento.id === 'curp') return { texto: documento.chip, tono: 'azul' }
  if (documento.id === 'acta') return { texto: textosDocumentos.estadoRecibido, tono: 'menta' }
  if (documento.id === 'cartilla') return { texto: textosDocumentos.estadoValidado, tono: 'menta' }
  return { texto: documento.chip, tono: documento.chipTono }
}

function clasesTono(tono: 'menta' | 'gris' | 'azul' | 'durazno'): string {
  if (tono === 'menta')
    return 'border-[var(--sa-green)] bg-[var(--sa-menta-soft)] text-[var(--sa-on-menta-soft)]'
  if (tono === 'azul')
    return 'border-[var(--sa-steel)] bg-[var(--sa-sky)] text-[var(--sa-steel)]'
  if (tono === 'durazno')
    return 'border-[var(--sa-coffee)] bg-[var(--sa-peach)] text-[var(--sa-coffee)]'
  return 'border-[var(--sa-border)] bg-[var(--sa-chip-gray)] text-[var(--sa-chip-gray-text)]'
}

export function Paso3Diagnostico({
  draft,
  errores,
  guardando,
  sucio,
  guardadoMensaje,
  onCambio,
  onVolver,
  onFinalizar,
}: Paso3Props) {
  const errorDe = (campo: string) => errores.find((error) => error.campo === campo)?.mensaje
  const condicionSeleccionada = condiciones.find(
    (condicion) => condicion.value === draft.condicion.condicionPrincipal
  )
  const especialistaSeleccionado = especialistasSEE.find(
    (especialista) => especialista.value === draft.derivacion.especialistaId
  )
  const recibidos = draft.documentos.filter((documento) => documento.recibido).length
  const minimosCompletos =
    draft.documentos.find((documento) => documento.id === 'acta')?.recibido &&
    draft.documentos.find((documento) => documento.id === 'curp')?.recibido
  const errorDiagnostico = errorDe('condicion.diagnosticoPrevio')
  const errorCondicion = errorDe('condicion.condicionPrincipal')
  const errorEmisor = errorDe('condicion.especialistaEmisor')
  const errorDocumentos = errorDe('documentos')
  const errorEspecialista = errorDe('derivacion.especialistaId')

  const actualizarCondicion = (
    campo: keyof AltaBorrador['condicion'],
    valor: string
  ) => {
    onCambio((actual) => ({
      ...actual,
      condicion: { ...actual.condicion, [campo]: valor },
    }))
  }

  const alternarDocumento = (documento: DocumentoAlta) => {
    onCambio((actual) => ({
      ...actual,
      documentos: actual.documentos.map((item) => {
        if (item.id !== documento.id) return item
        const recibido = !item.recibido
        const estado =
          item.id === 'cartilla'
            ? recibido
              ? 'validado'
              : 'plazo'
            : item.id === 'curp'
              ? recibido
                ? 'validado'
                : 'pendiente'
              : recibido
                ? item.id === 'acta'
                  ? 'recibido'
                  : 'validado'
                : 'pendiente'
        return {
          ...item,
          recibido,
          estado,
        }
      }),
    }))
  }

  return (
    <div className='flex w-full min-w-0 flex-col gap-4'>
      <SeccionAlta
        titulo={textosPaso3.secciones.condicion.titulo}
        subtitulo={textosPaso3.secciones.condicion.subtitulo}
        icono='brain'
        chip={
          <span className='rounded-full border border-[var(--sa-border)] bg-[var(--sa-card)] px-2.5 py-1 text-[10px] font-extrabold tracking-[0.05em] text-[var(--sa-slate)] uppercase'>
            Información clínica
          </span>
        }
      >
        <GrupoAlta
          id={idCampo('condicion.diagnosticoPrevio')}
          leyenda={textosPaso3.campos.diagnostico}
          requerido
          icono='clipboard-check'
          error={errorDiagnostico}
        >
          <div className='grid min-w-0 grid-cols-1 gap-2 md:grid-cols-2'>
            <TarjetaRadio
              id={`${idCampo('condicion.diagnosticoPrevio')}-si`}
              name='alta-diagnostico'
              label={textosPaso3.campos.diagnosticoSi}
              descripcion={textosPaso3.campos.diagnosticoSiDetalle}
              icono='file-signature'
              checked={draft.condicion.diagnosticoPrevio === 'si'}
              onChange={() =>
                onCambio((actual) => ({
                  ...actual,
                  condicion: { ...actual.condicion, diagnosticoPrevio: 'si' },
                }))
              }
            />
            <TarjetaRadio
              id={`${idCampo('condicion.diagnosticoPrevio')}-proceso`}
              name='alta-diagnostico'
              label={textosPaso3.campos.diagnosticoProceso}
              descripcion={textosPaso3.campos.diagnosticoProcesoDetalle}
              icono='clock'
              checked={draft.condicion.diagnosticoPrevio === 'en_proceso'}
              onChange={() =>
                onCambio((actual) => ({
                  ...actual,
                  condicion: {
                    ...actual.condicion,
                    diagnosticoPrevio: 'en_proceso',
                    especialistaEmisor: '',
                  },
                }))
              }
            />
          </div>
        </GrupoAlta>

        <div className='grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2'>
          <CampoAlta
            id={idCampo('condicion.condicionPrincipal')}
            etiqueta={textosPaso3.campos.condicion}
            requerido
            icono='brain'
            ayuda={textosPaso3.campos.condicionAyuda}
            error={errorCondicion}
          >
            <select
              id={idCampo('condicion.condicionPrincipal')}
              data-campo='condicion.condicionPrincipal'
              value={draft.condicion.condicionPrincipal}
              onChange={(event) =>
                actualizarCondicion('condicionPrincipal', event.target.value)
              }
              aria-invalid={Boolean(errorCondicion)}
              aria-describedby={descripcionCampo(
                idCampo('condicion.condicionPrincipal'),
                textosPaso3.campos.condicionAyuda,
                errorCondicion
              )}
              className={clasesInput}
            >
              <option value=''>Seleccione la condición principal</option>
              {condiciones.map((condicion) => (
                <option key={condicion.value} value={condicion.value}>
                  {condicion.label}
                </option>
              ))}
            </select>
          </CampoAlta>

          {draft.condicion.diagnosticoPrevio === 'si' ? (
            <CampoAlta
              id={idCampo('condicion.especialistaEmisor')}
              etiqueta={textosPaso3.campos.especialistaEmisor}
              requerido
              icono='stamp'
              ayuda={textosPaso3.campos.especialistaEmisorAyuda}
              error={errorEmisor}
            >
              <input
                id={idCampo('condicion.especialistaEmisor')}
                data-campo='condicion.especialistaEmisor'
                value={draft.condicion.especialistaEmisor}
                onChange={(event) => actualizarCondicion('especialistaEmisor', event.target.value)}
                placeholder='Ej. Dra. Ana López · Neuropediatría · Céd. 1234567'
                aria-invalid={Boolean(errorEmisor)}
                aria-describedby={descripcionCampo(
                  idCampo('condicion.especialistaEmisor'),
                  textosPaso3.campos.especialistaEmisorAyuda,
                  errorEmisor
                )}
                className={clasesInput}
              />
            </CampoAlta>
          ) : null}
        </div>

        {condicionSeleccionada ? (
          <AvisoInfo titulo={condicionSeleccionada.label}>
            {condicionSeleccionada.descripcion}
          </AvisoInfo>
        ) : null}
      </SeccionAlta>

      <SeccionAlta
        titulo={textosPaso3.secciones.documentos.titulo}
        subtitulo={textosPaso3.secciones.documentos.subtitulo}
        icono='folder'
        chip={
          <span
            className={cn(
              'rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-[0.04em] uppercase',
              recibidos >= draft.documentos.length
                ? 'bg-[var(--semaforo-verde-bg)] text-[var(--semaforo-verde-fg)]'
                : 'bg-[var(--sa-field)] text-[var(--sa-muted)]'
            )}
          >
            {textosDocumentos.contador(recibidos, draft.documentos.length)}
          </span>
        }
      >
        <div className='flex min-w-0 flex-col gap-1.5'>
          <p
            id={`${idCampo('documentos')}-ayuda`}
            className='text-[14px] leading-snug text-[var(--sa-muted)]'
          >
            {textosPaso3.secciones.documentos.instruccion}
          </p>
          <div className='h-2 w-full overflow-hidden rounded-full bg-[var(--sa-field)]'>
            <div
              className='h-full rounded-full bg-[var(--sa-green)] transition-[width]'
              style={{ width: `${(recibidos / draft.documentos.length) * 100}%` }}
            />
          </div>
        </div>

        <fieldset
          id={idCampo('documentos')}
          data-campo='documentos'
          tabIndex={-1}
          className='flex min-w-0 flex-col gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]'
          aria-describedby={`${idCampo('documentos')}-ayuda${errorDocumentos ? ` ${idCampo('documentos')}-error` : ''}`}
        >
          <legend className='sr-only'>{textosPaso3.secciones.documentos.titulo}</legend>
          {documentosIngreso.map((catalogo) => {
            const documento = draft.documentos.find((item) => item.id === catalogo.id)
            if (!documento) return null
            const estado = estadoDocumento(catalogo, documento)
            return (
              <label
                key={catalogo.id}
                htmlFor={`alta-documento-${catalogo.id}`}
                className={cn(
                  'flex min-h-[64px] min-w-0 cursor-pointer flex-col gap-2 rounded-xl border p-3 transition-colors has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-[var(--color-forest)] has-[input:focus-visible]:ring-offset-2 sm:flex-row sm:items-center sm:justify-between',
                  documento.recibido
                    ? 'border-[var(--sa-green)] bg-[var(--sa-menta-soft)]'
                    : 'border-[var(--sa-input-border)] bg-[var(--sa-card)] hover:bg-[var(--sa-field)]'
                )}
              >
                <span className='flex min-w-0 items-start gap-3'>
                  <input
                    id={`alta-documento-${catalogo.id}`}
                    type='checkbox'
                    data-campo='documentos'
                    checked={documento.recibido}
                    onChange={() => alternarDocumento(documento)}
                    className='sr-only'
                  />
                  <span
                    aria-hidden='true'
                    className={cn(
                      'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2',
                      documento.recibido
                        ? 'border-[var(--color-forest)] bg-[var(--color-forest)] text-[var(--sa-on-accent)]'
                        : 'border-[var(--sa-muted)] bg-[var(--sa-card)]'
                    )}
                  >
                    {documento.recibido ? (
                      <Icon name='check' size={15} color='currentColor' />
                    ) : null}
                  </span>
                  <Icon
                    name={catalogo.id === 'curp' ? 'id-card' : 'file-text'}
                    size={19}
                    color={documento.recibido ? 'var(--color-forest)' : 'var(--sa-muted)'}
                    className='mt-0.5 shrink-0'
                  />
                  <span className='flex min-w-0 flex-col gap-0.5'>
                    <span className='text-[15px] leading-snug font-semibold break-words'>
                      {documento.nombre}
                    </span>
                    {catalogo.id === 'cartilla' && documento.fechaLimite ? (
                      <span className='text-[12px] leading-snug text-[var(--sa-coffee)]'>
                        {textosPaso3.campos.pendiente(
                          formatearFechaCorta(documento.fechaLimite)
                        )}
                      </span>
                    ) : null}
                    {catalogo.requisitoMinimo ? (
                      <span className='text-[11px] font-bold tracking-[0.04em] text-[var(--sa-muted)] uppercase'>
                        Requisito mínimo
                      </span>
                    ) : null}
                  </span>
                </span>
                <span
                  className={cn(
                    'inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-[10px] font-extrabold tracking-[0.04em] uppercase',
                    clasesTono(estado.tono)
                  )}
                >
                  {estado.texto}
                </span>
              </label>
            )
          })}
        </fieldset>

        {errorDocumentos ? (
          <AvisoInfo
            tono='advertencia'
            titulo='Documentación mínima incompleta'
            id={`${idCampo('documentos')}-error`}
          >
            {errorDocumentos}
          </AvisoInfo>
        ) : (
          <p className='flex items-start gap-1.5 text-[13px] leading-snug text-[var(--sa-muted)]'>
            <Icon name='info' size={15} color='currentColor' className='mt-0.5 shrink-0' />
            {textosDocumentos.minimos}
          </p>
        )}

        {minimosCompletos ? (
          <AvisoInfo tono='exito' titulo='Documentación mínima completa'>
            Acta de nacimiento y CURP están cotejadas. El expediente puede registrarse.
          </AvisoInfo>
        ) : null}
      </SeccionAlta>

      <SeccionAlta
        titulo={textosPaso3.secciones.derivacion.titulo}
        subtitulo={textosPaso3.secciones.derivacion.subtitulo}
        icono='handshake'
      >
        <TarjetaCheckbox
          id={idCampo('derivacion.derivar')}
          label={textosPaso3.campos.derivar}
          descripcion={textosPaso3.campos.derivarDetalle}
          checked={draft.derivacion.derivar}
          onChange={(valor) =>
            onCambio((actual) => ({
              ...actual,
              derivacion: {
                ...actual.derivacion,
                derivar: valor,
                especialistaId: valor ? actual.derivacion.especialistaId : '',
              },
            }))
          }
        />

        {draft.derivacion.derivar ? (
          <GrupoAlta
            id={idCampo('derivacion.especialistaId')}
            leyenda={textosPaso3.campos.especialista}
            requerido
            icono='person'
            descripcion={textosPaso3.campos.especialistaAyuda}
            error={errorEspecialista}
          >
            <div className='grid min-w-0 grid-cols-1 gap-2 md:grid-cols-2'>
              {especialistasSEE.map((especialista) => (
                <TarjetaRadio
                  key={especialista.value}
                  id={`${idCampo('derivacion.especialistaId')}-${especialista.value}`}
                  name='alta-especialista'
                  label={especialista.label}
                  descripcion={especialista.especialidad}
                  icono='person'
                  checked={draft.derivacion.especialistaId === especialista.value}
                  onChange={() =>
                    onCambio((actual) => ({
                      ...actual,
                      derivacion: {
                        ...actual.derivacion,
                        especialistaId: especialista.value,
                      },
                    }))
                  }
                />
              ))}
            </div>
          </GrupoAlta>
        ) : (
          <AvisoInfo>
            El expediente se registrará sin canalización clínica inicial. Podrá derivarse
            posteriormente desde Psicología y SEE.
          </AvisoInfo>
        )}

        {draft.derivacion.derivar && especialistaSeleccionado ? (
          <AvisoInfo tono='exito' titulo='Canalización prioritaria configurada'>
            {especialistaSeleccionado.label} · {especialistaSeleccionado.especialidad}. Se
            notificará al especialista al confirmar el registro.
          </AvisoInfo>
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
              <Icon name='alert-triangle' size={14} color='currentColor' className='mt-0.5 shrink-0' />
              Al finalizar, el alta se registra en el Padrón Oficial y no podrá editarse
              desde este asistente.
            </p>
          </div>
        }
      >
        <BotonSecundario
          icono='arrow-left'
          onClick={onVolver}
          className='w-full sm:w-auto'
        >
          {textosPaso3.acciones.volver}
        </BotonSecundario>
        <BotonPrimario
          icono='user-cog'
          onClick={onFinalizar}
          disabled={guardando}
          className='w-full whitespace-normal sm:w-auto'
        >
          {textosPaso3.acciones.finalizar}
        </BotonPrimario>
      </BarraAccionesAlta>
    </div>
  )
}

