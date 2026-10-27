import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import type { IconName } from '../../../utils/types'

interface TarjetaRadioProps {
  id: string
  name: string
  label: string
  checked: boolean
  onChange: () => void
  descripcion?: string
  icono?: IconName
  className?: string
}

export function TarjetaRadio({
  id,
  name,
  label,
  checked,
  onChange,
  descripcion,
  icono,
  className,
}: TarjetaRadioProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'flex min-h-[56px] min-w-0 cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-[var(--color-forest)] has-[input:focus-visible]:ring-offset-2',
        checked
          ? 'border-[var(--color-forest)] bg-[var(--sa-menta-soft)] text-[var(--sa-on-menta-soft)]'
          : 'border-[var(--sa-input-border)] bg-[var(--sa-card)] text-[var(--color-text-primary)] hover:bg-[var(--sa-field)]',
        className
      )}
    >
      <input
        id={id}
        type='radio'
        name={name}
        checked={checked}
        onChange={onChange}
        className='sr-only'
      />
      <span
        aria-hidden='true'
        className={cn(
          'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2',
          checked
            ? 'border-[var(--color-forest)] bg-[var(--color-forest)]'
            : 'border-[var(--sa-muted)] bg-[var(--sa-card)]'
        )}
      >
        {checked ? <span className='h-2.5 w-2.5 rounded-full bg-[var(--sa-card)]' /> : null}
      </span>
      {icono ? (
        <Icon
          name={icono}
          size={19}
          color={checked ? 'var(--color-forest)' : 'var(--sa-muted)'}
          className='mt-0.5 shrink-0'
        />
      ) : null}
      <span className='flex min-w-0 flex-col gap-1'>
        <span className='text-[16px] leading-snug font-semibold break-words'>{label}</span>
        {descripcion ? (
          <span className='text-[13px] leading-snug text-[var(--sa-muted)]'>{descripcion}</span>
        ) : null}
      </span>
    </label>
  )
}

interface TarjetaCheckboxProps {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  descripcion?: string
  icono?: IconName
  className?: string
}

export function TarjetaCheckbox({
  id,
  label,
  checked,
  onChange,
  descripcion,
  icono,
  className,
}: TarjetaCheckboxProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'flex min-h-[56px] min-w-0 cursor-pointer items-start gap-3 rounded-xl border p-3 transition-colors has-[input:focus-visible]:ring-2 has-[input:focus-visible]:ring-[var(--color-forest)] has-[input:focus-visible]:ring-offset-2',
        checked
          ? 'border-[var(--color-forest)] bg-[var(--sa-menta-soft)] text-[var(--sa-on-menta-soft)]'
          : 'border-[var(--sa-input-border)] bg-[var(--sa-card)] text-[var(--color-text-primary)] hover:bg-[var(--sa-field)]',
        className
      )}
    >
      <input
        id={id}
        type='checkbox'
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className='sr-only'
      />
      <span
        aria-hidden='true'
        className={cn(
          'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2',
          checked
            ? 'border-[var(--color-forest)] bg-[var(--color-forest)] text-[var(--sa-on-accent)]'
            : 'border-[var(--sa-muted)] bg-[var(--sa-card)]'
        )}
      >
        {checked ? <Icon name='check' size={15} color='currentColor' /> : null}
      </span>
      {icono ? (
        <Icon
          name={icono}
          size={19}
          color={checked ? 'var(--color-forest)' : 'var(--sa-muted)'}
          className='mt-0.5 shrink-0'
        />
      ) : null}
      <span className='flex min-w-0 flex-col gap-1'>
        <span className='text-[16px] leading-snug font-semibold break-words'>{label}</span>
        {descripcion ? (
          <span className='text-[13px] leading-snug text-[var(--sa-muted)]'>{descripcion}</span>
        ) : null}
      </span>
    </label>
  )
}
