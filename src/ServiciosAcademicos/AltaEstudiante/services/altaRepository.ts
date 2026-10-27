import { ALTAS_ACTUALIZADAS_EVENT, ALTAS_DB_NAME } from '../../../Portal/shared/constants/altas'
import { escuela } from '../../../Portal/shared/constants/escuela'
import {
  altaConfig,
  condiciones,
  documentosIngreso,
  especialistasSEE,
  institucionesSalud,
} from '../constants/altaConfig'
import { calcularEdad, formatearFecha } from '../utils/edad'
import { enmascararCurp } from '../utils/curp'
import { crearBorradorInicial } from './altaFactory'
import type {
  AltaBorrador,
  AuditoriaAlta,
  NotificacionAlta,
  RegistroAltaResultado,
} from '../types'
import type { RegistroCanalizacion } from '../../../Psicologia/Canalizaciones/types'
import type { Estudiante } from '../../PadronGeneral/types'

const DB_VERSION = 1
const STORES = {
  borradores: 'borradores',
  estudiantes: 'estudiantes',
  canalizaciones: 'canalizaciones',
  notificaciones: 'notificaciones',
  auditoria: 'auditoria',
  resultados: 'resultados',
  meta: 'meta',
} as const

const memoria = {
  borradores: new Map<string, AltaBorrador>(),
  estudiantes: new Map<string, Estudiante>(),
  canalizaciones: new Map<string, RegistroCanalizacion>(),
  notificaciones: new Map<string, NotificacionAlta>(),
  auditoria: new Map<string, AuditoriaAlta>(),
  resultados: new Map<string, RegistroAltaResultado>(),
  secuencia: altaConfig.matriculaInicial,
}

let dbPromise: Promise<IDBDatabase> | null = null
let modoMemoria = typeof window === 'undefined' || !('indexedDB' in window)

function abrirDb(): Promise<IDBDatabase> {
  if (modoMemoria) return Promise.reject(new Error('IndexedDB no disponible'))
  if (dbPromise) return dbPromise
  dbPromise = new Promise((resolve, reject) => {
    const solicitud = window.indexedDB.open(ALTAS_DB_NAME, DB_VERSION)
    solicitud.onupgradeneeded = () => {
      const db = solicitud.result
      for (const store of Object.values(STORES)) {
        if (!db.objectStoreNames.contains(store)) {
          db.createObjectStore(store, {
            keyPath: store === 'meta' ? 'clave' : store === 'resultados' ? 'borradorId' : 'id',
          })
        }
      }
    }
    solicitud.onsuccess = () => resolve(solicitud.result)
    solicitud.onerror = () => {
      modoMemoria = true
      reject(solicitud.error ?? new Error('No fue posible abrir IndexedDB'))
    }
  })
  return dbPromise
}

function requestToPromise<T>(solicitud: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    solicitud.onsuccess = () => resolve(solicitud.result)
    solicitud.onerror = () => reject(solicitud.error)
  })
}

function transaccionCompleta(transaccion: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaccion.oncomplete = () => resolve()
    transaccion.onerror = () => reject(transaccion.error)
    transaccion.onabort = () => reject(transaccion.error)
  })
}

async function leer<T>(store: string, clave: IDBValidKey): Promise<T | undefined> {
  if (modoMemoria) {
    const coleccion = memoria[store as keyof typeof memoria] as Map<IDBValidKey, T>
    return coleccion.get(clave)
  }
  const db = await abrirDb()
  const transaccion = db.transaction(store, 'readonly')
  const resultado = await requestToPromise(
    transaccion.objectStore(store).get(clave) as IDBRequest<T | undefined>
  )
  await transaccionCompleta(transaccion)
  return resultado
}

async function leerTodo<T>(store: string): Promise<T[]> {
  if (modoMemoria) {
    const coleccion = memoria[store as keyof typeof memoria] as Map<string, T>
    return Array.from(coleccion.values())
  }
  const db = await abrirDb()
  const transaccion = db.transaction(store, 'readonly')
  const resultado = await requestToPromise(
    transaccion.objectStore(store).getAll() as IDBRequest<T[]>
  )
  await transaccionCompleta(transaccion)
  return resultado
}

