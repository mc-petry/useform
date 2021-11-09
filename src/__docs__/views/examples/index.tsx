import { css } from '@emotion/react'
import { mq } from '~/theme'
import { Container } from '~/ui/container'
import { CNavigation } from '~/ui/navigation'
import { TH2 } from '~/ui/typography/h2'
import { TQuote } from '~/ui/typography/quote'
import { TText } from '~/ui/typography/text'
import { VExamplesDynamic } from './dynamic'
import { VExamplesFieldArray } from './field-array'
import { VExamplesNested } from './nested'
import { VExamplesSimple } from './simple'

export function VExamples() {
  const examples: { header: string; desc?: JSX.Element; content: JSX.Element }[] = [
    {
      header: 'Simple',
      content: <VExamplesSimple />,
    },
    {
      header: 'Dynamic',
      desc: (
        <TText>
          Fields can be created dynamically. This is useful when you get the list of available fields from the API.
        </TText>
      ),
      content: <VExamplesDynamic />,
    },
    {
      header: 'Nested',
      desc: (
        <TText>
          Nested fields in object can be used with <TQuote>useFieldNested</TQuote> hook.
        </TText>
      ),
      content: <VExamplesNested />,
    },
    {
      header: 'Field array',
      content: <VExamplesFieldArray />,
    },
  ]

  return (
    <Container css={styles.examples}>
      <CNavigation items={examples} />
      <div css={styles.examples__content}>
        {examples.map((x, i) => (
          <div key={i} id={`example-${i}`} css={styles.examples__example}>
            <div css={styles.examples__exampleTitle}>
              <TH2>{x.header}</TH2>
            </div>
            {x.desc && <div css={styles.examples__exampleDesc}>{x.desc}</div>}
            {x.content}
          </div>
        ))}
      </div>
    </Container>
  )
}

const styles = {
  examples: css`
    display: flex;
    padding: 48px 16px;

    ${mq.phone} {
      display: block;
    }
  `,

  examples__content: css`
    flex: 1;
    min-width: 0;
  `,

  examples__example: css`
    margin: 0 0 48px;
  `,

  examples__exampleTitle: css`
    margin: 0 32px 20px;
  `,

  examples__exampleDesc: css`
    font-size: 16px;
    margin: 0 32px 20px;
  `,
}
