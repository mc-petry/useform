import { mq } from '@app/theme/media'
import { css } from '@emotion/react'

const code = css`
  margin: 0;
  padding: 16px;

  ${mq.mobile} {
    padding: 16px 32px;
  }
`

export default {
  wrapper: css`
    position: relative;

    border: 1px solid #e1e1e1;
    border-radius: 4px;
    overflow: auto;

    ${mq.mobile} {
      margin: 0 -32px;
      border-radius: 0;
      border-left: 0;
      border-right: 0;
    }
  `,

  code,

  sourceLabel: css`
    position: relative;
  `,

  sourceLink: css`
    position: absolute;
    right: 0;
    top: -20px;
    display: inline-flex;
    text-decoration: none;
    text-transform: uppercase;
    color: #009fff;

    :after {
      content: "";
      display: block;
      width: 12px;
      height: 12px;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.922 283.922"><g fill="%23009fff"><path d="M266.422,0h-97.625c-9.65,0-17.5,7.851-17.5,17.5c0,9.649,7.85,17.5,17.5,17.5h55.377l-92.375,92.374c-3.307,3.305-5.127,7.699-5.127,12.375c0,4.676,1.819,9.069,5.125,12.371c3.306,3.309,7.699,5.13,12.375,5.13c4.674,0,9.069-1.82,12.376-5.127l92.374-92.375v55.377c0,9.649,7.851,17.5,17.5,17.5c9.649,0,17.5-7.851,17.5-17.5V17.5C283.922,7.851,276.071,0,266.422,0z"/><path d="M201.137,253.922H30V82.785h128.711l30-30H15c-8.284,0-15,6.716-15,15v201.137c0,8.284,6.716,15,15,15h201.137c8.284,0,15-6.716,15-15V95.211l-30,30V253.922z"/></g></svg>');
      background-size: contain;
      margin: 0 0 0 6px;
    }
  `,

  langMarkup: css`
    .css-${code.name} {
      background: #051937;
      color: #fff;
    }
  `
}
