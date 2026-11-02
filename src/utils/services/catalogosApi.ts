import {
  gradesApi,
  schoolGroupsApi,
  studentsApi,
  type ApiGrade,
  type ApiSchoolGroup,
  type ApiShift,
  type ApiStudent,
} from './sigeanApi'

export interface Catalogos {
  grados: ApiGrade[]
  grupos: ApiSchoolGroup[]
}

let catalogosPromise: Promise<Catalogos> | null = null

export function obtenerCatalogos(): Promise<Catalogos> {
  if (!catalogosPromise) {
    catalogosPromise = Promise.all([gradesApi.list(), schoolGroupsApi.list()])
      .then(([grados, grupos]) => ({ grados, grupos }))
      .catch((error) => {
        catalogosPromise = null
        throw error
      })
  }
  return catalogosPromise
}

export function etiquetaGrado(catalogos: Catalogos, gradeId: number): string {
  const grado = catalogos.grados.find((item) => item.id === gradeId)
  return grado ? `${grado.gradeNumber}°` : ''
}

export function etiquetaGrupo(catalogos: Catalogos, schoolGroupId: number): string {
  return catalogos.grupos.find((item) => item.id === schoolGroupId)?.letter ?? ''
}

export function idGrado(catalogos: Catalogos, etiqueta: string): number | undefined {
  const numero = Number.parseInt(etiqueta, 10)
  return catalogos.grados.find((item) => item.gradeNumber === numero)?.id
}

export function idGrupo(catalogos: Catalogos, letra: string): number | undefined {
  const normalizada = letra.trim().toUpperCase()
  return catalogos.grupos.find((item) => item.letter.toUpperCase() === normalizada)?.id
}

export function turnoDesdeApi(shift: ApiShift): string {
  return shift === 'AFTERNOON' ? 'Vespertino' : 'Matutino'
}

export function turnoHaciaApi(turno: string): ApiShift {
  return turno.toLowerCase().startsWith('vesp') ? 'AFTERNOON' : 'MORNING'
}

export interface EstudianteApiDetalle {
  api: ApiStudent
  grado: string
  grupo: string
  turno: string
  nombreCompleto: string
}

export async function listarEstudiantesApi(signal?: AbortSignal): Promise<EstudianteApiDetalle[]> {
  const [catalogos, estudiantes] = await Promise.all([obtenerCatalogos(), studentsApi.list({}, signal)])
  return estudiantes.map((api) => ({
    api,
    grado: etiquetaGrado(catalogos, api.gradeId),
    grupo: etiquetaGrupo(catalogos, api.schoolGroupId),
    turno: turnoDesdeApi(api.shift),
    nombreCompleto: `${api.firstName} ${api.lastName}`.trim(),
  }))
}
