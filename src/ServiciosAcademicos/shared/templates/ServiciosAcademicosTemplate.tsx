import { PortalTemplate } from '../../../Portal/shared/templates/PortalTemplate'
import type { PortalTemplateProps } from '../../../Portal/shared/templates/PortalTemplate'

type ServiciosAcademicosTemplateProps = Omit<PortalTemplateProps, 'roleKey'>

export function ServiciosAcademicosTemplate(props: ServiciosAcademicosTemplateProps) {
  return <PortalTemplate {...props} roleKey='servicios_academicos' />
}
