import type { BitacoraAlumno } from '../types'

export const alumnoBitacora: BitacoraAlumno = {
  initials: 'LP',
  duaTag: 'DUA 2',
  chips: [
    { label: 'SECUNDARIA GENERAL', tone: 'sky' },
    { label: 'Matrícula: 2023-B-0842', tone: 'neutral' },
  ],
  name: 'Luis Andrés Peralta Grajales',
  grupo: '2° B · Turno Vespertino',
  stats: [
    { label: 'Intervenciones ciclo', value: '14 entradas' },
    { label: 'Estatus DUA', value: 'Activo & Vigente', check: true },
  ],
}
