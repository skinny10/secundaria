interface PriorityCardProps {
  label: string
  value: string
}

export function PriorityCard({ label, value }: PriorityCardProps) {
  return (
    <div className="flex w-full flex-col gap-1 rounded-[12px] border border-[var(--sa-border)] border-l-[6px] border-l-[var(--sa-slate)] bg-[var(--sa-card)] p-4 lg:w-auto lg:min-w-[230px] lg:shrink-0">
      <span className="text-sm font-bold uppercase tracking-widest text-[var(--sa-slate)]">
        {label}
      </span>
      <span className="text-base font-extrabold">{value}</span>
    </div>
  )
}
