import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import { protocoloCrisisDetalle } from '../constants/protocoloCrisisDetalle'

interface AsidePaso3Props {
  onAviso: (texto: string) => void
}

function telefonoHref(valor: string): string {
  return `tel:${valor.replace(/[^\d+]/g, '')}`
}

export function AsidePaso3({ onAviso }: AsidePaso3Props) {
  const { contactos, metas, exitoLocal, cedula } = protocoloCrisisDetalle
  const principal = contactos[0]
  const alterno = contactos[1]
  const circunferencia = 2 * Math.PI * 42

  return (
    <div className='flex min-w-0 flex-col gap-4'>
      <section className='flex flex-col gap-3 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-[18px] shadow-[var(--shadow-sm)]'>
        <header className='flex flex-wrap items-center justify-between gap-2'>
          <h2 className='flex items-center gap-2 text-[15px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
            <Icon name='phone' size={17} color='var(--color-forest)' className='shrink-0' />
            Contacto de Emergencia
          </h2>
          <Chip tono='cafe'>{principal.prioridad}</Chip>
        </header>

        <div className='flex items-center gap-3'>
          <span className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[var(--sa-peach)] text-[15px] font-extrabold text-[var(--sa-coffee)]'>
            {principal.iniciales}
          </span>
          <div className='flex min-w-0 flex-col'>
            <p className='text-[14px] leading-tight font-extrabold'>{principal.nombre}</p>
            <p className='text-[12px] leading-snug text-[var(--sa-muted)]'>{principal.relacion}</p>
          </div>
        </div>

        <dl className='flex flex-col gap-2'>
          <div className='flex flex-col gap-0.5 rounded-lg bg-[var(--sa-field)] px-3 py-2'>
            <dt className='text-[10.5px] font-bold tracking-[0.1em] text-[var(--sa-muted)] uppercase'>
              Celular Principal
            </dt>
            <dd>
              <a
                href={telefonoHref(principal.celular ?? '')}
                className='inline-flex min-h-[44px] items-center text-[14px] font-extrabold text-[var(--color-forest)] underline-offset-2 hover:underline'
              >
                {principal.celular}
              </a>
            </dd>
          </div>
          <div className='flex flex-col gap-0.5 rounded-lg bg-[var(--sa-field)] px-3 py-2'>
            <dt className='text-[10.5px] font-bold tracking-[0.1em] text-[var(--sa-muted)] uppercase'>
              Trabajo (Oficina)
            </dt>
            <dd className='text-[13px] leading-snug font-semibold'>{principal.trabajo}</dd>
          </div>
          <div className='flex items-center gap-1.5 px-1 text-[12px] leading-snug text-[var(--sa-muted)]'>
            <Icon name='clock' size={13} color='currentColor' className='shrink-0' />
            {principal.arribo}
          </div>
        </dl>

        <div className='flex items-center gap-2'>
          <a
            href={telefonoHref(principal.celular ?? '')}
            className='inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-[10px] bg-[var(--color-forest)] px-3 text-[13px] font-bold text-[var(--sa-on-accent)] transition hover:brightness-95'
          >
            <Icon name='phone' size={15} color='currentColor' />
            Marcar Directo
          </a>
          <button
            type='button'
            onClick={() => onAviso(`Borrador de mensaje SMS preparado para ${principal.nombre}. Envío real pendiente de integración.`)}
            aria-label={`Enviar mensaje a ${principal.nombre}`}
            className='inline-flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[10px] border border-[var(--sa-border)] bg-[var(--sa-field)] text-[var(--color-forest)] transition hover:brightness-95'
          >
            <Icon name='message-circle' size={17} color='currentColor' />
          </button>
        </div>

        <div className='flex flex-col gap-1 rounded-xl border border-[var(--sa-border)] p-3'>
          <div className='flex flex-wrap items-center justify-between gap-2'>
            <p className='text-[13px] leading-tight font-extrabold'>{alterno.nombre}</p>
            <Chip tono='gris'>{alterno.prioridad}</Chip>
          </div>
          <p className='text-[11.5px] leading-snug text-[var(--sa-muted)]'>{alterno.relacion}</p>
          <a
            href={telefonoHref(alterno.celular ?? '')}
            className='inline-flex min-h-[44px] items-center gap-1.5 text-[13px] font-bold text-[var(--color-forest)] underline-offset-2 hover:underline'
          >
            <Icon name='phone' size={13} color='currentColor' className='shrink-0' />
            Celular alterno: {alterno.celular}
          </a>
        </div>
      </section>

      <section className='flex flex-col gap-3 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-[18px] shadow-[var(--shadow-sm)]'>
        <header className='flex flex-wrap items-center justify-between gap-2'>
          <h2 className='flex items-center gap-2 text-[15px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
            <Icon name='flag' size={17} color='var(--color-forest)' className='shrink-0' />
            Metas PEI (Semestre 1)
          </h2>
          <Chip tono='menta'>Semestre Activo</Chip>
        </header>

        <ul className='flex flex-col gap-3'>
          {metas.map((meta) => (
            <li key={meta.id} className='flex flex-col gap-1.5'>
              <div className='flex items-start justify-between gap-2'>
                <p className='min-w-0 text-[13px] leading-tight font-bold'>{meta.titulo}</p>
                <span className='shrink-0 text-[12px] font-extrabold text-[var(--color-forest)]'>
                  {meta.porcentaje}%
                </span>
              </div>
              <div
                className='h-2 w-full overflow-hidden rounded-full bg-[var(--sa-field)]'
                role='progressbar'
                aria-valuenow={meta.porcentaje}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Avance de ${meta.titulo}`}
              >
                <div
                  className='h-full rounded-full bg-[var(--color-forest)]'
                  style={{ width: `${meta.porcentaje}%` }}
                />
              </div>
              <p className='text-[12px] leading-relaxed text-[var(--sa-muted)]'>{meta.descripcion}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className='flex flex-col items-center gap-3 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-[18px] shadow-[var(--shadow-sm)]'>
        <div className='relative h-[120px] w-[120px]'>
          <svg viewBox='0 0 100 100' className='h-full w-full' aria-hidden='true'>
            <circle cx='50' cy='50' r='42' fill='none' stroke='var(--sa-ring-track)' strokeWidth='9' />
            <circle
              cx='50'
              cy='50'
              r='42'
              fill='none'
              stroke='var(--color-forest)'
              strokeWidth='9'
              strokeLinecap='round'
              strokeDasharray={`${(exitoLocal.valor / 100) * circunferencia} ${circunferencia}`}
            />
          </svg>
          <div className='absolute inset-0 flex flex-col items-center justify-center'>
            <span className='text-[24px] leading-none font-extrabold text-[var(--color-forest)]'>
              {exitoLocal.valor}%
            </span>
            <span className='mt-1 text-[10.5px] font-bold tracking-[0.08em] text-[var(--sa-muted)] uppercase'>
              {exitoLocal.titulo}
            </span>
          </div>
        </div>
        <p className='text-center text-[12.5px] leading-relaxed text-[var(--sa-muted)]'>
          {exitoLocal.detalle}
        </p>
      </section>

      <section className='flex flex-col gap-2 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-[18px] shadow-[var(--shadow-sm)]'>
        <h2 className='flex items-center gap-2 text-[15px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
          <Icon name='shield-check' size={17} color='var(--color-forest)' className='shrink-0' />
          Cédula de Validación SEE
        </h2>
        <p className='text-[13px] leading-relaxed font-semibold'>{cedula.especialista}</p>
        <p className='text-[12.5px] leading-relaxed text-[var(--sa-muted)]'>{cedula.cedula}</p>
        <p className='text-[12.5px] leading-relaxed text-[var(--sa-muted)]'>{cedula.revision}</p>
        <Chip tono='menta' icon='circle-check' className='w-fit'>
          {cedula.chip}
        </Chip>
        <button
          type='button'
          onClick={() => onAviso('El acta de sesión se encuentra en revisión documental. Integración pendiente.')}
          className='inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-[10px] border border-[var(--sa-border)] bg-[var(--sa-field)] px-3 text-[12.5px] font-bold transition hover:brightness-95'
        >
          {cedula.enlace}
          <Icon name='arrow-right' size={14} color='currentColor' />
        </button>
      </section>
    </div>
  )
}
