/**
 * ProjectCard.jsx — zero Tailwind
 * Fully inline styles using CSS custom properties.
 * Shows GitHub + Live Demo buttons, tech tags, metrics.
 */
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ProjectCard({ project, index, onOpenDetail }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      onClick={() => onOpenDetail?.(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background:    'rgba(255, 255, 255, 0.04)',
        border:        `1px solid ${hovered ? project.color + '44' : 'rgba(255,255,255,0.08)'}`,
        borderRadius:  'var(--radius-lg)',
        overflow:      'hidden',
        cursor:        'pointer',
        display:       'flex',
        flexDirection: 'column',
        transition:    'border-color 0.25s ease, box-shadow 0.25s ease',
        boxShadow:     hovered ? `0 0 32px ${project.color}28` : 'none',
      }}
    >
      {/* ── Colour header ── */}
      <div style={{
        height:     140,
        background: `linear-gradient(135deg, ${project.color}30, #050816)`,
        position:   'relative',
        flexShrink: 0,
        overflow:   'hidden'
      }}>
        <div style={{
          position:   'absolute',
          inset:       0,
          background: `radial-gradient(circle at 60% 40%, ${project.color}50, transparent 65%)`,
        }} />

        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6, position: 'absolute', inset: 0 }}
          />
        )}

        {/* Category pill */}
        <span style={{
          position:       'absolute',
          top:             12,
          left:            14,
          background:     'rgba(5, 8, 22, 0.75)',
          backdropFilter: 'blur(8px)',
          border:         `1px solid ${project.color}44`,
          borderRadius:   'var(--radius-full)',
          padding:        '4px 12px',
          color:           project.color,
          fontSize:        '11px',
          fontFamily:     'var(--font-mono)',
        }}>
          {project.category}
        </span>

        {/* Year */}
        {project.year && (
          <span style={{
            position:   'absolute',
            top:         12,
            right:       14,
            background: 'rgba(5, 8, 22, 0.75)',
            borderRadius:'var(--radius-full)',
            padding:    '4px 10px',
            color:       'rgba(255,255,255,0.4)',
            fontSize:    '11px',
            fontFamily: 'var(--font-mono)',
          }}>
            {project.year}
          </span>
        )}
      </div>

      {/* ── Body ── */}
      <div style={{
        padding:        '20px 22px',
        display:        'flex',
        flexDirection:  'column',
        gap:             '12px',
        flex:            1,
      }}>
        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize:   '18px',
          color:       hovered ? 'var(--color-primary)' : '#ffffff',
          transition: 'color 0.2s',
          margin:      0,
        }}>
          {project.title}
        </h3>

        {/* Description */}
        <p style={{
          color:       'var(--text-muted)',
          fontSize:    '13px',
          lineHeight:   1.75,
          margin:       0,
        }}>
          {project.description}
        </p>

        {/* Metrics */}
        {project.metrics?.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {project.metrics.map(m => (
              <span key={m} style={{
                padding:     '3px 10px',
                borderRadius:'var(--radius-full)',
                fontSize:    '11px',
                background:  'rgba(74, 222, 128, 0.1)',
                border:      '1px solid rgba(74, 222, 128, 0.2)',
                color:       'var(--color-success)',
                fontFamily:  'var(--font-mono)',
              }}>
                ✓ {m}
              </span>
            ))}
          </div>
        )}

        {/* Tech tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {project.tags.slice(0, 5).map(tag => (
            <span key={tag} style={{
              padding:     '4px 12px',
              borderRadius:'var(--radius-full)',
              fontSize:    '11px',
              fontFamily:  'var(--font-mono)',
              background:  `${project.color}18`,
              border:      `1px solid ${project.color}33`,
              color:        project.color,
            }}>
              {tag}
            </span>
          ))}
          {project.tags.length > 5 && (
            <span style={{
              padding:    '4px 10px',
              borderRadius:'var(--radius-full)',
              fontSize:   '11px',
              color:       'var(--text-faint)',
              fontFamily: 'var(--font-mono)',
            }}>
              +{project.tags.length - 5}
            </span>
          )}
        </div>

        {/* ── Action buttons ── */}
        <div style={{
          display:    'flex',
          gap:         '10px',
          marginTop:  'auto',
          paddingTop: '4px',
        }}>
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              flex:           1,
              padding:        '9px',
              borderRadius:   'var(--radius-sm)',
              textAlign:      'center',
              textDecoration: 'none',
              background:     'rgba(255, 255, 255, 0.06)',
              border:         '1px solid rgba(255, 255, 255, 0.1)',
              color:          'rgba(255, 255, 255, 0.8)',
              fontSize:       '13px',
              fontWeight:     600,
              fontFamily:     'var(--font-sans)',
              transition:     'background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
          >
            GitHub ↗
          </a>

          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                flex:           1,
                padding:        '9px',
                borderRadius:   'var(--radius-sm)',
                textAlign:      'center',
                textDecoration: 'none',
                background:     `linear-gradient(135deg, ${project.color}, ${project.color}bb)`,
                color:          '#ffffff',
                fontSize:       '13px',
                fontWeight:     700,
                fontFamily:     'var(--font-sans)',
                transition:     'opacity 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              Live Demo ↗
            </a>
          ) : (
            <span style={{
              flex:         1,
              padding:      '9px',
              borderRadius: 'var(--radius-sm)',
              textAlign:    'center',
              background:   'rgba(255, 255, 255, 0.03)',
              border:       '1px solid rgba(255, 255, 255, 0.06)',
              color:        'var(--text-ghost)',
              fontSize:     '13px',
              fontFamily:   'var(--font-sans)',
            }}>
              No live demo
            </span>
          )}
        </div>
      </div>
    </motion.article>
  )
}