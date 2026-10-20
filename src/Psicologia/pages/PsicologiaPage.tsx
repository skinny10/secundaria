import { useState } from 'react'
import { Icon } from '../../utils/atoms/Icon'
import { registros as registrosIniciales, indicadores } from '../constants/psicologia'
import type { RegistroCanalizacion } from '../types'
import { useThemeMode } from '../../ServiciosAcademicos/shared/hooks/useThemeMode'

function colorLegible(hex: string, isDark: boolean) {
  if (!isDark) return hex
  const n = parseInt(hex.replace('#', ''), 16)
  const r = (n >> 16) & 255
  const g = (n >> 8) & 255
  const b = n & 255
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return lum < 0.55 ? 'var(--color-text-primary)' : hex
}

export function PsicologiaPage() {
  const [registros] = useState<RegistroCanalizacion[]>(registrosIniciales)
  const [seleccionado, setSeleccionado] = useState<RegistroCanalizacion>(registros[8])
  const [menuAbierto, setMenuAbierto] = useState(false)
  const { theme, setTheme } = useThemeMode()
  const isDark = theme === 'dark'

  return (
    <div
      className="sa-app min-h-screen w-full bg-[var(--sa-bg)] text-[var(--color-text-primary)] lg:grid lg:grid-cols-[200px_minmax(0,1fr)]"
      data-theme={theme}
    >
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[200px] flex-col border-r border-[var(--sa-border)] bg-[var(--sa-card)] p-[14px_10px] transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          menuAbierto ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-forest)] text-white">
            <Icon name="users" size={18} color="currentColor" />
          </span>
          <div className="min-w-0">
            <p className="text-[14.5px] font-bold leading-tight">NexusEdu</p>
            <p className="text-[14.5px] font-bold uppercase tracking-widest text-[var(--sa-accent)] leading-tight">SEE &amp; PSICOLOGÍA</p>
          </div>
        </div>
        <p className="mt-3 text-left text-[13px] leading-snug text-[var(--sa-muted)]">
          Esc. Sec. Fed. Adolfo López Mateos · CCT 07DES0047 · T. Vespertino
        </p>
        <nav className="mt-3 flex flex-1 flex-col gap-2 overflow-y-auto">
          {[
            'Dashboard / Inicio',
            'Canalizaciones Docentes',
            'Expedientes y Checklist',
            'Concentrado Semestral SEE',
            'Reportes y Oficios Oficiales',
          ].map((item, i) => (
            <button
              key={item}
              onClick={() => setMenuAbierto(false)}
              className={`flex min-h-[40px] items-center rounded-lg px-[10px] py-2 text-left text-[13.5px] leading-snug ${
                i === 1 ? 'bg-[var(--color-forest)] text-white' : 'hover:bg-[var(--sa-field)]'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="mt-auto rounded-lg bg-[var(--sa-field)] p-[10px] text-[11.5px] leading-snug text-left text-[var(--sa-muted)]">
          SISTEMA ESPECIALIZADO — Servicio de Educación Especial y Apoyo Psicopedagógico
        </div>
      </aside>

      {menuAbierto ? (
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={() => setMenuAbierto(false)}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      ) : null}

      {/* Main */}
      <main className="flex min-w-0 flex-col gap-3 px-3 py-3 lg:px-4 lg:py-3">
        {/* Topbar */}
        <header className="flex w-full min-w-0 flex-wrap items-center gap-[10px] rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 py-2 shadow-[var(--shadow-sm)]">
          <button
            type="button"
            onClick={() => setMenuAbierto((v) => !v)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] lg:hidden"
            aria-label="Abrir menú"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <span className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-[var(--sa-field)] px-3 text-[14.5px]">
            Ciclo 2024-2025 · Turno Vespertino
          </span>
          <div className="flex h-10 min-w-[160px] flex-1 items-center gap-2 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-field)] px-2">
            <Icon name="search" size={16} color="var(--sa-muted)" />
            <input
              className="h-full w-full min-w-0 bg-transparent text-[14.5px] outline-none placeholder:text-[var(--sa-muted)]"
              placeholder="Buscar alumno por nombre o CURP..."
            />
          </div>
          <span className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-[#1D3F5C] px-3 text-[14.5px] text-[#CFE6FF]">
            UNIDAD SEE REG. 07
          </span>
          <button
            type="button"
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-[14.5px] font-bold hover:bg-[var(--sa-field)]"
            aria-label="Alternar modo claro/oscuro"
          >
            <Icon name={isDark ? 'sun' : 'moon'} size={18} color="currentColor" />
            {isDark ? 'Modo claro' : 'Modo oscuro'}
          </button>
          <button
            type="button"
            className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)]"
            aria-label="Notificaciones"
          >
            <Icon name="bell" size={18} color="currentColor" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#C62828]"></span>
          </button>
          <div className="flex min-w-0 shrink items-center gap-2 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-2 py-1">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-forest)] text-[14.5px] font-bold text-white">LP</span>
            <div className="min-w-0 text-left leading-tight">
              <p className="truncate text-[14.5px] font-bold">Lic. Psicología Clínica</p>
              <p className="truncate text-[14.5px] text-[var(--sa-muted)]">Intervención SEE</p>
            </div>
          </div>
        </header>

        {/* Header */}
        <section className="w-full min-w-0 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-[18px] py-[14px] shadow-[var(--shadow-sm)]">
          <div className="flex flex-col gap-3">
            <div className="flex min-w-0 flex-col gap-2">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--sa-field)] px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[var(--color-forest)]">
                <Icon name="clipboard" size={14} color="currentColor" />
                SUBDIRECCIÓN TÉCNICA · UNIDAD DE SERVICIOS EDUCATIVOS ESPECIALES (SEE)
              </span>
              <h1 className="text-[clamp(24px,2.1vw,30px)] font-extrabold leading-tight text-[#1F4A3F]">
                Registro y Control de Canalizaciones al Departamento de Psicología y SEE
              </h1>
              <p className="max-w-[90ch] text-[13.5px] text-[var(--sa-muted)]">
                Recepción sistemática de solicitudes enviadas por Docentes titulares, Asesores de grupo y Trabajo Social para valoración psicopedagógica y atención clínica.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-start gap-2">
              <select className="h-10 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-[14.5px]">
                <option>Periodo: Sep - Oct 2025</option>
              </select>
              <button className="inline-flex h-10 items-center gap-2 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-field)] px-3 text-[14.5px] font-bold hover:brightness-95">
                <Icon name="file-text" size={16} color="currentColor" />
                Descargar Excel / CSV
              </button>
              <button className="inline-flex h-10 items-center gap-2 rounded-lg bg-[var(--color-forest)] px-3 text-[14.5px] font-bold text-white hover:brightness-95">
                <Icon name="plus" size={16} color="currentColor" />
                Nueva Canalización Manual
              </button>
            </div>
          </div>
        </section>

        {/* Indicadores */}
        <section className="grid w-full min-w-0 grid-cols-1 gap-[10px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {indicadores.map((ind) => (
            <article key={ind.id} className="flex min-w-0 flex-col gap-2 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-[14px] py-3 shadow-[var(--shadow-sm)]">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-bold uppercase leading-snug tracking-widest text-[var(--sa-muted)]">{ind.label}</span>
                <Icon name={ind.icon as never} size={16} color={colorLegible(ind.color, isDark)} />
              </div>
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <p className="text-[30px] font-extrabold leading-none" style={{ color: colorLegible(ind.color, isDark) }}>
                  {ind.valor}
                </p>
                <p className="text-[12.5px] text-[var(--sa-muted)]">{ind.apoyo}</p>
                {ind.chip ? (
                  <span className="inline-flex items-center rounded-full bg-[var(--sa-peach)] px-2 py-0.5 text-[12.5px] font-bold text-[var(--sa-coffee)]">
                    {ind.chip}
                  </span>
                ) : null}
              </div>
              <div className="mt-auto h-1 w-full rounded-full bg-[var(--sa-field)]">
                <div className="h-full rounded-full" style={{ width: `${ind.barra}%`, backgroundColor: colorLegible(ind.color, isDark) }} />
              </div>
            </article>
          ))}
        </section>

        {/* Filtros */}
        <section className="flex w-full min-w-0 flex-wrap items-center gap-2 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-[10px] py-2 shadow-[var(--shadow-sm)]">
          <div className="flex h-10 min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-field)] px-2">
            <Icon name="search" size={16} color="var(--sa-muted)" />
            <input
              className="h-full w-full min-w-0 bg-transparent text-[14.5px] outline-none placeholder:text-[var(--sa-muted)]"
              placeholder="Buscar por apellido del alumno..."
            />
          </div>
          <select className="h-10 min-w-0 flex-[0_1_180px] rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-[14.5px]">
            <option>Todos los Grados / Grupos</option>
          </select>
          <select className="h-10 min-w-0 flex-[0_1_180px] rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-[14.5px]">
            <option>Todos los Orígenes</option>
          </select>
          <select className="h-10 min-w-0 flex-[0_1_180px] rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-3 text-[14.5px]">
            <option>Estado de Canalización</option>
          </select>
          <button
            type="button"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] hover:bg-[var(--sa-field)]"
            aria-label="Actualizar filtros"
          >
            <Icon name="clock" size={18} color="currentColor" />
          </button>
        </section>

        {/* Tabla + Ficha */}
        <div className="grid w-full min-w-0 grid-cols-1 items-start gap-3 xl:grid-cols-[minmax(0,1fr)_clamp(320px,26vw,380px)]">
          <section className="flex min-w-0 flex-col gap-2 rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] px-[14px] py-3 shadow-[var(--shadow-sm)]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Icon name="book-open" size={18} color="var(--color-forest)" />
                <h2 className="text-[14.5px] font-extrabold">Sábanas de Registros Recibidos</h2>
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--sa-menta)] px-3 py-1 text-[14.5px] font-bold">14 Alumnos visibles</span>
              </div>
              <span className="text-[14.5px] text-[var(--sa-muted)]">● Sincronizado con Formulario de Google Forms &amp; SEE</span>
            </div>
            <div className="w-full min-w-0 overflow-x-auto">
              <table className="w-full min-w-[700px] text-[14.5px]">
                <thead className="bg-[var(--sa-field)]">
                  <tr>
                    <th className="p-2 text-left text-[11px] font-bold uppercase tracking-widest">MARCA TEMPORAL</th>
                    <th className="p-2 text-left text-[11px] font-bold uppercase tracking-widest">ALUMNO (NOMBRE Y GRADO)</th>
                    <th className="p-2 text-left text-[11px] font-bold uppercase tracking-widest">EMISOR / ORIGEN</th>
                    <th className="p-2 text-left text-[11px] font-bold uppercase tracking-widest">ASIGNATURA</th>
                  </tr>
                </thead>
                <tbody>
                  {registros.map((r) => (
                    <tr key={r.id} onClick={() => setSeleccionado(r)} className={`cursor-pointer border-t border-[var(--sa-border)] ${seleccionado.id === r.id ? 'bg-[var(--sa-field)]' : ''}`}>
                      <td className="p-2 align-middle text-[13.5px] whitespace-nowrap">{r.marcaTemporal}</td>
                      <td className="p-2 align-middle">
                        <p className="font-bold uppercase text-[13.5px]">{r.apellidos}, {r.nombre}</p>
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[13.5px] font-bold ${seleccionado.id === r.id ? 'bg-[var(--color-forest)] text-white' : 'bg-[var(--sa-sky)] text-[var(--sa-steel)]'}`}>
                          {r.grado} {r.grupo}
                        </span>
                      </td>
                      <td className="p-2 align-middle">
                        <span className="inline-flex items-center rounded-full bg-[var(--sa-menta)] px-2 py-0.5 text-[13.5px] font-bold">{r.origen}</span>
                        <p className="mt-1 text-[13.5px] text-[var(--sa-muted)]">{r.emisor}</p>
                      </td>
                      <td className="p-2 align-middle text-[13.5px] text-[var(--sa-steel)]">{r.asignatura}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
              <p className="text-[14.5px] text-[var(--sa-muted)]">Mostrando 13 de 24 registros en libros de actas escolares</p>
              <div className="flex items-center gap-1">
                <button className="inline-flex h-9 items-center rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-2 text-[14.5px] hover:bg-[var(--sa-field)]">Anterior</button>
                <button className="inline-flex h-9 items-center rounded-lg bg-[var(--color-forest)] px-2 text-[14.5px] text-white">1</button>
                <button className="inline-flex h-9 items-center rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-2 text-[14.5px] hover:bg-[var(--sa-field)]">2</button>
                <button className="inline-flex h-9 items-center rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] px-2 text-[14.5px] hover:bg-[var(--sa-field)]">Siguiente</button>
              </div>
            </div>
          </section>

          <aside className="sticky top-3 flex w-full min-w-0 flex-col gap-[10px] rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] p-[14px] shadow-[var(--shadow-sm)] lg:h-fit">
            <div className="flex items-start justify-between gap-2">
              <div className="flex min-w-0 flex-col">
                <div className="flex items-center gap-2">
                  <Icon name="clipboard" size={16} color="var(--color-forest)" />
                  <h3 className="text-[14.5px] font-extrabold uppercase">Ficha Clínico-Educativa</h3>
                </div>
                <span className="text-[11px] font-bold uppercase text-[var(--sa-muted)]">{seleccionado.folio}</span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Icon name="printer" size={16} color="currentColor" />
                <span className="inline-flex items-center rounded-full bg-[var(--sa-peach)] px-2 py-0.5 text-[13px] font-bold text-[var(--sa-coffee)]">{seleccionado.estado}</span>
              </div>
            </div>
            <div className="rounded-lg bg-[var(--sa-field)] p-[10px]">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-forest)] text-[13px] font-bold text-white">
                  JB
                </span>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-bold uppercase">{seleccionado.apellidos}, {seleccionado.nombre}</p>
                  <p className="text-[13px] text-[var(--sa-accent)]">{seleccionado.grado} Grupo {seleccionado.grupo} · {seleccionado.turno}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <div className="min-w-0 rounded-lg bg-[var(--sa-field)] p-2">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--sa-muted)]">Fecha de Emisión</p>
                <p className="text-[13px] font-bold">{seleccionado.fechaEmision}</p>
              </div>
              <div className="min-w-0 rounded-lg bg-[var(--sa-field)] p-2">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--sa-muted)]">¿Afecta Desempeño?</p>
                <p className="text-[13px] font-bold text-[var(--sa-accent)]">{seleccionado.afectaDesempeno ? 'SÍ' : 'NO'}</p>
              </div>
            </div>
            <div className="rounded-lg bg-[var(--sa-field)] p-[10px]">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--sa-muted)]">CANALIZADO POR:</span>
                <span className="inline-flex items-center rounded-full bg-[var(--sa-peach)] px-2 py-0.5 text-[13px] font-bold text-[var(--sa-coffee)]">{seleccionado.origen}</span>
              </div>
              <p className="mt-1 text-[13px] font-bold">{seleccionado.emisor}</p>
              <p className="text-[13px] text-[var(--sa-muted)]">Asignatura / Área: {seleccionado.asignatura}</p>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--sa-muted)]">DESCRIPCIÓN DE LA PROBLEMÁTICA Y ANTECEDENTES</p>
              <div className="mt-1 rounded-lg bg-[var(--sa-field)] p-[10px] text-[13px] italic break-words [overflow-wrap:anywhere]">{seleccionado.descripcion}</div>
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--sa-muted)]">PLAN INMEDIATO DE PSICOLOGÍA Y SEE</p>
              <div className="mt-1 flex flex-col gap-2">
                {['Notificar a Trabajo Social para citatorio de padres', 'Aplicación de Batería Neuropsicológica breve', 'Generar Ficha de Adaptación Curricular y DUA'].map((item) => (
                  <label key={item} className="flex items-center gap-2 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-card)] p-2 text-[13px]">
                    <input type="checkbox" className="h-4 w-4 shrink-0" defaultChecked={item === 'Notificar a Trabajo Social para citatorio de padres'} />
                    <span className="min-w-0">{item}</span>
                  </label>
                ))}
              </div>
            </div>
            <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[var(--color-forest)] px-3 text-[14.5px] font-bold text-white hover:brightness-95">
              <Icon name="calendar" size={16} color="currentColor" />
              Agendar Valoración Psicopedagógica
            </button>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-field)] px-3 text-[14.5px] font-bold hover:brightness-95">
                <Icon name="book-open" size={16} color="currentColor" />
                Abrir Expediente
              </button>
              <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-[var(--sa-border)] bg-[var(--sa-field)] px-3 text-[14.5px] font-bold hover:brightness-95">
                <Icon name="pen" size={16} color="currentColor" />
                Firmar Recibido
              </button>
            </div>
            <div className="rounded-lg bg-[var(--sa-field)] p-2 text-center text-[13px] text-[var(--sa-muted)]">
              Responsable SEE: Lic. Psicología Clínica Turno Vespertino
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}
