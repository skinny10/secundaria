import { useRef, useState } from 'react'
import type { IconName } from '../../../utils/types'
import { cn } from '../../../utils/cn'
import { Icon } from '../../../utils/atoms/Icon'

export interface PasoConfig {
  id: number
  label: string
  icon: IconName
}

interface PasosExpedienteProps {
  pasos: PasoConfig[]
  activo: number
  onCambiar: (id: number) => void
  completados?: number[]
  mostrarEtiquetaActivo?: boolean
}

export function PasosExpediente({
  pasos,
  activo,
  onCambiar,
  completados = [],
  mostrarEtiquetaActivo = false,
}: PasosExpedienteProps) {
  const [foco, setFoco] = useState(activo)
  const refs = useRef<Array<HTMLButtonElement | null>>([])

  const mover = (delta: number) => {
    const indiceActivo = refs.current.findIndex((elemento) => elemento === document.activeElement)
    const referencia = indiceActivo >= 0 ? indiceActivo : pasos.findIndex((p) => p.id === foco)
    const siguiente = (referencia + delta + pasos.length) % pasos.length
    setFoco(pasos[siguiente].id)
    refs.current[siguiente]?.focus()
  }

  const irA = (indice: number) => {
    setFoco(pasos[indice].id)
    refs.current[indice]?.focus()
  }

  return (
    <div
      role='tablist'
      aria-label='Pasos del expediente'
      className='flex w-full min-w-0 flex-wrap items-stretch gap-1 rounded-[14px] bg-[var(--sa-field)] p-1'
    >
      {pasos.map((paso, indice) => {
        const seleccionado = paso.id === activo
        const enfocado = paso.id === foco
        const completado = !seleccionado && completados.includes(paso.id)
        return (
          <button
            key={paso.id}
            ref={(elemento) => {
              refs.current[indice] = elemento
            }}
            type='button'
            role='tab'
            aria-selected={seleccionado}
            aria-controls={`panel-paso-${paso.id}`}
            id={`tab-paso-${paso.id}`}
            tabIndex={enfocado ? 0 : -1}
            title={paso.label}
            onFocus={() => setFoco(paso.id)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') {
                e.preventDefault()
                mover(1)
              }
              if (e.key === 'ArrowLeft') {
                e.preventDefault()
                mover(-1)
              }
              if (e.key === 'Home') {
                e.preventDefault()
                irA(0)
              }
              if (e.key === 'End') {
                e.preventDefault()
                irA(pasos.length - 1)
              }
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setFoco(paso.id)
                onCambiar(paso.id)
              }
            }}
            onClick={() => {
              setFoco(paso.id)
              onCambiar(paso.id)
            }}
            className={cn(
              'flex min-h-[48px] min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-[12px] px-2 py-2 text-center text-[12px] leading-snug font-bold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]',
              seleccionado
                ? 'bg-[var(--sa-accent)] text-[var(--sa-on-accent)]'
                : 'text-[var(--color-text-primary)] hover:bg-[var(--sa-card)]'
            )}
          >
            <span className='flex min-w-0 items-center justify-center gap-1.5'>
              <Icon
                name={completado ? 'circle-check' : paso.icon}
                size={15}
                color='currentColor'
                className='shrink-0'
              />
              <span className='line-clamp-2 break-words'>{paso.label}</span>
              {seleccionado && mostrarEtiquetaActivo ? (
                <Icon name='chevron-right' size={14} color='currentColor' className='shrink-0' />
              ) : null}
            </span>
            {seleccionado && mostrarEtiquetaActivo ? (
              <span className='text-[9px] leading-none font-extrabold tracking-[0.12em] uppercase opacity-90'>
                Paso actual
              </span>
            ) : null}
            {completado ? (
              <span className='text-[9px] leading-none font-bold tracking-[0.08em] uppercase opacity-80'>
                Completado
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}
