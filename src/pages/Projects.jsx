import { Suspense, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoundedBox, Text, Float } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { projects, categories } from '../data/projects'

const lerp = (a, b, t) => a + (b - a) * t

// ── 3D Card ───────────────────────────────────────────────────
function Card3D({ project, index, total, selected, onSelect }) {
  const ref = useRef()
  const hov = useRef(false)
  const isSel = selected?.id === project.id
  const angle = (index / total) * Math.PI * 2
  const r = 3.8
  const base = [Math.sin(angle) * r, 0, Math.cos(angle) * r - 1]
  const col = new THREE.Color(project.color)

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.position.y = base[1] + Math.sin(clock.getElapsedTime() * 0.7 + index) * 0.12
    const ts = isSel ? 1.3 : hov.current ? 1.1 : 1
    ref.current.scale.lerp(new THREE.Vector3(ts, ts, ts), 0.08)
    const mat = ref.current.children[0]?.material
    if (mat) mat.emissiveIntensity = lerp(mat.emissiveIntensity, isSel ? 0.55 : hov.current ? 0.28 : 0.08, 0.08)
  })

  return (
    <Float speed={1.2} floatIntensity={0.15} rotationIntensity={0.04}>
      <group ref={ref} position={base}
        onClick={e => { e.stopPropagation(); onSelect(isSel ? null : project) }}
        onPointerEnter={() => { hov.current = true;  document.body.style.cursor = 'pointer' }}
        onPointerLeave={() => { hov.current = false; document.body.style.cursor = 'auto' }}>
        <RoundedBox args={[2.4,1.5,0.1]} radius={0.1} smoothness={4}>
          <meshStandardMaterial color={col} emissive={col} emissiveIntensity={0.08} metalness={0.7} roughness={0.25} transparent opacity={0.88} />
        </RoundedBox>
        <Text position={[0,0.3,0.07]}  fontSize={0.17} color="#fff"                   anchorX="center" maxWidth={2.1}>{project.title}</Text>
        <Text position={[0,0.02,0.07]} fontSize={0.1}  color="#aaaaaa"  anchorX="center">{project.category} · {project.year}</Text>
        <Text position={[0,-0.42,0.07]}fontSize={0.09} color={project.color}           anchorX="center">{isSel ? '✕ close' : '● tap to view'}</Text>
      </group>
    </Float>
  )
}

function CameraRig({ selected, total }) {
  const { camera } = useThree()
  useFrame(() => {
    if (selected) {
      const idx = projects.findIndex(p => p.id === selected.id)
      const angle = (idx / total) * Math.PI * 2
      camera.position.x = lerp(camera.position.x, Math.sin(angle) * 2,  0.05)
      camera.position.z = lerp(camera.position.z, Math.cos(angle) * 2 + 1.5, 0.05)
      camera.position.y = lerp(camera.position.y, 0, 0.05)
    } else {
      camera.position.x = lerp(camera.position.x, 0, 0.04)
      camera.position.z = lerp(camera.position.z, 7, 0.04)
      camera.position.y = lerp(camera.position.y, 0.4, 0.04)
    }
    camera.lookAt(0, 0, 0)
  })
  return null
}

function SceneRotator({ selected, onSelect }) {
  const group = useRef()
  useFrame(({ clock }) => { if (!group.current || selected) return; group.current.rotation.y = clock.getElapsedTime() * 0.1 })
  return (
    <group ref={group}>
      {projects.map((p, i) => <Card3D key={p.id} project={p} index={i} total={projects.length} selected={selected} onSelect={onSelect} />)}
    </group>
  )
}

