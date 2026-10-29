import { AdministradorTemplate } from '../../shared/templates/AdministradorTemplate'
import { ContextBarIntegridad } from '../molecules/ContextBarIntegridad'
import { BitacoraHeader } from '../molecules/BitacoraHeader'
import { BitacoraKpiGrid } from '../organisms/BitacoraKpiGrid'
import { BitacoraTabla } from '../organisms/BitacoraTabla'
import { useAdminNavigation } from '../../shared/hooks/useAdminNavigation'

export function BitacoraAuditoriaPage() {
  const navegar = useAdminNavigation()
  const noop = () => {}

  return (
    <AdministradorTemplate vista='BITÁCORA DE ACCESOS Y SEGURIDAD' activeKey='bitacora' onNavigate={navegar} busqueda='' onBuscar={() => {}}>
      <div className='mx-auto flex w-full max-w-[2000px] flex-col gap-12 px-6 py-12 text-[22px] leading-relaxed sm:px-10 lg:px-14'>
        <BitacoraHeader onFiltrarFechas={noop} onEventoCritico={noop} onExportar={noop} onActa={noop} />
        <BitacoraKpiGrid />
        <ContextBarIntegridad />
        <BitacoraTabla />
        <div className='flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[var(--sa-field)] px-8 py-5 text-[19px]'>
          <p>Resguardo de Registros por 5 Años conforme a normativas de auditoría de la Secretaría de Educación y LGDNNA (Ley General de los Derechos de Niñas, Niños y Adolescentes). Registros sellados con marca temporal RFC 3161.</p>
          <button type='button' className='inline-flex min-h-[56px] items-center gap-3 rounded-xl border border-[var(--sa-border)] px-6 text-[20px] font-semibold'>Certificado de Integridad</button>
        </div>
      </div>
    </AdministradorTemplate>
  )
}
