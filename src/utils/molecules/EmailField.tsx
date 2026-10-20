import { TextField, type TextFieldProps } from '../atoms/TextField'

export type EmailFieldProps = Omit<TextFieldProps, 'type' | 'leadingIcon'>

export function EmailField(props: EmailFieldProps) {
  return <TextField type="email" inputMode="email" leadingIcon="at" {...props} />
}
