import { TopInfoBar } from '../sections/TopInfoBar'
import { LoginCard } from '../sections/LoginCard'
import { SidePanel } from '../sections/SidePanel'
import { useLoginForm } from '../hooks/useLoginForm'
import { useTheme } from '../../utils/hooks/useTheme'
import { loginContent } from '../constants/loginContent'

export function LoginPage() {
  const form = useLoginForm()
  const { theme, toggle } = useTheme()
  const { cycle, zone, plantelKey } = loginContent.topBar

  return (
    <main className="min-h-screen bg-[var(--color-bg)] p-4 md:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <TopInfoBar
          cycle={cycle}
          zone={zone}
          plantelKey={plantelKey}
          theme={theme}
          onToggleTheme={toggle}
        />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          <LoginCard form={form} />
          <SidePanel />
        </div>
      </div>
    </main>
  )
}
