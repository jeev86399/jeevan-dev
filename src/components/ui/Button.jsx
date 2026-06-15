/**
 * Button.jsx — zero Tailwind
 * Uses CSS custom properties from variables.css
 */
import { motion } from 'framer-motion'

const base = {
  display:        'inline-flex',
  alignItems:     'center',
  gap:            '8px',
  padding:        '12px 28px',
  borderRadius:   'var(--radius-full)',
  fontFamily:     'var(--font-sans)',
  fontWeight:     600,
  fontSize:       '14px',
  cursor:         'pointer',
  textDecoration: 'none',
  transition:     'transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease',
  border:         'none',
  outline:        'none',
  whiteSpace:     'nowrap',
}

const variants = {
  primary: {
    ...base,
    background: 'var(--gradient-primary)',
    color:      '#ffffff',
    boxShadow:  'var(--shadow-primary)',
  },
  outline: {
    ...base,
    background: 'transparent',
    color:      'var(--color-primary)',
    border:     '1px solid rgba(145, 94, 255, 0.5)',
  },
  ghost: {
    ...base,
    background: 'transparent',
    color:      'rgba(255, 255, 255, 0.7)',
  },
}

export default function Button({
  children,
  variant  = 'primary',
  href,
  onClick,
  download,
  disabled,
  style    = {},
}) {
  const s = { ...variants[variant], ...style }

  if (href) {
    return (
      <motion.a
        href={href}
        download={download || undefined}
        target={download ? undefined : '_blank'}
        rel="noreferrer"
        style={s}
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.97 }}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      style={{ ...s, opacity: disabled ? 0.6 : 1, cursor: disabled ? 'default' : 'pointer' }}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
    >
      {children}
    </motion.button>
  )
}