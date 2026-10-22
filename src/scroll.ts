/*
  Scroll choreography, carried over from the Marlin motion prototype.

  The prototype is 19 interactions over a 20,000ms timeline:

      frame A   hold 3000ms  ->  frame B   (instant)
      frame B   hold 5000ms  ->  frame C   SMART_ANIMATE 6000ms
      frame C   hold 1500ms  ->  frame D   SMART_ANIMATE 4500ms

  Every number below is that timeline divided by 20,000, so the sections land
  at the same relative moments — only the clock is the scrollbar.

  The hero's words keep their stagger: 0 / 75 / 150ms, body lines at
  200 / 275 / 350ms, 300ms each. Those same windows also play once on load
  (see INTRO_MS), so the headline is never blank before the first scroll.

  The three content groups are a vertical filmstrip with parallax — they do
  not travel as one block. Desktop offsets are the prototype's measured
  frames; mobile ones are the same motion re-measured for a 390-wide board.
*/

export const TOTAL_MS = 20000
export const SCROLL_VH = 540

const at = (ms: number) => ms / TOTAL_MS

/** Phase windows as scroll progress. */
export const P = {
  word: [at(0), at(300)],
  word2: [at(75), at(375)],
  word3: [at(150), at(450)],
  body1: [at(200), at(500)],
  body2: [at(275), at(575)],
  body3: [at(350), at(650)],
  /* the packages card: t=200ms, 2084ms SLOW */
  stat: [at(200), at(2284)],
  /* the tiles arrive */
  g54In: [at(3000), at(3600)],
  /* the 6000ms transition */
  move1: [at(8000), at(14000)],
  /* the 4500ms transition, landing at 0.90 so the settled composition
     holds for a beat before the page continues */
  move2: [at(15500), 0.9],
} as const

/** On load the clock runs the hero intro by itself, up to the end of `stat`. */
export const INTRO_MS = 2284

export type Frames = {
  g53: { start: number; end: number }
  g54: { enter: number; mid: number; end: number }
  g55: { enter: number; mid: number; end: number }
}

/** Where each group sits, per the four frames. */
export const G_DESKTOP: Frames = {
  g53: { start: 186, end: -774 },
  g54: { enter: 1050, mid: 105, end: -1115 },
  g55: { enter: 1400, mid: 740, end: 144 },
}

export const G_MOBILE: Frames = {
  g53: { start: 120, end: -860 },
  g54: { enter: 980, mid: 120, end: -900 },
  g55: { enter: 1300, mid: 760, end: 40 },
}

/*
  The photographs that stand in for the prototype's footage. Each one owns a
  stretch of the scroll and cross-dissolves into the next over a narrow band
  centred on a seam, with a slow push-in across its whole stretch.
*/
export const SEAMS = [0.48, 0.78] as const
export const SEAM_BAND = 0.06

/** 0 before `a`, 1 after `b`, cubic-eased between. */
export function span(p: number, [a, b]: readonly [number, number]) {
  if (p <= a) return 0
  if (p >= b) return 1
  const t = (p - a) / (b - a)
  return 1 - Math.pow(1 - t, 3)
}

/** Linear ramp, for positions that should track the scrollbar exactly. */
export function ramp(p: number, [a, b]: readonly [number, number]) {
  if (p <= a) return 0
  if (p >= b) return 1
  return (p - a) / (b - a)
}

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t
