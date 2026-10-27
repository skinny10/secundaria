import { z } from 'zod'
import { altaConfig, institucionesSalud } from '../constants/altaConfig'
import { erroresAlta } from '../constants/altaContent'
import { parsearCurp, esCurpValida } from '../utils/curp'
import { esFechaCalendarioValida } from '../utils/edad'
import { soloDigitos } from '../utils/salud'
import type { AltaBorrador, ErrorAlta, OpcionesValidacionAlta } from '../types'

const REGEX_NOMBRE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]+$/

const nombre = (mensaje: string) =>
  z
    .string()
    .trim()
    .min(1, mensaje)
    .regex(REGEX_NOMBRE, erroresAlta.nombreInvalido)

const identificacionSchema = z
  .object({
    nombres: nombre(erroresAlta.nombres),
    apellidoPaterno: nombre(erroresAlta.apellidoPaterno),
    apellidoMaterno: z
      .string()
      .trim()
      .regex(REGEX_NOMBRE, erroresAlta.nombreInvalido)
      .or(z.literal('')),
    curp: z
      .string()
      .trim()
      .min(1, erroresAlta.requerido)
      .superRefine((valor, contexto) => {
        if (valor.length !== 18) {
          contexto.addIssue({ code: 'custom', message: erroresAlta.curpLongitud })
          return
        }
        if (!esCurpValida(valor)) {
          contexto.addIssue({ code: 'custom', message: erroresAlta.curpFormato })
        }
      }),
    fechaNacimiento: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, erroresAlta.fechaNacimiento)
      .refine((valor) => {
        if (!esFechaCalendarioValida(valor)) return false
        return new Date(`${valor}T12:00:00`) <= new Date()
      }, erroresAlta.fechaNacimiento),
    sexo: z.enum(['hombre', 'mujer', 'otro'], {
      message: erroresAlta.sexo,
    }),
    curpVerificada: z.object({
      estatus: z.enum(['sin_verificar', 'certificada', 'no_encontrada', 'error_servicio']),
      fecha: z.string().optional(),
      mensaje: z.string().optional(),
    }),
    discrepanciaCurpConfirmada: z.boolean(),
  })
  .superRefine((datos, contexto) => {
    const curp = parsearCurp(datos.curp)
    if (!curp) return
    const coincide = curp.fechaNacimiento === datos.fechaNacimiento && curp.sexo === datos.sexo
    if (!coincide && !datos.discrepanciaCurpConfirmada) {
      contexto.addIssue({
        code: 'custom',
        path: ['discrepanciaCurpConfirmada'],
        message: erroresAlta.discrepancia,
      })
    }
  })

const asignacionSchema = z.object({
  grado: z.string().min(1, erroresAlta.grado),
  grupo: z.string().min(1, erroresAlta.grado),
  turno: z.string().min(1, erroresAlta.turno),
})

const tutorSchema = z.object({
  nombre: z.string().trim().min(1, erroresAlta.tutorNombre),
  parentesco: z.string().min(1, erroresAlta.parentesco),
  telefono: z
    .string()
    .refine((valor) => soloDigitos(valor).length === 10, erroresAlta.telefono),
  correo: z.string().trim().email(erroresAlta.correo),
  domicilio: z.string().trim().min(5, erroresAlta.domicilio),
})

const saludBaseSchema = z.object({
  institucion: z.string().min(1, erroresAlta.institucion),
  nss: z.string(),
  clinica: z.string(),
  alergias: z
    .string()
    .trim()
    .min(1, erroresAlta.alergiasRequerido)
    .max(altaConfig.maxAlergias, erroresAlta.alergiasMaximo),
  sugerencias: z.array(z.string()),
})

const condicionSchema = z.object({
  diagnosticoPrevio: z.enum(['si', 'en_proceso'], {
    message: erroresAlta.diagnostico,
  }),
  condicionPrincipal: z.string().min(1, erroresAlta.condicion),
  especialistaEmisor: z.string(),
})

const documentosSchema = z.array(
  z.object({
    id: z.string(),
    nombre: z.string(),
    recibido: z.boolean(),
    estado: z.enum(['recibido', 'pendiente', 'validado', 'plazo']),
    fechaLimite: z.string().optional(),
  })
)

const derivacionSchema = z.object({
  derivar: z.boolean(),
  especialistaId: z.string(),
})

function erroresZod(resultado: z.ZodSafeParseResult<unknown>, paso: 1 | 2 | 3): ErrorAlta[] {
  if (resultado.success) return []
  return resultado.error.issues.map((issue) => ({
    campo: issue.path.map(String).join('.'),
    mensaje: issue.message,
    paso,
  }))
}

