import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import type { AlumnoConcentrado } from '../types'
import type { TonoChip } from '../../../Portal/shared/types'

interface TablaConcentradoProps {
  alumnos: AlumnoConcentrado[]
}

const columnas = [
  'N.P.',
  'Nombre completo del alumno',
  'CURP',
  'Edad / Sexo',
  'Gdo / Gpo',
  'Diagnóstico clínico / Condición',
  'Servicio médico',
  'Especialista SEE',
]

const tonosChip: Record<AlumnoConcentrado['diagnosticoTono'], TonoChip> = {
  menta: 'menta',
  durazno: 'cafe',
  azul: 'azul',
}

export function TablaConcentrado({ alumnos }: TablaConcentradoProps) {
  return (
    <section className='w-full min-w-0 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-[var(--shadow-sm)]'>
      <div className='flex flex-col gap-2 border-b border-[var(--sa-border)] bg-[var(--sa-field)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
        <div className='flex min-w-0 items-center gap-2.5'>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-card)] text-[var(--color-text-primary)]'>
            <Icon name='list-checks' size={18} color='currentColor' />
          </span>
          <h2 className='text-[15px] font-extrabold' style={{ color: 'var(--sa-title)' }}>
            Concentrado Oficial Semestral - SEE Chiapas / Expediente Clínico
          </h2>
        </div>
        <p className='flex items-center gap-2 text-[11.5px] font-semibold text-[var(--sa-muted)]'>
          <span className='h-2 w-2 shrink-0 rounded-full bg-emerald-500' />
          Actualizado con Cédula Oficial DUA
        </p>
      </div>

      <div className='w-full min-w-0 overflow-x-auto'>
        <table className='w-full table-auto border-collapse text-left'>
          <thead>
            <tr className='bg-[var(--sa-header)]'>
              {columnas.map((columna) => (
                <th
                  key={columna}
                  scope='col'
                  className='px-4 py-3 text-[10.5px] font-bold tracking-widest text-[var(--sa-muted)] uppercase whitespace-nowrap'
                >
                  {columna}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {alumnos.map((alumno) => (
              <tr
                key={alumno.id}
                className='h-[64px] border-t border-[var(--sa-border)] transition hover:bg-[var(--sa-field)]/60'
              >
                <td className='px-4 py-2.5'>
                  <span className='text-[13px] font-bold whitespace-nowrap'>{alumno.np}</span>
                </td>
                <td className='px-4 py-2.5'>
                  <span className='block min-w-[260px] max-w-[320px] text-[14px] leading-tight font-bold'>
                    {alumno.nombre}
                  </span>
                  <span className='mt-0.5 block text-[11px] leading-tight text-[var(--sa-muted)]'>
                    Expediente: {alumno.expediente}
                  </span>
                </td>
                <td className='px-4 py-2.5'>
                  <span className='block font-mono text-[12px] leading-tight whitespace-nowrap'>
                    {alumno.curp}
                  </span>
                </td>
                <td className='px-4 py-2.5'>
                  <span className='text-[12.5px] whitespace-nowrap'>{alumno.edadSexo}</span>
                </td>
                <td className='px-4 py-2.5'>
                  <Chip tono='azul' className='whitespace-nowrap'>
                    {alumno.gradoGrupo}
                  </Chip>
                </td>
                <td className='px-4 py-2.5'>
                  <Chip tono={tonosChip[alumno.diagnosticoTono]} icon={alumno.diagnosticoIcon} className='whitespace-nowrap'>
                    {alumno.diagnosticoLabel}
                  </Chip>
                </td>
                <td className='px-4 py-2.5'>
                  <Chip tono='gris' className='whitespace-nowrap'>
                    {alumno.servicioMedico}
                  </Chip>
                </td>
                <td className='px-4 py-2.5'>
                  <span className='inline-flex items-center gap-1.5 whitespace-nowrap text-[12.5px] font-semibold'>
                    <Icon name={alumno.especialistaIcon} size={15} color='var(--sa-muted)' className='shrink-0' />
                    {alumno.especialista}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='flex flex-col gap-2 border-t border-[var(--sa-border)] bg-[var(--sa-field)] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
        <p className='flex items-center gap-2 text-[12px] leading-snug text-[var(--sa-muted)]'>
          <Icon name='info' size={15} color='currentColor' className='shrink-0' />
          <span>Mostrando {alumnos.length} de {alumnos.length} registros certificados correspondientes al Concentrado Semestral</span>
        </p>
        <div className='flex flex-wrap items-center gap-2'>
          <button className='inline-flex h-11 items-center gap-1.5 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-[12px] font-bold' disabled>
            <Icon name='chevron-left' size={14} color='currentColor' />
            Anterior
          </button>
          <button className='inline-flex h-11 items-center justify-center rounded-lg bg-[var(--sa-card)] px-3 text-[12px] font-bold'>Página 1 de 1</button>
          <button className='inline-flex h-11 items-center gap-1.5 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-[12px] font-bold' disabled>
            Siguiente
            <Icon name='chevron-right' size={14} color='currentColor' />
          </button>
        </div>
      </div>
    </section>
  )
}
