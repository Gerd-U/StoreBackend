import type { NewProduct } from '../../../models/product'
import { ProductCard } from './ProductCard'

type ProductListProps = {
  products: NewProduct[]
}

export function ProductList({ products }: ProductListProps) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,15rem),1fr))] gap-x-6 gap-y-8">
      {products.map((product, index) => (
        <li
          key={product.productResourceId}
          className="animate-shelf-in"
          style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
        >
          <ProductCard product={product} index={index} linked />
        </li>
      ))}
    </ul>
  )
}
