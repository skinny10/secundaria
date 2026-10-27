import { Icon } from '../../../utils/atoms/Icon'
import { CampoFiltro, campoControlClass } from '../molecules/CampoFiltro'
import { grupos, tiposDocumento } from '../constants/reportes'
import type { TipoDocumento } from '../types'

interface ReportesFiltersProps {
  ciclo: string
  onCiclo: (valor: string) => void
  tipo: 'todos' | TipoDocumento
  onTipo: (valor: 'todos' | TipoDocumento) => void
  grupo: string
  onGrupo: (valor: string) => void
  busqueda: string
  onBuscar: (valor: string) => void
}

export function ReportesFilters({
  ciclo,
  onCiclo,
  tipo,
  onTipo,
  grupo,
  onGrupo,
  busqueda,
  onBuscar,
}: ReportesFiltersProps) {
  return (
    <section className='w-full min-w-0 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-box)] p-[14px]'>
      <div className='grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4'>
        <CampoFiltro label='Ciclo Escolar Activo' icono='calendar'>
          <select value={ciclo} onChange={(event) => onCiclo(event.target.value)} className={campoControlClass}>
            <option value='2024-2025'>Ciclo 2024-2025 (Semestre Actual)</option>
            <option value='2023-2024'>Ciclo 2023-2024 (Histórico)</option>
          </select>
        </CampoFiltro>

        <CampoFiltro label='Tipo de Documentación' icono='file-text'>
          <select
            value={tipo}
            onChange={(event) => onTipo(event.target.value as 'todos' | TipoDocumento)}
            className={campoControlClass}
          >
            {tiposDocumento.map((opcion) => (
              <option key={opcion.id} value={opcion.id}>
                {opcion.label}
              </option>
            ))}
          </select>
        </CampoFiltro>

        <CampoFiltro label='Grado / Grupo' icono='users'>
          <select value={grupo} onChange={(event) => onGrupo(event.target.value)} className={campoControlClass}>
            {grupos.map((opcion) => (
              <option key={opcion.id} value={opcion.id}>
                {opcion.label}
              </option>
            ))}
          </select>
        </CampoFiltro>

        <CampoFiltro label='Buscar por Estudiante, CURP o Folio' icono='search'>
          <div className='flex h-11 min-w-0 items-center gap-2 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-3'>
            <Icon name='search' size={15} color='var(--sa-muted)' className='shrink-0' />
            <input
              value={busqueda}
              onChange={(event) => onBuscar(event.target.value)}
              placeholder='Ej. Mateo Gómez o SEE-2024-F104'
              className='h-full w-full min-w-0 bg-transparent text-[13px] outline-none placeholder:text-[var(--sa-muted)]'
            />
          </div>
        </CampoFiltro>
      </div>
    </section>
  )
}
