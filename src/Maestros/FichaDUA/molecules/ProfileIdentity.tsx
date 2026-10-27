import { Chip } from '../../shared/atoms/Chip'
import { InfoLine } from '../atoms/InfoLine'
import { InitialsBadge } from '../../shared/atoms/InitialsBadge'
import type { FichaAlumno } from '../types'

interface ProfileIdentityProps {
  alumno: FichaAlumno
}

export function ProfileIdentity({ alumno }: ProfileIdentityProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <InitialsBadge initials={alumno.initials} />
        <div className="flex flex-col gap-2">
          <h2 className="text-[22px] font-extrabold leading-tight">{alumno.name}</h2>
          <Chip label={alumno.expediente} tone="sky" className="w-fit" />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <InfoLine icon="clipboard" emphasize>
          {`Matrícula: ${alumno.matricula}`}
        </InfoLine>
        <InfoLine icon="users">{alumno.grupo}</InfoLine>
        <InfoLine icon="calendar">{alumno.edad}</InfoLine>
      </div>
    </div>
  )
}
