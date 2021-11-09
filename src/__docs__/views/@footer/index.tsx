import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { Container } from '~/ui/container'

export function VFooter() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 3.8, duration: 1.2, ease: 'easeOut' } }}
    >
      <Container css={styles.views__footer}>MIT Licensed | Copyright © 2018-present Petryshyn Sergii</Container>
    </motion.div>
  )
}

const styles = {
  views__footer: css`
    border-top: 1px solid rgba(0, 0, 0, 0.2);
    margin: 0 auto;
    padding: 40px 0;
    text-align: center;
    color: #6a6375;
    font-size: 15px;
  `,
}
