import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { Container } from '~/ui/container'

export function VHomeCBenefits() {
  const items: { icon: JSX.Element; label: string; value: React.ReactNode }[] = [
    {
      icon: (
        <svg viewBox="0 0 32 32">
          <g fillRule="evenodd">
            <path d="M13 18.050v-1.050h1v1.049c1.147 0.231 2 1.24 2 2.451 0 1.39-1.119 2.5-2.5 2.5-1.39 0-2.5-1.119-2.5-2.5 0-1.218 0.859-2.22 2-2.45v0zM19 3h-9.991c-1.109 0-2.009 0.898-2.009 2.007v22.985c0 1.109 0.891 2.007 1.997 2.007h15.005c1.103 0 1.997-0.891 1.997-1.997v-17.003h-4.994c-1.108 0-2.006-0.887-2.006-1.998v-6.002zM20 3v5.997c0 0.554 0.451 1.003 0.991 1.003h5.009l-6-7zM12 4v1h2v-1h-2zM13 3v1h2v-1h-2zM13 5v1h2v-1h-2zM12 6v1h2v-1h-2zM13 7v1h2v-1h-2zM12 8v1h2v-1h-2zM13 9v1h2v-1h-2zM12 10v1h2v-1h-2zM13 11v1h2v-1h-2zM12 12v1h2v-1h-2zM13 13v1h2v-1h-2zM12 14v1h2v-1h-2zM13 15v1h2v-1h-2zM12 16v1h2v-1h-2zM13.5 19c-0.828 0-1.5 0.666-1.5 1.5 0 0.828 0.666 1.5 1.5 1.5 0.828 0 1.5-0.666 1.5-1.5 0-0.828-0.666-1.5-1.5-1.5z" />
          </g>
        </svg>
      ),
      label: 'Lightweight',
      value: (
        <>
          Zero dependencies. <br />
          Only 5 KB (2 KB gzipped).
        </>
      ),
    },
    {
      icon: (
        <svg viewBox="0 0 32 32">
          <path d="M3 0C0 0 0 3 0 3v26c0 3 3 3 3 3h26s3 0 3-3V3c0-3-3-3-3-3Zm22.86 16.21c.68 0 1.28.05 1.8.13.53.08 1.02.2 1.46.38v2.72a5.13 5.13 0 0 0-2.33-.86 5.67 5.67 0 0 0-.76-.05c-.34 0-.64.03-.92.1-.27.06-.5.15-.69.26-.19.12-.33.26-.44.42a1.06 1.06 0 0 0 .02 1.13c.12.18.28.34.5.5.2.15.46.3.77.45.3.15.65.3 1.03.46.52.22.99.45 1.4.7.42.24.78.52 1.08.83.3.3.52.66.68 1.07.16.39.24.85.24 1.38a3.38 3.38 0 0 1-1.54 3.04c-.48.3-1.03.53-1.66.66a11.15 11.15 0 0 1-4.04.02c-.64-.12-1.2-.3-1.68-.55V26.1a5.68 5.68 0 0 0 3.6 1.33c.38 0 .7-.04.97-.1.28-.07.51-.16.7-.28.18-.12.32-.26.41-.42a1.13 1.13 0 0 0-.08-1.21c-.14-.2-.35-.38-.6-.55a6.03 6.03 0 0 0-.9-.5c-.34-.15-.72-.32-1.12-.48a5.76 5.76 0 0 1-2.28-1.56 3.42 3.42 0 0 1-.75-2.22c0-.68.14-1.27.4-1.75.28-.5.65-.9 1.12-1.21a4.99 4.99 0 0 1 1.64-.7 8.25 8.25 0 0 1 1.97-.23zm-16.62.22h10.39v2.4H15.9V29.5h-2.95V18.83H9.24Z" />
        </svg>
      ),
      label: 'Written in TypeScript',
      value: 'Get the best experience with fully typed APIs.',
    },
    {
      icon: (
        <svg viewBox="0 0 512 512">
          <path d="M223.87 241.02a15 15 0 0 0-14.23 10.25c-3.37 10.1-32.9 99.68-32.9 133.28 0 26 21.14 47.14 47.13 47.14S271 410.54 271 384.55c0-33.6-29.53-123.17-32.9-133.27a15 15 0 0 0-14.23-10.26zM208.87 84.7a255.8 255.8 0 0 0-91.82 36.66l55.46 96.02c11.56-5 23.81-8.28 36.36-9.74zM238.87 80.9v126.74a129.55 129.55 0 0 1 36.36 9.74L345.1 96.32A255.51 255.51 0 0 0 238.87 80.9zM372.72 108.48 301.2 232.4a130.54 130.54 0 0 1 26.6 26.61l132.7-76.63a256.16 256.16 0 0 0-87.78-73.9zM33.77 209.28l73.16 42.23 13 7.5a130.5 130.5 0 0 1 26.61-26.6l-53.8-93.17a258.57 258.57 0 0 0-58.97 70.05zM0 336.35a15 15 0 0 0 15 15h64.27a15 15 0 0 0 15-15c0-17.74 3.66-35.25 10.63-51.38L20.37 236.2A253.3 253.3 0 0 0 0 336.35zM477.16 207.4l-134.32 77.58a129.57 129.57 0 0 1 10.63 51.37 15 15 0 0 0 15 15H497a15 15 0 0 0 15-15c0-45.64-12-89.89-34.84-128.94z" />
        </svg>
      ),
      label: 'Performance',
      value: 'Easily build a complex forms with minimum rerenders.',
    },
  ]

  return (
    <Container css={styles.benefits}>
      {items.map((x, i) => (
        <motion.div
          key={i}
          css={styles.item}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.3 + 0.2, duration: 0.8, ease: 'easeOut' }}
        >
          <div css={styles.item__icon}>{x.icon}</div>
          <div css={styles.item__content}>
            <div css={styles.item__label}>{x.label}</div>
            <div css={styles.item__value}>{x.value}</div>
          </div>
        </motion.div>
      ))}
    </Container>
  )
}

const styles = {
  benefits: css`
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    padding: 60px 0 0;
    border-top: 1px solid rgba(0, 0, 0, 0.2);
  `,

  item: css`
    flex: 1;
    display: flex;
    color: #fff;
    opacity: 0;

    &:not(:last-of-type) {
      margin-right: 40px;
    }
  `,

  item__icon: css`
    margin: 0 16px 0 0;
    flex: 0 0 48px;
    width: 48px;
    height: 48px;
    fill: #fff;
    opacity: 0.8;
  `,

  item__content: css``,

  item__label: css`
    font-size: 22px;
  `,

  item__value: css`
    font-size: 16px;
    color: #6a6375;
  `,
}
