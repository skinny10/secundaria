import { useMemo, useState } from 'react'
import { AppTemplate } from '../templates/AppTemplate'
import { HomePage } from '../../Home/pages/HomePage'
import { CanalizacionesPage } from '../../Canalizaciones/pages/CanalizacionesPage'
import { useTheme } from '../../../utils/hooks/useTheme'
import { useAlumnosDocente } from '../hooks/useAlumnosDocente'
import type { Student } from '../../Home/types'

interface PortalMaestrosPageProps {
  ruta: string
}

const tonos: Student['tone'][] = ['menta', 'sky', 'peach']
const acciones: Student['actionTone'][] = ['forest', 'slate', 'coffee']

export function PortalMaestrosPage({ ruta }: PortalMaestrosPageProps) {
  const { theme, setTheme } = useTheme()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { alumnos, cargando, error } = useAlumnosDocente()
  const vista = ruta === 'maestros/canalizaciones' ? 'canalizaciones' : 'directorio'

  const students = useMemo<Student[]>(
    () =>
      alumnos.map((alumno, indice) => ({
        id: String(alumno.api.id),
        initials: `${alumno.api.firstName.charAt(0)}${alumno.api.lastName.charAt(0)}`.toUpperCase(),
        name: alumno.nombreCompleto,
        matricula: alumno.api.enrollmentNumber,
        salon: `${alumno.grado} ${alumno.grupo} · ${alumno.turno.toUpperCase()}`,
        tone: tonos[indice % tonos.length],
        actionTone: acciones[indice % acciones.length],
        condition: { label: alumno.api.active ? 'Alumno activo' : 'Alumno inactivo', icon: 'users', tone: tonos[indice % tonos.length] },
        adjustments: [],
        tracking: { icon: 'clock', text: `Turno ${alumno.turno}` },
      })),
    [alumnos]
  )

  const navegar = (id: string) => {
    window.location.hash = id === 'canalizaciones' ? '#maestros/canalizaciones' : '#maestros'
  }

  return (
    <AppTemplate
      activeId={vista}
      onNavigate={navegar}
      theme={theme}
      onChangeTheme={setTheme}
      sidebarOpen={sidebarOpen}
      onOpenSidebar={() => setSidebarOpen(true)}
      onCloseSidebar={() => setSidebarOpen(false)}
      contentClassName='px-4 py-5 md:px-6'
    >
      {vista === 'canalizaciones' ? (
        <CanalizacionesPage />
      ) : (
        <>
          {error ? (
            <div role='alert' className='rounded-xl border border-[#C62828] bg-[#FFF4F4] p-3 text-base font-bold text-[#C62828]'>
              {error}
            </div>
          ) : null}
          {cargando ? (
            <p role='status' className='text-base text-[var(--sa-muted)]'>Cargando alumnos…</p>
          ) : null}
          <HomePage theme={theme} onChangeTheme={setTheme} students={students} />
        </>
      )}
    </AppTemplate>
  )
}
