import { useMemo, useState } from 'react'
import { BitacoraHeader } from '../organisms/BitacoraHeader'
import { Timeline } from '../organisms/Timeline'
import { RegisterObservationModal } from '../organisms/RegisterObservationModal'
import { ProfileCard } from '../molecules/ProfileCard'
import { FilterPills } from '../molecules/FilterPills'
import { SummaryCard } from '../molecules/SummaryCard'
import { InfoBar } from '../molecules/InfoBar'
import { filtros } from '../constants/observaciones'
import type { BitacoraAlumno, FiltroId, Observacion } from '../types'

interface BitacoraPageProps {
  alumno: BitacoraAlumno
  observaciones: Observacion[]
  onAdd: (observacion: Observacion) => void
}

export function BitacoraPage({ alumno, observaciones, onAdd }: BitacoraPageProps) {
  const [filtro, setFiltro] = useState<FiltroId>('todas')
  const [modalOpen, setModalOpen] = useState(false)

  const visibles = useMemo(
    () => (filtro === 'todas' ? observaciones : observaciones.filter((o) => o.filtro === filtro)),
    [filtro, observaciones]
  )

  return (
    <>
      <ProfileCard alumno={alumno} />
      <BitacoraHeader onAdd={() => setModalOpen(true)} />
      <FilterPills filters={filtros} active={filtro} count={visibles.length} onChange={setFiltro} />
      <Timeline observaciones={visibles} />
      <SummaryCard />
      <InfoBar />

      {modalOpen ? (
        <RegisterObservationModal
          alumno={alumno}
          onClose={() => setModalOpen(false)}
          onSave={onAdd}
        />
      ) : null}
    </>
  )
}

