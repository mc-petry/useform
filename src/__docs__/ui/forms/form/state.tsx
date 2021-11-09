import { css } from '@emotion/react'
import { Form } from '@mc-petry/useform'
import { mq } from '~/theme'

interface Props<T> {
  form: Form<T>
}

export function CFormState<T>({ form }: Props<T>) {
  return (
    <div css={styles.state}>
      <div css={styles.state__content}>
        <Section
          title="Form"
          content={{
            touched: form.touched(),
            dirty: form.dirty(),
            hasError: form.hasError(),
          }}
        />
        <Section title="Values" content={form.getValues()} />
      </div>
    </div>
  )
}

interface SectionProps {
  title: string
  content: {}
}

function Section({ title, content }: SectionProps) {
  return (
    <div css={styles.state__section}>
      <div css={styles.state__sectionTitle}>
        {title}
        {':'}
      </div>
      <div css={styles.state__sectionContent}>
        {JSON.stringify(
          content,
          (_, v) => {
            return v === undefined ? 'undefined' : v
          },
          2
        ).replaceAll('": "undefined"', '": undefined')}
      </div>
    </div>
  )
}

const styles = {
  state: css`
    flex: 0.6;
    overflow: hidden;
    padding: 24px 32px;

    ${mq.phone} {
      padding-left: 24px;
      padding-right: 24px;
    }
  `,

  state__content: css`
    overflow: auto;
  `,

  state__section: css`
    font-size: 14px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 16px;

    &:not(:last-of-type) {
      margin-bottom: 16px;
    }
  `,

  state__sectionTitle: css`
    /* margin-bottom: 8px; */
    color: #9486ad;
    font-size: 16px;
    padding: 16px 24px 10px;
  `,

  state__sectionContent: css`
    font-family: 'Inconsolata', monospace;
    /* color: #0cf; */
    white-space: pre;
    font-size: 14px;
    padding: 13px 24px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 16px;
  `,
}
