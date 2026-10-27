import { Icon } from '../../../utils/atoms/Icon'
import { TarjetaPaseSensorial } from '../molecules/TarjetaPaseSensorial'
import { TarjetaSemaforoPupitre } from '../molecules/TarjetaSemaforoPupitre'
import type { ProtocoloCrisis } from '../types'

interface SeccionCProtocoloCrisisProps {
  protocolos: ProtocoloCrisis[]
}

export function SeccionCProtocoloCrisis({ protocolos }: SeccionCProtocoloCrisisProps) {
  return (
    <section
      id='seccion-c'
      role='tabpanel'
      aria-labelledby='pestana-C'
      className='flex flex-col gap-4 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-sm)]'
    >
      <header className='flex items-start gap-3'>
        <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-field)] text-[var(--sa-muted)]'>
          <Icon name='walk' size={20} color='currentColor' />
        </span>
        <div className='min-w-0'>
          <h2 className='text-[17px] leading-tight font-bold'>
            Sección C: Protocolo de Tránsito y Autorregulación en Crisis
          </h2>
          <p className='mt-1 text-[13px] leading-snug text-[var(--sa-muted)]'>
            Mecanismos de desescalada acordados con Prefectura y Servicio Social
          </p>
        </div>
      </header>

      <div className='grid gap-4 md:grid-cols-2'>
        {protocolos.map((protocolo) =>
          protocolo.tipo === 'pase' ? (
            <TarjetaPaseSensorial key={protocolo.id} protocolo={protocolo} />
          ) : (
            <TarjetaSemaforoPupitre key={protocolo.id} protocolo={protocolo} />
          )
        )}
      </div>
    </section>
  )
}
