import { LayoutGrid, Plus, RefreshCw, Rows3, Search, X } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { TitleBand } from '../../../shared/components/TitleBand'
import { primaryButton, secondaryButton } from '../../../shared/components/buttons'
import { ProductList } from '../components/ProductList'
import { ProductsTable } from '../components/ProductsTable'
import { ShelfSkeleton } from '../components/ShelfSkeleton'
import { useProducts } from '../hooks/useProducts'

type View = 'vitrina' | 'lista'

const VIEW_KEY = 'producthub:view'

const readView = (): View => {
  try {
    return localStorage.getItem(VIEW_KEY) === 'lista' ? 'lista' : 'vitrina'
  } catch {
    return 'vitrina'
  }
}

const VIEWS: { id: View; label: string; icon: typeof LayoutGrid }[] = [
  { id: 'vitrina', label: 'Vitrina', icon: LayoutGrid },
  { id: 'lista', label: 'Lista', icon: Rows3 },
]

export function ProductsPage() {
  const { status, products, error: loadError, reload, removeProduct } = useProducts()
  const isLoading = status === 'loading'
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const [view, setView] = useState<View>(readView)

  const needle = query.trim().toLowerCase()
  const visible = needle
    ? products.filter(
        (product) =>
          product.name.toLowerCase().includes(needle) ||
          product.productResourceId.toLowerCase().includes(needle),
      )
    : products

  const setQuery = (value: string) => {
    setSearchParams(value ? { q: value } : {}, { replace: true })
  }

  const chooseView = (next: View) => {
    setView(next)
    try {
      localStorage.setItem(VIEW_KEY, next)
    } catch {
      // The view still switches; it just won't be remembered.
    }
  }

  const countLabel = isLoading
    ? 'Consultando el catálogo…'
    : loadError
      ? 'El catálogo no respondió'
      : `${products.length} ${products.length === 1 ? 'producto' : 'productos'} en el estante`

  return (
    <section aria-labelledby="products-heading">
      <TitleBand
        id="products-heading"
        title="Productos"
        description={countLabel}
        actions={
          <Link to="/products/new" className={primaryButton}>
            <Plus size={18} strokeWidth={2.5} aria-hidden="true" />
            Nuevo producto
          </Link>
        }
      />

      <div className="mx-auto max-w-[90rem] px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        {status === 'ready' && products.length > 0 && (
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <label className="group flex h-11 w-full items-center gap-2.5 rounded-full border border-line bg-card px-4 text-ink-soft transition-[border-color,box-shadow] duration-200 hover:border-ink/30 focus-within:border-wire focus-within:text-ink focus-within:ring-4 focus-within:ring-wire/10 sm:max-w-md">
              <Search size={17} strokeWidth={2.2} className="shrink-0" aria-hidden="true" />
              <span className="sr-only">Buscar productos por nombre o ID</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por nombre o ID"
                className="min-w-0 flex-1 bg-transparent text-[0.9375rem] text-ink outline-none placeholder:text-ink-soft/80 [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Limpiar búsqueda"
                  className="press grid size-7 place-items-center rounded-full text-ink-soft hover:bg-paper-2 hover:text-ink"
                >
                  <X size={16} strokeWidth={2.5} aria-hidden="true" />
                </button>
              )}
            </label>

            <div role="group" aria-label="Vista del catálogo" className="flex h-11 w-fit items-center gap-1 rounded-full bg-paper-2 p-1">
              {VIEWS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={view === id}
                  onClick={() => chooseView(id)}
                  className={`press flex h-9 items-center gap-2 rounded-full px-4 text-sm font-bold ${
                    view === id ? 'bg-card text-ink' : 'text-ink-soft hover:text-ink'
                  }`}
                >
                  <Icon size={15} strokeWidth={2.4} aria-hidden="true" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}

        {needle && visible.length > 0 && (
          <p className="-mt-5 mb-8 text-sm text-ink-soft" aria-live="polite">
            {visible.length} de {products.length} coinciden con “{query.trim()}”
          </p>
        )}

        {isLoading && view === 'vitrina' ? (
          <div role="status">
            <span className="sr-only">Cargando productos…</span>
            <ShelfSkeleton />
          </div>
        ) : loadError && view === 'vitrina' ? (
          <EmptyShelf
            alert
            title="No se pudo abrir el estante"
            body="El catálogo no respondió. Revisa que StoreBackend esté corriendo y vuelve a intentarlo."
            detail={loadError}
            action={
              <button type="button" onClick={reload} className={secondaryButton}>
                <RefreshCw size={16} strokeWidth={2.4} aria-hidden="true" />
                Reintentar
              </button>
            }
          />
        ) : status === 'ready' && products.length === 0 ? (
          <EmptyShelf
            title="El estante está vacío"
            body="Todavía no hay productos en el catálogo. Cuelga el primero y aparecerá aquí."
            action={
              <Link to="/products/new" className={primaryButton}>
                <Plus size={18} strokeWidth={2.5} aria-hidden="true" />
                Nuevo producto
              </Link>
            }
          />
        ) : status === 'ready' && visible.length === 0 ? (
          <EmptyShelf
            title={`Nada con “${query.trim()}”`}
            body="Ningún producto coincide con ese nombre o ID. Prueba con menos letras o revisa el ID."
            action={
              <button type="button" onClick={() => setQuery('')} className={secondaryButton}>
                Limpiar búsqueda
              </button>
            }
          />
        ) : view === 'lista' ? (
          <ProductsTable
            key={`lista-${needle}`}
            products={visible}
            status={status}
            error={loadError}
            onRetry={reload}
            onDeleted={removeProduct}
          />
        ) : (
          <ProductList key={`vitrina-${needle}`} products={visible} />
        )}
      </div>
    </section>
  )
}

type EmptyShelfProps = {
  title: string
  body: string
  action: ReactNode
  detail?: string
  alert?: boolean
}

function EmptyShelf({ title, body, action, detail, alert = false }: EmptyShelfProps) {
  return (
    <div
      role={alert ? 'alert' : undefined}
      className={`animate-shelf-in flex flex-col items-start gap-4 rounded-[3px] border px-6 py-12 sm:px-10 ${
        alert ? 'border-signal/25 bg-signal/[0.04]' : 'border-dashed border-ink/20'
      }`}
    >
      <h2 className="font-display text-2xl leading-tight sm:text-3xl">{title}</h2>
      <p className="max-w-lg text-base leading-relaxed text-ink-soft">{body}</p>
      {detail && (
        <p className="text-sm text-ink-soft">
          Detalle: <span className="font-bold text-signal">{detail}</span>
        </p>
      )}
      <div className="pt-2">{action}</div>
    </div>
  )
}
