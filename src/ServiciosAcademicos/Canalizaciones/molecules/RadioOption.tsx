import { cn } from '../../../utils/cn'

interface RadioOptionProps {
  id: string
  name: string
  label: string
  checked: boolean
  onSelect: () => void
  selectedClass: string
  unselectedClass: string
}

export function RadioOption({
  id,
  name,
  label,
  checked,
  onSelect,
  selectedClass,
  unselectedClass,
}: RadioOptionProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        'flex min-h-[52px] cursor-pointer items-center justify-center rounded-xl border px-3 text-center transition-colors',
        checked ? selectedClass : `${unselectedClass} text-[var(--color-text-primary)]`,
      )}
    >
      <input
        id={id}
        type="radio"
        name={name}
        checked={checked}
        onChange={onSelect}
        className="sr-only"
      />
      <span className="text-base font-bold">{label}</span>
    </label>
  )
}
