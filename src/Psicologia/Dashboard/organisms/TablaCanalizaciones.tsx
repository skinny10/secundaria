import type { RefObject } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import type { CanalizacionDashboard, FiltroUrgencia } from '../types'

interface ConteosUrgencia {
  todas: number
  prioritarias: number
  ordinarias: number
}

interface TablaCanalizacionesProps {
  filtro: FiltroUrgencia
  conteos: ConteosUrgencia
  visibles: CanalizacionDashboard[]
  totalFiltrado: number
  totalPaginas: number
  pagina: number
  onFiltro: (filtro: FiltroUrgencia) => void
  onPagina: (pagina: number) => void
  onAbrir: () => void
  contenedorRef: RefObject<HTMLDivElement | null>
}

const opciones: { valor: FiltroUrgencia; etiqueta: string; clase: string }[] = [
  {
    valor: 'todas',
    etiqueta: 'Todos',
    clase: 'bg-[var(--sa-card)] text-[var(--color-text-primary)]',
  },
  {
    valor: 'Prioritaria',
    etiqueta: 'Prioritaria',
    clase: 'bg-[var(--sa-rosa)] text-[var(--sa-on-rosa)]',
  },
  {
    valor: 'Ordinaria',
    etiqueta: 'Ordinaria',
    clase: 'bg-[var(--sa-field)] text-[var(--sa-muted)]',
  },
]

const columnas = [
  'Alumno y grupo',
  'Docente remitente',
  'Motivo detectado en aula',
  'Semáforo urgencia',
  'Acciones inmediatas',
]

