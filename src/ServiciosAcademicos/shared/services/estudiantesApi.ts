import { listarEstudiantesApi, type EstudianteApiDetalle } from '../../../utils/services/catalogosApi'
import { listarEstudiantesAlta } from '../../AltaEstudiante/services/altaRepository'
import type { Estudiante } from '../../PadronGeneral/types'

let ultimaLista: Estudiante[] = []

export function idApiEstudiante(estudiante: Pick<Estudiante, 'id'>): number | undefined {
  const coincidencia = /^api-(\d+)$/.exec(estudiante.id)
  return coincidencia ? Number(coincidencia[1]) : undefined
}

function aEstudiante(detalle: EstudianteApiDetalle): Estudiante {
  return {
    id: `api-${detalle.api.id}`,
    matricula: detalle.api.enrollmentNumber,
    curp: '',
    nombre: detalle.api.firstName,
    apellidos: detalle.api.lastName,
    grado: detalle.grado,
    grupo: detalle.grupo,
    turno: detalle.turno,
    edad: 0,
    tutor: { nombre: '', parentesco: '' },
    documentos: { total: 0, validados: 0, pendientes: [] },
    estatusExpediente: 'validado',
    atencionSEE: 'ninguna',
    bloque: {
      tipo: 'adecuaciones',
      titulo: 'REGISTRO INSTITUCIONAL:',
      texto: 'Alumno registrado en el sistema central SIGEAN.',
      chip: detalle.api.active ? 'Alumno activo' : 'Alumno inactivo',
    },
  }
}

export async function listarEstudiantesPadron(signal?: AbortSignal): Promise<Estudiante[]> {
  const [remotos, locales] = await Promise.all([
    listarEstudiantesApi(signal),
    listarEstudiantesAlta().catch(() => [] as Estudiante[]),
  ])
  const localesPorMatricula = new Map(locales.map((estudiante) => [estudiante.matricula, estudiante]))
  const lista = remotos.map((detalle) => {
    const base = aEstudiante(detalle)
    const local = localesPorMatricula.get(base.matricula)
    return local
      ? { ...local, id: base.id, nombre: base.nombre, apellidos: base.apellidos, grado: base.grado, grupo: base.grupo, turno: base.turno }
      : base
  })
  ultimaLista = lista
  return lista
}

export function estudianteEnCache(id: string): Estudiante | undefined {
  return ultimaLista.find((estudiante) => estudiante.id === id)
}

export async function buscarEstudiante(id: string): Promise<Estudiante | undefined> {
  return estudianteEnCache(id) ?? (await listarEstudiantesPadron()).find((estudiante) => estudiante.id === id)
}
