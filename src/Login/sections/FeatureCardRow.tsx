import { FeatureCard } from '../../utils/molecules/FeatureCard'
import { loginContent } from '../constants/loginContent'

export function FeatureCardRow() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {loginContent.sidePanel.featureCards.map((card) => (
        <FeatureCard
          key={card.title}
          icon={card.icon}
          background={card.background}
          title={card.title}
          subtitle={card.subtitle}
          description={'description' in card ? card.description : undefined}
        />
      ))}
    </div>
  )
}
