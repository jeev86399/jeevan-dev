import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import ParticleField from '../objects/ParticleField'
import CodeRain from '../objects/CodeRain'

function ProjectCube({ position, color }) {
  return (
    <Float speed={1.5} floatIntensity={0.5}>
      <mesh position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color} emissive={color}
          emissiveIntensity={0.3}
          roughness={0.2} metalness={0.8}
          wireframe
        />
      </mesh>
    </Float>
  )
}

export default function ProjectsRoom() {
  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 60 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{
        powerPreference: 'high-performance',
        antialias:       false,
        alpha:           true,
      }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]}   color="#915EFF" intensity={2} />
      <pointLight position={[-5, 0, 5]}  color="#00d4ff" intensity={1.5} />

      <CodeRain count={30} />
      <ParticleField count={400} />

      <ProjectCube position={[-4, 1, 0]}   color="#915EFF" />
      <ProjectCube position={[0, -1, -2]}  color="#00d4ff" />
      <ProjectCube position={[4, 1, 0]}    color="#ff6b6b" />
      <ProjectCube position={[-2, 2, -4]}  color="#f7c948" />
      <ProjectCube position={[3, -2, -3]}  color="#00ffb3" />

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} intensity={1.4} height={250} />
      </EffectComposer>
    </Canvas>
  )
}