import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CodeRain({ count = 60 }) {
  const ref = useRef()

  const data = useMemo(() => {
    return Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 20,
      y: Math.random() * 20 - 5,
      z: (Math.random() - 0.5) * 10 - 5,
      speed: 0.5 + Math.random() * 1.5,
      length: 1 + Math.random() * 3,
    }))
  }, [count])

  const linePositions = useMemo(() => {
    const pos = new Float32Array(count * 6)
    data.forEach((d, i) => {
      pos[i * 6] = d.x
      pos[i * 6 + 1] = d.y
      pos[i * 6 + 2] = d.z
      pos[i * 6 + 3] = d.x
      pos[i * 6 + 4] = d.y - d.length
      pos[i * 6 + 5] = d.z
    })
    return pos
  }, [data])

  const posAttr = useRef()

  useFrame((_, delta) => {
    const pos = posAttr.current?.array
    if (!pos) return
    data.forEach((d, i) => {
      d.y -= d.speed * delta * 3
      if (d.y < -12) {
        d.y = 12
      }
      pos[i * 6 + 1] = d.y
      pos[i * 6 + 4] = d.y - d.length
    })
    posAttr.current.needsUpdate = true
  })

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          ref={posAttr}
          attach="attributes-position"
          args={[linePositions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#00d4ff" transparent opacity={0.4} />
    </lineSegments>
  )
}
