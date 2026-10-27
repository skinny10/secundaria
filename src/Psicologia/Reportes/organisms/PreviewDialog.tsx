import { useEffect, useRef } from 'react'
import { Icon } from '../../../utils/atoms/Icon'
import { BotonAccion } from '../atoms/BotonAccion'
import type { GeneradorFormato, TipoDocumento } from '../types'

interface PreviewDialogProps {
  preview: GeneradorFormato | null
  autorizado: boolean
  onClose: () => void
  onGenerar: (tipo: TipoDocumento) => void
}

export function PreviewDialog({
  preview,
  autorizado,
  onClose,
  onGenerar,
}: PreviewDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (preview && !dialog.open) dialog.showModal()
    if (!preview && dialog.open) dialog.close()
  }, [preview])

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose()
      }}
      className='w-[min(560px,calc(100vw-24px))] max-h-[90vh] overflow-y-auto rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-0 text-[var(--color-text-primary)] backdrop:bg-black/50'
    >
      {preview ? (
        <div className='flex flex-col gap-3 p-5'>
          <div className='flex items-start justify-between gap-2'>
            <div className='min-w-0'>
              <p className='text-[10px] font-bold tracking-widest text-[var(--sa-steel)] uppercase'>
                {preview.etiqueta}
              </p>
              <h2 className='mt-1 text-[18px] leading-snug font-extrabold'>{preview.titulo}</h2>
            </div>
            <button
              type='button'
              onClick={onClose}
              aria-label='Cerrar vista previa'
              className='inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--sa-border)] bg-[var(--sa-field)]'
            >
              <Icon name='x' size={16} color='currentColor' />
            </button>
          </div>
          <p className='text-[13px] text-[var(--sa-muted)]'>{preview.descripcion}</p>
          <div className='rounded-xl bg-[var(--sa-box)] p-3 text-[12px]'>
            <div className='grid grid-cols-1 gap-2 sm:grid-cols-3'>
              <div>
                <p className='font-bold tracking-wide text-[var(--sa-muted)] uppercase'>Estudiantes</p>
                <p className='font-extrabold text-[var(--color-forest)]'>48 Casos</p>
              </div>
              <div>
                <p className='font-bold tracking-wide text-[var(--sa-muted)] uppercase'>Diagnóstico</p>
                <p className='font-bold'>TEA / TDAH / Sens.</p>
              </div>
              <div>
                <p className='font-bold tracking-wide text-[var(--sa-muted)] uppercase'>Afiliación</p>
                <p className='font-bold'>100% Verificado</p>
              </div>
            </div>
          </div>
          <p className='text-[11px] text-[var(--sa-muted)]'>
            Documento preliminar sin folio. Al generarlo se asignará el siguiente folio correlativo y
            se registrará en el libro de folios.
          </p>
          <div className='flex flex-wrap gap-2'>
            <BotonAccion variante='gris' icono='x' onClick={onClose}>
              Cerrar
            </BotonAccion>
            <BotonAccion
              variante='verde'
              icono='download'
              onClick={() => {
                onGenerar(preview.id)
                onClose()
              }}
              disabled={!autorizado}
            >
              Generar y Foliar
            </BotonAccion>
          </div>
        </div>
      ) : null}
    </dialog>
  )
}