export function TablaCanalizaciones({
  filtro,
  conteos,
  visibles,
  totalFiltrado,
  totalPaginas,
  pagina,
  onFiltro,
  onPagina,
  onAbrir,
  contenedorRef,
}: TablaCanalizacionesProps) {
  const contar = (valor: FiltroUrgencia) => {
    if (valor === 'todas') return conteos.todas
    if (valor === 'Prioritaria') return conteos.prioritarias
    return conteos.ordinarias
  }

  return (
    <div ref={contenedorRef} className='w-full min-w-0'>
      <section className='flex w-full min-w-0 flex-col rounded-[20px] bg-[var(--sa-field)] p-4 sm:p-5'>
        <div className='flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between'>
          <div className='flex min-w-0 items-start gap-3'>
            <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-accent)] text-[var(--sa-on-accent)]'>
              <Icon name='inbox' size={20} color='currentColor' />
            </span>
            <div className='min-w-0'>
              <h2
                className='text-[20px] leading-tight font-extrabold'
                style={{ color: 'var(--sa-title)' }}
              >
                Canalizaciones Recientes de Maestros esperando Valoración
              </h2>
              <p className='mt-0.5 text-[12.5px] leading-snug text-[var(--sa-muted)]'>
                Solicitudes recibidas en la bitácora SEE y pendientes de valoración
                psicopedagógica.
              </p>
            </div>
          </div>

          <div className='flex flex-wrap items-center gap-2'>
            <p className='text-[10.5px] font-bold tracking-widest text-[var(--sa-muted)] uppercase'>
              Filtro urgencia:
            </p>
            <div className='flex flex-wrap items-center gap-1.5'>
              {opciones.map((opcion) => {
                const activa = filtro === opcion.valor
                return (
                  <button
                    key={opcion.valor}
                    type='button'
                    aria-pressed={activa}
                    onClick={() => onFiltro(opcion.valor)}
                    className={cn(
                      'inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-[var(--sa-border)] px-3 text-[12px] font-bold whitespace-nowrap transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]',
                      opcion.clase,
                      activa && 'ring-2 ring-[var(--color-forest)]'
                    )}
                  >
                    {activa ? (
                      <Icon name='check' size={13} color='currentColor' className='shrink-0' />
                    ) : null}
                    {opcion.etiqueta} ({contar(opcion.valor)})
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className='mt-4 hidden overflow-x-auto rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] md:block'>
          <table className='w-full min-w-[980px] border-collapse text-left'>
            <thead>
              <tr className='bg-[var(--sa-field)]'>
                {columnas.map((columna) => (
                  <th
                    key={columna}
                    scope='col'
                    className='px-3 py-3 text-[10.5px] font-bold tracking-widest text-[var(--sa-muted)] uppercase'
                  >
                    {columna}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibles.length === 0 ? (
                <tr>
                  <td
                    colSpan={columnas.length}
                    className='px-4 py-6 text-center text-[13px] text-[var(--sa-muted)]'
                  >
                    No hay canalizaciones que coincidan con el filtro seleccionado.
                  </td>
                </tr>
              ) : (
                visibles.map((registro) => (
                  <tr
                    key={registro.id}
                    className='h-[76px] border-t border-[var(--sa-border)]'
                  >
                    <td className='px-3 py-2.5'>
                      <div className='flex items-center gap-2.5'>
                        <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--sa-menta)] text-[11px] font-extrabold text-[var(--sa-on-menta)]'>
                          {registro.iniciales}
                        </span>
                        <span className='min-w-0'>
                          <span className='block text-[13px] leading-tight font-bold'>
                            {registro.nombre}
                          </span>
                          <span className='mt-0.5 block text-[11.5px] leading-tight text-[var(--sa-muted)]'>
                            {registro.grado} {registro.grupo} · {registro.folio}
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className='px-3 py-2.5'>
                      <span className='block text-[12.5px] leading-tight font-semibold'>
                        {registro.docente}
                      </span>
                      <span className='mt-0.5 block text-[11.5px] leading-tight text-[var(--sa-muted)]'>
                        {registro.materia}
                      </span>
                    </td>
                    <td className='px-3 py-2.5'>
                      <p
                        title={registro.motivo}
                        className='line-clamp-2 max-w-[320px] text-[12px] leading-snug text-[var(--sa-muted)]'
                      >
                        {registro.motivo}
                      </p>
                    </td>
                    <td className='px-3 py-2.5'>
                      <Chip tono={registro.tonoUrgencia}>{registro.etiquetaUrgencia}</Chip>
                    </td>
                    <td className='px-3 py-2.5'>
                      <div className='flex items-center gap-2'>
                        <button
                          type='button'
                          onClick={onAbrir}
                          className='inline-flex h-11 items-center gap-1.5 rounded-lg bg-[var(--sa-accent)] px-3 text-[12px] font-bold whitespace-nowrap text-[var(--sa-on-accent)] transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]'
                        >
                          Abrir Valoración &amp; DUA
                        </button>
                        <button
                          type='button'
                          onClick={onAbrir}
                          aria-label={`Abrir expediente de ${registro.nombre}`}
                          className='inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--sa-border)] bg-[var(--sa-field)] transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]'
                        >
                          <Icon name='file-text' size={16} color='currentColor' />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <ul className='mt-4 flex flex-col gap-2 md:hidden'>
          {visibles.length === 0 ? (
            <li className='rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-4 text-center text-[13px] text-[var(--sa-muted)]'>
              No hay canalizaciones que coincidan con el filtro seleccionado.
            </li>
          ) : (
            visibles.map((registro) => (
              <li
                key={registro.id}
                className='flex flex-col gap-2 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-3'
              >
                <div className='flex items-start justify-between gap-2'>
                  <div className='flex min-w-0 items-center gap-2.5'>
                    <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--sa-menta)] text-[11px] font-extrabold text-[var(--sa-on-menta)]'>
                      {registro.iniciales}
                    </span>
                    <span className='min-w-0'>
                      <span className='block text-[13px] leading-tight font-bold'>
                        {registro.nombre}
                      </span>
                      <span className='mt-0.5 block text-[11.5px] leading-tight text-[var(--sa-muted)]'>
                        {registro.grado} {registro.grupo} · {registro.folio}
                      </span>
                    </span>
                  </div>
                  <Chip tono={registro.tonoUrgencia}>{registro.etiquetaUrgencia}</Chip>
                </div>
                <p className='text-[12px] leading-snug text-[var(--sa-muted)]'>{registro.motivo}</p>
                <p className='text-[11.5px] leading-tight font-semibold'>
                  {registro.docente} · {registro.materia}
                </p>
                <div className='flex flex-wrap items-center gap-2'>
                  <button
                    type='button'
                    onClick={onAbrir}
                    className='inline-flex min-h-[44px] items-center gap-1.5 rounded-lg bg-[var(--sa-accent)] px-3 text-[12px] font-bold text-[var(--sa-on-accent)] transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]'
                  >
                    Abrir Valoración &amp; DUA
                  </button>
                  <button
                    type='button'
                    onClick={onAbrir}
                    aria-label={`Abrir expediente de ${registro.nombre}`}
                    className='inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--sa-border)] bg-[var(--sa-field)] transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]'
                  >
                    <Icon name='file-text' size={16} color='currentColor' />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>

        <div className='mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
          <p className='min-w-0 text-[12px] leading-snug text-[var(--sa-muted)]'>
            Mostrando {visibles.length} de {totalFiltrado} canalizaciones pendientes registradas
            en bitácora SEE.
          </p>
          <div className='flex flex-wrap items-center gap-2'>
            <button
              type='button'
              onClick={() => onPagina(pagina - 1)}
              disabled={pagina <= 1}
              className='inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-[12px] font-bold transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)] disabled:cursor-not-allowed disabled:opacity-50'
            >
              <Icon name='chevron-left' size={14} color='currentColor' />
              Anterior
            </button>
            <p className='text-[12px] font-bold whitespace-nowrap'>
              Página {pagina} de {totalPaginas}
            </p>
            <button
              type='button'
              onClick={() => onPagina(pagina + 1)}
              disabled={pagina >= totalPaginas}
              className='inline-flex min-h-[44px] items-center gap-1.5 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-[12px] font-bold transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)] disabled:cursor-not-allowed disabled:opacity-50'
            >
              Siguiente
              <Icon name='chevron-right' size={14} color='currentColor' />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
