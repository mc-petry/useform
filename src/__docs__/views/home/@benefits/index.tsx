import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { mq } from '~/theme'
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
      value: <>Library size only 5 KB (2 KB gzipped).</>,
    },
    {
      icon: (
        <svg viewBox="0 0 32 32">
          <path d="M3 0C0 0 0 3 0 3v26c0 3 3 3 3 3h26s3 0 3-3V3c0-3-3-3-3-3Zm22.86 16.21c.68 0 1.28.05 1.8.13.53.08 1.02.2 1.46.38v2.72a5.13 5.13 0 0 0-2.33-.86 5.67 5.67 0 0 0-.76-.05c-.34 0-.64.03-.92.1-.27.06-.5.15-.69.26-.19.12-.33.26-.44.42a1.06 1.06 0 0 0 .02 1.13c.12.18.28.34.5.5.2.15.46.3.77.45.3.15.65.3 1.03.46.52.22.99.45 1.4.7.42.24.78.52 1.08.83.3.3.52.66.68 1.07.16.39.24.85.24 1.38a3.38 3.38 0 0 1-1.54 3.04c-.48.3-1.03.53-1.66.66a11.15 11.15 0 0 1-4.04.02c-.64-.12-1.2-.3-1.68-.55V26.1a5.68 5.68 0 0 0 3.6 1.33c.38 0 .7-.04.97-.1.28-.07.51-.16.7-.28.18-.12.32-.26.41-.42a1.13 1.13 0 0 0-.08-1.21c-.14-.2-.35-.38-.6-.55a6.03 6.03 0 0 0-.9-.5c-.34-.15-.72-.32-1.12-.48a5.76 5.76 0 0 1-2.28-1.56 3.42 3.42 0 0 1-.75-2.22c0-.68.14-1.27.4-1.75.28-.5.65-.9 1.12-1.21a4.99 4.99 0 0 1 1.64-.7 8.25 8.25 0 0 1 1.97-.23zm-16.62.22h10.39v2.4H15.9V29.5h-2.95V18.83H9.24Z" />
        </svg>
      ),
      label: 'TypeScript',
      value: 'Get intellisense with fully typed APIs.',
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
    {
      icon: (
        <svg viewBox="0 0 418.03 418.03">
          <path d="m275.4 228.1 38.06 7.54a38.8 38.8 0 1 0 3.94-19.6l-39.38-7.82a62.25 62.25 0 0 0-16.27-40.2l53.09-74.99a48.51 48.51 0 1 0-16.32-11.57l-52.45 74.1a62.33 62.33 0 0 0-76.16 11.93l-68.74-53.39a38.88 38.88 0 1 0-12.84 15.35l70.42 54.69a62.35 62.35 0 0 0 14.8 72.15l-42.18 59.65a51.62 51.62 0 1 0 15.3 13l43.65-61.73a62.27 62.27 0 0 0 47.98 1.05l52.18 77.08a43.79 43.79 0 1 0 16.28-11.62l-51.22-75.66a62.66 62.66 0 0 0 19.86-29.97zm76.76-13.67a18.78 18.78 0 1 1 0 37.57 18.78 18.78 0 0 1 0-37.57zM334 20.23a28.38 28.38 0 1 1 0 56.77 28.38 28.38 0 0 1 0-56.76zm-268 96.31a18.78 18.78 0 1 1 0-37.57 18.78 18.78 0 0 1 0 37.57zm40.35 275.86a31.48 31.48 0 1 1 0-62.97 31.48 31.48 0 0 1 0 62.97zm217.01-41.95a23.86 23.86 0 1 1 0 47.73 23.86 23.86 0 0 1 0-47.73zm-107.8-97.89a42.49 42.49 0 1 1 0-84.98 42.49 42.49 0 0 1 0 84.98z" />
        </svg>
      ),
      label: 'Zero dependencies',
      value: 'Requires only React as a peer dependency.',
    },
    {
      icon: (
        <svg viewBox="0 0 64 64">
          <path d="m27.89 49.35-8.56-15.42c-.44.04-.88.07-1.33.07-.4 0-.79-.03-1.19-.06l9.5 16.99a6.97 6.97 0 0 1 1.58-1.58zM46.39 23.72a10.15 10.15 0 0 1 2.13-1.08l-15.09-8.8a16.04 16.04 0 0 1 .49 2.61z" />
          <path d="M18 4a14 14 0 1 0 14 14A14.02 14.02 0 0 0 18 4zm0 26a12 12 0 1 1 12-12 12.01 12.01 0 0 1-12 12zM52 24a8 8 0 1 0 8 8 8.01 8.01 0 0 0-8-8zm0 14a6 6 0 1 1 6-6 6 6 0 0 1-6 6z" />
          <circle cx="52" cy="32" r="4" />
          <path d="M37.73 51a7.04 7.04 0 0 1 .94 1.88l11.54-11.05a10.09 10.09 0 0 1-2.19-.66z" />
          <circle cx="32" cy="55" r="2" />
          <path d="M32 49a6 6 0 1 0 6 6 6 6 0 0 0-6-6zm0 9a3 3 0 1 1 3-3 3 3 0 0 1-3 3zM37 12h2a5 5 0 0 0-5-5v2a3 3 0 0 1 3 3z" />
          <path d="M41 12h2a9.01 9.01 0 0 0-9-9v2a7 7 0 0 1 7 7zM11 34H9a5 5 0 0 0 5 5v-2a3 3 0 0 1-3-3z" />
          <path d="M7 34H5a9.01 9.01 0 0 0 9 9v-2a7 7 0 0 1-7-7zM22.91 17.41l-4 9A1 1 0 0 1 18 27a1.5 1.5 0 0 1-.21-.02A1 1 0 0 1 17 26v-6h-3a1 1 0 0 1-.91-1.41l4-9A1 1 0 0 1 19 10v6h3a1 1 0 0 1 .91 1.41z" />
        </svg>
      ),
      label: 'Hybrid package',
      value: 'Supports ESM and CommonJS.',
    },
    {
      icon: (
        <svg viewBox="0 0 512 512">
          <path d="M0 362v15a45 45 0 0 0 45 45h191v-60H0zM150 182a25 25 0 1 0 0 50 25 25 0 0 0 0-50zM97.1 222H90v40h40v-3.8A55.2 55.2 0 0 1 97.1 222z" />
          <path d="M45 87a45 45 0 0 0-45 45v200h236V87H45zm115 174v31H60V192h37.1a55 55 0 1 1 62.9 69zM365 256h-9v30h30v-6.2a45.2 45.2 0 0 1-21-23.8zM349 41v55a5 5 0 0 0 5 5h70a5 5 0 0 0 5-5V41h-80zM407 225a15 15 0 1 0 0 30 15 15 0 0 0 0-30z" />
          <path d="M477 41h-18v55a35 35 0 0 1-35 35h-70a35 35 0 0 1-35-35V41h-18a35 35 0 0 0-35 35v360a35 35 0 0 0 35 35h176a35 35 0 0 0 35-35V76a35 35 0 0 0-35-35zm-61 243v32h-90v-90h38.2a45 45 0 1 1 51.8 58z" />
        </svg>
      ),
      label: 'Universal',
      value: 'Use with react and react native.',
    },
  ]

  return (
    <Container css={styles.benefits}>
      {items.map((x, i) => (
        <motion.div
          key={i}
          css={styles.benefits__item}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.4 + 1.3, duration: 1.2, ease: 'easeOut' }}
        >
          <div css={styles.benefits__itemIcon}>{x.icon}</div>
          <div css={styles.benefits__itemContent}>
            <div css={styles.benefits__itemLabel}>{x.label}</div>
            <div css={styles.benefits__itemValue}>{x.value}</div>
          </div>
        </motion.div>
      ))}
    </Container>
  )
}

const styles = {
  benefits: css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 20px;
    padding-top: 60px;
    border-top: 1px solid rgba(0, 0, 0, 0.2);

    ${mq.phone} {
      flex-direction: column;
      padding-left: 40px;
    }
  `,

  benefits__item: css`
    flex: 1;
    display: flex;
    color: #fff;
    opacity: 0;
    flex: 0 0 33%;
    margin-bottom: 40px;

    &:not(:nth-child(3n)) {
      padding-right: 40px;
    }
  `,

  benefits__itemIcon: css`
    margin: 0 16px 0 0;
    flex: 0 0 48px;
    width: 48px;
    height: 48px;
    fill: #fff;
    opacity: 0.8;
  `,

  benefits__itemContent: css``,

  benefits__itemLabel: css`
    font-size: 22px;
  `,

  benefits__itemValue: css`
    font-size: 16px;
    color: #6a6375;
  `,
}
