import type { KeyboardEvent } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import { secciones } from '../constants/configInicial'
import type { SeccionConfigId } from '../types'

interface ConfigTabsProps {
  activa: SeccionConfigId
  onCambiar: (seccion: SeccionConfigId) => void
  erroresPorSeccion: Record<SeccionConfigId, number>
}

export function ConfigTabs({ activa, onCambiar, erroresPorSeccion }: ConfigTabsProps) {
  const mover = (evento: KeyboardEvent<HTMLButtonElement>, indice: number) => {
    let destino = indice
    if (evento.key === 'ArrowRight') destino = (indice + 1) % secciones.length
    else if (evento.key === 'ArrowLeft') destino = (indice - 1 + secciones.length) % secciones.length
    else if (evento.key === 'Home') destino = 0
    else if (evento.key === 'End') destino = secciones.length - 1
    else return

    evento.preventDefault()
    const siguiente = secciones[destino]
    onCambiar(siguiente.id)
    document.getElementById(`tab-${siguiente.id}`)?.focus()
  }

  return (
    <div
      role='tablist'
      aria-label='Secciones de configuración del plantel'
      className='grid grid-cols-1 gap-2.5 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-2.5 sm:grid-cols-2 min-[1200px]:grid-cols-4'
    >
      {secciones.map((seccion, indice) => {
        const seleccionada = seccion.id === activa
        const errores = erroresPorSeccion[seccion.id] ?? 0
        return (
          <button
            key={seccion.id}
            id={`tab-${seccion.id}`}
            type='button'
            role='tab'
            aria-selected={seleccionada}
            aria-controls={`panel-${seccion.id}`}
            tabIndex={seleccionada ? 0 : -1}
            onClick={() => onCambiar(seccion.id)}
            onKeyDown={(evento) => mover(evento, indice)}
            className={cn(
              'group flex min-h-[62px] min-w-0 items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200',
              'focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-forest)]',
              seleccionada
                ? 'bg-[var(--color-forest)] text-[var(--sa-on-accent)] shadow-sm'
                : 'border border-transparent text-[var(--sa-text)] hover:-translate-y-0.5 hover:border-[var(--sa-border)] hover:bg-[var(--sa-field)] hover:shadow-sm'
            )}
          >
            <Icon
              name={seccion.icono}
              size={22}
              aria-hidden='true'
              className={cn(
                'shrink-0 transition-transform duration-200',
                !seleccionada && 'text-[var(--color-forest)] group-hover:scale-110'
              )}
            />
            <span className='min-w-0 flex-1 text-[16px] leading-tight font-bold'>{seccion.label}</span>
            {errores > 0 ? (
              <span
                className={cn(
                  'inline-flex h-6 min-w-6 shrink-0 items-center justify-center rounded-full px-1.5 text-[12px] font-extrabold',
                  seleccionada
                    ? 'bg-[var(--sa-on-accent)] text-[var(--color-forest)]'
                    : 'bg-[var(--semaforo-rojo-bg)] text-[var(--semaforo-rojo-fg)]'
                )}
                title={`${errores} campo(s) con error`}
              >
                {errores}
              </span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}
