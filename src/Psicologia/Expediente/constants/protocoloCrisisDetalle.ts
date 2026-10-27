import audifonos from '../assets/audifonos.svg'
import libreta from '../assets/libreta.svg'
import pelota from '../assets/pelota.svg'

export interface FragmentoTexto {
  texto: string
  negrita?: boolean
}

export interface NivelSemaforo {
  id: 'verde' | 'amarillo' | 'rojo'
  nivel: string
  titulo: string
  chip: string
  tono: 'menta' | 'cafe' | 'rosa'
  conductaEtiqueta: string
  conducta: string
  accionEtiqueta: string
  accion?: FragmentoTexto[]
  secuencia?: FragmentoTexto[][]
}

export interface ReglaPase {
  id: string
  titulo: string
  descripcion: string
  icono: 'shield-check' | 'map-pin' | 'clock'
}

export interface ObjetoRegulador {
  id: string
  nombre: string
  chip: string
  tono: 'menta' | 'azul' | 'cafe'
  descripcion: string
  uso: string
  imagen: string
}

export interface PasoNotificacion {
  id: string
  minutos: string
  titulo: string
  descripcion: string
}

export interface ContactoEmergencia {
  id: string
  iniciales: string
  nombre: string
  relacion: string
  celular?: string
  trabajo?: string
  arribo?: string
  prioridad: string
  tono: 'cafe' | 'gris'
}

export interface MetaRegulacion {
  id: string
  titulo: string
  porcentaje: number
  descripcion: string
}

export interface ProtocoloCrisisDetalle {
  semaforo: {
    titulo: string
    subtitulo: string
    chip: string
    niveles: NivelSemaforo[]
  }
  pase: {
    titulo: string
    subtitulo: string
    chip: string
    vigencia: string
    destino: string
    folioInicial: string
    distancia: string
    reglas: ReglaPase[]
  }
  objetos: {
    titulo: string
    subtitulo: string
    items: ObjetoRegulador[]
  }
  notificacion: {
    titulo: string
    subtitulo: string
    pasos: PasoNotificacion[]
    simulacionTitulo: string
    simulacionTexto: string
  }
  contactos: ContactoEmergencia[]
  metas: MetaRegulacion[]
  exitoLocal: {
    valor: number
    titulo: string
    detalle: string
  }
  cedula: {
    especialista: string
    cedula: string
    revision: string
    chip: string
    enlace: string
  }
}

