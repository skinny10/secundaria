import { cn } from '../../../utils/cn'
import type { HighlightTone, RichSegment } from '../types'

const highlightClasses: Record<HighlightTone, string> = {
  forest: 'text-[var(--sa-accent)]',
  steel: 'text-[var(--sa-steel)]',
  coffee: 'text-[var(--sa-coffee)]',
}

interface RichTextProps {
  segments: RichSegment[]
  className?: string
}

export function RichText({ segments, className }: RichTextProps) {
  return (
    <p className={cn('text-lg leading-relaxed text-[var(--sa-muted)]', className)}>
      {segments.map((segment, index) =>
        segment.highlight ? (
          <strong
            key={index}
            className={cn('font-extrabold', highlightClasses[segment.highlight])}
          >
            {segment.text}
          </strong>
        ) : (
          <span key={index}>{segment.text}</span>
        )
      )}
    </p>
  )
}
