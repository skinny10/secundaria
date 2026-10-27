import { EtiquetaCampo } from '../atoms/EtiquetaCampo'
import type { ProtocoloCrisis } from '../types'

interface TarjetaSemaforoPupitreProps {
  protocolo: ProtocoloCrisis
}

export function TarjetaSemaforoPupitre({ protocolo }: TarjetaSemaforoPupitreProps) {
  return (
    <article className='flex flex-col gap-3 rounded-2xl bg-[var(--sa-field)] p-4'>
      <EtiquetaCampo>{protocolo.etiqueta}</EtiquetaCampo>

      <h3 className='text-[16px] leading-snug font-bold'>{protocolo.titulo}</h3>

      <p className='text-[13px] leading-relaxed text-[var(--sa-muted)]'>
        {protocolo.parrafo.map((parte, indice) => (
          <span key={`${protocolo.id}-${indice}`}>{parte.texto}</span>
        ))}
      </p>

      <ul className='flex flex-col gap-2'>
        {protocolo.fichas?.map((ficha) => (
          <li
            key={ficha.titulo}
            className='flex items-start gap-2.5 rounded-[14px] bg-[var(--sa-card)] p-3'
          >
            <span
              aria-hidden='true'
              className='mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full'
              style={{ backgroundColor: ficha.color }}
            />
            <p className='text-[13px] leading-relaxed text-[var(--sa-muted)]'>
              <span className='font-bold text-[var(--color-text-primary)]'>{ficha.titulo}</span>{' '}
              {ficha.texto}
            </p>
          </li>
        ))}
      </ul>

      {protocolo.nota ? (
        <p className='text-[12px] leading-relaxed text-[var(--sa-muted)] italic'>
          {protocolo.nota}
        </p>
      ) : null}
    </article>
  )
}
