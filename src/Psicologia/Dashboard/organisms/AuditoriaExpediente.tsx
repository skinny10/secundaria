import { Chip } from '../../../Portal/shared/atoms/Chip'
import { FilaAuditoria } from '../molecules/FilaAuditoria'
import type { DocumentoAuditoria } from '../types'

interface AuditoriaExpedienteProps {
  documentos: DocumentoAuditoria[]
  integridad: string
}

export function AuditoriaExpediente({ documentos, integridad }: AuditoriaExpedienteProps) {
  return (
    <section className='flex h-full min-w-0 flex-col rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-4 shadow-[var(--shadow-sm)] sm:p-5'>
      <p className='text-[10.5px] font-bold tracking-widest text-[var(--sa-muted)] uppercase'>
        Marco normativo 2024-2025
      </p>
      <h2
        className='mt-1 text-[20px] leading-tight font-extrabold'
        style={{ color: 'var(--sa-title)' }}
      >
        Auditoría de Expedientes Únicos
      </h2>
      <p className='mt-1 text-[12.5px] leading-relaxed text-[var(--sa-muted)]'>
        Control de los 15 documentos obligatorios por alumno ante Supervisión de Zona 014.
      </p>

      <ul className='mt-3 flex flex-col'>
        {documentos.map((documento) => (
          <FilaAuditoria key={documento.id} documento={documento} />
        ))}
      </ul>

      <div className='mt-auto flex flex-wrap items-center justify-between gap-2 border-t border-[var(--sa-border)] pt-3'>
        <p className='text-[12.5px] font-semibold text-[var(--sa-muted)]'>
          Integridad Global:
        </p>
        <Chip tono='menta'>{integridad}% Conforme</Chip>
      </div>
    </section>
  )
}
