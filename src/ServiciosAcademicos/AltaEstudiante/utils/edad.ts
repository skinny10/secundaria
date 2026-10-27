function aFechaUtc(fechaIso: string): Date | null {
  const coincidencia = /^(\d{4})-(\d{2})-(\d{2})$/.exec(fechaIso)
  if (!coincidencia) return null
  const anio = Number(coincidencia[1])
  const mes = Number(coincidencia[2])
  const dia = Number(coincidencia[3])
  const fecha = new Date(Date.UTC(anio, mes - 1, dia))
  if (
    fecha.getUTCFullYear() !== anio ||
    fecha.getUTCMonth() !== mes - 1 ||
    fecha.getUTCDate() !== dia
  ) {
    return null
  }
  return fecha
}

export function esFechaCalendarioValida(fechaIso: string): boolean {
  return aFechaUtc(fechaIso) !== null
}

export function calcularEdad(fechaIso: string, fechaReferencia: string): number | null {
  const nacimiento = aFechaUtc(fechaIso)
  const referencia = aFechaUtc(fechaReferencia)
  if (!nacimiento || !referencia || nacimiento > referencia) return null
  let edad = referencia.getUTCFullYear() - nacimiento.getUTCFullYear()
  const mes = referencia.getUTCMonth() - nacimiento.getUTCMonth()
  if (mes < 0 || (mes === 0 && referencia.getUTCDate() < nacimiento.getUTCDate())) edad -= 1
  return edad
}

export function fechaIsoDesdePartes(anio: string, mes: string, dia: string): string {
  if (!anio || !mes || !dia) return ''
  return `${anio.padStart(4, '0')}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`
}

export function partesFecha(fechaIso: string): { dia: string; mes: string; anio: string } {
  const [anio = '', mes = '', dia = ''] = fechaIso.split('-')
  return { dia, mes, anio }
}

export function diasEnMes(anio: string, mes: string): number {
  const valorAnio = Number(anio) || 2012
  const valorMes = Number(mes)
  if (!valorMes) return 31
  return new Date(valorAnio, valorMes, 0).getDate()
}

export function formatearFecha(fechaIso: string): string {
  const fecha = aFechaUtc(fechaIso)
  if (!fecha) return ''
  return new Intl.DateTimeFormat('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(fecha)
}

export function formatearFechaCorta(fechaIso: string): string {
  const fecha = aFechaUtc(fechaIso)
  if (!fecha) return ''
  return new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(fecha)
}

export function formatearHaceRelativo(fecha: Date, referencia = new Date()): string {
  const segundos = Math.max(0, Math.floor((referencia.getTime() - fecha.getTime()) / 1000))
  if (segundos < 45) return 'hace un momento'
  if (segundos < 90) return 'hace 1 minuto'
  if (segundos < 3600) return `hace ${Math.floor(segundos / 60)} minutos`
  if (segundos < 7200) return 'hace 1 hora'
  return `hace ${Math.floor(segundos / 3600)} horas`
}
