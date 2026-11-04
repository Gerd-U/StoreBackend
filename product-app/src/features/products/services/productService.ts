import type { NewProduct } from '../../../models/product'
import { config } from '../../../config'

const API_URL = `${config.api.URL}/api/products`
let locallyAddedProducts: NewProduct[] = []

export const PRODUCT_NAME_MAX_LENGTH = 50

const isProduct = (value: unknown): value is NewProduct => {
  if (typeof value !== 'object' || value === null) return false

  return (
    'name' in value &&
    typeof value.name === 'string' &&
    'productResourceId' in value &&
    typeof value.productResourceId === 'string'
  )
}

export const addProduct = (product: NewProduct): NewProduct => {
  locallyAddedProducts = [...locallyAddedProducts, product]
  return product
}

export const getProductById = async (productResourceId: string): Promise<NewProduct> => {
  try {
    const response = await fetch(`${API_URL}/${encodeURIComponent(productResourceId)}`)

    if (!response.ok) {
      throw new Error(`Error al obtener el producto: ${response.status}`)
    }

    const product: unknown = await response.json()
    if (!isProduct(product)) {
      throw new Error('La respuesta del producto tiene un formato inválido')
    }

    return product
  } catch (error) {
    console.error('Error en productService:', error)
    throw error
  }
}

export const getProducts = async (): Promise<NewProduct[]> => {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error('Error al obtener los productos')
    }

    const payload: unknown = await response.json()
    if (!Array.isArray(payload) || !payload.every(isProduct)) {
      throw new Error('La respuesta de productos tiene un formato inválido')
    }

    return [...payload, ...locallyAddedProducts]
  } catch (error) {
    console.error('Error en productService:', error)
    throw error
  }
}

export const createProduct = async (product: NewProduct): Promise<void> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })

    if (!response.ok) {
      throw new Error(`Error al crear el producto: ${response.status}`)
    }
  } catch (error) {
    console.error('Error en productService:', error)
    throw error
  }
}

export const deleteProduct = async (productResourceId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${encodeURIComponent(productResourceId)}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error(`Error al eliminar el producto: ${response.status}`)
    }

    locallyAddedProducts = locallyAddedProducts.filter(
      (product) => product.productResourceId !== productResourceId,
    )
  } catch (error) {
    console.error('Error en productService:', error)
    throw error
  }
}

export const createResourceId = (): string => crypto.randomUUID()
