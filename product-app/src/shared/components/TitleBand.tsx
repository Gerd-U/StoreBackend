import type { ReactNode } from 'react'
import { SignMark } from './SignMark'

type TitleBandProps = {
  id: string
  title: string
  description: ReactNode
  actions?: ReactNode
}

export function TitleBand({ id, title, description, actions }: TitleBandProps) {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-[90rem] flex-col gap-6 px-5 pb-8 pt-10 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12 lg:pb-10 lg:pt-14">
        <div className="flex min-w-0 gap-5">
          <SignMark className="mt-1.5 hidden h-[3.25rem] sm:grid lg:h-[4rem]" />
          <div className="min-w-0">
            <h1 id={id} className="font-display text-4xl leading-[1] tracking-[-0.02em] break-words sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">{description}</p>
          </div>
        </div>
        {actions && <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>}
      </div>
    </header>
  )
}
