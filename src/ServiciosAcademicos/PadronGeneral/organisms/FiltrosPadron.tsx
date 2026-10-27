import { Icon } from '../../../utils/atoms/Icon'
import { busquedaPadron, filtrosPadron, opcionesEstatus } from '../constants/padronContent'
import { opcionesGrado } from '../constants/padronData'
import type { OpcionFiltro } from '../types'

interface FiltrosPadronProps {
  texto: string
  grado: string
  estatus: string
  onTexto: (valor: string) => void
  onGrado: (valor: string) => void
  onEstatus: (valor: string) => void
  onAlta: () => void
}

export function FiltrosPadron({
  texto,
  grado,
  estatus,
  onTexto,
  onGrado,
  onEstatus,
  onAlta,
}: FiltrosPadronProps) {
  return (
    <section
      aria-label={busquedaPadron.etiqueta}
      className='flex w-full min-w-0 flex-col gap-3 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-sm)]'
    >
      <p className='text-[10.5px] font-bold tracking-widest text-[var(--sa-muted)] uppercase'>
        {busquedaPadron.etiqueta}
      </p>

      <div className='flex min-w-0 flex-col gap-3 sm:flex-row'>
        <div className='flex h-12 min-w-0 flex-1 items-center gap-2 rounded-xl border border-[var(--sa-input-border)] bg-[var(--sa-field)] px-3'>
          <Icon
            name={busquedaPadron.iconoBusqueda}
            size={18}
            color='var(--sa-muted)'
            className='shrink-0'
          />
          <input
            type='search'
            value={texto}
            onChange={(event) => onTexto(event.target.value)}
            placeholder={busquedaPadron.placeholder}
            aria-label={busquedaPadron.ariaLabel}
            className='h-full w-full min-w-0 bg-transparent text-[14px] outline-none placeholder:text-[var(--sa-muted)]'
          />
        </div>
        <button
          type='button'
          onClick={onAlta}
          aria-label={busquedaPadron.botonAltaAria}
          className='inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[var(--color-forest)] px-4 text-[13px] font-bold text-[var(--sa-on-accent)] hover:brightness-95 sm:w-auto'
        >
          <Icon name={busquedaPadron.iconoAlta} size={18} color='currentColor' />
          <span className='whitespace-nowrap'>{busquedaPadron.botonAlta}</span>
        </button>
      </div>

      <div className='flex min-w-0 flex-wrap items-end gap-3'>
        <div className='flex min-w-[190px] flex-1 flex-col gap-1'>
          <label
            htmlFor='filtro-grado'
            className='text-[11px] font-bold tracking-wide text-[var(--sa-muted)] uppercase'
          >
            {filtrosPadron.gradoLabel}
          </label>
          <select
            id='filtro-grado'
            value={grado}
            onChange={(event) => onGrado(event.target.value)}
            className='h-11 w-full min-w-0 rounded-xl border border-[var(--sa-input-border)] bg-[var(--sa-card)] px-3 text-[13px] font-semibold'
          >
            {opcionesGrado.map((opcion: OpcionFiltro) => (
              <option key={opcion.value || 'todos'} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </select>
        </div>

        <div className='flex min-w-[190px] flex-1 flex-col gap-1'>
          <label
            htmlFor='filtro-estatus'
            className='text-[11px] font-bold tracking-wide text-[var(--sa-muted)] uppercase'
          >
            {filtrosPadron.estatusLabel}
          </label>
          <select
            id='filtro-estatus'
            value={estatus}
            onChange={(event) => onEstatus(event.target.value)}
            className='h-11 w-full min-w-0 rounded-xl border border-[var(--sa-input-border)] bg-[var(--sa-card)] px-3 text-[13px] font-semibold'
          >
            {opcionesEstatus.map((opcion) => (
              <option key={opcion.value || 'todos'} value={opcion.value}>
                {opcion.label}
              </option>
            ))}
          </select>
        </div>

        <p className='flex min-w-0 flex-1 items-center gap-1.5 text-[11px] leading-snug font-semibold text-[var(--sa-muted)] min-[1200px]:max-w-[340px] min-[1200px]:justify-end'>
          <Icon
            name={filtrosPadron.iconoSincronizacion}
            size={14}
            color='var(--sa-green)'
            className='shrink-0'
          />
          <span className='min-w-0'>{filtrosPadron.sincronizacion}</span>
        </p>
      </div>
    </section>
  )
}
