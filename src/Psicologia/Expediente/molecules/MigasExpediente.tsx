import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import type { MigasExpediente as MigasExpedienteDatos } from '../types'

interface MigasExpedienteProps {
  migas: MigasExpedienteDatos[]
  estadoValidacion: 'vigente' | 'emitido'
  textoValidacion: string
}

export function MigasExpediente({
  migas,
  estadoValidacion,
  textoValidacion,
}: MigasExpedienteProps) {
  return (
    <nav
      aria-label='Migas de pan'
      className='sa-no-print flex flex-wrap items-center justify-between gap-2'
    >
      <ol className='flex min-w-0 flex-wrap items-center gap-1.5 text-[10.5px] font-bold tracking-widest text-[var(--sa-muted)] uppercase'>
        {migas.map((miga, indice) => (
          <li key={miga.texto} className='flex items-center gap-1.5'>
            <span className={miga.activo ? 'text-[var(--color-text-primary)]' : undefined}>
              {miga.texto}
            </span>
            {indice < migas.length - 1 ? (
              <Icon name='chevron-right' size={12} color='currentColor' className='shrink-0' />
            ) : null}
          </li>
        ))}
      </ol>

      <Chip tono={estadoValidacion === 'emitido' ? 'azul' : 'gris'} icon='circle-check'>
        {textoValidacion}
      </Chip>
    </nav>
  )
}
