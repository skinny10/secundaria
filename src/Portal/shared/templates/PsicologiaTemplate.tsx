import { PortalTemplate } from './PortalTemplate'
import type { PortalTemplateProps } from './PortalTemplate'

type PsicologiaTemplateProps = Omit<PortalTemplateProps, 'roleKey'>

export function PsicologiaTemplate(props: PsicologiaTemplateProps) {
  return <PortalTemplate {...props} roleKey='psicologia' />
}
