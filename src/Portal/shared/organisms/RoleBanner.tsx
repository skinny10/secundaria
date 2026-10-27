import { Icon } from '../../../utils/atoms/Icon'
import { roles } from '../constants/roles'
import type { RoleKey } from '../types'

interface RoleBannerProps {
  roleKey?: RoleKey
  rol?: string
  vista: string
  sistema?: string
}

export function RoleBanner({ roleKey, rol, vista, sistema }: RoleBannerProps) {
  const config = roleKey ? roles[roleKey] : null
  const rolVisible = rol ?? config?.bannerRol ?? ''
  const sistemaVisible = sistema ?? config?.system ?? 'Sistema Oficial SEP'
  const textoCompleto = `ROL: ${rolVisible} | VISTA: ${vista}`

  return (
    <div
      className='sa-no-print sticky top-0 z-30 flex h-9 w-full items-center justify-between gap-3 px-3 text-[var(--role-banner-fg)]'
      style={{ backgroundColor: `var(${config?.bannerToken ?? '--see-banner'})` }}
    >
      <p
        className='flex min-w-0 items-center gap-2 text-[11px] leading-none font-bold tracking-wide uppercase sm:text-[12px]'
        title={textoCompleto}
      >
        <Icon
          name={config?.bannerIcon ?? 'shield'}
          size={15}
          color='currentColor'
          className='shrink-0'
        />
        <span className='min-w-0 truncate'>
          ROL: {rolVisible}
          <span className='hidden md:inline'> | VISTA: {vista}</span>
        </span>
      </p>
      <span
        className='hidden shrink-0 items-center gap-1.5 text-[11px] text-[var(--role-banner-fg)]/75 lg:flex'
        title={sistemaVisible}
      >
        <Icon name='shield-check' size={14} color='currentColor' className='shrink-0' />
        {sistemaVisible}
      </span>
    </div>
  )
}
