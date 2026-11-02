import { students as studentsBase } from '../constants/students'
import { PageHeader } from '../organisms/PageHeader'
import { MetricsRow } from '../organisms/MetricsRow'
import { FilterBar } from '../organisms/FilterBar'
import { StudentListSection } from '../organisms/StudentListSection'
import type { ThemeMode } from '../../../utils/hooks/useTheme'
import type { Student } from '../types'

interface HomePageProps {
  theme: ThemeMode
  onChangeTheme: (theme: ThemeMode) => void
  students?: Student[]
}

export function HomePage({ theme, onChangeTheme, students = studentsBase }: HomePageProps) {
  return (
    <>
      <PageHeader theme={theme} onChangeTheme={onChangeTheme} />
      <MetricsRow />
      <FilterBar />
      <StudentListSection students={students} />
    </>
  )
}
