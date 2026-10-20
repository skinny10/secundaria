import type { FichaAlumno } from '../types'

export const alumnoFicha: FichaAlumno = {
  initials: 'LP',
  name: 'Luis Andrés Peralta Grajales',
  expediente: 'Expediente Activo',
  matricula: 'NX-2024-881',
  grupo: '2° B Vespertino',
  edad: '12 años cumplidos',
  priority: {
    label: 'PRIORIDAD EN AULA',
    value: 'Sensibilidad Auditiva Alta',
  },
  diagnostic: {
    icon: 'clipboard-check',
    label: 'DIAGNÓSTICO CLÍNICO OFICIAL (GABINETE SEE)',
    value: 'TEA Grado 1',
    detail: '(Nivel de Apoyo 2 en Comunicación Pragmática y Regulación Sensorial)',
  },
  psychologist: {
    icon: 'heart',
    label: 'PSICÓLOGA TITULAR ASIGNADA',
    name: 'Dra. Claudia Méndez · Gabinete SEE',
    call: { label: 'Llamar a Ext. 104', icon: 'phone' },
    message: { label: 'Enviar Mensaje SEE', icon: 'message-circle' },
  },
}
