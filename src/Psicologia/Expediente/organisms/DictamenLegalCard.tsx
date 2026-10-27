import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import type { AcuerdosLegales } from '../constants/acuerdosLegales'

interface DictamenLegalCardProps {
  dictamen: AcuerdosLegales['dictamen']
}

export function DictamenLegalCard({ dictamen }: DictamenLegalCardProps) {
  return (
    <section className='relative overflow-hidden rounded-[12px] border border-[var(--sa-border)] bg-[var(--sa-card)] p-6 shadow-[var(--shadow-sm)]'>
      <span
        aria-hidden='true'
        className='pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[var(--sa-menta-soft)]'
      />
      <header className='relative flex flex-wrap items-start justify-between gap-3'>
        <div className='flex min-w-0 items-start gap-3'>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-sky)] text-[var(--sa-steel)]'>
            <Icon name='file-text' size={20} color='currentColor' />
          </span>
          <div className='flex min-w-0 flex-col gap-1'>
            <h2 className='text-[19px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
              {dictamen.titulo}
            </h2>
            <p className='text-[10.5px] font-bold tracking-[0.14em] text-[var(--sa-muted)] uppercase'>
              {dictamen.subtitulo}
            </p>
          </div>
        </div>
        <Chip tono='menta' icon='shield-check'>
          {dictamen.chip}
        </Chip>
      </header>

      <div className='relative mt-4 flex flex-col gap-2 rounded-xl bg-[var(--sa-field)] p-4'>
        <p className='text-[10.5px] font-bold tracking-[0.14em] text-[var(--sa-muted)] uppercase'>
          {dictamen.cajaTitulo}
        </p>
        <p className='text-[13.5px] leading-[1.7] text-[var(--color-text-primary)]'>
          {dictamen.parrafo.map((segmento, indice) =>
            segmento.negrita ? (
              <strong key={`${segmento.texto}-${indice}`} className='font-extrabold'>
                {segmento.texto}
              </strong>
            ) : (
              <span key={`${segmento.texto}-${indice}`}>{segmento.texto}</span>
            )
          )}
        </p>
      </div>

      <div className='relative mt-3 grid w-full min-w-0 grid-cols-1 gap-3 md:grid-cols-3'>
        {dictamen.cajas.map((caja) => (
          <article
            key={caja.id}
            className='flex min-w-0 flex-col gap-1.5 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-4'
          >
            <span
              className='mb-0.5 flex h-9 w-9 items-center justify-center rounded-lg'
              style={{
                backgroundColor: caja.acento ? 'var(--sa-peach)' : 'var(--sa-menta-soft)',
                color: caja.acento ? 'var(--sa-coffee)' : 'var(--sa-on-menta)',
              }}
            >
              <Icon name={caja.icono} size={17} color='currentColor' />
            </span>
            <p className='text-[10.5px] font-bold tracking-[0.1em] text-[var(--sa-muted)] uppercase'>
              {caja.etiqueta}
            </p>
            <p
              className='text-[16px] leading-tight font-extrabold'
              style={{ color: caja.acento ? 'var(--sa-coffee)' : 'var(--sa-title)' }}
            >
              {caja.valor}
            </p>
            <p className='text-[12.5px] leading-relaxed text-[var(--sa-muted)]'>{caja.detalle}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
