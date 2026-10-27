import { roles } from '../../../Portal/shared/constants/roles'
import { altaConfig, crearDocumentosIniciales } from '../constants/altaConfig'
import type { AltaBorrador } from '../types'

export function crearBorradorInicial(id: string, matriculaProvisional: string): AltaBorrador {
  return {
    id,
    estado: 'borrador',
    pasoActual: 1,
    pasosCompletados: [],
    creadoPor: roles.servicios_academicos.user.name,
    actualizadoEn: new Date().toISOString(),
    matriculaProvisional,
    identificacion: {
      nombres: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      curp: '',
      curpVerificada: { estatus: 'sin_verificar' },
      fechaNacimiento: '',
      sexo: '',
      discrepanciaCurpConfirmada: false,
    },
    asignacion: {
      grado: '',
      grupo: '',
      turno: '',
    },
    tutor: {
      nombre: '',
      parentesco: '',
      telefono: '',
      correo: '',
      domicilio: '',
    },
    salud: {
      institucion: '',
      nss: '',
      clinica: '',
      alergias: '',
      sugerencias: [],
    },
    condicion: {
      diagnosticoPrevio: '',
      condicionPrincipal: '',
      especialistaEmisor: '',
    },
    documentos: crearDocumentosIniciales(),
    derivacion: {
      derivar: true,
      especialistaId: '',
    },
  } satisfies AltaBorrador
}

export function siguientePasoActual(paso: number): number {
  return Math.min(3, Math.max(1, paso))
}

export function matriculaValida(matricula: string): boolean {
  return new RegExp(`^NX-${altaConfig.anioCiclo}-\\d{3}$`).test(matricula)
}
