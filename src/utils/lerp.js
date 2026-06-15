/** Linear interpolation */
export const lerp = (a, b, t) => a + (b - a) * t

/** Clamp a value between min and max */
export const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

/** Map a value from one range to another */
export const mapRange = (value, inMin, inMax, outMin, outMax) => {
  const t = clamp((value - inMin) / (inMax - inMin), 0, 1)
  return lerp(outMin, outMax, t)
}

/** Convert degrees to radians */
export const degToRad = (deg) => (deg * Math.PI) / 180

/** Random float between min and max */
export const randFloat = (min, max) => Math.random() * (max - min) + min

/** Random int between min and max (inclusive) */
export const randInt = (min, max) => Math.floor(randFloat(min, max + 1))