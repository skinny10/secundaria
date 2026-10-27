import type { IconName } from '../../../utils/types'
import type { ChipTone } from '../types'

interface NavChip {
  id: string
  label: string
  icon?: IconName
  tone: ChipTone
}

export const fichaContent = {
  nav: {
    back: { label: 'Volver al Directorio de Alumnos', icon: 'arrow-left' as IconName },
    chips: [
      {
        id: 'vigente',
        label: 'Ficha Oficial Vigente · Ciclo 2024-2025',
        icon: 'check' as IconName,
        tone: 'menta',
      },
      { id: 'protocolo', label: 'PROTOCOLO DUA NIVEL II', tone: 'neutral' },
    ] satisfies NavChip[],
  },
  section: {
    icon: 'book-open' as IconName,
    title: 'Pautas Pedagógicas DUA en Aula',
    subtitle: 'Guía de aplicación obligatoria para personal docente frente a grupo',
    chip: '4 Módulos Esenciales',
  },
  print: {
    icon: 'printer' as IconName,
    title: 'Material para Carpeta Física de Aula',
    subtitle:
      'Generación optimizada de alta legibilidad para docentes con lentes y personal suplente.',
    history: { label: 'Ver Historial de Observaciones', icon: 'history' as IconName },
    print: { label: 'Imprimir Pautas en Letra Grande (PDF)', icon: 'printer' as IconName },
  },
}
