import type {
  AtencionSEE,
  BloqueInformativoData,
  EstatusExpediente,
  Estudiante,
  KpiId,
  OpcionFiltro,
} from '../types'
import { filtrosPadron } from './padronContent'

const bloqueAdecuaciones: BloqueInformativoData = {
  tipo: 'adecuaciones',
  titulo: 'ADECUACIONES CURRICULARES ACTIVAS:',
  texto:
    'Ubicación preferencial en primera fila frente al pizarrón, tiempos extendidos (25% adicional en exámenes escritos) y pausas sensoriales autorizadas.',
  chip: 'Actualizado hace 2 días',
}

const bloqueUrgente: BloqueInformativoData = {
  tipo: 'urgente',
  titulo: 'ATENCIÓN ADMINISTRATIVA URGENTE:',
  texto:
    'Faltan Acta de Nacimiento Certificada, Comprobante de Domicilio y Dictamen Clínico Actualizado de Neuropediatría para completar expediente oficial.',
  chip: 'Plazo límite: 5 días hábiles',
}

const bloqueProtocolo: BloqueInformativoData = {
  tipo: 'protocolo',
  titulo: 'PROTOCOLO PEDAGÓGICO ESPECIAL:',
  texto:
    'Material de lectura impreso en fuente de alta legibilidad (mínimo 16pt), evaluaciones orales prioritarias y soporte con lector de pantalla institucional.',
  chip: 'Validado por Docente Titular',
}

const estudiantesMuestra: Estudiante[] = [
  {
    id: 'est-881',
    matricula: 'NX-2024-881',
    curp: 'PEGL120514HDFRND02',
    nombre: 'Luis Andrés',
    apellidos: 'Peralta Grajales',
    grado: '2°',
    grupo: 'B',
    turno: 'Vespertino',
    edad: 12,
    tutor: { nombre: 'Carlos Peralta', parentesco: 'Padre' },
    documentos: { total: 15, validados: 15, pendientes: [] },
    estatusExpediente: 'completo',
    atencionSEE: 'dua',
    bloque: bloqueAdecuaciones,
  },
  {
    id: 'est-0312',
    matricula: 'NX-2024-0312',
    curp: 'MORR120921HDFRNT08',
    nombre: 'Mateo',
    apellidos: 'Morales Rivas',
    grado: '1°',
    grupo: 'B',
    turno: 'Matutino',
    edad: 12,
    tutor: { nombre: 'Elena Rivas', parentesco: 'Madre' },
    documentos: {
      total: 15,
      validados: 12,
      pendientes: [
        'Acta de Nacimiento Certificada',
        'Comprobante de Domicilio',
        'Dictamen Clínico Actualizado de Neuropediatría',
      ],
    },
    estatusExpediente: 'cotejo_pendiente',
    atencionSEE: 'en_atencion',
    bloque: bloqueUrgente,
  },
  {
    id: 'est-0199',
    matricula: 'NX-2024-0199',
    curp: 'MORE120118HDFLN04',
    nombre: 'Erik Mateo',
    apellidos: 'Molina Rodríguez',
    grado: '1°',
    grupo: 'K',
    turno: 'Vespertino',
    edad: 12,
    tutor: { nombre: 'Marcos Molina', parentesco: 'Padre' },
    documentos: { total: 15, validados: 15, pendientes: [] },
    estatusExpediente: 'validado',
    atencionSEE: 'usaer',
    bloque: bloqueProtocolo,
  },
]

const nombres = [
  'Diego',
  'Sofía',
  'Emiliano',
  'Regina',
  'Iker',
  'Camila',
  'Sebastián',
  'Valentina',
  'Leonardo',
  'Ximena',
  'Damián',
  'Renata',
  'Axel',
  'María José',
  'Bruno',
  'Fernanda',
  'Ángel',
  'Daniela',
  'Ian',
  'Victoria',
]

const apellidos = [
  'Hernández',
  'Vázquez',
  'Jiménez',
  'Montesinos',
  'González',
  'Molina',
  'Montejo',
  'Ocaña',
  'Zenteno',
  'Chacón',
  'Méndez',
  'Martínez',
  'Cabrera',
  'Florio',
  'Bautista',
  'Santiz',
  'Jiménez',
  'Clemente',
  'Ruiz',
  'Castellanos',
]

const tutores = [
  'Alejandra Ruiz',
  'Jorge Hernández',
  'Patricia Núñez',
  'Raúl Vázquez',
  'Diana López',
  'Sergio Torres',
  'Mónica Salazar',
  'Arturo Ríos',
]

const parentescos = ['Padre', 'Madre', 'Tutor legal']

