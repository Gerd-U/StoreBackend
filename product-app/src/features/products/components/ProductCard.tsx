import type { CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import type { NewProduct } from '../../../models/product'
import { CopyIdButton } from './CopyIdButton'
import { popTilt, popTone } from './popTones'

type ProductCardProps = {
  product: NewProduct
  index: number
  copyable?: boolean
  compact?: boolean
  size?: 'default' | 'feature'
  linked?: boolean
}

const NAME_SIZES = {
  compact: 'min-h-[5.5rem] px-4 pb-4 pt-1 text-base',
  default: 'min-h-[5rem] px-5 pb-6 pt-1 text-[1.375rem] sm:min-h-[8rem]',
  feature: 'min-h-[9rem] px-6 pb-8 pt-2 text-3xl sm:text-4xl',
}

export function ProductCard({
  product,
  index,
  copyable = true,
  compact = false,
  size = 'default',
  linked = false,
}: ProductCardProps) {
  const tone = popTone(index)
  const style = { '--tilt': `${popTilt(index)}deg` } as CSSProperties
  const nameSize = compact ? NAME_SIZES.compact : NAME_SIZES[size]
  const pad = compact ? 'px-4' : size === 'feature' ? 'px-6' : 'px-5'

  return (
    <article style={style} className="pop-card group relative flex h-full flex-col overflow-hidden rounded-[3px] border border-ink/15 bg-card">
      <div className={`h-1.5 ${tone.edge}`} aria-hidden="true" />
      <div className="flex justify-center py-3" aria-hidden="true">
        <span className="size-3.5 rounded-full bg-paper ring-[1.5px] ring-ink/35 ring-inset" />
      </div>
      <h3 className={`flex-1 break-words font-display leading-[1.08] tracking-[-0.01em] ${nameSize}`}>
        {linked ? (
          <Link
            to={`/products/${product.productResourceId}`}
            className="outline-none after:absolute after:inset-0 after:content-[''] focus-visible:underline focus-visible:decoration-wire focus-visible:decoration-2 focus-visible:underline-offset-4"
          >
            {product.name}
          </Link>
        ) : (
          product.name
        )}
      </h3>
      <div className={`relative flex items-center justify-between gap-3 border-t border-dashed border-ink/20 py-3 ${pad}`}>
        <div className="min-w-0">
          <p className="text-xs text-ink-soft">Resource ID</p>
          <p className="truncate text-[0.8125rem] font-bold tabular-nums" title={product.productResourceId}>
            {product.productResourceId}
          </p>
        </div>
        {copyable && (
          <span className="relative z-10">
            <CopyIdButton value={product.productResourceId} productName={product.name} />
          </span>
        )}
      </div>
    </article>
  )
}
