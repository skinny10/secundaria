import type { ReactNode } from 'react'

interface TarjetaIndicadorProps {
  etiqueta: string
  chip?: ReactNode
  children: ReactNode
}

export function TarjetaIndicador({ etiqueta, chip, children }: TarjetaIndicadorProps) {
  return (
    <article className='flex h-full min-w-0 flex-col gap-2 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-4 shadow-[var(--shadow-sm)]'>
      <div className='flex min-h-[24px] items-center justify-between gap-2'>
        <p className='text-[11px] leading-snug font-bold tracking-widest text-[var(--sa-muted)] uppercase'>
          {etiqueta}
        </p>
        {chip}
      </div>
      {children}
    </article>
  )
}
