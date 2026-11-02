import { ApiError, SESSION_STORAGE_KEY } from '../../utils/services/apiClient'
import { usersApi } from '../../utils/services/sigeanApi'
import { mockSignIn } from './mockAuth'
import type { AuthCredentials, AuthSession, AuthValidationErrors, UserRole } from '../types/auth'

export const SESSION_CHANGED_EVENT = 'nexusedu:session-changed'

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true'

export function isValidInstitutionalEmail(email: string): boolean {
  const normalized = email.trim().toLowerCase()
  return /^[^\s@]+@[^\s@]+(\.[^\s@]+)*$/.test(normalized)
}

function decodificarExpiracion(token: string): string | undefined {
  try {
    const payload = token.split('.')[1]
    if (!payload) return undefined
    const json = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/'))) as { exp?: number }
    return typeof json.exp === 'number' ? new Date(json.exp * 1000).toISOString() : undefined
  } catch {
    return undefined
  }
}

export function rutaInicioPorRol(role: UserRole): string {
  switch (role) {
    case 'ACADEMIC_SERVICES':
      return '#servicios-academicos/padron'
    case 'PSYCHOLOGIST':
      return '#dashboard'
    case 'TEACHER':
    case 'PREFECT':
      return '#maestros'
  }
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
    errors.email = 'Ingrese un correo válido.'
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

  const respuesta = await usersApi.login(
    credentials.email.trim().toLowerCase(),
    credentials.password,
    options.signal
  )
  return {
    token: respuesta.token,
    expiresAt: decodificarExpiracion(respuesta.token),
    user: {
      id: String(respuesta.user.id),
      username: respuesta.user.username,
      email: respuesta.user.email,
      fullName: respuesta.user.fullName ?? respuesta.user.username,
      role: respuesta.user.role,
      teacherId: respuesta.user.teacherId,
    },
  }
}

export async function signOut(options: { signal?: AbortSignal } = {}): Promise<void> {
  void options
  clearSession()
}

export function saveSession(session: AuthSession, remember: boolean): void {
  const storage = remember ? window.localStorage : window.sessionStorage
  storage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
  window.dispatchEvent(new CustomEvent(SESSION_CHANGED_EVENT))
}

export function getSession(): AuthSession | null {
  const raw =
    window.localStorage.getItem(SESSION_STORAGE_KEY) ??
    window.sessionStorage.getItem(SESSION_STORAGE_KEY)
  if (!raw) return null
  try {
    const session = JSON.parse(raw) as AuthSession
    if (!session?.token || !session.user?.role) {
      clearSession()
      return null
    }
    if (session.expiresAt && new Date(session.expiresAt).getTime() <= Date.now()) {
      clearSession()
      return null
    }
    return session
  } catch {
    clearSession()
    return null
  }
}

export function clearSession(): void {
  window.localStorage.removeItem(SESSION_STORAGE_KEY)
  window.sessionStorage.removeItem(SESSION_STORAGE_KEY)
  window.dispatchEvent(new CustomEvent(SESSION_CHANGED_EVENT))
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

export function cerrarSesion(): void {
  clearSession()
  window.location.hash = '#login'
}
