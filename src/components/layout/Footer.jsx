import { social, contact, codingProfiles } from '../../data/social'

const links = [
  { label:'Home',     href:'/'         },
  { label:'About',    href:'/about'    },
  { label:'Skills',   href:'/skills'   },
  { label:'Projects', href:'/projects' },
  { label:'Contact',  href:'/contact'  },
]

export default function Footer() {
  return (
    <footer style={{ borderTop:'1px solid rgba(255,255,255,0.07)', background:'rgba(5,8,22,0.98)', padding:'48px clamp(20px,5vw,56px) 28px' }}
      role="contentinfo" aria-label="Site footer">
      <div style={{ maxWidth:1200, margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))', gap:40, marginBottom:40 }}>
          {/* Brand */}
          <div>
            <p style={{ fontFamily:'Syne,sans-serif',fontWeight:700,fontSize:22,background:'linear-gradient(135deg,#915EFF,#00d4ff)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',marginBottom:10 }}>S JEEVAN</p>
            <p style={{ color:'rgba(255,255,255,0.4)',fontSize:13,lineHeight:1.7,marginBottom:14 }}>
              B.Tech AI & DS Student | Full Stack Developer.<br />Building things that matter.
            </p>
            <div style={{ display:'flex',alignItems:'center',gap:6 }}>
              <span style={{ width:7,height:7,borderRadius:'50%',background:'#4ade80',boxShadow:'0 0 8px #4ade80' }} />
              <span style={{ color:'#4ade80',fontSize:12,fontFamily:'Fira Code,monospace' }}>Open to opportunities</span>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p style={{ color:'rgba(255,255,255,0.3)',fontFamily:'Fira Code,monospace',fontSize:11,letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:16 }}>Navigation</p>
            <nav aria-label="Footer navigation" style={{ display:'flex',flexDirection:'column',gap:10 }}>
              {links.map(({ label, href }) => (
                <a key={label} href={href} style={{ color:'rgba(255,255,255,0.55)',fontSize:14,textDecoration:'none',transition:'color 0.2s' }}
                  onMouseEnter={e=>e.target.style.color='#915EFF'} onMouseLeave={e=>e.target.style.color='rgba(255,255,255,0.55)'}>
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p style={{ color:'rgba(255,255,255,0.3)',fontFamily:'Fira Code,monospace',fontSize:11,letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:16 }}>Connect</p>
            <div style={{ display:'flex',flexDirection:'column',gap:10 }}>
              {social.map(({ name, url }) => (
                <a key={name} href={url} target="_blank" rel="noreferrer"
                  style={{ color:'rgba(255,255,255,0.55)',fontSize:14,textDecoration:'none',transition:'color 0.2s',display:'flex',alignItems:'center',gap:6 }}
                  onMouseEnter={e=>e.currentTarget.style.color='#915EFF'} onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.55)'}>
                  <span style={{ fontSize:11 }}>↗</span>{name}
                </a>
              ))}
              <a href={`mailto:${contact.email}`}
                style={{ color:'rgba(255,255,255,0.55)',fontSize:13,textDecoration:'none',fontFamily:'Fira Code,monospace',marginTop:4 }}>
                {contact.email}
              </a>
            </div>
          </div>

          {/* Resume CTA */}
          <div>
            <p style={{ color:'rgba(255,255,255,0.3)',fontFamily:'Fira Code,monospace',fontSize:11,letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:16 }}>Resume</p>
            <a href="/resume.pdf" download="YourName_Resume.pdf"
              style={{ display:'inline-flex',alignItems:'center',gap:8,padding:'12px 22px',borderRadius:12,background:'linear-gradient(135deg,#915EFF,#00d4ff)',color:'#fff',textDecoration:'none',fontWeight:700,fontSize:14,boxShadow:'0 4px 20px rgba(145,94,255,0.35)' }}>
              ⬇ Download CV
            </a>
            <p style={{ color:'rgba(255,255,255,0.25)',fontSize:11,fontFamily:'Fira Code,monospace',marginTop:10 }}>{contact.location}</p>
          </div>
        </div>

        <div style={{ borderTop:'1px solid rgba(255,255,255,0.06)',paddingTop:20,display:'flex',flexWrap:'wrap',gap:12,alignItems:'center',justifyContent:'space-between' }}>
          <p style={{ color:'rgba(255,255,255,0.2)',fontSize:12,fontFamily:'Fira Code,monospace' }}>
            © {new Date().getFullYear()} Jeevan · Built with React + Spring Boot.
          </p>
          <p style={{ color:'rgba(255,255,255,0.15)',fontSize:11,fontFamily:'Fira Code,monospace' }}>
            Github · Vercel
          </p>
        </div>
      </div>
    </footer>
  )
}