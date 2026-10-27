import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import type { AccesoRapido, TonoAcceso } from '../types'

const estilos: Record<TonoAcceso, { tarjeta: string; icono: string }> = {
  primario: {
    tarjeta: 'bg-[var(--sa-accent)] text-[var(--sa-on-accent)]',
    icono: 'bg-[var(--sa-on-accent)] text-[var(--sa-accent)]',
  },
  azul: {
    tarjeta: 'bg-[var(--sa-sky)] text-[var(--sa-steel)]',
    icono: 'bg-[var(--sa-card)] text-[var(--sa-steel)]',
  },
  durazno: {
    tarjeta: 'bg-[var(--sa-peach)] text-[var(--sa-coffee)]',
    icono: 'bg-[var(--sa-card)] text-[var(--sa-coffee)]',
  },
  menta: {
    tarjeta: 'bg-[var(--sa-menta)] text-[var(--sa-on-menta)]',
    icono: 'bg-[var(--sa-card)] text-[var(--sa-on-menta)]',
  },
}

interface AccesoRapidoCardProps {
  acceso: AccesoRapido
  onClick: () => void
}

export function AccesoRapidoCard({ acceso, onClick }: AccesoRapidoCardProps) {
  const estilo = estilos[acceso.tono]

  return (
    <button
      type='button'
      onClick={onClick}
      aria-label={`${acceso.titulo}: ${acceso.detalle}`}
      className={cn(
        'flex min-h-[44px] w-full items-start justify-between gap-3 rounded-2xl p-4 text-left shadow-[var(--shadow-sm)] transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]',
        estilo.tarjeta
      )}
    >
      <span className='flex min-w-0 items-start gap-3'>
        <span
          className={cn(
            'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
            estilo.icono
          )}
        >
          <Icon name={acceso.icono} size={18} color='currentColor' />
        </span>
        <span className='flex min-w-0 flex-col'>
          <span className='text-[14px] leading-tight font-extrabold'>{acceso.titulo}</span>
          <span className='mt-0.5 text-[12px] leading-snug font-semibold'>{acceso.detalle}</span>
        </span>
      </span>
      <Icon
        name='arrow-right'
        size={18}
        color='currentColor'
        className='mt-1 shrink-0'
      />
    </button>
  )
}
