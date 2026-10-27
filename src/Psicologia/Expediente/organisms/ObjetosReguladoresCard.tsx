import { Icon } from '../../../utils/atoms/Icon'
import { TarjetaObjeto } from '../molecules/TarjetaObjeto'
import type { ProtocoloCrisisDetalle } from '../constants/protocoloCrisisDetalle'

interface ObjetosReguladoresCardProps {
  objetos: ProtocoloCrisisDetalle['objetos']
  onRegistrar: () => void
  bloqueado?: boolean
}

export function ObjetosReguladoresCard({
  objetos,
  onRegistrar,
  bloqueado = false,
}: ObjetosReguladoresCardProps) {
  return (
    <section className='flex flex-col gap-4 rounded-[12px] border border-[var(--sa-border)] bg-[var(--sa-card)] p-6 shadow-[var(--shadow-sm)]'>
      <header className='flex flex-wrap items-start justify-between gap-3'>
        <div className='flex min-w-0 items-start gap-3'>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-field)] text-[var(--color-forest)]'>
            <Icon name='package' size={20} color='currentColor' />
          </span>
          <div className='flex min-w-0 flex-col gap-1'>
            <h2 className='text-[19px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
              {objetos.titulo}
            </h2>
            <p className='text-[13px] leading-relaxed text-[var(--sa-muted)]'>{objetos.subtitulo}</p>
          </div>
        </div>
        <button
          type='button'
          onClick={onRegistrar}
          disabled={bloqueado}
          title={bloqueado ? 'El expediente está bloqueado por dictamen emitido.' : undefined}
          className='inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-[10px] border border-[var(--sa-border)] bg-[var(--sa-field)] px-3.5 text-[13px] font-bold transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60'
        >
          <Icon name='plus' size={15} color='currentColor' />
          Registrar Objeto
        </button>
      </header>

      <div className='grid w-full min-w-0 grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3'>
        {objetos.items.map((objeto) => (
          <TarjetaObjeto key={objeto.id} objeto={objeto} />
        ))}
      </div>
    </section>
  )
}
