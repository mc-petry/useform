import { css } from '@emotion/react'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-tsx'
import { useEffect, useState } from 'react'
import { mq } from '~/theme'
import './prism.css'

export enum CCodeLang {
  TS = 'tsx',
  Markup = 'markup',
}

interface Props {
  children?: string
  lang?: CCodeLang
}

export function CCode({ children, lang = CCodeLang.TS, ...css }: Props) {
  const [source, setSource] = useState('')

  useEffect(() => {
    if (children) {
      setSource(Prism.highlight(children, Prism.languages[lang], lang))
    }
  }, [children])

  return (
    <div css={[styles.code, lang === CCodeLang.Markup && styles.code_markup]} {...css}>
      <pre css={styles.code__pre}>
        <code className="language-ts" dangerouslySetInnerHTML={{ __html: source }} />
      </pre>
    </div>
  )
}

const styles = {
  code: css`
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    overflow: auto;
    margin: 0 0 20px;

    ${mq.phone} {
      margin: 0 -32px;
      border-radius: 0;
      border-left: 0;
      border-right: 0;
    }
  `,

  code_markup: css`
    /* color: #fff; */
  `,

  code__pre: css`
    margin: 0;
    padding: 16px;

    ${mq.phone} {
      padding: 16px 32px;
    }
  `,
}
