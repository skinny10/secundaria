import { ModuleCard } from './ModuleCard'
import { duaModules } from '../constants/modules'

export function ModulesGrid() {
  return (
    <section
      aria-label="Módulos de pautas DUA"
      className="grid w-full grid-cols-1 gap-4 min-[900px]:grid-cols-[repeat(2,minmax(0,1fr))]"
    >
      {duaModules.map((duaModule) => (
        <ModuleCard key={duaModule.id} duaModule={duaModule} />
      ))}
    </section>
  )
}
