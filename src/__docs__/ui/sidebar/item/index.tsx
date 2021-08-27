import { mq } from '@app/theme/media'
import { css } from '@emotion/react'

const styles = {
  item: css`
    padding: 16px 16px 16px 32px;
    display: block;
    position: relative;
    transition: all .15s;
    cursor: pointer;
    font-size: 14px;
    color: #dae1ea;
    font-weight: bold;
    text-decoration: none;
    transition: all .15s;

    ::after {
      content: "";
      display: block;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 1px;
    }

    :hover {
      background: rgba(255,255,255,.1);
      color: #fff;
    }

    ${mq.mobile} {
      font-size: 18px;
      padding-top: 12px;
      padding-bottom: 12px;
      display: inline;
      background: none !important;

      ::after {
        display: none;
      }
    }
  `,

  sub: css`
    font-weight: normal;
    padding-left: 48px;

    ${mq.mobile} {
      /* padding-left: 16px; */
      /* font-size: 18px; */
    }
  `
}

export function SidebarItem({ header, link, sub }: { header: string, link: string, sub?: boolean }) {
  return <a css={[styles.item, sub && styles.sub]} href={link}>{header}</a>
}
