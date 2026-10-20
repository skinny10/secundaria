import { ApiError, apiRequest } from '../../utils/services/apiClient'
import { mockSignIn } from './mockAuth'
import type { AuthCredentials, AuthSession, AuthValidationErrors } from '../types/auth'

export const ALLOWED_DOMAINS = ['@edomex.nuevaescuela.mx', '@sep.gob.mx'] as const

const SESSION_STORAGE_KEY = 'nexusedu:session'

// El mock se mantiene activo hasta definir VITE_USE_MOCK_API="false" en el .env.
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false'

export function isValidInstitutionalEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) return false
  return ALLOWED_DOMAINS.some((domain) => normalized.endsWith(domain))
}

export function validateLogin(values: {
  email: string
  password: string
}): AuthValidationErrors {
  const errors: AuthValidationErrors = {}
  const email = values.email.trim()

  if (!email) {
    errors.email = 'Ingrese su correo institucional.'
  } else if (!isValidInstitutionalEmail(email)) {
    errors.email =
      'El correo debe ser institucional (@edomex.nuevaescuela.mx o @sep.gob.mx).'
  }

  if (!values.password) {
    errors.password = 'Ingrese su contraseña de acceso.'
  } else if (values.password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres.'
  }

  return errors
}

export async function signIn(
  credentials: AuthCredentials,
  options: { signal?: AbortSignal } = {}
): Promise<AuthSession> {
  if (USE_MOCK_API) {
    return mockSignIn(credentials, options)
  }

  return apiRequest<AuthSession>('/auth/login', {
    method: 'POST',
    body: {
      email: credentials.email.trim().toLowerCase(),
      password: credentials.password,
      remember: credentials.remember ?? false,
    },
    signal: options.signal,
  })
}

export async function signOut(options: { signal?: AbortSignal } = {}): Promise<void> {
  try {
    if (!USE_MOCK_API) {
      await apiRequest<void>('/auth/logout', { method: 'POST', signal: options.signal })
    }
  } finally {
    clearSession()
  }
}

export function saveSession(session: AuthSession, remember: boolean): void {
  const storage = remember ? window.localStorage : window.sessionStorage
  storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
}

export function getSession(): AuthSession | null {
  const raw =
    window.localStorage.getItem(SESSION_STORAGE_KEY) ??
    window.sessionStorage.getItem(SESSION_STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AuthSession
  } catch {
    clearSession()
    return null
  }
}

export function clearSession(): void {
  window.localStorage.removeItem(SESSION_STORAGE_KEY)
  window.sessionStorage.removeItem(SESSION_STORAGE_KEY)
}

export function mapAuthError(error: unknown): string {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 401:
        return 'Correo o contraseña incorrectos. Verifique sus credenciales.'
      case 429:
        return 'Demasiados intentos fallidos. Espere unos minutos e intente de nuevo.'
      default:
        return error.message
    }
  }

  if (error instanceof DOMException && error.name === 'TimeoutError') {
    return 'El servidor tardó demasiado en responder. Intente nuevamente.'
  }

  if (error instanceof TypeError) {
    return 'No fue posible conectar con el servidor. Revise su conexión e intente de nuevo.'
  }

  if (error instanceof Error) return error.message

  return 'Ocurrió un error inesperado. Intente nuevamente.'
}
