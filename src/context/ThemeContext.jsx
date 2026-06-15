import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark') // 'dark' | 'light'
  const [audioEnabled, setAudioEnabled] = useState(false)

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'))
  const toggleAudio = () => setAudioEnabled(a => !a)

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, audioEnabled, toggleAudio }}>
      <div data-theme={theme} className={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
