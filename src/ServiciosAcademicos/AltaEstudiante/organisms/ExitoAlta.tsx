import { useEffect, useRef } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { altaConfig } from '../constants/altaConfig'
import { dialogosAlta } from '../constants/altaContent'
import {
  BarraAccionesAlta,
  BotonPrimario,
  BotonSecundario,
} from '../molecules/AccionesAlta'
import { AvisoInfo } from '../molecules/RetroalimentacionAlta'
import type { RegistroAltaResultado, ResumenRegistro } from '../types'

const fechaEmision = new Date().toLocaleDateString('es-MX')

interface ExitoAltaProps {
  resultado: RegistroAltaResultado
  resumen: ResumenRegistro
  onPadron: () => void
  onRegistrarOtro: () => void
  onImprimir: () => void
}

export function ExitoAlta({
  resultado,
  resumen,
  onPadron,
  onRegistrarOtro,
  onImprimir,
}: ExitoAltaProps) {
  const tituloRef = useRef<HTMLHeadingElement | null>(null)
  useEffect(() => {
    tituloRef.current?.focus()
  }, [])

  const estado =
    resumen.documentosPendientes > 0
      ? 'Cotejo Pendiente'
      : resultado.canalizacionId
        ? 'En Atención SEE'
        : 'Expediente Completo'

  return (
    <div className='flex w-full min-w-0 flex-col gap-4'>
      <section className='flex w-full min-w-0 flex-col items-center gap-4 rounded-2xl border border-[var(--sa-green)] bg-[var(--sa-card)] p-5 text-center shadow-[var(--shadow-sm)] sm:p-8'>
        <span className='flex h-16 w-16 items-center justify-center rounded-full bg-[var(--semaforo-verde-bg)] text-[var(--sa-success-fg)]'>
          <Icon name='circle-check' size={34} color='currentColor' />
        </span>
        <div className='flex max-w-2xl min-w-0 flex-col items-center gap-2'>
          <span className='rounded-full bg-[var(--semaforo-verde-bg)] px-3 py-1 text-[10px] font-extrabold tracking-[0.08em] text-[var(--semaforo-verde-fg)] uppercase'>
            {estado}
          </span>
          <h1
            ref={tituloRef}
            tabIndex={-1}
            className='text-[26px] leading-tight font-extrabold break-words text-[var(--color-text-primary)] sm:text-[32px]'
          >
            {dialogosAlta.exitoTitulo}
          </h1>
          <p className='text-[15px] leading-relaxed text-[var(--sa-muted)]'>
            {dialogosAlta.exitoDescripcion}
          </p>
        </div>

        <div className='mt-1 grid w-full max-w-3xl min-w-0 grid-cols-1 gap-3 text-left sm:grid-cols-2'>
          <div className='rounded-xl border border-[var(--sa-border)] bg-[var(--sa-field)] p-3'>
            <p className='text-[11px] font-extrabold tracking-[0.06em] text-[var(--sa-muted)] uppercase'>
              Alumno
            </p>
            <p className='mt-0.5 break-words text-[16px] font-bold'>{resumen.nombre}</p>
            <p className='text-[13px] text-[var(--sa-muted)]'>{resumen.curpEnmascarada}</p>
          </div>
          <div className='rounded-xl border border-[var(--sa-border)] bg-[var(--sa-field)] p-3'>
            <p className='text-[11px] font-extrabold tracking-[0.06em] text-[var(--sa-muted)] uppercase'>
              Matrícula oficial
            </p>
            <p className='mt-0.5 font-mono text-[18px] font-bold break-words'>
              {resultado.matricula}
            </p>
            <p className='text-[13px] text-[var(--sa-muted)]'>Folio {resultado.folio}</p>
          </div>
          <div className='rounded-xl border border-[var(--sa-border)] bg-[var(--sa-field)] p-3'>
            <p className='text-[11px] font-extrabold tracking-[0.06em] text-[var(--sa-muted)] uppercase'>
              Asignación
            </p>
            <p className='mt-0.5 text-[15px] font-bold'>
              {resumen.gradoGrupo} · {resumen.turno}
            </p>
            <p className='text-[13px] text-[var(--sa-muted)]'>{altaConfig.cicloEtiqueta}</p>
          </div>
          <div className='rounded-xl border border-[var(--sa-border)] bg-[var(--sa-field)] p-3'>
            <p className='text-[11px] font-extrabold tracking-[0.06em] text-[var(--sa-muted)] uppercase'>
              Documentos
            </p>
            <p className='mt-0.5 text-[15px] font-bold'>
              {resumen.documentosRecibidos} de {resumen.documentosTotal} cotejados
            </p>
            <p className='text-[13px] text-[var(--sa-muted)]'>
              {resumen.documentosPendientes > 0
                ? `${resumen.documentosPendientes} con plazo activo`
                : 'Expediente documental completo'}
            </p>
          </div>
        </div>

        {resultado.canalizacionId ? (
          <div className='w-full max-w-3xl text-left'>
            <AvisoInfo tono='exito' titulo='Canalización SEE generada'>
              {resumen.especialista}. La notificación ya está disponible en Psicología y
              SEE.
            </AvisoInfo>
          </div>
        ) : (
          <div className='w-full max-w-3xl text-left'>
            <AvisoInfo titulo='Sin derivación inicial'>
              El alumno quedó registrado sin canalización clínica. Puede derivarse
              posteriormente desde Psicología y SEE.
            </AvisoInfo>
          </div>
        )}

        {resumen.documentosPendientes > 0 ? (
          <div className='w-full max-w-3xl text-left'>
            <AvisoInfo
              tono='advertencia'
              titulo='Documentación pendiente con plazo'
            >
              La cartilla nacional de salud conserva un plazo de{' '}
              {altaConfig.diasPlazoDocumento} días. El expediente aparece en Cotejo y
              Documentación hasta completarse.
            </AvisoInfo>
          </div>
        ) : null}
      </section>

      <BarraAccionesAlta
        nota={
          <p className='flex min-w-0 items-start gap-1.5'>
            <Icon name='lock' size={14} color='currentColor' className='mt-0.5 shrink-0' />
            El comprobante impreso omite datos clínicos y muestras de identificación
            completas.
          </p>
        }
      >
        <BotonSecundario
          icono='printer'
          onClick={onImprimir}
          className='w-full sm:w-auto'
        >
          {dialogosAlta.imprimir}
        </BotonSecundario>
        <BotonSecundario
          icono='plus-circle'
          onClick={onRegistrarOtro}
          className='w-full sm:w-auto'
        >
          {dialogosAlta.registrarOtro}
        </BotonSecundario>
        <BotonPrimario
          icono='users'
          onClick={onPadron}
          className='w-full sm:w-auto'
        >
          {dialogosAlta.verPadron}
        </BotonPrimario>
      </BarraAccionesAlta>
    </div>
  )
}

