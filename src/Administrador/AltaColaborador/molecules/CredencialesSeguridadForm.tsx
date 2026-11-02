import { useState } from 'react'

function generarPassword(): string {
  const caracteres = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!#$%'
  const valores = new Uint32Array(14)
  crypto.getRandomValues(valores)
  return Array.from(valores, (valor) => caracteres[valor % caracteres.length]).join('')
}

export { generarPassword }

interface CredencialesSeguridadFormProps {
  email: string
  password: string
  onEmail: (valor: string) => void
  onPassword: (valor: string) => void
}

export function CredencialesSeguridadForm({ email, password, onEmail, onPassword }: CredencialesSeguridadFormProps) {
  const [mostrar, setMostrar] = useState(false)
  return (
    <section className='rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm'>
      <header className='flex items-center gap-4 border-b border-[var(--sa-border)] px-8 py-6'>
        <span className='flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-forest)] text-[18px] font-bold text-[var(--sa-on-accent)]'>2</span>
        <h2 className='text-[28px] font-bold text-[var(--sa-text)]'>Credenciales y Seguridad de Acceso</h2>
      </header>
      <div className='flex flex-col gap-5 px-8 py-6'>
        <div className='flex flex-col gap-2'>
          <label className='text-[20px] font-semibold'>Correo Institucional Generado *</label>
          <input type='email' value={email} onChange={(e) => onEmail(e.target.value)} placeholder='usuario.apellido@colegionorte.edu.mx' className='h-16 rounded-xl border border-[var(--sa-border)] px-4 text-[22px]' />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-[20px] font-semibold'>Teléfono Móvil (Contacto/MFA) *</label>
          <input placeholder='Ej. 55 1234 5678' className='h-16 rounded-xl border border-[var(--sa-border)] px-4 text-[22px]' />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-[20px] font-semibold'>Contraseña Temporal de Primer Acceso *</label>
          <div className='flex items-center gap-3'>
            <input type={mostrar ? 'text' : 'password'} value={password} onChange={(e) => onPassword(e.target.value)} className='h-16 flex-1 rounded-xl border border-[var(--sa-border)] bg-[var(--sa-field)] px-4 text-[22px]' />
            <button type='button' onClick={() => setMostrar((v) => !v)} className='inline-flex h-16 items-center justify-center rounded-xl border border-[var(--sa-border)] px-6 text-[19px] font-semibold'>{mostrar ? 'Ocultar' : 'Ver'}</button>
            <button type='button' onClick={() => navigator.clipboard?.writeText(password)} className='inline-flex h-16 items-center justify-center rounded-xl border border-[var(--sa-border)] px-6 text-[19px] font-semibold'>Copiar</button>
            <button type='button' onClick={() => onPassword(generarPassword())} className='inline-flex h-16 items-center justify-center rounded-xl border border-[var(--sa-border)] px-6 text-[19px] font-semibold'>Regenerar</button>
          </div>
        </div>
      </div>
    </section>
  )
}
