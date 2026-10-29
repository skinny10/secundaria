import type { IconName } from '../../../utils/types'

export type RoleKey = 'psicologia' | 'servicios_academicos' | 'administrador'

export type SidebarKey =
  | 'dashboard'
  | 'concentrado'
  | 'canalizaciones'
  | 'expedientes'
  | 'reportes'
  | 'padron'
  | 'alta'
  | 'cotejo'
  | 'transferencias'
  | 'estadisticas'
  | 'directorio'
  | 'roles'
  | 'bitacora'
  | 'configuracion'

export type TonoChip =
  | 'menta'
  | 'mentaSuave'
  | 'gris'
  | 'azul'
  | 'pizarra'
  | 'cafe'
  | 'bosque'
  | 'rosa'

export interface RoleNavItem {
  key: SidebarKey
  label: string
  icon: IconName
  hash: string
  proximamente?: boolean
}

export interface RoleUser {
  name: string
  role: string
  initials: string
  avatarUrl?: string
}

export type RoleFooter =
  | { type: 'norma'; norma: string; ciclo: string }
  | { type: 'ayuda'; title: string; text: string }

export interface RoleConfig {
  key: RoleKey
  portal: string
  bannerRol: string
  bannerIcon: IconName
  bannerToken: string
  system: string
  sidebarLabel: string
  sidebarAria: string
  searchPlaceholder: string
  homeKey: SidebarKey
  user: RoleUser
  navItems: RoleNavItem[]
  footer: RoleFooter
}
