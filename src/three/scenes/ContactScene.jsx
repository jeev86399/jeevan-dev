import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useRef } from 'react'
import ParticleField from '../objects/ParticleField'

function PulsingRings() {
  const r1 = useRef(), r2 = useRef(), r3 = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (r1.current) r1.current.rotation.x = t * 0.3
    if (r2.current) { r2.current.rotation.y = t * 0.4; r2.current.rotation.z = t * 0.2 }
    if (r3.current) r3.current.rotation.z = t * 0.5
  })

  return (
    <Float speed={1} floatIntensity={0.3}>
      <mesh ref={r1}>
        <torusGeometry args={[2, 0.02, 16, 80]} />
        <meshStandardMaterial color="#915EFF" emissive="#915EFF" emissiveIntensity={1} />
      </mesh>
      <mesh ref={r2}>
        <torusGeometry args={[2.6, 0.015, 16, 80]} />
        <meshStandardMaterial color="#00d4ff" emissive="#00d4ff" emissiveIntensity={1} />
      </mesh>
      <mesh ref={r3}>
        <torusGeometry args={[3.2, 0.01, 16, 80]} />
        <meshStandardMaterial color="#ff6b6b" emissive="#ff6b6b" emissiveIntensity={0.8} />
      </mesh>
    </Float>
  )
}

export default function ContactScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{
        powerPreference: 'high-performance',
        antialias:       false,
        alpha:           true,
      }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 0, 5]} color="#915EFF" intensity={3} />

      <ParticleField count={500} />
      <PulsingRings />

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.6} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.1} intensity={2.2} height={250} />
      </EffectComposer>
    </Canvas>
  )
}