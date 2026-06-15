/**
 * src/pages/Certifications.jsx
 *
 * Dedicated public certifications page at /certifications.
 * - Category filter tabs
 * - Card grid with issuer, date, skills, verify link
 * - Hover glow matching cert accent colour
 * - Fully responsive (auto-fill grid)
 * - No Tailwind — pure inline styles + CSS vars
 */
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { certifications, certCategories } from '../data/Certifications'

// ── Fade-in wrapper ───────────────────────────────────────────
const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
)

// ── Single certification card ─────────────────────────────────
function CertCard({ cert, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:    'rgba(255,255,255,0.04)',
        border:        `1px solid ${hovered ? cert.color + '55' : 'rgba(255,255,255,0.08)'}`,
        borderRadius:  'var(--radius-lg)',
        overflow:      'hidden',
        display:       'flex',
        flexDirection: 'column',
        transition:    'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow:     hovered ? `0 0 36px ${cert.color}28, 0 8px 32px rgba(0,0,0,0.3)` : '0 4px 16px rgba(0,0,0,0.2)',
      }}
    >
      {/* ── Top colour strip ── */}
      <div style={{
        height:     '6px',
        background: `linear-gradient(90deg, ${cert.color}, ${cert.color}66)`,
        flexShrink:  0,
      }} />

      {/* ── Card body ── */}
      <div style={{ padding: 'clamp(18px,3vw,28px)', display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 'var(--radius-md)',
            background: `${cert.color}18`,
            border:     `1px solid ${cert.color}33`,
            display:    'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 24, flexShrink: 0,
          }}>
            {cert.logo}
          </div>
          <span style={{
            padding:     '4px 12px',
            borderRadius:'var(--radius-full)',
            fontSize:    '11px',
            fontFamily:  'var(--font-mono)',
            background:  cert.expires === 'No Expiry' ? 'rgba(74,222,128,0.1)' : 'rgba(255,159,67,0.1)',
            border:      `1px solid ${cert.expires === 'No Expiry' ? 'rgba(74,222,128,0.25)' : 'rgba(255,159,67,0.25)'}`,
            color:       cert.expires === 'No Expiry' ? '#4ade80' : '#ff9f43',
            whiteSpace:  'nowrap',
          }}>
            {cert.expires === 'No Expiry' ? '✓ No Expiry' : `Expires ${cert.expires}`}
          </span>
        </div>

        {/* Title + issuer */}
        <div>
          <h3 style={{
            fontFamily:   'var(--font-display)',
            fontWeight:    800,
            fontSize:     'clamp(15px,2vw,18px)',
            color:         hovered ? cert.color : '#ffffff',
            marginBottom:  6,
            lineHeight:    1.25,
            transition:   'color 0.25s',
          }}>
            {cert.title}
          </h3>
          <p style={{
            color:      cert.color,
            fontSize:   '13px',
            fontWeight: 600,
            fontFamily: 'var(--font-sans)',
          }}>
            {cert.issuer}
          </p>
        </div>

        {/* Meta row */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--text-faint)', fontSize: '12px', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 5 }}>
            📅 {cert.date}
          </span>
          {cert.credentialId && (
            <span style={{ color: 'var(--text-faint)', fontSize: '12px', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: 5 }}>
              🪪 {cert.credentialId}
            </span>
          )}
        </div>

        {/* Skills tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {cert.skills.map(skill => (
            <span key={skill} style={{
              padding:     '3px 10px',
              borderRadius:'var(--radius-full)',
              fontSize:    '11px',
              fontFamily:  'var(--font-mono)',
              background:  `${cert.color}14`,
              border:      `1px solid ${cert.color}30`,
              color:        cert.color,
            }}>
              {skill}
            </span>
          ))}
        </div>

        {/* Verify button — pushes to bottom */}
        <div style={{ marginTop: 'auto', paddingTop: 8 }}>
          <a
            href={cert.url}
            target="_blank"
            rel="noreferrer"
            style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              gap:             8,
              padding:        '11px 20px',
              borderRadius:   'var(--radius-full)',
              textDecoration: 'none',
              fontSize:       '13px',
              fontWeight:      700,
              fontFamily:     'var(--font-sans)',
              background:     hovered
                ? `linear-gradient(135deg, ${cert.color}, ${cert.color}bb)`
                : 'rgba(255,255,255,0.06)',
              border:         `1px solid ${hovered ? cert.color : 'rgba(255,255,255,0.1)'}`,
              color:           hovered ? '#ffffff' : 'rgba(255,255,255,0.75)',
              transition:     'all 0.25s ease',
            }}
          >
            <span>Verify Credential</span>
            <span style={{ fontSize: 12 }}>↗</span>
          </a>
        </div>
      </div>
    </motion.article>
  )
}

// ── Stats bar ─────────────────────────────────────────────────
function CertStats() {
  const total      = certifications.length
  const issuers    = [...new Set(certifications.map(c => c.issuer.split('—')[0].trim()))].length
  const noExpiry   = certifications.filter(c => c.expires === 'No Expiry').length
  const categories = certCategories.length - 1 // minus 'All'

  return (
    <div style={{
      display:             'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(100px,1fr))',
      gap:                  'clamp(8px,2vw,16px)',
      maxWidth:             900,
      margin:              '0 auto 56px',
    }}>
      {[
        { v: total,      l: 'Certifications' },
        { v: issuers,    l: 'Issuers'        },
        { v: noExpiry,   l: 'No Expiry'      },
        { v: categories, l: 'Domains'        },
      ].map(({ v, l }) => (
        <motion.div
          key={l}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background:   'rgba(255,255,255,0.04)',
            border:       '1px solid rgba(145,94,255,0.15)',
            borderRadius: 'var(--radius-md)',
            padding:      'clamp(14px,2vw,20px)',
            textAlign:    'center',
          }}
        >
          <p style={{
            fontFamily:           'var(--font-display)',
            fontWeight:            800,
            fontSize:             'clamp(1.6rem,3.5vw,2.4rem)',
            background:           'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor:  'transparent',
            marginBottom:          4,
          }}>
            {v}
          </p>
          <p style={{ color: 'var(--text-faint)', fontSize: '12px', fontFamily: 'var(--font-mono)' }}>
            {l}
          </p>
        </motion.div>
      ))}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────
