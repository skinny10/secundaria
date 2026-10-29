export interface Colaborador {
  id: string
  nombre: string
  rol: string
  departamento: string
  correo: string
  ultimoAcceso: string
  estado: 'Activo' | 'Bloqueado'
  turno: 'Matutino' | 'Vespertino' | 'Completo'
}

export const colaboradores: Colaborador[] = [
  { id: '1', nombre: 'Lic. Ana María López Ramírez', rol: 'Maestro / Docente', departamento: 'Español', correo: 'alopez@colegionorte.edu.mx', ultimoAcceso: '2025-10-28 08:24', estado: 'Activo', turno: 'Matutino' },
  { id: '2', nombre: 'Mtra. Claudia Ruiz Méndez', rol: 'Psicólogo Clínico / SEE', departamento: 'Gabinete SEE', correo: 'cruiz@colegionorte.edu.mx', ultimoAcceso: '2025-10-28 07:56', estado: 'Activo', turno: 'Matutino' },
  { id: '3', nombre: 'Prof. Javier Ortiz Salinas', rol: 'Prefecto de Convivencia', departamento: 'Prefectura', correo: 'jortiz@colegionorte.edu.mx', ultimoAcceso: '2025-10-27 16:12', estado: 'Bloqueado', turno: 'Completo' },
  { id: '4', nombre: 'Lic. Verónica Castro Núñez', rol: 'Servicios Académicos', departamento: 'Control Escolar', correo: 'vcastro@colegionorte.edu.mx', ultimoAcceso: '2025-10-28 09:02', estado: 'Activo', turno: 'Matutino' },
]
