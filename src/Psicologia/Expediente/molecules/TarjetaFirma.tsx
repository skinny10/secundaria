import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import { EtiquetaCampo } from '../atoms/EtiquetaCampo'
import type { FirmaExpediente } from '../types'

interface TarjetaFirmaProps {
  firma: FirmaExpediente
  onSolicitar: (firma: FirmaExpediente) => void
}

export function TarjetaFirma({ firma, onSolicitar }: TarjetaFirmaProps) {
  return (
    <article className='flex flex-col gap-2 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-field)] p-4'>
      <div className='flex flex-wrap items-start justify-between gap-2'>
        <EtiquetaCampo className='min-w-0 flex-1'>{firma.rol}</EtiquetaCampo>
        {firma.firmado ? (
          <Chip tono='menta' icon='check'>
            Firmado
          </Chip>
        ) : (
          <Chip tono='gris'>Pendiente</Chip>
        )}
      </div>

      <p className='text-[10.5px] leading-tight font-bold tracking-widest text-[var(--sa-muted)] uppercase'>
        {firma.autenticacion}
      </p>

      <p className='text-[18px] leading-tight font-extrabold tracking-tight'>
        {firma.nombre}
      </p>
      <span aria-hidden='true' className='block h-px w-full bg-[var(--sa-border)]' />
      <p className='text-[12.5px] leading-snug text-[var(--sa-muted)]'>{firma.credencial}</p>
      <p className='text-[11px] leading-snug text-[var(--sa-muted)]'>{firma.fecha}</p>

      {firma.firmado ? null : (
        <button
          type='button'
          onClick={() => onSolicitar(firma)}
          className='inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-[12px] font-bold hover:brightness-95'
        >
          <Icon name='file-signature' size={15} color='currentColor' className='shrink-0' />
          Solicitar firma
        </button>
      )}
    </article>
  )
}
