import { useCallback, useEffect, useState } from 'react'
import type { User } from '../../../models/user'
import { getUsers } from '../services/userService'

type UsersState =
  | { status: 'loading'; users: User[]; error: '' }
  | { status: 'ready'; users: User[]; error: '' }
  | { status: 'error'; users: User[]; error: string }

export function useUsers() {
  const [state, setState] = useState<UsersState>({ status: 'loading', users: [], error: '' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let active = true

    getUsers()
      .then((users) => {
        if (active) setState({ status: 'ready', users, error: '' })
      })
      .catch((error: unknown) => {
        if (active) {
          setState({
            status: 'error',
            users: [],
            error: error instanceof Error ? error.message : 'No se pudieron cargar los usuarios.',
          })
        }
      })

    return () => {
      active = false
    }
  }, [attempt])

  const reload = useCallback(() => {
    setState({ status: 'loading', users: [], error: '' })
    setAttempt((value) => value + 1)
  }, [])

  const removeUser = useCallback((userResourceId: string) => {
    setState((current) =>
      current.status === 'ready'
        ? { ...current, users: current.users.filter((user) => user.userResourceId !== userResourceId) }
        : current,
    )
  }, [])

  return { ...state, reload, removeUser }
}
