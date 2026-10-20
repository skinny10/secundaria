import type { ReactNode } from 'react'
import { cn } from '../../../utils/cn'
import { Sidebar } from '../organisms/Sidebar'
import { TopBar } from '../organisms/TopBar'
import type { ThemeMode } from '../hooks/useThemeMode'

interface AppTemplateProps {
  activeId: string
  onNavigate?: (id: string) => void
  theme: ThemeMode
  onChangeTheme: (theme: ThemeMode) => void
  sidebarOpen: boolean
  onOpenSidebar: () => void
  onCloseSidebar: () => void
  contentClassName?: string
  children: ReactNode
}

export function AppTemplate({
  activeId,
  onNavigate,
  theme,
  onChangeTheme,
  sidebarOpen,
  onOpenSidebar,
  onCloseSidebar,
  contentClassName,
  children,
}: AppTemplateProps) {
  return (
    <div className="sa-app min-h-screen" data-theme={theme}>
      <Sidebar
        open={sidebarOpen}
        activeId={activeId}
        onNavigate={onNavigate}
        onClose={onCloseSidebar}
      />

      <div className="flex min-h-screen flex-col md:pl-[248px] xl:pl-[260px]">
        <TopBar onOpenSidebar={onOpenSidebar} theme={theme} onChangeTheme={onChangeTheme} />

        <main className={cn('flex w-full flex-1 flex-col gap-5', contentClassName)}>
          {children}
        </main>
      </div>
    </div>
  )
}
