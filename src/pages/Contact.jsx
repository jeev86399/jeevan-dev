/**
 * Contact.jsx — production final
 * EmailJS integration with real success/error states.
 * Setup: npm install @emailjs/browser
 * Then fill YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_PUBLIC_KEY
 * from https://www.emailjs.com (free tier = 200 emails/month)
 */
import { Suspense, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import ContactScene from '../three/scenes/ContactScene'
import { social, contact } from '../data/social'

// ── EmailJS send (graceful fallback if not configured) ────────
async function sendViaEmailJS(form) {
  // Replace these three values with your EmailJS dashboard values
  const SERVICE_ID  = 'service_2lr5qm7';
const TEMPLATE_ID = 'template_r5ktou6';
const PUBLIC_KEY  = 'WDrStrgU-B9XWKGJY';

  if (SERVICE_ID === 'YOUR_SERVICE_ID') {
    // Not configured yet — simulate success so UI works during dev
    await new Promise(r => setTimeout(r, 1000))
    return { ok: true, simulated: true }
  }

  const { default: emailjs } = await import('@emailjs/browser')
  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      from_name:    form.name,
      from_email:   form.email,
      message:      form.message,
      to_name:      'YourName',
    }, PUBLIC_KEY)
    return { ok: true }
  } catch (err) {
    console.error('EmailJS error:', err)
    return { ok: false, error: err?.text || 'Failed to send' }
  }
}

