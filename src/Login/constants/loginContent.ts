export const loginContent = {
  topBar: {
    cycle: "Ciclo Escolar 2024-2025",
    zone: "Zona Escolar 14",
    plantelKey: "Plantel Clave: 15DES0042K",
    themeLight: "Modo Claro",
    themeDark: "Modo Oscuro",
    helpDesk: "Mesa de Ayuda Directa: Ext. 142",
  },
  loginCard: {
    platformLabel: "PLATAFORMA OFICIAL DE INCLUSIÓN",
    institutionName: 'Secundaria Federal "Adolfo López Mateos"',
    subsystem: "Subsistema de Educación Secundaria Técnica y General",
    heading: "Iniciar Sesión en NexusEdu",
    subtitle: "Portal unificado para Docentes, Psicología Escolar (SEE), Asesoría y Directivos.",
    email: {
      label: "Correo Institucional (@edomex.nuevaescuela.mx o @sep.gob.mx)",
      placeholder: "ejemplo.docente@sep.gob.mx",
      leadingIcon: "at",
      helperText: "Utilice exclusivamente su credencial digital autorizada por la plantilla directiva.",
      helperIcon: "shield",
    },
    password: {
      label: "Contraseña de Acceso",
      trailingTag: "ALTA SEGURIDAD",
      placeholder: "••••••••",
      leadingIcon: "lock",
    },
    remember: "Recordar sesión en este equipo institucional de trabajo",
    submit: "Ingresar al Portal NexusEdu",
    forgotPassword: "¿Olvidó su contraseña o requiere desbloqueo de cuenta?",
    notices: [
      {
        tone: "policy" as const,
        icon: "info",
        title: "Política Estricta de Gestión de Usuarios",
        body: "Acceso dado de alta exclusivamente por la Administración Escolar; no se admiten registros externos.",
      },
      {
        tone: "privacy" as const,
        icon: "shield",
        title: "Protección y Confidencialidad",
        body: "LGDNNA, resguardo de diagnósticos neurodivergentes de alumnos menores de edad.",
      },
    ],
  },
  sidePanel: {
    statusBadge: {
      label: "RED ESCOLAR DE INCLUSIÓN ACTIVA",
      dotColor: "#3F7A63",
    },
    heroImageAlt: "Bienvenido a NexusEdu",
    heroImageAltStudents: "Foto de estudiantes en una marcha inclusiva",
    inclusionQuote: {
      title: "ACOMPAÑAMIENTO INTERDISCIPLINARIO",
      quote:
        "Comunidad Educativa Inclusiva • Espacio seguro de vinculación interdisciplinaria para Maestros, Servicios Académicos, Psicología (SEE) y Prefectura.",
      chips: [
        "Planes de Ajuste Razonable (DUA)",
        "Bitácora Socioemocional",
        "Seguimiento 504 / USAER",
      ],
    },
    featureCards: [
      {
        icon: "brain",
        background: "sky",
        title: "Atención Neurodivergente",
        subtitle: "Enfoque DUA y Fortalezas",
      },
      {
        icon: "lock",
        background: "green",
        title: "Sesión Segura Encriptada",
        subtitle: "Protocolo SSL TLS 1.3",
        description: "Sesiones inactivas por más de 20 minutos se cierran de forma preventiva.",
      },
    ],
  },
} as const;