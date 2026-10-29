import { KpiBitacora } from '../molecules/KpiBitacora'

export function BitacoraKpiGrid() {
  const items = [
    { titulo: 'FLUJO DE ACCESOS', subtitulo: 'Intentos Hoy', valor: '214 Exitosos', apoyo: '● 2 bloqueados preventivamente · 99.1% efectividad', icono: 'log-in' },
    { titulo: 'PRIVACIDAD MÉDICA', subtitulo: 'Expedientes Clínicos', valor: '38 Consultas DUA / SEE', apoyo: '✓ 100% con rol médico/psicólogo', icono: 'file-text' },
    { titulo: 'CARGA OPERATIVA', subtitulo: 'Sesiones Activas', valor: '19 Concurrencias', apoyo: 'Plantel Central | Latencia 14ms', icono: 'activity' },
    { titulo: 'GARANTÍA REGULATORIA', subtitulo: 'Cumplimiento Legal', valor: '100% Conforme', apoyo: 'Auditoría conforme a SEP, LGDNNA y normativas vigentes.', icono: 'check-circle', destacado: true },
  ]
  return (
    <div className='grid gap-5 sm:grid-cols-2 xl:grid-cols-4'>
      {items.map((k, i) => (
        <KpiBitacora key={i} {...k} />
      ))}
    </div>
  )
}
