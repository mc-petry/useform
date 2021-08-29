import { css } from '@emotion/react'
import { ReactNode } from 'react'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  children?: ReactNode
  onClick?: () => void
}

export function Button({ type = 'button', ...rest }: Props) {
  return <button css={styles.btn} {...rest} type={type} />
}

const styles = {
  btn: css`
    height: 40px;
    border: 1px solid transparent;
    border-radius: 4px;
    background: #f3ab19;
    //f3ab19
    color: #fff;
    padding: 0 16px;
    transition: all 0.15s;

    &:hover {
      cursor: pointer;
      background: #051937;
    }

    &:focus {
      outline: none;
      border-color: rgba(0, 0, 0, 0.25);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.35);
    }
  `,
}
