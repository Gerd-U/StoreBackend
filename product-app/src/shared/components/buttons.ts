const base =
  'press inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold whitespace-nowrap disabled:pointer-events-none disabled:opacity-50'

// The one red action per screen.
export const primaryButton = `${base} bg-signal text-white hover:bg-signal-deep`

export const secondaryButton = `${base} border border-line bg-card text-ink hover:border-ink`

export const inkButton = `${base} bg-ink text-white hover:bg-ink-3`

// Square icon actions that sit beside data (copy, regenerate, delete).
export const iconButton =
  'press grid size-9 shrink-0 place-items-center rounded-full text-ink-soft hover:bg-paper-2 hover:text-ink disabled:pointer-events-none disabled:opacity-40'
