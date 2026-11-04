export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[90rem] flex-col gap-1 px-5 py-6 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <span className="font-display text-sm text-ink">ProductHub</span>
        <span>Catálogo de electrónica · {new Date().getFullYear()}</span>
      </div>
    </footer>
  )
}
