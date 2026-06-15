import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AboutScene from '../three/scenes/AboutScene'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import { experience, education } from '../data/experience'
import { contact, codingProfiles, achievements, stats } from '../data/social'

// ── Fade-in wrapper ───────────────────────────────────────────
const FadeIn = ({ children, delay = 0, x = 0, y = 0 }) => (
  <motion.div
    initial={{ opacity: 0, x, y }}
    whileInView={{ opacity: 1, x: 0, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
)

const S = {
  page:    { background: '#050816', minHeight: '100vh', paddingTop: 80 },
  wrap:    { maxWidth: 1200, margin: '0 auto', padding: '0 clamp(20px,5vw,56px)' },
  eyebrow: { color: '#915EFF', fontFamily: 'Fira Code,monospace', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 14 },
  h2:      { fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', color: '#fff', marginBottom: 14 },
  card:    { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '24px 28px' },
  divider: { borderTop: '1px solid rgba(255,255,255,0.06)', margin: '0 clamp(20px,5vw,56px)' },
}

// ── Recruiter summary banner ──────────────────────────────────
function RecruiterBanner() {
  return (
    <section style={{ ...S.wrap, padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,56px)' }}>
      <FadeIn>
        <div style={{ background: 'linear-gradient(135deg,rgba(145,94,255,0.12),rgba(0,212,255,0.06))', border: '1px solid rgba(145,94,255,0.25)', borderRadius: 24, padding: 'clamp(24px,4vw,48px)', position: 'relative', overflow: 'hidden' }}>
          {/* Glow */}
          <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, borderRadius: '50%', background: 'rgba(145,94,255,0.08)', filter: 'blur(60px)', pointerEvents: 'none' }} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 'clamp(20px,3vw,32px)', alignItems: 'center' }}>
            <div>
              <p style={S.eyebrow}>Available for Hire</p>
              <h2 style={{ ...S.h2, marginBottom: 16 }}>Full Stack Developer</h2>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
                1+ years of active development. B.Tech AI & Data Science student passionate about building scalable backend systems, AI-powered solutions, and immersive 3D web experiences. Currently open to internships, full-time roles, and exciting collaborations.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {['React', 'Spring Boot', 'Java', 'SQL', 'Java Script'].map(t => (
                  <span key={t} style={{ padding: '5px 14px', borderRadius: 999, fontSize: 12, fontFamily: 'Fira Code,monospace', background: 'rgba(145,94,255,0.15)', border: '1px solid rgba(145,94,255,0.3)', color: '#915EFF' }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <a href={contact.resumeUrl} download="YourName_Resume.pdf"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '16px 32px', borderRadius: 999, background: 'linear-gradient(135deg,#915EFF,#00d4ff)', color: '#fff', fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 8px 32px rgba(145,94,255,0.4)', fontFamily: 'Space Grotesk,sans-serif' }}>
                ⬇ Download Resume
              </a>
              <a href={`mailto:${contact.email}`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '14px 32px', borderRadius: 999, background: 'transparent', color: '#915EFF', border: '1px solid rgba(145,94,255,0.5)', fontWeight: 600, fontSize: 15, textDecoration: 'none', fontFamily: 'Space Grotesk,sans-serif' }}>
                📧 {contact.email}
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', paddingTop: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
                <span style={{ color: '#4ade80', fontSize: 14, fontWeight: 600 }}>Open to work · Immediate availability</span>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  )
}

// ── Professional stats bar ────────────────────────────────────
function StatsBar() {
  const items = [
    { v: '1+',   l: 'Years Independent Projects'       },
    { v: '8+',  l: 'Projects'        },
    { v: '30+', l: 'GitHub Repositories'    },
    { v: '35+', l: 'DSA Solved'      },
    { v: '3+',   l: 'Database Systems'      },
    { v: '10+',  l: 'Core Technologies'         },
  ]
  return (
    <section style={{ background: 'rgba(145,94,255,0.04)', borderTop: '1px solid rgba(145,94,255,0.1)', borderBottom: '1px solid rgba(145,94,255,0.1)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '28px clamp(20px,5vw,56px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(80px,1fr))', gap: 'clamp(4px,1vw,8px)' }}>
        {items.map(({ v, l }) => (
          <motion.div key={l}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', padding: '12px 8px' }}>
            <p style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(1.2rem,3.5vw,2.2rem)', background: 'linear-gradient(135deg,#915EFF,#00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{v}</p>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, fontFamily: 'Fira Code,monospace', marginTop: 4 }}>{l}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ── Bio section ───────────────────────────────────────────────
function BioSection() {
  return (
    <section style={{ ...S.wrap, padding: 'clamp(36px,6vw,80px) clamp(16px,5vw,56px)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 'clamp(32px,5vw,56px)', alignItems: 'start' }}>
        <FadeIn x={-30}>
          <p style={S.eyebrow}>Who I Am</p>
          <h2 style={{ ...S.h2 }}>I build things that live on the internet</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.85, marginBottom: 14 }}>
            Passionate Full Stack Developer & UI/UX Designer based in Chittor, Andhra Pradesh.
            I turn ideas into polished, pixel-perfect products — from scalable REST APIs to immersive 3D web experiences.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.85, marginBottom: 14 }}>
            Over the past year of active independent development, I've engineered secure digital forensics networks, zero-trust bio-acoustic verification systems, and highly interactive platforms. When I'm not building full-stack applications, I am actively sharpening my algorithmic problem-solving on LeetCode.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.85 }}>
            Currently seeking internships, full-time opportunities, and collaborative projects.{' '}
            <span style={{ color: '#4ade80', fontFamily: 'Fira Code,monospace', fontSize: 13 }}>● Open to work</span>
          </p>
        </FadeIn>
        <FadeIn x={30} delay={0.1}>
          <p style={S.eyebrow}>Education</p>
          {education.map(edu => (
            <div key={edu.degree} style={{ ...S.card, marginBottom: 16 }}>
              <p style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Fira Code,monospace', fontSize: 11, marginBottom: 6 }}>{edu.year}</p>
              <p style={{ color: '#fff', fontWeight: 700, fontSize: 17, marginBottom: 2 }}>{edu.degree}</p>
              <p style={{ color: 'var(--color-secondary)', fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{edu.field}</p>
              <p style={{ color: 'var(--color-primary)', fontSize: 14, marginBottom: 10 }}>{edu.school}</p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>{edu.description}</p>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  )
}

// ── Coding profiles ───────────────────────────────────────────
function CodingProfiles() {
  return (
    <section style={{ ...S.wrap, padding: 'clamp(40px,5vw,64px) clamp(20px,5vw,56px)' }}>
      <FadeIn>
        <p style={{ ...S.eyebrow, textAlign: 'center' }}>Competitive Programming</p>
        <h2 style={{ ...S.h2, textAlign: 'center', marginBottom: 40 }}>Coding Profiles</h2>
      </FadeIn>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 'clamp(10px,2vw,16px)' }}>
        {codingProfiles.map((p, i) => (
          <FadeIn key={p.name} delay={i * 0.06}>
            <motion.a
              href={p.url} target="_blank" rel="noreferrer"
              whileHover={{ y: -6, boxShadow: `0 16px 40px ${p.color}22` }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '28px 20px', borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(255,255,255,0.08)`, textDecoration: 'none', cursor: 'pointer', transition: 'box-shadow 0.3s' }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 14, background: p.bg, border: `1px solid ${p.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: p.color, fontSize: 24 }}
                dangerouslySetInnerHTML={{ __html: p.icon.replace('fill="currentColor"', `fill="${p.color}"`) }}
              />
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: '#fff', fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{p.name}</p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontFamily: 'Fira Code,monospace', marginBottom: 6 }}>@{p.username}</p>
                <span style={{ padding: '3px 12px', borderRadius: 999, fontSize: 11, background: `${p.color}18`, border: `1px solid ${p.color}33`, color: p.color, fontFamily: 'Fira Code,monospace' }}>
                  {p.stat}
                </span>
              </div>
            </motion.a>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

// ── Achievements ─────────────────────────────────────────────
function Achievements() {
  return (
    <section style={{ ...S.wrap, padding: 'clamp(40px,5vw,64px) clamp(20px,5vw,56px)' }}>
      <FadeIn>
        <p style={{ ...S.eyebrow, textAlign: 'center' }}>Recognition</p>
        <h2 style={{ ...S.h2, textAlign: 'center', marginBottom: 40 }}>Achievements</h2>
      </FadeIn>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(100%,260px),1fr))', gap: 'clamp(10px,2vw,16px)' }}>
        {achievements.map((a, i) => (
          <FadeIn key={a.title} delay={i * 0.06}>
            <motion.div whileHover={{ y: -4 }}
              style={{ display: 'flex', gap: 16, padding: '20px 24px', borderRadius: 16, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', transition: 'border-color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(145,94,255,0.35)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
            >
              <span style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>{a.icon}</span>
              <div>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{a.title}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, lineHeight: 1.6 }}>{a.desc}</p>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

// ── Experience timeline ───────────────────────────────────────
function ExperienceSection() {
  return (
    <section style={{ ...S.wrap, padding: 'clamp(40px,5vw,64px) clamp(20px,5vw,56px)' }}>
      <FadeIn>
        <p style={{ ...S.eyebrow, textAlign: 'center' }}>Career</p>
        <h2 style={{ ...S.h2, textAlign: 'center', marginBottom: 48 }}>Experience</h2>
      </FadeIn>
      <div style={{ position: 'relative', borderLeft: '1px solid rgba(145,94,255,0.25)', marginLeft: 16 }}>
        {experience.map((exp, i) => (
          <FadeIn key={exp.id} delay={i * 0.1} x={24}>
            <div style={{ marginLeft: 32, marginBottom: 48, position: 'relative' }}>
              <div style={{ position: 'absolute', left: -42, top: 6, width: 16, height: 16, borderRadius: '50%', background: exp.color, border: '3px solid #050816', boxShadow: `0 0 12px ${exp.color}` }} />
              <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Fira Code,monospace', fontSize: 11, marginBottom: 6 }}>{exp.period}</p>
              <h3 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 700, fontSize: 20, color: '#fff', marginBottom: 2 }}>{exp.role}</h3>
              <p style={{ color: exp.color, fontSize: 14, marginBottom: 14 }}>{exp.company}</p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                {exp.description.map((d, j) => (
                  <li key={j} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, display: 'flex', gap: 10 }}>
                    <span style={{ color: exp.color, flexShrink: 0, marginTop: 2 }}>▸</span>{d}
                  </li>
                ))}
              </ul>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {exp.tech.map(t => <Badge key={t} label={t} color={exp.color} />)}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

// ── Main ─────────────────────────────────────────────────────
export default function About() {
  return (
    <main style={S.page}>
      {/* 3D banner */}
      <section style={{ position: 'relative', height: '45vh', overflow: 'hidden' }} aria-hidden="true">
        <Suspense fallback={<div style={{ width:"100%", height:"100%", background:"linear-gradient(90deg,rgba(145,94,255,0.05) 25%,rgba(145,94,255,0.12) 50%,rgba(145,94,255,0.05) 75%)", backgroundSize:"200% 100%", animation:"shimmer 1.8s infinite", position:"absolute", inset:0 }}><style>{"@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}"}</style></div>}><AboutScene /></Suspense>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(5,8,22,0.4),#050816)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.h1 initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}
            style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: 'clamp(2.5rem,7vw,5rem)', background: 'linear-gradient(135deg,#915EFF,#00d4ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            About Me
          </motion.h1>
        </div>
      </section>

      <RecruiterBanner />
      <StatsBar />
      <BioSection />
      <div style={S.divider} /><CodingProfiles />
      <div style={S.divider} /><Achievements />
      <div style={S.divider} /><ExperienceSection />
      {/* ── Certifications teaser ── */}
      <div style={S.divider} />
      <section style={{ ...S.wrap, padding: 'clamp(40px,5vw,64px) clamp(20px,5vw,56px)' }}>
        <FadeIn>
          <div style={{
            background:   'linear-gradient(135deg, rgba(145,94,255,0.1), rgba(0,212,255,0.06))',
            border:       '1px solid rgba(145,94,255,0.25)',
            borderRadius: 'var(--radius-lg)',
            padding:      'clamp(24px,4vw,40px)',
            display:      'flex',
            flexWrap:     'wrap',
            alignItems:   'center',
            justifyContent:'space-between',
            gap:           24,
          }}>
            <div>
              <p style={{ color:'var(--color-primary)', fontFamily:'var(--font-mono)', fontSize:12, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:10 }}>
                Verified Learning
              </p>
              <h3 style={{ fontFamily:'var(--font-display)', fontWeight:800, fontSize:'clamp(1.4rem,3vw,2rem)', color:'#fff', marginBottom:10 }}>
                Certifications
              </h3>
              <p style={{ color:'var(--text-muted)', fontSize:14, lineHeight:1.7, maxWidth:480 }}>
                Industry-recognised credentials from Udemy, Coursera, AWS and more — all verifiable with a credential link.
              </p>
            </div>
            <Link to="/certifications" style={{ textDecoration:'none', flexShrink:0 }}>
              <motion.div
                whileHover={{ scale:1.05, boxShadow:'0 8px 32px rgba(145,94,255,0.45)' }}
                whileTap={{ scale:0.97 }}
                style={{
                  padding:    '14px 32px',
                  borderRadius:'var(--radius-full)',
                  background: 'var(--gradient-primary)',
                  color:      '#fff',
                  fontFamily: 'var(--font-sans)',
                  fontWeight:  700,
                  fontSize:   '15px',
                  boxShadow:  'var(--shadow-primary)',
                  cursor:     'pointer',
                  display:    'inline-flex',
                  alignItems: 'center',
                  gap:         8,
                }}
              >
                View All Certificates →
              </motion.div>
            </Link>
          </div>
        </FadeIn>
      </section>

    </main>
  )
}