// Pre-render the app into static HTML.

const fs = require('fs')

async function prerender() {
  const template = fs.readFileSync('./docs/index.html', 'utf-8')
  const routesToPrerender = ['/', '/guide', '/examples', '/showcase']
  const { render } = require('./dist/server/entry-server.js')

  for (const url of routesToPrerender) {
    const content = await render(url)
    const html = template.replace(`<!--app-html-->`, content)

    const filePath = `${url === '/' ? '/index' : url}.html`
    fs.writeFileSync(`./docs${url === '/' ? '/index' : url}.html`, html)
    console.log('pre-rendered:', filePath)
  }
}

prerender()
