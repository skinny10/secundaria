import { entidadesCurp } from '../constants/altaConfig'
import type { SexoRegistrado } from '../types'

const DICCIONARIO_CURP = '0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'
const REGEX_CURP =
  /^[A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|BC|BS|CC|CL|CM|CS|CH|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)[B-DF-HJ-NP-TV-Z]{3}[0-9A-Z]\d$/

export interface DatosCurp {
  fechaNacimiento: string
  sexo: SexoRegistrado
  entidad: string
}

function fechaValida(anio: number, mes: number, dia: number): boolean {
  const fecha = new Date(Date.UTC(anio, mes - 1, dia))
  return (
    fecha.getUTCFullYear() === anio &&
    fecha.getUTCMonth() === mes - 1 &&
    fecha.getUTCDate() === dia
  )
}

export function calcularDigitoVerificador(curpParcial: string): string {
  const base = curpParcial.slice(0, 17).toUpperCase()
  if (base.length !== 17) return ''
  let suma = 0
  for (let indice = 0; indice < base.length; indice += 1) {
    const valor = DICCIONARIO_CURP.indexOf(base[indice])
    if (valor < 0) return ''
    suma += valor * (18 - indice)
  }
  return String((10 - (suma % 10)) % 10)
}

export function normalizarCurp(valor: string): string {
  return valor.toUpperCase().replace(/\s+/g, '').slice(0, 18)
}

export function parsearCurp(curp: string): DatosCurp | null {
  const valor = normalizarCurp(curp)
  if (!REGEX_CURP.test(valor)) return null
  const anioCorto = Number(valor.slice(4, 6))
  const anioActualCorto = new Date().getFullYear() % 100
  const anio = 2000 + anioCorto <= new Date().getFullYear() && anioCorto <= anioActualCorto
    ? 2000 + anioCorto
    : 1900 + anioCorto
  const mes = Number(valor.slice(6, 8))
  const dia = Number(valor.slice(8, 10))
  if (!fechaValida(anio, mes, dia)) return null
  const entidad = entidadesCurp[valor.slice(11, 13)]
  if (!entidad) return null
  if (calcularDigitoVerificador(valor) !== valor.slice(17)) return null
  return {
    fechaNacimiento: `${String(anio).padStart(4, '0')}-${valor.slice(6, 8)}-${valor.slice(8, 10)}`,
    sexo: valor[10] === 'H' ? 'hombre' : 'mujer',
    entidad,
  }
}

export function esCurpValida(curp: string): boolean {
  return parsearCurp(curp) !== null
}

export function curpCoincideCon(
  curp: string,
  fechaNacimiento: string,
  sexo: SexoRegistrado
): boolean {
  const datos = parsearCurp(curp)
  if (!datos || !fechaNacimiento || !sexo) return false
  return datos.fechaNacimiento === fechaNacimiento && datos.sexo === sexo
}

export function generarCurpValida(base17: string): string {
  const curp = base17.toUpperCase().slice(0, 17)
  return `${curp}${calcularDigitoVerificador(curp)}`
}

export function enmascararCurp(curp: string): string {
  const valor = normalizarCurp(curp)
  if (valor.length < 4) return '****'
  return `******${valor.slice(-4)}`
}

export function enmascararIdentificador(valor: string): string {
  const limpio = valor.replace(/\s+/g, '')
  if (limpio.length < 4) return '****'
  return `${'*'.repeat(Math.max(0, limpio.length - 4))}${limpio.slice(-4)}`
}
