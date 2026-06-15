import { useEffect, useRef } from 'react'

/**
 * Returns a ref with { x, y } normalized mouse position [-1, 1].
 * Use in R3F useFrame to drive parallax / shader uniforms.
 */
export function useMousePos() {
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handle = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', handle)
    return () => window.removeEventListener('mousemove', handle)
  }, [])

  return mouse
}