import type {
  AlumnoExpediente,
  FirmaExpediente,
  GrupoMaterias,
  IndicadorAvance,
  ContactoIntervencion,
  MetaPEI,
  MigasExpediente,
  PestanaSeccion,
  ProtocoloCrisis,
  ValidacionJuridica,
} from '../types'

export const rolPsicologia = 'Psicología (SEE)'

export const vistaExpediente = 'Valoración Psicopedagógica y Plan DUA'

export const migas: MigasExpediente[] = [
  { texto: 'Psicología' },
  { texto: 'Canalizaciones' },
  { texto: 'Exp. #2024-B084' },
  { texto: 'Valoración y Plan DUA', activo: true },
]

export const validacion: ValidacionJuridica = {
  vigente: 'Validación Jurídica SEP / Art. 41 LGE Vigente',
  emitido: 'Dictamen Emitido · SEE-2024-E019',
}

export const pestanas: PestanaSeccion[] = [
  { id: 'A', etiqueta: '1. Diagnóstico y Barreras (BAP)', icono: 'brain' },
  { id: 'B', etiqueta: '2. Pautas y Ajustes DUA Aula', icono: 'list-checks' },
  { id: 'C', etiqueta: '3. Protocolo Crisis Sensorial', icono: 'walk' },
  { id: 'D', etiqueta: '4. Acuerdos y Firmas Legales', icono: 'file-signature' },
]

export const alumno: AlumnoExpediente = {
  nombre: 'Mateo Gómez Morales',
  iniciales: 'MG',
  grado: '1° B Secundaria',
  matricula: 'Matrícula: 2024-B084',
  folio: 'Folio SEE: #2024-EXP-019',
  diagnostico: 'TEA Grado 1 (Hipersensibilidad Acústica y Rigidez Cognitiva)',
  diagnosticoCorto: 'TEA Grado 1',
  curp: 'GOMM110508HCSMRNA',
  ciclo: 'Ciclo Escolar: 2024 - 2025',
  expediente: 'EXP-SEE-2024-084-BC',
  responsable: 'Resp.: Dra. Claudia Méndez Ortiz',
  estado: 'EN INTERVENCIÓN ACTIVA',
}

export const gruposMaterias: GrupoMaterias[] = [
  {
    id: 'matematicas',
    titulo: 'Matemáticas, Física y Biología',
    principio: 'Principio DUA: Múltiples formas de representación',
    icono: 'calculator',
    ajustes: [
      {
        etiqueta: 'Tiempo y Estructura',
        titulo: 'Tiempo Adicional del 25% en Exámenes',
        descripcion:
          'Otorgar holgura de 15 a 20 minutos adicionales en pruebas sumativas. Permitir resolución en pupitre lateral con menor tránsito.',
      },
      {
        etiqueta: 'Andamiaje Cognitivo',
        titulo: 'Uso Autorizado de Formularios y Esquemas Visuales',
        descripcion:
          'Facilitar diagramas de flujo paso a paso de fórmulas y algoritmos numéricos para reducir la sobrecarga en memoria operativa.',
      },
    ],
  },
  {
    id: 'espanol',
    titulo: 'Español, Formación Cívica e Historia',
    principio: 'Principio DUA: Múltiples formas de acción y expresión',
    icono: 'book-open',
    ajustes: [
      {
        etiqueta: 'Expresión Oral Adaptada',
        titulo: 'No Obligar a Exposiciones Grupales Plenarias',
        descripcion:
          'Sustituir exposición magistral frente al aula completa por presentación grabada previamente en video, o sustentación individual ante el docente asesor.',
      },
      {
        etiqueta: 'Formatos Flexibles',
        titulo: 'Entrega en Mapas Mentales o Respuestas Grabadas',
        descripcion:
          'Permitir esquemas gráficos jerarquizados o notas de voz estructuradas en lugar de redacciones continuas de alta densidad motriz.',
      },
    ],
  },
  {
    id: 'educacion-fisica',
    titulo: 'Educación Física, Artes y Talleres Tecnológicos',
    principio: 'Principio DUA: Múltiples formas de implicación',
    icono: 'users',
    ajustes: [
      {
        etiqueta: 'Amortiguación Acústica',
        titulo: 'Uso Permanente de Orejeras de Atenuación',
        descripcion:
          'Autorización total para el uso directo de protectores tipo concha (~25dB) dentro de canchas techadas con alta reverberación y eco continuo.',
      },
      {
        etiqueta: 'Ubicación Espacial',
        titulo: 'Ubicación en Zona Perimetral y Salida Anticipada',
        descripcion:
          'Posicionarlo en extremos laterales con acceso expedito a zonas abiertas; permitir retirarse 3 minutos antes al vestidor para eludir tumultos.',
      },
    ],
  },
]

