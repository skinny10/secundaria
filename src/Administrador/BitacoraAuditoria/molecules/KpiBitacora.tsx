import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'

interface KpiBitacoraProps {
  titulo: string
  subtitulo: string
  valor: string
  apoyo: string
  icono: string
  destacado?: boolean
}

export function KpiBitacora({ titulo, subtitulo, valor, apoyo, icono, destacado }: KpiBitacoraProps) {
  return (
    <article className={cn('relative flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm', destacado ? 'border-transparent bg-[var(--color-forest)] text-[var(--sa-on-accent)]' : 'border-[var(--sa-border)] bg-[var(--sa-card)] text-[var(--sa-text)]')}>
      <div className='flex flex-col gap-3 p-7'>
        <div className='flex items-center gap-3'>
          <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl', destacado ? 'bg-white/15' : 'bg-[var(--sa-field)] text-[var(--color-forest)]')}>
            <Icon name={icono as any} size={24} />
          </div>
          <div>
            <p className={cn('text-[13px] font-bold uppercase tracking-wide', destacado ? 'text-white/80' : 'text-[var(--sa-muted)]')}>{titulo}</p>
            <p className='text-[20px] font-extrabold'>{subtitulo}</p>
          </div>
        </div>
        <p className='text-[44px] font-extrabold'>{valor}</p>
        <p className={cn('text-[20px]', destacado ? 'text-white/90' : 'text-[var(--sa-muted)]')}>{apoyo}</p>
      </div>
      <div className={cn('mt-auto h-1.5 w-full', destacado ? 'bg-white/40' : 'bg-[var(--color-forest)]/40')} />
    </article>
  )
}
