/** Shared class strings for the Dream Bazaar system. Client- and server-safe. */

export const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dm-panel'

/** Accent fills in the order they cycle through chip rows and card stacks. */
export const tones = ['tone-sage', 'tone-butter', 'tone-sky', 'tone-rose', 'tone-lilac'] as const

/** Small alternating tilts for chips and cards. */
export const tilts = ['-rotate-2', 'rotate-[1.5deg]', '-rotate-1', 'rotate-2', '-rotate-[1.5deg]', 'rotate-1'] as const

/** Gentler tilts for large cards and list rows, so text stays easy to read. */
export const softTilts = ['-rotate-[0.6deg]', 'rotate-[0.5deg]', '-rotate-[0.3deg]', 'rotate-[0.7deg]'] as const

export const pick = <T,>(list: readonly T[], i: number) => list[i % list.length]

/** A ticket chip that straightens on hover. Add a tone-* and a tilt. */
export const chipLink = `ticket min-h-10 cursor-pointer transition-[rotate,scale,background-color,color] duration-200 hover:rotate-0 active:scale-[0.96] ${focusRing}`
