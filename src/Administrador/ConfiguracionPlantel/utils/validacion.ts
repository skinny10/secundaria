import type { ErroresConfig, PlantelConfig, SeccionConfigId } from '../types'

const RE_CCT = /^\d{2}[A-Z]{3}\d{4}[A-Z]$/
const RE_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const RE_HORA = /^([01]\d|2[0-3]):[0-5]\d$/

export function soloDigitos(valor: string): string {
  return valor.replace(/\D/g, '')
}

export function aMinutos(hora: string): number | null {
  if (!RE_HORA.test(hora)) return null
  const [h, m] = hora.split(':').map(Number)
  return h * 60 + m
}

export function seccionDeRuta(ruta: string): SeccionConfigId {
  if (ruta.startsWith('identidad.')) return 'datos'
  if (ruta.startsWith('ciclo.')) return 'calendario'
  if (
    ruta.startsWith('turnos.') ||
    ruta.startsWith('espacios.') ||
    ruta.startsWith('intervalo.')
  ) {
    return 'turnos'
  }
  return 'dua'
}

export function validarConfig(config: PlantelConfig): ErroresConfig {
  const errores: ErroresConfig = {}

  if (config.identidad.nombre.trim().length < 3) {
    errores['identidad.nombre'] = 'Escriba el nombre oficial del plantel (mínimo 3 caracteres).'
  }
  if (!RE_CCT.test(config.identidad.cct.trim().toUpperCase())) {
    errores['identidad.cct'] = 'La CCT debe tener 10 caracteres con el formato 02EES0045Z.'
  }
  if (!config.identidad.entidad.trim()) {
    errores['identidad.entidad'] = 'Indique la entidad federativa.'
  }
  if (!config.identidad.municipio.trim()) {
    errores['identidad.municipio'] = 'Indique el municipio.'
  }
  if (config.identidad.domicilio.trim().length < 5) {
    errores['identidad.domicilio'] = 'Capture el domicilio oficial completo.'
  }
  if (soloDigitos(config.identidad.telefono).length !== 10) {
    errores['identidad.telefono'] = 'El teléfono debe tener 10 dígitos.'
  }
  if (!RE_CORREO.test(config.identidad.correo.trim())) {
    errores['identidad.correo'] = 'Escriba un correo institucional válido.'
  }
  if (config.identidad.director.nombre.trim().length < 3) {
    errores['identidad.director.nombre'] = 'Capture el nombre del director responsable.'
  }
  if (!RE_CORREO.test(config.identidad.director.correo.trim())) {
    errores['identidad.director.correo'] = 'Escriba un correo válido para el director.'
  }
  if (soloDigitos(config.identidad.director.telefono).length !== 10) {
    errores['identidad.director.telefono'] = 'El teléfono del director debe tener 10 dígitos.'
  }
  const cedula = soloDigitos(config.identidad.director.cedula)
  if (cedula.length < 7 || cedula.length > 8) {
    errores['identidad.director.cedula'] = 'La cédula profesional debe tener entre 7 y 8 dígitos.'
  }

  if (!config.ciclo.activo.trim()) {
    errores['ciclo.activo'] = 'Seleccione el ciclo escolar activo.'
  }

  config.turnos.forEach((turno, indice) => {
    const base = `turnos.${indice}`
    if (!turno.nombre.trim()) {
      errores[`${base}.nombre`] = 'Escriba el nombre de la jornada.'
    }
    const inicio = aMinutos(turno.inicio)
    const fin = aMinutos(turno.fin)
    if (inicio === null) errores[`${base}.inicio`] = 'Use un horario válido (HH:MM).'
    if (fin === null) errores[`${base}.fin`] = 'Use un horario válido (HH:MM).'
    if (inicio !== null && fin !== null && fin <= inicio) {
      errores[`${base}.fin`] = 'La salida debe ser posterior a la entrada.'
    }
    if (turno.moduloMin < 30 || turno.moduloMin > 90) {
      errores[`${base}.moduloMin`] = 'El módulo debe durar entre 30 y 90 minutos.'
    }
    if (turno.modulos < 1 || turno.modulos > 12) {
      errores[`${base}.modulos`] = 'La jornada debe tener entre 1 y 12 módulos.'
    }

    turno.recesos.forEach((receso, indiceReceso) => {
      const rbase = `${base}.recesos.${indiceReceso}`
      if (!receso.nombre.trim()) {
        errores[`${rbase}.nombre`] = 'Nombre del receso requerido.'
      }
      const rInicio = aMinutos(receso.inicio)
      if (rInicio === null) {
        errores[`${rbase}.inicio`] = 'Use un horario válido (HH:MM).'
      } else if (inicio !== null && fin !== null) {
        if (rInicio < inicio || rInicio + receso.duracionMin > fin) {
          errores[`${rbase}.inicio`] = 'El receso debe quedar dentro de la jornada.'
        }
      }
      if (receso.duracionMin < 5 || receso.duracionMin > 45) {
        errores[`${rbase}.duracionMin`] = 'El receso debe durar entre 5 y 45 minutos.'
      }
    })

    if (inicio !== null && fin !== null && fin > inicio) {
      const recesos = turno.recesos.reduce((total, receso) => total + receso.duracionMin, 0)
      const ocupado = turno.modulos * turno.moduloMin + recesos
      if (ocupado > fin - inicio) {
        errores[`${base}.fin`] =
          `Los ${turno.modulos} módulos y recesos suman ${ocupado} min y no caben en la jornada (${fin - inicio} min).`
      }
    }
  })

  for (let indice = 0; indice < config.turnos.length; indice += 1) {
    const turno = config.turnos[indice]
    if (!turno.activo) continue
    const inicio = aMinutos(turno.inicio)
    const fin = aMinutos(turno.fin)
    if (inicio === null || fin === null) continue

    for (let siguiente = indice + 1; siguiente < config.turnos.length; siguiente += 1) {
      const otro = config.turnos[siguiente]
      if (!otro.activo) continue
      const oInicio = aMinutos(otro.inicio)
      const oFin = aMinutos(otro.fin)
      if (oInicio === null || oFin === null) continue
      if (inicio < oFin && oInicio < fin) {
        errores[`turnos.${siguiente}.inicio`] = `El horario se empalma con ${turno.nombre}.`
      }
    }
  }

  config.espacios.forEach((espacio, indice) => {
    const base = `espacios.${indice}`
    if (!espacio.nombre.trim()) {
      errores[`${base}.nombre`] = 'Escriba el nombre del espacio.'
    }
    if (espacio.capacidad < 1 || espacio.capacidad > 40) {
      errores[`${base}.capacidad`] = 'La capacidad debe estar entre 1 y 40 personas.'
    }
  })

  if (config.intervalo.pausaMin < 5 || config.intervalo.pausaMin > 30) {
    errores['intervalo.pausaMin'] = 'La pausa activa debe durar entre 5 y 30 minutos.'
  }
  if (config.intervalo.db < 40 || config.intervalo.db > 85) {
    errores['intervalo.db'] = 'El atenuador debe operar entre 40 y 85 dB.'
  }

  if (config.capacidades.cupoAula < 15 || config.capacidades.cupoAula > 40) {
    errores['capacidades.cupoAula'] = 'El cupo por aula debe estar entre 15 y 40 estudiantes.'
  }
  if (config.capacidades.limiteDictamenGrupo < 1 || config.capacidades.limiteDictamenGrupo > 6) {
    errores['capacidades.limiteDictamenGrupo'] =
      'El límite de dictámenes por grupo debe estar entre 1 y 6.'
  }

  const { protocolos } = config
  if (protocolos.slaUrgenteMin < 1 || protocolos.slaUrgenteMin > 60) {
    errores['protocolos.slaUrgenteMin'] = 'La atención urgente debe responder entre 1 y 60 minutos.'
  }
  if (protocolos.slaPrioritariaHoras < 1 || protocolos.slaPrioritariaHoras > 72) {
    errores['protocolos.slaPrioritariaHoras'] = 'La atención prioritaria debe estar entre 1 y 72 horas.'
  }
  if (protocolos.slaOrdinariaDiasHabiles < 1 || protocolos.slaOrdinariaDiasHabiles > 30) {
    errores['protocolos.slaOrdinariaDiasHabiles'] =
      'La atención ordinaria debe estar entre 1 y 30 días hábiles.'
  }
  if (protocolos.paseSensorialMin < 5 || protocolos.paseSensorialMin > 60) {
    errores['protocolos.paseSensorialMin'] = 'El pase sensorial debe durar entre 5 y 60 minutos.'
  }
  if (protocolos.paseToleranciaMin < 5 || protocolos.paseToleranciaMin > 30) {
    errores['protocolos.paseToleranciaMin'] = 'La tolerancia debe estar entre 5 y 30 minutos.'
  }
  if (protocolos.paseToleranciaMin > protocolos.paseSensorialMin) {
    errores['protocolos.paseToleranciaMin'] =
      'La tolerancia no puede exceder la duración del pase sensorial.'
  }

  return errores
}

export function validarSeccion(config: PlantelConfig, seccion: SeccionConfigId): ErroresConfig {
  const todos = validarConfig(config)
  return Object.fromEntries(
    Object.entries(todos).filter(([ruta]) => seccionDeRuta(ruta) === seccion)
  )
}

export function primerErrorDeSeccion(errores: ErroresConfig, seccion: SeccionConfigId): string | undefined {
  return Object.keys(errores).find((ruta) => seccionDeRuta(ruta) === seccion)
}
