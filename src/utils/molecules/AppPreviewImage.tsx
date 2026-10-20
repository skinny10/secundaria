import { cn } from '../cn'

interface AppPreviewImageProps {
  src: string
  alt: string
  className?: string
}

export function AppPreviewImage({ src, alt, className }: AppPreviewImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={cn('w-full h-auto object-cover rounded-[var(--radius-lg)]', className)}
    />
  )
}
