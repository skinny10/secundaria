import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import type { AcuerdosLegales, CompromisoParte } from '../constants/acuerdosLegales'

const estilosIcono: Record<CompromisoParte['id'], { bg: string; fg: string }> = {
  escuela: { bg: 'var(--sa-sky)', fg: 'var(--sa-steel)' },
  familia: { bg: 'var(--sa-peach)', fg: 'var(--sa-coffee)' },
  especialista: { bg: 'var(--sa-menta)', fg: 'var(--sa-on-menta)' },
}

interface CompromisosCardProps {
  compromisos: AcuerdosLegales['compromisos']
}

export function CompromisosCard({ compromisos }: CompromisosCardProps) {
  return (
    <section className='flex flex-col gap-4 rounded-[12px] border border-[var(--sa-border)] bg-[var(--sa-card)] p-6 shadow-[var(--shadow-sm)]'>
      <header className='flex min-w-0 items-start gap-3'>
        <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-menta-soft)] text-[var(--sa-on-menta)]'>
          <Icon name='handshake' size={20} color='currentColor' />
        </span>
        <div className='flex min-w-0 flex-col gap-1'>
          <h2 className='text-[19px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
            {compromisos.titulo}
          </h2>
          <p className='text-[13px] leading-relaxed text-[var(--sa-muted)]'>{compromisos.subtitulo}</p>
        </div>
      </header>

      <div className='grid w-full min-w-0 grid-cols-1 items-stretch gap-3 md:grid-cols-3'>
        {compromisos.partes.map((parte) => {
          const estilo = estilosIcono[parte.id]
          return (
            <article
              key={parte.id}
              className='flex min-w-0 flex-col gap-3 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-field)] p-4'
            >
              <span
                className='flex h-9 w-9 items-center justify-center rounded-lg'
                style={{ backgroundColor: estilo.bg, color: estilo.fg }}
              >
                <Icon name={parte.icono} size={17} color='currentColor' />
              </span>
              <h3 className='text-[15px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
                {parte.parte}
              </h3>
              <ul className='flex flex-1 flex-col gap-2'>
                {parte.items.map((item) => (
                  <li key={item} className='flex min-w-0 items-start gap-2'>
                    <Icon
                      name='check'
                      size={14}
                      color='var(--color-forest)'
                      className='mt-0.5 shrink-0'
                    />
                    <span className='min-w-0 text-[12.5px] leading-relaxed text-[var(--color-text-primary)]'>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <div className='mt-auto pt-1'>
                <Chip tono={parte.tono} className='max-w-full'>
                  {parte.chip}
                </Chip>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
