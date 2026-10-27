import { Icon } from '../../../utils/atoms/Icon'
import type { RegistroCanalizacion } from '../types'

interface RegistrosTableProps {
  registros: RegistroCanalizacion[]
  seleccionado: RegistroCanalizacion
  onSeleccionar: (registro: RegistroCanalizacion) => void
}

export function RegistrosTable({
  registros,
  seleccionado,
  onSeleccionar,
}: RegistrosTableProps) {
  return (
    <section className='flex min-w-0 flex-col gap-2 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-[14px] py-3 shadow-[var(--shadow-sm)]'>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex items-center gap-2'>
          <Icon name='book-open' size={18} color='var(--color-forest)' />
          <h2 className='text-[14.5px] font-extrabold'>Sábanas de Registros Recibidos</h2>
          <span className='inline-flex items-center gap-2 rounded-full bg-[var(--sa-menta)] px-3 py-1 text-[14.5px] font-bold'>
            {registros.length} Alumnos visibles
          </span>
        </div>
        <span className='text-[14.5px] text-[var(--sa-muted)]'>
          ● Sincronizado con Formulario de Google Forms &amp; SEE
        </span>
      </div>
      <div className='w-full min-w-0 overflow-x-auto'>
        <table className='w-full min-w-[700px] text-[14.5px]'>
          <thead className='bg-[var(--sa-field)]'>
            <tr>
              <th className='p-2 text-left text-[11px] font-bold tracking-widest uppercase'>
                MARCA TEMPORAL
              </th>
              <th className='p-2 text-left text-[11px] font-bold tracking-widest uppercase'>
                ALUMNO (NOMBRE Y GRADO)
              </th>
              <th className='p-2 text-left text-[11px] font-bold tracking-widest uppercase'>
                EMISOR / ORIGEN
              </th>
              <th className='p-2 text-left text-[11px] font-bold tracking-widest uppercase'>
                ASIGNATURA
              </th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro) => (
              <tr
                key={registro.id}
                onClick={() => onSeleccionar(registro)}
                className={`cursor-pointer border-t border-[var(--sa-border)] ${
                  seleccionado.id === registro.id ? 'bg-[var(--sa-field)]' : ''
                }`}
              >
                <td className='p-2 align-middle text-[13.5px] whitespace-nowrap'>
                  {registro.marcaTemporal}
                </td>
                <td className='p-2 align-middle'>
                  <p className='font-bold uppercase text-[13.5px]'>
                    {registro.apellidos}, {registro.nombre}
                  </p>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-[13.5px] font-bold ${
                      seleccionado.id === registro.id
                        ? 'bg-[var(--sa-accent)] text-[var(--sa-on-accent)]'
                        : 'bg-[var(--sa-sky)] text-[var(--sa-steel)]'
                    }`}
                  >
                    {registro.grado} {registro.grupo}
                  </span>
                </td>
                <td className='p-2 align-middle'>
                  <span className='inline-flex items-center rounded-full bg-[var(--sa-menta)] px-2 py-0.5 text-[13.5px] font-bold'>
                    {registro.origen}
                  </span>
                  <p className='mt-1 text-[13.5px] text-[var(--sa-muted)]'>{registro.emisor}</p>
                </td>
                <td className='p-2 align-middle text-[13.5px] text-[var(--sa-steel)]'>
                  {registro.asignatura}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex flex-wrap items-center justify-between gap-2 pt-2'>
        <p className='text-[14.5px] text-[var(--sa-muted)]'>
          Mostrando {registros.length} de {registros.length} registros recibidos
        </p>
        <div className='flex items-center gap-1'>
          <button className='inline-flex h-11 items-center rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-2 text-[14.5px] hover:bg-[var(--sa-field)]'>
            Anterior
          </button>
          <button className='inline-flex h-11 items-center rounded-lg bg-[var(--sa-accent)] px-2 text-[14.5px] text-[var(--sa-on-accent)]'>
            1
          </button>
          <button className='inline-flex h-11 items-center rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-2 text-[14.5px] hover:bg-[var(--sa-field)]'>
            2
          </button>
          <button className='inline-flex h-11 items-center rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-2 text-[14.5px] hover:bg-[var(--sa-field)]'>
            Siguiente
          </button>
        </div>
      </div>
    </section>
  )
}
