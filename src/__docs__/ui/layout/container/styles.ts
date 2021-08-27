import { mq } from '@app/theme/media'
import { css } from '@emotion/react'

export default {
  container: css`
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 32px;

    ${mq.mobile} {
      width: 100%;
    }
  `
}
