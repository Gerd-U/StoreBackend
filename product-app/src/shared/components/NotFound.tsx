import { ArrowLeft } from 'lucide-react'
import type { CSSProperties } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { primaryButton, secondaryButton } from './buttons'

export function NotFound() {
  const { pathname } = useLocation()

  return (
    <section
      aria-labelledby="not-found-heading"
      className="mx-auto grid min-h-[70dvh] max-w-[90rem] items-center gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-20 lg:px-12"
    >
      <div
        style={{ '--tilt': '-2deg' } as CSSProperties}
        className="pop-card mx-auto w-full max-w-[20rem] overflow-hidden rounded-[3px] border border-ink/15 bg-card"
        aria-hidden="true"
      >
        <div className="h-1.5 bg-signal" />
        <div className="flex justify-center py-3">
          <span className="size-3.5 rounded-full bg-paper ring-[1.5px] ring-ink/35 ring-inset" />
        </div>
        <p className="px-6 pb-8 pt-1 font-display text-[5rem] leading-none tracking-[-0.02em]">404</p>
        <p className="truncate border-t border-dashed border-ink/20 px-6 py-3 text-[0.8125rem] font-bold text-ink-soft tabular-nums">{pathname}</p>
      </div>

      <div>
        <h1 id="not-found-heading" className="font-display text-5xl leading-[0.95] tracking-[-0.025em] sm:text-6xl">
          Agotado.
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
          Esta página no está en el estante. Puede que la hayan movido o que nunca haya existido.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/products" className={primaryButton}>
            Ir al catálogo
          </Link>
          <Link to="/" className={secondaryButton}>
            <ArrowLeft size={18} strokeWidth={2.5} aria-hidden="true" />
            Volver al inicio
          </Link>
        </div>
      </div>
    </section>
  )
}
