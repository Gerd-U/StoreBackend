import { Boxes, Home, Plus, Users, type LucideIcon } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

type Sign = {
  to: string
  label: string
  icon: LucideIcon
  end?: boolean
  short?: string
  lit: string
  glow: string
}

// Each route is a shop sign: unlit it only shows its colour on the icon, lit it fills.
const SIGNS: Sign[] = [
  { to: '/', label: 'Inicio', icon: Home, end: true, lit: 'bg-sign text-ink', glow: 'text-sign' },
  { to: '/products', label: 'Productos', icon: Boxes, end: true, lit: 'bg-signal text-white', glow: 'text-[#f0716c]' },
  { to: '/products/new', label: 'Nuevo producto', short: 'Nuevo', icon: Plus, lit: 'bg-wire text-white', glow: 'text-[#86a6f2]' },
  { to: '/users', label: 'Usuarios', icon: Users, lit: 'bg-card text-ink', glow: 'text-white' },
]

export function Navbar() {
  return (
    <aside className="bg-ink text-white lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col">
      <div className="flex items-center justify-between px-5 pb-3 pt-5 sm:px-8 lg:px-6 lg:pb-12 lg:pt-8">
        <Link to="/" aria-label="ProductHub, inicio" className="press flex items-center gap-3">
          <span className="grid h-10 w-6 grid-rows-3 gap-[3px] rounded-[3px] bg-ink-3 p-[3px]" aria-hidden="true">
            <span className="rounded-[1px] bg-sign" />
            <span className="rounded-[1px] bg-signal" />
            <span className="rounded-[1px] bg-wire" />
          </span>
          <span className="font-display text-[1.25rem] leading-[0.92] tracking-[-0.01em]">
            Product
            <br />
            <span className="text-sign">Hub</span>
          </span>
        </Link>
      </div>

      <nav aria-label="Navegación principal" className="px-3 pb-4 sm:px-6 lg:px-4">
        <ul className="grid grid-cols-4 gap-1 sm:gap-1.5 lg:flex lg:flex-col lg:gap-1">
          {SIGNS.map(({ to, label, short, icon: Icon, end, lit, glow }) => (
            <li key={to} className="min-w-0">
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `press group flex flex-col items-center justify-center gap-1 rounded-md px-1 py-2 text-xs font-bold sm:flex-row sm:gap-2 sm:px-2 sm:py-2.5 sm:text-sm lg:justify-start lg:gap-3 lg:px-3.5 lg:py-3 ${
                    isActive ? lit : 'text-white/65 hover:bg-white/[0.06] hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={17} strokeWidth={2.4} aria-hidden="true" className={isActive ? undefined : glow} />
                    {short ? (
                      <>
                        <span className="sm:hidden">{short}</span>
                        <span className="hidden sm:inline">{label}</span>
                      </>
                    ) : (
                      label
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <p className="hidden px-6 pb-7 text-xs leading-relaxed text-white/45 lg:mt-auto lg:block">
        Catálogo de electrónica
        <br />
        servido por StoreBackend
      </p>
    </aside>
  )
}
