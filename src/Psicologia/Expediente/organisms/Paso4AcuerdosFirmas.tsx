import { DictamenLegalCard } from './DictamenLegalCard'
import { CompromisosCard } from './CompromisosCard'
import { FirmasCard } from './FirmasCard'
import { ValidacionCifradaCard } from './ValidacionCifradaCard'
import { useHashSha256 } from '../hooks/useHashSha256'
import { acuerdosLegales, folioExpedienteLegal } from '../constants/acuerdosLegales'
import type { FirmaExpediente } from '../types'

interface Paso4AcuerdosFirmasProps {
  firmas: FirmaExpediente[]
  onSolicitarFirma: (firma: FirmaExpediente) => void
  onAviso: (texto: string) => void
  bloqueado?: boolean
}

export function Paso4AcuerdosFirmas({
  firmas,
  onSolicitarFirma,
  onAviso,
  bloqueado = false,
}: Paso4AcuerdosFirmasProps) {
  const contenido = JSON.stringify({
    folio: folioExpedienteLegal,
    dictamen: acuerdosLegales.dictamen.parrafo.map((parte) => parte.texto).join(''),
    firmas: firmas.map((firma) => ({
      rol: firma.rol,
      nombre: firma.nombre,
      credencial: firma.credencial,
      fecha: firma.fecha,
      token: firma.token,
      firmado: firma.firmado,
    })),
  })
  const { hash, error } = useHashSha256(contenido)

  return (
    <div className='flex flex-col gap-4'>
      <DictamenLegalCard dictamen={acuerdosLegales.dictamen} />
      <CompromisosCard compromisos={acuerdosLegales.compromisos} />
      <FirmasCard
        firmas={acuerdosLegales.firmas}
        datos={firmas}
        onSolicitar={onSolicitarFirma}
        bloqueado={bloqueado}
      />
      <ValidacionCifradaCard
        validacion={acuerdosLegales.validacion}
        folio={folioExpedienteLegal}
        hash={hash}
        errorHash={error}
        onAviso={onAviso}
      />
    </div>
  )
}
