import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import type { FolioEmitido } from '../types'

const columnas = [
  'Folio Oficial',
  'Fecha de Emisión',
  'Estudiante Asociado',
  'Tipo de Trámite',
  'Estatus de Firmas',
  'Acción Legal',
]

interface HistorialFoliosProps {
  folios: FolioEmitido[]
  onAccion: (folio: FolioEmitido) => void
  onActualizar: () => void
}

export function HistorialFolios({ folios, onAccion, onActualizar }: HistorialFoliosProps) {
  return (
    <section className='flex min-w-0 flex-col gap-3'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex min-w-0 items-center gap-2'>
          <Icon name='history' size={18} color='var(--color-forest)' className='shrink-0' />
          <h2 className='text-[15px] font-extrabold'>
            Historial de Folios Emitidos y Resguardo Jurídico
          </h2>
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          <span className='text-[12px] font-semibold text-[var(--sa-muted)]'>
            Libro de Folios Tomo IV · 2024
          </span>
          <button
            type='button'
            onClick={onActualizar}
            className='inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-field)] px-3 text-[12px] font-bold hover:brightness-95'
          >
            <Icon name='refresh' size={15} color='currentColor' className='shrink-0' />
            Actualizar Bitácora
          </button>
        </div>
      </div>

      <div className='w-full min-w-0 overflow-hidden rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-[var(--shadow-sm)]'>
        <div className='hidden overflow-x-auto md:block'>
          <table className='w-full min-w-[900px] border-collapse text-[13px]'>
            <thead className='bg-[var(--sa-box)]'>
              <tr>
                {columnas.map((columna) => (
                  <th
                    key={columna}
                    className='px-3 py-3 text-left text-[11px] font-bold tracking-widest uppercase'
                  >
                    {columna}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {folios.map((folio) => (
                <tr key={folio.folio} className='border-t border-[var(--sa-border)] align-middle'>
                  <td className='px-3 py-4 text-[13px] font-bold whitespace-nowrap text-[var(--color-forest)]'>
                    {folio.folio}
                  </td>
                  <td className='px-3 py-4 text-[13px] whitespace-nowrap'>{folio.fecha}</td>
                  <td className='px-3 py-4'>
                    <p className='text-[13px] font-semibold'>{folio.estudiante}</p>
                    <p className='text-[12px] text-[var(--sa-muted)]'>{folio.detalle}</p>
                  </td>
                  <td className='px-3 py-4 text-[13px]'>{folio.tramite}</td>
                  <td className='px-3 py-4'>
                    <Chip tono={folio.tono}>{folio.estatus}</Chip>
                  </td>
                  <td className='px-3 py-4'>
                    <button
                      type='button'
                      onClick={() => onAccion(folio)}
                      className='inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-field)] px-3 py-2 text-[12px] font-bold whitespace-normal hover:brightness-95'
                    >
                      <Icon name={folio.accionIcono} size={15} color='currentColor' className='shrink-0' />
                      {folio.accion}
                    </button>
                  </td>
                </tr>
              ))}
              {folios.length === 0 ? (
                <tr>
                  <td colSpan={6} className='px-3 py-6 text-center text-[13px] text-[var(--sa-muted)]'>
                    No hay folios que coincidan con los filtros seleccionados.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className='flex flex-col gap-3 p-3 md:hidden'>
          {folios.map((folio) => (
            <article
              key={folio.folio}
              className='min-w-0 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-3'
            >
              <div className='flex flex-wrap items-center justify-between gap-2'>
                <p className='text-[13px] font-bold whitespace-nowrap text-[var(--color-forest)]'>
                  {folio.folio}
                </p>
                <Chip tono={folio.tono}>{folio.estatus}</Chip>
              </div>
              <p className='mt-2 text-[13px] font-semibold'>{folio.estudiante}</p>
              <p className='text-[12px] text-[var(--sa-muted)]'>{folio.detalle}</p>
              <dl className='mt-2 flex flex-col gap-1 text-[12px]'>
                <div className='flex justify-between gap-2'>
                  <dt className='text-[var(--sa-muted)]'>Fecha</dt>
                  <dd className='text-right font-semibold'>{folio.fecha}</dd>
                </div>
                <div className='flex justify-between gap-2'>
                  <dt className='shrink-0 text-[var(--sa-muted)]'>Trámite</dt>
                  <dd className='text-right font-semibold'>{folio.tramite}</dd>
                </div>
              </dl>
              <button
                type='button'
                onClick={() => onAccion(folio)}
                className='mt-2 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-field)] px-3 py-2 text-[12px] font-bold whitespace-normal hover:brightness-95'
              >
                <Icon name={folio.accionIcono} size={15} color='currentColor' className='shrink-0' />
                {folio.accion}
              </button>
            </article>
          ))}
          {folios.length === 0 ? (
            <p className='p-3 text-center text-[13px] text-[var(--sa-muted)]'>
              No hay folios que coincidan con los filtros seleccionados.
            </p>
          ) : null}
        </div>
      </div>
    </section>
  )
}
