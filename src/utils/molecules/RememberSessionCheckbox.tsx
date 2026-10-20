import { cn } from '../cn'

interface RememberSessionCheckboxProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  className?: string
}

export function RememberSessionCheckbox({
  label,
  checked,
  onChange,
  className,
}: RememberSessionCheckboxProps) {
  return (
    <label
      className={cn(
        'flex items-start gap-3 min-h-[var(--size-min-touch)] cursor-pointer',
        className
      )}
    >
      <input
        type="checkbox"
        className="mt-1 w-5 h-5 accent-[var(--color-forest)] shrink-0"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-sm">{label}</span>
    </label>
  )
}
