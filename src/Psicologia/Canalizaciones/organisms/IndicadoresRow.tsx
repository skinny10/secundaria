import { useTheme } from '../../../utils/hooks/useTheme'
import { IndicadorCard } from '../molecules/IndicadorCard'
import type { Indicador } from '../types'

interface IndicadoresRowProps {
  indicadores: Indicador[]
}

export function IndicadoresRow({ indicadores }: IndicadoresRowProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section className='grid w-full min-w-0 grid-cols-1 gap-[10px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
      {indicadores.map((indicador) => (
        <IndicadorCard key={indicador.id} indicador={indicador} isDark={isDark} />
      ))}
    </section>
  )
}
