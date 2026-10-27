import { FichaNavRow } from '../organisms/FichaNavRow'
import { ProfileCard } from '../organisms/ProfileCard'
import { SupportBoxes } from '../organisms/SupportBoxes'
import { SectionHeader } from '../organisms/SectionHeader'
import { ModulesGrid } from '../organisms/ModulesGrid'
import { PrintBar } from '../molecules/PrintBar'
import type { FichaAlumno } from '../types'

interface FichaDUAPageProps {
  alumno: FichaAlumno
}

export function FichaDUAPage({ alumno }: FichaDUAPageProps) {
  return (
    <>
      <FichaNavRow />
      <ProfileCard alumno={alumno} />
      <SupportBoxes alumno={alumno} />
      <SectionHeader />
      <ModulesGrid />
      <PrintBar />
    </>
  )
}
