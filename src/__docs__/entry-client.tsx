import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Bootstrap } from './bootstrap'

ReactDOM.hydrate(
  <BrowserRouter>
    <Bootstrap />
  </BrowserRouter>,
  document.getElementById('root')
)
