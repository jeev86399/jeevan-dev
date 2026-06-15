/**
 * Badge.jsx — zero Tailwind
 */
export default function Badge({ label, color }) {
  const c = color || 'var(--color-primary)'
  return (
    <span style={{
      padding:      '4px 12px',
      borderRadius: 'var(--radius-full)',
      fontSize:     '12px',
      fontFamily:   'var(--font-mono)',
      color:         c,
      background:   `${c}18`,
      border:       `1px solid ${c}33`,
      display:      'inline-block',
    }}>
      {label}
    </span>
  )
}