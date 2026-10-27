import { useState } from 'react'
import { PaseSensorialCard } from './PaseSensorialCard'
import { ObjetosReguladoresCard } from './ObjetosReguladoresCard'
import { NotificacionCard } from './NotificacionCard'
import { TarjetaSemaforo } from '../molecules/TarjetaSemaforo'
import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import { alumno } from '../constants/expediente'
import { protocoloCrisisDetalle } from '../constants/protocoloCrisisDetalle'

interface Paso3ProtocoloCrisisProps {
  onAviso: (texto: string) => void
  bloqueado?: boolean
}

export function Paso3ProtocoloCrisis({ onAviso, bloqueado = false }: Paso3ProtocoloCrisisProps) {
  const [folioPase, setFolioPase] = useState(protocoloCrisisDetalle.pase.folioInicial)
  const { semaforo, pase, objetos, notificacion } = protocoloCrisisDetalle

  const reemitir = () => {
    if (bloqueado) {
      onAviso('El expediente está bloqueado por dictamen emitido; no es posible reemitir la credencial.')
      return
    }
    const acepta = window.confirm(
      '¿Reemitir la credencial QR del pase sensorial? El folio anterior quedará invalidado en el registro SEE.'
    )
    if (!acepta) return
    const nuevoFolio = `R-${String(Date.now()).slice(-4)}`
    setFolioPase(nuevoFolio)
    onAviso(`Credencial QR reemitida con el folio ${nuevoFolio}. El folio anterior fue invalidado.`)
  }

  return (
    <div className='flex flex-col gap-4'>
      <section className='flex flex-col gap-4 rounded-[12px] border border-[var(--sa-border)] bg-[var(--sa-card)] p-6 shadow-[var(--shadow-sm)]'>
        <header className='flex flex-wrap items-start justify-between gap-3'>
          <div className='flex min-w-0 items-start gap-3'>
            <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-field)] text-[var(--color-forest)]'>
              <Icon name='traffic-light' size={20} color='currentColor' />
            </span>
            <div className='flex min-w-0 flex-col gap-1'>
              <h2 className='text-[19px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
                {semaforo.titulo}
              </h2>
              <p className='text-[13px] leading-relaxed text-[var(--sa-muted)]'>{semaforo.subtitulo}</p>
            </div>
          </div>
          <Chip tono='gris' icon='clock'>
            {semaforo.chip}
          </Chip>
        </header>

        <div className='flex flex-col gap-3'>
          {semaforo.niveles.map((nivel) => (
            <TarjetaSemaforo key={nivel.id} nivel={nivel} />
          ))}
        </div>
      </section>

      <PaseSensorialCard
        pase={pase}
        folio={folioPase}
        alumno={alumno.nombre}
        grado={alumno.grado}
        onReemitir={reemitir}
        bloqueado={bloqueado}
      />

      <ObjetosReguladoresCard
        objetos={objetos}
        onRegistrar={() =>
          onAviso('El alta de objetos reguladores requiere autorización de Psicología y SEE. Integración pendiente.')
        }
        bloqueado={bloqueado}
      />

      <NotificacionCard notificacion={notificacion} onAviso={onAviso} />
    </div>
  )
}
