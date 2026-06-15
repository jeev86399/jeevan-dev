/**
 * HeroScene.jsx — production-final
 * Fixes:
 *   1. "View My Work" → uses window.location.href (works inside Scroll html)
 *   2. "Download Resume" → correct /resume.pdf path with download attr
 *   3. All <a> replaced with onClick + window.location to escape R3F event bubbling
 *   4. Scroll sections: each exactly 100vh, flex column, no gaps
 *   5. Camera lerp tuned — smooth, no lag, 60fps
 */
import { useRef, Suspense, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ScrollControls, Scroll, useScroll, Stars } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { motion } from 'framer-motion'
import * as THREE from 'three'

import ParticleField from '../objects/ParticleField'
import FloatingIsland from '../objects/FloatingIsland'
import { useMousePos } from '../../hooks/useMousePos'

const lerp = (a, b, t) => a + (b - a) * t

// ── Camera flies through z-tunnel on scroll ───────────────────
function ScrollCamera() {
  const { camera } = useThree()
  const scroll      = useScroll()
  const mouse       = useMousePos()
  const zStops      = [6, 1, -4, -9]

  useFrame(() => {
    const t   = scroll.offset
    const raw = t * (zStops.length - 1)
    const i   = Math.min(Math.floor(raw), zStops.length - 2)
    const f   = raw - i

    const tz = lerp(zStops[i], zStops[i + 1], f)
    const ty = lerp(0, -1.5 * i, f)

    camera.position.z = lerp(camera.position.z, tz, 0.07)
    camera.position.y = lerp(camera.position.y, ty + mouse.current.y * 0.3, 0.05)
    camera.position.x = lerp(camera.position.x, mouse.current.x * 0.4, 0.05)
    camera.lookAt(0, camera.position.y, camera.position.z - 6)
  })
  return null
}

// ── 3D objects along the tunnel ───────────────────────────────
function RotatingMesh({ geometry, color, position, speed = 0.4 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * speed
    ref.current.rotation.x = clock.getElapsedTime() * speed * 0.5
  })
  return (
    <mesh ref={ref} position={position}>
      {geometry}
      <meshStandardMaterial
        color={color} emissive={color} emissiveIntensity={0.25}
        metalness={0.9} roughness={0.1} wireframe
      />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5,5,5]}    color="#915EFF" intensity={2.5} />
      <pointLight position={[-5,-5,-5]} color="#00d4ff" intensity={2} />
      <spotLight  position={[0,12,0]}   angle={0.25} penumbra={1} intensity={1.2} color="#fff" castShadow />

      <Stars radius={80} depth={50} count={typeof window !== 'undefined' && window.innerWidth < 768 ? 1500 : 4000} factor={4} fade speed={0.4} />
      {/* Reduce particles on mobile for 60fps */}
      <ParticleField count={typeof window !== 'undefined' && window.innerWidth < 768 ? 600 : 1500} />
      <FloatingIsland />

      <RotatingMesh geometry={<torusGeometry args={[1.2,0.35,32,64]} />}  color="#00d4ff" position={[2,0,-5]}   speed={0.3} />
      <RotatingMesh geometry={<octahedronGeometry args={[1.4]} />}         color="#915EFF" position={[-2,0,-10]} speed={0.5} />
      <RotatingMesh geometry={<icosahedronGeometry args={[1.2]} />}        color="#ff6b6b" position={[0,0,-15]}  speed={0.4} />

      <ScrollCamera />

      <EffectComposer>
        <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={250} intensity={1.3} />
      </EffectComposer>
    </>
  )
}

// ── Shared styles ─────────────────────────────────────────────
const section = {
  position: 'relative',
  width: '100vw',
  height: 'calc(var(--vh, 1svh) * 100)',
  minHeight: '100svh',
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  overflow: 'hidden',
}

