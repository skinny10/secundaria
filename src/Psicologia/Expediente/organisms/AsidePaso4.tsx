import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import { acuerdosLegales } from '../constants/acuerdosLegales'

interface AsidePaso4Props {
  onAviso: (texto: string) => void
}

export function AsidePaso4({ onAviso }: AsidePaso4Props) {
  const { metas, resumen, auditoria } = acuerdosLegales

  return (
    <div className='flex min-w-0 flex-col gap-4'>
      <section className='flex flex-col gap-3 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-[18px] shadow-[var(--shadow-sm)]'>
        <header className='flex flex-wrap items-center justify-between gap-2'>
          <h2 className='flex items-center gap-2 text-[15px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
            <Icon name='flag' size={17} color='var(--color-forest)' className='shrink-0' />
            Metas PEI Trimestre 1
          </h2>
          <Chip tono='menta'>{metas.length} Activas</Chip>
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

        <button
          type='button'
          onClick={() => onAviso('El historial de avance PEI se encuentra en integración con el expediente central.')}
          className='inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[10px] border border-[var(--sa-border)] bg-[var(--sa-field)] px-3 text-[12.5px] font-bold transition hover:brightness-95'
        >
          <Icon name='history' size={15} color='currentColor' />
          Ver Historial de Avance PEI
        </button>
      </section>

      <section className='flex flex-col gap-3 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-[18px] shadow-[var(--shadow-sm)]'>
        <h2 className='flex items-center gap-2 text-[15px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
          <Icon name='folder' size={17} color='var(--color-forest)' className='shrink-0' />
          {resumen.titulo}
        </h2>

        <dl className='flex flex-col gap-2'>
          {resumen.filas.map((fila) => (
            <div key={fila.id} className='flex flex-col gap-0.5 rounded-lg bg-[var(--sa-field)] px-3 py-2'>
              <dt className='text-[10.5px] font-bold tracking-[0.08em] text-[var(--sa-muted)] uppercase'>
                {fila.etiqueta}
              </dt>
              <dd
                className='text-[12.5px] leading-snug font-bold'
                style={{ color: fila.acento ? 'var(--sa-coffee)' : 'var(--color-text-primary)' }}
              >
                {fila.valor}
              </dd>
            </div>
          ))}
        </dl>

        <div className='flex flex-col gap-2'>
          <p className='text-[10.5px] font-bold tracking-[0.12em] text-[var(--sa-muted)] uppercase'>
            {resumen.documentosTitulo}
          </p>
          <ul className='flex flex-col gap-1.5'>
            {resumen.documentos.map((documento) => (
              <li key={documento.id} className='flex min-w-0 items-start gap-2'>
                <Icon
                  name='circle-check'
                  size={14}
                  color='var(--color-forest)'
                  className='mt-0.5 shrink-0'
                />
                <span
                  className='min-w-0 text-[12px] leading-snug'
                  style={{ fontWeight: documento.actual ? 800 : 500 }}
                >
                  {documento.id}. {documento.nombre}
                </span>
              </li>
            ))}
          </ul>
          <p className='text-[11.5px] leading-snug font-semibold text-[var(--sa-muted)]'>
            {resumen.adicionales}
          </p>
        </div>
      </section>

      <section className='flex flex-col gap-2 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-field)] p-[18px]'>
        <p className='flex items-center gap-2 text-[13.5px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
          <Icon name='info' size={16} color='var(--color-forest)' className='shrink-0' />
          {auditoria.titulo}
        </p>
        <p className='text-[12px] leading-relaxed text-[var(--sa-muted)]'>{auditoria.texto}</p>
      </section>
    </div>
  )
}
