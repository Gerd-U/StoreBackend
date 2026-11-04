type SignMarkProps = {
  className?: string
}

// The three stacked shop-sign tiles from the logo, used as a quiet brand cue.
export function SignMark({ className = '' }: SignMarkProps) {
  return (
    <span aria-hidden="true" className={`grid w-2.5 shrink-0 grid-rows-3 gap-[3px] ${className}`}>
      <span className="rounded-[1px] bg-sign" />
      <span className="rounded-[1px] bg-signal" />
      <span className="rounded-[1px] bg-wire" />
    </span>
  )
}
