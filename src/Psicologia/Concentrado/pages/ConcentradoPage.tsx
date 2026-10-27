import { useMemo, useState } from 'react'
import { PsicologiaTemplate } from '../../../Portal/shared/templates/PsicologiaTemplate'
import { destinoSidebar } from '../../../Portal/shared/constants/navigation'
import {
  alumnosConcentrado,
  escuelaInfo,
  folioCedulaElectronico,
  getResumenEstrategias,
} from '../constants/concentrado'
import { EndosoInstitucional } from '../organisms/EndosoInstitucional'
import { FiltrosOperativos } from '../organisms/FiltrosOperativos'
import { TablaConcentrado } from '../organisms/TablaConcentrado'
import { TarjetaEscuela } from '../organisms/TarjetaEscuela'
import { TarjetasResumen } from '../organisms/TarjetasResumen'
import type { DiagnosticoFiltro, GradoGrupoFiltro } from '../types'
import type { SidebarKey } from '../../../Portal/shared/types'

export function ConcentradoPage() {
  const [gradoGrupo, setGradoGrupo] = useState<GradoGrupoFiltro>('todos')
  const [diagnostico, setDiagnostico] = useState<DiagnosticoFiltro>('todos')
  const [, setEstatusCedula] = useState<'en-tiempo' | 'firmado'>('en-tiempo')

  const filtrados = useMemo(
    () =>
      alumnosConcentrado.filter((alumno) => {
        const coincideGrado = gradoGrupo === 'todos' || alumno.gradoGrupo === gradoGrupo
        const coincideDiag =
          diagnostico === 'todos' ||
          (diagnostico === 'tea' && alumno.diagnosticoClave === 'tea') ||
          (diagnostico === 'tdah' && alumno.diagnosticoClave === 'tdah') ||
          (diagnostico === 'auditiva' && alumno.diagnosticoClave === 'auditiva')
        return coincideGrado && coincideDiag
      }),
    [gradoGrupo, diagnostico]
  )

  const resumenes = useMemo(() => getResumenEstrategias(filtrados), [filtrados])

  const navegar = (key: SidebarKey) => {
    window.location.hash = destinoSidebar(key)
  }

  const exportar = () => {
    const nombre = `Concentrado_SEE_${escuelaInfo.cct}_CHI-SEE-2024-014-9981_${Date.now()}.xlsx`
    window.alert(
      `Se generó el archivo oficial foliado "${nombre}".\nFolio registrado en Reportes Oficiales: ${folioCedulaElectronico}`
    )
  }

  const firmar = () => {
    const acepta = window.confirm(
      '¿Confirma firmar digitalmente la Cédula Semestral SEE?\nEsta acción quedará registrada y actualizará el estatus del documento.'
    )
    if (acepta) {
      setEstatusCedula('firmado')
      window.alert('Cédula Semestral firmada digitalmente. Estatus actualizado a: Firmado / Sellado.')
    }
  }

  return (
    <PsicologiaTemplate
      rol='Psicología (SEE)'
      vista='Concentrado Semestral Oficial SEE'
      sistemaBanner='SISTEMA OFICIAL SEP'
      activeKey='concentrado'
      onNavigate={navegar}
    >
      <TarjetaEscuela />

      <FiltrosOperativos
        gradoGrupo={gradoGrupo}
        diagnostico={diagnostico}
        totales={{ activos: filtrados.length, duaVigentes: '100% Cédula' }}
        onGradoGrupo={setGradoGrupo}
        onDiagnostico={setDiagnostico}
        onExportar={exportar}
        onFirmar={firmar}
      />

      <TablaConcentrado alumnos={filtrados} />

      <TarjetasResumen resumenes={resumenes} total={filtrados.length} />

      <EndosoInstitucional />
    </PsicologiaTemplate>
  )
}
