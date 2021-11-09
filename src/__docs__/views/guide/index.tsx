import { css } from '@emotion/react'
import { CBox } from '~/ui/box'
import { CCode, CCodeLang } from '~/ui/code'
import { Container } from '~/ui/container'
import { TH1 } from '~/ui/typography/h1'
import { TH2 } from '~/ui/typography/h2'
import { TQuote } from '~/ui/typography/quote'
import { TText } from '~/ui/typography/text'

export function VGuide() {
  return (
    <Container css={styles.guide}>
      <CBox>
        <TH1>Guide</TH1>

        <TText>
          Install <TQuote>useform</TQuote> with package manager you likes:
        </TText>
        <CCode lang={CCodeLang.Markup}>npm i @mc-petry/useform</CCode>

        <TH2>Create a custom field</TH2>
        <TText>
          Create component wrapper for each field. Track changes with <TQuote>useFieldWatch</TQuote> hook.
          <br />
          Always pass anonymous functions to <TQuote>onChange</TQuote>, <TQuote>onFocus</TQuote> and{' '}
          <TQuote>onBlur</TQuote>.
        </TText>

        <TText>Bad:</TText>
        <CCode>{`❌ <input onFocus={field.onFocus} />`}</CCode>

        <TText>Good:</TText>
        <CCode>{`✔️ <input onFocus={() => field.onFocus()} />`}</CCode>

        <TText>Example with text input:</TText>
        <CCode>
          {`import { Field, useFieldWatch } from '@mc-petry/useform'

interface Props {
  field: Field<string> | Field<string | undefined>
}

export function TextField({ field }: Props) {
  // Watch changes
  useFieldWatch(field)

  return (
    <input
      // Allows to focus invalid field
      ref={field.ref as React.RefObject<HTMLInputElement>}
      value={field.value || ''}
      onChange={e => field.onChange(e.target.value)}
      onFocus={() => field.onFocus()}
      onBlur={() => field.onBlur()}
      type="text"
    />
  )
}`}
        </CCode>

        <TH2>Form state</TH2>
        <TText>
          <TQuote>useform</TQuote> uses <TQuote>Proxy</TQuote> for fields.
        </TText>
      </CBox>
    </Container>
  )
}

const styles = {
  guide: css`
    padding: 20px 16px;
  `,
}
