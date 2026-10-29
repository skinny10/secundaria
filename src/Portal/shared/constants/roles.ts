import type { RoleConfig, RoleKey } from '../types'

export const roles: Record<RoleKey, RoleConfig> = {
  administrador: {
    key: 'administrador',
    portal: 'INCLUSIÓN ESCOLAR',
    bannerRol: 'ADMINISTRADOR DEL SISTEMA',
    bannerIcon: 'shield',
    bannerToken: '--role-banner-bg',
    system: 'Sistema Oficial SEP',
    sidebarLabel: 'ADMINISTRACIÓN',
    sidebarAria: 'Menú de Administración del Sistema',
    searchPlaceholder: 'Buscar usuario, rol o correo…',
    homeKey: 'directorio',
    user: {
      name: 'Lic. Roberto Tovilla Ruiz',
      role: 'Director / Administrador General',
      initials: 'RT',
    },
    navItems: [
      {
        key: 'directorio',
        label: 'Directorio de Personal y Cuentas',
        icon: 'users',
        hash: '#administrador/directorio',
      },
      {
        key: 'roles',
        label: 'Roles y Permisos',
        icon: 'shield-check',
        hash: '#administrador/roles',
      },
      {
        key: 'bitacora',
        label: 'Bitácora de Accesos y Seguridad',
        icon: 'file-text',
        hash: '#administrador/bitacora',
      },
      {
        key: 'configuracion',
        label: 'Configuración de Plantel',
        icon: 'sliders',
        hash: '#administrador/configuracion',
      },
    ],
    footer: {
      type: 'norma',
      norma: 'Sesión Segura SSL',
      ciclo: '2024-2025',
    },
  },
  psicologia: {
    key: 'psicologia',
    portal: 'Psicología & SEE',
    bannerRol: 'Psicología (SEE)',
    bannerIcon: 'brain',
    bannerToken: '--see-banner',
    system: 'Sistema Oficial SEP',
    sidebarLabel: 'Módulos de atención',
    sidebarAria: 'Módulos de Psicología y SEE',
    searchPlaceholder: 'Buscar alumno por CURP, nombre o expediente',
    homeKey: 'dashboard',
    user: {
      name: 'Dra. Claudia Méndez',
      role: 'Psicóloga Clínica y SEE',
      initials: 'CM',
    },
    navItems: [
      { key: 'dashboard', label: 'Dashboard / Métricas', icon: 'grid', hash: '#dashboard' },
      {
        key: 'concentrado',
        label: 'Concentrado Semestral SEE',
        icon: 'trending-up',
        hash: '#concentrado',
      },
      {
        key: 'canalizaciones',
        label: 'Registro de Canalizaciones',
        icon: 'clipboard',
        hash: '#canalizaciones',
      },
      {
        key: 'expedientes',
        label: 'Control de Expedientes (15 Docs)',
        icon: 'folder',
        hash: '#expediente',
      },
      { key: 'reportes', label: 'Reportes Oficiales', icon: 'file-text', hash: '#reportes' },
    ],
    footer: { type: 'norma', norma: 'Norma SEP / SEE', ciclo: '2024-2025' },
  },
  servicios_academicos: {
    key: 'servicios_academicos',
    portal: 'SERVICIOS ACADÉMICOS',
    bannerRol: 'SERVICIOS ACADÉMICOS',
    bannerIcon: 'graduation-cap',
    bannerToken: '--role-banner-bg',
    system: 'Sistema Oficial Estatal',
    sidebarLabel: 'MENÚ ADMINISTRATIVO',
    sidebarAria: 'Menú administrativo de Servicios Académicos',
    searchPlaceholder: 'Buscar…',
    homeKey: 'padron',
    user: {
      name: 'Lic. Roberto Morales',
      role: 'Servicios Escolares y Admisión',
      initials: 'RM',
    },
    navItems: [
      {
        key: 'padron',
        label: 'Padrón General',
        icon: 'users',
        hash: '#servicios-academicos/padron',
      },
      {
        key: 'alta',
        label: 'Alta de Estudiante',
        icon: 'plus-circle',
        hash: '#servicios-academicos/alta',
      },
      {
        key: 'cotejo',
        label: 'Cotejo y Documentación',
        icon: 'clipboard-check',
        hash: '#servicios-academicos/cotejo',
      },
      {
        key: 'transferencias',
        label: 'Transferencias SEE',
        icon: 'share',
        hash: '#servicios-academicos/transferencias',
      },
    ],
    footer: {
      type: 'ayuda',
      title: 'Mesa de Ayuda SEE',
      text: 'Soporte técnico extensión 142',
    },
  },
}

export function obtenerRol(key: RoleKey): RoleConfig {
  return roles[key]
}
