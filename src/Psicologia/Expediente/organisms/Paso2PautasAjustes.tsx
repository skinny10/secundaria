import { Icon } from '../../../utils/atoms/Icon'
import { Chip } from '../../../Portal/shared/atoms/Chip'
import { planPautas } from '../constants/planPautas'
import type { PrincipioDUA } from '../constants/planPautas'

const tonoNivelMap: Record<'menta' | 'azul' | 'gris', 'menta' | 'azul' | 'gris'> = {
  menta: 'menta',
  azul: 'azul',
  gris: 'gris',
}

function PrincipioCard({ principio }: { principio: PrincipioDUA }) {
  return (
    <article className='flex min-w-0 flex-col gap-2 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-[14px]'>
      <div className='flex items-center gap-2'>
        <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--sa-sky)] text-[var(--sa-steel)]'>
          <Icon name={principio.icono} size={18} color='currentColor' />
        </span>
        <p className='text-[15px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
          {principio.numero}. {principio.titulo}
        </p>
      </div>
      <p className='text-[12.5px] leading-relaxed text-[var(--sa-muted)]'>{principio.descripcion}</p>
    </article>
  )
}

export function Paso2PautasAjustes() {
  return (
    <div className='flex flex-col gap-4'>
      <section className='flex flex-col gap-4 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-sm)]'>
        <header className='flex flex-wrap items-start justify-between gap-3'>
          <div className='flex min-w-0 items-start gap-3'>
            <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-menta)] text-[var(--sa-on-menta)]'>
              <Icon name='sliders' size={20} color='currentColor' />
            </span>
            <div className='min-w-0'>
              <h2 className='text-[20px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
                Plan de Pautas y Ajustes Razonables (DUA)
              </h2>
              <p className='mt-1 text-[12.5px] leading-snug text-[var(--sa-muted)]'>
                Adecuaciones específicas de aula ciclo 2024-2025 • {planPautas.gradoGrupo}
              </p>
            </div>
          </div>
          <Chip tono='gris' icon='clock'>
            {planPautas.vigencia}
          </Chip>
        </header>

        <div className='grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3'>
          {planPautas.principios.map((principio) => (
            <PrincipioCard key={principio.id} principio={principio} />
          ))}
        </div>
      </section>

      <section className='flex flex-col gap-4 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-sm)]'>
        <header className='flex min-w-0 items-start gap-3'>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-sky)] text-[var(--sa-steel)]'>
            <Icon name='book-open' size={20} color='currentColor' />
          </span>
          <div className='min-w-0'>
            <h2 className='text-[18px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
              Ajustes Curriculares por Asignatura
            </h2>
            <p className='mt-1 text-[12.5px] leading-snug text-[var(--sa-muted)]'>
              Medidas específicas con nivel de ajuste por área curricular
            </p>
          </div>
        </header>

        <div className='flex flex-col gap-3'>
          {planPautas.asignaturas.map((asignatura) => (
            <article
              key={asignatura.nombre}
              className='flex min-w-0 flex-col gap-3 rounded-[14px] border border-[var(--sa-border)] bg-[var(--sa-field)] p-4'
            >
              <div className='flex flex-wrap items-center justify-between gap-2'>
                <div className='flex min-w-0 items-center gap-2.5'>
                  <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-card)] text-[var(--color-forest)]'>
                    <Icon name={asignatura.icono} size={18} color='currentColor' />
                  </span>
                  <h3 className='text-[15px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
                    {asignatura.nombre}
                  </h3>
                </div>
                <Chip tono={tonoNivelMap[asignatura.tonoNivel]}>{asignatura.nivel}</Chip>
              </div>
              <ul className='flex flex-col gap-2'>
                {asignatura.ajustes.map((ajuste) => (
                  <li key={ajuste.titulo} className='flex min-w-0 items-start gap-2'>
                    <span className='mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-forest)]' />
                    <p className='min-w-0 text-[13px] leading-relaxed text-[var(--color-text-primary)]'>
                      <span className='font-bold'>{ajuste.titulo}</span>{' '}
                      <span className='text-[var(--sa-muted)]'>{ajuste.descripcion}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className='flex flex-col gap-4 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-sm)]'>
        <header className='flex min-w-0 items-start gap-3'>
          <span className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-menta)] text-[var(--sa-on-menta)]'>
            <Icon name='list-checks' size={20} color='currentColor' />
          </span>
          <div className='min-w-0'>
            <h2 className='text-[18px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
              Criterios de Evaluación y Acreditación Flexible
            </h2>
            <p className='mt-1 text-[12.5px] leading-snug text-[var(--sa-muted)]'>
              Lineamientos para garantizar una evaluación justa y equitativa
            </p>
          </div>
        </header>
        <div className='grid w-full min-w-0 grid-cols-1 gap-3 md:grid-cols-2'>
          {planPautas.criterios.map((criterio) => (
            <article
              key={criterio.id}
              className='flex min-w-0 flex-col gap-1 rounded-xl bg-[var(--sa-field)] px-4 py-3'
            >
              <p className='text-[13.5px] leading-tight font-extrabold' style={{ color: 'var(--sa-title)' }}>
                {criterio.titulo}
              </p>
              <p className='text-[12.5px] leading-relaxed text-[var(--sa-muted)]'>
                {criterio.descripcion}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}
