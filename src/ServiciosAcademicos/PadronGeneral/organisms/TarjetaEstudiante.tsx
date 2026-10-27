import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import { EstudianteAvatar } from '../atoms/EstudianteAvatar'
import { AccionesEstudiante } from '../molecules/AccionesEstudiante'
import { BloqueInformativo } from '../molecules/BloqueInformativo'
import {
  configuracionAtencion,
  configuracionEstatus,
  textosLista,
} from '../constants/padronContent'
import { nombreCompleto } from '../constants/padronData'
import type { DestinoModulo, Estudiante } from '../types'

interface TarjetaEstudianteProps {
  estudiante: Estudiante
  transferido: boolean
  onNavegar: (destino: DestinoModulo, estudiante: Estudiante) => void
  onTransferir: (estudiante: Estudiante) => void
}

function etiquetaDocumentacion(estudiante: Estudiante): string {
  if (estudiante.estatusExpediente === 'cotejo_pendiente') {
    return textosLista.documentacion.cotejo_pendiente(estudiante.documentos.pendientes.length)
  }
  if (estudiante.estatusExpediente === 'validado') {
    return textosLista.documentacion.validado
  }
  return textosLista.documentacion.completo(
    estudiante.documentos.validados,
    estudiante.documentos.total
  )
}

export function TarjetaEstudiante({
  estudiante,
  transferido,
  onNavegar,
  onTransferir,
}: TarjetaEstudianteProps) {
  const nombre = nombreCompleto(estudiante)
  const estatus = configuracionEstatus[estudiante.estatusExpediente]
  const atencion =
    estudiante.atencionSEE === 'ninguna'
      ? null
      : configuracionAtencion[estudiante.atencionSEE]
  const idTitulo = `estudiante-${estudiante.id}`

  return (
    <article
      aria-labelledby={idTitulo}
      className='flex w-full min-w-0 flex-col gap-4 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-sm)]'
    >
      <div className='grid min-w-0 grid-cols-[88px_minmax(0,1fr)] items-start gap-4 sm:grid-cols-[88px_minmax(0,1fr)_auto]'>
        <EstudianteAvatar estudiante={estudiante} nombreCompleto={nombre} />

        <div className='flex min-w-0 flex-col gap-2'>
          <div className='flex flex-wrap items-center gap-2'>
            <Chip tono='menta' className='whitespace-nowrap'>
              {textosLista.matricula(estudiante.matricula)}
            </Chip>
            <Chip tono='gris'>
              <span className='font-mono whitespace-nowrap'>{textosLista.curp(estudiante.curp)}</span>
            </Chip>
          </div>

          <h3 id={idTitulo} className='text-[18px] leading-tight font-bold'>
            {nombre}
          </h3>

          <ul className='flex flex-wrap items-center gap-x-1 gap-y-1 text-[13px] text-[var(--sa-muted)]'>
            <li className='padron-dato'>
              <Icon name='graduation-cap' size={15} color='currentColor' className='shrink-0' />
              <span className='whitespace-nowrap'>
                {textosLista.gradoGrupo(estudiante.grado, estudiante.grupo, estudiante.turno)}
              </span>
            </li>
            <li className='padron-dato'>
              <Icon name='calendar' size={15} color='currentColor' className='shrink-0' />
              <span className='whitespace-nowrap'>{textosLista.edad(estudiante.edad)}</span>
            </li>
            <li className='padron-dato min-w-0'>
              <Icon name='person' size={15} color='currentColor' className='shrink-0' />
              <span className='min-w-0 break-words'>
                {textosLista.tutor(estudiante.tutor.nombre, estudiante.tutor.parentesco)}
              </span>
            </li>
          </ul>
        </div>

        <div className='col-span-2 flex flex-wrap items-start gap-2 sm:col-span-1 sm:max-w-[300px] sm:justify-end'>
          <Chip
            tono={estatus.tono}
            icon={estatus.icon}
            className='h-fit whitespace-nowrap'
          >
            {etiquetaDocumentacion(estudiante)}
          </Chip>
          {atencion ? (
            <Chip tono={atencion.tono} icon={atencion.icon} className='h-fit whitespace-nowrap'>
              {atencion.etiqueta}
            </Chip>
          ) : null}
        </div>
      </div>

      <BloqueInformativo bloque={estudiante.bloque} />

      <AccionesEstudiante
        estudiante={estudiante}
        transferido={transferido}
        onNavegar={onNavegar}
        onTransferir={onTransferir}
      />
    </article>
  )
}
