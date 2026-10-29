export const rolesColaborador = [
  { id: 'maestro' as const, titulo: 'Maestro / Docente', desc: 'Pedagogía de Aula', permisos: ['Asistencia', 'Bitácora de Aula', 'Pautas DUA'], icon: 'graduation-cap' },
  { id: 'prefecto' as const, titulo: 'Prefecto de Convivencia', desc: 'Espacios Comunes', permisos: ['QR Sensorial', 'Pasillos y Patios', 'Incidencias'], icon: 'shield' },
  { id: 'psicologo' as const, titulo: 'Psicólogo Clínico / SEE', desc: 'Educación Especial', permisos: ['Expediente 15 Docs', 'Dictamen DUA', 'Evaluación PEI'], icon: 'brain' },
  { id: 'servicios' as const, titulo: 'Servicios Académicos', desc: 'Control y Admisión', permisos: ['Admisión', 'Cotejo Documental', 'Transferencia SEE'], icon: 'clipboard' },
]

export type RolColaborador = 'maestro' | 'prefecto' | 'psicologo' | 'servicios' | ''
