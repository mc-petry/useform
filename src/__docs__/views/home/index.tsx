import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { CLogo } from '../../ui/logo'
import { VHomeCBenefits } from './@benefits'

export function VHome() {
  const part1 = '@mc-petry/'
  const part2 = 'useform'
  const stagger = 0.07

  return (
    <div>
      <CLogo css={styles.home__logo} />
      <div css={styles.home__intro}>
        <div css={styles.home__prefix}>
          {part1.split('').map((x, i) => (
            <motion.div
              style={{ display: 'inline-block' }}
              initial={{ opacity: 0, scale: 1.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * stagger }}
            >
              {x}
            </motion.div>
          ))}
        </div>
        <div css={styles.home__use}>
          {part2.split('').map((x, i) => (
            <motion.div
              style={{ display: 'inline-block' }}
              initial={{ opacity: 0, scale: 1.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (i + part1.length) * stagger }}
            >
              {x}
            </motion.div>
          ))}
        </div>
      </div>
      <VHomeCBenefits />
    </div>
  )
}

const styles = {
  home__logo: css`
    width: 192px;
    height: 192px;
    margin: 100px auto;
  `,

  home__intro: css`
    margin: 0 auto 60px;
    color: #ddd;
    font-size: 32px;
    text-align: center;
  `,

  home__use: css`
    display: inline;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 28px;
  `,

  home__prefix: css`
    display: inline;
    color: #594e6a;
  `,
}
