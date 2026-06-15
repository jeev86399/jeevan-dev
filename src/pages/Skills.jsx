import { Suspense, useState } from 'react'
import { motion } from 'framer-motion'
import SkillsGlobe from '../three/scenes/SkillsGlobe'
import { skills, skillCategories } from '../data/skills'

const categoryIcons = { Frontend: '⚛️', Backend: '🟢', Database: '🗄️', Tools: '🛠️', Cloud: '☁️' }
const categoryDesc  = {
  Frontend: 'UI frameworks, styling, and interactive experiences',
  Backend:  'Server-side logic, APIs, and real-time systems',
  Database: 'Relational, NoSQL, and ORM tooling',
  Tools:    'Developer tooling, design, and workflow',
  Cloud:    'Deployment, hosting, and infrastructure',
}

function SkillBar({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.5, ease: [0.22,1,0.36,1] }}
      style={{ marginBottom: 18 }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: skill.color, boxShadow: `0 0 6px ${skill.color}`, flexShrink: 0 }} />
          <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, fontWeight: 500, fontFamily: 'Space Grotesk,sans-serif' }}>{skill.name}</span>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Fira Code,monospace', fontSize: 12 }}>{skill.level}%</span>
      </div>
      <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 999, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: index * 0.04, ease: [0.22,1,0.36,1] }}
          style={{ height: '100%', borderRadius: 999, background: `linear-gradient(90deg,${skill.color},${skill.color}88)`, position: 'relative' }}
        >
          {/* Shimmer */}
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 1.5, delay: index * 0.04 + 0.5, ease: 'linear' }}
            style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)', borderRadius: 999 }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [active, setActive] = useState('Frontend')
  const filtered = skills.filter(s => s.category === active)

  return (
    <main style={{ background: '#050816', minHeight: '100vh', paddingTop: 80 }}>

      {/* 3D Globe */}
      <section style={{ position: 'relative', height: 'clamp(200px,45vh,52vh)', overflow: 'hidden' }} aria-hidden="true">
        <Suspense fallback={<div style={{ width:"100%", height:"100%", background:"linear-gradient(90deg,rgba(145,94,255,0.05) 25%,rgba(145,94,255,0.12) 50%,rgba(145,94,255,0.05) 75%)", backgroundSize:"200% 100%", animation:"shimmer 1.8s infinite", position:"absolute", inset:0 }}><style>{"@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}"}</style></div>}><SkillsGlobe /></Suspense>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(5,8,22,0.35),#050816)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, pointerEvents: 'none' }}>
          <p style={{ color: '#915EFF', fontFamily: 'Fira Code,monospace', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Skills constellation</p>
          <motion.h1 initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }}
            style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(2.5rem,6vw,4.5rem)', background:'linear-gradient(135deg,#915EFF,#00d4ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            My Skills
          </motion.h1>
          <p style={{ color:'rgba(255,255,255,0.35)', fontSize:14, fontFamily:'Space Grotesk,sans-serif' }}>
            {skills.length} technologies across {skillCategories.length} domains
          </p>
        </div>
      </section>

      {/* Category tabs */}
      <section style={{ maxWidth:1100, margin:'0 auto', padding:'56px clamp(20px,5vw,56px) 0' }}>
        <div style={{ textAlign:'center', marginBottom:40 }}>
          <p style={{ color:'#915EFF', fontFamily:'Fira Code,monospace', fontSize:12, letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:12 }}>Arsenal</p>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(2rem,4vw,3rem)', color:'#fff', marginBottom:10 }}>Tech Stack</h2>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:15 }}>Technologies I use to build production-ready products</p>
        </div>

        <div style={{ display:'flex', gap:10, flexWrap:'wrap', justifyContent:'center', marginBottom:40 }}>
          {skillCategories.map(cat => (
            <motion.button key={cat} onClick={() => setActive(cat)} whileTap={{ scale:0.95 }}
              style={{
                padding:'10px 22px', borderRadius:999, fontSize:13, fontWeight:600, cursor:'pointer',
                fontFamily:'Space Grotesk,sans-serif', border:'none', outline:'none', transition:'all 0.2s',
                display:'flex', alignItems:'center', gap:7,
                background: active === cat ? 'linear-gradient(135deg,#915EFF,#00d4ff)' : 'rgba(255,255,255,0.06)',
                color: active === cat ? '#fff' : 'rgba(255,255,255,0.55)',
                boxShadow: active === cat ? '0 4px 20px rgba(145,94,255,0.35)' : 'none',
              }}>
              <span>{categoryIcons[cat]}</span>{cat}
            </motion.button>
          ))}
        </div>

        {/* Category description */}
        <motion.p key={active} initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }}
          style={{ textAlign:'center', color:'rgba(255,255,255,0.4)', fontSize:14, fontFamily:'Fira Code,monospace', marginBottom:40 }}>
          {categoryDesc[active]}
        </motion.p>

        {/* Skill bars grid */}
        <motion.div key={active + 'grid'} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.3 }}
          style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(min(100%,300px),1fr))', gap:'0 clamp(24px,4vw,48px)' }}>
          {filtered.map((skill, i) => <SkillBar key={skill.name} skill={skill} index={i} />)}
        </motion.div>
      </section>

      {/* All skills pill cloud */}
      <section style={{ maxWidth:1100, margin:'0 auto', padding:'clamp(32px,5vw,56px) clamp(16px,5vw,56px)' }}>
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <p style={{ color:'#915EFF', fontFamily:'Fira Code,monospace', fontSize:12, letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:12 }}>Full Toolbox</p>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(1.8rem,3.5vw,2.5rem)', color:'#fff' }}>All Technologies</h2>
        </div>
        <div style={{ display:'flex', flexWrap:'wrap', gap:10, justifyContent:'center' }}>
          {skills.map((skill, i) => (
            <motion.div key={skill.name}
              initial={{ opacity:0, scale:0.8 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }}
              transition={{ delay: i * 0.02 }} whileHover={{ scale:1.1, y:-4 }}
              style={{ padding:'8px 18px', borderRadius:999, fontSize:13, fontFamily:'Fira Code,monospace', cursor:'default',
                background:`${skill.color}12`, border:`1px solid ${skill.color}33`, color:skill.color,
                display:'flex', alignItems:'center', gap:6 }}>
              <span style={{ width:6, height:6, borderRadius:'50%', background:skill.color }} />
              {skill.name}
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}