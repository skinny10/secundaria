import { altaConfig } from './altaConfig'

export const encabezadoAlta = {
  eyebrow: `CICLO ESCOLAR ${altaConfig.ciclo}`,
  titulo: `Alta Oficial de Expediente de Alumno — ${altaConfig.cicloEtiqueta}`,
  descripcion:
    'Campos obligatorios marcados con asterisco (*). Expediente clasificado y confidencial.',
  chip: 'PROTECCIÓN LGDNNA',
  chipDetalle: 'Norma Oficial Federal de Privacidad',
  icono: 'user-cog',
}

export const stepperAlta = {
  aria: 'Pasos del alta de estudiante',
  estados: {
    actual: 'PASO ACTUAL',
    siguiente: 'SIGUIENTE',
    pendiente: 'PENDIENTE',
    completado: 'COMPLETADO',
  },
  paso: 'PASO',
}

export const textosPaso1 = {
  cabecera: {
    icono: 'id-card',
    eyebrow: 'REGISTRO CIVIL Y ADMISIÓN',
    titulo: 'Identificación y Datos Personales',
    descripcion:
      'Capture la identidad oficial del alumno y reserve su matrícula institucional para el ciclo activo.',
  },
  secciones: {
    identidad: {
      titulo: 'Datos de Identidad y Registro Civil',
      icono: 'id-card',
    },
    asignacion: {
      titulo: 'Datos de Asignación y Matrícula Escolar',
      icono: 'graduation-cap',
    },
  },
  campos: {
    nombres: 'Nombre(s) del Estudiante',
    nombresAyuda: 'Tal como aparece en Acta de Nacimiento',
    apellidoPaterno: 'Primer Apellido (Paterno)',
    apellidoMaterno: 'Segundo Apellido (Materno)',
    curp: 'Clave Única de Registro de Población (CURP)',
    curpEtiqueta: '18 CARACTERES MAYÚSCULAS',
    verificar: 'Verificar RENAPO',
    verificando: 'Verificando RENAPO…',
    curpValidada: 'CURP validada ante el Registro Nacional de Población (Estatus: Certificada).',
    curpNoEncontrada: 'La CURP no fue localizada en el Registro Nacional de Población.',
    curpError: 'El servicio RENAPO no respondió. Puede reintentar la verificación.',
    fechaNacimiento: 'Fecha de Nacimiento',
    dia: 'Día',
    mes: 'Mes',
    anio: 'Año',
    edad: 'Edad Calculada:',
    edadUnidad: (edad: number) => `${edad} años`,
    edadFueraRango: (min: number, max: number) =>
      `La edad está fuera del rango típico de secundaria (${min} a ${max} años). Puede continuar, pero confirme la fecha.`,
    sexo: 'Sexo / Género Registrado',
    grado: 'Grado y Grupo Asignado',
    turno: 'Turno Escolar',
    matricula: 'Matrícula Oficial / Folio',
    matriculaEtiqueta: 'GENERADO SEE',
    confirmarDiscrepancia: 'Confirmo que la fecha y el sexo no coinciden con la CURP.',
    advertenciaDiscrepancia:
      'La fecha de nacimiento o el sexo no coinciden con la CURP. Confirme la discrepancia para continuar.',
    duplicada: 'Esta CURP ya está registrada.',
    verExpediente: 'Ver expediente existente',
    posibleDuplicado:
      'Existe un registro con el mismo nombre completo y fecha de nacimiento. Verifique antes de continuar.',
  },
  acciones: {
    guardar: 'Guardar Borrador',
    continuar: 'Continuar a Paso 2: Familia y Salud',
  },
}

