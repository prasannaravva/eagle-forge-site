import { lazy, Suspense } from 'react'
import Nav from '../components/Nav.jsx'
import Hero from '../components/Hero.jsx'
import Solutions from '../components/Solutions.jsx'

const Process = lazy(() => import('../components/Process.jsx'))
const About = lazy(() => import('../components/About.jsx'))
const FAQ = lazy(() => import('../components/FAQ.jsx'))
const Enquiry = lazy(() => import('../components/Enquiry.jsx'))
const Footer = lazy(() => import('../components/Footer.jsx'))

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Solutions />
        <Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
          <Process />
          <About />
          <FAQ />
          <Enquiry />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}
