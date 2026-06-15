import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Loader from './components/layout/Loader'
import CursorTrail from './components/layout/CursorTrail'
import ChatBot from './components/ui/ChatBot'
import './App.css'

const Home     = lazy(() => import('./pages/Home'))
const About    = lazy(() => import('./pages/About'))
const Projects = lazy(() => import('./pages/Projects'))
const Skills   = lazy(() => import('./pages/Skills'))
const Contact  = lazy(() => import('./pages/Contact'))
const NotFound        = lazy(() => import('./pages/NotFound'))
const Certifications  = lazy(() => import('./pages/Certifications'))

// Locks body scroll ONLY on "/" — ScrollControls owns that page
function ScrollManager() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (pathname === '/') {
      document.body.classList.add('scroll-locked')
    } else {
      document.body.classList.remove('scroll-locked')
    }
    return () => document.body.classList.remove('scroll-locked')
  }, [pathname])
  return null
}

function FooterConditional() {
  const { pathname } = useLocation()
  return pathname === '/' ? null : <Footer />
}

// Smooth page transition wrapper
const pageVariants = {
  initial: { opacity: 0, y: 18 },
  enter:   { opacity: 1, y: 0,  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8,  transition: { duration: 0.15, ease: [0.22, 1, 0.36, 1] } },
}

function PageWrapper({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  )
}

// AnimatePresence needs the location as key to detect route changes
function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/"         element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about"    element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
        <Route path="/skills"   element={<PageWrapper><Skills /></PageWrapper>} />
        <Route path="/contact"  element={<PageWrapper><Contact /></PageWrapper>} />
        <Route path="/certifications" element={<PageWrapper><Certifications /></PageWrapper>} />
        <Route path="*"             element={<PageWrapper><NotFound /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollManager />
      <CursorTrail />
      <Navbar />
      <Suspense fallback={<Loader />}>
        <AnimatedRoutes />
      </Suspense>
      <FooterConditional />
      <ChatBot />
    </BrowserRouter>
  )
}