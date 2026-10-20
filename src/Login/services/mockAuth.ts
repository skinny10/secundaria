import { ApiError } from '../../utils/services/apiClient'
import type { AuthCredentials, AuthSession } from '../types/auth'

const MOCK_DELAY_MS = 900

export const MOCK_NOT_PROVISIONED_MESSAGE =
  'Acceso dado de alta exclusivamente por la Administración Escolar. Contacte a la Mesa de Ayuda (Ext. 142).'

export function mockSignIn(
  _credentials: AuthCredentials,
  options: { signal?: AbortSignal } = {}
): Promise<AuthSession> {
  return new Promise((_resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      reject(new ApiError(MOCK_NOT_PROVISIONED_MESSAGE, 403, 'ACCOUNT_NOT_PROVISIONED'))
    }, MOCK_DELAY_MS)

    options.signal?.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timeoutId)
        reject(new DOMException('Aborted', 'AbortError'))
      },
      { once: true }
    )
  })
}
