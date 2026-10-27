import { Icon } from '../../../utils/atoms/Icon'
import type { RegistroCanalizacion } from '../types'

interface FichaClinicaProps {
  seleccionado: RegistroCanalizacion
}

const planOperativo = [
  'Notificar a Trabajo Social para citatorio de padres',
  'Aplicación de Batería Neuropsicológica breve',
  'Generar Ficha de Adaptación Curricular y DUA',
]

export function FichaClinica({ seleccionado }: FichaClinicaProps) {
  const iniciales = `${seleccionado.nombre.trim().charAt(0)}${seleccionado.apellidos
    .trim()
    .charAt(0)}`.toUpperCase()
  const afectaDesempeno =
    seleccionado.afectaDesempeno === null
      ? 'POR VALORAR'
      : seleccionado.afectaDesempeno
        ? 'SÍ'
        : 'NO'

  return (
    <aside className='sticky top-3 flex w-full min-w-0 flex-col gap-[10px] rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-[14px] shadow-[var(--shadow-sm)] lg:h-fit'>
      <div className='flex items-start justify-between gap-2'>
        <div className='flex min-w-0 flex-col'>
          <div className='flex items-center gap-2'>
            <Icon name='clipboard' size={16} color='var(--color-forest)' />
            <h3 className='text-[14.5px] font-extrabold uppercase'>Ficha Clínico-Educativa</h3>
          </div>
          <span className='text-[11px] font-bold uppercase text-[var(--sa-muted)]'>
            {seleccionado.folio}
          </span>
        </div>
        <div className='flex shrink-0 items-center gap-2'>
          <Icon name='printer' size={16} color='currentColor' />
          <span className='inline-flex items-center rounded-full bg-[var(--sa-peach)] px-2 py-0.5 text-[13px] font-bold text-[var(--sa-coffee)]'>
            {seleccionado.estado}
          </span>
        </div>
      </div>
      <div className='rounded-lg bg-[var(--sa-field)] p-[10px]'>
        <div className='flex items-center gap-3'>
          <span className='flex h-11 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--sa-accent)] text-[13px] font-bold text-[var(--sa-on-accent)]'>
            {iniciales}
          </span>
          <div className='min-w-0'>
            <p className='truncate text-[13px] font-bold uppercase'>
              {seleccionado.apellidos}, {seleccionado.nombre}
            </p>
            <p className='text-[13px] text-[var(--sa-accent)]'>
              {seleccionado.grado} Grupo {seleccionado.grupo} · {seleccionado.turno}
            </p>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
        <div className='min-w-0 rounded-lg bg-[var(--sa-field)] p-2'>
          <p className='text-[11px] font-bold tracking-widest uppercase text-[var(--sa-muted)]'>
            Fecha de Emisión
          </p>
          <p className='text-[13px] font-bold'>{seleccionado.fechaEmision}</p>
        </div>
        <div className='min-w-0 rounded-lg bg-[var(--sa-field)] p-2'>
          <p className='text-[11px] font-bold tracking-widest uppercase text-[var(--sa-muted)]'>
            ¿Afecta Desempeño?
          </p>
          <p
            className={`text-[13px] font-bold ${
              seleccionado.afectaDesempeno === null
                ? 'text-[var(--sa-muted)]'
                : 'text-[var(--sa-accent)]'
            }`}
          >
            {afectaDesempeno}
          </p>
        </div>
      </div>
      <div className='rounded-lg bg-[var(--sa-field)] p-[10px]'>
        <div className='flex items-center justify-between gap-2'>
          <span className='text-[11px] font-bold tracking-widest uppercase text-[var(--sa-muted)]'>
            CANALIZADO POR:
          </span>
          <span className='inline-flex items-center rounded-full bg-[var(--sa-peach)] px-2 py-0.5 text-[13px] font-bold text-[var(--sa-coffee)]'>
            {seleccionado.origen}
          </span>
        </div>
        <p className='mt-1 text-[13px] font-bold'>{seleccionado.emisor}</p>
        <p className='text-[13px] text-[var(--sa-muted)]'>
          Asignatura / Área: {seleccionado.asignatura}
        </p>
      </div>
      <div className='min-w-0'>
        <p className='text-[11px] font-bold tracking-widest uppercase text-[var(--sa-muted)]'>
          DESCRIPCIÓN DE LA PROBLEMÁTICA Y ANTECEDENTES
        </p>
        <div className='mt-1 rounded-lg bg-[var(--sa-field)] p-[10px] text-[13px] italic break-words [overflow-wrap:anywhere]'>
          {seleccionado.descripcion}
        </div>
      </div>
      <div className='min-w-0'>
        <p className='text-[11px] font-bold tracking-widest uppercase text-[var(--sa-muted)]'>
          PLAN INMEDIATO DE PSICOLOGÍA Y SEE
        </p>
        <div className='mt-1 flex flex-col gap-2'>
          {planOperativo.map((item) => (
            <label
              key={item}
              className='flex min-h-[44px] items-center gap-2 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] p-2 text-[13px]'
            >
              <input
                type='checkbox'
                className='h-4 w-4 shrink-0'
                defaultChecked={item === 'Notificar a Trabajo Social para citatorio de padres'}
              />
              <span className='min-w-0'>{item}</span>
            </label>
          ))}
        </div>
      </div>
      <button className='inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[var(--sa-accent)] px-3 text-[14.5px] font-bold text-[var(--sa-on-accent)] hover:brightness-95'>
        <Icon name='calendar' size={16} color='currentColor' />
        Agendar Valoración Psicopedagógica
      </button>
      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
        <button className='inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-field)] px-3 text-[14.5px] font-bold hover:brightness-95'>
          <Icon name='book-open' size={16} color='currentColor' />
          Abrir Expediente
        </button>
        <button className='inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-field)] px-3 text-[14.5px] font-bold hover:brightness-95'>
          <Icon name='pen' size={16} color='currentColor' />
          Firmar Recibido
        </button>
      </div>
      <div className='rounded-lg bg-[var(--sa-field)] p-2 text-center text-[13px] text-[var(--sa-muted)]'>
        Responsable SEE: Lic. Psicología Clínica Turno Vespertino
      </div>
    </aside>
  )
}
