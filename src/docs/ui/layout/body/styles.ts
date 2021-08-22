import { mq } from '@app/theme/media'
import { css } from '@emotion/react'

export default {
  wrapper: css`
    display: flex;
    flex-direction: row-reverse;

    ${mq.mobile} {
      flex-direction: column-reverse;
    }
  `,

  sidebar: css`
    flex: 0 0 240px;

    ${mq.mobile} {
      flex: 1;
      border: none;
      background: none;
    }
  `,

  children: css`
    max-width: calc(100% - 240px);
    padding: 20px 0 0 48px;

    ${mq.mobile} {
      max-width: none;
      padding: 0;
    }
  `
}
