export interface EventoAuditoria {
  id: string
  folio: string
  fechaRelativa: string
  fechaAbsoluta: string
  fechaUTC: string
  actor: { tipo: 'usuario' | 'externo'; nombre: string; empleadoId?: string; rol?: string; rolId?: string }
  accion: string
  modulo: string
  objeto: { titulo: string; detalle: string }
  severidad: 'info' | 'media' | 'alta' | 'critica'
  resultado: 'exito' | 'bloqueado' | 'fallido'
  hash: string
  hashPrevio: string
  ip?: string
}

export const eventos: EventoAuditoria[] = [
  {
    id: 'e1',
    folio: 'AUD-0001',
    fechaRelativa: 'Hoy, 09:42 hrs',
    fechaAbsoluta: '12 Oct 2024 · 09:42:18 UTC-6',
    fechaUTC: '2024-10-12T15:42:18Z',
    actor: { tipo: 'usuario', nombre: 'Dra. Claudia Méndez Flores', empleadoId: 'EMP-8491', rol: 'Psicología SEE', rolId: 'psicologia' },
    accion: 'Consulta y Actualización de Dictamen DUA',
    modulo: 'Expediente Clínico Confidencial',
    objeto: { titulo: 'Expediente: EXP-2024-084-BC', detalle: 'M. G. M. (1° B Secundaria)' },
    severidad: 'info',
    resultado: 'exito',
    hash: '9f3a8b...e42c',
    hashPrevio: '7c2e91...ab76',
  },
  {
    id: 'e2',
    folio: 'AUD-0002',
    fechaRelativa: 'Hoy, 09:15 hrs',
    fechaAbsoluta: '12 Oct 2024 · 09:15:02 UTC-6',
    fechaUTC: '2024-10-12T15:15:02Z',
    actor: { tipo: 'usuario', nombre: 'Lic. Mariana Salazar C.', empleadoId: 'EMP-7719', rol: 'Servicios Académicos', rolId: 'servicios' },
    accion: 'Cotejo y Carga de Certificado de Primaria',
    modulo: 'Alta y Cotejo Documental',
    objeto: { titulo: 'Alumno: M. G. M.', detalle: 'Folio Certificado 2910' },
    severidad: 'info',
    resultado: 'exito',
    hash: 'b82d61...7f9a',
    hashPrevio: '9f3a8b...e42c',
  },
  {
    id: 'e3',
    folio: 'AUD-0003',
    fechaRelativa: 'Hoy, 08:30 hrs',
    fechaAbsoluta: '12 Oct 2024 · 08:30:44 UTC-6',
    fechaUTC: '2024-10-12T14:30:44Z',
    actor: { tipo: 'usuario', nombre: 'Prof. Roberto Lozano Santos', empleadoId: 'EMP-5120', rol: 'Maestro de Química', rolId: 'docente' },
    accion: 'Registro de Observación de Aula',
    modulo: 'Bitácora de Aula',
    objeto: { titulo: 'Bitácora de Aula · Grupo 1° B', detalle: 'Adaptación de Entorno Acústico' },
    severidad: 'info',
    resultado: 'exito',
    hash: 'a61c7f...902d',
    hashPrevio: 'b82d61...7f9a',
  },
  {
    id: 'e4',
    folio: 'AUD-0004',
    fechaRelativa: 'Hoy, 07:55 hrs',
    fechaAbsoluta: '12 Oct 2024 · 07:55:10 UTC-6',
    fechaUTC: '2024-10-12T13:55:10Z',
    actor: { tipo: 'externo', nombre: 'IP Desconocida (187.190.45.12)', rol: 'Acceso Externo No Autorizado' },
    accion: 'Intento de Inicio de Sesión Fallido',
    modulo: 'Autenticación',
    objeto: { titulo: 'Cuenta: e.garza@nexusedu.org', detalle: '3 intentos cerrados consecutivos' },
    severidad: 'critica',
    resultado: 'bloqueado',
    hash: '8e92ab...41c7',
    hashPrevio: 'a61c7f...902d',
  },
  {
    id: 'e5',
    folio: 'AUD-0005',
    fechaRelativa: 'Ayer, 14:10 hrs',
    fechaAbsoluta: '11 Oct 2024 · 14:10:55 UTC-6',
    fechaUTC: '2024-10-11T20:10:55Z',
    actor: { tipo: 'usuario', nombre: 'Prof. Manuel Arismendi Solís', empleadoId: 'EMP-3044', rol: 'Prefectura', rolId: 'prefecto' },
    accion: 'Validación de Pase Sensorial QR en Pasillo',
    modulo: 'Pases Sensoriales QR',
    objeto: { titulo: 'Pase R-10 (Área de Calma)', detalle: 'Acompañamiento preventivo asistido' },
    severidad: 'info',
    resultado: 'exito',
    hash: 'c74d82...e61a',
    hashPrevio: '8e92ab...41c7',
  },
]
