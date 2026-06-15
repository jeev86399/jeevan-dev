import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { skills } from '../../data/skills'

function SkillDots() {
  const group = useRef()

  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = clock.getElapsedTime() * 0.14
  })

  const points = skills.map((skill, i) => {
    const golden = Math.PI * (3 - Math.sqrt(5))
    const y      = 1 - (i / (skills.length - 1)) * 2
    const r      = Math.sqrt(1 - y * y)
    const theta  = golden * i
    const radius = 2.4
    return { x: Math.cos(theta) * r * radius, y: y * radius, z: Math.sin(theta) * r * radius, skill }
  })

  return (
    <group ref={group}>
      <mesh>
        <sphereGeometry args={[2.4, 20, 20]} />
        <meshStandardMaterial color="#915EFF" wireframe transparent opacity={0.07} />
      </mesh>
      {points.map(({ x, y, z, skill }) => (
        <Float key={skill.name} speed={1.5} floatIntensity={0.12}>
          <mesh position={[x, y, z]}>
            <sphereGeometry args={[0.1, 10, 10]} />
            <meshStandardMaterial
              color={skill.color} emissive={skill.color}
              emissiveIntensity={0.9} roughness={0} metalness={1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function SkillsGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{
        powerPreference: 'high-performance',
        antialias:       false,
        alpha:           true,
      }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]}    color="#915EFF" intensity={2} />
      <pointLight position={[-5, -5, -5]} color="#00d4ff" intensity={1.5} />

      <SkillDots />

      <OrbitControls enableZoom={false} enablePan={false} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.1} intensity={1.8} height={250} />
      </EffectComposer>
    </Canvas>
  )
}