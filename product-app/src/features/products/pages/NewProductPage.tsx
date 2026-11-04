import { RefreshCw } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TitleBand } from '../../../shared/components/TitleBand'
import { iconButton, primaryButton, secondaryButton } from '../../../shared/components/buttons'
import type { NewProduct } from '../../../models/product'
import { ProductCard } from '../components/ProductCard'
import { createProduct, createResourceId, PRODUCT_NAME_MAX_LENGTH } from '../services/productService'

export function NewProductPage() {
  const navigate = useNavigate()
  const nameId = useId()
  const errorId = useId()
  const [name, setName] = useState('')
  const [resourceId, setResourceId] = useState(createResourceId)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // The preview hangs where the new card will land on the shelf.
  const nextIndex = 0
  const trimmed = name.trim()

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (trimmed.length < 2) {
      setError(trimmed ? 'El nombre debe tener al menos 2 caracteres.' : 'Escribe un nombre para el producto.')
      return
    }

    const request: NewProduct = { name: trimmed, productResourceId: resourceId }
    setError('')
    setIsSubmitting(true)
    try {
      await createProduct(request)
      navigate('/products')
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Error al registrar el producto.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section aria-labelledby="new-product-heading">
      <TitleBand
        id="new-product-heading"
        title="Nuevo producto"
        description="Escribe el nombre y mira cómo queda su ficha antes de colgarla en el estante."
      />

      <div className="mx-auto grid max-w-[90rem] gap-12 px-5 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16 lg:px-12 lg:py-14">
        <form onSubmit={submit} noValidate className="max-w-xl space-y-9">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor={nameId} className="text-sm font-bold">
                Nombre del producto
              </label>
              <span className={`text-sm tabular-nums ${name.length >= PRODUCT_NAME_MAX_LENGTH ? 'font-bold text-signal' : 'text-ink-soft'}`}>
                {name.length}/{PRODUCT_NAME_MAX_LENGTH}
              </span>
            </div>
            <input
              id={nameId}
              value={name}
              maxLength={PRODUCT_NAME_MAX_LENGTH}
              autoComplete="off"
              autoFocus
              placeholder="Por ejemplo, Noise Cancelling Earbuds"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? errorId : undefined}
              onChange={(event) => {
                setName(event.target.value)
                if (error) setError('')
              }}
              className={`mt-2 h-14 w-full rounded-md border bg-card px-4 text-lg outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-ink-soft/60 hover:border-ink/30 focus:ring-4 ${
                error ? 'border-signal focus:border-signal focus:ring-signal/10' : 'border-line focus:border-wire focus:ring-wire/10'
              }`}
            />
            {error && (
              <p id={errorId} role="alert" className="mt-2 text-sm font-bold text-signal">
                {error}
              </p>
            )}
          </div>

          <div>
            <p className="text-sm font-bold">Resource ID</p>
            <p className="mt-1 text-sm text-ink-soft">Se genera solo. Cámbialo si quieres otro.</p>
            <div className="mt-2 flex items-center gap-2">
              <output className="flex h-12 min-w-0 flex-1 items-center truncate rounded-md bg-paper-2 px-4 text-sm font-bold tabular-nums">
                {resourceId}
              </output>
              <button
                type="button"
                onClick={() => setResourceId(createResourceId())}
                aria-label="Generar otro Resource ID"
                className={`${iconButton} size-12 border border-line bg-card`}
              >
                <RefreshCw size={17} strokeWidth={2.2} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button type="submit" className={primaryButton} disabled={isSubmitting}>
              {isSubmitting ? 'Guardando...' : 'Colgar en el estante'}
            </button>
            <Link to="/products" className={secondaryButton}>
              Cancelar
            </Link>
          </div>
        </form>

        <aside aria-label="Vista previa de la ficha" className="lg:sticky lg:top-10 lg:self-start">
          <p className="mb-4 text-sm text-ink-soft">Así se verá en la vitrina</p>
          <div className="max-w-xs">
            <ProductCard
              product={{ name: trimmed || 'Tu producto', productResourceId: resourceId }}
              index={nextIndex}
              copyable={false}
            />
          </div>
        </aside>
      </div>
    </section>
  )
}
