import { IconTile } from '../../utils/atoms/IconTile'
import { InfoNotice } from '../../utils/molecules/InfoNotice'
import { LoginForm } from './LoginForm'
import { loginContent } from '../constants/loginContent'
import type { UseLoginFormResult } from '../hooks/useLoginForm'

function InstitutionHeader() {
  return (
    <div className="flex items-start gap-4">
      <IconTile icon="person" background="green" size="lg" />
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">
          {loginContent.loginCard.platformLabel}
        </span>
        <h2 className="text-base font-bold leading-tight">
          {loginContent.loginCard.institutionName}
        </h2>
        <p className="text-sm text-[var(--color-text-placeholder)]">
          {loginContent.loginCard.subsystem}
        </p>
      </div>
    </div>
  )
}

function LoginHeading() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-[40px] font-bold leading-tight">{loginContent.loginCard.heading}</h1>
      <p className="text-base text-[var(--color-steel)]">{loginContent.loginCard.subtitle}</p>
    </div>
  )
}

interface LoginCardProps {
  form: UseLoginFormResult
}

export function LoginCard({ form }: LoginCardProps) {
  return (
    <section className="flex flex-col gap-6 rounded-[var(--radius-lg)] bg-[var(--color-card)] p-6 md:p-8 shadow-[var(--shadow-md)]">
      <InstitutionHeader />
      <LoginHeading />
      <LoginForm form={form} />

      <a
        href="#recuperar"
        className="text-sm font-bold text-[var(--color-accent)] underline underline-offset-4 self-start min-h-[var(--size-min-touch)] flex items-center transition-colors hover:text-[var(--color-logo)]"
      >
        {loginContent.loginCard.forgotPassword}
      </a>

      <div className="flex flex-col gap-3">
        {loginContent.loginCard.notices.map((notice) => (
          <InfoNotice
            key={notice.title}
            icon={notice.icon}
            title={notice.title}
            body={notice.body}
            tone={notice.tone}
          />
        ))}
      </div>
    </section>
  )
}
