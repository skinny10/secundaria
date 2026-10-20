import { forwardRef, useId } from 'react'
import { cn } from '../cn'
import type { IconName } from '../types'
import { Icon } from './Icon'
import { FieldLabel } from './FieldLabel'

export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  trailingTag?: string
  leadingIcon?: IconName
  trailingSlot?: React.ReactNode
  helperText?: string
  helperIcon?: IconName
  error?: string
  containerClassName?: string
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      trailingTag,
      leadingIcon,
      trailingSlot,
      helperText,
      helperIcon,
      error,
      containerClassName,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const fieldId = id || `field-${generatedId}`

    return (
      <div className={cn('flex flex-col gap-2', containerClassName)}>
        {label ? <FieldLabel text={label} trailingTag={trailingTag} /> : null}
        <div
          className={cn(
            'relative flex items-center rounded-[var(--radius-md)] bg-[var(--color-field)] border border-transparent focus-within:outline focus-within:outline-3 focus-within:outline-[var(--color-steel)] focus-within:outline-offset-2',
            error ? 'border-red-600' : undefined,
            'min-h-[var(--size-min-touch)]'
          )}
        >
          {leadingIcon ? (
            <div className="absolute left-3 flex items-center justify-center">
              <Icon name={leadingIcon} size={20} color="var(--color-text-placeholder)" />
            </div>
          ) : null}
          <input
            ref={ref}
            id={fieldId}
            className={cn(
              'w-full bg-transparent outline-none text-[var(--color-text-primary)] placeholder:text-[var(--color-text-placeholder)]',
              leadingIcon ? 'pl-10' : 'pl-3',
              trailingSlot ? 'pr-12' : 'pr-3',
              'min-h-[var(--size-min-touch)] rounded-[var(--radius-md)]',
              className
            )}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error || helperText ? `${fieldId}-helper` : undefined}
            {...props}
          />
          {trailingSlot ? (
            <div className="absolute right-2 flex items-center justify-center">{trailingSlot}</div>
          ) : null}
        </div>
        {error || helperText ? (
          <div id={`${fieldId}-helper`} className="flex items-start gap-2 text-sm">
            {helperIcon && !error ? (
              <Icon name={helperIcon} size={16} color="var(--color-text-primary)" />
            ) : null}
            <span className={cn(error ? 'text-red-700' : 'text-[var(--color-text-primary)]')}>
              {error || helperText}
            </span>
          </div>
        ) : null}
      </div>
    )
  }
)

TextField.displayName = 'TextField'