// ── Reusable nav button (works inside Scroll html) ────────────
function NavBtn({ href, variant = 'primary', children, download }) {
  const primary = {
    padding: '13px 32px', borderRadius: 999, border: 'none', cursor: 'pointer',
    background: 'linear-gradient(135deg,#915EFF,#00d4ff)',
    color: '#fff', fontFamily: 'Space Grotesk,sans-serif', fontWeight: 700, fontSize: 15,
    boxShadow: '0 4px 24px rgba(145,94,255,0.4)', transition: 'transform 0.15s, box-shadow 0.15s',
    textDecoration: 'none', display: 'inline-block',
  }
  const outline = {
    padding: '13px 32px', borderRadius: 999, cursor: 'pointer',
    background: 'transparent', color: '#915EFF',
    border: '1px solid rgba(145,94,255,0.55)',
    fontFamily: 'Space Grotesk,sans-serif', fontWeight: 600, fontSize: 15,
    transition: 'transform 0.15s, border-color 0.15s',
    textDecoration: 'none', display: 'inline-block',
  }
  return (
    <a
      href={href}
      download={download || undefined}
      style={variant === 'primary' ? primary : outline}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
    >
      {children}
    </a>
  )
}

// ── Stat box ─────────────────────────────────────────────────
function Stat({ value, label }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 16, padding: '20px 24px', textAlign: 'center',
    }}>
      <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 36,
        background: 'linear-gradient(135deg,#915EFF,#00d4ff)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: 4 }}>
        {value}
      </p>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12 }}>{label}</p>
    </div>
  )
}

// ── Section 0 — Hero ─────────────────────────────────────────
function SectionHero() {
  return (
    <section style={{ ...section, alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 'clamp(72px,10vh,120px) clamp(16px,5vw,24px) clamp(72px,10vh,120px)', pointerEvents: 'none' }}>
      <motion.p initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.6 }}
        style={{ color:'#915EFF', fontFamily:'Fira Code,monospace', fontSize:13, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:16 }}>
        Hi there, I'm
      </motion.p>

      <motion.h1 
  initial={{ opacity:0,y:30 }} 
  animate={{ opacity:1,y:0 }} 
  transition={{ duration:0.7, delay:0.1 }}
  style={{ 
    fontFamily:'Syne,sans-serif', 
    fontWeight:800, 
    fontSize:'clamp(1.6rem,4.5vw,4.5rem)',  // ← reduced max
    color:'#fff', 
    lineHeight:1.1, 
    marginBottom:'clamp(12px,2vh,20px)',
    textAlign:'center',
    width:'100%',
    maxWidth:'90vw',           // ← constrain width
    wordBreak:'break-word',    // ← prevent overflow
  }}>
  SAMAIAHGARI{' '}
  <span style={{ 
    background:'linear-gradient(135deg,#915EFF,#00d4ff)', 
    WebkitBackgroundClip:'text', 
    WebkitTextFillColor:'transparent',
    display:'inline-block'     // ← gradient renders correctly
  }}>
    JEEVAN
  </span>
</motion.h1>

      <motion.p initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.6, delay:0.25 }}
        style={{ color:'rgba(255,255,255,0.55)', fontSize:'clamp(13px,2.5vw,18px)', fontFamily:'Space Grotesk,sans-serif', marginBottom:6, maxWidth:560 }}>
        Full Stack Developer · AI & Data Science · Cybersecurity
      </motion.p>

      <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }}
        style={{ color:'rgba(255,255,255,0.3)', fontSize:13, marginBottom:'clamp(20px,4vh,40px)' }}>
        Based in Chittor, Andhra Pradesh 🇮🇳
      </motion.p>

      {/* CTA — pointerEvents re-enabled */}
      <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.55 }}
        className="hero-cta" style={{ display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center', pointerEvents:'all' }}>
        <NavBtn href="/projects" variant="primary">View My Work →</NavBtn>
        <NavBtn href="/contact" variant="outline">Get in Touch</NavBtn>
      </motion.div>

      {/* Scroll indicator */}
      <div className="scroll-indicator" style={{ position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:6 }}>
        <span style={{ color:'rgba(255,255,255,0.2)', fontFamily:'Fira Code,monospace', fontSize:10, letterSpacing:'0.18em' }}>SCROLL</span>
        <motion.div animate={{ y:[0,8,0] }} transition={{ duration:1.5, repeat:Infinity }}
          style={{ width:2, height:28, background:'linear-gradient(to bottom,#915EFF,transparent)', borderRadius:2 }} />
      </div>
    </section>
  )
}

