import { describe, expect, it } from 'vitest'
import {
  calcularDigitoVerificador,
  curpCoincideCon,
  enmascararCurp,
  esCurpValida,
  generarCurpValida,
  normalizarCurp,
  parsearCurp,
} from '../utils/curp'

const CURP = 'PEGL121006HCSRRSA4'

describe('CURP', () => {
  it('valida una CURP con dígito verificador correcto', () => {
    expect(esCurpValida(CURP)).toBe(true)
  })

  it('extrae fecha, sexo y entidad', () => {
    expect(parsearCurp(CURP)).toEqual({
      fechaNacimiento: '2012-10-06',
      sexo: 'hombre',
      entidad: 'Chiapas',
    })
  })

  it('rechaza un dígito verificador incorrecto', () => {
    expect(esCurpValida(`${CURP.slice(0, 17)}5`)).toBe(false)
  })

  it('normaliza espacios y minúsculas', () => {
    expect(normalizarCurp(' pegl121006hcsrrsa4 ')).toBe(CURP)
  })

  it('genera el dígito verificador y enmascara la CURP', () => {
    expect(calcularDigitoVerificador(CURP.slice(0, 17))).toBe('4')
    expect(generarCurpValida(CURP.slice(0, 17))).toBe(CURP)
    expect(enmascararCurp(CURP)).toBe('******RSA4')
  })

  it('compara CURP contra fecha y sexo capturados', () => {
    expect(curpCoincideCon(CURP, '2012-10-06', 'hombre')).toBe(true)
    expect(curpCoincideCon(CURP, '2012-10-06', 'mujer')).toBe(false)
    expect(curpCoincideCon(CURP, '2012-10-07', 'hombre')).toBe(false)
  })
})