// ── Detail overlay ────────────────────────────────────────────
function DetailOverlay({ project, onClose }) {
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      onClick={onClose} role="dialog" aria-modal="true" aria-label={`${project.title} details`}
      style={{ position:'fixed', inset:0, zIndex:8000, background:'rgba(5,8,22,0.88)', backdropFilter:'blur(14px)', display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
      <motion.div initial={{ opacity:0,scale:0.88,y:30 }} animate={{ opacity:1,scale:1,y:0 }} exit={{ opacity:0,scale:0.88,y:30 }}
        transition={{ type:'spring',stiffness:280,damping:26 }} onClick={e=>e.stopPropagation()}
        style={{ background:'rgba(10,10,28,0.99)', border:`1px solid ${project.color}44`, borderRadius:24, padding:'clamp(24px,4vw,40px)', maxWidth:580, width:'100%', boxShadow:`0 32px 80px rgba(0,0,0,0.7),0 0 40px ${project.color}22` }}>
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', marginBottom:18 }}>
          <div>
            <span style={{ color:project.color, fontFamily:'Fira Code,monospace', fontSize:11, letterSpacing:'0.15em', textTransform:'uppercase' }}>{project.category} · {project.year}</span>
            <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(1.4rem,3vw,2rem)', color:'#fff', marginTop:6 }}>{project.title}</h2>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ background:'rgba(255,255,255,0.08)', border:'none', borderRadius:10, width:36, height:36, color:'rgba(255,255,255,0.6)', cursor:'pointer', fontSize:16 }}>✕</button>
        </div>
        <div style={{ height:3, borderRadius:2, background:`linear-gradient(90deg,${project.color},transparent)`, marginBottom:18 }} />
        <p style={{ color:'rgba(255,255,255,0.65)', fontSize:15, lineHeight:1.8, marginBottom:20 }}>{project.description}</p>

        {/* Metrics */}
        {project.metrics && (
          <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:20 }}>
            {project.metrics.map(m => (
              <span key={m} style={{ padding:'5px 14px', borderRadius:999, fontSize:12, background:'rgba(74,222,128,0.1)', border:'1px solid rgba(74,222,128,0.25)', color:'#4ade80', fontFamily:'Fira Code,monospace' }}>✓ {m}</span>
            ))}
          </div>
        )}

        {/* Tags */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:24 }}>
          {project.tags.map(t => (
            <span key={t} style={{ padding:'5px 14px', borderRadius:999, fontSize:12, fontFamily:'Fira Code,monospace', background:`${project.color}15`, border:`1px solid ${project.color}44`, color:project.color }}>{t}</span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display:'flex', gap:12 }}>
          <a href={project.github} target="_blank" rel="noreferrer"
            style={{ flex:1, padding:'12px', borderRadius:12, textAlign:'center', textDecoration:'none', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.12)', color:'rgba(255,255,255,0.85)', fontSize:14, fontWeight:600 }}>
            GitHub ↗
          </a>
          {project.live && (
            <a href={project.live} target="_blank" rel="noreferrer"
              style={{ flex:1, padding:'12px', borderRadius:12, textAlign:'center', textDecoration:'none', background:`linear-gradient(135deg,${project.color},${project.color}99)`, color:'#fff', fontSize:14, fontWeight:700 }}>
              Live Demo ↗
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

// ── Immersive 3D mode ─────────────────────────────────────────
function ImmersiveMode({ onExit }) {
  const [sel, setSel] = useState(null)
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      style={{ position:'fixed', inset:0, zIndex:7000, background:'#050816' }}>
      <Canvas
        camera={{ position:[0,0.4,7], fov:55 }}
        style={{ position:'absolute', inset:0 }}
        gl={{ powerPreference:'high-performance', antialias:false, alpha:false }}
        dpr={[1,1.5]}
        onCreated={({ gl }) => () => gl.dispose()}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[6,6,6]}   color="#915EFF" intensity={2.5} />
        <pointLight position={[-6,-6,-6]} color="#00d4ff" intensity={2} />
        <Suspense fallback={null}><SceneRotator selected={sel} onSelect={setSel} /></Suspense>
        <CameraRig selected={sel} total={projects.length} />
        <EffectComposer><Bloom luminanceThreshold={0.2} intensity={1.4} height={250} /></EffectComposer>
      </Canvas>
      {/* ── UI overlay — hint text top, exit button bottom-center ── */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'24px 28px 36px' }}>

        {/* Top hint */}
        <p style={{ textAlign:'center', color:'rgba(255,255,255,0.2)', fontFamily:'Fira Code,monospace', fontSize:12 }}>
          {sel ? 'Click anywhere to deselect' : 'Drag to rotate · Click a card to explore'}
        </p>

        {/* Bottom-center exit button */}
        <div style={{ display:'flex', justifyContent:'center', pointerEvents:'all' }}>
          <motion.button
            onClick={onExit}
            whileHover={{ scale:1.05, boxShadow:'0 8px 32px rgba(145,94,255,0.45)' }}
            whileTap={{ scale:0.97 }}
            style={{
              background:     'linear-gradient(135deg, #915EFF, #00d4ff)',
              border:          'none',
              borderRadius:    999,
              color:           '#fff',
              padding:        '14px 36px',
              cursor:          'pointer',
              fontSize:        15,
              fontWeight:      700,
              fontFamily:     'Space Grotesk, sans-serif',
              boxShadow:      '0 4px 24px rgba(145,94,255,0.4)',
              display:        'flex',
              alignItems:     'center',
              gap:             8,
            }}
          >
            ← Back to Projects
          </motion.button>
        </div>
      </div>
      <AnimatePresence>{sel && <DetailOverlay project={sel} onClose={() => setSel(null)} />}</AnimatePresence>
    </motion.div>
  )
}

// ── HTML project card ─────────────────────────────────────────
function ProjectCard({ project, index, onOpenDetail }) {
  return (
    <motion.article
      initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }} transition={{ duration:0.5, delay:index*0.07 }}
      whileHover={{ y:-6 }} onClick={() => onOpenDetail(project)}
      style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:20, overflow:'hidden', cursor:'pointer', transition:'box-shadow 0.25s, border-color 0.25s', display:'flex', flexDirection:'column' }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow=`0 0 36px ${project.color}33`; e.currentTarget.style.borderColor=`${project.color}33` }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow='none'; e.currentTarget.style.borderColor='rgba(255,255,255,0.08)' }}
    >
      {/* Color header */}
      <div style={{ height:140, background:`linear-gradient(135deg,${project.color}30,#050816)`, position:'relative', flexShrink:0, overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, background:`radial-gradient(circle at 60% 40%,${project.color}50,transparent 65%)` }} />
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.6, position:'absolute', inset:0 }}
          />
        )}
        <div style={{ position:'absolute', top:12, left:14 }}>
          <span style={{ background:'rgba(5,8,22,0.75)', backdropFilter:'blur(8px)', border:`1px solid ${project.color}44`, borderRadius:999, padding:'4px 12px', color:project.color, fontSize:11, fontFamily:'Fira Code,monospace' }}>
            {project.category}
          </span>
        </div>
        <div style={{ position:'absolute', top:12, right:14 }}>
          <span style={{ background:'rgba(5,8,22,0.75)', borderRadius:999, padding:'4px 10px', color:'rgba(255,255,255,0.4)', fontSize:11, fontFamily:'Fira Code,monospace' }}>
            {project.year}
          </span>
        </div>
      </div>

      <div style={{ padding:'20px 22px', display:'flex', flexDirection:'column', flex:1, gap:12 }}>
        <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:18, color:'#fff' }}>{project.title}</h3>
        <p style={{ color:'rgba(255,255,255,0.55)', fontSize:13, lineHeight:1.75 }}>{project.description}</p>

        {/* Metrics */}
        {project.metrics && (
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {project.metrics.map(m => (
              <span key={m} style={{ padding:'3px 10px', borderRadius:999, fontSize:11, background:'rgba(74,222,128,0.1)', border:'1px solid rgba(74,222,128,0.2)', color:'#4ade80', fontFamily:'Fira Code,monospace' }}>
                ✓ {m}
              </span>
            ))}
          </div>
        )}

        {/* Tech tags */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
          {project.tags.slice(0,5).map(t => (
            <span key={t} style={{ padding:'4px 12px', borderRadius:999, fontSize:11, fontFamily:'Fira Code,monospace', background:`${project.color}15`, border:`1px solid ${project.color}33`, color:project.color }}>
              {t}
            </span>
          ))}
          {project.tags.length > 5 && <span style={{ padding:'4px 10px', borderRadius:999, fontSize:11, color:'rgba(255,255,255,0.3)', fontFamily:'Fira Code,monospace' }}>+{project.tags.length-5}</span>}
        </div>

        {/* Action buttons */}
        <div style={{ display:'flex', gap:10, marginTop:'auto', paddingTop:4 }}>
          <a href={project.github} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()}
            style={{ flex:1, padding:'9px', borderRadius:12, textAlign:'center', textDecoration:'none', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'rgba(255,255,255,0.8)', fontSize:13, fontWeight:600, transition:'background 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.12)'}
            onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.06)'}>
            GitHub ↗
          </a>
          {project.live ? (
            <a href={project.live} target="_blank" rel="noreferrer" onClick={e=>e.stopPropagation()}
              style={{ flex:1, padding:'9px', borderRadius:12, textAlign:'center', textDecoration:'none', background:`linear-gradient(135deg,${project.color},${project.color}bb)`, color:'#fff', fontSize:13, fontWeight:700 }}>
              Live Demo ↗
            </a>
          ) : (
            <span style={{ flex:1, padding:'9px', borderRadius:12, textAlign:'center', background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.06)', color:'rgba(255,255,255,0.25)', fontSize:13 }}>
              No live demo
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}

// ── Main page ─────────────────────────────────────────────────
export default function Projects() {
  const [cat,      setCat]      = useState('All')
  const [immersive,setImmersive]= useState(false)
  const [detail,   setDetail]   = useState(null)
  const filtered = cat === 'All' ? projects : projects.filter(p => p.category === cat)

  return (
    <main style={{ background:'#050816', minHeight:'100vh', paddingTop:80 }}>

      {/* Banner */}
      <section style={{ maxWidth:1200, margin:'0 auto', padding:'clamp(28px,5vw,64px) clamp(16px,5vw,48px) 24px', textAlign:'center' }}>
        <p style={{ color:'#915EFF', fontFamily:'Fira Code,monospace', fontSize:12, letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:12 }}>Selected Work</p>
        <h1 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(2.5rem,6vw,5rem)', background:'linear-gradient(135deg,#915EFF,#00d4ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', marginBottom:14 }}>
          Projects
        </h1>
        <p style={{ color:'rgba(255,255,255,0.45)', fontSize:16, maxWidth:520, margin:'0 auto 32px' }}>
          {projects.length} production projects across Full Stack, UI/UX, and Open Source
        </p>
        <motion.button onClick={() => setImmersive(true)}
          whileHover={{ scale:1.04, boxShadow:'0 12px 40px rgba(145,94,255,0.5)' }} whileTap={{ scale:0.97 }}
          style={{ padding:'14px 36px', borderRadius:999, border:'none', cursor:'pointer', background:'linear-gradient(135deg,#915EFF,#00d4ff)', color:'#fff', fontFamily:'Space Grotesk,sans-serif', fontWeight:700, fontSize:15, boxShadow:'0 4px 24px rgba(145,94,255,0.4)' }}>
          ✦ Enter 3D Showcase
        </motion.button>
      </section>

      {/* Filter */}
      <section style={{ maxWidth:1200, margin:'0 auto', padding:'0 clamp(20px,5vw,48px) 40px' }}>
        <div style={{ display:'flex', gap:'clamp(6px,1.5vw,10px)', flexWrap:'wrap', justifyContent:'center', marginBottom:'clamp(24px,4vw,40px)' }}>
          {categories.map(c => (
            <motion.button key={c} onClick={() => setCat(c)} whileTap={{ scale:0.95 }}
              style={{ padding:'8px 22px', borderRadius:999, fontSize:13, fontWeight:500, cursor:'pointer', fontFamily:'Space Grotesk,sans-serif', border:'none', outline:'none', transition:'all 0.2s',
                background: cat===c ? 'linear-gradient(135deg,#915EFF,#00d4ff)' : 'rgba(255,255,255,0.06)',
                color: cat===c ? '#fff' : 'rgba(255,255,255,0.55)',
                boxShadow: cat===c ? '0 4px 20px rgba(145,94,255,0.3)' : 'none' }}>
              {c}
            </motion.button>
          ))}
        </div>

        <motion.div layout style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,300px),1fr))', gap:'clamp(14px,2vw,22px)' }}>
          <AnimatePresence>
            {filtered.map((p, i) => <ProjectCard key={p.id} project={p} index={i} onOpenDetail={setDetail} />)}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p style={{ textAlign:'center', color:'rgba(255,255,255,0.3)', padding:'80px 0', fontFamily:'Fira Code,monospace', fontSize:14 }}>
            No projects in this category yet.
          </p>
        )}
      </section>

      <AnimatePresence>
        {immersive && <ImmersiveMode onExit={() => setImmersive(false)} />}
        {detail    && <DetailOverlay project={detail} onClose={() => setDetail(null)} />}
      </AnimatePresence>
    </main>
  )
}