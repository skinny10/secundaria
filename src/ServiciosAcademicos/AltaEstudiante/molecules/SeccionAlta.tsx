import type { ReactNode } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import type { IconName } from '../../../utils/types'

interface SeccionAltaProps {
  titulo: string
  icono: IconName
  subtitulo?: string
  chip?: ReactNode
  ariaLabel?: string
  className?: string
  children: ReactNode
}

export function SeccionAlta({
  titulo,
  icono,
  subtitulo,
  chip,
  ariaLabel,
  className,
  children,
}: SeccionAltaProps) {
  return (
    <section
      aria-label={ariaLabel ?? titulo}
      className={cn(
        'flex w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-[var(--shadow-sm)]',
        className
      )}
    >
      <header className='flex min-w-0 flex-wrap items-start justify-between gap-2 border-b border-[var(--sa-border)] bg-[var(--sa-field)] px-4 py-3 sm:px-5'>
        <div className='flex min-w-0 items-start gap-2.5'>
          <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--sa-card)] text-[var(--color-forest)]'>
            <Icon name={icono} size={19} color='currentColor' />
          </span>
          <div className='min-w-0'>
            <h2 className='text-[17px] leading-snug font-extrabold break-words'>{titulo}</h2>
            {subtitulo ? (
              <p className='mt-0.5 text-[13px] leading-snug text-[var(--sa-muted)]'>{subtitulo}</p>
            ) : null}
          </div>
        </div>
        {chip ? <div className='shrink-0'>{chip}</div> : null}
      </header>
      <div className='flex min-w-0 flex-col gap-5 p-4 sm:p-5'>{children}</div>
    </section>
  )
}
