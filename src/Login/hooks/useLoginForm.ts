import { useEffect, useRef, useState } from 'react'
import { mapAuthError, saveSession, signIn, validateLogin } from '../services/authService'
import type { AuthSession, AuthValidationErrors } from '../types/auth'

export interface LoginFormValues {
  email: string
  password: string
  remember: boolean
}

export type LoginFormErrors = AuthValidationErrors

export interface UseLoginFormOptions {
  onSuccess?: (session: AuthSession) => void
}

export interface UseLoginFormResult {
  values: LoginFormValues
  errors: LoginFormErrors
  showPassword: boolean
  isSubmitting: boolean
  setEmail: (value: string) => void
  setPassword: (value: string) => void
  setRemember: (value: boolean) => void
  togglePassword: () => void
  validate: () => boolean
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

export function useLoginForm(options: UseLoginFormOptions = {}): UseLoginFormResult {
  const { onSuccess } = options

  const [values, setValues] = useState<LoginFormValues>({
    email: '',
    password: '',
    remember: false,
  })
  const [errors, setErrors] = useState<LoginFormErrors>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    return () => abortRef.current?.abort()
  }, [])

  const setEmail = (email: string) => {
    setValues((prev) => ({ ...prev, email }))
    setErrors((prev) => ({ ...prev, email: undefined, form: undefined }))
  }

  const setPassword = (password: string) => {
    setValues((prev) => ({ ...prev, password }))
    setErrors((prev) => ({ ...prev, password: undefined, form: undefined }))
  }

  const setRemember = (remember: boolean) => {
    setValues((prev) => ({ ...prev, remember }))
  }

  const togglePassword = () => setShowPassword((v) => !v)

  const validate = () => {
    const nextErrors = validateLogin(values)
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isSubmitting || !validate()) return

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setIsSubmitting(true)
    try {
      const session = await signIn(values, { signal: controller.signal })
      saveSession(session, values.remember)
      onSuccess?.(session)
    } catch (error) {
      if (controller.signal.aborted) return
      setErrors({ form: mapAuthError(error) })
    } finally {
      if (!controller.signal.aborted) setIsSubmitting(false)
    }
  }

  return {
    values,
    errors,
    showPassword,
    isSubmitting,
    setEmail,
    setPassword,
    setRemember,
    togglePassword,
    validate,
    handleSubmit,
  }
}
