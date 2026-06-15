import { createContext, useContext, useRef, useState, useCallback } from 'react'

const AudioCtx = createContext(null)

/**
 * AudioProvider
 *
 * Exposes:
 *   audioEnabled  boolean  — true only when audio is actually playing
 *   toggleAudio() void     — start / stop ambient background track
 *   playClick()   void     — short UI click SFX
 *   playHover()   void     — subtle hover tick SFX
 *
 * Place audio files in /public/audio/:
 *   ambient.mp3, click.mp3, hover.mp3
 *
 * Bulletproof state sync:
 *   - setAudioEnabled(true) is only called AFTER play() resolves.
 *   - Any rejection (autoplay policy, missing file, codec error)
 *     immediately calls setAudioEnabled(false) so the UI never
 *     shows a false-positive "playing" state.
 */
export function AudioProvider({ children }) {
  const [audioEnabled, setAudioEnabled] = useState(false)
  const ambientRef = useRef(null)
  const isPlayingRef = useRef(false)  // tracks real playback state

  // ── Lazy-create ambient element ───────────────────────────
  const getAmbient = () => {
    if (!ambientRef.current) {
      const audio = new Audio('/audio/ambient.mp3')
      audio.loop   = true
      audio.volume = 0.15

      // If the audio ends unexpectedly or errors out, sync state back to off
      audio.addEventListener('error', () => {
        isPlayingRef.current = false
        setAudioEnabled(false)
      })
      audio.addEventListener('ended', () => {
        // loop=true so this shouldn't fire, but guard anyway
        isPlayingRef.current = false
        setAudioEnabled(false)
      })

      ambientRef.current = audio
    }
    return ambientRef.current
  }

  // ── Toggle ambient ────────────────────────────────────────
  const toggleAudio = useCallback(() => {
    if (isPlayingRef.current) {
      // ── TURN OFF ──
      ambientRef.current?.pause()
      isPlayingRef.current = false
      setAudioEnabled(false)
    } else {
      // ── TURN ON ──
      // Do NOT set audioEnabled=true yet.
      // Only flip to true once play() resolves successfully.
      const audio = getAmbient()

      audio.play()
        .then(() => {
          // Play actually started — now update UI
          isPlayingRef.current = true
          setAudioEnabled(true)
        })
        .catch((err) => {
          // Browser blocked autoplay, file not found, codec issue, etc.
          // Keep / reset UI to "off" — never show false positive.
          console.warn('[AudioContext] play() rejected:', err?.message ?? err)
          isPlayingRef.current = false
          setAudioEnabled(false)
        })
    }
  }, [])

  // ── One-shot SFX helpers ──────────────────────────────────
  const playClick = useCallback(() => {
    if (!audioEnabled) return
    const sfx = new Audio('/audio/click.mp3')
    sfx.volume = 0.4
    sfx.play().catch(() => {})
  }, [audioEnabled])

  const playHover = useCallback(() => {
    if (!audioEnabled) return
    const sfx = new Audio('/audio/hover.mp3')
    sfx.volume = 0.2
    sfx.play().catch(() => {})
  }, [audioEnabled])

  return (
    <AudioCtx.Provider value={{ audioEnabled, toggleAudio, playClick, playHover }}>
      {children}
    </AudioCtx.Provider>
  )
}

export function useAudio() {
  const ctx = useContext(AudioCtx)
  if (!ctx) throw new Error('useAudio must be used inside <AudioProvider>')
  return ctx
}