import { useMemo, useState } from 'react'
import { CanalizacionesForm, type CanalizacionEnvio } from '../organisms/CanalizacionesForm'
import { getSession, mapAuthError } from '../../../Login/services/authService'
import { referralsApi, type ApiManifestation, type ApiPriority } from '../../../utils/services/sigeanApi'
import { useAlumnosDocente } from '../../shared/hooks/useAlumnosDocente'
import { manifestaciones as catalogoManifestaciones } from '../constants/canalizacion'
import type { ManifestacionId } from '../types'

const manifestacionesApi: Record<ManifestacionId, ApiManifestation> = {
  desregulacion: 'SENSORY_DYSREGULATION',
  consignas: 'DIFFICULTY_FOLLOWING_INSTRUCTIONS',
  aislamiento: 'SOCIAL_ISOLATION',
  'lectura-calculo': 'READING_OR_MATH_DIFFICULTY',
}

const prioridadesApi: Record<CanalizacionEnvio['prioridad'], ApiPriority> = {
  ordinaria: 'ORDINARY',
  prioritaria: 'EXPEDITED',
  urgente: 'URGENT',
}

function fechaHoy(): string {
  const hoy = new Date()
  const mes = String(hoy.getMonth() + 1).padStart(2, '0')
  const dia = String(hoy.getDate()).padStart(2, '0')
  return `${hoy.getFullYear()}-${mes}-${dia}`
}

export function CanalizacionesPage() {
  const { alumnos } = useAlumnosDocente()
  const [enviando, setEnviando] = useState(false)
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null)
  const [folio, setFolio] = useState<string | null>(null)
  const [formKey, setFormKey] = useState(0)

  const opciones = useMemo(
    () =>
      alumnos.map((alumno) => ({
        id: alumno.api.id,
        etiqueta: `${alumno.nombreCompleto} · ${alumno.grado} ${alumno.grupo} ${alumno.turno}`,
      })),
    [alumnos]
  )

  const handleEnviar = async (datos: CanalizacionEnvio) => {
    const session = getSession()
    if (!session) return
    setEnviando(true)
    setErrorEnvio(null)
    setFolio(null)
    const manifestaciones = datos.manifestaciones.map((id) => manifestacionesApi[id])
    const motivo =
      catalogoManifestaciones
        .filter((m) => datos.manifestaciones.includes(m.id))
        .map((m) => m.label)
        .join(', ') || datos.descripcion
    try {
      const creada = await referralsApi.create({
        studentId: datos.alumnoId,
        informationSource: session.user.role === 'PREFECT' ? 'PREFECT' : 'TEACHER',
        evaluatorName: session.user.fullName,
        teacherSubject: datos.asignatura || null,
        referralDate: fechaHoy(),
        affectsAcademicPerformance: datos.afectaAprendizaje,
        situationDescription: datos.descripcion,
        reasonForReferral: motivo,
        priority: prioridadesApi[datos.prioridad],
        manifestations: manifestaciones,
      })
      setFolio(creada.folio ?? String(creada.id))
      setFormKey((valor) => valor + 1)
    } catch (err) {
      setErrorEnvio(mapAuthError(err))
    } finally {
      setEnviando(false)
    }
  }

  const handleGuardar = () => {
    alert('Borrador guardado.')
  }

  const handleCancelar = () => {
    window.location.hash = '#maestros'
  }

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-[15px] py-5">
      {folio ? (
        <div role="status" className="rounded-xl border border-[var(--color-forest)] bg-[var(--sa-menta)] p-4 text-base font-bold">
          Canalización enviada correctamente. Folio: {folio}
        </div>
      ) : null}
      <CanalizacionesForm
        key={formKey}
        alumnos={opciones}
        enviando={enviando}
        errorEnvio={errorEnvio}
        onEnviar={(datos) => void handleEnviar(datos)}
        onGuardarBorrador={handleGuardar}
        onCancelar={handleCancelar}
      />
    </div>
  )
}
