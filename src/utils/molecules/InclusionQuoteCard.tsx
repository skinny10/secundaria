import { SectionEyebrow } from '../atoms/SectionEyebrow'
import { ChipList } from './ChipList'
import { cn } from '../cn'

interface InclusionQuoteCardProps {
  title: string
  quote: string
  chips: string[]
  className?: string
}

export function InclusionQuoteCard({ title, quote, chips, className }: InclusionQuoteCardProps) {
  return (
    <article
      className={cn(
        'flex flex-col gap-4 rounded-[var(--radius-lg)] bg-[var(--color-card)] p-5 shadow-[var(--shadow-md)]',
        className
      )}
    >
      <SectionEyebrow text={title} />
      <p className="text-sm leading-relaxed text-[var(--color-text-primary)]">{quote}</p>
      <ChipList chips={chips} />
    </article>
  )
}
