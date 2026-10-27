import { useState } from 'react'
import { cn } from '../../../utils/cn'
import { textosLista } from '../constants/padronContent'
import type { Estudiante } from '../types'

const tonos = [
  'bg-[var(--sa-menta-soft)] text-[var(--sa-on-menta-soft)]',
  'bg-[var(--sa-sky)] text-[var(--sa-steel)]',
  'bg-[var(--sa-peach)] text-[var(--sa-coffee)]',
] as const

function iniciales(estudiante: Estudiante): string {
  return `${estudiante.nombre.charAt(0)}${estudiante.apellidos.charAt(0)}`.toUpperCase()
}

function tonoPara(estudiante: Estudiante): string {
  const semilla = estudiante.id
    .split('')
    .reduce((total, caracter) => total + caracter.charCodeAt(0), 0)
  return tonos[semilla % tonos.length]
}

interface EstudianteAvatarProps {
  estudiante: Estudiante
  nombreCompleto: string
}

export function EstudianteAvatar({ estudiante, nombreCompleto }: EstudianteAvatarProps) {
  const [imagenFallida, setImagenFallida] = useState(false)
  const mostrarImagen = Boolean(estudiante.fotoUrl) && !imagenFallida

  if (mostrarImagen) {
    return (
      <img
        src={estudiante.fotoUrl}
        alt={textosLista.fotoAlt(nombreCompleto)}
        loading='lazy'
        onError={() => setImagenFallida(true)}
        className='h-[88px] w-[88px] rounded-xl object-cover'
      />
    )
  }

  return (
    <span
      role='img'
      aria-label={textosLista.ariaFoto(nombreCompleto)}
      className={cn(
        'flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-xl text-[24px] font-extrabold',
        tonoPara(estudiante)
      )}
    >
      {iniciales(estudiante)}
    </span>
  )
}
