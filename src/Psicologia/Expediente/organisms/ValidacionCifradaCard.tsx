import { useEffect, useRef, useState } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import { CodigoQR } from '../atoms/CodigoQR'
import type { AcuerdosLegales } from '../constants/acuerdosLegales'

interface ValidacionCifradaCardProps {
  validacion: AcuerdosLegales['validacion']
  folio: string
  hash: string | null
  errorHash: boolean
  onAviso: (texto: string) => void
}

export function ValidacionCifradaCard({
  validacion,
  folio,
  hash,
  errorHash,
  onAviso,
}: ValidacionCifradaCardProps) {
  const [copiado, setCopiado] = useState(false)
  const temporizador = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (temporizador.current) window.clearTimeout(temporizador.current)
    }
  }, [])

  const copiar = async () => {
    if (!hash) return
    try {
      await navigator.clipboard.writeText(hash)
      setCopiado(true)
      onAviso('Hash SHA-256 copiado al portapapeles.')
      temporizador.current = window.setTimeout(() => setCopiado(false), 2200)
    } catch {
      onAviso('No fue posible copiar el hash. El navegador bloqueó el acceso al portapapeles.')
    }
  }

  return (
    <section className='flex flex-col gap-4 rounded-[12px] border border-[var(--sa-border)] bg-[var(--sa-card)] p-6 shadow-[var(--shadow-sm)]'>
      <header className='flex flex-wrap items-start justify-between gap-3'>
        <div className='flex min-w-0 items-start gap-3'>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-sky)] text-[var(--sa-steel)]'>
            <Icon name='qr-code' size={20} color='currentColor' />
          </span>
          <div className='flex min-w-0 flex-col gap-1'>
            <h2 className='text-[19px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
              {validacion.titulo}
            </h2>
            <p className='text-[13px] leading-relaxed text-[var(--sa-muted)]'>{validacion.subtitulo}</p>
          </div>
        </div>
        <Chip tono='menta' icon='shield-check'>
          FOLIO: {folio}
        </Chip>
      </header>

      <div className='grid grid-cols-1 gap-4 rounded-xl bg-[var(--sa-field)] p-4 md:grid-cols-[auto_minmax(0,1fr)]'>
        <div className='flex items-start justify-center'>
          <CodigoQR
            valor={`NexusEdu|DICTAMEN-SEE|${folio}|${hash ?? 'pendiente'}`}
            etiqueta={`Folio ${folio}`}
            size={128}
          />
        </div>

        <div className='flex min-w-0 flex-col gap-2.5'>
          <p className='text-[10.5px] font-bold tracking-[0.12em] text-[var(--sa-muted)] uppercase'>
            Sello digital criptográfico (SHA-256)
          </p>
          <div className='min-w-0 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 py-2.5'>
            {hash ? (
              <p className='font-mono text-[11.5px] leading-relaxed break-all text-[var(--color-text-primary)]'>
                {hash}
              </p>
            ) : (
              <p className='text-[12px] font-semibold text-[var(--sa-muted)]' role='status'>
                {errorHash
                  ? 'No fue posible calcular el sello en este navegador.'
                  : 'Calculando sello criptográfico…'}
              </p>
            )}
          </div>
          <p className='text-[12px] leading-relaxed text-[var(--sa-muted)]'>{validacion.leyenda}</p>
          <button
            type='button'
            onClick={copiar}
            disabled={!hash}
            className='inline-flex min-h-[44px] w-fit items-center justify-center gap-2 rounded-[10px] border border-[var(--sa-border)] bg-[var(--sa-card)] px-4 text-[13px] font-bold transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60'
          >
            <Icon name={copiado ? 'circle-check' : 'clipboard'} size={15} color='currentColor' />
            {copiado ? 'Copiado' : validacion.accion}
          </button>
        </div>
      </div>
    </section>
  )
}