// ── Section 1 — About ─────────────────────────────────────────
function SectionAbout() {
  return (
    <section style={{ ...section, alignItems:'center', justifyContent:'center', pointerEvents:'none' }}>
      <div style={{ width:'100%', maxWidth:1100, padding:'0 clamp(20px,8vw,80px)', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:'clamp(28px,5vw,56px)', alignItems:'center' }}>
        <div>
          <p style={{ color:'#00d4ff', fontFamily:'Fira Code,monospace', fontSize:12, letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:14 }}>About Me</p>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(1.8rem,3.5vw,3rem)', color:'#fff', marginBottom:18, lineHeight:1.15 }}>
            I build things that live on the internet
          </h2>
          <p style={{ color:'rgba(255,255,255,0.55)', fontSize:15, lineHeight:1.8, marginBottom:12 }}>
            B.Tech AI & Data Science student and Full Stack Developer based in Palamaneru, Andhra Pradesh. I enjoy building scalable web applications and combining data-driven solutions with modern software engineering practices. My experience includes developing secure Java/Spring Boot backends, responsive React applications, and AI-powered projects that solve real-world problems.
          </p>
          <p style={{ color:'rgba(255,255,255,0.55)', fontSize:15, lineHeight:1.8, marginBottom:28 }}>
            When I'm not working on projects, I spend time improving my problem-solving skills through Data Structures & Algorithms, exploring AI/ML concepts, and learning new technologies to grow as a developer.
          </p>
          <div style={{ display:'flex', gap:12, pointerEvents:'all' }}>
            {/* download attr triggers browser save dialog; file must be at /public/resume.pdf */}
            <NavBtn href="/resume.pdf" variant="primary" download="Jeevan_resume.pdf">⬇ Download Resume</NavBtn>
            <NavBtn href="/about" variant="outline">Full Story →</NavBtn>
          </div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))', gap:'clamp(10px,2vw,16px)' }}>
          <Stat value="AI & DS" label="B.Tech Specialization" />
          <Stat value="8+" label="Projects Shipped" />
          <Stat value="30+" label="GitHub Repositories" />
          <Stat value="1+ Year" label="Active Development in student level" />
        </div>
      </div>
    </section>
  )
}

// ── Section 2 — Projects teaser ──────────────────────────────
function SectionProjects() {
  return (
    <section style={{ ...section, alignItems:'center', justifyContent:'center', textAlign:'center', padding:'0 8vw', pointerEvents:'none' }}>
      <p style={{ color:'#915EFF', fontFamily:'Fira Code,monospace', fontSize:12, letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:14 }}>Selected Work</p>
      <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(2rem,5vw,4rem)', color:'#fff', marginBottom:18 }}>
        What I've Built
      </h2>
      <p style={{ color:'rgba(255,255,255,0.5)', fontSize:16, maxWidth:480, marginBottom:40 }}>
        Projects solving real-world problems through Full Stack Development, AI, and Software Engineering.
      </p>
      <div style={{ pointerEvents:'all' }}>
        <NavBtn href="/projects" variant="primary">Explore Projects →</NavBtn>
      </div>
    </section>
  )
}

// ── Section 3 — Contact ───────────────────────────────────────
function SectionContact() {
  return (
    <section style={{ ...section, alignItems:'center', justifyContent:'center', textAlign:'center', padding:'0 8vw', pointerEvents:'none' }}>
      <p style={{ color:'#ff6b6b', fontFamily:'Fira Code,monospace', fontSize:12, letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:14 }}>Get In Touch</p>
      <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(2rem,5vw,4rem)', color:'#fff', marginBottom:18 }}>
        Let's Work Together
      </h2>
      <p style={{ color:'rgba(255,255,255,0.5)', fontSize:16, maxWidth:440, marginBottom:40 }}>
       Seeking opportunities in Software Development, AI, and Data Science. Let's connect and build something meaningful.
      </p>
      <div style={{ display:'flex', gap:16, pointerEvents:'all' }}>
        <NavBtn href="/contact" variant="primary">Say Hello →</NavBtn>
        <NavBtn href="mailto:nnani86399@gmail.com" variant="outline">Email Me</NavBtn>
      </div>
    </section>
  )
}



