import { useCallback, useState } from 'react'
import { MotionConfig } from 'motion/react'
import Nav from './Nav'
import Stage from './Stage'
import { Services, Packages, Hampers, Gallery, Reviews, type Prefill } from './Sections'
import Contact from './Contact'
import Footer from './Footer'

/*
  Bespoke Opulence — the page.

  The opening is Stage: a fixed, scaled artboard pinned while the scrollbar
  drives its timeline. It keeps its own scroll state, so the sections below
  never re-render as it plays. Everything after it is ordinary flow.

  "Enquire" buttons in Services and Packages pre-fill the booking form and
  take the visitor to it.
*/
export default function App() {
  const [prefill, setPrefill] = useState<Prefill | null>(null)

  const enquire = useCallback((type: string, note = '') => {
    setPrefill({ type, note, key: Date.now() })
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div id="top" />
      <Nav />
      <main>
        <Stage />
        <Services onEnquire={enquire} />
        <Packages onEnquire={enquire} />
        <Hampers />
        <Gallery />
        <Reviews />
        <Contact prefill={prefill} />
      </main>
      <Footer />
    </MotionConfig>
  )
}
