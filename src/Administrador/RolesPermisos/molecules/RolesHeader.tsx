import { Icon } from '../../../utils/atoms/Icon'

interface RolesHeaderProps {
  onNuevo: () => void
}

export function RolesHeader({ onNuevo }: RolesHeaderProps) {
  return (
    <div className='flex flex-wrap items-center justify-between gap-6'>
      <div>
        <nav className='flex items-center gap-2 text-[19px] text-[var(--sa-muted)]'>
          <span>ADMINISTRACIÓN GENERAL</span>
          <span>›</span>
          <span>Control de Accesos</span>
        </nav>
        <h1 className='text-[56px] font-extrabold text-[var(--sa-text)] sm:text-[66px]'>Matriz Institucional de Roles y Permisos</h1>
        <p className='max-w-[1500px] text-[24px] text-[var(--sa-muted)]'>Definición de privilegios, niveles de confidencialidad médica/psicopedagógica y accesos operativos según el marco DUA (Diseño Universal para el Aprendizaje) y normativas federales SEP/LGDNNA.</p>
      </div>
      <div className='flex flex-wrap items-center gap-4'>
        <button type='button' className='inline-flex min-h-[64px] items-center gap-3 rounded-xl border border-[var(--sa-border)] px-7 text-[22px] font-semibold hover:bg-[var(--sa-field)]'>
          <Icon name='refresh' size={26} />
          Restablecer Defecto
        </button>
        <button type='button' className='inline-flex min-h-[64px] items-center gap-3 rounded-xl border border-[var(--sa-border)] px-7 text-[22px] font-semibold hover:bg-[var(--sa-field)]'>
          <Icon name='download' size={26} />
          Exportar PDF
        </button>
        <button type='button' onClick={onNuevo} className='inline-flex min-h-[64px] items-center gap-3 rounded-xl bg-[var(--color-forest)] px-9 text-[22px] font-bold text-[var(--sa-on-accent)] hover:brightness-95'>
          <Icon name='plus' size={26} />
          Crear Nuevo Perfil
        </button>
      </div>
    </div>
  )
}