export const protocoloCrisis: ProtocoloCrisis[] = [
  {
    id: 'pase-sensorial',
    tipo: 'pase',
    titulo: 'Pase Sensorial Escolar de Libre Tránsito',
    instrumento: 'Instrumento Vinculante',
    duracion: '15 Minutos',
    parrafo: [
      {
        texto:
          'El alumno porta un cordón distintivo con carnet sellado por Psicología. En caso de sobrecarga, puede retirarse hacia el ',
      },
      { texto: 'Rincón de Calma (CUB-03)', bold: true },
      {
        texto:
          ' o la biblioteca sin que profesores o maestros cuestionen ni apliquen sanciones de disciplina.',
      },
    ],
    espacio: [
      {
        texto:
          'Espacio regulador: Sillón ergonómico, luz cálida 2700K y kit de textura táctil ambiental.',
      },
    ],
  },
  {
    id: 'semaforo-dua',
    tipo: 'estrategia',
    etiqueta: 'Estrategia en Pupitre',
    titulo: 'Señal de Desescalada No-Verbal (Semáforo DUA)',
    parrafo: [
      {
        texto:
          'Mateo cuenta con dos fichas acrílicas adheridas magnéticamente a su banco. Sirven para alertar al docente de su estado emocional sin exponerlo a la mirada de sus compañeros:',
      },
    ],
    fichas: [
      {
        color: 'var(--sa-green)',
        titulo: 'Ficha Verde Visible:',
        texto: '"Estoy bien, trabajando en mi ritmo."',
      },
      {
        color: 'var(--sa-coffee)',
        titulo: 'Ficha Ámbar Visible:',
        texto: '"Saturado. Necesito silencio o usaré audífonos."',
      },
    ],
    nota:
      '* El docente NO debe cuestionar públicamente el uso de la ficha ámbar; simplemente validar el uso de audífonos.',
  },
]

export const firmasIniciales: FirmaExpediente[] = [
  {
    id: 'especialista',
    rol: 'Especialista Dictaminador',
    autenticacion: 'Firmado Digitalmente',
    nombre: 'Dra. Claudia Méndez',
    cargo: 'Psicóloga Clínica y SEE',
    credencial: 'Cédula Prof. 8492041',
    fecha: '24 Oct 2024 · 10:15 hrs',
    token: 'Cert: 00001000000500…',
    firmado: true,
    trazo: 'claudia',
  },
  {
    id: 'tutor-legal',
    rol: 'Tutor Legal / Padre',
    autenticacion: 'Firma Registrada en App',
    nombre: 'Roberto Morales Flores',
    cargo: 'Padre y Representante Legal',
    credencial: 'INE: IDMEX1849201944',
    fecha: '24 Oct 2024 · 11:42 hrs',
    token: 'Token: BIOM-AUTH-592…',
    firmado: true,
    trazo: 'roberto',
  },
  {
    id: 'autoridad-escolar',
    rol: 'Autoridad Escolar',
    autenticacion: 'Sello Oficial Plantel / Visto Bueno Autorizado',
    nombre: 'Mtro. Roberto Tovilla Ruiz',
    cargo: 'Director del Plantel Escolar',
    credencial: 'Clave CCT: 02EES0045Z',
    fecha: '24 Oct 2024 · 13:05 hrs',
    token: 'Folio Sello: CCT-02-…',
    firmado: true,
    trazo: 'tovilla',
  },
]

export const contactos: ContactoIntervencion[] = [
  {
    id: 'roberto',
    nombre: 'Roberto Morales F.',
    relacion: 'Padre · Cel: 55-4819-0291',
    telefono: '55-4819-0291',
  },
  {
    id: 'sofia',
    nombre: 'Sofía Rivas Tamayo',
    relacion: 'Madre · Cel: 55-1928-3714',
    telefono: '55-1928-3714',
  },
  {
    id: 'mariana',
    nombre: 'Lic. Mariana Hinojosa',
    relacion: 'Terapeuta Ocupacional',
    documento: true,
  },
]

export const metasPEI: MetaPEI[] = [
  {
    id: 'meta-1',
    titulo: 'Meta 1: Comunicación',
    estado: 'En Progreso',
    tono: 'cafe',
    descripcion:
      'Lograr que el alumno solicite el uso de audífonos o salida al rincón de calma de forma proactiva en un 60% de ocasiones.',
  },
  {
    id: 'meta-2',
    titulo: 'Meta 2: Trabajo Dual',
    estado: 'Iniciado',
    tono: 'pizarra',
    descripcion:
      'Integración colaborativa con un compañero afín elegido ("Pareja Tutor") para talleres de laboratorio escolar.',
  },
  {
    id: 'meta-3',
    titulo: 'Meta 3: Cierre de Evaluaciones',
    estado: 'Lograda (50%)',
    tono: 'menta',
    descripcion:
      'Completar el 100% de exámenes parciales haciendo uso del 25% de tiempo adicional acordado.',
  },
]

export const indicadoresAvance: IndicadorAvance[] = [
  { id: 'asistencia', label: 'Asistencia', valor: 88, color: 'var(--color-forest)' },
  { id: 'dua-aula', label: 'DUA Aula', valor: 92, color: 'var(--sa-slate)' },
  { id: 'crisis-mes', label: 'Crisis/Mes', valor: 24, color: 'var(--sa-coffee)' },
  { id: 'tareas', label: 'Tareas', valor: 95, color: 'var(--sa-green)' },
]

export const tasaDesescalada = {
  etiqueta: 'Tasa de desescalada autónoma:',
  valor: '4 de 5 incidentes',
}

export const ultimaRevision = {
  titulo: 'Última Revisión Multidisciplinar',
  detalle: 'Consejo de Inclusión Escolar • 14/10/2024',
  accion: 'Ver Log',
}

export const cicloEscolar = 'Ciclo 2024-2025'

export const folioDictamen = 'SEE-2024-E019'
