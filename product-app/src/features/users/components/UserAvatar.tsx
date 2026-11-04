// Each person keeps a stable initial and a pale tint drawn from the sign colours.
const TINTS = [
  'bg-sign-soft text-ink',
  'bg-signal/12 text-signal-deep',
  'bg-wire/12 text-wire',
  'bg-ink/[0.07] text-ink',
]

const SIZES = {
  sm: 'size-9 text-sm',
  lg: 'size-20 text-3xl',
}

const tintFor = (seed: string) => {
  let hash = 0
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) >>> 0
  return TINTS[hash % TINTS.length]
}

const initialsOf = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('') || '?'

type UserAvatarProps = {
  name: string
  seed: string
  size?: keyof typeof SIZES
}

export function UserAvatar({ name, seed, size = 'sm' }: UserAvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full font-display leading-none ${SIZES[size]} ${tintFor(seed)}`}
    >
      {initialsOf(name)}
    </span>
  )
}
