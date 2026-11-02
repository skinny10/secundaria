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
import { ConfiguracionPlantelPage } from './Administrador/ConfiguracionPlantel/pages/ConfiguracionPlantelPage'
import { LoginPage } from './Login/pages/LoginPage'
import { PortalMaestrosPage } from './Maestros/shared/pages/PortalMaestrosPage'
import { SESSION_CHANGED_EVENT, getSession, rutaInicioPorRol } from './Login/services/authService'
import { SESSION_EXPIRED_EVENT } from './utils/services/apiClient'
import type { UserRole } from './Login/types/auth'

function leerHash() {
  return window.location.hash.replace('#', '')
}

function modulo(ruta: string): UserRole[] {
  if (ruta.startsWith('administrador') || ruta.startsWith('servicios-academicos')) {
    return ['ACADEMIC_SERVICES']
  }
  if (ruta.startsWith('maestros')) return ['TEACHER', 'PREFECT']
  return ['PSYCHOLOGIST']
}

function App() {
  const [vista, setVista] = useState(leerHash)
  const [session, setSession] = useState(getSession)

  useEffect(() => {
    const onHashChange = () => setVista(leerHash())
    const onSession = () => setSession(getSession())
    window.addEventListener('hashchange', onHashChange)
    window.addEventListener(SESSION_CHANGED_EVENT, onSession)
    window.addEventListener(SESSION_EXPIRED_EVENT, onSession)
    window.addEventListener('storage', onSession)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
      window.removeEventListener(SESSION_CHANGED_EVENT, onSession)
      window.removeEventListener(SESSION_EXPIRED_EVENT, onSession)
      window.removeEventListener('storage', onSession)
    }
  }, [])

  const ruta = vista.split('?')[0]
  const destino = session ? rutaInicioPorRol(session.user.role) : '#login'
  const redirigir = !session
    ? ruta !== 'login'
    : ruta === 'login' || ruta === '' || !modulo(ruta).includes(session.user.role)

  useEffect(() => {
    if (redirigir && window.location.hash !== destino) {
      window.location.hash = destino
    }
  }, [redirigir, destino])

  if (!session) return <LoginPage />
  if (redirigir) return null

  if (ruta.startsWith('maestros')) {
    return <PortalMaestrosPage ruta={ruta} />
  }

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
    return <ConfiguracionPlantelPage />
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
