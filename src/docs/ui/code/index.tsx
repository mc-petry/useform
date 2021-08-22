import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import 'prismjs/themes/prism.css'
import { useCallback, useEffect, useState } from 'react'
import styles from './styles'

export enum CodeLang {
  TS = 'typescript',
  Markup = 'markup'
}

interface Props {
  children?: string
  lang?: CodeLang

  /**
   * Github path
   */
  src?: string

  /**
   * Prevent strips imports in TS
   */
  fullSource?: boolean
}

function getGithubUrl(src: string, type: 'blob' | 'raw') {
  switch (type) {
    case 'blob':
      return `https://github.com/mc-petry/useform-site/${type}/${src}`

    case 'raw':
      return `https://raw.githubusercontent.com/mc-petry/useform-site/${src}`
  }
}

export function Code({ children, src, lang = CodeLang.TS, fullSource, ...css }: Props) {
  const [source, setSource] = useState('')

  const highlight = useCallback((text: string) => {
    if (lang === CodeLang.TS && !fullSource) {
      const lines = text.split('\n')
      const firstLine = lines.findIndex(x => x.startsWith('import') && x !== '')
      const lastLine = lines.findIndex(x => x.startsWith('const styles = {'))

      text = lines.slice(firstLine, lastLine).join('\n')
    }

    setSource(Prism.highlight(text, Prism.languages[lang], lang))
  }, [lang])

  useEffect(() => {
    if (children) {
      highlight(children)
    }
  }, [children])

  useEffect(() => {
    if (src && !children) {
      fetch(getGithubUrl(src, 'raw'), {})
        .then(value => value.text())
        .then(text => highlight(text))
    }
  }, [])

  return <>
    {src &&
      <div css={styles.sourceLabel}>
        <a css={styles.sourceLink} href={getGithubUrl(src, 'blob')} target="_blank">Source</a>
      </div>
    }
    <div css={[styles.wrapper, lang === CodeLang.Markup && styles.langMarkup]} {...css}>
      <pre css={styles.code}>
        <code dangerouslySetInnerHTML={{ __html: source }} />
      </pre>
    </div>
  </>
}
