// Shop-sign colours cycle across the shelf as the card's printed top edge.
export const POP_TONES = [
  { edge: 'bg-sign', dot: 'bg-sign' },
  { edge: 'bg-signal', dot: 'bg-signal' },
  { edge: 'bg-wire', dot: 'bg-wire' },
  { edge: 'bg-ink', dot: 'bg-ink' },
] as const

const TILTS = [-0.8, 0.55, -0.3, 0.7, -0.55, 0.35]

export const popTone = (index: number) => POP_TONES[index % POP_TONES.length]

export const popTilt = (index: number) => TILTS[index % TILTS.length]
