import { useEffect, useRef, useState } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import type { ProtocoloCrisisDetalle } from '../constants/protocoloCrisisDetalle'

interface NotificacionCardProps {
  notificacion: ProtocoloCrisisDetalle['notificacion']
  onAviso: (texto: string) => void
}

export function NotificacionCard({ notificacion, onAviso }: NotificacionCardProps) {
  const [enviando, setEnviando] = useState(false)
  const [confirmado, setConfirmado] = useState(false)
  const temporizador = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (temporizador.current) window.clearTimeout(temporizador.current)
    }
  }, [])

  const probar = () => {
    if (enviando) return
    setEnviando(true)
    setConfirmado(false)
    temporizador.current = window.setTimeout(() => {
      setEnviando(false)
      setConfirmado(true)
      onAviso('Notificación de enlace de prueba confirmada: Prefectura recibió el aviso simulado.')
    }, 900)
  }

  return (
    <section className='flex flex-col gap-4 rounded-[12px] border border-[var(--sa-border)] bg-[var(--sa-card)] p-6 shadow-[var(--shadow-sm)]'>
      <header className='flex min-w-0 items-start gap-3'>
        <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-sky)] text-[var(--sa-steel)]'>
          <Icon name='bell' size={20} color='currentColor' />
        </span>
        <div className='flex min-w-0 flex-col gap-1'>
          <h2 className='text-[19px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
            {notificacion.titulo}
          </h2>
          <p className='text-[13px] leading-relaxed text-[var(--sa-muted)]'>{notificacion.subtitulo}</p>
        </div>
      </header>

      <ol className='grid w-full min-w-0 grid-cols-1 gap-3 md:grid-cols-3'>
        {notificacion.pasos.map((paso, indice) => (
          <li key={paso.id} className='flex min-w-0 flex-col gap-2 rounded-xl border border-[var(--sa-border)] p-4'>
            <div className='flex items-center gap-2'>
              <span className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-forest)] text-[13px] font-extrabold text-[var(--sa-on-accent)]'>
                {indice + 1}
              </span>
              <span className='inline-flex items-center rounded-full bg-[var(--sa-field)] px-2.5 py-1 text-[11px] font-bold text-[var(--sa-muted)]'>
                {paso.minutos}
              </span>
            </div>
            <h3 className='text-[14px] leading-snug font-extrabold' style={{ color: 'var(--sa-title)' }}>
              {paso.titulo}
            </h3>
            <p className='text-[13px] leading-relaxed text-[var(--color-text-primary)]'>
              {paso.descripcion}
            </p>
          </li>
        ))}
      </ol>

      <div className='flex flex-col items-start justify-between gap-3 rounded-xl bg-[var(--sa-field)] px-4 py-3 md:flex-row md:items-center'>
        <div className='flex min-w-0 items-start gap-3'>
          <span className='mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--sa-card)] text-[var(--color-forest)]'>
            <Icon name='zap' size={16} color='currentColor' />
          </span>
          <div className='flex min-w-0 flex-col gap-0.5'>
            <p className='text-[13.5px] font-extrabold' style={{ color: 'var(--sa-title)' }}>
              {notificacion.simulacionTitulo}
            </p>
            <p className='text-[12.5px] leading-relaxed text-[var(--sa-muted)]'>
              {notificacion.simulacionTexto}
            </p>
            {confirmado ? (
              <p className='flex items-center gap-1.5 text-[12px] font-bold text-[var(--sa-success-fg)]'>
                <Icon name='circle-check' size={14} color='currentColor' />
                Prueba completada. No se envió un aviso real.
              </p>
            ) : null}
          </div>
        </div>
        <button
          type='button'
          onClick={probar}
          disabled={enviando}
          className='inline-flex min-h-[44px] shrink-0 items-center justify-center gap-2 rounded-[10px] border border-[var(--sa-border)] bg-[var(--sa-card)] px-4 text-[13px] font-bold transition hover:brightness-95 disabled:cursor-wait disabled:opacity-70'
        >
          <Icon name='bell' size={15} color='currentColor' />
          {enviando ? 'Enviando…' : 'Probar Notificación de Enlace'}
        </button>
      </div>
    </section>
  )
}
