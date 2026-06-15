import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshWobbleMaterial } from '@react-three/drei'

export default function FloatingIsland() {
  const torusRef = useRef()
  const octaRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.4
      torusRef.current.rotation.y = t * 0.2
    }
    if (octaRef.current) {
      octaRef.current.rotation.y = t * 0.5
      octaRef.current.rotation.z = t * 0.3
    }
  })

  return (
    <group>
      {/* Central torus knot */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={torusRef} position={[0, 0, 0]}>
          <torusKnotGeometry args={[1, 0.3, typeof window !== 'undefined' && window.innerWidth < 768 ? 64 : 128, 24]} />
          <MeshWobbleMaterial
            color="#915EFF"
            attach="material"
            factor={0.15}
            speed={1}
            roughness={0.1}
            metalness={0.9}
            emissive="#915EFF"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>

      {/* Orbiting octahedron */}
      <Float speed={2} floatIntensity={0.5}>
        <mesh ref={octaRef} position={[3, 1, -1]} scale={0.6}>
          <octahedronGeometry args={[1]} />
          <meshStandardMaterial
            color="#00d4ff"
            roughness={0.1}
            metalness={1}
            emissive="#00d4ff"
            emissiveIntensity={0.3}
            wireframe
          />
        </mesh>
      </Float>

      {/* Small accent icosahedron */}
      <Float speed={3} floatIntensity={0.8}>
        <mesh position={[-2.5, -1, 1]} scale={0.4}>
          <icosahedronGeometry args={[1]} />
          <meshStandardMaterial
            color="#ff6b6b"
            roughness={0.2}
            metalness={0.8}
            emissive="#ff6b6b"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>
    </group>
  )
}