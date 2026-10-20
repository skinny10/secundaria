import { cn } from '../cn'

interface SectionEyebrowProps {
  text: string
  className?: string
}

export function SectionEyebrow({ text, className }: SectionEyebrowProps) {
  return (
    <span
      className={cn(
        'text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]',
        className
      )}
    >
      {text}
    </span>
  )
}
