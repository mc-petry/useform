import { css } from '@emotion/react'
import { mq } from '~/theme'

interface Props {
  items: { header: string; children?: boolean }[]
}

export function CNavigation({ items }: Props) {
  return (
    <div css={styles.sidebar}>
      <div css={styles.sidebar__content}>
        {items.map((x, i) => (
          <div
            key={i}
            css={[styles.sidebar__item, x.children && styles.sidebar__item_children]}
            onClick={() => {
              console.log(document.getElementById(`example-${i}`))
              document.getElementById(`example-${i}`)!.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
            }}
          >
            {x.header}
          </div>
        ))}
      </div>
    </div>
  )
}

const styles = {
  sidebar: css`
    flex: 0 0 240px;
    top: 20px;
    margin: 0 32px 0 0;
    padding: 24px 28px;
    display: flex;
    flex-direction: column;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 32px;

    ${mq.phone} {
      margin: 0 0 20px;
      display: block;
    }
  `,

  sidebar__content: css`
    position: sticky;
    top: 24px;

    ${mq.phone} {
      position: static;
    }
  `,

  sidebar__item: css`
    display: flex;
    align-items: center;
    position: relative;
    padding: 0 32px;
    height: 64px;
    border-radius: 24px;
    transition: all 0.15s;
    cursor: pointer;
    font-size: 16px;
    color: #fff;
    font-weight: bold;
    text-decoration: none;
    transition: all 0.15s;

    &::after {
      content: '';
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.2);
      color: #fff;
    }

    ${mq.phone} {
      font-size: 18px;
      padding-top: 12px;
      padding-bottom: 12px;
      background: none !important;

      &::after {
        display: none;
      }
    }
  `,

  sidebar__item_children: css`
    font-weight: normal;
    padding-left: 48px;
  `,
}
