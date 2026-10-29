import { Icon } from '../../../utils/atoms/Icon'

interface KpiCardProps {
  label: string
  valor: number
  desc: string
  icon: string
  color: string
}

export function KpiCard({ label, valor, desc, icon, color }: KpiCardProps) {
  return (
    <div className='flex items-center gap-5 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-6 shadow-sm'>
      <div className={`flex h-16 w-16 items-center justify-center rounded-xl ${color}`}>
        <Icon name={icon as any} size={28} />
      </div>
      <div className='min-w-0'>
        <p className='text-[20px] text-[var(--sa-muted)]'>{label}</p>
        <p className='text-[44px] font-extrabold text-[var(--sa-text)]'>{valor}</p>
        <p className='text-[20px] text-[var(--sa-muted)]'>{desc}</p>
      </div>
    </div>
  )
}
