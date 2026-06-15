import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills } from '../../data/skills'
import { projects } from '../../data/projects'
import { contact, social } from '../../data/social'

// ─────────────────────────────────────────────
// Predefined responses using your real data
// ─────────────────────────────────────────────
const RESPONSES = [
  {
    match: ['hi', 'hello', 'hey', 'sup', 'yo', 'hii'],
    reply: () => `Hey there! 👋 I'm a chatbot for this portfolio. Ask me anything like:\n• "who are you"\n• "skills"\n• "projects"\n• "contact"\n• "available for work?"`,
  },
  {
    match: ['who are you', 'about you', 'introduce', 'about', 'tell me', 'yourself'],
    reply: () => `I'm Jeevan's chatbot,— a Full Stack Developer & UI/UX Designer based in ${contact.location}.\n\nI build fast, beautiful, production-ready apps from backend APIs to immersive 3D web experiences. Currently ${contact.available ? '🟢 open to work!' : '🔴 not available'}`,
  },
  {
    match: ['skill', 'tech', 'stack', 'know', 'language', 'framework', 'tools'],
    reply: () => {
      const frontend = skills.filter(s => s.category === 'Frontend').map(s => s.name).join(', ')
      const backend  = skills.filter(s => s.category === 'Backend').map(s => s.name).join(', ')
      const devops   = skills.filter(s => s.category === 'DevOps').map(s => s.name).join(', ')
      return `Here's my tech stack 🛠️\n\n⚛️ Frontend: ${frontend}\n\n🟢 Backend: ${backend}\n\n🐳 DevOps: ${devops}`
    },
  },
  {
    match: ['project', 'work', 'built', 'portfolio', 'show', 'what have'],
    reply: () => {
      const list = projects.map(p => `• ${p.title} (${p.category})`).join('\n')
      return `Here are my projects 🚀\n\n${list}\n\nVisit /projects for full details, live demos & GitHub links!`
    },
  },
  {
    match: ['contact', 'reach', 'email', 'hire', 'message', 'connect'],
    reply: () => `Let's connect! 📬\n\n📧 Email: ${contact.email}\n📍 Location: ${contact.location}\n\n${social.map(s => `🔗 ${s.name}: ${s.url}`).join('\n')}\n\nOr just visit /contact to send me a message directly!`,
  },
  {
    match: ['available', 'freelance', 'hire', 'job', 'open to work', 'opportunity'],
    reply: () => contact.available
      ? `Yes! 🟢 I'm currently open to:\n• Freelance projects\n• Full-time roles\n• Collaborations\n\nDrop me an email at ${contact.email} or visit /contact!`
      : `I'm currently not available for new projects, but feel free to reach out at ${contact.email} for future opportunities!`,
  },
  {
    match: ['experience', 'years', 'background', 'career'],
    reply: () => `I have 3+ years of experience as a Full Stack Developer.\n\n📌 Currently: Full Stack Developer\n📌 Previously: Frontend Dev at Startup XYZ\n📌 Before that: Freelance UI/UX & Dev\n\nVisit /about for my full timeline!`,
  },
  {
    match: ['resume', 'cv', 'download'],
    reply: () => `You can download my resume here 📄\n👉 ${window.location.origin}/resume.pdf\n\nOr visit /about and click "Download Resume"!`,
  },
  {
    match: ['thank', 'thanks', 'great', 'awesome', 'cool', 'nice'],
    reply: () => `You're welcome! 😊 Feel free to ask anything else or explore the portfolio!`,
  },
  {
    match: ['bye', 'goodbye', 'see you', 'cya', 'exit'],
    reply: () => `Goodbye! 👋 Feel free to come back anytime. Don't forget to check out /projects!`,
  },
]

const FALLBACK = `Hmm, I'm not sure about that 🤔\nTry asking:\n• "skills"\n• "projects"\n• "contact"\n• "available for work?"\n• "tell me about yourself"`

function getReply(input) {
  const lower = input.toLowerCase().trim()
  for (const { match, reply } of RESPONSES) {
    if (match.some(keyword => lower.includes(keyword))) {
      return reply()
    }
  }
  return FALLBACK
}

