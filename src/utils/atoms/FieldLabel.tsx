interface FieldLabelProps {
  text: string
  trailingTag?: string
  className?: string
}

export function FieldLabel({ text, trailingTag, className }: FieldLabelProps) {
  return (
    <div className={['flex items-center justify-between', className].filter(Boolean).join(' ')}>
      <label className="text-sm font-bold text-[var(--color-text-primary)]">{text}</label>
      {trailingTag ? (
        <span className="text-xs font-bold text-[var(--color-accent)] uppercase tracking-wider">{trailingTag}</span>
      ) : null}
    </div>
  )
}
