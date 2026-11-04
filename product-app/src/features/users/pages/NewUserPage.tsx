import { useId, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TitleBand } from '../../../shared/components/TitleBand'
import { primaryButton, secondaryButton } from '../../../shared/components/buttons'
import { UserAvatar } from '../components/UserAvatar'
import { createUser, USER_EMAIL_MAX_LENGTH, USER_NAME_MAX_LENGTH } from '../services/userService'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FieldErrors = { name?: string; email?: string }

const fieldClass = (hasError: boolean) =>
  `mt-2 h-14 w-full rounded-md border bg-card px-4 text-lg outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-ink-soft/60 hover:border-ink/30 focus:ring-4 ${
    hasError ? 'border-signal focus:border-signal focus:ring-signal/10' : 'border-line focus:border-wire focus:ring-wire/10'
  }`

export function NewUserPage() {
  const navigate = useNavigate()
  const nameId = useId()
  const emailId = useId()
  const [resourceId] = useState(() => crypto.randomUUID())
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<FieldErrors>({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const trimmedName = name.trim()
  const trimmedEmail = email.trim()

  const validate = (): FieldErrors => {
    const next: FieldErrors = {}
    if (trimmedName.length < 2) {
      next.name = trimmedName ? 'El nombre debe tener al menos 2 caracteres.' : 'Escribe el nombre del usuario.'
    }
    if (!trimmedEmail) {
      next.email = 'Escribe el correo del usuario.'
    } else if (!EMAIL_PATTERN.test(trimmedEmail)) {
      next.email = 'Ese correo no parece válido. Revisa que tenga @ y dominio.'
    }
    return next
  }

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const next = validate()
    setErrors(next)
    setSubmitError('')
    if (next.name || next.email) return

    setIsSubmitting(true)
    try {
      await createUser({ userResourceId: resourceId, name: trimmedName, email: trimmedEmail })
      navigate('/users')
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Error al registrar el usuario.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section aria-labelledby="new-user-heading">
      <TitleBand
        id="new-user-heading"
        title="Nuevo usuario"
        description="Registra a una persona con su nombre y correo. El correo no se puede repetir."
      />

      <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16 lg:px-12 lg:py-14">
        <form onSubmit={submit} noValidate className="max-w-xl space-y-8">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor={nameId} className="text-sm font-bold">
                Nombre completo
              </label>
              <span className="text-sm text-ink-soft tabular-nums">
                {name.length}/{USER_NAME_MAX_LENGTH}
              </span>
            </div>
            <input
              id={nameId}
              value={name}
              maxLength={USER_NAME_MAX_LENGTH}
              autoComplete="name"
              autoFocus
              placeholder="Por ejemplo, Ana Rodríguez"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${nameId}-error` : undefined}
              onChange={(event) => {
                setName(event.target.value)
                if (errors.name) setErrors((current) => ({ ...current, name: undefined }))
              }}
              className={fieldClass(Boolean(errors.name))}
            />
            {errors.name && (
              <p id={`${nameId}-error`} className="mt-2 text-sm font-bold text-signal">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={emailId} className="text-sm font-bold">
              Correo electrónico
            </label>
            <input
              id={emailId}
              type="email"
              value={email}
              maxLength={USER_EMAIL_MAX_LENGTH}
              autoComplete="email"
              inputMode="email"
              placeholder="ana.rodriguez@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? `${emailId}-error` : undefined}
              onChange={(event) => {
                setEmail(event.target.value)
                if (errors.email) setErrors((current) => ({ ...current, email: undefined }))
                if (submitError) setSubmitError('')
              }}
              className={fieldClass(Boolean(errors.email))}
            />
            {errors.email && (
              <p id={`${emailId}-error`} className="mt-2 text-sm font-bold text-signal">
                {errors.email}
              </p>
            )}
          </div>

          {submitError && (
            <p role="alert" className="rounded-md border border-signal/25 bg-signal/[0.04] px-4 py-3 text-sm font-bold text-signal">
              {submitError}
            </p>
          )}

          <div className="flex flex-wrap gap-3 pt-1">
            <button type="submit" className={primaryButton} disabled={isSubmitting}>
              {isSubmitting ? 'Guardando…' : 'Registrar usuario'}
            </button>
            <Link to="/users" className={secondaryButton}>
              Cancelar
            </Link>
          </div>
        </form>

        <aside aria-label="Vista previa del usuario" className="lg:sticky lg:top-10 lg:self-start">
          <p className="mb-4 text-sm text-ink-soft">Así aparecerá en la lista</p>
          <div className="flex items-center gap-4 rounded-[3px] border border-ink/15 bg-card p-5">
            <UserAvatar name={trimmedName || 'Nuevo usuario'} seed={resourceId} size="lg" />
            <div className="min-w-0">
              <p className="truncate font-display text-xl">{trimmedName || 'Nuevo usuario'}</p>
              <p className="mt-1 truncate text-sm text-ink-soft">{trimmedEmail || 'correo@example.com'}</p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
