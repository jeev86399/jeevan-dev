import { useEffect, useRef, useState } from 'react'

/**
 * Returns normalized scroll progress [0, 1] for the full page,
 * plus raw scrollY updated on every frame via rAF.
 */
export function useScrollRig() {
  const scrollY = useRef(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let rafId

    const update = () => {
      scrollY.current = window.scrollY
      const maxScroll = document.body.scrollHeight - window.innerHeight
      setProgress(maxScroll > 0 ? scrollY.current / maxScroll : 0)
      rafId = requestAnimationFrame(update)
    }

    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return { scrollY, progress }
}