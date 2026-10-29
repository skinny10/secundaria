interface DatosPersonalesFormProps {}

export function DatosPersonalesForm({}: DatosPersonalesFormProps) {
  return (
    <section className='rounded-2xl border border-[var(--sa-border)] bg-[var(--sa-card)] shadow-sm'>
      <header className='flex items-center gap-4 border-b border-[var(--sa-border)] px-8 py-6'>
        <span className='flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-forest)] text-[18px] font-bold text-[var(--sa-on-accent)]'>1</span>
        <h2 className='text-[28px] font-bold text-[var(--sa-text)]'>Datos Personales del Colaborador</h2>
      </header>
      <div className='grid gap-5 px-8 py-6 sm:grid-cols-2'>
        <div className='flex flex-col gap-2'>
          <label className='text-[20px] font-semibold'>Nombre(s) *</label>
          <input placeholder='Ej. Ana María' className='h-16 rounded-xl border border-[var(--sa-border)] px-4 text-[22px]' />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-[20px] font-semibold'>Primer Apellido *</label>
          <input placeholder='Ej. López' className='h-16 rounded-xl border border-[var(--sa-border)] px-4 text-[22px]' />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-[20px] font-semibold'>Segundo Apellido</label>
          <input placeholder='Ej. Ramírez' className='h-16 rounded-xl border border-[var(--sa-border)] px-4 text-[22px]' />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-[20px] font-semibold'>CURP Registrada *</label>
          <input placeholder='Ej. LORA900101MDFRNN09' className='h-16 rounded-xl border border-[var(--sa-border)] px-4 text-[22px]' />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-[20px] font-semibold'>Cédula Prof. / N.º Empleado *</label>
          <input placeholder='Ej. 12345678' className='h-16 rounded-xl border border-[var(--sa-border)] px-4 text-[22px]' />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='text-[20px] font-semibold'>Jornada y Turno Asignado *</label>
          <select className='h-16 rounded-xl border border-[var(--sa-border)] px-4 text-[22px]'>
            <option>Seleccione...</option>
            <option>Matutino</option>
            <option>Vespertino</option>
            <option>Completo</option>
          </select>
        </div>
      </div>
    </section>
  )
}
