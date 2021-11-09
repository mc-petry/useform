import { css } from '@emotion/react'
import { Field } from '@mc-petry/useform'
import { AnimatePresence, motion } from 'framer-motion'

interface Props {
  field: Field
}

export function CFieldMessage({ field }: Props) {
  const error = field.error || field.warn

  return (
    <AnimatePresence>
      {error && (
        <motion.div
          css={[styles.message, (field.error && styles.message_error) || (field.warn && styles.message_warn)]}
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <motion.div
            css={styles.message__content}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
          >
            {error}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const styles = {
  message: css`
    font-size: 13px;
  `,

  message_error: css`
    color: #c0887d;
  `,

  message_warn: css`
    color: #d19d36;
  `,

  message__content: css`
    padding: 8px 0 0 24px;
  `,
}
