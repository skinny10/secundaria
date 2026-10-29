import { useState } from 'react'
import { AdministradorTemplate } from '../../shared/templates/AdministradorTemplate'
import { DirectorioHeader } from '../molecules/DirectorioHeader'
import { DirectorioKpiGrid } from '../organisms/DirectorioKpiGrid'
import { DirectorioTable } from '../molecules/DirectorioTable'
import { useDirectorio } from '../hooks/useDirectorio'
import { useAdminNavigation } from '../../shared/hooks/useAdminNavigation'

export function DirectorioPersonalPage() {
  const [busqueda, setBusqueda] = useState('')

  const { filtrados } = useDirectorio({ busqueda, rol: '', turno: '', estado: '' })

  const navegar = useAdminNavigation()

  const irAlta = () => {
    window.location.hash = '#administrador/alta'
  }

  return (
    <AdministradorTemplate
      vista='DIRECTORIO DE PERSONAL Y CONTROL DE ACCESOS'
      activeKey='directorio'
      onNavigate={navegar}
      busqueda={busqueda}
      onBuscar={setBusqueda}
    >
      <div className='mx-auto flex w-full max-w-[1900px] flex-col gap-12 px-6 py-12 text-[22px] leading-relaxed sm:px-10 lg:px-14'>
        <DirectorioHeader onAlta={irAlta} />
        <DirectorioKpiGrid />
        <DirectorioTable colaboradores={filtrados} />
      </div>
    </AdministradorTemplate>
  )
}
