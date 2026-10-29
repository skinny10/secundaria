import './styles/sa-theme.css'
import { useEffect, useState } from 'react'
import { CanalizacionesPage } from './Psicologia/Canalizaciones/pages/CanalizacionesPage'
import { ConcentradoPage } from './Psicologia/Concentrado/pages/ConcentradoPage'
import { DashboardPage } from './Psicologia/Dashboard/pages/DashboardPage'
import { ExpedientePage } from './Psicologia/Expediente/pages/ExpedientePage'
import { ReportesPage } from './Psicologia/Reportes/pages/ReportesPage'
import { AltaEstudiantePage } from './ServiciosAcademicos/AltaEstudiante/pages/AltaEstudiantePage'
import { CotejoDocumentacionPage } from './ServiciosAcademicos/CotejoDocumentacion/pages/CotejoDocumentacionPage'
import { EstadisticasPage } from './ServiciosAcademicos/Estadisticas/pages/EstadisticasPage'
import { ExpedienteAdministrativoPage } from './ServiciosAcademicos/Expediente/pages/ExpedienteAdministrativoPage'
import { FichaEscolarPage } from './ServiciosAcademicos/FichaEscolar/pages/FichaEscolarPage'
import { PadronGeneralPage } from './ServiciosAcademicos/PadronGeneral/pages/PadronGeneralPage'
import { TransferenciasPage } from './ServiciosAcademicos/Transferencias/pages/TransferenciasPage'
import { DirectorioPersonalPage } from './Administrador/DirectorioPersonal/pages/DirectorioPersonalPage'
import { AltaColaboradorPage } from './Administrador/AltaColaborador/pages/AltaColaboradorPage'
import { RolesPermisosPage } from './Administrador/RolesPermisos/pages/RolesPermisosPage'
import { BitacoraAuditoriaPage } from './Administrador/BitacoraAuditoria/pages/BitacoraAuditoriaPage'

function leerHash() {
  return window.location.hash.replace('#', '')
}

function App() {
  const [vista, setVista] = useState(leerHash)

  useEffect(() => {
    const onHashChange = () => setVista(leerHash())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const ruta = vista.split('?')[0]

  if (ruta === 'administrador' || ruta === 'administrador/directorio') {
    return <DirectorioPersonalPage />
  }
  if (ruta === 'administrador/alta' || ruta === 'administrador/nuevo' || ruta === 'administrador/registro') {
    return <AltaColaboradorPage />
  }
  if (ruta === 'administrador/roles') {
    return <RolesPermisosPage />
  }
  if (ruta === 'administrador/bitacora') {
    return <BitacoraAuditoriaPage />
  }
  if (ruta === 'administrador/configuracion') {
    return <DirectorioPersonalPage />
  }

  if (ruta === 'servicios-academicos' || ruta === 'servicios-academicos/padron') {
    return <PadronGeneralPage />
  }
  if (
    ruta === 'servicios-academicos/alta' ||
    ruta.startsWith('servicios-academicos/alta/')
  ) {
    return <AltaEstudiantePage />
  }
  if (
    ruta === 'servicios-academicos/cotejo' ||
    ruta.startsWith('servicios-academicos/cotejo/')
  ) {
    return <CotejoDocumentacionPage />
  }
  if (
    ruta === 'servicios-academicos/transferencias' ||
    ruta.startsWith('servicios-academicos/transferencias/')
  ) {
    return <TransferenciasPage />
  }
  if (ruta === 'servicios-academicos/estadisticas') return <EstadisticasPage />
  if (ruta === 'servicios-academicos/expediente') return <ExpedienteAdministrativoPage />
  if (ruta === 'servicios-academicos/ficha') return <FichaEscolarPage />
  if (ruta.startsWith('servicios-academicos')) return <PadronGeneralPage />

  if (ruta === 'reportes') return <ReportesPage />
  if (ruta === 'expediente') return <ExpedientePage />
  if (ruta === 'canalizaciones') return <CanalizacionesPage />
  if (ruta === 'concentrado') return <ConcentradoPage />
  return <DashboardPage />
}

export default App
