import type { IconName } from '../../../utils/types'
import type { PlantelConfig, SeccionConfigId } from '../types'

export const CONFIG_STORAGE_KEY = 'nexusedu:plantel-config'
export const CONFIG_EVENT = 'nexusedu:plantel-config'
export const AUDIT_STORAGE_KEY = 'nexusedu:auditoria-config'

export const ACTOR_ADMIN = 'Lic. Roberto Tovilla Ruiz'
export const CODIGO_DEMO_2FA = '246810'

export const secciones: { id: SeccionConfigId; label: string; icono: IconName; descripcion: string }[] = [
  { id: 'datos', label: 'Datos Oficiales y Sedes', icono: 'stamp', descripcion: 'Identidad legal, CCT y director responsable.' },
  { id: 'calendario', label: 'Calendario y Ciclos Escolares', icono: 'calendar', descripcion: 'Ciclo activo y periodos oficiales.' },
  { id: 'turnos', label: 'Turnos y Espacios Inclusivos', icono: 'clock', descripcion: 'Jornadas, recesos y espacios de regulación.' },
  { id: 'dua', label: 'Parámetros de Inclusión DUA', icono: 'sliders', descripcion: 'Capacidades de aula y protocolos de enlace.' },
]

export function configInicial(): PlantelConfig {
  return {
    version: 1,
    actualizadoPor: ACTOR_ADMIN,
    actualizadoEn: '2024-10-12T15:42:18.000Z',
    identidad: {
      nombre: 'Secundaria Técnica #14',
      cct: '02EES0045Z',
      cctValidacion: 'validada',
      entidad: 'Baja California',
      municipio: 'Tijuana',
      domicilio: 'Calle Emiliano Zapata 1420, Col. Centro, Baja California',
      telefono: '6641234567',
      correo: 'direccion@sec14.edu.mx',
      director: {
        nombre: 'Mtro. Roberto Tovilla Ruiz',
        correo: 'r.tovilla@sep.gob.mx',
        telefono: '6649876543',
        cedula: '1234567',
      },
    },
    ciclo: { activo: '2024-2025' },
    turnos: [
      {
        id: 'matutino',
        nombre: 'Turno Matutino',
        inicio: '07:30',
        fin: '13:40',
        moduloMin: 50,
        modulos: 6,
        recesos: [
          { id: 'matutino-r1', nombre: 'Receso 1', inicio: '10:20', duracionMin: 20 },
          { id: 'matutino-r2', nombre: 'Receso 2', inicio: '12:00', duracionMin: 10 },
        ],
        activo: true,
        asignaciones: 12,
      },
      {
        id: 'vespertino',
        nombre: 'Turno Vespertino',
        inicio: '14:00',
        fin: '19:10',
        moduloMin: 50,
        modulos: 5,
        recesos: [
          { id: 'vespertino-r1', nombre: 'Receso 1', inicio: '15:40', duracionMin: 10 },
          { id: 'vespertino-r2', nombre: 'Receso 2', inicio: '17:30', duracionMin: 10 },
        ],
        activo: true,
        asignaciones: 8,
      },
    ],
    intervalo: { pausaMin: 15, atenuadorActivo: true, db: 65 },
    capacidades: { cupoAula: 30, limiteDictamenGrupo: 3 },
    espacios: [
      { id: 'calma', nombre: 'Aula de Calma', tipo: 'Regulación sensorial', capacidad: 8, activo: true, pasesActivos: 3 },
      { id: 'espera', nombre: 'Sala de Espera Sensorial', tipo: 'Baja estimulación', capacidad: 6, activo: true, pasesActivos: 2 },
      { id: 'movimiento', nombre: 'Espacio de Movimiento', tipo: 'Descarga motriz', capacidad: 12, activo: true, pasesActivos: 0 },
      { id: 'cabina', nombre: 'Cabina de Autorregulación', tipo: 'Acompañamiento individual', capacidad: 4, activo: false, pasesActivos: 0 },
    ],
    protocolos: {
      slaUrgenteMin: 15,
      slaPrioritariaHoras: 48,
      slaOrdinariaDiasHabiles: 15,
      paseSensorialMin: 20,
      paseToleranciaMin: 15,
    },
    seguridad: { cifrado: true, reautenticacion2FA: true, retencionDias: 1825 },
  }
}

export const ciclosDisponibles = ['2024-2025', '2025-2026'] as const
