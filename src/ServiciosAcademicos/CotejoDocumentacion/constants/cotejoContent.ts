import { roles } from '../../../Portal/shared/constants/roles'
import type { CotejoExpediente, DocumentoCotejo } from '../types'

export const cotejoContent = {
  breadcrumbs: {
    padron: 'Padrón General',
    separador: '›',
    expediente: (matricula: string) => `Expediente ${matricula}`,
    pagina: 'Cotejo Documental',
  },
  encabezado: {
    titulo: 'Cotejo y Verificación Documental de Admisión',
    subtitulo: (matricula: string) => `Expediente de admisión ${matricula}`,
    icon: 'clipboard-check' as const,
  },
  instruccion: {
    titulo: 'Instrucciones',
    texto:
      'Verifique uno a uno los documentos presentados. Marque como "Cotejado" únicamente cuando el documento esté completo, legible y corresponda al alumno. Si existen observaciones para el tutor o se requiere aclaración, registre las observaciones obligatorias cuando haya documentos pendientes.',
  },
  documentos: {
    leyenda: 'Documentación presentada',
    descripcion: 'Marque cada documento conforme a su revisión',
    cotejado: 'Cotejado',
    pendiente: 'Pendiente',
    prorroga: (fecha: string) => `Prórroga hasta ${fecha}`,
  },
  observaciones: {
    etiqueta: 'Observaciones para el expediente / tutor',
    placeholder: 'Describa observaciones, aclaraciones o indicaciones al tutor...',
    contador: (actual: number, maximo: number) => `${actual}/${maximo} caracteres`,
    requerido: '* Requerido cuando existen documentos pendientes',
  },
  lateral: {
    alumno: 'Datos del alumno',
    resumen: 'Resumen de cotejo',
    cotejados: 'Cotejados',
    pendientes: 'Pendientes',
    total: 'Total',
    registradoPor: 'Registrado/Verificado por',
    actualizadoEn: 'Última actualización',
    instrucciones: 'Al guardar se actualizará el estatus del expediente en el Padrón General.',
  },
  acciones: {
    cancelar: 'Cancelar',
    guardar: 'Guardar y actualizar estatus',
    guardarConfirmar: 'Confirmar guardado',
    guardarCancelar: 'Cancelar',
    dialogoTitulo: 'Confirmar cotejo documental',
    dialogoTexto: (pendientes: number) =>
      pendientes > 0
        ? `Hay ${pendientes} documento(s) pendiente(s). Se registrarán observaciones si las capturó. ¿Desea guardar los cambios?`
        : 'Todos los documentos están cotejados. ¿Desea guardar los cambios y actualizar el estatus a expediente completo?',
  },
  mensajes: {
    guardadoExitoso: 'Cotejo documental guardado correctamente. Se actualizó el estatus en el Padrón General.',
    sinCambios: 'No hay cambios para guardar.',
    obligatorioObservaciones: 'Debe capturar observaciones cuando existen documentos pendientes.',
  },
  sinExpediente: {
    titulo: 'Sin expediente seleccionado',
    texto: 'No se encontró el expediente. Seleccione un alumno desde el Padrón General con estatus "Cotejo pendiente".',
    accion: 'Ir al Padrón General',
  },
} as const

export const OBSERVACIONES_MAX = 500

export const DOCUMENTOS_COTEJO_BASE: Omit<DocumentoCotejo, 'estado'>[] = [
  {
    id: 'acta',
    orden: 1,
    nombre: 'Acta de Nacimiento (Original y Copia cotejada)',
    detalle: 'Verificar legibilidad, datos del alumno y fecha de registro.',
  },
  {
    id: 'curp',
    orden: 2,
    nombre: 'CURP Certificada actualizada',
    detalle: 'Coincidencia con CURP registrada en el expediente.',
  },
  {
    id: 'certificado',
    orden: 3,
    nombre: 'Certificado de Primaria / Boleta anterior',
    detalle: 'Verificar institución, ciclo y datos del alumno.',
  },
  {
    id: 'dictamen',
    orden: 4,
    nombre: 'Dictamen Médico o Psicológico externo',
    detalle: 'Verificar fecha, sello, firma y vigencia cuando aplique.',
  },
  {
    id: 'cartilla',
    orden: 5,
    nombre: 'Cartilla Nacional de Salud',
    detalle: 'Revisar esquema de vacunación o seguimiento. Puede tener prórroga.',
  },
]

export function crearExpedienteCotejoFicticio(expedienteId: string): CotejoExpediente {
  const ahora = new Date().toISOString()
  return {
    expedienteId,
    alumno: {
      id: expedienteId,
      matricula: expedienteId.startsWith('NX-') ? expedienteId : `NX-2024-${expedienteId.replace(/\D/g, '').padStart(3, '0')}`,
      nombreCompleto: 'Alumno(a) en proceso de admisión',
      curp: 'XXXX000000XXXXXX00',
      gradoGrupo: '1° A / Matutino',
      tutor: {
        nombre: 'Tutor(a) registrado',
        parentesco: 'Madre / Tutora Legal',
        telefono: '961 000 0000',
      },
    },
    documentos: DOCUMENTOS_COTEJO_BASE.map((doc, index) => ({
      ...doc,
      estado: index < 2 ? ('cotejado' as const) : ('pendiente' as const),
      ...(index === 0 ? { fechaCotejo: ahora.slice(0, 10), verificadoPor: roles.servicios_academicos.user.name } : {}),
      ...(index === 1 ? { fechaCotejo: ahora.slice(0, 10), verificadoPor: roles.servicios_academicos.user.name } : {}),
    })),
    observaciones: {
      texto: '',
      requerido: false,
    },
    registradoPor: roles.servicios_academicos.user.name,
    actualizadoEn: ahora,
  }
}

export function calcularResumen(documentos: DocumentoCotejo[]) {
  const cotejados = documentos.filter((d) => d.estado === 'cotejado').length
  const pendientes = documentos.length - cotejados
  return { cotejados, pendientes, total: documentos.length }
}
