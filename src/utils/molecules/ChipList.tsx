import { Chip } from '../atoms/Chip'
import { cn } from '../cn'

interface ChipListProps {
  chips: string[]
  className?: string
}

export function ChipList({ chips, className }: ChipListProps) {
  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {chips.map((chip) => (
        <li key={chip}>
          <Chip label={chip} />
        </li>
      ))}
    </ul>
  )
}
