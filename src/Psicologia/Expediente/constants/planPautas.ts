import type { IconName } from '../../../utils/types'

export interface AjustePauta {
  titulo: string
  descripcion: string
}

export interface AsignaturaPauta {
  nombre: string
  icono: IconName
  nivel: string
  tonoNivel: 'menta' | 'azul' | 'gris'
  ajustes: AjustePauta[]
}

export interface PrincipioDUA {
  id: string
  numero: string
  titulo: string
  icono: IconName
  descripcion: string
}

export interface CriterioEvaluacion {
  id: string
  titulo: string
  descripcion: string
}

export interface PlanPautas {
  vigencia: string
  gradoGrupo: string
  principios: PrincipioDUA[]
  asignaturas: AsignaturaPauta[]
  criterios: CriterioEvaluacion[]
}

export const planPautas: PlanPautas = {
  vigencia: 'Vigente al 2do Trimestre',
  gradoGrupo: 'Grado 1° B Secundaria',
  principios: [
    {
      id: 'representacion',
      numero: '1',
      titulo: 'Representación',
      icono: 'eye',
      descripcion:
        'Formatos visuales y textos estructurados con apoyos gráficos antes de consignas auditivas complejas.',
    },
    {
      id: 'accion',
      numero: '2',
      titulo: 'Acción y Expresión',
      icono: 'pen',
      descripcion:
        'Uso de organizadores visuales, esquemas, mapas conceptuales y respuesta oral alternativa a exámenes extensos.',
    },
    {
      id: 'implicacion',
      numero: '3',
      titulo: 'Implicación',
      icono: 'brain',
      descripcion:
        'Anticipación de cambios en actividades y retroalimentación individual sin señalamiento grupal.',
    },
  ],
  asignaturas: [
    {
      nombre: 'Lengua Materna / Español',
      icono: 'book-open',
      nivel: 'Nivel de Ajuste: Medio',
      tonoNivel: 'menta',
      ajustes: [
        {
          titulo: 'Segmentación de lecturas:',
          descripcion:
            'Dividir textos extensos en secuencias de 15 minutos con comprobación visual de comprensión.',
        },
        {
          titulo: 'Exposiciones orales:',
          descripcion:
            'Opción de presentar grabaciones previas o exposición en grupos reducidos para reducir ansiedad acústica.',
        },
        {
          titulo: 'Rúbricas descriptivas:',
          descripcion:
            'Proporcionar rúbricas visuales claras desde el inicio del proyecto sin ambigüedades.',
        },
      ],
    },
    {
      nombre: 'Matemáticas',
      icono: 'calculator',
      nivel: 'Nivel de Ajuste: Alto',
      tonoNivel: 'azul',
      ajustes: [
        {
          titulo: 'Paso a paso explícito:',
          descripcion:
            'Plantillas visuales para resolución de algoritmos y secuencias lógicas de problemas.',
        },
        {
          titulo: 'Reducción de estímulos:',
          descripcion:
            'Evaluaciones con máximo 3 problemas por página con espaciado amplio y sin elementos distractores.',
        },
        {
          titulo: 'Tiempo adicional:',
          descripcion:
            'Concesión de 25% de tiempo extra para pruebas analíticas escritas en aula de apoyo.',
        },
      ],
    },
    {
      nombre: 'Ciencias (Biología y Laboratorio)',
      icono: 'book-open',
      nivel: 'Nivel de Ajuste: Prioritario',
      tonoNivel: 'menta',
      ajustes: [
        {
          titulo: 'Uso de protectores auditivos:',
          descripcion:
            'Autorización permanente de audífonos de cancelación pasiva en prácticas con ruido o timbres.',
        },
        {
          titulo: 'Asignación de compañero tutor:',
          descripcion:
            'Trabajo en equipo de 2 personas con rol definido para evitar sobrecarga sensorial.',
        },
        {
          titulo: 'Anticipación de olores/materiales:',
          descripcion:
            'Notificación previa antes de usar químicos aromáticos o preparados biológicos.',
        },
      ],
    },
    {
      nombre: 'Educación Física y Deportes',
      icono: 'users',
      nivel: 'Nivel de Ajuste: Preventivo',
      tonoNivel: 'gris',
      ajustes: [
        {
          titulo: 'Sustitución de silbato:',
          descripcion:
            'Empleo de banderines visuales en lugar de silbatos de alta frecuencia en el patio.',
        },
        {
          titulo: 'Zona de pausa autónoma:',
          descripcion:
            'Espacio delimitado con sombra donde Mateo puede retirarse si experimenta fatiga sensorial.',
        },
      ],
    },
  ],
  criterios: [
    {
      id: 'continua',
      titulo: 'Evaluación Continua Formativa',
      descripcion:
        'La ponderación de tareas y proyectos continuos tendrá un peso del 70%, reduciendo el examen final al 30%.',
    },
    {
      id: 'pausas',
      titulo: 'Pausas Activas Programadas',
      descripcion:
        'Mateo puede solicitar una pausa de 5 minutos cada 40 minutos de prueba sin penalización ni merma de tiempo.',
    },
  ],
}
