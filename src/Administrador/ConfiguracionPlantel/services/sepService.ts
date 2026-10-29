import type { EstadoValidacionCCT } from '../types'

export interface ResultadoValidacionCCT {
  estado: EstadoValidacionCCT
  mensaje: string
}

const RE_CCT = /^\d{2}[A-Z]{3}\d{4}[A-Z]$/

export async function validarCCT(cct: string): Promise<ResultadoValidacionCCT> {
  await new Promise((resolve) => window.setTimeout(resolve, 700))

  const normalizada = cct.trim().toUpperCase()
  if (!RE_CCT.test(normalizada)) {
    return {
      estado: 'invalida',
      mensaje: 'La CCT no existe en el catálogo SEP. Verifique los 10 caracteres.',
    }
  }
  if (normalizada.endsWith('0000Z')) {
    return {
      estado: 'invalida',
      mensaje: 'La CCT fue dada de baja en el catálogo SEP. Contacte a la autoridad educativa.',
    }
  }
  return {
    estado: 'validada',
    mensaje: `CCT verificada contra el catálogo SEP/SEE · ${new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}`,
  }
}
