import { EmailField } from '../../utils/molecules/EmailField'
import { PasswordField } from '../../utils/molecules/PasswordField'
import { RememberSessionCheckbox } from '../../utils/molecules/RememberSessionCheckbox'
import { PrimaryButton } from '../../utils/atoms/PrimaryButton'
import { Icon } from '../../utils/atoms/Icon'
import { loginContent } from '../constants/loginContent'
import type { UseLoginFormResult } from '../hooks/useLoginForm'

interface LoginFormProps {
  form: UseLoginFormResult
}

export function LoginForm({ form }: LoginFormProps) {
  const {
    values,
    errors,
    showPassword,
    isSubmitting,
    setEmail,
    setPassword,
    setRemember,
    togglePassword,
    handleSubmit,
  } = form

  const email = loginContent.loginCard.email
  const password = loginContent.loginCard.password

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
      <EmailField
        label={email.label}
        name="email"
        autoComplete="username"
        placeholder={email.placeholder}
        value={values.email}
        onChange={(e) => setEmail(e.target.value)}
        helperText={email.helperText}
        helperIcon="shield"
        error={errors.email}
      />

      <PasswordField
        label={password.label}
        trailingTag={password.trailingTag}
        leadingIcon="lock"
        name="password"
        autoComplete="current-password"
        placeholder={password.placeholder}
        value={values.password}
        onChange={(e) => setPassword(e.target.value)}
        obscure={!showPassword}
        onToggleVisibility={togglePassword}
        error={errors.password}
      />

      <RememberSessionCheckbox
        label={loginContent.loginCard.remember}
        checked={values.remember}
        onChange={setRemember}
      />

      <PrimaryButton
        label={loginContent.loginCard.submit}
        type="submit"
        leadingIcon="key"
        trailingIcon="arrow-right"
        loading={isSubmitting}
      />

      {errors.form ? (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-[var(--radius-md)] bg-[var(--color-surface-alt)] p-3 text-sm"
        >
          <Icon name="info" size={18} color="var(--color-text-primary)" />
          <span>{errors.form}</span>
        </div>
      ) : null}
    </form>
  )
}
