import { describe, expect, it } from 'vitest'
import { configInicial } from '../constants/configInicial'
import { contarCambios, listarCambios } from '../utils/diff'
import { validarConfig, validarSeccion } from '../utils/validacion'

function conCambio(mutar: (config: ReturnType<typeof configInicial>) => void) {
  const config = configInicial()
  mutar(config)
  return config
}

describe('validación de configuración del plantel', () => {
  it('acepta la configuración inicial', () => {
    expect(validarConfig(configInicial())).toEqual({})
  })

  it('rechaza una CCT con formato inválido', () => {
    const config = conCambio((c) => {
      c.identidad.cct = 'ABC'
    })
    expect(validarConfig(config)['identidad.cct']).toContain('10 caracteres')
  })

  it('detecta módulos que no caben en la jornada', () => {
    const config = conCambio((c) => {
      c.turnos[0].fin = '12:00'
      c.turnos[0].recesos = []
    })
    expect(validarConfig(config)['turnos.0.fin']).toContain('no caben')
  })

  it('detecta el empalme entre turnos activos', () => {
    const config = conCambio((c) => {
      c.turnos[1].inicio = '13:00'
    })
    expect(validarConfig(config)['turnos.1.inicio']).toContain('empalma')
  })

  it('limita el cupo y los dictámenes DUA', () => {
    const config = conCambio((c) => {
      c.capacidades.cupoAula = 45
      c.capacidades.limiteDictamenGrupo = 8
    })
    expect(validarSeccion(config, 'dua')['capacidades.cupoAula']).toBeDefined()
    expect(validarSeccion(config, 'dua')['capacidades.limiteDictamenGrupo']).toBeDefined()
  })
})

describe('diferencias para el resumen de guardado', () => {
  it('cuenta cada campo modificado y marca los sensibles', () => {
    const antes = configInicial()
    const despues = conCambio((c) => {
      c.identidad.cct = '02EES0046Z'
      c.intervalo.pausaMin = 20
    })
    const cambios = listarCambios(antes, despues)
    expect(contarCambios(antes, despues)).toBe(2)
    expect(cambios.find((cambio) => cambio.ruta === 'identidad.cct')?.sensible).toBe(true)
    expect(cambios.find((cambio) => cambio.ruta === 'intervalo.pausaMin')?.sensible).toBe(false)
  })

  it('ignora la metadata de versión en el resumen de cambios', () => {
    const antes = configInicial()
    const despues = { ...configInicial(), version: 9, actualizadoPor: 'Otra persona' }
    expect(listarCambios(antes, despues)).toEqual([])
  })

  it('describe los cambios de turnos y recesos con etiquetas legibles', () => {
    const antes = configInicial()
    const despues = conCambio((c) => {
      c.turnos[0].recesos[0].duracionMin = 25
      c.turnos[0].activo = false
    })
    const etiquetas = listarCambios(antes, despues).map((cambio) => cambio.etiqueta)
    expect(etiquetas).toContain('Turno Matutino · Receso 1: Duración del receso')
    expect(etiquetas).toContain('Turno Matutino · Estado')
  })
})
