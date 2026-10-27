import type { AlumnoConcentrado, ResumenEstrategia } from '../types'

export const escuelaInfo = {
  nombre: 'Escuela Secundaria Federal "Adolfo López Mateos"',
  cct: '07DES0047',
  zona: '014',
  sostenimiento: 'FEDERAL',
  turno: 'Vespertino',
  periodo: 'Ciclo Escolar 2024-2025 (1er Semestre)',
  direccion:
    'Dirección de Educación Básica y Departamento de Educación Especial (SEE)',
}

export const folioCedulaElectronico = 'CHI-SEE-2024-014-9981'

export const alumnosConcentrado: AlumnoConcentrado[] = [
  {
    id: 'a1',
    np: '01',
    nombre: 'Luis Andrés Peralta Grajales',
    expediente: 'EXP-2024-089',
    curp: 'PEGL110415HCSLR08',
    edadSexo: '13 años / M',
    grado: '1°',
    grupo: 'K',
    gradoGrupo: '1° K',
    diagnosticoClave: 'tea',
    diagnosticoLabel: 'TEA (Nivel 1 de Apoyo)',
    diagnosticoIcon: 'brain',
    diagnosticoTono: 'menta',
    servicioMedico: 'IMSS Régimen Ord.',
    especialista: 'Dra. Claudia Méndez',
    especialistaIcon: 'person',
  },
  {
    id: 'a2',
    np: '02',
    nombre: 'Erik Mateo Molina Rodríguez',
    expediente: 'EXP-2024-092',
    curp: 'MORE110920HCSLR02',
    edadSexo: '13 años / M',
    grado: '1°',
    grupo: 'K',
    gradoGrupo: '1° K',
    diagnosticoClave: 'tdah',
    diagnosticoLabel: 'TDAH Combinado',
    diagnosticoIcon: 'zap',
    diagnosticoTono: 'durazno',
    servicioMedico: 'ISSSTE Chiapas',
    especialista: 'Dra. Claudia Méndez',
    especialistaIcon: 'person',
  },
  {
    id: 'a3',
    np: '03',
    nombre: 'Eliezer Said Mancilla Reyes',
    expediente: 'EXP-2024-041',
    curp: 'MARE111204HCSLY05',
    edadSexo: '13 años / M',
    grado: '1°',
    grupo: 'H',
    gradoGrupo: '1° H',
    diagnosticoClave: 'auditiva',
    diagnosticoLabel: 'Discapacidad Auditiva Moderada',
    diagnosticoIcon: 'ear',
    diagnosticoTono: 'azul',
    servicioMedico: 'SSA / INSABI',
    especialista: 'Dra. Claudia Méndez',
    especialistaIcon: 'person',
  },
  {
    id: 'a4',
    np: '04',
    nombre: 'José Emilio García Mimiaga',
    expediente: 'EXP-2024-098',
    curp: 'GAMJ110618HCSMX03',
    edadSexo: '13 años / M',
    grado: '1°',
    grupo: 'K',
    gradoGrupo: '1° K',
    diagnosticoClave: 'tdah',
    diagnosticoLabel: 'TDAH Inatento / BAP',
    diagnosticoIcon: 'zap',
    diagnosticoTono: 'durazno',
    servicioMedico: 'ISSTECH Estatal',
    especialista: 'Dra. Claudia Méndez',
    especialistaIcon: 'person',
  },
  {
    id: 'a5',
    np: '05',
    nombre: 'Mateo Gómez Morales',
    expediente: 'EXP-2024-015',
    curp: 'GOMM110130HCSNL07',
    edadSexo: '13 años / M',
    grado: '1°',
    grupo: 'B',
    gradoGrupo: '1° B',
    diagnosticoClave: 'tea',
    diagnosticoLabel: 'TEA Grado 1 (Socio-comunicativa)',
    diagnosticoIcon: 'brain',
    diagnosticoTono: 'menta',
    servicioMedico: 'IMSS Bienestar',
    especialista: 'Dra. Claudia Méndez',
    especialistaIcon: 'person',
  },
]

export function getResumenEstrategias(alumnos: AlumnoConcentrado[]): ResumenEstrategia[] {
  const conteo = alumnos.reduce(
    (acc, alumno) => {
      acc[alumno.diagnosticoClave] += 1
      return acc
    },
    { tea: 0, tdah: 0, auditiva: 0 } as Record<'tea' | 'tdah' | 'auditiva', number>
  )

  return [
    {
      id: 'tea',
      titulo: 'Neurodivergencia TEA',
      clave: 'tea',
      chipLabel: `${conteo.tea} Alumno${conteo.tea === 1 ? '' : 's'}`,
      chipTono: 'menta',
      descripcion:
        'Estrategias DUA: Agendas visuales anticipadas, pausas sensoriales programadas y reducción de estímulos acústicos en talleres.',
      barraColor: '#22524A',
      total: conteo.tea,
    },
    {
      id: 'tdah',
      titulo: 'TDAH / BAP Atencional',
      clave: 'tdah',
      chipLabel: `${conteo.tdah} Alumno${conteo.tdah === 1 ? '' : 's'}`,
      chipTono: 'durazno',
      descripcion:
        'Estrategias DUA: Segmentación de instrucciones de examen en bloques de 15 min, monitoreo con tutor par y asientos preferenciales.',
      barraColor: '#7A4320',
      total: conteo.tdah,
    },
    {
      id: 'auditiva',
      titulo: 'Auditiva / Sensorial',
      clave: 'auditiva',
      chipLabel: `${conteo.auditiva} Alumno${conteo.auditiva === 1 ? '' : 's'}`,
      chipTono: 'azul',
      descripcion:
        'Estrategias DUA: Material escrito de apoyo, apoyo con subtitulaje en proyecciones y ubicación en primera fila frente al docente.',
      barraColor: '#4A6075',
      total: conteo.auditiva,
    },
  ]
}
