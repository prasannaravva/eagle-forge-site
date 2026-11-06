import { LazyMotion, MotionConfig } from 'framer-motion'
import Home from './pages/Home.jsx'

const loadFeatures = () => import('./lib/motion-features.js').then((mod) => mod.default)

export default function App() {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        <Home />
      </MotionConfig>
    </LazyMotion>
  )
}
