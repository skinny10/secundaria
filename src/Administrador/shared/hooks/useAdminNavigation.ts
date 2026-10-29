import { roles } from '../../../Portal/shared/constants/roles'
import type { SidebarKey } from '../../../Portal/shared/types'

export function useAdminNavigation() {
  return (key: SidebarKey) => {
    const item = roles.administrador.navItems.find((modulo) => modulo.key === key)
    if (item?.hash) window.location.hash = item.hash
  }
}
