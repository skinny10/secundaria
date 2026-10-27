import type { IconName } from '../../../utils/types'
import type { SidebarItem } from '../types'

export const app = {
  name: 'NexusEdu',
  portal: 'PORTAL DOCENTE SENIOR',
} as const

export const navItems: SidebarItem[] = [
  { id: 'directorio', label: 'Directorio de Alumnos', icon: 'users' },
  { id: 'dua', label: 'Ficha Adaptaciones DUA', icon: 'book-open' },
  { id: 'bitacora', label: 'Bitácora de Aula', icon: 'clipboard' },
  { id: 'observacion', label: 'Registrar Observación', icon: 'pen' },
  { id: 'canalizaciones', label: 'Canalizaciones', icon: 'link' },
  { id: 'contacto', label: 'Contacto Directo SEE', icon: 'phone' },
]

interface PrivacyContent {
  icon: IconName
  title: string
  body: string
}

export const privacy: PrivacyContent = {
  icon: 'lock',
  title: 'Protección LGDNNA',
  body: 'Datos confidenciales protegidos bajo la Ley General de Derechos de Niñas, Niños y Adolescentes. Prohibida su divulgación externa.',
}

interface SegmentedContent {
  id: string
  label: string
  icon: IconName
}

interface TopBarContent {
  searchLabel: string
  cycle: string
  segmented: SegmentedContent[]
  profile: { name: string; role: string; initials: string }
}

export const topBarContent: TopBarContent = {
  searchLabel: 'Buscar en el portal',
  cycle: '2024-2025 · Matutino',
  segmented: [
    { id: 'light', label: 'Modo claro', icon: 'sun' },
    { id: 'dark', label: 'Modo oscuro', icon: 'moon' },
  ],
  profile: {
    name: 'Prof. Andrés Salazar Montes',
    role: 'Docente Titular · 3° Secundaria',
    initials: 'AS',
  },
}