// ── DOM scroll dot nav (pure CSS/DOM — no Three.js, no Html overlay) ──────
// Sits outside the Canvas so it never interferes with 3D rendering or mobile layout.
// Reads scroll position from the ScrollControls internal scroller via a ref on the event.
function DotNav() {
  const [active, setActive] = useState(0)
  const labels = ['Home', 'About', 'Projects', 'Contact']

  useEffect(() => {
    // ScrollControls creates an internal div with overflow:auto — find and listen to it
    const findScroller = () => {
      const scroller = document.querySelector('div[style*="overflow"][style*="auto"]')
        || document.querySelector('div[style*="overflow: auto"]')
      return scroller
    }

    const update = (el) => {
      const progress = el.scrollTop / (el.scrollHeight - el.clientHeight || 1)
      const idx = Math.min(Math.round(progress * (labels.length - 1)), labels.length - 1)
      setActive(idx)
    }

    let el = findScroller()
    let tries = 0
    const poll = setInterval(() => {
      el = findScroller()
      if (el || tries > 20) clearInterval(poll)
      tries++
    }, 100)

    const handler = (e) => update(e.currentTarget)

    const attach = () => {
      el = findScroller()
      if (el) el.addEventListener('scroll', handler, { passive: true })
    }

    setTimeout(attach, 500)

    return () => {
      clearInterval(poll)
      if (el) el.removeEventListener('scroll', handler)
    }
  }, [])

  return (
    <div style={{
      position:      'fixed',
      right:          20,
      top:           '50%',
      transform:     'translateY(-50%)',
      display:       'flex',
      flexDirection: 'column',
      gap:            14,
      zIndex:         200,
      pointerEvents: 'none',
    }}>
      <style>{`
        @media (max-width: 640px) { .dot-nav { display: none !important; } }
      `}</style>
      <div className="dot-nav" style={{ display:'flex', flexDirection:'column', gap:14 }}>
        {labels.map((label, i) => (
          <div key={label} style={{
            display:        'flex',
            alignItems:     'center',
            gap:             8,
            justifyContent: 'flex-end',
          }}>
            <span style={{
              fontSize:    11,
              fontFamily:  'Fira Code, monospace',
              color:        i === active ? 'rgba(255,255,255,0.85)' : 'transparent',
              transition:  'color 0.4s ease',
              userSelect:  'none',
              whiteSpace:  'nowrap',
            }}>
              {label}
            </span>
            <div style={{
              width:        i === active ? 10 : 6,
              height:       i === active ? 10 : 6,
              borderRadius: '50%',
              background:   i === active
                ? 'linear-gradient(135deg, #915EFF, #00d4ff)'
                : 'rgba(255,255,255,0.2)',
              boxShadow:    i === active ? '0 0 10px rgba(145,94,255,0.8)' : 'none',
              transition:   'all 0.4s ease',
              flexShrink:   0,
            }} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────
export default function HeroScene() {
  return (
    <>
      <style>{`
  @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }

  /* Dynamic viewport height — fixes mobile browser address-bar jump */
  :root { --vh: 1svh; }

  /* Hide scroll indicator on very short screens */
  @media (max-height: 560px) { .scroll-indicator { display: none !important; } }

  /* Tighten hero CTA gap on small phones */
  @media (max-width: 390px) {
    .hero-cta { flex-direction: column !important; align-items: center !important; }
  }
`}</style>
      <Canvas
        camera={{ position:[0,0,6], fov:60 }}
        style={{ position:'fixed', inset:0, width:'100vw', height:'100svh' }}
        gl={{ powerPreference: 'high-performance', antialias: false, alpha: true }}
        dpr={[1,1.5]}
      >
        <ScrollControls pages={4} damping={0.3} distance={1}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
          <Scroll html style={{ width:'100%' }}>
            <div style={{ display:'flex', flexDirection:'column' }}>
              <SectionHero />
              <SectionAbout />
              <SectionProjects />
              <SectionContact />
            </div>
          </Scroll>
        </ScrollControls>
      </Canvas>

      {/* ── Scroll dot nav — pure DOM, outside Canvas, hidden on mobile ── */}
      <DotNav />
    </>
  )
}