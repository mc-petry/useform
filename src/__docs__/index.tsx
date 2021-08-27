import { StrictMode } from 'react'
import { render } from 'react-dom'
import { Bootstrap } from './bootstrap'

render(
  <StrictMode>
    <Bootstrap />
  </StrictMode>,
  document.getElementById('root')
)
