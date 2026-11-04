import { useCallback, useEffect, useState } from 'react'
import type { NewProduct } from '../../../models/product'
import { getProducts } from '../services/productService'

type ProductsState =
  | { status: 'loading'; products: NewProduct[]; error: '' }
  | { status: 'ready'; products: NewProduct[]; error: '' }
  | { status: 'error'; products: NewProduct[]; error: string }

export function useProducts() {
  const [state, setState] = useState<ProductsState>({ status: 'loading', products: [], error: '' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let active = true

    getProducts()
      .then((products) => {
        if (active) setState({ status: 'ready', products, error: '' })
      })
      .catch((error: unknown) => {
        if (active) {
          setState({
            status: 'error',
            products: [],
            error: error instanceof Error ? error.message : 'No se pudieron cargar los productos.',
          })
        }
      })

    return () => {
      active = false
    }
  }, [attempt])

  const reload = useCallback(() => {
    setState({ status: 'loading', products: [], error: '' })
    setAttempt((value) => value + 1)
  }, [])

  const removeProduct = useCallback((productResourceId: string) => {
    setState((current) =>
      current.status === 'ready'
        ? {
            ...current,
            products: current.products.filter(
              (product) => product.productResourceId !== productResourceId,
            ),
          }
        : current,
    )
  }, [])

  return { ...state, reload, removeProduct }
}
