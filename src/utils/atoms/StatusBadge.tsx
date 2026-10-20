interface StatusBadgeProps {
  label: string
  dotColor?: string
  className?: string
}

export function StatusBadge({ label, dotColor = '#3F7A63', className }: StatusBadgeProps) {
  return (
    <div
      className={[
        'inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)] bg-[var(--color-card)] text-[var(--color-text-primary)] shadow-[var(--shadow-sm)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dotColor }} aria-hidden="true" />
      <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
    </div>
  )
}
