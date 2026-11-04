import type { NewProduct } from '../../../models/product'
import { ArrowUpRight, RefreshCw, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { iconButton, secondaryButton } from '../../../shared/components/buttons'
import { deleteProduct } from '../services/productService'
import { CopyIdButton } from './CopyIdButton'
import { popTone } from './popTones'
import { useState } from 'react'

type ProductsTableProps = {
  products: NewProduct[]
  status: 'loading' | 'ready' | 'error'
  error: string
  onRetry: () => void
  onDeleted: (productResourceId: string) => void
}

const frame = 'animate-shelf-in overflow-hidden rounded-[3px] border border-line bg-card'

export function ProductsTable({ products, status, error, onRetry, onDeleted }: ProductsTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const handleDelete = async (productResourceId: string) => {
    const confirmed = window.confirm('¿Está seguro de que desea eliminar este producto?')
    if (!confirmed) return

    setDeletingId(productResourceId)
    setDeleteError(null)
    try {
      await deleteProduct(productResourceId)
      onDeleted(productResourceId)
    } catch (deleteError) {
      setDeleteError(
        deleteError instanceof Error ? deleteError.message : 'Error al eliminar el producto.',
      )
    } finally {
      setDeletingId(null)
    }
  }

  if (status === 'loading') {
    return (
      <div role="status" className={frame}>
        <span className="sr-only">Cargando productos…</span>
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="flex items-center gap-4 border-t border-line px-5 py-4 first:border-t-0">
            <div className="h-4 w-1/3 animate-pulse rounded-sm bg-ink/[0.07] motion-reduce:animate-none" />
            <div className="h-4 w-1/4 animate-pulse rounded-sm bg-ink/[0.05] motion-reduce:animate-none" />
          </div>
        ))}
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div role="alert" className="animate-shelf-in flex flex-col items-start gap-4 rounded-[3px] border border-signal/25 bg-signal/[0.04] px-6 py-8">
        <p className="font-display text-2xl">No se pudo abrir el estante</p>
        <p className="text-sm text-ink-soft">
          Detalle: <span className="font-bold text-signal">{error || 'Error al obtener los productos.'}</span>
        </p>
        <button type="button" onClick={onRetry} className={secondaryButton}>
          <RefreshCw size={16} strokeWidth={2.4} aria-hidden="true" />
          Reintentar
        </button>
      </div>
    )
  }

  return (
    <>
      {deleteError && (
        <p role="alert" className="mb-4 rounded-[3px] border border-signal/25 bg-signal/[0.04] px-4 py-3 text-sm font-bold text-signal">
          {deleteError}
        </p>
      )}
      <div className={`${frame} overflow-x-auto`}>
        <table className="w-full min-w-[36rem] border-collapse text-left">
          <caption className="sr-only">Productos del catálogo</caption>
          <thead>
            <tr className="border-b border-line bg-paper-2/60 text-xs text-ink-soft">
              <th scope="col" className="px-5 py-3 font-bold">
                Producto
              </th>
              <th scope="col" className="px-5 py-3 font-bold">
                Resource ID
              </th>
              <th scope="col" className="w-28 px-5 py-3">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              const isDeleting = deletingId === product.productResourceId
              return (
                <tr
                  key={product.productResourceId}
                  className={`group border-t border-line transition-colors duration-150 first:border-t-0 hover:bg-paper/70 ${isDeleting ? 'opacity-50' : ''}`}
                >
                  <td className="px-5 py-3.5">
                    <Link
                      to={`/products/${product.productResourceId}`}
                      className="inline-flex items-center gap-3 font-bold decoration-signal decoration-2 underline-offset-4 hover:underline"
                    >
                      <span className={`size-2 shrink-0 rounded-full ${popTone(index).dot}`} aria-hidden="true" />
                      {product.name}
                      <ArrowUpRight
                        size={15}
                        strokeWidth={2.4}
                        aria-hidden="true"
                        className="-translate-x-1 text-ink-soft opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </Link>
                  </td>
                  <td className="px-5 py-3.5 text-[0.8125rem] font-medium text-ink-soft tabular-nums">
                    {product.productResourceId}
                  </td>
                  <td className="px-4 py-2">
                    <span className="flex items-center justify-end gap-1">
                      <CopyIdButton value={product.productResourceId} productName={product.name} />
                      <button
                        type="button"
                        onClick={() => void handleDelete(product.productResourceId)}
                        disabled={deletingId !== null}
                        title={isDeleting ? `Eliminando ${product.name}…` : `Eliminar ${product.name}`}
                        aria-label={`Eliminar ${product.name}`}
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
