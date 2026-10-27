import { Icon } from '../../../utils/atoms/Icon'
import { dialogosAlta } from '../constants/altaContent'
import { DialogoAlta } from '../molecules/DialogoAlta'
import {
  BotonPrimario,
  BotonSecundario,
} from '../molecules/AccionesAlta'
import { AvisoInfo } from '../molecules/RetroalimentacionAlta'
import type { ResumenRegistro } from '../types'

interface DialogoSalidaProps {
  guardando: boolean
  error?: string
  onCancelar: () => void
  onDescartar: () => void
  onGuardar: () => void
}

export function DialogoSalida({
  guardando,
  error,
  onCancelar,
  onDescartar,
  onGuardar,
}: DialogoSalidaProps) {
  return (
    <DialogoAlta
      tituloId='alta-salir-titulo'
      descripcionId='alta-salir-descripcion'
      titulo={dialogosAlta.salirTitulo}
      descripcion={dialogosAlta.salirDescripcion}
      icono='alert-triangle'
      onCerrar={onCancelar}
      cerrarDeshabilitado={guardando}
      ancho='sm'
      footer={
        <>
          <BotonSecundario
            onClick={onCancelar}
            disabled={guardando}
            data-autofocus
            className='w-full sm:w-auto'
          >
            {dialogosAlta.salirCancelar}
          </BotonSecundario>
          <BotonSecundario
            onClick={onDescartar}
            disabled={guardando}
            className='w-full sm:w-auto'
          >
            {dialogosAlta.salirDescartar}
          </BotonSecundario>
          <BotonPrimario
            icono='save'
            onClick={onGuardar}
            disabled={guardando}
            className='w-full sm:w-auto'
          >
            {guardando ? 'Guardando…' : dialogosAlta.salirGuardar}
          </BotonPrimario>
        </>
      }
    >
      <div className='flex min-w-0 flex-col gap-2'>
        <AvisoInfo tono='advertencia'>
          Si sale sin guardar, se conservará la última versión guardada del borrador. Los
          cambios de esta sesión se perderán.
        </AvisoInfo>
        {error ? (
          <div
            role='alert'
            className='rounded-xl border border-[var(--sa-danger)] bg-[var(--sa-rosa)] p-3 text-[13px] font-semibold text-[var(--sa-on-rosa)]'
          >
            {error}
          </div>
        ) : null}
      </div>
    </DialogoAlta>
  )
}

interface DialogoConfirmacionProps {
  resumen: ResumenRegistro
  registrando: boolean
  error?: string
  onRevisar: () => void
  onConfirmar: () => void
}

export function DialogoConfirmacion({
  resumen,
  registrando,
  error,
  onRevisar,
  onConfirmar,
}: DialogoConfirmacionProps) {
  const filas = [
    [dialogosAlta.resumen.nombre, resumen.nombre],
    [dialogosAlta.resumen.curp, resumen.curpEnmascarada],
    [dialogosAlta.resumen.asignacion, resumen.gradoGrupo],
    [dialogosAlta.resumen.turno, resumen.turno],
    [dialogosAlta.resumen.tutor, resumen.tutor],
    [
      dialogosAlta.resumen.documentos,
      `${resumen.documentosRecibidos} de ${resumen.documentosTotal} cotejados`,
    ],
    [dialogosAlta.resumen.derivacion, resumen.derivacion],
    [dialogosAlta.resumen.especialista, resumen.especialista],
  ]
  return (
    <DialogoAlta
      tituloId='alta-confirmar-titulo'
      descripcionId='alta-confirmar-descripcion'
      titulo={dialogosAlta.confirmarTitulo}
      descripcion={dialogosAlta.confirmarDescripcion}
      icono='file-signature'
      onCerrar={onRevisar}
      cerrarDeshabilitado={registrando}
      footer={
        <>
          <BotonSecundario
            onClick={onRevisar}
            disabled={registrando}
            data-autofocus
            className='w-full sm:w-auto'
          >
            {dialogosAlta.revisar}
          </BotonSecundario>
          <BotonPrimario
            icono='user-cog'
            onClick={onConfirmar}
            disabled={registrando}
            aria-busy={registrando}
            className='w-full sm:w-auto'
          >
            {registrando ? dialogosAlta.confirmando : dialogosAlta.confirmar}
          </BotonPrimario>
        </>
      }
    >
      <div className='flex min-w-0 flex-col gap-3'>
        <dl className='grid min-w-0 grid-cols-1 gap-x-4 gap-y-2 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-field)] p-3 sm:grid-cols-2'>
          {filas.map(([etiqueta, valor]) => (
            <div key={etiqueta} className='flex min-w-0 flex-col gap-0.5'>
              <dt className='text-[11px] font-extrabold tracking-[0.05em] text-[var(--sa-muted)] uppercase'>
                {etiqueta}
              </dt>
              <dd className='text-[14px] leading-snug font-semibold break-words'>{valor}</dd>
            </div>
          ))}
        </dl>
        <AvisoInfo tono='advertencia' titulo='Registro definitivo'>
          Al confirmar se genera la matrícula oficial, se actualiza el Padrón General y se
          notifica a la plantilla docente y, cuando aplique, al especialista SEE.
        </AvisoInfo>
        {error ? (
          <div
            role='alert'
            className='flex items-start gap-2 rounded-xl border border-[var(--sa-danger)] bg-[var(--sa-rosa)] p-3 text-[13px] font-semibold text-[var(--sa-on-rosa)]'
          >
            <Icon name='alert-triangle' size={17} color='currentColor' className='mt-0.5 shrink-0' />
            {error}
          </div>
        ) : null}
      </div>
    </DialogoAlta>
  )
}
