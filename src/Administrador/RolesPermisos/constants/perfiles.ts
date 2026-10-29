export type RolKey = 'docente' | 'prefecto' | 'servicios' | 'psicologia' | 'administrador'

export interface Perfil {
  id: RolKey
  nombre: string
  icono: string
  nivel: string
  nivelColor: string
  usuarios: number
  descripcion: string
  pieChip: string
  pieIcono: string
}

export const perfiles: Perfil[] = [
  {
    id: 'docente',
    nombre: 'Maestro / Docente',
    icono: 'graduation-cap',
    nivel: 'Nivel 1 Básico',
    nivelColor: 'bg-[var(--sa-chip-gray)] text-[var(--sa-text)]',
    usuarios: 28,
    descripcion: 'Pase de lista regular, bitácora de aula e intervenciones grupales, consulta de pautas de adaptación curricular.',
    pieChip: 'Vista de Aula',
    pieIcono: 'book-open',
  },
  {
    id: 'psicologia',
    nombre: 'Psicología y SEE',
    icono: 'brain',
    nivel: 'Nivel 4 Clínico',
    nivelColor: 'bg-[color-mix(in_srgb,#F5B700_22%,transparent)] text-[var(--sa-text)]',
    usuarios: 6,
    descripcion: 'Edición total de expediente psicopedagógico (15 documentos), dictámenes DUA personalizados y pruebas psicométricas.',
    pieChip: 'Acceso 15 Docs',
    pieIcono: 'lock',
  },
  {
    id: 'prefecto',
    nombre: 'Prefectura Escolar',
    icono: 'shield',
    nivel: 'Nivel 2 Operativo',
    nivelColor: 'bg-[color-mix(in_srgb,#2C5A7A_18%,transparent)] text-[var(--sa-steel)]',
    usuarios: 8,
    descripcion: 'Monitoreo en patio y pasillos, validación por QR de pases de descanso sensorial, registro de incidencias.',
    pieChip: 'Lector QR Activo',
    pieIcono: 'scan-line',
  },
  {
    id: 'servicios',
    nombre: 'Servicios Académicos',
    icono: 'clipboard',
    nivel: 'Nivel 3 Control',
    nivelColor: 'bg-[var(--sa-chip-gray)] text-[var(--sa-text)]',
    usuarios: 6,
    descripcion: 'Alta y cotejo documental inicial de aspirantes, traspaso al equipo de psicología, emisión de boletas SEP.',
    pieChip: 'Cotejo SEP',
    pieIcono: 'file-check',
  },
]
