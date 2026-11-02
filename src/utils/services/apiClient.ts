export class ApiError extends Error {
  readonly status: number
  readonly code?: string

  constructor(message: string, status: number, code?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api'

export const SESSION_STORAGE_KEY = 'nexusedu:session'
export const SESSION_EXPIRED_EVENT = 'nexusedu:session-expired'

function leerToken(): string | null {
  if (typeof window === 'undefined') return null
  const raw =
    window.localStorage.getItem(SESSION_STORAGE_KEY) ??
    window.sessionStorage.getItem(SESSION_STORAGE_KEY)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as { token?: unknown }
    return typeof parsed.token === 'string' ? parsed.token : null
  } catch {
    return null
  }
}

const REQUEST_TIMEOUT_MS = 15000

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  signal?: AbortSignal
  headers?: Record<string, string>
  auth?: boolean
}

interface ApiErrorBody {
  message?: string
  error?: string
  code?: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, signal, headers, auth = true } = options
  const token = auth ? leerToken() : null

  const controller = new AbortController()
  const timeoutId = window.setTimeout(() => {
    controller.abort(new DOMException('Tiempo de espera agotado', 'TimeoutError'))
  }, REQUEST_TIMEOUT_MS)

  if (signal) {
    if (signal.aborted) {
      controller.abort(signal.reason)
    } else {
      signal.addEventListener('abort', () => controller.abort(signal.reason), { once: true })
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
        ...headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    })

    const contentType = response.headers.get('content-type') ?? ''
    const payload: unknown = contentType.includes('application/json')
      ? await response.json().catch(() => null)
      : null

    if (response.status === 401 && token) {
      window.localStorage.removeItem(SESSION_STORAGE_KEY)
      window.sessionStorage.removeItem(SESSION_STORAGE_KEY)
      window.dispatchEvent(new CustomEvent(SESSION_EXPIRED_EVENT))
    }

    if (!response.ok) {
      const errorBody = (isRecord(payload) ? payload : {}) as ApiErrorBody
      const message =
        errorBody.message ?? errorBody.error ?? `La solicitud falló (${response.status}).`
      throw new ApiError(message, response.status, errorBody.code)
    }

    return payload as T
  } finally {
    window.clearTimeout(timeoutId)
  }
}
