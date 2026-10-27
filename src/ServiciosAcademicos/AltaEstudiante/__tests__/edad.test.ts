import { describe, expect, it } from 'vitest'
import { calcularEdad, diasEnMes, fechaIsoDesdePartes, partesFecha } from '../utils/edad'

describe('cálculo de edad y fechas', () => {
  it('calcula la edad al 31 de diciembre del ciclo', () => {
    expect(calcularEdad('2012-10-06', '2024-12-31')).toBe(12)
    expect(calcularEdad('2012-10-06', '2024-10-06')).toBe(12)
    expect(calcularEdad('2012-10-06', '2024-10-05')).toBe(11)
  })

  it('rechaza fechas inválidas o futuras', () => {
    expect(calcularEdad('2012-10-06', '2012-10-05')).toBeNull()
    expect(calcularEdad('2012-02-30', '2024-12-31')).toBeNull()
    expect(calcularEdad('', '2024-12-31')).toBeNull()
  })

  it('calcula días por mes incluyendo años bisiestos', () => {
    expect(diasEnMes('2012', '02')).toBe(29)
    expect(diasEnMes('2013', '02')).toBe(28)
    expect(diasEnMes('2024', '04')).toBe(30)
  })

  it('convierte entre partes y fecha ISO', () => {
    expect(fechaIsoDesdePartes('2012', '10', '06')).toBe('2012-10-06')
    expect(fechaIsoDesdePartes('2012', '', '06')).toBe('')
    expect(partesFecha('2012-10-06')).toEqual({ dia: '06', mes: '10', anio: '2012' })
  })
})
