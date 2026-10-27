export function idAyuda(id: string): string {
  return `${id}-ayuda`
}

export function idError(id: string): string {
  return `${id}-error`
}

export function descripcionCampo(
  id: string,
  ayuda?: string,
  error?: string
): string | undefined {
  const ids = [ayuda ? idAyuda(id) : '', error ? idError(id) : ''].filter(Boolean)
  return ids.length > 0 ? ids.join(' ') : undefined
}