export function ComprobanteAlta({
  resultado,
  resumen,
}: {
  resultado: RegistroAltaResultado
  resumen: ResumenRegistro
}) {
  return (
    <div className='sa-print-only hidden bg-white p-6 text-[12px] text-black'>
      <header className='flex items-start justify-between gap-6 border-b border-black pb-3'>
        <div>
          <p className='text-[10px] font-bold tracking-widest uppercase'>
            {resumen.nombreEscuela} · Servicios Académicos
          </p>
          <h1 className='mt-1 text-[20px] leading-tight font-extrabold'>
            {dialogosAlta.comprobante}
          </h1>
          <p className='text-[11px]'>Ciclo escolar {altaConfig.ciclo}</p>
        </div>
        <div className='text-right text-[11px]'>
          <p className='font-bold'>Folio {resultado.folio}</p>
          <p>Matrícula {resultado.matricula}</p>
          <p>{fechaEmision}</p>
        </div>
      </header>

      <section className='mt-4 grid grid-cols-2 gap-x-6 gap-y-1.5'>
        <p>
          <span className='font-bold'>Alumno:</span> {resumen.nombre}
        </p>
        <p>
          <span className='font-bold'>CURP:</span> {resumen.curpEnmascarada}
        </p>
        <p>
          <span className='font-bold'>Grado y grupo:</span> {resumen.gradoGrupo}
        </p>
        <p>
          <span className='font-bold'>Turno:</span> {resumen.turno}
        </p>
        <p>
          <span className='font-bold'>Tutor legal:</span> {resumen.tutor}
        </p>
        <p>
          <span className='font-bold'>Teléfono:</span> {resumen.telefono}
        </p>
        <p>
          <span className='font-bold'>Correo:</span> {resumen.correo}
        </p>
        <p>
          <span className='font-bold'>Documentos:</span> {resumen.documentosRecibidos} de{' '}
          {resumen.documentosTotal}
        </p>
        <p>
          <span className='font-bold'>Derivación:</span> {resumen.derivacion}
        </p>
        <p>
          <span className='font-bold'>Especialista:</span> {resumen.especialista}
        </p>
      </section>

      <section className='mt-5 border-t border-black pt-3'>
        <p className='text-[11px] leading-relaxed'>
          Este comprobante acredita el registro administrativo del alumno en el Padrón
          Oficial. La documentación pendiente deberá entregarse dentro del plazo
          institucional. El expediente clínico completo es confidencial y no forma parte de
          esta impresión.
        </p>
      </section>

      <footer className='mt-8 flex items-end justify-between gap-6'>
        <div className='w-[45%] border-t border-black pt-1 text-center text-[10px]'>
          Firma de Servicios Académicos
        </div>
        <div className='w-[45%] border-t border-black pt-1 text-center text-[10px]'>
          Firma del Tutor Legal
        </div>
      </footer>
    </div>
  )
}
