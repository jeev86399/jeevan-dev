import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <main style={{
      background:     'var(--color-bg)',
      minHeight:       '100vh',
      display:         'flex',
      flexDirection:   'column',
      alignItems:      'center',
      justifyContent:  'center',
      textAlign:       'center',
      padding:         '0 24px',
    }}>
      <motion.p
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          fontFamily:             'var(--font-display)',
          fontWeight:              800,
          fontSize:               'clamp(6rem, 20vw, 10rem)',
          background:             'var(--gradient-primary)',
          WebkitBackgroundClip:   'text',
          WebkitTextFillColor:    'transparent',
          backgroundClip:         'text',
          lineHeight:              1,
          marginBottom:           '16px',
        }}
      >
        404
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          color:        'var(--text-muted)',
          fontSize:     '18px',
          marginBottom: '32px',
          fontFamily:   'var(--font-sans)',
        }}
      >
        This page doesn't exist in this dimension.
      </motion.p>

      <Link
        to="/"
        style={{
          padding:        '13px 32px',
          background:     'var(--gradient-primary)',
          borderRadius:   'var(--radius-full)',
          color:           '#ffffff',
          fontFamily:     'var(--font-sans)',
          fontWeight:      700,
          fontSize:        '15px',
          textDecoration: 'none',
          boxShadow:      'var(--shadow-primary)',
          transition:     'transform 0.15s ease, box-shadow 0.15s ease',
          display:        'inline-block',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = 'var(--shadow-primary-lg)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.boxShadow = 'var(--shadow-primary)' }}
      >
        ← Back to Home
      </Link>
    </main>
  )
}