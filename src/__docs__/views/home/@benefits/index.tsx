import { css } from '@emotion/react'

export function VHomeCBenefits() {
  const items: { label: string; value: string }[] = [
    {
      label: 'Small bundle size',
      value: 'Size matters. Only 5 KB (and 2 KB gzipped).',
    },
    {
      label: 'Written in TypeScript',
      value: 'Best experience among libraries for forms.',
    },
    {
      label: 'Simple',
      value: 'Simplest API.',
    },
  ]

  return (
    <div css={styles.benefits}>
      {items.map((x, i) => (
        <div key={i} css={styles.item}>
          <div css={styles.item__label}>{x.label}</div>
          <div css={styles.item__value}>{x.value}</div>
        </div>
      ))}
    </div>
  )
}

const styles = {
  benefits: css`
    display: flex;
    margin: 0 auto;
  `,

  item: css``,

  item__label: css``,

  item__value: css``,
}
