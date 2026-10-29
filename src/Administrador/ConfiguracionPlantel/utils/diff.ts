import type { CambioConfig, PlantelConfig } from '../types'

const ETIQUETAS: Record<string, string> = {
  'identidad.nombre': 'Nombre oficial del plantel',
  'identidad.cct': 'Clave de Centro de Trabajo (CCT)',
  'identidad.cctValidacion': 'Validación de la CCT',
  'identidad.entidad': 'Entidad federativa',
  'identidad.municipio': 'Municipio',
  'identidad.domicilio': 'Domicilio oficial',
  'identidad.telefono': 'Teléfono del plantel',
  'identidad.correo': 'Correo institucional',
  'identidad.director.nombre': 'Director responsable',
  'identidad.director.correo': 'Correo del director',
  'identidad.director.telefono': 'Teléfono del director',
  'identidad.director.cedula': 'Cédula profesional del director',
  'ciclo.activo': 'Ciclo escolar activo',
  'intervalo.pausaMin': 'Duración de la pausa activa',
  'intervalo.atenuadorActivo': 'Atenuador de ruido',
  'intervalo.db': 'Nivel del atenuador',
  'capacidades.cupoAula': 'Cupo máximo por aula',
  'capacidades.limiteDictamenGrupo': 'Límite de dictámenes por grupo',
  'protocolos.slaUrgenteMin': 'SLA de atención urgente',
  'protocolos.slaPrioritariaHoras': 'SLA de atención prioritaria',
  'protocolos.slaOrdinariaDiasHabiles': 'SLA de atención ordinaria',
  'protocolos.paseSensorialMin': 'Duración del pase sensorial',
  'protocolos.paseToleranciaMin': 'Tolerancia del pase sensorial',
  'seguridad.cifrado': 'Cifrado de datos sensibles',
  'seguridad.reautenticacion2FA': 'Reautenticación 2FA',
  'seguridad.retencionDias': 'Retención de registros',
}

const CAMPOS_SIMPLES: Record<string, string> = {
  nombre: 'Nombre',
  inicio: 'Hora de entrada',
  fin: 'Hora de salida',
  moduloMin: 'Duración del módulo',
  modulos: 'Módulos por jornada',
  activo: 'Estado',
  asignaciones: 'Grupos asignados',
  tipo: 'Tipo de espacio',
  capacidad: 'Capacidad',
  pasesActivos: 'Pases activos',
  duracionMin: 'Duración del receso',
}

function etiquetaDeRuta(ruta: string, antes: PlantelConfig, despues: PlantelConfig): string {
  if (ETIQUETAS[ruta]) return ETIQUETAS[ruta]
  const partes = ruta.split('.')

  if (partes[0] === 'turnos') {
    const indice = Number(partes[1])
    const turno = despues.turnos[indice] ?? antes.turnos[indice]
    const nombre = turno?.nombre ?? `Jornada ${indice + 1}`
    if (partes[2] === 'recesos') {
      const indiceReceso = Number(partes[3])
      const receso = turno?.recesos[indiceReceso]
      const campo = CAMPOS_SIMPLES[partes[4]] ?? partes[4]
      return `${nombre} · ${receso?.nombre ?? `Receso ${indiceReceso + 1}`}: ${campo}`
    }
    return `${nombre} · ${CAMPOS_SIMPLES[partes[2]] ?? partes[2]}`
  }

  if (partes[0] === 'espacios') {
    const indice = Number(partes[1])
    const espacio = despues.espacios[indice] ?? antes.espacios[indice]
    const nombre = espacio?.nombre ?? `Espacio ${indice + 1}`
    return `${nombre} · ${CAMPOS_SIMPLES[partes[2]] ?? partes[2]}`
  }

  return ruta
}

function formatear(valor: unknown): string {
  if (typeof valor === 'boolean') return valor ? 'Activo' : 'Inactivo'
  if (valor === '' || valor === null || valor === undefined) return '—'
  return String(valor)
}

function esSensible(ruta: string): boolean {
  return (
    ruta.startsWith('identidad') ||
    ruta.startsWith('protocolos') ||
    ruta.startsWith('seguridad') ||
    ruta.startsWith('ciclo')
  )
}

export function listarCambios(antes: PlantelConfig, despues: PlantelConfig): CambioConfig[] {
  const cambios: CambioConfig[] = []

  const recorrer = (ruta: string, valorAntes: unknown, valorDespues: unknown) => {
    if (valorAntes === valorDespues) return
    if (ruta === 'version' || ruta === 'actualizadoPor' || ruta === 'actualizadoEn') return

    if (
      valorAntes &&
      valorDespues &&
      typeof valorAntes === 'object' &&
      typeof valorDespues === 'object'
    ) {
      const llaves = new Set([
        ...Object.keys(valorAntes as Record<string, unknown>),
        ...Object.keys(valorDespues as Record<string, unknown>),
      ])
      llaves.forEach((llave) => {
        recorrer(
          ruta ? `${ruta}.${llave}` : llave,
          (valorAntes as Record<string, unknown>)[llave],
          (valorDespues as Record<string, unknown>)[llave]
        )
      })
      return
    }

    if (ruta) {
      cambios.push({
        ruta,
        etiqueta: etiquetaDeRuta(ruta, antes, despues),
        antes: formatear(valorAntes),
        despues: formatear(valorDespues),
        sensible: esSensible(ruta),
      })
    }
  }

  recorrer('', antes, despues)
  return cambios
}

export function contarCambios(antes: PlantelConfig, despues: PlantelConfig): number {
  return listarCambios(antes, despues).length
}

export function cambiosSensibles(cambios: CambioConfig[]): boolean {
  return cambios.some((cambio) => cambio.sensible)
}
