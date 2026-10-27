import { students } from '../constants/students'
import { PageHeader } from '../organisms/PageHeader'
import { MetricsRow } from '../organisms/MetricsRow'
import { FilterBar } from '../organisms/FilterBar'
import { StudentListSection } from '../organisms/StudentListSection'
import type { ThemeMode } from '../../../utils/hooks/useTheme'

interface HomePageProps {
  theme: ThemeMode
  onChangeTheme: (theme: ThemeMode) => void
}

export function HomePage({ theme, onChangeTheme }: HomePageProps) {
  return (
    <>
      <PageHeader theme={theme} onChangeTheme={onChangeTheme} />
      <MetricsRow />
      <FilterBar />
      <StudentListSection students={students} />
    </>
  )
}