export const protocoloCrisisDetalle: ProtocoloCrisisDetalle = {
  semaforo: {
    titulo: 'Semáforo de Desregulación Sensorial',
    subtitulo: 'Guía reactiva para docentes de aula regular y personal de prefectura',
    chip: 'Actualizado SEE: Nov 2024',
    niveles: [
      {
        id: 'verde',
        nivel: 'Nivel Verde',
        titulo: 'Estable / Regulación Óptima',
        chip: 'Estado Base',
        tono: 'menta',
        conductaEtiqueta: 'Conducta observada',
        conducta:
          'Concentrado en actividades pedagógicas, interacción normal con pares auxiliado de sus audífonos atenuadores.',
        accionEtiqueta: 'Acción preventiva',
        accion: [
          {
            texto:
              'Mantener predictibilidad de las tareas. Permitir que use apuntes visuales y conservar libre acceso al estuche de relajación.',
          },
        ],
      },
      {
        id: 'amarillo',
        nivel: 'Nivel Amarillo',
        titulo: 'Pródromos / Alerta Temprana',
        chip: 'Intervención Temprana',
        tono: 'cafe',
        conductaEtiqueta: 'Conducta observada',
        conducta:
          'Aleteo rítmico de manos (stimming), balanceo postural anterior/posterior, tapa sus oídos con timbre de cambio de hora.',
        accionEtiqueta: 'Acción inmediata requerida',
        accion: [
          { texto: 'Ofrecer Pase Sensorial', negrita: true },
          {
            texto:
              ' al jardín de calma o cubículo sin cuestionamientos ni reproches verbales.',
          },
        ],
      },
      {
        id: 'rojo',
        nivel: 'Nivel Rojo',
        titulo: 'Desregulación / Crisis Aguda',
        chip: 'Protocolo SEE Crítico',
        tono: 'rosa',
        conductaEtiqueta: 'Signos críticos',
        conducta:
          'Mutismo selectivo temporal, llanto incontrolable, bloqueo motor y rechazo absoluto a la aproximación o contacto físico.',
        accionEtiqueta: 'Secuencia de protección',
        secuencia: [
          [
            { texto: 'NO tocar', negrita: true },
            { texto: ' al alumno bajo ninguna circunstancia.' },
          ],
          [{ texto: 'Retirar estímulos luminosos directos y apagar bocinas.' }],
          [{ texto: 'Hablar con tono grave, pausado y frases de menos de 4 palabras.' }],
        ],
      },
    ],
  },
  pase: {
    titulo: 'Protocolo de Pase Sensorial QR Inmediato',
    subtitulo:
      'Salvoconducto oficial de tránsito interno supervisado sin amonestación disciplinaria',
    chip: 'Normativa Art. 41 LGE',
    vigencia: 'Válido 2024-25',
    destino: 'Destino: Cubículo Psicología / Jardín',
    folioInicial: 'R-10',
    distancia: 'Distancia estimada: 65 metros',
    reglas: [
      {
        id: 'interrogatorio',
        titulo: 'Cero Interrogatorio:',
        descripcion:
          'Prefectos y personal de vigilancia deben escanear el gafete o corroborar visualmente el folio sin detener ni exigir explicaciones verbales al alumno.',
        icono: 'shield-check',
      },
      {
        id: 'ruta',
        titulo: 'Ruta Directa Despejada:',
        descripcion:
          'Edificio B → Pasillo Central arbolado → Cubículo de Psicología / Jardín de Calma (Distancia estimada: 65 metros).',
        icono: 'map-pin',
      },
      {
        id: 'tolerancia',
        titulo: 'Tolerancia Temporal:',
        descripcion:
          'Ventana de autorregulación de 15 a 25 minutos supervisada de forma no invasiva por la Dra. Claudia Méndez.',
        icono: 'clock',
      },
    ],
  },
  objetos: {
    titulo: 'Registro de Objetos Reguladores Autorizados',
    subtitulo: 'Herramientas avaladas para uso restringido dentro del aula escolar',
    items: [
      {
        id: 'audifonos',
        nombre: 'Audífonos Atenuadores',
        chip: '-28 dB',
        tono: 'menta',
        descripcion:
          'Reducción pasiva de decibeles. Permiten filtrar timbres y ruido ambiental sin aislar la voz de la profesora.',
        uso: 'Autorizado en Mochila / Cuello',
        imagen: audifonos,
      },
      {
        id: 'pelota',
        nombre: 'Pelota Texturizada',
        chip: 'Táctil',
        tono: 'azul',
        descripcion:
          'Silicona con relieve granular suave. Se utiliza debajo del pupitre para autorregulación propioceptiva durante exámenes.',
        uso: 'Libre uso en pupitre',
        imagen: pelota,
      },
      {
        id: 'libreta',
        nombre: 'Libreta Dibujo Libre',
        chip: 'Expresión',
        tono: 'cafe',
        descripcion:
          'Cuaderno sin rayas para canalizar ramificación visual y pausas cognitivas al finalizar bloques de trabajo extensos.',
        uso: 'Estuche personal',
        imagen: libreta,
      },
    ],
  },
  notificacion: {
    titulo: 'Procedimiento de Notificación y Bitácora SEE',
    subtitulo: 'Cadena secuencial de aviso conforme al protocolo escolar oficial',
    pasos: [
      {
        id: 'paso-1',
        minutos: 'Minuto 0 - 3',
        titulo: 'Alerta Docente Silenciosa',
        descripcion:
          'El profesor pulsa el botón de asistencia en tableta de aula sin alterar la clase. Prefectura recibe el aviso.',
      },
      {
        id: 'paso-2',
        minutos: 'Minuto 3 - 8',
        titulo: 'Recepción en Psicología',
        descripcion:
          'Mateo arriba al área de calma. Dra. Méndez registra el nivel en bitácora y aplica contención ambiental.',
      },
      {
        id: 'paso-3',
        minutos: '+ 25 Minutos',
        titulo: 'Llamada a Padre Tutor',
        descripcion:
          'Únicamente si la crisis escala a Nivel Rojo no reversible se procede a contactar a Roberto Morales F.',
      },
    ],
    simulacionTitulo: 'Simulación de Notificación Push Prefectura',
    simulacionTexto: 'Comprueba el canal instantáneo de comunicación con el personal de guardia',
  },
  contactos: [
    {
      id: 'roberto',
      iniciales: 'RM',
      nombre: 'Roberto Morales Fuentes',
      relacion: 'Padre y Tutor Legal',
      celular: '55 4192 8841',
      trabajo: '55 5200 3400 Ext. 214',
      arribo: 'Tiempo de arribo al plantel: ~18 minutos',
      prioridad: 'Prioridad 1',
      tono: 'cafe',
    },
    {
      id: 'elena',
      iniciales: 'EG',
      nombre: 'Elena Gómez',
      relacion: 'Madre',
      celular: '55 3302 9130',
      prioridad: 'Prioridad 2',
      tono: 'gris',
    },
  ],
  metas: [
    {
      id: 'prodromos',
      titulo: 'Auto-identificación de pródromos',
      porcentaje: 75,
      descripcion: 'Solicita el pase antes de llegar a sobrecarga auditiva en 3 de cada 4 incidentes.',
    },
    {
      id: 'transiciones',
      titulo: 'Permanencia en aula en transiciones',
      porcentaje: 68,
      descripcion: 'Logra permanecer con audífonos puestos durante el timbre de receso.',
    },
    {
      id: 'retorno',
      titulo: 'Retorno autónomo a clase',
      porcentaje: 85,
      descripcion: 'Reingresa de manera voluntaria tras 15 minutos en el jardín sensorial.',
    },
  ],
  exitoLocal: {
    valor: 82,
    titulo: 'Éxito Local',
    detalle: 'Desescaladas sin necesidad de llamada externa',
  },
  cedula: {
    especialista: 'Especialista Responsable: Dra. Claudia Méndez',
    cedula: 'Cédula Estatal SEE: PSI-SEE-78892-NL',
    revision: 'Última revisión presencial: 14 de Noviembre, 2024',
    chip: 'Dictamen Homologado',
    enlace: 'Ver Acta de Sesión',
  },
}
