import bannerImg from '../../assets/images/BannerLogin.jpg'
import { StatusBadge } from '../../utils/atoms/StatusBadge'
import { AppPreviewImage } from '../../utils/molecules/AppPreviewImage'
import { InclusionQuoteCard } from '../../utils/molecules/InclusionQuoteCard'
import { loginContent } from '../constants/loginContent'

export function HeroPanel() {
  const { statusBadge, heroImageAlt, inclusionQuote } = loginContent.sidePanel

  return (
    <div className="flex flex-col gap-5">
      <div className="flex justify-start">
        <StatusBadge label={statusBadge.label} dotColor={statusBadge.dotColor} />
      </div>
      <div className="relative z-10">
        <AppPreviewImage
          src={bannerImg}
          alt={heroImageAlt}
          className="relative aspect-video transition-all duration-300 ease-out hover:z-20 hover:scale-[1.15] hover:-translate-y-1 hover:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.5)]"
        />
      </div>
      <InclusionQuoteCard
        title={inclusionQuote.title}
        quote={inclusionQuote.quote}
        chips={[...inclusionQuote.chips]}
      />
    </div>
  )
}
