import type { AlumnoExpediente, FirmaExpediente, GrupoMaterias } from '../types'

interface PrintFichaDUAProps {
  alumno: AlumnoExpediente
  grupos: GrupoMaterias[]
  firmas: FirmaExpediente[]
  ciclo: string
  folio: string | null
}

export function PrintFichaDUA({ alumno, grupos, firmas, ciclo, folio }: PrintFichaDUAProps) {
  return (
    <div className='sa-print-only hidden bg-white p-6 text-[12px] text-black'>
      <header className='flex items-start justify-between gap-6 border-b border-black pb-3'>
        <div>
          <p className='text-[10px] font-bold tracking-widest uppercase'>
            Dirección General Secundaria Técnica #14 · Zona 014
          </p>
          <h1 className='mt-1 text-[20px] leading-tight font-extrabold'>
            Ficha de Ajuste DUA en Aula
          </h1>
          <p className='text-[11px]'>Instrumento pedagógico oficial · {ciclo}</p>
        </div>
        <div className='text-right text-[11px]'>
          <p className='font-bold'>{folio ? `Dictamen ${folio}` : 'Borrador de trabajo'}</p>
          <p>Documento sin información clínica sensible</p>
        </div>
      </header>

      <section className='mt-4 grid grid-cols-2 gap-x-6 gap-y-1'>
        <p>
          <span className='font-bold'>Alumno:</span> {alumno.nombre}
        </p>
        <p>
          <span className='font-bold'>Grado:</span> {alumno.grado}
        </p>
        <p>
          <span className='font-bold'>Matrícula:</span> {alumno.matricula}
        </p>
        <p>
          <span className='font-bold'>Expediente:</span> {alumno.folio}
        </p>
      </section>

      <section className='mt-5'>
        <h2 className='text-[14px] font-extrabold'>Ajustes Razonables por Grupo de Materias</h2>
        {grupos.map((grupo) => (
          <div key={grupo.id} className='mt-3'>
            <p className='text-[12.5px] font-bold'>{grupo.titulo}</p>
            <p className='text-[11px] italic'>{grupo.principio}</p>
            <ul className='mt-1 list-disc pl-5'>
              {grupo.ajustes.map((ajuste) => (
                <li key={ajuste.titulo}>
                  {ajuste.etiqueta}: {ajuste.titulo}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className='mt-5'>
        <h2 className='text-[14px] font-extrabold'>Validación Legal y Aceptación</h2>
        <table className='mt-2 w-full border-collapse text-[11.5px]'>
          <thead>
            <tr className='border-b border-black text-left'>
              <th className='py-1 pr-3'>Rol</th>
              <th className='py-1 pr-3'>Nombre</th>
              <th className='py-1'>Fecha y hora</th>
            </tr>
          </thead>
          <tbody>
            {firmas.map((firma) => (
              <tr key={firma.id} className='border-b border-gray-300'>
                <td className='py-1 pr-3'>{firma.rol}</td>
                <td className='py-1 pr-3'>{firma.nombre}</td>
                <td className='py-1'>{firma.fecha.replace('Fecha: ', '')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer className='mt-6 border-t border-black pt-2 text-[10.5px]'>
        Generado por NexusEdu · Psicología y SEE. La versión impresa omite información
        clínica sensible del expediente.
      </footer>
    </div>
  )
}
