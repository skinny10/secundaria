import { listarEstudiantesApi } from '../../../utils/services/catalogosApi'
import {
  referralsApi,
  type ApiInformationSource,
  type ApiManifestation,
  type ApiPriority,
  type ApiReferral,
} from '../../../utils/services/sigeanApi'
import type { CanalizacionOrigen, RegistroCanalizacion } from '../types'

const origenes: Record<ApiInformationSource, CanalizacionOrigen> = {
  STUDENT_FILE: 'SERVICIOS ACADÉMICOS',
  TEACHER: 'DOCENTE',
  PREFECT: 'DOCENTE',
  SOCIAL_WORK: 'T. SOCIAL',
  GROUP_ADVISOR: 'ASESOR',
}

export const etiquetasManifestacion: Record<ApiManifestation, string> = {
  SENSORY_DYSREGULATION: 'Desregulación sensorial o auditiva',
  DIFFICULTY_FOLLOWING_INSTRUCTIONS: 'Dificultad para seguir consignas verbales extensas',
  SOCIAL_ISOLATION: 'Aislamiento social o mutismo situacional',
  READING_OR_MATH_DIFFICULTY: 'Dificultad de lectura o cálculo matemático',
}

export const etiquetasPrioridad: Record<ApiPriority, string> = {
  ORDINARY: 'Ordinaria',
  EXPEDITED: 'Prioritaria',
  URGENT: 'Urgente inmediata',
}

function formatearFecha(valor: string, conHora: boolean): string {
  const fecha = new Date(valor)
  if (Number.isNaN(fecha.getTime())) return valor
  return fecha.toLocaleString('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    ...(conHora ? { hour: '2-digit', minute: '2-digit' } : {}),
  })
}

export function idApiCanalizacion(registro: Pick<RegistroCanalizacion, 'id'>): number | undefined {
  const coincidencia = /^ref-(\d+)$/.exec(registro.id)
  return coincidencia ? Number(coincidencia[1]) : undefined
}

export async function listarCanalizacionesApi(signal?: AbortSignal): Promise<RegistroCanalizacion[]> {
  const [referrals, alumnos] = await Promise.all([
    referralsApi.list(undefined, signal),
    listarEstudiantesApi(signal).catch(() => []),
  ])
  const porId = new Map(alumnos.map((alumno) => [alumno.api.id, alumno]))
  return referrals
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .map((referral) => aRegistro(referral, porId.get(referral.studentId)))
}

function aRegistro(
  referral: ApiReferral,
  alumno: Awaited<ReturnType<typeof listarEstudiantesApi>>[number] | undefined
): RegistroCanalizacion {
  const manifestaciones = referral.manifestations.map((codigo) => etiquetasManifestacion[codigo])
  const descripcion = [
    referral.situationDescription,
    referral.reasonForReferral,
    manifestaciones.length ? `Manifestaciones: ${manifestaciones.join(', ')}` : null,
    referral.priority ? `Prioridad: ${etiquetasPrioridad[referral.priority]}` : null,
  ]
    .filter((texto): texto is string => Boolean(texto))
    .join(' · ')
  return {
    id: `ref-${referral.id}`,
    marcaTemporal: formatearFecha(referral.createdAt, true),
    nombre: alumno?.api.firstName ?? `Alumno #${referral.studentId}`,
    apellidos: alumno?.api.lastName ?? '',
    grado: alumno?.grado ?? '',
    grupo: alumno?.grupo ?? '',
    turno: alumno?.turno ?? '',
    origen: origenes[referral.informationSource],
    emisor: referral.evaluatorName,
    asignatura: referral.teacherSubject ?? '',
    estado: referral.status === 'RECEIVED' ? 'RECIBIDO' : 'PENDIENTE',
    folio: referral.folio ?? `REF-${referral.id}`,
    fechaEmision: formatearFecha(referral.referralDate, false),
    afectaDesempeno: referral.affectsAcademicPerformance,
    descripcion: descripcion || 'Sin descripción registrada.',
    plan: [],
    matricula: alumno?.api.enrollmentNumber,
  }
}

export async function marcarCanalizacionRecibida(registro: RegistroCanalizacion): Promise<void> {
  const id = idApiCanalizacion(registro)
  if (id === undefined) return
  await referralsApi.receive(id)
}
