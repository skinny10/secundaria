import type { ApiRole } from '../../utils/services/sigeanApi'

export interface AuthCredentials {
  email: string
  password: string
  remember?: boolean
}

export type UserRole = ApiRole

export interface AuthUser {
  id: string
  username: string
  email: string
  fullName: string
  role: UserRole
  teacherId: number | null
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
