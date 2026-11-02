import { ApiError } from '../../../utils/services/apiClient'
import { obtenerCatalogos, idGrado, idGrupo, turnoHaciaApi } from '../../../utils/services/catalogosApi'
import { studentsApi, type ApiStudent } from '../../../utils/services/sigeanApi'
import type { AltaBorrador } from '../types'

export async function registrarEstudianteApi(borrador: AltaBorrador): Promise<ApiStudent | null> {
  const catalogos = await obtenerCatalogos()
  const gradeId = idGrado(catalogos, borrador.asignacion.grado)
  const schoolGroupId = idGrupo(catalogos, borrador.asignacion.grupo)
  if (!gradeId || !schoolGroupId) {
    throw new ApiError(
      `El grado ${borrador.asignacion.grado} grupo ${borrador.asignacion.grupo} no existe en el sistema central.`,
      400
    )
  }
  const apellidos = `${borrador.identificacion.apellidoPaterno} ${borrador.identificacion.apellidoMaterno}`.trim()
  try {
    return await studentsApi.create({
      enrollmentNumber: borrador.matriculaProvisional,
      firstName: borrador.identificacion.nombres.trim(),
      lastName: apellidos,
      gradeId,
      schoolGroupId,
      shift: turnoHaciaApi(borrador.asignacion.turno),
    })
  } catch (error) {
    if (error instanceof ApiError && error.status === 409) return null
    throw error
  }
}