// ─────────────────────────────────────────────
// Single message bubble
// ─────────────────────────────────────────────
function Bubble({ msg }) {
  const isBot = msg.from === 'bot'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      style={{
        display: 'flex',
        justifyContent: isBot ? 'flex-start' : 'flex-end',
        marginBottom: 10,
      }}
    >
      {isBot && (
        <div style={{
          width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #915EFF, #00d4ff)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 13, marginRight: 8, marginTop: 2,
        }}>
          🤖
        </div>
      )}
      <div style={{
        maxWidth: '78%',
        padding: '10px 14px',
        borderRadius: isBot ? '4px 16px 16px 16px' : '16px 4px 16px 16px',
        background: isBot
          ? 'rgba(145,94,255,0.12)'
          : 'linear-gradient(135deg, #915EFF, #00d4ff)',
        color: '#fff',
        fontSize: 13,
        lineHeight: 1.6,
        whiteSpace: 'pre-wrap',
        border: isBot ? '1px solid rgba(145,94,255,0.25)' : 'none',
        boxShadow: isBot ? 'none' : '0 4px 16px rgba(145,94,255,0.3)',
      }}>
        {msg.text}
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// Typing indicator
// ─────────────────────────────────────────────
function TypingDots() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
      <div style={{
        width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
        background: 'linear-gradient(135deg, #915EFF, #00d4ff)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13,
      }}>🤖</div>
      <div style={{
        padding: '10px 16px',
        background: 'rgba(145,94,255,0.12)',
        border: '1px solid rgba(145,94,255,0.25)',
        borderRadius: '4px 16px 16px 16px',
        display: 'flex', gap: 5, alignItems: 'center',
      }}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            style={{ width: 6, height: 6, borderRadius: '50%', background: '#915EFF' }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Quick suggestion chips
// ─────────────────────────────────────────────
const CHIPS = ['skills', 'projects', 'contact', 'available?']

// ─────────────────────────────────────────────
// Main ChatBot component
// ─────────────────────────────────────────────
export default function ChatBot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, from: 'bot', text: `Hey! 👋 I'm YourName's portfolio assistant.\nAsk me about skills, projects, or how to get in touch!` },
  ])
  const [input, setInput]   = useState('')
  const [typing, setTyping] = useState(false)
  const [unread, setUnread] = useState(1)
  const bottomRef           = useRef(null)
  const inputRef            = useRef(null)

  // Scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  function sendMessage(text) {
    const userMsg = text.trim() || input.trim()
    if (!userMsg) return
    setInput('')

    const userBubble = { id: Date.now(), from: 'user', text: userMsg }
    setMessages(prev => [...prev, userBubble])
    setTyping(true)

    // Simulate bot thinking (300–800ms)
    const delay = 400 + Math.random() * 400
    setTimeout(() => {
      const botBubble = { id: Date.now() + 1, from: 'bot', text: getReply(userMsg) }
      setMessages(prev => [...prev, botBubble])
      setTyping(false)
      if (!open) setUnread(n => n + 1)
    }, delay)
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <>
      {/* ── Chat panel ─────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit ={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            style={{
              position: 'fixed',
              bottom: 90,
              right: 24,
              width: 340,
              maxHeight: '70vh',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 20,
              overflow: 'hidden',
              background: 'rgba(10, 10, 28, 0.97)',
              border: '1px solid rgba(145,94,255,0.3)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(145,94,255,0.1)',
              zIndex: 9999,
              backdropFilter: 'blur(16px)',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '14px 18px',
              background: 'linear-gradient(135deg, rgba(145,94,255,0.2), rgba(0,212,255,0.1))',
              borderBottom: '1px solid rgba(145,94,255,0.2)',
              display: 'flex', alignItems: 'center', gap: 10,
              flexShrink: 0,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'linear-gradient(135deg, #915EFF, #00d4ff)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, flexShrink: 0,
                boxShadow: '0 0 16px rgba(145,94,255,0.5)',
              }}>🤖</div>
              <div style={{ flex: 1 }}>
                <p style={{ color: '#fff', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, margin: 0 }}>
                  Portfolio Assistant
                </p>
                <p style={{ color: '#4ade80', fontSize: 11, fontFamily: 'Fira Code, monospace', margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                  online
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 8,
                  color: 'rgba(255,255,255,0.6)', width: 28, height: 28,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', fontSize: 14, flexShrink: 0,
                }}
              >✕</button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1, overflowY: 'auto', padding: '14px 14px 8px',
              scrollbarWidth: 'thin', scrollbarColor: 'rgba(145,94,255,0.3) transparent',
            }}>
              {messages.map(msg => <Bubble key={msg.id} msg={msg} />)}
              {typing && <TypingDots />}
              <div ref={bottomRef} />
            </div>

            {/* Quick chips */}
            <div style={{
              padding: '6px 14px 8px',
              display: 'flex', gap: 6, flexWrap: 'wrap', flexShrink: 0,
            }}>
              {CHIPS.map(chip => (
                <button
                  key={chip}
                  onClick={() => sendMessage(chip)}
                  style={{
                    padding: '4px 12px', borderRadius: 999, fontSize: 11,
                    fontFamily: 'Fira Code, monospace', cursor: 'pointer',
                    background: 'rgba(145,94,255,0.12)',
                    border: '1px solid rgba(145,94,255,0.3)',
                    color: '#915EFF', transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.target.style.background = 'rgba(145,94,255,0.25)' }}
                  onMouseLeave={e => { e.target.style.background = 'rgba(145,94,255,0.12)' }}
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input */}
            <div style={{
              padding: '8px 14px 14px',
              display: 'flex', gap: 8, flexShrink: 0,
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask me anything..."
                style={{
                  flex: 1, padding: '10px 14px', borderRadius: 12,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(145,94,255,0.25)',
                  color: '#fff', fontSize: 13,
                  fontFamily: 'Space Grotesk, sans-serif',
                  outline: 'none', transition: 'border-color 0.2s',
                }}
                onFocus={e  => { e.target.style.borderColor = 'rgba(145,94,255,0.7)' }}
                onBlur={e   => { e.target.style.borderColor = 'rgba(145,94,255,0.25)' }}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                style={{
                  width: 40, height: 40, borderRadius: 12, border: 'none',
                  background: input.trim()
                    ? 'linear-gradient(135deg, #915EFF, #00d4ff)'
                    : 'rgba(255,255,255,0.08)',
                  color: '#fff', fontSize: 16, cursor: input.trim() ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, transition: 'all 0.2s',
                  boxShadow: input.trim() ? '0 4px 16px rgba(145,94,255,0.4)' : 'none',
                }}
              >
                ↑
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating toggle button ──────────────────── */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.1 }}
        whileTap ={{ scale: 0.95 }}
        animate={open ? { rotate: 0 } : { rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: '50%',
          border: 'none',
          background: open
            ? 'rgba(255,255,255,0.1)'
            : 'linear-gradient(135deg, #915EFF, #00d4ff)',
          color: '#fff',
          fontSize: 24,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          boxShadow: open
            ? '0 4px 20px rgba(0,0,0,0.3)'
            : '0 4px 24px rgba(145,94,255,0.5), 0 0 0 1px rgba(145,94,255,0.3)',
          transition: 'background 0.3s, box-shadow 0.3s',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={open ? 'close' : 'chat'}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0,   scale: 1 }}
            exit   ={{ opacity: 0, rotate:  90,  scale: 0.5 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {open ? '✕' : '💬'}
          </motion.span>
        </AnimatePresence>

        {/* Unread badge */}
        <AnimatePresence>
          {!open && unread > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit   ={{ scale: 0 }}
              style={{
                position: 'absolute', top: -4, right: -4,
                width: 20, height: 20, borderRadius: '50%',
                background: '#ff6b6b',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, color: '#fff',
                border: '2px solid #050816',
              }}
            >
              {unread}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}