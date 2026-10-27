import type { ReactNode } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import type { AlumnoExpediente } from '../types'

interface EncabezadoAlumnoProps {
  alumno: AlumnoExpediente
  onGuardarBorrador: () => void
  onImprimir: () => void
  onAprobar: () => void
  dictamenEmitido: boolean
  borrador: string | null
  ampliado?: boolean
  acciones?: ReactNode
}

export function EncabezadoAlumno({
  alumno,
  onGuardarBorrador,
  onImprimir,
  onAprobar,
  dictamenEmitido,
  borrador,
  ampliado = false,
  acciones,
}: EncabezadoAlumnoProps) {
  return (
    <header className='sa-no-print rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-sm)] md:p-6'>
      <div className='grid grid-cols-1 items-center gap-5 lg:grid-cols-[auto_minmax(0,1fr)_auto]'>
        <div className='relative shrink-0'>
          <div className='flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-2xl bg-[var(--sa-field)] text-[34px] leading-none font-extrabold text-[var(--color-forest)]'>
            {alumno.iniciales}
          </div>
          <span className='absolute -right-2 -bottom-2 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-forest)] text-[var(--sa-on-accent)] ring-4 ring-[var(--sa-card)]'>
            <Icon name='shield' size={16} color='currentColor' />
          </span>
        </div>

        <div className='flex min-w-0 flex-col gap-2'>
          <div className='flex flex-wrap items-center gap-1.5'>
            {ampliado ? (
              <>
                <Chip tono='menta'>{alumno.diagnosticoCorto}</Chip>
                <Chip tono='azul'>{alumno.grado}</Chip>
                <Chip tono='gris'>{`CURP: ${alumno.curp}`}</Chip>
                <Chip tono='gris'>{alumno.matricula}</Chip>
                <Chip tono='gris'>{alumno.ciclo}</Chip>
              </>
            ) : (
              <>
                <Chip tono='menta'>{alumno.estado}</Chip>
                <Chip tono='azul'>{alumno.grado}</Chip>
                <Chip tono='gris'>{alumno.matricula}</Chip>
                <Chip tono='gris'>{alumno.folio}</Chip>
              </>
            )}
          </div>

          <h1 className='text-[clamp(22px,2.1vw,30px)] leading-tight font-extrabold tracking-tight whitespace-nowrap'>
            {alumno.nombre}
          </h1>

          <p className='flex items-start gap-2 text-[14px] leading-snug font-bold'>
            <Icon name='brain' size={16} color='var(--color-forest)' className='mt-0.5 shrink-0' />
            <span className='min-w-0'>{alumno.diagnostico}</span>
          </p>

          <p className='flex items-center gap-2 text-[13px] text-[var(--sa-muted)]'>
            <Icon name='map-pin' size={15} color='var(--sa-muted)' className='shrink-0' />
            <span className='min-w-0'>{alumno.responsable}</span>
          </p>

          {borrador ? (
            <p className='text-[11.5px] font-semibold text-[var(--sa-muted)]'>
              Borrador guardado · {borrador}
            </p>
          ) : null}
        </div>

        {acciones ? (
          <div className='flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end lg:max-w-[270px] 2xl:max-w-none'>
            {acciones}
          </div>
        ) : (
          <div className='flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end lg:max-w-[270px] 2xl:max-w-none'>
            <button
              type='button'
              onClick={onGuardarBorrador}
              className='inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-field)] px-3.5 text-[12.5px] font-bold'
            >
              <Icon name='save' size={16} color='currentColor' className='shrink-0' />
              Guardar Borrador
            </button>

            <button
              type='button'
              onClick={onImprimir}
              className='inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[var(--sa-sky)] px-3.5 text-[12.5px] font-bold text-[var(--sa-steel)] hover:brightness-95'
            >
              <Icon name='printer' size={16} color='currentColor' className='shrink-0' />
              Imprimir Ficha DUA
            </button>

            <button
              type='button'
              onClick={onAprobar}
              disabled={dictamenEmitido}
              className='inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-[var(--color-forest)] px-3.5 text-[12.5px] font-bold text-[var(--sa-on-accent)] hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70'
            >
              <Icon name='circle-check' size={16} color='currentColor' className='shrink-0' />
              {dictamenEmitido ? 'Dictamen Emitido' : 'Aprobar y Emitir Dictamen'}
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
