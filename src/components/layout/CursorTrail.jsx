import { useEffect, useRef } from 'react'

export default function CursorTrail() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: 0, y: 0 })
  const ring    = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (window.innerWidth < 768) return   // desktop only

    const dot    = dotRef.current
    const ringEl = ringRef.current
    let rafId

    document.body.style.cursor = 'none'

    const move = e => { pos.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', move, { passive: true })

    const tick = () => {
      if (dot) dot.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12
      if (ringEl) ringEl.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px)`
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    const addHover    = () => ringEl?.classList.add   ('cursor-hover')
    const removeHover = () => ringEl?.classList.remove('cursor-hover')
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <style>{`
        .cursor-dot {
          position:         fixed;
          top:              0;
          left:             0;
          width:            8px;
          height:           8px;
          border-radius:    50%;
          background:       var(--color-primary);
          pointer-events:   none;
          z-index:          9998;
          mix-blend-mode:   screen;
          will-change:      transform;
        }
        .cursor-ring {
          position:         fixed;
          top:              0;
          left:             0;
          width:            32px;
          height:           32px;
          border-radius:    50%;
          border:           1px solid rgba(145, 94, 255, 0.6);
          pointer-events:   none;
          z-index:          9997;
          will-change:      transform;
          transition:       transform 0.05s linear;
        }
        .cursor-ring.cursor-hover {
          transform-origin: center;
          scale:            1.5;
          opacity:          0.5;
        }
      `}</style>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}