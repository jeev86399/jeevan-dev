import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { path: '/',         label: 'Home'     },
  { path: '/about',    label: 'About'    },
  { path: '/skills',   label: 'Skills'   },
  { path: '/projects', label: 'Projects' },
  { path: '/contact',        label: 'Contact'       },
  { path: '/certifications', label: 'Certificates'   },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])
  useEffect(() => setMenuOpen(false), [location])

  const handleResume = e => { e.preventDefault(); window.open('/resume.pdf', '_blank', 'noopener,noreferrer') }

  const nav = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9000,
    padding: '12px clamp(16px,4vw,56px)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    transition: 'background 0.3s, backdrop-filter 0.3s',
    background: scrolled ? 'rgba(5,8,22,0.88)' : 'transparent',
    backdropFilter: scrolled ? 'blur(14px)' : 'none',
    WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
    borderBottom: scrolled ? '1px solid rgba(145,94,255,0.12)' : 'none',
  }
  const linkS = isActive => ({
    textDecoration: 'none', fontSize: 14, fontWeight: 500,
    color: isActive ? '#915EFF' : 'rgba(255,255,255,0.65)',
    transition: 'color 0.2s', paddingBottom: 4,
    borderBottom: isActive ? '2px solid #915EFF' : '2px solid transparent',
  })

  return (
    <motion.nav initial={{ y:-80,opacity:0 }} animate={{ y:0,opacity:1 }} transition={{ duration:0.6,ease:'easeOut' }}
      style={nav} role="navigation" aria-label="Main navigation">
      {/* Logo */}
      <NavLink to="/" aria-label="Home" style={{ display:'flex', alignItems:'center', gap:10, textDecoration:'none' }}>
        <div style={{ width:36,height:36,borderRadius:'50%',background:'linear-gradient(135deg,#915EFF,#00d4ff)',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700,fontSize:13,boxShadow:'0 0 20px rgba(145,94,255,0.4)',flexShrink:0 }}>SJ</div>
        <span style={{ fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:18,background:'linear-gradient(135deg,#915EFF,#00d4ff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent' }}>S JEEVAN</span>
      </NavLink>

      {/* Desktop */}
      <div className="nav-desktop" style={{ display:'flex', alignItems:'center', gap:32 }} role="list">
        {links.map(({ path, label }) => (
          <NavLink key={path} to={path} role="listitem" style={({ isActive }) => linkS(isActive)} aria-current={location.pathname===path ? 'page' : undefined}>
            {label}
          </NavLink>
        ))}
        <motion.a href="/resume.pdf" onClick={handleResume} aria-label="Download Resume (PDF)"
          whileHover={{ scale:1.05, boxShadow:'0 0 20px rgba(145,94,255,0.5)' }} whileTap={{ scale:0.97 }}
          style={{ textDecoration:'none', fontSize:13, fontWeight:700, color:'#fff', background:'linear-gradient(135deg,#915EFF,#00d4ff)', padding:'9px 20px', borderRadius:999, display:'inline-flex', alignItems:'center', gap:6, boxShadow:'0 4px 16px rgba(145,94,255,0.35)' }}>
          ⬇ Resume
        </motion.a>
      </div>

      {/* Mobile toggle */}
      <button onClick={() => setMenuOpen(o=>!o)} aria-label={menuOpen?'Close menu':'Open menu'} aria-expanded={menuOpen}
        style={{ display:'none', flexDirection:'column', gap:5, background:'none', border:'none', cursor:'pointer', padding:6 }}
        className="nav-mobile-btn">
        {[0,1,2].map(i => (
          <span key={i} style={{ display:'block',width:22,height:2,background:'#fff',borderRadius:2,transition:'all 0.3s',
            transform: menuOpen ? (i===0?'rotate(45deg) translate(5px,5px)':i===2?'rotate(-45deg) translate(5px,-5px)':'scaleX(0)') : 'none' }} />
        ))}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity:0,y:-12 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-12 }}
            style={{ position:'absolute',top:'100%',left:0,right:0,background:'rgba(5,8,22,0.98)',backdropFilter:'blur(16px)',borderBottom:'1px solid rgba(145,94,255,0.15)',padding:'20px 28px',display:'flex',flexDirection:'column',gap:18 }}>
            {links.map(({ path, label }) => (
              <NavLink key={path} to={path} style={({ isActive }) => ({ ...linkS(isActive), fontSize:16 })}>{label}</NavLink>
            ))}
            <a href="/resume.pdf" onClick={handleResume}
              style={{ padding:'12px', borderRadius:12, textAlign:'center', textDecoration:'none', background:'linear-gradient(135deg,#915EFF,#00d4ff)', color:'#fff', fontSize:15, fontWeight:700 }}>
              ⬇ Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile-btn { display: none !important; }
        }
        .nav-link-item:hover { color: var(--color-primary) !important; }
      `}</style>
    </motion.nav>
  )
}