export default function Certifications() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? certifications
    : certifications.filter(c => c.category === activeCategory)

  return (
    <main style={{ background: 'var(--color-bg)', minHeight: '100vh', paddingTop: 80 }}>

      {/* ── Hero banner ── */}
      <section style={{
        textAlign:  'center',
        padding:    'clamp(48px,7vw,96px) clamp(16px,5vw,48px) clamp(32px,4vw,48px)',
        position:   'relative',
        overflow:   'hidden',
      }}>
        {/* Background glow */}
        <div style={{
          position:   'absolute',
          top:        '50%',
          left:       '50%',
          transform:  'translate(-50%,-50%)',
          width:       600,
          height:      400,
          borderRadius:'50%',
          background: 'radial-gradient(ellipse, rgba(145,94,255,0.1) 0%, transparent 70%)',
          pointerEvents:'none',
        }} />

        <FadeIn>
          <p style={{
            color:         'var(--color-primary)',
            fontFamily:    'var(--font-mono)',
            fontSize:      '12px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom:  '14px',
          }}>
            Verified Learning
          </p>
          <h1 style={{
            fontFamily:           'var(--font-display)',
            fontWeight:            800,
            fontSize:             'clamp(2.5rem,7vw,5.5rem)',
            background:           'var(--gradient-primary)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor:  'transparent',
            lineHeight:            1.05,
            marginBottom:         '16px',
          }}>
            Certifications
          </h1>
          <p style={{
            color:      'var(--text-muted)',
            fontSize:   'clamp(14px,2vw,17px)',
            maxWidth:    520,
            margin:     '0 auto 40px',
            lineHeight:  1.7,
          }}>
            Industry-recognised credentials from top platforms — each with a verifiable credential link.
          </p>
        </FadeIn>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: '0 clamp(16px,5vw,56px) 8px' }}>
        <CertStats />
      </section>

      {/* ── Filter tabs ── */}
      <section style={{ padding: '0 clamp(16px,5vw,56px) 48px', maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display:        'flex',
          gap:            'clamp(6px,1.5vw,10px)',
          flexWrap:       'wrap',
          justifyContent: 'center',
          marginBottom:   'clamp(32px,4vw,48px)',
        }}>
          {certCategories.map(cat => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileTap={{ scale: 0.95 }}
              style={{
                padding:     'clamp(7px,1.5vw,10px) clamp(14px,2.5vw,22px)',
                borderRadius: 'var(--radius-full)',
                fontSize:    '13px',
                fontWeight:   500,
                cursor:      'pointer',
                fontFamily:  'var(--font-sans)',
                border:      'none',
                outline:     'none',
                transition:  'all 0.2s ease',
                background:   activeCategory === cat
                  ? 'var(--gradient-primary)'
                  : 'rgba(255,255,255,0.06)',
                color:        activeCategory === cat ? '#ffffff' : 'rgba(255,255,255,0.55)',
                boxShadow:    activeCategory === cat ? 'var(--shadow-primary)' : 'none',
              }}
            >
              {cat}
              {cat !== 'All' && (
                <span style={{ marginLeft: 6, opacity: 0.6, fontSize: 11 }}>
                  ({certifications.filter(c => c.category === cat).length})
                </span>
              )}
            </motion.button>
          ))}
        </div>

        {/* ── Grid ── */}
        <motion.div
          layout
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
            gap:                 'clamp(14px,2vw,22px)',
          }}
        >
          <AnimatePresence>
            {filtered.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p style={{
            textAlign:  'center',
            color:      'var(--text-faint)',
            padding:    '80px 0',
            fontFamily: 'var(--font-mono)',
            fontSize:   '14px',
          }}>
            No certifications in this category yet.
          </p>
        )}
      </section>

      {/* ── Bottom CTA ── */}
      <section style={{
        textAlign:  'center',
        padding:    'clamp(32px,5vw,64px) clamp(16px,5vw,48px)',
        borderTop:  '1px solid rgba(255,255,255,0.06)',
      }}>
        <p style={{ color: 'var(--text-faint)', fontFamily: 'var(--font-mono)', fontSize: '12px', marginBottom: 16 }}>
          All credentials are verifiable via the issuer's official platform
        </p>
        <a
          href="/about"
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:             8,
            padding:        '12px 28px',
            borderRadius:   'var(--radius-full)',
            textDecoration: 'none',
            fontSize:       '14px',
            fontWeight:      600,
            fontFamily:     'var(--font-sans)',
            background:     'rgba(145,94,255,0.12)',
            border:         '1px solid rgba(145,94,255,0.3)',
            color:          'var(--color-primary)',
            transition:     'all 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(145,94,255,0.22)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(145,94,255,0.12)' }}
        >
          ← Back to About
        </a>
      </section>
    </main>
  )
}