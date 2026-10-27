import { roles } from './roles'
import type { SidebarKey } from '../types'

export function destinoSidebar(key: SidebarKey): string {
  const item = roles.psicologia.navItems.find((modulo) => modulo.key === key)
  return item ? item.hash.replace('#', '') : key
}