export const textosPaso2 = {
  etiqueta: 'EXPEDIENTE ÚNICO DE ADMISIÓN E INCLUSIÓN',
  titulo: 'Paso 2: Información del Tutor Legal y Datos Clínicos Básicos',
  estudiante: (nombre: string, matricula: string) =>
    `Estudiante: ${nombre} • Matrícula Provisional: ${matricula}`,
  secciones: {
    tutor: {
      titulo: '1. Datos del Padre, Madre o Tutor Responsable',
      subtitulo:
        'Contacto legal directo para notificaciones escolares, firmas de PEI y emergencias.',
      chip: 'Campos Obligatorios *',
      icono: 'users',
    },
    salud: {
      titulo: '2. Seguridad Social y Antecedentes Médicos Inmediatos',
      subtitulo:
        'Asegura atención rápida y traslados autorizados en caso de eventos clínicos o sensoriales.',
      chip: 'Protocolo Médico Activo',
      icono: 'briefcase-medical',
    },
  },
  campos: {
    nombreTutor: 'Nombre completo del Tutor Legal',
    ayudaNombreTutor:
      'Nombre tal como figura en su credencial para votar (INE/IFE) o documento migratorio oficial.',
    parentesco: 'Parentesco o Representación',
    telefono: 'Teléfono Principal de Urgencias',
    telefonoEtiqueta: 'LÍNEA MÓVIL DIRECTA',
    ayudaTelefono:
      'Formato: 10 dígitos. Prioridad de marcado telefónico ante protocolos de contingencia escolar.',
    correo: 'Correo Electrónico Institucional/Personal',
    ayudaCorreo:
      'Recepción de informes psicopedagógicos bimestrales y avisos de reuniones.',
    domicilio: 'Domicilio Particular Actual del Alumno y Tutor',
    ayudaDomicilio:
      'Calle, número exterior/interior, colonia y municipio para cotejo de radio de servicio escolar.',
    institucion: 'Institución de Cobertura Médica de Afiliación',
    ayudaInstitucion:
      'Seleccione la entidad primaria a la cual remitir al alumno en ambulancia escolar.',
    nss: 'Número de Seguridad Social / Póliza Vigente',
    ayudaNss:
      'NSS de 11 dígitos o identificador de afiliado que figura en la cartilla nacional de salud.',
    nssEtiquetaImss: '11 DÍGITOS IMSS',
    nssEtiquetaOtro: 'IDENTIFICADOR DE AFILIADO',
    clinica: 'Clínica de Adscripción / Médico de Cabecera',
    clinicaEtiqueta: 'OPCIONAL',
    ayudaClinica: 'Unidad médica familiar asignada para transferencias de urgencia.',
    alergias: '¿Presenta alguna alergia o condición médica de emergencia?',
    alergiasEtiqueta: 'Consideración Sensorial Crítica',
    ayudaAlergias:
      'Indique alergias a medicamentos (penicilina, sulfas), alimentos, crisis de asma o detonantes neuro-sensoriales agudos.',
    alergiasPlaceholder:
      'No presenta alergias farmacológicas. Sensibilidad auditiva alta ante ruidos repentinos.',
    contador: (actual: number, maximo: number) => `${actual} / ${maximo} caracteres`,
    adaptacionTitulo: 'Adaptación Aula Sugerida Detectada',
    adaptacionChip: 'Pre-cargado a Plan 504',
    descartar: 'Descartar sugerencia',
    sugerenciaAria: 'Sugerencias de adaptación detectadas',
  },
  acciones: {
    volver: 'Volver al Paso 1: Datos Personales',
    guardar: 'Guardar Progreso',
    continuar: 'Continuar a Paso 3: Diagnóstico y SEE',
  },
}

export const textosPaso3 = {
  etiqueta: 'COTEJO Y ADMISIÓN INCLUSIVA',
  titulo: 'Paso 3: Condición Reportada, Documentación y Canalización',
  descripcion:
    'Revise el expediente clínico inicial, confirme los documentos oficiales cotejados y asigne al profesional del Gabinete Psicopedagógico.',
  secciones: {
    condicion: {
      titulo:
        'Condición del Alumno y Necesidades Específicas de Apoyo Educativo (BAPS/NEE)',
      subtitulo: 'Datos diagnósticos preliminares para adscripción curricular ajustada',
      icono: 'brain',
    },
    documentos: {
      titulo: 'Documentos Básicos de Ingreso Presentados en Físico',
      subtitulo: 'Cotejo reglamentario en ventanilla de Servicios Escolares',
      instruccion:
        'Marque las casillas de los expedientes físicos originales recibidos y cotejados por el personal administrativo:',
      icono: 'folder',
    },
    derivacion: {
      titulo: 'Asignación Inicial de Acompañamiento',
      subtitulo: 'Canalización institucional inmediata a Servicios Educativos Especiales',
      icono: 'handshake',
    },
  },
  campos: {
    diagnostico: '¿El alumno cuenta con diagnóstico previo o certificado médico externo?',
    diagnosticoSi: 'SÍ, CUENTA CON DIAGNÓSTICO OFICIAL',
    diagnosticoSiDetalle: 'Presenta valoración clínica expedida por especialista acreditado.',
    diagnosticoProceso: 'EN PROCESO DE EVALUACIÓN',
    diagnosticoProcesoDetalle:
      'Sin dictamen definitivo; canalización inicial solicitada por tutores.',
    condicion: 'Condición principal reportada',
    condicionAyuda: 'Clasificación para adecuación de entorno y estímulos sensoriales.',
    especialistaEmisor: 'Especialista que emite',
    especialistaEmisorAyuda: 'Nombre profesional, especialidad clínica y número de cédula.',
    derivar: 'Derivar directamente al Gabinete de Psicología y SEE escolar',
    derivarDetalle:
      'Genera notificación prioritaria para elaboración de plan de ajustes razonables (PARE) y aviso a la plantilla docente asignada.',
    especialista: 'Psicólogo / Especialista Asignado',
    especialistaAyuda:
      'Profesional responsable del expediente confidencial de seguimiento socioemocional y pedagógico.',
    documentosContador: (recibidos: number, total: number) =>
      `${recibidos} de ${total} Expedientes Verificados`,
    documentosMinimos: 'Acta de Nacimiento y CURP son requisitos mínimos para registrar.',
    pendiente: (fecha: string) => `Entrega pendiente · límite ${fecha}`,
  },
  acciones: {
    volver: 'Volver al Paso 2',
    finalizar: 'FINALIZAR Y REGISTRAR EN PADRÓN OFICIAL',
  },
}

