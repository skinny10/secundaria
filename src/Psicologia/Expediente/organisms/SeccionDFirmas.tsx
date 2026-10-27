import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import { TarjetaFirma } from '../molecules/TarjetaFirma'
import type { FirmaExpediente } from '../types'

interface SeccionDFirmasProps {
  firmas: FirmaExpediente[]
  onSolicitar: (firma: FirmaExpediente) => void
}

export function SeccionDFirmas({ firmas, onSolicitar }: SeccionDFirmasProps) {
  return (
    <section
      id='seccion-d'
      role='tabpanel'
      aria-labelledby='pestana-D'
      className='flex flex-col gap-4 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-sm)]'
    >
      <header className='flex flex-wrap items-start justify-between gap-3'>
        <div className='flex min-w-0 items-start gap-3'>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-field)] text-[var(--color-forest)]'>
            <Icon name='file-signature' size={20} color='currentColor' />
          </span>
          <div className='min-w-0'>
            <h2 className='text-[17px] leading-tight font-bold'>
              Sección D: Firmas de Validación Legal y Aceptación
            </h2>
            <p className='mt-1 text-[13px] leading-snug text-[var(--sa-muted)]'>
              Cumplimiento con la Ley General de los Derechos de Niñas, Niños y Adolescentes
              (LGDNNA).
            </p>
          </div>
        </div>
        <Chip tono='azul' icon='lock'>
          Certificado Hash SHA-256
        </Chip>
      </header>

      <div className='grid gap-4 sm:grid-cols-2'>
        {firmas.map((firma) => (
          <TarjetaFirma key={firma.id} firma={firma} onSolicitar={onSolicitar} />
        ))}
      </div>
    </section>
  )
}
