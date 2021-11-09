import { css } from '@emotion/react'
import { Form } from '@mc-petry/useform'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { CFormState } from './state'

interface Props<T> {
  form: Form<T>
  children: React.ReactNode
}

export function CForm<T>({ children, form }: Props<T>) {
  const [result, setResult] = useState<T>()

  return (
    <div css={styles.form}>
      <AnimatePresence>
        <motion.div css={styles.form__form}>
          <form onSubmit={form.handleSubmit(v => setResult(v))} onReset={() => form.reset()}>
            {children}
          </form>
        </motion.div>
      </AnimatePresence>
      <CFormState form={form} />
    </div>
  )
}

interface ActionsProps {
  children: React.ReactNode
}

CForm.Actions = function ({ children }: ActionsProps) {
  return <div css={styles.form__actions}>{children}</div>
}

const styles = {
  form: css`
    display: flex;
    border-radius: 32px;
    background: rgba(0, 0, 0, 0.1);
  `,

  form__form: css`
    flex: 1;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 32px;
    padding: 24px 28px;
  `,

  form__actions: css`
    display: flex;

    & > *:not(:first-of-type) {
      margin-left: 24px;
    }

    &:not(:last-of-type) {
      margin-bottom: 24px;
    }
  `,
}
