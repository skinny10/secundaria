import { Icon } from '../../../utils/atoms/Icon'
import { paginacionPadron } from '../constants/padronContent'

interface PaginacionPadronProps {
  pagina: number
  totalPaginas: number
  desde: number
  hasta: number
  total: number
  filtrados: number
  onPagina: (pagina: number) => void
}

export function PaginacionPadron({
  pagina,
  totalPaginas,
  desde,
  hasta,
  total,
  filtrados,
  onPagina,
}: PaginacionPadronProps) {
  const hayFiltro = filtrados !== total

  return (
    <section
      aria-label={paginacionPadron.aria}
      className='flex w-full min-w-0 flex-col gap-3 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-5 py-4 shadow-[var(--shadow-sm)] sm:flex-row sm:items-center sm:justify-between'
    >
      <p className='flex min-w-0 items-start gap-2 text-[12.5px] leading-relaxed text-[var(--sa-muted)]'>
        <Icon
          name={paginacionPadron.infoIcon}
          size={16}
          color='var(--sa-muted)'
          className='mt-0.5 shrink-0'
        />
        <span aria-live='polite'>
          {paginacionPadron.resumen} <strong className='text-[var(--color-text-primary)]'>{desde}</strong>{' '}
          {paginacionPadron.al}{' '}
          <strong className='text-[var(--color-text-primary)]'>{hasta}</strong>{' '}
          {hayFiltro ? (
            <>
              {paginacionPadron.deCoincidencias}{' '}
              <strong className='text-[var(--color-text-primary)]'>{filtrados}</strong>{' '}
              {paginacionPadron.coincidencias} ({paginacionPadron.dePadron}{' '}
              <strong className='text-[var(--color-text-primary)]'>{total}</strong>{' '}
              {paginacionPadron.estudiantes})
            </>
          ) : (
            <>
              {paginacionPadron.dePadron}{' '}
              <strong className='text-[var(--color-text-primary)]'>{total}</strong>{' '}
              {paginacionPadron.estudiantes}
            </>
          )}
        </span>
      </p>

      <nav aria-label={paginacionPadron.aria} className='flex flex-wrap items-center gap-2'>
        <button
          type='button'
          onClick={() => onPagina(pagina - 1)}
          disabled={pagina <= 1}
          aria-label={paginacionPadron.ariaAnterior}
          className='inline-flex min-h-[44px] items-center rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-[12.5px] font-bold text-[var(--sa-muted)] hover:bg-[var(--sa-field)] disabled:cursor-not-allowed disabled:bg-[var(--sa-field)] disabled:opacity-60'
        >
          {paginacionPadron.anterior}
        </button>
        <span className='px-1 text-[12.5px] font-semibold whitespace-nowrap'>
          {paginacionPadron.pagina}{' '}
          <strong className='text-[var(--color-text-primary)]'>{pagina}</strong>{' '}
          {paginacionPadron.paginaDe} {totalPaginas}
        </span>
        <button
          type='button'
          onClick={() => onPagina(pagina + 1)}
          disabled={pagina >= totalPaginas}
          aria-label={paginacionPadron.ariaSiguiente}
          className='inline-flex min-h-[44px] items-center rounded-xl bg-[var(--color-forest)] px-3 text-[12.5px] font-bold text-[var(--sa-on-accent)] hover:brightness-95 disabled:cursor-not-allowed disabled:bg-[var(--sa-field)] disabled:text-[var(--sa-muted)]'
        >
          {paginacionPadron.siguiente}
        </button>
      </nav>
    </section>
  )
}
