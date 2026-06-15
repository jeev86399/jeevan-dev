import { motion } from 'framer-motion'

export default function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position:       'fixed',
        inset:           0,
        zIndex:          9999,
        background:     'var(--color-bg)',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        gap:             '24px',
      }}
    >
      {/* Spinning rings */}
      <div style={{ position: 'relative', width: 80, height: 80 }}>
        {[
          { size: '100%',  border: '2px solid rgba(145,94,255,0.2)', duration: '3s',   direction: 'normal'  },
          { size: '75%',   border: '2px solid transparent',          duration: '1.5s', direction: 'normal',  borderTop: '2px solid var(--color-primary)' },
          { size: '50%',   border: '2px solid transparent',          duration: '1s',   direction: 'reverse', borderBottom: '2px solid var(--color-secondary)' },
        ].map(({ size, border, duration, direction, borderTop, borderBottom }, i) => (
          <div key={i} style={{
            position:     'absolute',
            top:          `${i * 12.5}%`,
            left:         `${i * 12.5}%`,
            width:         size,
            height:        size,
            borderRadius: '50%',
            border,
            borderTop,
            borderBottom,
            animation:    `loaderSpin ${duration} linear infinite ${direction}`,
          }} />
        ))}
        <div style={{
          position:       'absolute',
          inset:           0,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          color:          'var(--color-primary)',
          fontFamily:     'var(--font-mono)',
          fontSize:       '12px',
          fontWeight:      600,
        }}>
          3D
        </div>
      </div>

      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        style={{
          color:      'rgba(255,255,255,0.5)',
          fontFamily: 'var(--font-mono)',
          fontSize:   '13px',
        }}
      >
        Initialising scene...
      </motion.p>

      <style>{`
        @keyframes loaderSpin {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  )
}