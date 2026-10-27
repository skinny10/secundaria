import { Icon } from '../../../utils/atoms/Icon'
import type { DiagnosticoFiltro, GradoGrupoFiltro } from '../types'

interface TotalesFiltros {
  activos: number
  duaVigentes: string
}

interface FiltrosOperativosProps {
  gradoGrupo: GradoGrupoFiltro
  diagnostico: DiagnosticoFiltro
  totales: TotalesFiltros
  onGradoGrupo: (valor: GradoGrupoFiltro) => void
  onDiagnostico: (valor: DiagnosticoFiltro) => void
  onExportar: () => void
  onFirmar: () => void
}

export function FiltrosOperativos({
  gradoGrupo,
  diagnostico,
  totales,
  onGradoGrupo,
  onDiagnostico,
  onExportar,
  onFirmar,
}: FiltrosOperativosProps) {
  return (
    <section className='w-full min-w-0 rounded-[20px] bg-[var(--sa-field)] p-5 shadow-[var(--shadow-sm)]'>
      <div className='flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between'>
        <div className='flex min-w-0 items-center gap-2.5'>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-card)] text-[var(--color-text-primary)]'>
            <Icon name='sliders' size={18} color='currentColor' />
          </span>
          <h2 className='text-[15px] font-extrabold' style={{ color: 'var(--sa-title)' }}>
            Filtros Operativos de Alumnado Canalizado
          </h2>
        </div>
        <div className='flex flex-wrap items-center gap-2'>
          <button
            type='button'
            onClick={onExportar}
            className='inline-flex min-h-[44px] h-auto items-center gap-2 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-[18px] py-[10px] text-[13px] font-bold leading-[1.25] whitespace-normal transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]'
          >
            <Icon name='download' size={16} color='currentColor' className='shrink-0' />
            Exportar Formato Oficial XLS / PDF Foliado
          </button>
          <button
            type='button'
            onClick={onFirmar}
            className='inline-flex min-h-[44px] h-auto items-center gap-2 rounded-lg bg-[var(--sa-accent)] px-[18px] py-[10px] text-[13px] font-bold leading-[1.25] whitespace-normal text-[var(--sa-on-accent)] transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]'
          >
            <Icon name='file-signature' size={16} color='currentColor' className='shrink-0' />
            Firmar Digitalmente Cédula Semestral
          </button>
        </div>
      </div>

      <div className='mt-4 grid w-full min-w-0 grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4'>
        <label className='flex min-w-0 flex-col gap-1.5'>
          <span className='text-[11.5px] font-bold tracking-widest text-[var(--sa-muted)] uppercase'>
            Grado y Grupo (Secundaria)
          </span>
          <select
            value={gradoGrupo}
            onChange={(e) => onGradoGrupo(e.target.value as GradoGrupoFiltro)}
            className='h-11 w-full min-w-0 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-[13px] font-semibold'
          >
            <option value='todos'>Todos los Grados (1°, 2°, 3° General)</option>
            <option value='1° K'>1° K</option>
            <option value='1° H'>1° H</option>
            <option value='1° B'>1° B</option>
          </select>
        </label>

        <label className='flex min-w-0 flex-col gap-1.5'>
          <span className='text-[11.5px] font-bold tracking-widest text-[var(--sa-muted)] uppercase'>
            Condición / Diagnóstico Clínico
          </span>
          <div className='relative flex h-11 items-center rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)]'>
            <Icon
              name='brain'
              size={16}
              color='var(--sa-muted)'
              className='pointer-events-none absolute left-3 shrink-0'
            />
            <select
              value={diagnostico}
              onChange={(e) => onDiagnostico(e.target.value as DiagnosticoFiltro)}
              className='h-full w-full min-w-0 bg-transparent pl-9 pr-3 text-[13px] font-semibold'
            >
              <option value='todos'>Todas las Condiciones Registradas</option>
              <option value='tea'>TEA</option>
              <option value='tdah'>TDAH / BAP</option>
              <option value='auditiva'>Discapacidad Auditiva / Sensorial</option>
            </select>
          </div>
        </label>

        <div className='flex min-w-0 items-center justify-between gap-3 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-4 py-2'>
          <div className='min-w-0'>
            <p className='text-[10.5px] font-bold tracking-widest text-[var(--sa-muted)] uppercase'>
              Alumnos activos
            </p>
            <p className='text-[16px] leading-tight font-extrabold'>{totales.activos} Alumnos</p>
          </div>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--sa-field)] text-[var(--color-text-primary)]'>
            <Icon name='users' size={18} color='currentColor' />
          </span>
        </div>

        <div className='flex min-w-0 items-center justify-between gap-3 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-4 py-2'>
          <div className='min-w-0'>
            <p className='text-[10.5px] font-bold tracking-widest text-[var(--sa-muted)] uppercase'>
              DUA vigentes
            </p>
            <p className='text-[16px] leading-tight font-extrabold' style={{ color: '#7A4320' }}>
              {totales.duaVigentes}
            </p>
          </div>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--sa-menta)] text-[var(--sa-on-menta)]'>
            <Icon name='circle-check' size={18} color='currentColor' />
          </span>
        </div>
      </div>
    </section>
  )
}
