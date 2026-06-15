/**
 * Home.jsx
 * Body has scroll-locked class (added by ScrollManager in App.jsx).
 * Canvas is position:fixed so ScrollControls' internal scroller works.
 * No height hacks needed — body:overflow:hidden handles containment.
 */
import { Suspense } from 'react'
import HeroScene from '../three/scenes/HeroScene'

export default function Home() {
  return (
    <main style={{
      position: 'fixed',
      inset: 0,
      width: '100vw',
      height: '100svh',
      background: '#050816',
    }}>
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
    </main>
  )
}