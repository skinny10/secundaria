import { useMemo, useState } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { escuela } from '../../../Portal/shared/constants/escuela'
import { cn } from '../../../utils/cn'
import {
  altaConfig,
  grados,
  grupos,
  meses,
  sexos,
  turnos,
} from '../constants/altaConfig'
import { textosPaso1 } from '../constants/altaContent'
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
import { TarjetaCheckbox } from '../molecules/TarjetasSeleccion'
import {
  calcularEdad,
  diasEnMes,
  fechaIsoDesdePartes,
  formatearFecha,
  partesFecha,
} from '../utils/edad'
import { curpCoincideCon, normalizarCurp, parsearCurp } from '../utils/curp'
import { idCampo } from '../validation/altaSchema'
import type { AltaBorrador, ErrorAlta } from '../types'

interface Paso1Props {
  draft: AltaBorrador
  errores: ErrorAlta[]
  verificando: boolean
  duplicado?: { nombre: string; matricula: string }
  guardando: boolean
  sucio: boolean
  guardadoMensaje?: string
  onCambio: (mutador: (draft: AltaBorrador) => AltaBorrador) => void
  onVerificarCurp: () => void
  onVerExpediente: () => void
  onGuardar: () => void
  onContinuar: () => void
}

export function Paso1Identificacion({
  draft,
  errores,
  verificando,
  duplicado,
  guardando,
  sucio,
  guardadoMensaje,
  onCambio,
  onVerificarCurp,
  onVerExpediente,
  onGuardar,
  onContinuar,
}: Paso1Props) {
  const identificacion = draft.identificacion
  const [partes, setPartes] = useState(() => partesFecha(identificacion.fechaNacimiento))
  const errorDe = (campo: string) => errores.find((error) => error.campo === campo)?.mensaje
  const curpValida = parsearCurp(identificacion.curp)
  const edad = calcularEdad(identificacion.fechaNacimiento, altaConfig.fechaReferenciaEdad)
  const fueraDeRango =
    edad !== null && (edad < altaConfig.edadMinima || edad > altaConfig.edadMaxima)
  const discrepancia =
    Boolean(curpValida && identificacion.fechaNacimiento && identificacion.sexo) &&
    !curpCoincideCon(
      identificacion.curp,
      identificacion.fechaNacimiento,
      identificacion.sexo
    )
  const anioActual = altaConfig.anioCiclo
  const anios = useMemo(
    () => Array.from({ length: 30 }, (_, indice) => String(anioActual - indice)),
    [anioActual]
  )
  const dias = useMemo(
    () =>
      Array.from(
        { length: diasEnMes(partes.anio, partes.mes) },
        (_, indice) => String(indice + 1).padStart(2, '0')
      ),
    [partes.anio, partes.mes]
  )

  const actualizarIdentificacion = (
    campo: keyof AltaBorrador['identificacion'],
    valor: string | boolean
  ) => {
    onCambio((actual) => ({
      ...actual,
      identificacion: { ...actual.identificacion, [campo]: valor },
    }))
  }

  const actualizarFecha = (siguiente: typeof partes) => {
    const limite = diasEnMes(siguiente.anio, siguiente.mes)
    const diaAjustado =
      siguiente.dia && Number(siguiente.dia) > limite
        ? String(limite).padStart(2, '0')
        : siguiente.dia
    const ajustada = { ...siguiente, dia: diaAjustado }
    setPartes(ajustada)
    const fecha = fechaIsoDesdePartes(ajustada.anio, ajustada.mes, ajustada.dia)
    onCambio((actual) => ({
      ...actual,
      identificacion: {
        ...actual.identificacion,
        fechaNacimiento: fecha,
        discrepanciaCurpConfirmada: false,
      },
    }))
  }

  const actualizarCurp = (valor: string) => {
    onCambio((actual) => ({
      ...actual,
      identificacion: {
        ...actual.identificacion,
        curp: normalizarCurp(valor),
        curpVerificada: { estatus: 'sin_verificar' },
        discrepanciaCurpConfirmada: false,
      },
    }))
  }

  const grupoSeleccionado = grupos.find(
    (grupo) =>
      grupo.grado === draft.asignacion.grado && grupo.grupo === draft.asignacion.grupo
  )
  const turnoSeleccionado = turnos.find((turno) => turno.value === draft.asignacion.turno)
  const errorGrado = errorDe('asignacion.grado') ?? errorDe('asignacion.grupo')
  const errorCurp = errorDe('identificacion.curp')
  const errorFecha = errorDe('identificacion.fechaNacimiento')
  const errorSexo = errorDe('identificacion.sexo')
  const errorDiscrepancia = errorDe('identificacion.discrepanciaCurpConfirmada')

  return (
    <div className='flex w-full min-w-0 flex-col gap-4'>
      <SeccionAlta
        titulo={textosPaso1.secciones.identidad.titulo}
        icono='id-card'
        chip={
          <span className='inline-flex items-center gap-1.5 rounded-full border border-[var(--sa-border)] bg-[var(--sa-card)] px-2.5 py-1 text-[10px] font-extrabold tracking-[0.06em] text-[var(--sa-green)] uppercase'>
            <Icon name='shield-check' size={13} color='currentColor' />
            CURP · RENAPO
          </span>
        }
      >
        <div className='grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
          <CampoAlta
            id={idCampo('identificacion.nombres')}
            etiqueta={textosPaso1.campos.nombres}
            requerido
            ayuda={textosPaso1.campos.nombresAyuda}
            error={errorDe('identificacion.nombres')}
          >
            <input
              id={idCampo('identificacion.nombres')}
              data-campo='identificacion.nombres'
              value={identificacion.nombres}
              onChange={(event) =>
                actualizarIdentificacion('nombres', event.target.value)
              }
              autoComplete='off'
              aria-invalid={Boolean(errorDe('identificacion.nombres'))}
              aria-describedby={descripcionCampo(
                idCampo('identificacion.nombres'),
                textosPaso1.campos.nombresAyuda,
                errorDe('identificacion.nombres')
              )}
              className={clasesInput}
            />
          </CampoAlta>
          <CampoAlta
            id={idCampo('identificacion.apellidoPaterno')}
            etiqueta={textosPaso1.campos.apellidoPaterno}
            requerido
            error={errorDe('identificacion.apellidoPaterno')}
          >
            <input
              id={idCampo('identificacion.apellidoPaterno')}
              data-campo='identificacion.apellidoPaterno'
              value={identificacion.apellidoPaterno}
              onChange={(event) =>
                actualizarIdentificacion('apellidoPaterno', event.target.value)
              }
              autoComplete='off'
              aria-invalid={Boolean(errorDe('identificacion.apellidoPaterno'))}
              aria-describedby={descripcionCampo(
                idCampo('identificacion.apellidoPaterno'),
                undefined,
                errorDe('identificacion.apellidoPaterno')
              )}
              className={clasesInput}
            />
          </CampoAlta>
          <CampoAlta
            id={idCampo('identificacion.apellidoMaterno')}
            etiqueta={textosPaso1.campos.apellidoMaterno}
            error={errorDe('identificacion.apellidoMaterno')}
          >
            <input
              id={idCampo('identificacion.apellidoMaterno')}
              data-campo='identificacion.apellidoMaterno'
              value={identificacion.apellidoMaterno}
              onChange={(event) =>
                actualizarIdentificacion('apellidoMaterno', event.target.value)
              }
              autoComplete='off'
              aria-invalid={Boolean(errorDe('identificacion.apellidoMaterno'))}
              aria-describedby={descripcionCampo(
                idCampo('identificacion.apellidoMaterno'),
                undefined,
                errorDe('identificacion.apellidoMaterno')
              )}
              className={clasesInput}
            />
          </CampoAlta>
        </div>

        <div className='grid min-w-0 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]'>
          <CampoAlta
            id={idCampo('identificacion.curp')}
            etiqueta={textosPaso1.campos.curp}
            requerido
            icono='id-card'
            error={errorCurp}
            extra={
              <span className='text-[10px] font-extrabold tracking-[0.08em] text-[var(--sa-muted)] uppercase'>
                {identificacion.curp.length} / 18
              </span>
            }
          >
            <div className='flex min-w-0 flex-col gap-2 sm:flex-row'>
              <input
                id={idCampo('identificacion.curp')}
                data-campo='identificacion.curp'
                value={identificacion.curp}
                onChange={(event) => actualizarCurp(event.target.value)}
                maxLength={18}
                autoComplete='off'
                spellCheck={false}
                placeholder='Ej. PEGL121006HCSRRSA4'
                aria-invalid={Boolean(errorCurp)}
                aria-describedby={descripcionCampo(
                  idCampo('identificacion.curp'),
                  undefined,
                  errorCurp
                )}
                className={cn(
                  clasesInput,
                  'font-mono tracking-[0.06em] uppercase sm:flex-1'
                )}
              />
              <BotonSecundario
                icono='shield-check'
                onClick={onVerificarCurp}
                disabled={identificacion.curp.length !== 18 || verificando}
                aria-busy={verificando}
                className='shrink-0 sm:w-auto'
              >
                {verificando
                  ? textosPaso1.campos.verificando
                  : textosPaso1.campos.verificar}
              </BotonSecundario>
            </div>
            <div className='mt-1.5 flex min-w-0 flex-wrap items-center gap-2'>
              <span className='text-[10px] font-extrabold tracking-[0.08em] text-[var(--sa-muted)] uppercase'>
                {textosPaso1.campos.curpEtiqueta}
              </span>
              {curpValida ? (
                <span className='inline-flex items-center gap-1 text-[12px] font-semibold text-[var(--sa-success-fg)]'>
                  <Icon name='circle-check' size={14} color='currentColor' />
                  Formato y dígito verificador válidos
                </span>
              ) : null}
            </div>
          </CampoAlta>

          <fieldset
            id={idCampo('identificacion.fechaNacimiento')}
            data-campo='identificacion.fechaNacimiento'
            tabIndex={-1}
            className='flex min-w-0 flex-col gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]'
            aria-describedby={descripcionCampo(
              idCampo('identificacion.fechaNacimiento'),
              undefined,
              errorFecha
            )}
          >
            <legend className='flex w-full min-w-0 flex-wrap items-center justify-between gap-2 text-[16px] leading-snug font-semibold text-[var(--color-text-primary)]'>
              <span className='flex items-center gap-1.5'>
                <Icon name='calendar' size={17} color='var(--color-forest)' />
                {textosPaso1.campos.fechaNacimiento}
                <span aria-hidden='true' className='text-[var(--sa-danger)]'>
                  *
                </span>
                <span className='sr-only'> (obligatorio)</span>
              </span>
              <span className='inline-flex min-h-[28px] items-center gap-1 rounded-full bg-[var(--sa-menta-soft)] px-2.5 text-[12px] font-bold text-[var(--sa-on-menta-soft)]'>
                <Icon name='calendar' size={13} color='currentColor' />
                {textosPaso1.campos.edad}{' '}
                {edad === null
                  ? '—'
                  : textosPaso1.campos.edadUnidad(edad)}
              </span>
            </legend>
            <div className='grid min-w-0 grid-cols-[minmax(0,0.7fr)_minmax(0,1.2fr)_minmax(0,0.9fr)] gap-2'>
              <div className='min-w-0'>
                <label
                  htmlFor={`${idCampo('identificacion.fechaNacimiento')}-dia`}
                  className='mb-1 block text-[11px] font-bold text-[var(--sa-muted)]'
                >
                  {textosPaso1.campos.dia}
                </label>
                <SelectConIcono
                  id={`${idCampo('identificacion.fechaNacimiento')}-dia`}
                  value={partes.dia}
                  onChange={(valor) => actualizarFecha({ ...partes, dia: valor })}
                  ariaDescribedBy={descripcionCampo(
                    idCampo('identificacion.fechaNacimiento'),
                    undefined,
                    errorFecha
                  )}
                  invalid={Boolean(errorFecha)}
                >
                  <option value=''>DD</option>
                  {dias.map((dia) => (
                    <option key={dia} value={dia}>
                      {dia}
                    </option>
                  ))}
                </SelectConIcono>
              </div>
              <div className='min-w-0'>
                <label
                  htmlFor={`${idCampo('identificacion.fechaNacimiento')}-mes`}
                  className='mb-1 block text-[11px] font-bold text-[var(--sa-muted)]'
                >
                  {textosPaso1.campos.mes}
                </label>
                <SelectConIcono
                  id={`${idCampo('identificacion.fechaNacimiento')}-mes`}
                  value={partes.mes}
                  onChange={(valor) => actualizarFecha({ ...partes, mes: valor })}
                  ariaDescribedBy={descripcionCampo(
                    idCampo('identificacion.fechaNacimiento'),
                    undefined,
                    errorFecha
                  )}
                  invalid={Boolean(errorFecha)}
                >
                  <option value=''>MM</option>
                  {meses.map((mes) => (
                    <option key={mes.value} value={mes.value}>
                      {mes.label}
                    </option>
                  ))}
                </SelectConIcono>
              </div>
              <div className='min-w-0'>
                <label
                  htmlFor={`${idCampo('identificacion.fechaNacimiento')}-anio`}
                  className='mb-1 block text-[11px] font-bold text-[var(--sa-muted)]'
                >
                  {textosPaso1.campos.anio}
                </label>
                <SelectConIcono
                  id={`${idCampo('identificacion.fechaNacimiento')}-anio`}
                  value={partes.anio}
                  onChange={(valor) => actualizarFecha({ ...partes, anio: valor })}
                  ariaDescribedBy={descripcionCampo(
                    idCampo('identificacion.fechaNacimiento'),
                    undefined,
                    errorFecha
                  )}
                  invalid={Boolean(errorFecha)}
                >
                  <option value=''>AAAA</option>
                  {anios.map((anio) => (
                    <option key={anio} value={anio}>
                      {anio}
                    </option>
                  ))}
                </SelectConIcono>
              </div>
            </div>
            {identificacion.fechaNacimiento ? (
              <p className='text-[13px] leading-snug text-[var(--sa-muted)]'>
                {formatearFecha(identificacion.fechaNacimiento)}
              </p>
            ) : null}
            {errorFecha ? (
              <p
                id={`${idCampo('identificacion.fechaNacimiento')}-error`}
                className='text-[13px] leading-snug font-semibold text-[var(--sa-danger)]'
              >
                {errorFecha}
              </p>
            ) : null}
          </fieldset>
        </div>

        <GrupoAlta
          id={idCampo('identificacion.sexo')}
          leyenda={textosPaso1.campos.sexo}
          requerido
          icono='users'
          error={errorSexo}
        >
          <div className='grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-3'>
            {sexos.map((sexo) => (
              <TarjetaRadio
                key={sexo.value}
                id={`${idCampo('identificacion.sexo')}-${sexo.value}`}
                name='alta-sexo'
                label={sexo.label}
                checked={identificacion.sexo === sexo.value}
                onChange={() =>
                  onCambio((actual) => ({
                    ...actual,
                    identificacion: {
                      ...actual.identificacion,
                      sexo: sexo.value as AltaBorrador['identificacion']['sexo'],
                      discrepanciaCurpConfirmada: false,
                    },
                  }))
                }
              />
            ))}
          </div>
        </GrupoAlta>

        {fueraDeRango && edad !== null ? (
          <AvisoInfo tono='advertencia' titulo='Verifique la fecha de nacimiento'>
            {textosPaso1.campos.edadFueraRango(
              altaConfig.edadMinima,
              altaConfig.edadMaxima
            )}
          </AvisoInfo>
        ) : null}

        {discrepancia ? (
          <AvisoInfo
            tono='advertencia'
            titulo='Discrepancia con la CURP'
            id='alta-discrepancia-aviso'
          >
            <p>{textosPaso1.campos.advertenciaDiscrepancia}</p>
            <div className='mt-2'>
              <TarjetaCheckbox
                id={idCampo('identificacion.discrepanciaCurpConfirmada')}
                label={textosPaso1.campos.confirmarDiscrepancia}
                checked={identificacion.discrepanciaCurpConfirmada}
                onChange={(valor) =>
                  actualizarIdentificacion('discrepanciaCurpConfirmada', valor)
                }
              />
            </div>
            {errorDiscrepancia ? (
              <p className='mt-1 text-[13px] font-semibold text-[var(--sa-danger)]'>
                {errorDiscrepancia}
              </p>
            ) : null}
          </AvisoInfo>
        ) : null}

        {identificacion.curpVerificada.estatus !== 'sin_verificar' ? (
          <AvisoInfo
            tono={
              identificacion.curpVerificada.estatus === 'certificada'
                ? 'exito'
                : 'advertencia'
            }
            titulo={
              identificacion.curpVerificada.estatus === 'certificada'
                ? 'Validación RENAPO'
                : 'No fue posible certificar la CURP'
            }
            accion={
              identificacion.curpVerificada.estatus !== 'certificada' ? (
                <BotonTexto icono='refresh' onClick={onVerificarCurp}>
                  Reintentar
                </BotonTexto>
              ) : undefined
            }
          >
            {identificacion.curpVerificada.mensaje ??
              (identificacion.curpVerificada.estatus === 'certificada'
                ? textosPaso1.campos.curpValidada
                : textosPaso1.campos.curpError)}
          </AvisoInfo>
        ) : null}

        {duplicado ? (
          <AvisoInfo
            tono='advertencia'
            titulo={textosPaso1.campos.duplicada}
            accion={
              <BotonTexto icono='external-link' onClick={onVerExpediente}>
                {textosPaso1.campos.verExpediente}
              </BotonTexto>
            }
          >
            {duplicado.nombre} · {duplicado.matricula}. Verifique el expediente antes de
            continuar.
          </AvisoInfo>
        ) : null}
      </SeccionAlta>

      <SeccionAlta
        titulo={textosPaso1.secciones.asignacion.titulo}
        icono='graduation-cap'
        subtitulo={`${escuela.nombre} · CCT ${escuela.cct} · ${altaConfig.cicloEtiqueta}`}
      >
        <div className='grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'>
          <CampoAlta
            id={`${idCampo('asignacion.grado')}`}
            etiqueta={textosPaso1.campos.grado}
            requerido
            error={errorGrado}
          >
            <SelectConIcono
              id={idCampo('asignacion.grado')}
              value={grupoSeleccionado?.value ?? ''}
              onChange={(valor) => {
                const grupo = grupos.find((item) => item.value === valor)
                onCambio((actual) => ({
                  ...actual,
                  asignacion: {
                    ...actual.asignacion,
                    grado: grupo?.grado ?? '',
                    grupo: grupo?.grupo ?? '',
                  },
                }))
              }}
              invalid={Boolean(errorGrado)}
              ariaDescribedBy={descripcionCampo(
                idCampo('asignacion.grado'),
                undefined,
                errorGrado
              )}
            >
              <option value=''>Seleccione grado y grupo</option>
              {grados.map((grado) => (
                <optgroup key={grado.value} label={grado.label}>
                  {grupos
                    .filter((grupo) => grupo.grado === grado.value)
                    .map((grupo) => (
                      <option key={grupo.value} value={grupo.value}>
                        {grupo.label}
                      </option>
                    ))}
                </optgroup>
              ))}
            </SelectConIcono>
          </CampoAlta>

          <CampoAlta
            id={idCampo('asignacion.turno')}
            etiqueta={textosPaso1.campos.turno}
            requerido
            error={errorDe('asignacion.turno')}
            ayuda={
              turnoSeleccionado
                ? `Horario: ${turnoSeleccionado.horario}`
                : 'Seleccione el turno asignado al grupo.'
            }
          >
            <SelectConIcono
              id={idCampo('asignacion.turno')}
              value={draft.asignacion.turno}
              onChange={(valor) =>
                onCambio((actual) => ({
                  ...actual,
                  asignacion: { ...actual.asignacion, turno: valor },
                }))
              }
              invalid={Boolean(errorDe('asignacion.turno'))}
              ariaDescribedBy={descripcionCampo(
                idCampo('asignacion.turno'),
                turnoSeleccionado
                  ? `Horario: ${turnoSeleccionado.horario}`
                  : 'Seleccione el turno asignado al grupo.',
                errorDe('asignacion.turno')
              )}
            >
              <option value=''>Seleccione el turno</option>
              {turnos.map((turno) => (
                <option key={turno.value} value={turno.value}>
                  {turno.label} · {turno.horario}
                </option>
              ))}
            </SelectConIcono>
          </CampoAlta>

          <CampoAlta
            id={idCampo('matriculaProvisional')}
            etiqueta={textosPaso1.campos.matricula}
            icono='lock'
            ayuda='Se confirma al finalizar el registro y no puede modificarse.'
            extra={
              <span className='inline-flex items-center gap-1 rounded-full bg-[var(--sa-field)] px-2 py-1 text-[10px] font-extrabold tracking-[0.06em] text-[var(--sa-muted)] uppercase'>
                <Icon name='stamp' size={12} color='currentColor' />
                {textosPaso1.campos.matriculaEtiqueta}
              </span>
            }
          >
            <input
              id={idCampo('matriculaProvisional')}
              value={draft.matriculaProvisional}
              readOnly
              aria-describedby={`${idCampo('matriculaProvisional')}-ayuda`}
              className={cn(clasesInput, 'cursor-default bg-[var(--sa-field)] font-mono')}
            />
          </CampoAlta>
        </div>
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
              Información confidencial de menores. No se comparte fuera del expediente
              institucional.
            </p>
          </div>
        }
      >
        <BotonSecundario
          icono='save'
          onClick={onGuardar}
          disabled={guardando}
          className='w-full sm:w-auto'
        >
          {textosPaso1.acciones.guardar}
        </BotonSecundario>
        <BotonPrimario
          iconoFinal='arrow-right'
          onClick={onContinuar}
          disabled={guardando}
          className='w-full sm:w-auto'
        >
          {textosPaso1.acciones.continuar}
        </BotonPrimario>
      </BarraAccionesAlta>
    </div>
  )
}

