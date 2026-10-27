import { Icon } from '../../../utils/atoms/Icon'
import { cn } from '../../../utils/cn'
import { BotonAccion } from '../atoms/BotonAccion'
import type { GeneradorFormato, TipoDocumento } from '../types'

const tonoIcono: Record<GeneradorFormato['iconoTono'], string> = {
  menta: 'bg-[var(--sa-menta)] text-[var(--sa-on-menta)]',
  sky: 'bg-[var(--sa-sky)] text-[var(--sa-steel)]',
  peach: 'bg-[var(--sa-peach)] text-[var(--sa-coffee)]',
  neutral: 'bg-[var(--sa-field)] text-[var(--sa-muted)]',
}

const instituciones = [
  'Hospital Pediátrico Tuxtla',
  'DIF Municipal Área Jurídica',
  'UNEME-CISAME Psiquiatría',
]

const ajustesDUA = [
  'Pases de Regulación',
  'Ajustes de Evaluación',
  'Ubicación Estratégica',
  'Canal de Instrucción',
]

interface GeneradorCardProps {
  generador: GeneradorFormato
  autorizado: boolean
  onGenerar: (tipo: TipoDocumento) => void
  onPreview: (generador: GeneradorFormato) => void
  onConfirmar: (texto: string) => void
  onImprimir: () => void
}

export function GeneradorCard({
  generador,
  autorizado,
  onGenerar,
  onPreview,
  onConfirmar,
  onImprimir,
}: GeneradorCardProps) {
  return (
    <article className='flex h-full min-w-0 flex-col gap-3 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-5 shadow-[var(--shadow-sm)]'>
      <div className='flex items-start justify-between gap-2'>
        <span className='text-[10px] font-bold tracking-widest text-[var(--sa-steel)] uppercase'>
          {generador.etiqueta}
        </span>
        <span className='shrink-0 rounded-full bg-[var(--sa-field)] px-2.5 py-0.5 text-[10.5px] font-bold text-[var(--sa-muted)]'>
          {generador.chip}
        </span>
      </div>

      <div className='flex items-start gap-3'>
        <span
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
            tonoIcono[generador.iconoTono]
          )}
        >
          <Icon name={generador.icono} size={22} color='currentColor' />
        </span>
        <h3 className='min-w-0 text-[20px] leading-snug font-bold'>{generador.titulo}</h3>
      </div>

      <p className='text-[14px] text-[var(--sa-muted)]'>{generador.descripcion}</p>

      {generador.id === 'concentrado' ? (
        <div className='rounded-xl bg-[var(--sa-box)] p-3'>
          <div className='grid grid-cols-1 gap-2 sm:grid-cols-3'>
            <div className='min-w-0'>
              <p className='text-[10px] font-bold tracking-widest text-[var(--sa-muted)] uppercase'>
                Estudiantes Activos
              </p>
              <p className='text-[13px] font-extrabold text-[var(--color-forest)]'>48 Casos</p>
            </div>
            <div className='min-w-0'>
              <p className='text-[10px] font-bold tracking-widest text-[var(--sa-muted)] uppercase'>
                Diagnóstico Clínico
              </p>
              <p className='text-[13px] font-bold'>TEA / TDAH / Sens.</p>
            </div>
            <div className='min-w-0'>
              <p className='text-[10px] font-bold tracking-widest text-[var(--sa-muted)] uppercase'>
                Afiliación Médica
              </p>
              <p className='text-[13px] font-bold'>100% Verificado</p>
            </div>
          </div>
        </div>
      ) : null}

      {generador.id === 'oficio' ? (
        <div className='rounded-xl bg-[var(--sa-box)] p-3'>
          <p className='text-[11px] font-bold text-[var(--sa-muted)]'>
            Instituciones con Convenio Directo:
          </p>
          <div className='mt-2 flex flex-wrap gap-2'>
            {instituciones.map((institucion) => (
              <span
                key={institucion}
                className='rounded-full bg-[var(--sa-card)] px-2.5 py-1 text-[11px] font-semibold text-[var(--color-text-primary)]'
              >
                {institucion}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {generador.id === 'carta' ? (
        <div className='flex items-start gap-2 rounded-xl bg-[var(--sa-box)] p-3'>
          <Icon name='gavel' size={18} color='var(--sa-coffee)' className='mt-0.5 shrink-0' />
          <p className='text-[12.5px] text-[var(--sa-muted)]'>
            Incluye cláusulas de protección de datos confidenciales y compromisos de asistencia a
            valoraciones periódicas.
          </p>
        </div>
      ) : null}

      {generador.id === 'ficha' ? (
        <div className='rounded-xl bg-[var(--sa-box)] p-3'>
          <div className='grid grid-cols-2 gap-2'>
            {ajustesDUA.map((item) => (
              <span key={item} className='inline-flex items-center gap-1.5 text-[12px] font-semibold'>
                <Icon name='check' size={14} color='var(--color-forest)' className='shrink-0' />
                <span className='min-w-0 break-words'>{item}</span>
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <div className='mt-auto flex flex-wrap gap-2 pt-1'>
        {generador.id === 'concentrado' ? (
          <>
            <BotonAccion
              variante='verde'
              icono='download'
              onClick={() => onGenerar('concentrado')}
              disabled={!autorizado}
            >
              Generar XLS/PDF Foliado
            </BotonAccion>
            <BotonAccion variante='gris' icono='eye' onClick={() => onPreview(generador)}>
              Vista Previa
            </BotonAccion>
            <BotonAccion
              variante='pizarra'
              icono='stamp'
              onClick={() => onConfirmar('el Sello Digital del documento')}
              disabled={!autorizado}
            >
              Sello Digital
            </BotonAccion>
          </>
        ) : null}

        {generador.id === 'oficio' ? (
          <BotonAccion
            variante='verde'
            icono='mail'
            ancho
            onClick={() => onGenerar('oficio')}
            disabled={!autorizado}
          >
            Redactar Nuevo Oficio de Canalización
          </BotonAccion>
        ) : null}

        {generador.id === 'carta' ? (
          <BotonAccion
            variante='cafe'
            icono='file-signature'
            ancho
            onClick={() => onConfirmar('la firma autógrafa de la carta compromiso')}
            disabled={!autorizado}
          >
            Generar Carta Foliada para Firma Presencial
          </BotonAccion>
        ) : null}

        {generador.id === 'ficha' ? (
          <>
            <BotonAccion variante='verde' icono='printer' onClick={onImprimir}>
              Imprimir Tarjetones por Grupo
            </BotonAccion>
            <BotonAccion
              variante='gris'
              icono='folder'
              onClick={() => onConfirmar('la generación del lote digital')}
            >
              Lote Digital
            </BotonAccion>
          </>
        ) : null}
      </div>
    </article>
  )
}
