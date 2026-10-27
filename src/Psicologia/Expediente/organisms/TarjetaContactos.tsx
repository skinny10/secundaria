import { Icon } from '../../../utils/atoms/Icon'
import type { ContactoIntervencion } from '../types'

interface TarjetaContactosProps {
  contactos: ContactoIntervencion[]
}

export function TarjetaContactos({ contactos }: TarjetaContactosProps) {
  return (
    <section className='sa-no-print flex flex-col gap-3 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-[18px] shadow-[var(--shadow-sm)]'>
      <h2 className='flex items-center gap-2 text-[15px] leading-tight font-bold'>
        <Icon name='id-card' size={17} color='var(--color-forest)' className='shrink-0' />
        Contactos de Intervención Rápida
      </h2>

      <ul className='flex flex-col gap-2.5'>
        {contactos.map((contacto) => (
          <li
            key={contacto.id}
            className='flex items-center gap-3 rounded-[14px] bg-[var(--sa-field)] p-3'
          >
            <div className='min-w-0 flex-1'>
              <p className='text-[13px] leading-tight font-bold'>{contacto.nombre}</p>
              <p className='mt-0.5 text-[11.5px] leading-snug text-[var(--sa-muted)]'>
                {contacto.relacion}
              </p>
            </div>

            {contacto.telefono ? (
              <a
                href={`tel:${contacto.telefono.replace(/-/g, '')}`}
                aria-label={`Llamar a ${contacto.nombre}`}
                className='inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-forest)] text-[var(--sa-on-accent)]'
              >
                <Icon name='phone' size={16} color='currentColor' />
              </a>
            ) : null}

            {contacto.documento ? (
              <button
                type='button'
                aria-label={`Ver credencial de ${contacto.nombre}`}
                className='inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--sa-field)] text-[var(--sa-muted)]'
              >
                <Icon name='file-text' size={16} color='currentColor' />
              </button>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  )
}
