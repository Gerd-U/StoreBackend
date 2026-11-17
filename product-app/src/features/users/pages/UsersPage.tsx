import { RefreshCw, Search, UserPlus, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { TitleBand } from '../../../shared/components/TitleBand'
import { primaryButton, secondaryButton } from '../../../shared/components/buttons'
import { UsersTable } from '../components/UsersTable'
import { useUsers } from '../hooks/useUsers'

export function UsersPage() {
  const { status, users, error, reload, removeUser } = useUsers()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''

  const needle = query.trim().toLowerCase()
  const visible = needle
    ? users.filter((user) =>
        [user.name, user.username, user.email].some((value) => value.toLowerCase().includes(needle)),
      )
    : users

  const setQuery = (value: string) => {
    setSearchParams(value ? { q: value } : {}, { replace: true })
  }

  const countLabel =
    status === 'loading'
      ? 'Consultando los usuarios…'
      : status === 'error'
        ? 'Los usuarios no respondieron'
        : `${users.length} ${users.length === 1 ? 'usuario registrado' : 'usuarios registrados'}`

  return (
    <section aria-labelledby="users-heading">
      <TitleBand
        id="users-heading"
        title="Usuarios"
        description={countLabel}
        actions={
          <Link to="/users/new" className={primaryButton}>
            <UserPlus size={17} strokeWidth={2.4} aria-hidden="true" />
            Nuevo usuario
          </Link>
        }
      />

      <div className="mx-auto max-w-[90rem] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        {status === 'ready' && users.length > 0 && (
          <label className="mb-8 flex h-11 w-full items-center gap-2.5 rounded-full border border-line bg-card px-4 text-ink-soft transition-[border-color,box-shadow] duration-200 hover:border-ink/30 focus-within:border-wire focus-within:text-ink focus-within:ring-4 focus-within:ring-wire/10 sm:max-w-md">
            <Search size={17} strokeWidth={2.2} className="shrink-0" aria-hidden="true" />
            <span className="sr-only">Buscar usuarios por nombre, usuario o correo</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nombre, usuario o correo"
              className="min-w-0 flex-1 bg-transparent text-[0.9375rem] text-ink outline-none placeholder:text-ink-soft/80 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Limpiar búsqueda"
                className="press grid size-7 place-items-center rounded-full text-ink-soft hover:bg-paper-2 hover:text-ink"
              >
                <X size={16} strokeWidth={2.5} aria-hidden="true" />
              </button>
            )}
          </label>
        )}

        {needle && visible.length > 0 && (
          <p className="-mt-4 mb-6 text-sm text-ink-soft" aria-live="polite">
            {visible.length} de {users.length} coinciden con “{query.trim()}”
          </p>
        )}

        {status === 'loading' ? (
          <div role="status" className="overflow-hidden rounded-[3px] border border-line bg-card">
            <span className="sr-only">Cargando usuarios…</span>
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="flex items-center gap-4 border-t border-line px-5 py-3.5 first:border-t-0">
                <div className="size-9 animate-pulse rounded-full bg-ink/[0.07] motion-reduce:animate-none" />
                <div className="h-4 w-1/4 animate-pulse rounded-sm bg-ink/[0.07] motion-reduce:animate-none" />
                <div className="h-4 w-1/3 animate-pulse rounded-sm bg-ink/[0.05] motion-reduce:animate-none" />
              </div>
            ))}
          </div>
        ) : status === 'error' ? (
          <Notice
            alert
            title="No se pudieron cargar los usuarios"
            body="El servidor no respondió. Revisa que StoreBackend esté corriendo y que la tabla User exista."
            detail={error}
            action={
              <button type="button" onClick={reload} className={secondaryButton}>
                <RefreshCw size={16} strokeWidth={2.4} aria-hidden="true" />
                Reintentar
              </button>
            }
          />
        ) : users.length === 0 ? (
          <Notice
            title="Todavía no hay usuarios"
            body="Registra el primero con su nombre, usuario, correo y contraseña; aparecerá aquí."
            action={
              <Link to="/users/new" className={primaryButton}>
                <UserPlus size={17} strokeWidth={2.4} aria-hidden="true" />
                Nuevo usuario
              </Link>
            }
          />
        ) : visible.length === 0 ? (
          <Notice
            title={`Nadie con “${query.trim()}”`}
            body="Ningún usuario coincide con esa búsqueda."
            action={
              <button type="button" onClick={() => setQuery('')} className={secondaryButton}>
                Limpiar búsqueda
              </button>
            }
          />
        ) : (
          <UsersTable key={needle} users={visible} onDeleted={removeUser} />
        )}
      </div>
    </section>
  )
}

type NoticeProps = {
  title: string
  body: string
  action: ReactNode
  detail?: string
  alert?: boolean
}

function Notice({ title, body, action, detail, alert = false }: NoticeProps) {
  return (
    <div
      role={alert ? 'alert' : undefined}
      className={`animate-shelf-in flex flex-col items-start gap-4 rounded-[3px] border px-6 py-12 sm:px-10 ${
        alert ? 'border-signal/25 bg-signal/[0.04]' : 'border-dashed border-ink/20'
      }`}
    >
      <h2 className="font-display text-2xl leading-tight sm:text-3xl">{title}</h2>
      <p className="max-w-lg text-base leading-relaxed text-ink-soft">{body}</p>
      {detail && (
        <p className="text-sm text-ink-soft">
          Detalle: <span className="font-bold text-signal">{detail}</span>
        </p>
      )}
      <div className="pt-2">{action}</div>
    </div>
  )
}
