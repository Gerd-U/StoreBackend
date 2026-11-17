import { ArrowLeft, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import type { User } from '../../../models/user'
import { secondaryButton } from '../../../shared/components/buttons'
import { TitleBand } from '../../../shared/components/TitleBand'
import { CopyIdButton } from '../../products/components/CopyIdButton'
import { UserAvatar } from '../components/UserAvatar'
import { deleteUser, getUserById } from '../services/userService'

type UserDetailState =
  | { status: 'loading'; id: string }
  | { status: 'ready'; id: string; user: User }
  | { status: 'error'; id: string; message: string }

export function UserDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [state, setState] = useState<UserDetailState | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  useEffect(() => {
    if (!id) return

    let active = true
    getUserById(id)
      .then((user) => {
        if (active) setState({ status: 'ready', id, user })
      })
      .catch((error: unknown) => {
        if (active) {
          setState({
            status: 'error',
            id,
            message: error instanceof Error ? error.message : 'Error al obtener el usuario.',
          })
        }
      })

    return () => {
      active = false
    }
  }, [id])

  const currentState = id && state?.id === id ? state : null
  const user = currentState?.status === 'ready' ? currentState.user : null

  const handleDelete = async () => {
    if (!user) return
    const confirmed = window.confirm(`¿Eliminar a ${user.name}? Esta acción no se puede deshacer.`)
    if (!confirmed) return

    setIsDeleting(true)
    setDeleteError('')
    try {
      await deleteUser(user.userResourceId)
      navigate('/users')
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : 'Error al eliminar el usuario.')
      setIsDeleting(false)
    }
  }

  return (
    <section aria-labelledby="user-detail-heading">
      <TitleBand
        id="user-detail-heading"
        title={user?.name ?? 'Detalle del usuario'}
        description="Datos del usuario tal como están registrados."
        actions={
          <Link to="/users" className={secondaryButton}>
            <ArrowLeft size={17} strokeWidth={2.4} aria-hidden="true" />
            Volver a usuarios
          </Link>
        }
      />

      <div className="mx-auto max-w-[90rem] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        {!id ? (
          <Message title="Identificador no válido" body="La dirección no incluye el ID de un usuario." />
        ) : !currentState || currentState.status === 'loading' ? (
          <div role="status" className="flex items-center gap-6">
            <span className="sr-only">Cargando usuario…</span>
            <div className="size-20 animate-pulse rounded-full bg-ink/[0.07] motion-reduce:animate-none" />
            <div className="space-y-3">
              <div className="h-5 w-48 animate-pulse rounded-sm bg-ink/[0.07] motion-reduce:animate-none" />
              <div className="h-4 w-64 animate-pulse rounded-sm bg-ink/[0.05] motion-reduce:animate-none" />
            </div>
          </div>
        ) : currentState.status === 'error' ? (
          <Message title="No encontramos este usuario" body={currentState.message} alert />
        ) : (
          <div className="animate-shelf-in grid items-start gap-10 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-16">
            <div className="flex items-center gap-5 lg:flex-col lg:items-start">
              <UserAvatar name={currentState.user.name} seed={currentState.user.userResourceId} size="lg" />
              <button
                type="button"
                onClick={() => void handleDelete()}
                disabled={isDeleting}
                className="press inline-flex h-11 items-center gap-2 rounded-full px-4 text-sm font-bold text-signal hover:bg-signal/10 disabled:pointer-events-none disabled:opacity-50"
              >
                <Trash2 size={16} strokeWidth={2.2} aria-hidden="true" />
                {isDeleting ? 'Eliminando…' : 'Eliminar usuario'}
              </button>
            </div>

            <div>
              {deleteError && (
                <p role="alert" className="mb-4 rounded-md border border-signal/25 bg-signal/[0.04] px-4 py-3 text-sm font-bold text-signal">
                  {deleteError}
                </p>
              )}
              <dl className="divide-y divide-line border-y border-line">
                <div className="grid gap-1 py-5 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6">
                  <dt className="text-sm text-ink-soft">Usuario</dt>
                  <dd className="font-bold">@{currentState.user.username}</dd>
                </div>
                <div className="grid gap-1 py-5 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6">
                  <dt className="text-sm text-ink-soft">Correo</dt>
                  <dd>
                    <a
                      href={`mailto:${currentState.user.email}`}
                      className="font-bold decoration-signal decoration-2 underline-offset-4 hover:underline"
                    >
                      {currentState.user.email}
                    </a>
                  </dd>
                </div>
                <div className="grid gap-1 py-5 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6">
                  <dt className="text-sm text-ink-soft">User Resource ID</dt>
                  <dd className="flex items-center gap-2">
                    <span className="min-w-0 break-all text-sm font-bold tabular-nums">
                      {currentState.user.userResourceId}
                    </span>
                    <CopyIdButton value={currentState.user.userResourceId} productName={currentState.user.name} />
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

type MessageProps = {
  title: string
  body: string
  alert?: boolean
}

function Message({ title, body, alert = false }: MessageProps) {
  return (
    <div
      role={alert ? 'alert' : undefined}
      className={`animate-shelf-in flex max-w-2xl flex-col items-start gap-3 rounded-[3px] border px-6 py-10 sm:px-10 ${
        alert ? 'border-signal/25 bg-signal/[0.04]' : 'border-dashed border-ink/20'
      }`}
    >
      <h2 className="font-display text-2xl sm:text-3xl">{title}</h2>
      <p className="text-ink-soft">{body}</p>
    </div>
  )
}
