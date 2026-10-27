import { EtiquetaCampo } from '../atoms/EtiquetaCampo'
import type { AjusteDUA } from '../types'

interface AjusteMateriaCardProps {
  ajuste: AjusteDUA
}

export function AjusteMateriaCard({ ajuste }: AjusteMateriaCardProps) {
  return (
    <article className='flex flex-col gap-1.5 rounded-[14px] border border-[var(--sa-border)] bg-[var(--sa-card)] p-4 shadow-[var(--shadow-sm)]'>
      <EtiquetaCampo icon='zap'>{ajuste.etiqueta}</EtiquetaCampo>
      <h4 className='text-[15px] leading-snug font-extrabold' style={{ color: 'var(--sa-title)' }}>
        {ajuste.titulo}
      </h4>
      <p className='text-[13px] leading-relaxed text-[var(--sa-muted)]'>{ajuste.descripcion}</p>
    </article>
  )
}
