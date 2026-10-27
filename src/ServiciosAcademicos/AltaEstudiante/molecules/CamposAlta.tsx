import type { ReactNode } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import type { IconName } from '../../../utils/types'
import { ariaAlta } from '../constants/altaContent'
import { descripcionCampo, idAyuda, idError } from './campoUtils'

export const clasesInput =
  'h-14 w-full min-w-0 rounded-xl border border-[var(--sa-input-border)] bg-[var(--sa-card)] px-3.5 text-[18px] leading-snug text-[var(--color-text-primary)] outline-none focus-visible:border-[var(--color-forest)] focus-visible:ring-2 focus-visible:ring-[var(--color-forest)] aria-[invalid=true]:border-[var(--sa-danger)]'

export const clasesSelect = `${clasesInput} appearance-none pr-10`

export interface AyudaErrorProps {
  id: string
  ayuda?: string
  error?: string
}

export function EtiquetaObligatoria({ requerido }: { requerido?: boolean }) {
  if (!requerido) return null
  return (
    <>
      <span aria-hidden='true' className='text-[var(--sa-danger)]'>
        *
      </span>
      <span className='sr-only'> {ariaAlta.obligatorio}</span>
    </>
  )
}

export function TextoAyuda({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className='text-[13px] leading-snug text-[var(--sa-muted)]'>
      {children}
    </p>
  )
}

export function TextoError({ id, children }: { id: string; children: ReactNode }) {
  return (
    <p id={id} className='flex items-start gap-1 text-[13px] leading-snug font-semibold text-[var(--sa-danger)]'>
      <Icon name='alert-triangle' size={14} color='currentColor' className='mt-0.5 shrink-0' />
      <span>{children}</span>
    </p>
  )
}

interface CampoAltaProps {
  id: string
  etiqueta: string
  requerido?: boolean
  icono?: IconName
  ayuda?: string
  error?: string
  extra?: ReactNode
  className?: string
  children: ReactNode
}

export function CampoAlta({
  id,
  etiqueta,
  requerido,
  icono,
  ayuda,
  error,
  extra,
  className,
  children,
}: CampoAltaProps) {
  return (
    <div className={cn('flex min-w-0 flex-col gap-1.5', className)}>
      <div className='flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-1.5'>
        <label
          htmlFor={id}
          className='flex min-w-0 items-center gap-1.5 text-[16px] leading-snug font-semibold text-[var(--color-text-primary)]'
        >
          {icono ? (
            <Icon name={icono} size={17} color='var(--color-forest)' className='shrink-0' />
          ) : null}
          <span className='min-w-0'>{etiqueta}</span>
          <EtiquetaObligatoria requerido={requerido} />
        </label>
        {extra}
      </div>
      {children}
      {ayuda && !error ? <TextoAyuda id={idAyuda(id)}>{ayuda}</TextoAyuda> : null}
      {error ? <TextoError id={idError(id)}>{error}</TextoError> : null}
    </div>
  )
}

interface GrupoAltaProps {
  id: string
  leyenda: string
  requerido?: boolean
  icono?: IconName
  ayuda?: string
  error?: string
  extra?: ReactNode
  descripcion?: string
  className?: string
  children: ReactNode
}

export function GrupoAlta({
  id,
  leyenda,
  requerido,
  icono,
  ayuda,
  error,
  extra,
  descripcion,
  className,
  children,
}: GrupoAltaProps) {
  return (
    <fieldset
      id={id}
      tabIndex={-1}
      className={cn(
        'flex min-w-0 flex-col gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]',
        className
      )}
      aria-describedby={descripcionCampo(id, ayuda ?? descripcion, error)}
    >
      <legend className='w-full min-w-0 text-[16px] leading-snug font-semibold text-[var(--color-text-primary)]'>
        <span className='flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-1.5'>
          <span className='flex min-w-0 items-center gap-1.5'>
            {icono ? (
              <Icon name={icono} size={17} color='var(--color-forest)' className='shrink-0' />
            ) : null}
            <span className='min-w-0'>
              {leyenda}
              <EtiquetaObligatoria requerido={requerido} />
            </span>
          </span>
          {extra}
        </span>
      </legend>
      {descripcion ? <TextoAyuda id={idAyuda(id)}>{descripcion}</TextoAyuda> : null}
      {children}
      {ayuda ? <TextoAyuda id={idAyuda(id)}>{ayuda}</TextoAyuda> : null}
      {error ? <TextoError id={idError(id)}>{error}</TextoError> : null}
    </fieldset>
  )
}

interface SelectConIconoProps {
  id: string
  value: string
  onChange: (valor: string) => void
  children: ReactNode
  ariaDescribedBy?: string
  invalid?: boolean
  className?: string
}

export function SelectConIcono({
  id,
  value,
  onChange,
  children,
  ariaDescribedBy,
  invalid,
  className,
}: SelectConIconoProps) {
  return (
    <div className={cn('relative min-w-0', className)}>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={invalid || undefined}
        aria-describedby={ariaDescribedBy}
        className={clasesSelect}
      >
        {children}
      </select>
      <Icon
        name='chevron-down'
        size={18}
        color='var(--sa-muted)'
        className='pointer-events-none absolute top-1/2 right-3 -translate-y-1/2'
      />
    </div>
  )
}
