import type { NewUser, User } from '../../../models/user'
import { config } from '../../../config'

const API_URL = `${config.api.URL}/api/users`

export const USER_NAME_MIN_LENGTH = 2
export const USER_NAME_MAX_LENGTH = 50
export const USER_EMAIL_MAX_LENGTH = 100
export const USERNAME_MIN_LENGTH = 3
export const USERNAME_MAX_LENGTH = 50
export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MAX_LENGTH = 72

const isUser = (value: unknown): value is User => {
  if (typeof value !== 'object' || value === null) return false

  return (
    'userResourceId' in value &&
    typeof value.userResourceId === 'string' &&
    'name' in value &&
    typeof value.name === 'string' &&
    'username' in value &&
    typeof value.username === 'string' &&
    'email' in value &&
    typeof value.email === 'string'
  )
}

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error('Error al obtener los usuarios')
    }

    const payload: unknown = await response.json()
    if (!Array.isArray(payload) || !payload.every(isUser)) {
      throw new Error('La respuesta de usuarios tiene un formato inválido')
    }

    return payload
  } catch (error) {
    console.error('Error en userService:', error)
    throw error
  }
}

export const getUserById = async (userResourceId: string): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/${encodeURIComponent(userResourceId)}`)
    if (response.status === 404) {
      throw new Error('Este usuario no existe o ya fue eliminado.')
    }
    if (!response.ok) {
      throw new Error(`Error al obtener el usuario: ${response.status}`)
    }

    const user: unknown = await response.json()
    if (!isUser(user)) {
      throw new Error('La respuesta del usuario tiene un formato inválido')
    }

    return user
  } catch (error) {
    console.error('Error en userService:', error)
    throw error
  }
}

const BAD_REQUEST_MESSAGES: Record<string, string> = {
  'Username is already taken': 'Ya existe un usuario con ese nombre de usuario.',
  'Email is already taken': 'Ya existe un usuario con ese correo.',
  'Password is too long': 'La contraseña es demasiado larga.',
}

// El backend devuelve { message } para duplicados y un ProblemDetails para validaciones.
const badRequestMessage = async (response: Response): Promise<string> => {
  try {
    const body: unknown = await response.json()
    if (typeof body === 'object' && body !== null && 'message' in body && typeof body.message === 'string') {
      return BAD_REQUEST_MESSAGES[body.message] ?? body.message
    }
  } catch {
    // respuesta sin JSON
  }
  return 'Revisa los datos: el servidor los rechazó.'
}

export const createUser = async (user: NewUser): Promise<User> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    if (response.status === 400) {
      throw new Error(await badRequestMessage(response))
    }
    if (!response.ok) {
      throw new Error(`Error al crear el usuario: ${response.status}`)
    }

    const created: unknown = await response.json()
    if (!isUser(created)) {
      throw new Error('La respuesta del usuario tiene un formato inválido')
    }

    return created
  } catch (error) {
    console.error('Error en userService:', error)
    throw error
  }
}

export const deleteUser = async (userResourceId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${encodeURIComponent(userResourceId)}`, {
      method: 'DELETE',
    })

    if (!response.ok && response.status !== 404) {
      throw new Error(`Error al eliminar el usuario: ${response.status}`)
    }
  } catch (error) {
    console.error('Error en userService:', error)
    throw error
  }
}
