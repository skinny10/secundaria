import { AdministradorTemplate } from '../../shared/templates/AdministradorTemplate'
import { ContextBarRoles } from '../molecules/ContextBarRoles'
import { RolesHeader } from '../molecules/RolesHeader'
import { PerfilesGrid } from '../organisms/PerfilesGrid'
import { MatrizPermisos } from '../organisms/MatrizPermisos'
import { useAdminNavigation } from '../../shared/hooks/useAdminNavigation'

export function RolesPermisosPage() {
  const navegar = useAdminNavigation()
  const irNuevo = () => { window.location.hash = '#administrador/alta' }

  return (
    <AdministradorTemplate vista='ROLES Y PERMISOS' activeKey='roles' onNavigate={navegar} busqueda='' onBuscar={() => {}}>
      <div className='mx-auto flex w-full max-w-[1950px] flex-col gap-12 px-6 py-12 text-[22px] leading-relaxed sm:px-10 lg:px-14'>
        <ContextBarRoles />
        <RolesHeader onNuevo={irNuevo} />
        <PerfilesGrid />
        <MatrizPermisos />
      </div>
    </AdministradorTemplate>
  )
}
