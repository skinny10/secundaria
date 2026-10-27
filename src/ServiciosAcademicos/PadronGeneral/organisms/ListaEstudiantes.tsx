import { Icon } from '../../../utils/atoms/Icon'
import { TarjetaEstudiante } from './TarjetaEstudiante'
import { textosLista } from '../constants/padronContent'
import type { DestinoModulo, Estudiante } from '../types'

interface ListaEstudiantesProps {
  cargando: boolean
  error: string | null
  visibles: Estudiante[]
  onReintentar: () => void
  onLimpiar: () => void
  onNavegar: (destino: DestinoModulo, estudiante: Estudiante) => void
  onTransferir: (estudiante: Estudiante) => void
  estaTransferido: (estudiante: Estudiante) => boolean
}

function EsqueletoTarjeta() {
  return (
    <div className='flex w-full min-w-0 animate-pulse flex-col gap-4 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5'>
      <div className='flex min-w-0 gap-4'>
        <div className='h-[88px] w-[88px] shrink-0 rounded-xl bg-[var(--sa-field)]' />
        <div className='flex min-w-0 flex-1 flex-col gap-2'>
          <div className='h-5 w-2/3 rounded bg-[var(--sa-field)]' />
          <div className='h-6 w-1/2 rounded bg-[var(--sa-field)]' />
          <div className='h-4 w-4/5 rounded bg-[var(--sa-field)]' />
        </div>
      </div>
      <div className='h-16 w-full rounded-xl bg-[var(--sa-field)]' />
      <div className='flex justify-end gap-2'>
        <div className='h-11 w-32 rounded-xl bg-[var(--sa-field)]' />
        <div className='h-11 w-36 rounded-xl bg-[var(--sa-field)]' />
      </div>
    </div>
  )
}

export function ListaEstudiantes({
  cargando,
  error,
  visibles,
  onReintentar,
  onLimpiar,
  onNavegar,
  onTransferir,
  estaTransferido,
}: ListaEstudiantesProps) {
  if (cargando) {
    return (
      <section
        aria-label={textosLista.esqueletoAria}
        aria-busy='true'
        className='flex w-full min-w-0 flex-col gap-4'
      >
        <p role='status' className='sr-only'>
          {textosLista.cargando}
        </p>
        <EsqueletoTarjeta />
        <EsqueletoTarjeta />
        <EsqueletoTarjeta />
      </section>
    )
  }

  if (error) {
    return (
      <section
        role='alert'
        className='flex w-full min-w-0 flex-col items-center gap-3 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-6 text-center shadow-[var(--shadow-sm)]'
      >
        <span className='flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--sa-rosa)] text-[var(--sa-on-rosa)]'>
          <Icon name='alert-triangle' size={24} color='currentColor' />
        </span>
        <h2 className='text-[18px] font-extrabold'>{textosLista.errorTitulo}</h2>
        <p className='max-w-[60ch] text-[13.5px] text-[var(--sa-muted)]'>{error}</p>
        <button
          type='button'
          onClick={onReintentar}
          className='inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[var(--color-forest)] px-4 text-[13px] font-bold text-[var(--sa-on-accent)]'
        >
          <Icon name='refresh' size={16} color='currentColor' />
          {textosLista.errorBoton}
        </button>
      </section>
    )
  }

  if (visibles.length === 0) {
    return (
      <section className='flex w-full min-w-0 flex-col items-center gap-3 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-6 text-center shadow-[var(--shadow-sm)]'>
        <span className='flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--sa-field)] text-[var(--sa-muted)]'>
          <Icon name='search' size={24} color='currentColor' />
        </span>
        <h2 className='text-[18px] font-extrabold'>{textosLista.vacioTitulo}</h2>
        <p className='max-w-[60ch] text-[13.5px] text-[var(--sa-muted)]'>
          {textosLista.vacioTexto}
        </p>
        <button
          type='button'
          onClick={onLimpiar}
          className='inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[var(--color-forest)] px-4 text-[13px] font-bold text-[var(--sa-on-accent)]'
        >
          <Icon name='refresh' size={16} color='currentColor' />
          {textosLista.vacioBoton}
        </button>
      </section>
    )
  }

  return (
    <section aria-label={textosLista.ariaLista} className='flex w-full min-w-0 flex-col gap-4'>
      {visibles.map((estudiante) => (
        <TarjetaEstudiante
          key={estudiante.id}
          estudiante={estudiante}
          transferido={estaTransferido(estudiante)}
          onNavegar={onNavegar}
          onTransferir={onTransferir}
        />
      ))}
    </section>
  )
}
