import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Bootstrap } from './bootstrap'

hydrateRoot(
  document.getElementById('root')!,
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Bootstrap />
  </BrowserRouter>
)