export const dialogosAlta = {
  guardado: 'Borrador guardado',
  guardadoProgreso: 'Progreso guardado',
  autoguardado: 'Autoguardado',
  borradorSinCambios: 'Sin cambios pendientes',
  salirTitulo: 'Cambios sin guardar',
  salirDescripcion:
    'Hay datos del alta que aún no se guardan. Puede guardar el borrador y salir, o descartar los cambios de esta sesión.',
  salirGuardar: 'Guardar y salir',
  salirDescartar: 'Salir sin guardar',
  salirCancelar: 'Continuar en el alta',
  confirmarTitulo: 'Confirmar registro oficial',
  confirmarDescripcion:
    'Revise el resumen administrativo. Al confirmar se crea el expediente, se actualiza el padrón y se notifica al equipo correspondiente.',
  revisar: 'Revisar',
  confirmar: 'Confirmar registro',
  confirmando: 'Registrando alumno…',
  errorRegistro: 'No fue posible completar el registro. Intente nuevamente.',
  resumen: {
    nombre: 'Alumno',
    curp: 'CURP',
    asignacion: 'Grado y grupo',
    turno: 'Turno',
    tutor: 'Tutor legal',
    documentos: 'Documentos',
    derivacion: 'Derivación',
    especialista: 'Especialista',
  },
  exitoTitulo: 'Alumno registrado en el Padrón Oficial',
  exitoDescripcion:
    'El expediente administrativo quedó creado. La documentación pendiente conserva su plazo y la canalización ya está disponible para Psicología y SEE.',
  verPadron: 'Ver en Padrón General',
  registrarOtro: 'Registrar otro alumno',
  imprimir: 'Imprimir comprobante de registro',
  comprobante: 'Comprobante de registro de alumno',
  sinDerivacion: 'Sin derivación inicial',
  conDerivacion: 'Canalización prioritaria a SEE',
}

export const erroresAlta = {
  requerido: 'Este campo es obligatorio.',
  nombres: 'Ingrese el nombre o nombres del estudiante.',
  apellidoPaterno: 'Ingrese el primer apellido.',
  nombreInvalido: 'Use solo letras, acentos, ñ, espacios, apóstrofe o guion.',
  curpLongitud: 'La CURP debe tener 18 caracteres.',
  curpFormato: 'La CURP no cumple el formato oficial o el dígito verificador es incorrecto.',
  curpDuplicada: 'Esta CURP ya está registrada en el padrón.',
  curpSinVerificar: 'Verifique la CURP ante RENAPO antes de continuar.',
  fechaNacimiento: 'Seleccione una fecha de nacimiento válida.',
  sexo: 'Seleccione una opción de sexo registrado.',
  grado: 'Seleccione el grado y grupo.',
  turno: 'Seleccione el turno escolar.',
  tutorNombre: 'Ingrese el nombre completo del tutor legal.',
  parentesco: 'Seleccione el parentesco o representación.',
  telefono: 'El teléfono debe tener 10 dígitos.',
  correo: 'Ingrese un correo electrónico válido.',
  domicilio: 'Ingrese el domicilio particular completo.',
  institucion: 'Seleccione la institución de cobertura médica.',
  nssImss: 'El NSS del IMSS debe tener 11 dígitos.',
  nss: 'Ingrese el número de seguridad social o identificador de afiliado.',
  alergiasRequerido: 'Registre alergias, condiciones de emergencia o indique “Ninguna conocida”.',
  alergiasMaximo: `Máximo ${altaConfig.maxAlergias} caracteres.`,
  diagnostico: 'Indique si cuenta con diagnóstico previo.',
  condicion: 'Seleccione la condición principal reportada.',
  especialistaEmisor: 'Indique el especialista que emite el diagnóstico.',
  documentosMinimos: 'Marque el Acta de Nacimiento y la CURP para poder registrar.',
  especialista: 'Seleccione al especialista responsable de la canalización.',
  discrepancia: 'Confirme la discrepancia entre la CURP y los datos seleccionados.',
  errorResumen: 'Revise los campos marcados antes de continuar.',
  errorFinal: 'No se puede registrar: hay errores en pasos anteriores.',
}

export const ariaAlta = {
  obligatorio: '(obligatorio)',
  opcional: '(opcional)',
  resumenErrores: 'Resumen de errores del formulario',
  cargandoBorrador: 'Cargando borrador del alta',
  guardando: 'Guardando borrador',
  campoInvalido: 'Campo con error',
  quitarDocumento: 'Quitar documento',
  marcarDocumento: 'Marcar documento recibido',
}

export const textosDocumentos = {
  contador: (recibidos: number, total: number) => `${recibidos} de ${total} Expedientes Verificados`,
  minimos: 'Acta de Nacimiento y CURP son requisitos mínimos para registrar.',
  estadoRecibido: 'RECIBIDO',
  estadoPendiente: 'PENDIENTE',
  estadoValidado: 'VALIDADO',
  estadoPlazo: 'PLAZO ACTIVO',
}
