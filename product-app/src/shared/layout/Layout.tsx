import type { ReactNode } from 'react'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

type LayoutProps = {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-dvh bg-paper text-ink lg:grid lg:grid-cols-[15rem_minmax(0,1fr)]">
      <Navbar />
      <div className="flex min-h-dvh min-w-0 flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
