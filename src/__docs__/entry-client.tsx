import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Bootstrap } from './bootstrap'

ReactDOM.hydrate(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Bootstrap />
  </BrowserRouter>,
  document.getElementById('root')
)
