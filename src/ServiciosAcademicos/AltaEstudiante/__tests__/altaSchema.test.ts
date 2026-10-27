import { describe, expect, it } from 'vitest'
import { erroresAlta } from '../constants/altaContent'
import { crearBorradorInicial } from '../services/altaFactory'
import type { AltaBorrador } from '../types'
import { primerPasoConError, validarAlta, validarPaso } from '../validation/altaSchema'

function borradorValido(): AltaBorrador {
  const borrador = crearBorradorInicial('alta-prueba', 'NX-2024-999')
  borrador.identificacion = {
    nombres: 'Luis Andrés',
    apellidoPaterno: 'Peralta',
    apellidoMaterno: 'Grajales',
    curp: 'PEGL121006HCSRRSA4',
    curpVerificada: { estatus: 'certificada' },
    fechaNacimiento: '2012-10-06',
    sexo: 'hombre',
    discrepanciaCurpConfirmada: false,
  }
  borrador.asignacion = { grado: '2°', grupo: 'B', turno: 'Matutino' }
  borrador.tutor = {
    nombre: 'María Grajales',
    parentesco: 'madre',
    telefono: '961-123-4567',
    correo: 'maria@example.com',
    domicilio: 'Av. Central 123, Tuxtla Gutiérrez',
  }
  borrador.salud = {
    institucion: 'imss',
    nss: '12345678901',
    clinica: 'Clínica 14',
    alergias: 'Ninguna conocida',
    sugerencias: [],
  }
  borrador.condicion = {
    diagnosticoPrevio: 'en_proceso',
    condicionPrincipal: 'tea-n1',
    especialistaEmisor: '',
  }
  borrador.derivacion = { derivar: false, especialistaId: '' }
  borrador.documentos = borrador.documentos.map((documento) =>
    documento.id === 'curp'
      ? { ...documento, recibido: true, estado: 'validado' }
      : documento
  )
  return borrador
}

describe('validación del alta', () => {
  it('acepta los tres pasos con datos completos', () => {
    const borrador = borradorValido()
    expect(validarPaso(borrador, 1)).toEqual([])
    expect(validarPaso(borrador, 2)).toEqual([])
    expect(validarPaso(borrador, 3)).toEqual([])
    expect(validarAlta(borrador)).toEqual([])
  })

  it('rechaza una fecha de nacimiento que no existe en el calendario', () => {
    const borrador = borradorValido()
    borrador.identificacion.fechaNacimiento = '2012-02-30'
    expect(validarPaso(borrador, 1)).toContainEqual({
      campo: 'identificacion.fechaNacimiento',
      mensaje: erroresAlta.fechaNacimiento,
      paso: 1,
    })
  })

  it('bloquea una CURP duplicada antes que otros errores de identidad', () => {
    const errores = validarPaso(borradorValido(), 1, { curpDuplicadaId: 'est-001' })
    expect(errores[0]).toMatchObject({
      campo: 'identificacion.curp',
      mensaje: erroresAlta.curpDuplicada,
      paso: 1,
    })
  })

  it('exige NSS de 11 dígitos para IMSS y lo omite con "ninguno"', () => {
    const imss = borradorValido()
    imss.salud.nss = '123'
    expect(validarPaso(imss, 2)).toContainEqual({
      campo: 'salud.nss',
      mensaje: erroresAlta.nssImss,
      paso: 2,
    })

    const ninguno = borradorValido()
    ninguno.salud.institucion = 'ninguno'
    ninguno.salud.nss = ''
    expect(validarPaso(ninguno, 2)).toEqual([])
  })

  it('exige acta y CURP para registrar', () => {
    const borrador = borradorValido()
    borrador.documentos = borrador.documentos.map((documento) => ({
      ...documento,
      recibido: false,
      estado: 'pendiente',
    }))
    expect(validarPaso(borrador, 3)).toContainEqual({
      campo: 'documentos',
      mensaje: erroresAlta.documentosMinimos,
      paso: 3,
    })
  })

  it('exige especialista al derivar y lo acepta cuando se elige', () => {
    const borrador = borradorValido()
    borrador.derivacion = { derivar: true, especialistaId: '' }
    expect(validarPaso(borrador, 3)).toContainEqual({
      campo: 'derivacion.especialistaId',
      mensaje: erroresAlta.especialista,
      paso: 3,
    })

    borrador.derivacion.especialistaId = 'claudia-mendez'
    expect(validarPaso(borrador, 3)).toEqual([])
  })

  it('ubica el primer paso con error', () => {
    const errores = [
      { campo: 'documentos', mensaje: erroresAlta.documentosMinimos, paso: 3 as const },
      { campo: 'tutor.nombre', mensaje: erroresAlta.tutorNombre, paso: 2 as const },
    ]
    expect(primerPasoConError(errores)).toBe(2)
    expect(primerPasoConError([])).toBe(3)
  })
})
