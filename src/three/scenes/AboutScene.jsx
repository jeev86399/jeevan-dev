import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import TechSphere from '../objects/TechSphere'
import ParticleField from '../objects/ParticleField'

export default function AboutScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{
        powerPreference: 'high-performance',
        antialias:       false,
        alpha:           true,
      }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]}   color="#915EFF" intensity={2} />
      <pointLight position={[-3, -3, 3]} color="#00d4ff" intensity={1.5} />

      <ParticleField count={700} />

      <Float speed={1.2} floatIntensity={0.8}>
        <TechSphere position={[0, 0, 0]}    color="#915EFF" speed={0.8} />
      </Float>
      <Float speed={2} floatIntensity={0.4}>
        <TechSphere position={[2.5, 1, -1]} color="#00d4ff" speed={1.5} />
      </Float>
      <Float speed={1.5} floatIntensity={0.6}>
        <TechSphere position={[-2, -1, -0.5]} color="#ff6b6b" speed={2} />
      </Float>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.3} intensity={1.4} height={250} />
      </EffectComposer>
    </Canvas>
  )
}