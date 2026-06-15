/**
 * SectionTitle.jsx — zero Tailwind
 */
import { motion } from 'framer-motion'
import { useInView } from '../../hooks/useInView'

export default function SectionTitle({ eyebrow, title, subtitle }) {
  const [ref, inView] = useInView()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBottom: '56px', textAlign: 'center' }}
    >
      {eyebrow && (
        <p style={{
          color:          'var(--color-primary)',
          fontFamily:     'var(--font-mono)',
          fontSize:       '12px',
          letterSpacing:  '0.18em',
          textTransform:  'uppercase',
          marginBottom:   '12px',
        }}>
          {eyebrow}
        </p>
      )}
      <h2 style={{
        fontFamily:  'var(--font-display)',
        fontWeight:  800,
        fontSize:    'clamp(2rem, 4vw, 3rem)',
        color:       '#ffffff',
        marginBottom:'10px',
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          color:     'var(--text-muted)',
          maxWidth:  '560px',
          margin:    '0 auto',
          fontSize:  '15px',
          lineHeight: 1.7,
        }}>
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}