// ── Field component ───────────────────────────────────────────
function Field({ label, name, type = 'text', placeholder, value, onChange, required, rows }) {
  const [focused, setFocused] = useState(false)
  const base = {
    width: '100%', padding: '12px 16px', borderRadius: 12,
    background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${focused ? 'rgba(145,94,255,0.7)' : 'rgba(255,255,255,0.1)'}`,
    color: '#fff', fontSize: 14, outline: 'none',
    fontFamily: 'Space Grotesk, sans-serif',
    transition: 'border-color 0.2s',
    resize: rows ? 'none' : undefined,
  }
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13, display: 'block', marginBottom: 7,
        fontFamily: 'Fira Code, monospace' }}>
        {label}
      </label>
      {rows ? (
        <textarea
          name={name} placeholder={placeholder} value={value}
          onChange={onChange} required={required} rows={rows}
          style={base}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          name={name} type={type} placeholder={placeholder} value={value}
          onChange={onChange} required={required}
          style={base}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        />
      )}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────
export default function Contact() {
  const [form,   setForm]   = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errMsg, setErrMsg] = useState('')

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault()
    setStatus('sending')
    setErrMsg('')
    const result = await sendViaEmailJS(form)
    if (result.ok) {
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
      setTimeout(() => setStatus('idle'), 5000)
    } else {
      setStatus('error')
      setErrMsg(result.error || 'Something went wrong. Try emailing directly.')
      setTimeout(() => setStatus('idle'), 6000)
    }
  }

  return (
    <main style={{ background: '#050816', minHeight: '100vh', paddingTop: 80 }}>

      {/* ── 3D Banner ── */}
      <section style={{ position: 'relative', height: '42vh', overflow: 'hidden' }}>
        <Suspense fallback={<div style={{ width:"100%", height:"100%", background:"linear-gradient(90deg,rgba(145,94,255,0.05) 25%,rgba(145,94,255,0.12) 50%,rgba(145,94,255,0.05) 75%)", backgroundSize:"200% 100%", animation:"shimmer 1.8s infinite", position:"absolute", inset:0 }}><style>{"@keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}"}</style></div>}><ContactScene /></Suspense>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,8,22,0.4), #050816)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <p style={{ color: '#915EFF', fontFamily: 'Fira Code,monospace', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Let's connect</p>
          <motion.h1 initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }}
            style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(2.5rem,6vw,5rem)',
              background:'linear-gradient(135deg,#915EFF,#00d4ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>
            Contact
          </motion.h1>
        </div>
      </section>

      {/* ── Form + Info ── */}
      <section style={{ maxWidth: 1000, margin: '0 auto', padding: 'clamp(32px,5vw,64px) clamp(16px,5vw,40px)' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p style={{ color:'#915EFF', fontFamily:'Fira Code,monospace', fontSize:12, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:12 }}>Let's Talk</p>
          <h2 style={{ fontFamily:'Syne,sans-serif', fontWeight:800, fontSize:'clamp(2rem,4vw,3rem)', color:'#fff', marginBottom:10 }}>Get in Touch</h2>
          <p style={{ color:'rgba(255,255,255,0.4)', fontSize:15 }}>Have a project in mind or just want to say hi? My inbox is open.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: 'clamp(32px,5vw,56px)', alignItems: 'start' }}>

          {/* ── Left: Form ── */}
          <motion.form onSubmit={onSubmit}
            initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>

            <Field label="Your Name"      name="name"    placeholder="John Doe"           value={form.name}    onChange={onChange} required />
            <Field label="Email Address"  name="email"   type="email" placeholder="john@example.com" value={form.email}   onChange={onChange} required />
            <Field label="Message"        name="message" placeholder="Tell me about your project..." value={form.message} onChange={onChange} required rows={5} />

            {/* Status feedback */}
            {status === 'error' && (
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
                style={{ marginBottom:14, padding:'10px 16px', borderRadius:10, background:'rgba(255,107,107,0.12)', border:'1px solid rgba(255,107,107,0.3)', color:'#ff6b6b', fontSize:13 }}>
                ✕ {errMsg}
              </motion.div>
            )}
            {status === 'sent' && (
              <motion.div initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }}
                style={{ marginBottom:14, padding:'10px 16px', borderRadius:10, background:'rgba(74,222,128,0.1)', border:'1px solid rgba(74,222,128,0.3)', color:'#4ade80', fontSize:13 }}>
                ✓ Message sent! I'll get back to you soon.
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              whileHover={status === 'idle' ? { scale:1.02, boxShadow:'0 8px 30px rgba(145,94,255,0.5)' } : {}}
              whileTap={status === 'idle' ? { scale:0.98 } : {}}
              style={{
                width: '100%', padding: '14px', borderRadius: 999, border: 'none',
                background: status === 'sent'
                  ? 'linear-gradient(135deg,#4ade80,#22c55e)'
                  : status === 'error'
                  ? 'linear-gradient(135deg,#ff6b6b,#ef4444)'
                  : 'linear-gradient(135deg,#915EFF,#00d4ff)',
                color: '#fff', fontFamily: 'Space Grotesk,sans-serif',
                fontWeight: 700, fontSize: 15, cursor: status === 'idle' ? 'pointer' : 'default',
                boxShadow: '0 4px 20px rgba(145,94,255,0.35)',
                transition: 'background 0.3s',
                opacity: status === 'sending' ? 0.7 : 1,
              }}
            >
              {status === 'sending' ? '⏳ Sending...'
               : status === 'sent'  ? '✓ Message Sent!'
               : status === 'error' ? '✕ Try Again'
               : 'Send Message →'}
            </motion.button>

            <p style={{ color:'rgba(255,255,255,0.25)', fontSize:11, fontFamily:'Fira Code,monospace', marginTop:12, textAlign:'center' }}>
              © 2026 S Jeevan · AI & Data Science Engineer
            </p>
          </motion.form>

          {/* ── Right: Info ── */}
          <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
            style={{ display:'flex', flexDirection:'column', gap:28 }}>

            {[
              { label:'Email',    value: <a href={`mailto:${contact.email}`} style={{ color:'#fff', textDecoration:'none' }}>{contact.email}</a> },
              { label:'Location', value: <span style={{ color:'#fff' }}>{contact.location}</span> },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ color:'rgba(255,255,255,0.3)', fontFamily:'Fira Code,monospace', fontSize:11, letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:6 }}>{label}</p>
                <div style={{ fontSize:15 }}>{value}</div>
              </div>
            ))}

            <div>
              <p style={{ color:'rgba(255,255,255,0.3)', fontFamily:'Fira Code,monospace', fontSize:11, letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:12 }}>Socials</p>
              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {social.map(({ name, url }) => (
                  <a key={name} href={url} target="_blank" rel="noreferrer"
                    style={{ display:'flex', alignItems:'center', gap:12, color:'rgba(255,255,255,0.55)', textDecoration:'none', fontSize:14, transition:'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#915EFF'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                  >
                    <span style={{ width:32, height:32, borderRadius:'50%', background:'rgba(145,94,255,0.1)', border:'1px solid rgba(145,94,255,0.25)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12 }}>↗</span>
                    {name}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            <div style={{ background:'rgba(74,222,128,0.07)', border:'1px solid rgba(74,222,128,0.2)', borderRadius:16, padding:'18px 20px' }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6 }}>
                <span style={{ width:8, height:8, borderRadius:'50%', background:'#4ade80', boxShadow:'0 0 8px #4ade80', animation:'pulse 2s infinite' }} />
                <span style={{ color:'#4ade80', fontWeight:600, fontSize:14 }}>Open to opportunities</span>
              </div>
              <p style={{ color:'rgba(255,255,255,0.45)', fontSize:13 }}>Open to engineering roles and technical collaborations. Let’s build something impactful together.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}`}</style>
    </main>
  )
}