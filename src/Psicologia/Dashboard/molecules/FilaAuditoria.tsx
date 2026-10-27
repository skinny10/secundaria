import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import type { DocumentoAuditoria } from '../types'

const estilosEstado = {
  completo: {
    icono: 'circle-check' as const,
    color: 'var(--sa-green)',
    valor: 'text-[var(--sa-title)]',
  },
  parcial: {
    icono: 'clock' as const,
    color: 'var(--sa-coffee)',
    valor: 'text-[var(--sa-title)]',
  },
  pendiente: {
    icono: 'circle-x' as const,
    color: 'var(--sa-danger)',
    valor: 'text-[var(--sa-danger)]',
  },
}

interface FilaAuditoriaProps {
  documento: DocumentoAuditoria
}

export function FilaAuditoria({ documento }: FilaAuditoriaProps) {
  const estilo = estilosEstado[documento.estado]

  return (
    <li className='flex min-h-[44px] items-center justify-between gap-3 border-b border-[var(--sa-border)] py-2 last:border-b-0'>
      <span className='flex min-w-0 items-center gap-2'>
        <Icon
          name={estilo.icono}
          size={16}
          color={estilo.color}
          className='shrink-0'
        />
        <span className='min-w-0 text-[12.5px] leading-snug font-semibold'>
          {documento.nombre}
        </span>
      </span>
      <span
        className={cn(
          'shrink-0 text-[12.5px] font-bold whitespace-nowrap',
          estilo.valor
        )}
      >
        {documento.valor}
      </span>
    </li>
  )
}
