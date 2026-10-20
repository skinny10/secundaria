import { HeroPanel } from './HeroPanel'
import { FeatureCardRow } from './FeatureCardRow'

export function SidePanel() {
  return (
    <aside
      className="hidden lg:flex flex-col gap-6 rounded-[var(--radius-lg)] p-5 md:p-6"
      style={{ backgroundImage: 'var(--gradient-side)' }}
    >
      <HeroPanel />
      <FeatureCardRow />
    </aside>
  )
}
