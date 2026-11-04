import { ArrowRight, Plus, RefreshCw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../../features/products/components/ProductCard'
import { ShelfSkeleton } from '../../features/products/components/ShelfSkeleton'
import { useProducts } from '../../features/products/hooks/useProducts'
import { primaryButton, secondaryButton } from '../components/buttons'

const SHELF_LIMIT = 8

export function HomePage() {
  const { status, products, reload } = useProducts()
  const fan = products.slice(-3)
  const shelf = products.slice(0, SHELF_LIMIT)

  return (
    <>
      <section aria-labelledby="home-heading" className="overflow-hidden bg-sign">
        <div className="mx-auto grid max-w-[90rem] gap-12 px-5 pb-14 pt-12 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:px-12 lg:py-24">
          <div>
            <h1 id="home-heading" className="font-display text-5xl leading-[0.95] tracking-[-0.025em] sm:text-6xl xl:text-[4.75rem]">
              Electrónica, a la vista.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/80">
              Consulta los productos del catálogo, búscalos por nombre o ID y cuelga nuevos en el estante.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className={primaryButton}>
                Abrir el catálogo
                <ArrowRight size={18} strokeWidth={2.5} aria-hidden="true" />
              </Link>
              <Link to="/products/new" className={secondaryButton}>
                <Plus size={18} strokeWidth={2.5} aria-hidden="true" />
                Nuevo producto
              </Link>
            </div>
          </div>

          {fan.length > 0 && (
            <Link to="/products" aria-label="Ver los productos en la vitrina" className="group relative block pt-4">
              <span className="absolute inset-x-0 top-[2.3rem] h-1.5 rounded-full bg-ink/85" aria-hidden="true" />
              <div className="relative grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
                {fan.map((product, i) => (
                  <div key={product.productResourceId} className={i === 0 ? 'hidden sm:block' : undefined}>
                    <ProductCard product={product} index={products.length - fan.length + i} copyable={false} compact />
                  </div>
                ))}
              </div>
            </Link>
          )}
        </div>
      </section>

      <section aria-labelledby="shelf-heading" className="mx-auto max-w-[90rem] px-5 py-14 sm:px-8 lg:px-12 lg:py-24">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div>
            <h2 id="shelf-heading" className="font-display text-2xl leading-tight sm:text-3xl">
              En el estante
            </h2>
            {status === 'ready' && (
              <p className="mt-1.5 text-sm text-ink-soft">
                {products.length} {products.length === 1 ? 'producto registrado' : 'productos registrados'}
              </p>
            )}
          </div>
          {status === 'ready' && products.length > 0 && (
            <Link
              to="/products"
              className="group inline-flex items-center gap-1.5 text-sm font-bold decoration-signal decoration-2 underline-offset-4 hover:underline"
            >
              {products.length > SHELF_LIMIT ? `Ver los ${products.length} productos` : 'Ver el catálogo'}
              <ArrowRight
                size={16}
                strokeWidth={2.4}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          )}
        </div>

        {status === 'loading' ? (
          <div role="status" className="mt-8">
            <span className="sr-only">Cargando productos…</span>
            <ShelfSkeleton />
          </div>
        ) : status === 'error' ? (
          <div role="alert" className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <p className="text-ink-soft">El catálogo no respondió. Revisa que StoreBackend esté corriendo.</p>
            <button type="button" onClick={reload} className={secondaryButton}>
              <RefreshCw size={16} strokeWidth={2.4} aria-hidden="true" />
              Reintentar
            </button>
          </div>
        ) : products.length > 0 ? (
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-[repeat(auto-fill,minmax(13rem,1fr))] sm:gap-x-6 sm:gap-y-8">
            {shelf.map((product, index) => (
              <li
                key={product.productResourceId}
                className="min-w-0 animate-shelf-in"
                style={{ animationDelay: `${index * 40}ms` }}
              >
                <ProductCard product={product} index={index} compact linked copyable={false} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-lg text-ink-soft">
            Aún no hay nada colgado.{' '}
            <Link to="/products/new" className="font-bold text-ink underline decoration-signal decoration-2 underline-offset-4">
              Agrega el primer producto
            </Link>
            .
          </p>
        )}
      </section>
    </>
  )
}