const grupos = [
  { grado: '1°', grupo: 'A', turno: 'Matutino' },
  { grado: '1°', grupo: 'B', turno: 'Matutino' },
  { grado: '1°', grupo: 'K', turno: 'Vespertino' },
  { grado: '2°', grupo: 'A', turno: 'Matutino' },
  { grado: '2°', grupo: 'B', turno: 'Vespertino' },
  { grado: '3°', grupo: 'A', turno: 'Matutino' },
  { grado: '3°', grupo: 'B', turno: 'Vespertino' },
]

function crearCurp(indice: number): string {
  const letras = ['MORR', 'PEGL', 'HERN', 'VZQL', 'JIMG', 'MNTX', 'GONM', 'MOLR']
  const fecha = String(100101 + (indice * 37) % 89999).padStart(6, '0')
  const sexo = indice % 2 === 0 ? 'H' : 'M'
  const entidad = indice % 3 === 0 ? 'DF' : 'MC'
  const consonantes = ['RNT', 'GRJ', 'LZN', 'VZQ'][indice % 4]
  return `${letras[indice % letras.length]}${fecha}${sexo}${entidad}${consonantes}${String(
    (indice * 17) % 100
  ).padStart(2, '0')}`
}

function bloqueGenerado(
  estatus: EstatusExpediente,
  atencion: AtencionSEE,
  indice: number
): BloqueInformativoData {
  if (estatus === 'cotejo_pendiente') {
    return { ...bloqueUrgente, chip: `Plazo límite: ${2 + (indice % 5)} días hábiles` }
  }
  if (atencion === 'usaer' || atencion === 'en_atencion') {
    return {
      ...bloqueProtocolo,
      chip: indice % 2 === 0 ? 'Validado por Docente Titular' : 'Seguimiento SEE activo',
    }
  }
  return { ...bloqueAdecuaciones, chip: `Actualizado hace ${1 + (indice % 7)} días` }
}

function crearEstudiante(indice: number): Estudiante {
  const grupo = grupos[indice % grupos.length]
  const estatus: EstatusExpediente =
    indice < 5 ? 'cotejo_pendiente' : indice % 4 === 0 ? 'validado' : 'completo'
  const atencion: AtencionSEE =
    indice < 25 ? (['en_atencion', 'usaer', 'dua'] as const)[indice % 3] : 'ninguna'
  const nombre = `${nombres[indice % nombres.length]} ${
    nombres[(indice * 3 + 5) % nombres.length]
  }`
  const apellidosEstudiante = `${apellidos[(indice * 7) % apellidos.length]} ${
    apellidos[(indice * 11 + 3) % apellidos.length]
  }`
  const pendientes =
    estatus === 'cotejo_pendiente'
      ? [
          'Acta de Nacimiento Certificada',
          'Comprobante de Domicilio',
          'Dictamen Clínico Actualizado',
        ]
      : []

  return {
    id: `est-gen-${String(indice + 1).padStart(3, '0')}`,
    matricula: `NX-2024-${String(1000 + indice).padStart(4, '0')}`,
    curp: crearCurp(indice),
    nombre,
    apellidos: apellidosEstudiante,
    grado: grupo.grado,
    grupo: grupo.grupo,
    turno: grupo.turno,
    edad: 12 + (indice % 4),
    tutor: {
      nombre: tutores[indice % tutores.length],
      parentesco: parentescos[indice % parentescos.length],
    },
    documentos: {
      total: 15,
      validados: estatus === 'cotejo_pendiente' ? 12 : 15,
      pendientes,
    },
    estatusExpediente: estatus,
    atencionSEE: atencion,
    bloque: bloqueGenerado(estatus, atencion, indice),
  }
}

const estudiantesGenerados = Array.from({ length: 339 }, (_, indice) =>
  crearEstudiante(indice)
)

export const estudiantes: Estudiante[] = [...estudiantesMuestra, ...estudiantesGenerados]

export const totalPadron = estudiantes.length

export function claveGrupo(estudiante: Estudiante): string {
  return `${estudiante.grado} ${estudiante.grupo} ${estudiante.turno}`
}

export const opcionesGrado: OpcionFiltro[] = [
  { value: '', label: filtrosPadron.gradoTodos },
  ...grupos.map((grupo) => {
    const value = `${grupo.grado} ${grupo.grupo} ${grupo.turno}`
    return { value, label: value }
  }),
]

export function calcularKpis(datos: Estudiante[]): Record<KpiId, number> {
  return {
    total: datos.length,
    nee: datos.filter((estudiante) => estudiante.atencionSEE !== 'ninguna').length,
    pendientes: datos.filter(
      (estudiante) => estudiante.estatusExpediente === 'cotejo_pendiente'
    ).length,
  }
}

export function nombreCompleto(estudiante: Estudiante): string {
  return `${estudiante.nombre} ${estudiante.apellidos}`
}
