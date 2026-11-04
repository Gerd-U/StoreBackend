import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import type { NewProduct } from '../../../models/product'
import { secondaryButton } from '../../../shared/components/buttons'
import { TitleBand } from '../../../shared/components/TitleBand'
import { CopyIdButton } from '../components/CopyIdButton'
import { ProductCard } from '../components/ProductCard'
import { getProductById, PRODUCT_NAME_MAX_LENGTH } from '../services/productService'

type ProductDetailState =
  | { status: 'loading'; id: string }
  | { status: 'ready'; id: string; product: NewProduct }
  | { status: 'error'; id: string; message: string }

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [state, setState] = useState<ProductDetailState | null>(null)

  useEffect(() => {
    if (!id) return

    let active = true
    getProductById(id)
      .then((product) => {
        if (active) setState({ status: 'ready', id, product })
      })
      .catch((error: unknown) => {
        if (active) {
          setState({
            status: 'error',
            id,
            message: error instanceof Error ? error.message : 'Error al obtener el producto.',
          })
        }
      })

    return () => {
      active = false
    }
  }, [id])

  const currentState = id && state?.id === id ? state : null
  const product = currentState?.status === 'ready' ? currentState.product : null

  return (
    <section aria-labelledby="product-detail-heading">
      <TitleBand
        id="product-detail-heading"
        title={product?.name ?? 'Detalle del producto'}
        description="Ficha del producto tal como está registrada en el catálogo."
        actions={
          <Link to="/products" className={secondaryButton}>
            <ArrowLeft size={17} strokeWidth={2.4} aria-hidden="true" />
            Volver a productos
          </Link>
        }
      />

      <div className="mx-auto max-w-[90rem] px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
        {!id ? (
          <DetailMessage title="Identificador no válido" body="La dirección no incluye el ID de un producto." />
        ) : !currentState || currentState.status === 'loading' ? (
          <div role="status" className="grid gap-10 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-16">
            <span className="sr-only">Cargando producto…</span>
            <div className="h-72 animate-pulse rounded-[3px] border border-ink/10 bg-card motion-reduce:animate-none" />
            <div className="space-y-4 pt-2">
              <div className="h-5 w-40 animate-pulse rounded-sm bg-ink/[0.07] motion-reduce:animate-none" />
              <div className="h-5 w-72 animate-pulse rounded-sm bg-ink/[0.05] motion-reduce:animate-none" />
            </div>
          </div>
        ) : currentState.status === 'error' ? (
          <DetailMessage title="No encontramos este producto" body={currentState.message} alert />
        ) : (
          <div className="animate-shelf-in grid items-start gap-10 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-16">
            <div className="max-w-sm">
              <ProductCard product={currentState.product} index={0} size="feature" copyable={false} />
            </div>

            <dl className="divide-y divide-line border-y border-line">
              <div className="grid gap-1 py-5 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6">
                <dt className="text-sm text-ink-soft">Product Resource ID</dt>
                <dd className="flex items-center gap-2">
                  <span className="min-w-0 break-all text-sm font-bold tabular-nums">
                    {currentState.product.productResourceId}
                  </span>
                  <CopyIdButton
                    value={currentState.product.productResourceId}
                    productName={currentState.product.name}
                  />
                </dd>
              </div>
              <div className="grid gap-1 py-5 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6">
                <dt className="text-sm text-ink-soft">Largo del nombre</dt>
                <dd className="text-sm tabular-nums">{currentState.product.name.length} de {PRODUCT_NAME_MAX_LENGTH} caracteres</dd>
              </div>
            </dl>
          </div>
        )}
      </div>
    </section>
  )
}

type DetailMessageProps = {
  title: string
  body: string
  alert?: boolean
}

function DetailMessage({ title, body, alert = false }: DetailMessageProps) {
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
