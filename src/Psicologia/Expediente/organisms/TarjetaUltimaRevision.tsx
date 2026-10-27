import { Icon } from '../../../utils/atoms/Icon'

interface TarjetaUltimaRevisionProps {
  titulo: string
  detalle: string
  accion: string
  onVerLog: () => void
}

export function TarjetaUltimaRevision({
  titulo,
  detalle,
  accion,
  onVerLog,
}: TarjetaUltimaRevisionProps) {
  return (
    <section className='sa-no-print flex flex-col gap-2 rounded-2xl bg-[var(--sa-field)] p-[18px]'>
      <p className='flex items-center gap-2 text-[13.5px] leading-tight font-bold'>
        <Icon name='history' size={16} color='var(--color-forest)' className='shrink-0' />
        {titulo}
      </p>
      <p className='text-[12.5px] leading-snug text-[var(--sa-muted)]'>{detalle}</p>
      <button
        type='button'
        onClick={onVerLog}
        className='inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-[12px] font-bold hover:brightness-95'
      >
        <Icon name='list-ordered' size={15} color='currentColor' className='shrink-0' />
        {accion}
      </button>
    </section>
  )
}
