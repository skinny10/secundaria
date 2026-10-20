import { useState } from 'react'
import { TextField, type TextFieldProps } from '../atoms/TextField'
import { Icon } from '../atoms/Icon'

export interface PasswordFieldProps extends Omit<TextFieldProps, 'trailingSlot'> {
  obscure?: boolean
  onToggleVisibility?: () => void
}

export function PasswordField({
  obscure = true,
  onToggleVisibility,
  ...props
}: PasswordFieldProps) {
  const [internalObscure, setInternalObscure] = useState(obscure)
  const isControlled = typeof onToggleVisibility === 'function'
  const isObscured = isControlled ? obscure : internalObscure

  const handleToggle = () => {
    if (isControlled) {
      onToggleVisibility?.()
    } else {
      setInternalObscure((v) => !v)
    }
  }

  return (
    <TextField
      {...props}
      type={isObscured ? 'password' : 'text'}
      trailingSlot={
        <button
          type="button"
          onClick={handleToggle}
          className="flex items-center justify-center min-h-[40px] min-w-[40px] rounded-[var(--radius-sm)] transition-colors hover:bg-[var(--color-surface-alt)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-[var(--color-steel)] focus-visible:outline-offset-2"
          aria-pressed={!isObscured}
          aria-label={isObscured ? 'Mostrar contraseña' : 'Ocultar contraseña'}
        >
          <Icon name={isObscured ? 'eye' : 'eye-off'} size={20} color="var(--color-text-primary)" />
        </button>
      }
    />
  )
}
