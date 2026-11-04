import type { CSSProperties } from 'react'
import { popTilt } from './popTones'

type ShelfSkeletonProps = {
  count?: number
}

// Blank POP cards hanging where the products will land.
export function ShelfSkeleton({ count = 4 }: ShelfSkeletonProps) {
  return (
    <ul
      aria-hidden="true"
      className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,15rem),1fr))] gap-x-6 gap-y-8"
    >
      {Array.from({ length: count }, (_, index) => (
        <li key={index}>
          <div
            style={{ '--tilt': `${popTilt(index)}deg`, animationDelay: `${index * 120}ms` } as CSSProperties}
            className="pop-card flex h-[14rem] animate-pulse flex-col overflow-hidden rounded-[3px] border border-ink/10 bg-card motion-reduce:animate-none"
          >
            <div className="h-1.5 bg-ink/10" />
            <div className="space-y-3 px-5 pt-10">
              <div className="h-5 w-4/5 rounded-sm bg-ink/[0.07]" />
              <div className="h-5 w-1/2 rounded-sm bg-ink/[0.07]" />
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
