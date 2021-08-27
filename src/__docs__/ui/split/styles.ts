import { mq } from '@app/theme/media'
import { css } from '@emotion/react'

export default {
  split: css`
    display: flex;

    > * {
      flex: 0 0 50%;
      max-width: calc(50% - 24px);
      margin-left: 24px;
      margin-right: 24px;

      &:first-of-type {
        margin-left: 0;
      }

      &:last-of-type {
        margin-right: 0;
      }
    }

    ${mq.mobile} {
      flex-direction: column;

      > * {
        margin-left: 0;
        margin-right: 0;
        margin-bottom: 24px;
        flex: 1 0 0;
        max-width: 100%;
      }
    }
  `
}
