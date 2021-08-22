import { css } from '@emotion/react'

export default {
  btn: css`
    height: 40px;
    border: 1px solid transparent;
    border-radius: 4px;
    background: #4e5b6f;
    color: #fff;
    padding: 0 16px;
    transition: all .15s;

    &:hover {
      cursor: pointer;
      background: #051937;
    }

    &:focus {
      outline: none;
      border-color: rgba(0,0,0,.25);
      box-shadow: 0 1px 3px rgba(0,0,0,.35);
    }
  `
}
