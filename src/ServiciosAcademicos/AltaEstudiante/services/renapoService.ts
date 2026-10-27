import { esCurpValida } from '../utils/curp'
import type { EstatusCurp } from '../types'

export interface RespuestaRenapo {
  estatus: Extract<EstatusCurp, 'certificada' | 'no_encontrada' | 'error_servicio'>
  mensaje: string
}

export interface RenapoService {
  verify(curp: string): Promise<RespuestaRenapo>
}

function esperar(ms: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, ms))
}

export const renapoService: RenapoService = {
  async verify(curp) {
    const retraso = 600 + Math.floor(Math.random() * 301)
    await esperar(retraso)
    if (!esCurpValida(curp)) {
      return {
        estatus: 'no_encontrada',
        mensaje: 'La CURP no fue localizada en el Registro Nacional de Población.',
      }
    }
    const ultimo = curp.slice(-1)
    if (ultimo === '9') {
      return {
        estatus: 'error_servicio',
        mensaje: 'El servicio RENAPO no respondió. Puede reintentar la verificación.',
      }
    }
    if (ultimo === '0') {
      return {
        estatus: 'no_encontrada',
        mensaje: 'La CURP no fue localizada en el Registro Nacional de Población.',
      }
    }
    return {
      estatus: 'certificada',
      mensaje:
        'CURP validada ante el Registro Nacional de Población (Estatus: Certificada).',
    }
  },
}