async function escribir<T>(store: string, valor: T): Promise<void> {
  if (modoMemoria) {
    const coleccion = memoria[store as keyof typeof memoria] as Map<string, T>
    const clave =
      store === 'resultados'
        ? (valor as { borradorId: string }).borradorId
        : (valor as { id: string }).id
    coleccion.set(clave, valor)
    return
  }
  const db = await abrirDb()
  const transaccion = db.transaction(store, 'readwrite')
  transaccion.objectStore(store).put(valor)
  await transaccionCompleta(transaccion)
}

function notificarCambio() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(ALTAS_ACTUALIZADAS_EVENT))
  }
}

function nuevoId(prefijo: string): string {
  const aleatorio = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`
  return `${prefijo}-${aleatorio}`
}

async function reservarMatricula(): Promise<string> {
  if (modoMemoria) {
    memoria.secuencia += 1
    return `NX-${altaConfig.anioCiclo}-${String(memoria.secuencia).padStart(3, '0')}`
  }
  const db = await abrirDb()
  const transaccion = db.transaction(STORES.meta, 'readwrite')
  const store = transaccion.objectStore(STORES.meta)
  const actual = (await requestToPromise(
    store.get('matricula') as IDBRequest<{ clave: string; valor: number } | undefined>
  )) ?? { clave: 'matricula', valor: altaConfig.matriculaInicial }
  const siguiente = Math.max(actual.valor, altaConfig.matriculaInicial) + 1
  store.put({ clave: 'matricula', valor: siguiente })
  await transaccionCompleta(transaccion)
  return `NX-${altaConfig.anioCiclo}-${String(siguiente).padStart(3, '0')}`
}

export async function crearBorrador(): Promise<AltaBorrador> {
  try {
    const matricula = await reservarMatricula()
    const borrador = crearBorradorInicial(nuevoId('alta'), matricula)
    await escribir(STORES.borradores, borrador)
    notificarCambio()
    return borrador
  } catch {
    modoMemoria = true
    const matricula = await reservarMatricula()
    const borrador = crearBorradorInicial(nuevoId('alta'), matricula)
    await escribir(STORES.borradores, borrador)
    notificarCambio()
    return borrador
  }
}

export async function obtenerBorrador(id: string): Promise<AltaBorrador | null> {
  try {
    return (await leer<AltaBorrador>(STORES.borradores, id)) ?? null
  } catch {
    modoMemoria = true
    return memoria.borradores.get(id) ?? null
  }
}

export async function guardarBorrador(borrador: AltaBorrador): Promise<AltaBorrador> {
  const actualizado = { ...borrador, actualizadoEn: new Date().toISOString() }
  try {
    await escribir(STORES.borradores, actualizado)
  } catch {
    modoMemoria = true
    memoria.borradores.set(actualizado.id, actualizado)
  }
  notificarCambio()
  return actualizado
}

export async function listarEstudiantesAlta(): Promise<Estudiante[]> {
  try {
    const estudiantes = await leerTodo<Estudiante>(STORES.estudiantes)
    return estudiantes.sort((a, b) => (b.fechaRegistro ?? '').localeCompare(a.fechaRegistro ?? ''))
  } catch {
    modoMemoria = true
    return Array.from(memoria.estudiantes.values()).sort((a, b) =>
      (b.fechaRegistro ?? '').localeCompare(a.fechaRegistro ?? '')
    )
  }
}

export async function listarCanalizacionesAlta(): Promise<RegistroCanalizacion[]> {
  try {
    const registros = await leerTodo<RegistroCanalizacion>(STORES.canalizaciones)
    return registros.sort((a, b) => b.fechaEmision.localeCompare(a.fechaEmision))
  } catch {
    modoMemoria = true
    return Array.from(memoria.canalizaciones.values()).sort((a, b) =>
      b.fechaEmision.localeCompare(a.fechaEmision)
    )
  }
}

function crearEstudianteDesdeBorrador(borrador: AltaBorrador): Estudiante {
  const pendientes = borrador.documentos
    .filter((documento) => !documento.recibido)
    .map((documento) => documento.nombre)
  const recibidos = borrador.documentos.filter((documento) => documento.recibido).length
  const edad = calcularEdad(
    borrador.identificacion.fechaNacimiento,
    altaConfig.fechaReferenciaEdad
  )
  const especialista = especialistasSEE.find(
    (item) => item.value === borrador.derivacion.especialistaId
  )
  const derivado = borrador.derivacion.derivar
  const bloque = pendientes.length
    ? {
        tipo: 'urgente' as const,
        titulo: 'COTEJO DOCUMENTAL PENDIENTE:',
        texto: `Faltan por validar ${pendientes.length} documento(s) del expediente de alta. Consulte el detalle en Cotejo y Documentación.`,
        chip: `Plazo activo: ${altaConfig.diasPlazoDocumento} días`,
      }
    : derivado
      ? {
          tipo: 'protocolo' as const,
          titulo: 'CANALIZACIÓN SEE ACTIVA:',
          texto: `Expediente derivado a ${especialista?.label ?? 'Psicología y SEE'} para valoración inicial y plan de ajustes razonables.`,
          chip: 'Seguimiento SEE activo',
        }
      : {
          tipo: 'adecuaciones' as const,
          titulo: 'EXPEDIENTE ADMINISTRATIVO COMPLETO:',
          texto: 'Alta registrada sin derivación clínica inicial. La documentación quedó cotejada.',
          chip: 'Registro de alta validado',
        }

  return {
    id: `est-reg-${borrador.id}`,
    matricula: borrador.matriculaProvisional,
    curp: borrador.identificacion.curp,
    nombre: borrador.identificacion.nombres,
    apellidos: `${borrador.identificacion.apellidoPaterno} ${borrador.identificacion.apellidoMaterno}`.trim(),
    grado: borrador.asignacion.grado,
    grupo: borrador.asignacion.grupo,
    turno: borrador.asignacion.turno,
    edad: edad ?? 0,
    tutor: {
      nombre: borrador.tutor.nombre,
      parentesco:
        borrador.tutor.parentesco === 'madre'
          ? 'Madre'
          : borrador.tutor.parentesco === 'padre'
            ? 'Padre'
            : 'Tutor legal',
    },
    documentos: {
      total: borrador.documentos.length,
      validados: recibidos,
      pendientes,
    },
    estatusExpediente: pendientes.length > 0 ? 'cotejo_pendiente' : 'completo',
    atencionSEE: derivado ? 'en_atencion' : 'ninguna',
    bloque,
    fechaRegistro: new Date().toISOString(),
    origenAlta: true,
  }
}

function crearCanalizacionDesdeBorrador(
  borrador: AltaBorrador,
  estudiante: Estudiante,
  auditoriaId: string
): RegistroCanalizacion {
  const ahora = new Date()
  const condicion =
    condiciones.find((item) => item.value === borrador.condicion.condicionPrincipal)?.label ??
    'En evaluación'
  const especialista = especialistasSEE.find(
    (item) => item.value === borrador.derivacion.especialistaId
  )
  const pendientes = borrador.documentos
    .filter((documento) => !documento.recibido)
    .map((documento) => documento.nombre)
  const folio = `SEE-ALTA-${altaConfig.anioCiclo}-${borrador.matriculaProvisional.slice(-3)}`
  return {
    id: nuevoId('canalizacion-alta'),
    matricula: estudiante.matricula,
    marcaTemporal: ahora.toLocaleString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }),
    nombre: estudiante.nombre,
    apellidos: estudiante.apellidos,
    grado: estudiante.grado,
    grupo: estudiante.grupo,
    turno: estudiante.turno,
    origen: 'SERVICIOS ACADÉMICOS',
    emisor: 'Lic. Roberto Morales',
    asignatura: 'Admisión y Alta Escolar',
    estado: 'PENDIENTE',
    folio,
    fechaEmision: ahora.toLocaleString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
    afectaDesempeno: null,
    descripcion: `Alta oficial de alumno. Condición reportada: ${condicion}. Antecedente de emergencia: ${borrador.salud.alergias}. ${borrador.condicion.diagnosticoPrevio === 'en_proceso' ? 'Diagnóstico en proceso de evaluación.' : 'Diagnóstico externo reportado por el tutor.'}`,
    plan: [
      'Validar expediente clínico inicial y antecedentes de emergencia',
      'Elaborar plan de ajustes razonables (PARE)',
      'Notificar a la plantilla docente asignada',
    ],
    especialistaAsignado: especialista?.label,
    condicionReportada: condicion,
    sugerencias: borrador.salud.sugerencias,
    documentosPendientes: pendientes,
    curpEnmascarada: enmascararCurp(borrador.identificacion.curp),
    auditoriaId,
  }
}

function crearNotificaciones(
  borrador: AltaBorrador,
  estudiante: Estudiante
): NotificacionAlta[] {
  const ahora = new Date().toISOString()
  const especialista = especialistasSEE.find(
    (item) => item.value === borrador.derivacion.especialistaId
  )
  const notificaciones: NotificacionAlta[] = [
    {
      id: nuevoId('notificacion'),
      destinatario: 'Plantilla docente asignada',
      tipo: 'plantilla_docente',
      titulo: `Nuevo alumno en ${estudiante.grado} ${estudiante.grupo}`,
      detalle: `Se registró a ${estudiante.nombre} ${estudiante.apellidos} con matrícula ${estudiante.matricula}.`,
      creadaEn: ahora,
    },
  ]
  if (borrador.derivacion.derivar && especialista) {
    notificaciones.unshift({
      id: nuevoId('notificacion'),
      destinatario: especialista.label,
      tipo: 'especialista',
      titulo: 'Canalización prioritaria por alta escolar',
      detalle: `Expediente ${estudiante.matricula} asignado para valoración inicial.`,
      creadaEn: ahora,
    })
  }
  return notificaciones
}

function crearResultado(
  borrador: AltaBorrador,
  estudiante: Estudiante,
  folio: string,
  auditoriaId: string,
  canalizacionId?: string
): RegistroAltaResultado {
  return {
    borradorId: borrador.id,
    estudianteId: estudiante.id,
    matricula: estudiante.matricula,
    folio,
    canalizacionId,
    auditoriaId,
  }
}

async function finalizarEnMemoria(borradorId: string): Promise<RegistroAltaResultado> {
  const existente = memoria.resultados.get(borradorId)
  if (existente) return existente
  const borrador = memoria.borradores.get(borradorId)
  if (!borrador) throw new Error('El borrador ya no está disponible.')
  const estudiante = crearEstudianteDesdeBorrador(borrador)
  const auditoriaId = nuevoId('auditoria')
  const folio = `ALT-${altaConfig.anioCiclo}-${borrador.matriculaProvisional.slice(-3)}`
  const canalizacion = borrador.derivacion.derivar
    ? crearCanalizacionDesdeBorrador(borrador, estudiante, auditoriaId)
    : undefined
  const auditoria: AuditoriaAlta = {
    id: auditoriaId,
    accion: 'registro_alta',
    actor: borrador.creadoPor,
    rol: 'Servicios Académicos',
    creadaEn: new Date().toISOString(),
    detalle: `Alta registrada para ${estudiante.nombre} ${estudiante.apellidos} con matrícula ${estudiante.matricula}.`,
    referencia: folio,
  }
  const notificaciones = crearNotificaciones(borrador, estudiante)
  const resultado = crearResultado(
    borrador,
    estudiante,
    folio,
    auditoriaId,
    canalizacion?.id
  )
  memoria.estudiantes.set(estudiante.id, estudiante)
  if (canalizacion) memoria.canalizaciones.set(canalizacion.id, canalizacion)
  notificaciones.forEach((notificacion) =>
    memoria.notificaciones.set(notificacion.id, notificacion)
  )
  memoria.auditoria.set(auditoria.id, auditoria)
  memoria.resultados.set(borradorId, resultado)
  memoria.borradores.delete(borradorId)
  notificarCambio()
  return resultado
}

export async function finalizarAlta(borradorId: string): Promise<RegistroAltaResultado> {
  if (modoMemoria) return finalizarEnMemoria(borradorId)
  try {
    const db = await abrirDb()
    const transaccion = db.transaction(
      [
        STORES.borradores,
        STORES.estudiantes,
        STORES.canalizaciones,
        STORES.notificaciones,
        STORES.auditoria,
        STORES.resultados,
      ],
      'readwrite'
    )
    const borradores = transaccion.objectStore(STORES.borradores)
    const resultados = transaccion.objectStore(STORES.resultados)
    const existente = await requestToPromise<RegistroAltaResultado | undefined>(
      resultados.get(borradorId)
    )
    if (existente) {
      await transaccionCompleta(transaccion)
      return existente
    }
    const borrador = await requestToPromise<AltaBorrador | undefined>(borradores.get(borradorId))
    if (!borrador || borrador.estado !== 'borrador') {
      throw new Error('El borrador ya no está disponible.')
    }
    const estudiante = crearEstudianteDesdeBorrador(borrador)
    const auditoriaId = nuevoId('auditoria')
    const folio = `ALT-${altaConfig.anioCiclo}-${borrador.matriculaProvisional.slice(-3)}`
    const canalizacion = borrador.derivacion.derivar
      ? crearCanalizacionDesdeBorrador(borrador, estudiante, auditoriaId)
      : undefined
    const auditoria: AuditoriaAlta = {
      id: auditoriaId,
      accion: 'registro_alta',
      actor: borrador.creadoPor,
      rol: 'Servicios Académicos',
      creadaEn: new Date().toISOString(),
      detalle: `Alta registrada para ${estudiante.nombre} ${estudiante.apellidos} con matrícula ${estudiante.matricula}.`,
      referencia: folio,
    }
    const notificaciones = crearNotificaciones(borrador, estudiante)
    const resultado = crearResultado(
      borrador,
      estudiante,
      folio,
      auditoriaId,
      canalizacion?.id
    )
    transaccion.objectStore(STORES.estudiantes).put(estudiante)
    if (canalizacion) transaccion.objectStore(STORES.canalizaciones).put(canalizacion)
    notificaciones.forEach((notificacion) =>
      transaccion.objectStore(STORES.notificaciones).put(notificacion)
    )
    transaccion.objectStore(STORES.auditoria).put(auditoria)
    resultados.put(resultado)
    borradores.delete(borradorId)
    await transaccionCompleta(transaccion)
    notificarCambio()
    return resultado
  } catch (error) {
    if (error instanceof DOMException) {
      modoMemoria = true
      return finalizarEnMemoria(borradorId)
    }
    throw error
  }
}

export function crearResumenRegistro(borrador: AltaBorrador) {
  const especialista = especialistasSEE.find(
    (item) => item.value === borrador.derivacion.especialistaId
  )
  const condicion = condiciones.find(
    (item) => item.value === borrador.condicion.condicionPrincipal
  )
  const recibidos = borrador.documentos.filter((documento) => documento.recibido).length
  return {
    nombre: `${borrador.identificacion.nombres} ${borrador.identificacion.apellidoPaterno} ${borrador.identificacion.apellidoMaterno}`.trim(),
    curpEnmascarada: enmascararCurp(borrador.identificacion.curp),
    gradoGrupo: `${borrador.asignacion.grado} ${borrador.asignacion.grupo}`,
    turno: borrador.asignacion.turno,
    tutor: borrador.tutor.nombre,
    documentosRecibidos: recibidos,
    documentosTotal: borrador.documentos.length,
    derivacion: borrador.derivacion.derivar ? 'Sí, derivación directa' : 'No',
    especialista: especialista?.label ?? 'Sin asignar',
    condicion: condicion?.label ?? 'En evaluación',
    fechaNacimiento: formatearFecha(borrador.identificacion.fechaNacimiento),
    institucion:
      institucionesSalud.find((item) => item.value === borrador.salud.institucion)?.label ?? '',
    documentosPendientes: borrador.documentos.filter((documento) => !documento.recibido).length,
    sugerencias: borrador.salud.sugerencias,
    correo: borrador.tutor.correo,
    telefono: borrador.tutor.telefono,
    domicilio: borrador.tutor.domicilio,
    nombreEscuela: escuela.nombre,
  }
}

export async function eliminarBorrador(id: string): Promise<void> {
  try {
    if (modoMemoria) {
      memoria.borradores.delete(id)
    } else {
      const db = await abrirDb()
      const transaccion = db.transaction(STORES.borradores, 'readwrite')
      transaccion.objectStore(STORES.borradores).delete(id)
      await transaccionCompleta(transaccion)
    }
  } catch {
    modoMemoria = true
    memoria.borradores.delete(id)
  }
  notificarCambio()
}

export function listarDocumentosIngreso() {
  return documentosIngreso
}

