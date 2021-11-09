import { Route, Routes } from 'react-router-dom'
import { VFooter } from './@footer'
import { VHeader } from './@header'
import { VExamples } from './examples'
import { VGuide } from './guide'
import { VHome } from './home'
import { VShowcase } from './showcase'

export function Views() {
  return (
    <>
      <VHeader />

      <Routes>
        <Route path="/" element={<VHome />} />
        <Route path="/guide" element={<VGuide />} />
        <Route path="/showcase" element={<VShowcase />} />
        <Route path="/examples" element={<VExamples />} />
      </Routes>

      <VFooter />
    </>
  )
}
