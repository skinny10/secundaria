export const bitacoraContent = {
  header: {
    eyebrow: 'Expediente de Acompañamiento Escolar',
    eyebrowIcon: 'book-open',
    title: 'Bitácora de Observaciones y Seguimiento Pedagógico',
    subtitle:
      'Registro compartido entre docentes de materias (Español, Química, Tecnología) y Gabinete de Psicología.',
    add: { label: 'Agregar Nueva Observación de Aula', icon: 'plus-circle' },
  },
  filters: {
    label: 'Filtrar historial por asignatura:',
  },
  summary: {
    value: 89,
    icon: 'trending-up',
    title: 'Índice de regulación favorable: 89% este mes',
    body: 'Basado en 9 intervenciones registradas. El alumno demuestra alta receptividad a las adaptaciones tempranas.',
    print: { label: 'Imprimir Bitácora', icon: 'printer' },
    share: { label: 'Compartir con Psicología', icon: 'share' },
  },
  infoBar: {
    icon: 'info',
    text: 'Las observaciones registradas son confidenciales y se sincronizan inmediatamente con el expediente del Servicio de Educación Especial (SEE).',
    sync: 'Última sincronización: Hoy a las 11:02',
    link: { label: 'Guía DUA Rápida', icon: 'external-link' },
  },
} as const
