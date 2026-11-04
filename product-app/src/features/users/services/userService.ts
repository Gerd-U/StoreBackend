import type { User } from '../../../models/user'
import { config } from '../../../config'

const API_URL = `${config.api.URL}/api/users`

export const USER_NAME_MAX_LENGTH = 100
export const USER_EMAIL_MAX_LENGTH = 150

const isUser = (value: unknown): value is User => {
  if (typeof value !== 'object' || value === null) return false

  return (
    'userResourceId' in value &&
    typeof value.userResourceId === 'string' &&
    'name' in value &&
    typeof value.name === 'string' &&
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

export const createUser = async (user: User): Promise<User> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    if (response.status === 409) {
      throw new Error('Ya existe un usuario con ese correo.')
    }
    if (response.status === 400) {
      throw new Error('Revisa el nombre y el correo: el servidor los rechazó.')
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
