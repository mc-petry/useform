import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Bootstrap } from './bootstrap'

export function render(url: string, manifest: any) {
  return renderToString(
    <StaticRouter location={url}>
      <Bootstrap />
    </StaticRouter>
  )
}
