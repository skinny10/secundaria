import { PortalTemplate } from '../../../Portal/shared/templates/PortalTemplate'
import type { PortalTemplateProps } from '../../../Portal/shared/templates/PortalTemplate'

type AdministradorTemplateProps = Omit<PortalTemplateProps, 'roleKey'>

export function AdministradorTemplate(props: AdministradorTemplateProps) {
  return <PortalTemplate {...props} roleKey='administrador' />
}
