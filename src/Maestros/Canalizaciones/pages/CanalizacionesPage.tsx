import { CanalizacionesForm } from '../organisms/CanalizacionesForm'

export function CanalizacionesPage() {
  const handleEnviar = () => {
    alert('Canalización enviada correctamente.')
  }

  const handleGuardar = () => {
    alert('Borrador guardado.')
  }

  const handleCancelar = () => {
    alert('Acción cancelar/volver.')
  }

  return (
    <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-[15px] py-5">
      <CanalizacionesForm
        onEnviar={handleEnviar}
        onGuardarBorrador={handleGuardar}
        onCancelar={handleCancelar}
      />
    </div>
  )
}