function validarSalud(
  datos: { tutor: AltaBorrador['tutor']; salud: AltaBorrador['salud'] },
  contexto: z.RefinementCtx
) {
  const institucion = institucionesSalud.find(
    (opcion) => opcion.value === datos.salud.institucion
  )
  if (!institucion) return
  if (institucion.value === 'ninguno') return
  if (!datos.salud.nss.trim()) {
    contexto.addIssue({
      code: 'custom',
      path: ['salud', 'nss'],
      message: erroresAlta.nss,
    })
    return
  }
  if (institucion.value === 'imss' && soloDigitos(datos.salud.nss).length !== 11) {
    contexto.addIssue({
      code: 'custom',
      path: ['salud', 'nss'],
      message: erroresAlta.nssImss,
    })
  }
}

function validarCondicionYDerivacion(
  datos: {
    condicion: AltaBorrador['condicion']
    documentos: AltaBorrador['documentos']
    derivacion: AltaBorrador['derivacion']
  },
  contexto: z.RefinementCtx
) {
  if (datos.condicion.diagnosticoPrevio === 'si' && !datos.condicion.especialistaEmisor.trim()) {
    contexto.addIssue({
      code: 'custom',
      path: ['condicion', 'especialistaEmisor'],
      message: erroresAlta.especialistaEmisor,
    })
  }
  const acta = datos.documentos.find((documento) => documento.id === 'acta')
  const curp = datos.documentos.find((documento) => documento.id === 'curp')
  if (!acta?.recibido || !curp?.recibido) {
    contexto.addIssue({
      code: 'custom',
      path: ['documentos'],
      message: erroresAlta.documentosMinimos,
    })
  }
  if (datos.derivacion.derivar && !datos.derivacion.especialistaId) {
    contexto.addIssue({
      code: 'custom',
      path: ['derivacion', 'especialistaId'],
      message: erroresAlta.especialista,
    })
  }
}

const pasoSchema1 = z
  .object({
    identificacion: identificacionSchema,
    asignacion: asignacionSchema,
  })
  .superRefine((datos, contexto) => {
    const curp = parsearCurp(datos.identificacion.curp)
    if (curp) {
      const edad =
        new Date(`${altaConfig.fechaReferenciaEdad}T12:00:00`).getFullYear() -
        new Date(`${curp.fechaNacimiento}T12:00:00`).getFullYear()
      if (edad < 0) {
        contexto.addIssue({
          code: 'custom',
          path: ['identificacion', 'fechaNacimiento'],
          message: erroresAlta.fechaNacimiento,
        })
      }
    }
  })

const pasoSchema2 = z
  .object({
    tutor: tutorSchema,
    salud: saludBaseSchema,
  })
  .superRefine(validarSalud)

const pasoSchema3 = z
  .object({
    condicion: condicionSchema,
    documentos: documentosSchema,
    derivacion: derivacionSchema,
  })
  .superRefine(validarCondicionYDerivacion)

const esquemas = {
  1: pasoSchema1,
  2: pasoSchema2,
  3: pasoSchema3,
} as const

function construirEntrada(draft: AltaBorrador, paso: 1 | 2 | 3): unknown {
  if (paso === 1) {
    return {
      identificacion: draft.identificacion,
      asignacion: draft.asignacion,
    }
  }
  if (paso === 2) {
    return {
      tutor: draft.tutor,
      salud: draft.salud,
    }
  }
  return {
    condicion: draft.condicion,
    documentos: draft.documentos,
    derivacion: draft.derivacion,
  }
}

export function validarPaso(
  draft: AltaBorrador,
  paso: 1 | 2 | 3,
  opciones: OpcionesValidacionAlta = {}
): ErrorAlta[] {
  if (paso === 1 && opciones.curpDuplicadaId) {
    const resultado = esquemas[1].safeParse(construirEntrada(draft, 1))
    const errores = erroresZod(resultado, 1).filter(
      (error) => error.campo !== 'identificacion.curp'
    )
    errores.unshift({
      campo: 'identificacion.curp',
      mensaje: erroresAlta.curpDuplicada,
      paso: 1,
    })
    return errores
  }
  return erroresZod(esquemas[paso].safeParse(construirEntrada(draft, paso)), paso)
}

export function validarAlta(
  draft: AltaBorrador,
  opciones: OpcionesValidacionAlta = {}
): ErrorAlta[] {
  return [
    ...validarPaso(draft, 1, opciones),
    ...validarPaso(draft, 2),
    ...validarPaso(draft, 3),
  ]
}

export function primerPasoConError(errores: ErrorAlta[]): 1 | 2 | 3 {
  return errores.reduce<1 | 2 | 3>((menor, error) => (error.paso < menor ? error.paso : menor), 3)
}

export function idCampo(campo: string): string {
  return `alta-${campo.replace(/\./g, '-')}`
}
