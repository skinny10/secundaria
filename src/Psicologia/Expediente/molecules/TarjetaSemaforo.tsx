import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import type { FragmentoTexto, NivelSemaforo } from '../constants/protocoloCrisisDetalle'

const fondos: Record<NivelSemaforo['id'], string> = {
  verde: 'var(--semaforo-verde-bg)',
  amarillo: 'var(--semaforo-amarillo-bg)',
  rojo: 'var(--semaforo-rojo-bg)',
}

const textos: Record<NivelSemaforo['id'], string> = {
  verde: 'var(--semaforo-verde-fg)',
  amarillo: 'var(--semaforo-amarillo-fg)',
  rojo: 'var(--semaforo-rojo-fg)',
}

function Fragmentos({ partes }: { partes: FragmentoTexto[] }) {
  return (
    <>
      {partes.map((parte, indice) =>
        parte.negrita ? (
          <strong key={`${parte.texto}-${indice}`} className='font-extrabold'>
            {parte.texto}
          </strong>
        ) : (
          <span key={`${parte.texto}-${indice}`}>{parte.texto}</span>
        )
      )}
    </>
  )
}

interface TarjetaSemaforoProps {
  nivel: NivelSemaforo
}

export function TarjetaSemaforo({ nivel }: TarjetaSemaforoProps) {
  return (
    <article
      className='flex min-w-0 flex-col gap-3 rounded-xl border p-4'
      style={{
        backgroundColor: fondos[nivel.id],
        borderColor: textos[nivel.id],
        color: textos[nivel.id],
      }}
    >
      <header className='flex flex-wrap items-center justify-between gap-2'>
        <div className='flex min-w-0 items-center gap-2.5'>
          <span
            aria-hidden='true'
            className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2'
            style={{ borderColor: textos[nivel.id], backgroundColor: 'var(--sa-card)' }}
          >
            <Icon
              name='traffic-light'
              size={17}
              color={textos[nivel.id]}
              className='shrink-0'
            />
          </span>
          <h3 className='min-w-0 text-[15px] leading-snug font-extrabold' style={{ color: textos[nivel.id] }}>
            {nivel.nivel}: {nivel.titulo}
          </h3>
        </div>
        <Chip tono={nivel.tono} icon='shield'>
          {nivel.chip}
        </Chip>
      </header>

      <div className='grid w-full min-w-0 grid-cols-1 gap-2.5 md:grid-cols-2'>
        <div className='flex min-w-0 flex-col gap-1.5 rounded-lg bg-[var(--sa-card)] p-3'>
          <p className='text-[10.5px] font-bold tracking-[0.12em] uppercase' style={{ color: textos[nivel.id] }}>
            {nivel.conductaEtiqueta}
          </p>
          <p className='text-[13px] leading-relaxed text-[var(--color-text-primary)]'>
            {nivel.conducta}
          </p>
        </div>

        <div className='flex min-w-0 flex-col gap-1.5 rounded-lg bg-[var(--sa-card)] p-3'>
          <p className='text-[10.5px] font-bold tracking-[0.12em] uppercase' style={{ color: textos[nivel.id] }}>
            {nivel.accionEtiqueta}
          </p>
          {nivel.accion ? (
            <p className='text-[13px] leading-relaxed text-[var(--color-text-primary)]'>
              <Fragmentos partes={nivel.accion} />
            </p>
          ) : null}
          {nivel.secuencia ? (
            <ol className='flex flex-col gap-2'>
              {nivel.secuencia.map((item, indice) => (
                <li key={indice} className='flex min-w-0 items-start gap-2'>
                  <span className='mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--sa-field)] text-[11px] font-extrabold text-[var(--color-text-primary)]'>
                    {indice + 1}
                  </span>
                  <span className='min-w-0 text-[13px] leading-relaxed text-[var(--color-text-primary)]'>
                    <Fragmentos partes={item} />
                  </span>
                </li>
              ))}
            </ol>
          ) : null}
        </div>
      </div>
    </article>
  )
}
