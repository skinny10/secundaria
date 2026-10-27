import { fechaCorte, folioSesion } from '../constants/dashboard'

export function EncabezadoBienvenida() {
  return (
    <section className='w-full min-w-0 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-sm)] sm:px-6'>
      <div className='grid min-w-0 grid-cols-1 items-start gap-4 min-[1100px]:grid-cols-[minmax(0,1fr)_auto]'>
        <div className='flex min-w-0 flex-col gap-2'>
          <p className='text-[11px] leading-snug font-bold tracking-widest text-[var(--sa-steel)] uppercase'>
            Servicios Educativos Especiales (SEE) · Clave CCT: 02EST0041Z
          </p>
          <h1
            className='max-w-[46ch] text-[clamp(24px,2.4vw,34px)] leading-tight'
            style={{ color: 'var(--sa-title)', fontWeight: 800 }}
          >
            Bienvenida, Dra. Claudia Méndez Ortiz
          </h1>
          <p className='max-w-[70ch] text-[14px] leading-relaxed text-[var(--sa-muted)]'>
            Resumen operativo del expediente psicopedagógico institucional: canalizaciones
            docentes, distribución de condiciones de aprendizaje y control normativo de los 15
            documentos oficiales de la SEE.
          </p>
        </div>

        <div className='grid w-full min-w-0 grid-cols-1 gap-3 rounded-xl bg-[var(--sa-field)] px-4 py-3 sm:grid-cols-2 min-[1100px]:w-auto'>
          <div className='min-w-0'>
            <p className='text-[10px] font-bold tracking-widest text-[var(--sa-muted)] uppercase'>
              Folio de sesión SEE
            </p>
            <p className='mt-1 text-[12.5px] leading-tight font-bold whitespace-nowrap'>
              {folioSesion}
            </p>
          </div>
          <div className='min-w-0'>
            <p className='text-[10px] font-bold tracking-widest text-[var(--sa-muted)] uppercase'>
              Corte oficial
            </p>
            <p className='mt-1 text-[12.5px] leading-tight font-semibold'>
              {fechaCorte()}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
