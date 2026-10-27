import { useState } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { canalizacionContent, manifestaciones as manifestacionesIniciales, prioridades } from '../constants/canalizacion'
import { StepCard } from '../molecules/StepCard'
import { RadioOption } from '../molecules/RadioOption'
import { CheckboxCard } from '../molecules/CheckboxCard'
import { ActionCard } from '../atoms/ActionCard'
import type { AfectaAprendizaje, CanalizacionStep, Manifestacion, PrioridadId } from '../types'

interface CanalizacionesFormProps {
  onEnviar?: () => void
  onGuardarBorrador?: () => void
  onCancelar?: () => void
}

export function CanalizacionesForm({
  onEnviar,
  onGuardarBorrador,
  onCancelar,
}: CanalizacionesFormProps) {
  const [step, setStep] = useState<CanalizacionStep>('paso1')
  const [afecta, setAfecta] = useState<AfectaAprendizaje>(null)
  const [manifestaciones, setManifestaciones] = useState<Manifestacion[]>(manifestacionesIniciales)
  const [descripcion, setDescripcion] = useState('')
  const [prioridad, setPrioridad] = useState<PrioridadId>(null)
  const [errores, setErrores] = useState<string[]>([])

  const { header, pasos, seccion1, seccion2, acciones, avisoPrivacidad } = canalizacionContent

  const handleToggleManifestacion = (index: number, checked: boolean) => {
    setManifestaciones((prev) =>
      prev.map((m, i) => (i === index ? { ...m, checked } : m)),
    )
  }

  const handleEnviar = () => {
    const nuevosErrores: string[] = []
    if (descripcion.trim().length === 0) {
      nuevosErrores.push('La descripción de la situación observada es obligatoria.')
    }
    if (prioridad === null) {
      nuevosErrores.push('Debe seleccionar un nivel de prioridad.')
    }
    setErrores(nuevosErrores)
    if (nuevosErrores.length === 0) {
      if (prioridad === 'urgente') {
        if (window.confirm('¿Está seguro de enviar como Urgente Inmediata? Esta acción notifica de inmediato a Dirección y SEE.')) {
          onEnviar?.()
        }
        return
      }
      onEnviar?.()
    }
  }



  return (
    <div className="flex flex-col gap-6">
      {/* Encabezado institucional */}
      <section className="rounded-2xl bg-[var(--sa-field)] p-7 md:p-8">
        <div className="flex flex-col gap-3">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--sa-pill)] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[var(--color-forest)] shadow-[var(--shadow-sm)]">
            <Icon name={header.icon} size={14} color="currentColor" />
            {header.etiqueta}
          </span>
          <h1 className="text-2xl font-extrabold md:text-[28px] md:leading-tight">
            {header.titulo}
          </h1>
          <p className="text-base text-[var(--sa-muted)] md:text-[15px]">
            {header.descripcion}
          </p>
        </div>
      </section>

      {/* Indicador de pasos */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <StepCard
          activo={step === 'paso1'}
          numero={pasos.paso1.numero}
          etiqueta={pasos.paso1.etiqueta}
          titulo={pasos.paso1.titulo}
          onClick={() => setStep('paso1')}
        />
        <StepCard
          activo={step === 'paso2'}
          numero={pasos.paso2.numero}
          etiqueta={pasos.paso2.etiqueta}
          titulo={pasos.paso2.titulo}
            onClick={() => setStep('paso2')}
        />
      </section>

      {(
        <>
          {/* Sección 1 */}
          <section className="rounded-2xl bg-[var(--sa-card)] p-7 shadow-[var(--shadow-sm)] md:p-8">
            <div className="flex items-center gap-3">
              <Icon name={seccion1.icon} size={20} color="var(--color-forest)" />
              <h2 className="text-lg font-extrabold md:text-xl">{seccion1.titulo}</h2>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-base font-bold">{seccion1.alumnoLabel}</label>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--sa-field)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[var(--sa-muted)]">
                    {seccion1.alumnoTag}
                  </span>
                </div>
                <div className="flex min-h-[52px] items-center gap-2 rounded-xl border border-[var(--sa-input-border)] bg-[var(--sa-card)] px-3 shadow-[var(--shadow-sm)]">
                  <Icon name="users" size={18} color="var(--sa-accent)" />
                  <span className="truncate text-base">{seccion1.alumnoValue}</span>
                  <Icon name="chevron-down" size={16} color="var(--sa-muted)" className="ml-auto" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-base font-bold">{seccion1.asignaturaLabel}</label>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--sa-field)] px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-[var(--sa-muted)]">
                    {seccion1.asignaturaTag}
                  </span>
                </div>
                <div className="flex min-h-[52px] items-center gap-2 rounded-xl border border-[var(--sa-input-border)] bg-[var(--sa-card)] px-3 shadow-[var(--shadow-sm)]">
                  <Icon name="book-open" size={18} color="var(--sa-accent)" />
                  <span className="truncate text-base">{seccion1.asignaturaValue}</span>
                  <Icon name="chevron-down" size={16} color="var(--sa-muted)" className="ml-auto" />
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-[var(--sa-sky)] p-4">
              <div className="flex gap-3">
                <Icon name={seccion1.info.icon} size={18} color="var(--sa-steel)" />
                <div>
                  <h4 className="text-base font-bold">{seccion1.info.titulo}</h4>
                  <p className="mt-1 text-[13px] leading-snug text-[var(--sa-muted)]">
                    {seccion1.info.texto}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Sección 2 */}
          <section className="rounded-2xl bg-[var(--sa-card)] p-7 shadow-[var(--shadow-sm)] md:p-8">
            <div className="flex items-center gap-3">
              <Icon name={seccion2.icon} size={20} color="var(--color-forest)" />
              <h2 className="text-lg font-extrabold md:text-xl">{seccion2.titulo}</h2>
            </div>

            <fieldset className="mt-6">
              <legend className="text-base font-bold">
                {seccion2.preguntaAfecta} <span className="text-[#C62828]">*</span>
              </legend>
              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                <RadioOption
                  id="afecta-si"
                  name="afecta"
                  label={seccion2.siLabel}
                  checked={afecta === 'si'}
                  onSelect={() => setAfecta('si')}
                  selectedClass="border-[var(--color-forest)] bg-[var(--sa-menta)]"
                  unselectedClass="border-[var(--sa-border)] bg-[var(--sa-field)]"
                />
                <RadioOption
                  id="afecta-no"
                  name="afecta"
                  label={seccion2.noLabel}
                  checked={afecta === 'no'}
                  onSelect={() => setAfecta('no')}
                  selectedClass="border-[var(--sa-border)] bg-[var(--sa-menta)]"
                  unselectedClass="border-[var(--sa-border)] bg-[var(--sa-field)]"
                />
              </div>
            </fieldset>

            <div className="mt-6">
              <h3 className="text-base font-bold">{seccion2.manifestacionesTitulo}</h3>
              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
                {manifestaciones.map((m, i) => (
                  <CheckboxCard
                    key={m.id}
                    icon={m.icon as any}
                    label={m.label}
                    checked={m.checked}
                    onChange={(c) => handleToggleManifestacion(i, c)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="descripcion" className="text-base font-bold">
                {seccion2.descripcionLabel} <span className="text-[#C62828]">*</span>
              </label>
              <textarea
                id="descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="mt-2 min-h-[140px] w-full resize-y rounded-xl border border-[var(--sa-input-border)] bg-[var(--sa-field)] px-4 py-3 text-base leading-relaxed text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--sa-accent)]"
                maxLength={seccion2.maxCaracteres}
                aria-required="true"
              />
              <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-base text-[var(--sa-muted)]">
                  {seccion2.ayudaRedaccion}
                </span>
                <span className="text-base font-bold text-[var(--color-text-primary)]">
                  {descripcion.length} / {seccion2.maxCaracteres} caracteres
                </span>
              </div>
            </div>

            <fieldset className="mt-6">
              <legend className="text-base font-bold">
                {seccion2.prioridadTitulo} <span className="text-[#C62828]">*</span>
              </legend>
              <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
                {prioridades.map((p) => (
                  <ActionCard
                    key={p.id}
                    icon={p.icon as any}
                    title={p.title}
                    description={p.description}
                    selected={prioridad === p.id}
                    onSelect={() => setPrioridad(p.id as PrioridadId)}
                    variant={p.id as any}
                  />
                ))}
              </div>
            </fieldset>

            {errores.length > 0 && (
              <div role="alert" className="mt-4 rounded-xl border border-[#C62828] bg-[#FFF4F4] p-3">
                {errores.map((e, i) => (
                  <p key={i} className="text-base font-bold text-[#C62828]">
                    {e}
                  </p>
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {/* Barra de acciones */}
      <section className="rounded-2xl bg-[var(--sa-card)] p-4 shadow-[var(--shadow-sm)] md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <button
            type="button"
            onClick={onCancelar}
            className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-field)] px-5 text-base font-bold hover:brightness-95 md:order-1"
          >
            {acciones.cancelar}
          </button>
          <button
            type="button"
            onClick={onGuardarBorrador}
            className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-field)] px-5 text-base font-bold hover:brightness-95 md:order-2"
          >
            <Icon name="bookmark" size={18} color="currentColor" />
            {acciones.guardar}
          </button>
          <button
            type="button"
            onClick={handleEnviar}
            className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-xl bg-[var(--color-forest)] px-5 text-base font-bold text-[var(--sa-on-accent)] shadow-[var(--shadow-sm)] hover:brightness-95 md:order-3 md:ml-auto md:w-auto"
          >
            <Icon name="share" size={18} color="currentColor" />
            {acciones.enviar}
          </button>
        </div>
      </section>

      {/* Aviso de privacidad */}
      <div className="flex flex-col gap-2 px-1 text-[11px] text-[var(--sa-muted)] sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-2">
          <Icon name={avisoPrivacidad.icon} size={14} color="currentColor" />
          <span className="font-bold uppercase tracking-widest">{avisoPrivacidad.titulo}</span>
        </div>
        <p className="leading-snug sm:text-right">{avisoPrivacidad.texto}</p>
      </div>
    </div>
  )
}

