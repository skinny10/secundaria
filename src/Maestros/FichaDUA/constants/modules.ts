import type { DuaModule } from '../types'

export const duaModules: DuaModule[] = [
  {
    id: 'entorno',
    label: 'MÓDULO 1',
    title: 'Entorno Físico y Sensorial',
    icon: 'ear-off',
    tone: 'menta',
    pautas: [
      {
        icon: 'map-pin',
        title: 'Ubicación prioritaria',
        description:
          'Primera fila lateral, alejada deliberadamente de ventanas directas y altavoces escolares para evitar sobreestimulación lumínica y acústica.',
      },
      {
        icon: 'bell',
        title: 'Aviso previo obligatorio',
        description:
          'Notificar con 5 minutos de antelación antes de timbres de cambio de clase, sirenas de simulacro o actividades ruidosas programadas.',
      },
      {
        icon: 'volume-x',
        title: 'Protectores de sonido autorizados',
        description:
          'Uso libre de audífonos de cancelación pasiva de ruido durante dinámicas en equipo o trabajo autónomo con murmullos en el salón.',
      },
    ],
    footer: {
      icon: 'shield',
      text: 'Verificado por Psicología Escolar · Sin restricciones de material',
    },
  },
  {
    id: 'instruccion',
    label: 'MÓDULO 2',
    title: 'Instrucción y Tareas',
    icon: 'list-checks',
    tone: 'sky',
    pautas: [
      {
        icon: 'list-ordered',
        title: 'Consignas por pasos breves',
        description:
          'Listas secuenciales de máximo 3 pasos numerados; verificar comprensión antes del inicio.',
      },
      {
        icon: 'presentation',
        title: 'Soporte visual en pizarra',
        description:
          'Palabras clave esenciales y el temporizador con tiempo restante explícito en la esquina superior derecha del pizarrón.',
      },
      {
        icon: 'file-text',
        title: 'Formatos de entrega flexibles',
        description:
          'Aceptar tareas en formato digital, audios explicativos o esquemas gráficos conceptuales en lugar de redacciones extensas manuales.',
      },
    ],
    footer: {
      icon: 'book-open',
      text: 'Alineado a criterios DUA: Representación múltiple de contenidos',
    },
  },
  {
    id: 'emocional',
    label: 'MÓDULO 3',
    title: 'Manejo Emocional y Crisis',
    icon: 'calm',
    tone: 'peach',
    pautas: [
      {
        icon: 'wind',
        title: 'Pausa sensorial de autorregulación',
        description:
          'Pase libre y permanente hacia biblioteca o gabinete psicológico ante señales de sobrecarga emocional sin necesidad de interrogatorio.',
      },
      {
        icon: 'users',
        title: 'Compañero tutor designado',
        description:
          'Asignado formalmente con Emiliano R. para coordinar traslados seguros en cambios de aula, laboratorios y áreas comunes de recreo.',
      },
      {
        icon: 'message-circle',
        title: 'Tono de voz y retroalimentación',
        description:
          'Comunicación pausada y neutra; prohibido estrictamente realizar llamados de atención en voz alta o en presencia directa del grupo.',
      },
    ],
    footer: {
      icon: 'heart',
      text: 'Protocolo de contención avalado por Dirección y SEE',
    },
  },
  {
    id: 'evaluaciones',
    label: 'MÓDULO 4',
    title: 'Evaluaciones y Exámenes',
    icon: 'file-text',
    tone: 'menta',
    pautas: [
      {
        icon: 'clock',
        title: 'Tiempo adicional reglamentario',
        description:
          'Concesión formal de +25% de tiempo en toda prueba escrita parcial o final para reducir niveles de ansiedad por procesamiento temporal.',
      },
      {
        icon: 'layout',
        title: 'Exámenes divididos en bloques',
        description:
          'Aplicación en dos secciones separadas por una pausa intermedia de 5 minutos de descanso visual y respiración guiada.',
      },
      {
        icon: 'help-circle',
        title: 'Claridad en reactivos',
        description:
          'Evitar oraciones con dobles negaciones o preguntas ambiguas con ironía; favorecer preguntas directas y opciones de respuesta visuales.',
      },
    ],
    footer: {
      icon: 'clipboard-check',
      text: 'Aprobado en Consejo Técnico Escolar · Válido para reportes oficiales',
    },
  },
]
