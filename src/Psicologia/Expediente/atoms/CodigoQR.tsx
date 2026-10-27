import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

interface CodigoQRProps {
  valor: string
  etiqueta: string
  size?: number
}

interface ResultadoQR {
  valor: string
  origen: string
}

export function CodigoQR({ valor, etiqueta, size = 132 }: CodigoQRProps) {
  const [resultado, setResultado] = useState<ResultadoQR | null>(null)

  useEffect(() => {
    let activo = true
    QRCode.toDataURL(valor, {
      width: size * 2,
      margin: 1,
      errorCorrectionLevel: 'M',
      color: { dark: '#000000', light: '#FFFFFF' },
    })
      .then((origen) => {
        if (activo) setResultado({ valor, origen })
      })
      .catch(() => {
        if (activo) setResultado(null)
      })
    return () => {
      activo = false
    }
  }, [valor, size])

  const origen = resultado && resultado.valor === valor ? resultado.origen : null

  return (
    <div
      className='flex flex-col items-center gap-1.5 rounded-xl p-2.5'
      style={{ width: size + 20, backgroundColor: 'var(--qr-surface)' }}
    >
      {origen ? (
        <img
          src={origen}
          width={size}
          height={size}
          alt={etiqueta}
          className='block h-auto w-full rounded-md'
        />
      ) : (
        <div
          className='flex items-center justify-center rounded-md bg-[var(--sa-field)] text-center text-[10.5px] font-bold text-[var(--sa-muted)]'
          style={{ width: size, height: size }}
          role='status'
        >
          Generando QR…
        </div>
      )}
      <span
        className='text-center text-[10px] leading-tight font-bold tracking-[0.12em] uppercase'
        style={{ color: 'var(--qr-ink)' }}
      >
        {etiqueta}
      </span>
    </div>
  )
}
