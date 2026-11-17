import { ArrowUpRight, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { User } from '../../../models/user'
import { iconButton } from '../../../shared/components/buttons'
import { deleteUser } from '../services/userService'
import { UserAvatar } from './UserAvatar'

type UsersTableProps = {
  users: User[]
  onDeleted: (userResourceId: string) => void
}

export function UsersTable({ users, onDeleted }: UsersTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const handleDelete = async (user: User) => {
    const confirmed = window.confirm(`¿Eliminar a ${user.username}? Esta acción no se puede deshacer.`)
    if (!confirmed) return

    setDeletingId(user.userResourceId)
    setDeleteError(null)
    try {
      await deleteUser(user.userResourceId)
      onDeleted(user.userResourceId)
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : 'Error al eliminar el usuario.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <>
      {deleteError && (
        <p role="alert" className="mb-4 rounded-[3px] border border-signal/25 bg-signal/[0.04] px-4 py-3 text-sm font-bold text-signal">
          {deleteError}
        </p>
      )}
      <div className="animate-shelf-in overflow-x-auto rounded-[3px] border border-line bg-card">
        <table className="w-full border-collapse text-left sm:min-w-[38rem]">
          <caption className="sr-only">Usuarios registrados</caption>
          <thead>
            <tr className="border-b border-line bg-paper-2/60 text-xs text-ink-soft">
              <th scope="col" className="px-5 py-3 font-bold">
                Usuario
              </th>
              <th scope="col" className="w-14 px-3 py-3 sm:w-20 sm:px-5">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const isDeleting = deletingId === user.userResourceId
              return (
                <tr
                  key={user.userResourceId}
                  className={`group border-t border-line transition-colors duration-150 first:border-t-0 hover:bg-paper/70 ${isDeleting ? 'opacity-50' : ''}`}
                >
                  <td className="min-w-0 px-4 py-3 sm:px-5">
                    <Link
                      to={`/users/${user.userResourceId}`}
                      className="inline-flex min-w-0 items-center gap-3 font-bold decoration-signal decoration-2 underline-offset-4 hover:underline"
                    >
                      <UserAvatar name={user.username} seed={user.userResourceId} />
                      <span className="min-w-0 truncate">{user.username}</span>
                      <ArrowUpRight
                        size={15}
                        strokeWidth={2.4}
                        aria-hidden="true"
                        className="-translate-x-1 text-ink-soft opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </Link>
                  </td>
                  <td className="px-3 py-2 sm:px-4">
                    <span className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => void handleDelete(user)}
                        disabled={deletingId !== null}
                        title={isDeleting ? `Eliminando a ${user.username}…` : `Eliminar a ${user.username}`}
                        aria-label={`Eliminar a ${user.username}`}
                        className={`${iconButton} hover:bg-signal/10 hover:text-signal`}
                      >
                        <Trash2 size={16} strokeWidth={2.1} aria-hidden="true" />
                      </button>
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
