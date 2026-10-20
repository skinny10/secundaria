import './ServiciosAcademicos/shared/styles/theme.css'
import { useThemeMode } from './ServiciosAcademicos/shared/hooks/useThemeMode'
import { PsicologiaPage } from './Psicologia/pages/PsicologiaPage'

function App() {
  const { theme } = useThemeMode()

  return (
    <div className='sa-app min-h-screen bg-[var(--sa-bg)] text-[var(--color-text-primary)]' data-theme={theme}>
      <PsicologiaPage />
    </div>
  )
}

export default App
