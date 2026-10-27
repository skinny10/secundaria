import { sugerenciasPorPalabra } from '../constants/altaConfig'

function normalizar(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export function detectarSugerencias(texto: string): string[] {
  const consulta = normalizar(texto)
  if (!consulta.trim()) return []
  return sugerenciasPorPalabra
    .filter((grupo) => grupo.patrones.some((patron) => consulta.includes(normalizar(patron))))
    .map((grupo) => grupo.sugerencia)
}

export function permisoParaSugerencia(sugerencia: string): string {
  return (
    sugerenciasPorPalabra.find((grupo) => grupo.sugerencia === sugerencia)?.permiso ??
    'Se habilitará la adaptación sugerida en el Paso 3.'
  )
}

export function soloDigitos(valor: string, maximo?: number): string {
  const digitos = valor.replace(/\D/g, '')
  return maximo ? digitos.slice(0, maximo) : digitos
}

export function formatearTelefono(valor: string): string {
  const digitos = soloDigitos(valor, 10)
  if (digitos.length <= 3) return digitos
  if (digitos.length <= 6) return `${digitos.slice(0, 3)}-${digitos.slice(3)}`
  return `${digitos.slice(0, 3)}-${digitos.slice(3, 6)}-${digitos.slice(6)}`
}

export function formatearNssImss(valor: string): string {
  const digitos = soloDigitos(valor, 11)
  if (digitos.length <= 4) return digitos
  if (digitos.length <= 6) return `${digitos.slice(0, 4)}-${digitos.slice(4)}`
  if (digitos.length <= 10) return `${digitos.slice(0, 4)}-${digitos.slice(4, 6)}-${digitos.slice(6)}`
  return `${digitos.slice(0, 4)}-${digitos.slice(4, 6)}-${digitos.slice(6, 10)}-${digitos.slice(10)}`
}

export function normalizarCorreo(valor: string): string {
  return valor.trim().toLowerCase()
}

export function quitarEspaciosExtra(valor: string): string {
  return valor.replace(/\s+/g, ' ').trim()
}
