import type { ReactNode } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import type { ErrorAlta } from '../types'
import { ariaAlta } from '../constants/altaContent'
import { idCampo } from '../validation/altaSchema'

interface AvisoErroresProps {
  errores: ErrorAlta[]
  onCampo: (campo: string) => void
  mensaje?: string
}

export function AvisoErrores({ errores, onCampo, mensaje }: AvisoErroresProps) {
  if (errores.length === 0) return null
  const unicos = Array.from(new Map(errores.map((error) => [error.campo, error])).values())
  return (
    <div
      role='alert'
      aria-labelledby='alta-resumen-errores-titulo'
      className='flex w-full min-w-0 flex-col gap-2 rounded-2xl border border-[var(--sa-danger)] bg-[var(--sa-rosa)] p-4 text-[var(--sa-on-rosa)]'
    >
      <p
        id='alta-resumen-errores-titulo'
        className='flex items-center gap-2 text-[16px] leading-snug font-extrabold'
      >
        <Icon name='alert-triangle' size={19} color='currentColor' className='shrink-0' />
        <span>{mensaje ?? ariaAlta.resumenErrores}</span>
      </p>
      <p className='text-[13px] leading-snug'>
        {errores.length === 1
          ? 'Hay 1 campo que requiere atención.'
          : `Hay ${errores.length} campos que requieren atención.`}
      </p>
      <ul className='flex list-disc flex-col gap-1 pl-5 text-[14px] leading-snug'>
        {unicos.map((error) => (
          <li key={error.campo}>
            <button
              type='button'
              onClick={() => onCampo(error.campo)}
              className='min-h-[32px] text-left font-semibold underline underline-offset-2 hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current'
            >
              {error.mensaje}
            </button>
          </li>
        ))}
      </ul>
      <span className='sr-only' id='alta-campos-error'>
        {unicos.map((error) => idCampo(error.campo)).join(' ')}
      </span>
    </div>
  )
}

interface AvisoInfoProps {
  titulo?: string
  children: ReactNode
  tono?: 'info' | 'advertencia' | 'exito'
  accion?: ReactNode
  id?: string
}

export function AvisoInfo({
  titulo,
  children,
  tono = 'info',
  accion,
  id,
}: AvisoInfoProps) {
  const estilos =
    tono === 'advertencia'
      ? 'border-[var(--semaforo-amarillo-fg)] bg-[var(--semaforo-amarillo-bg)] text-[var(--semaforo-amarillo-fg)]'
      : tono === 'exito'
        ? 'border-[var(--sa-success-fg)] bg-[var(--semaforo-verde-bg)] text-[var(--semaforo-verde-fg)]'
        : 'border-[var(--sa-border)] bg-[var(--sa-field)] text-[var(--color-text-primary)]'
  const icono = tono === 'advertencia' ? 'alert-triangle' : tono === 'exito' ? 'circle-check' : 'info'
  return (
    <div
      id={id}
      className={cn(
        'flex min-w-0 flex-col gap-2 rounded-xl border p-3 text-[14px] leading-snug sm:flex-row sm:items-start sm:justify-between',
        estilos
      )}
    >
      <div className='flex min-w-0 items-start gap-2'>
        <Icon name={icono} size={17} color='currentColor' className='mt-0.5 shrink-0' />
        <div className='min-w-0'>
          {titulo ? <p className='font-extrabold'>{titulo}</p> : null}
          <div className='min-w-0'>{children}</div>
        </div>
      </div>
      {accion ? <div className='shrink-0'>{accion}</div> : null}
    </div>
  )
}

interface EstadoGuardadoProps {
  mensaje?: string
  guardando?: boolean
  sucio?: boolean
}

export function EstadoGuardado({ mensaje, guardando, sucio }: EstadoGuardadoProps) {
  return (
    <div
      role='status'
      aria-live='polite'
      className='flex min-w-0 items-center justify-end gap-2 text-[13px] leading-snug font-semibold text-[var(--sa-muted)]'
    >
      <Icon
        name={guardando ? 'refresh' : mensaje ? 'circle-check' : 'save'}
        size={15}
        color='currentColor'
        className={guardando ? 'animate-spin' : ''}
      />
      <span className='min-w-0 text-right'>
        {guardando ? 'Guardando…' : (mensaje ?? (sucio ? 'Cambios sin guardar' : 'Borrador guardado'))}
      </span>
    </div>
  )
}
