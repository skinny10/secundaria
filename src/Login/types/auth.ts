export interface AuthCredentials {
  email: string
  password: string
  remember?: boolean
}

export type UserRole = 'docente' | 'psicologia' | 'asesoria' | 'directivo'

export interface AuthUser {
  id: string
  email: string
  fullName: string
  role: UserRole
}

export interface AuthSession {
  token: string
  expiresAt?: string
  user: AuthUser
}

export interface AuthValidationErrors {
  email?: string
  password?: string
  form?: string
}
