import { AccesoRapidoCard } from '../atoms/AccesoRapidoCard'
import type { AccesoRapido } from '../types'

interface AccesosRapidosProps {
  accesos: AccesoRapido[]
  onNavegar: (destino: string) => void
}

export function AccesosRapidos({ accesos, onNavegar }: AccesosRapidosProps) {
  return (
    <section
      aria-label='Accesos rápidos'
      className='grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4'
    >
      {accesos.map((acceso) => (
        <AccesoRapidoCard
          key={acceso.id}
          acceso={acceso}
          onClick={() => onNavegar(acceso.destino)}
        />
      ))}
    </section>
  )
}
