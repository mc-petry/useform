import { css } from '@emotion/react'
import { ReactNode } from 'react'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  intent?: 'primary'
  children?: ReactNode
  onClick?: () => void
  icon?: 'reset'
  disabled?: boolean
}

export function CButton({ type = 'button', intent, icon, children, onClick, disabled }: Props) {
  return (
    <button
      css={[styles.btn, intent === 'primary' && styles.btn_primary, !children && styles.btn_icon]}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <div css={styles.btn__icon}></div>}
      {children}
    </button>
  )
}

const styles = {
  btn: css`
    flex: 1;
    height: 64px;
    background: none;
    border-radius: 24px;
    border: none;
    width: 100%;
    color: #fff;
    padding: 2px 32px 0;
    transition: all 0.15s;
    font-size: 16px;
    font-family: 'Overpass';
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.2);

    &:hover {
      cursor: pointer;
      background: rgba(255, 255, 255, 0.2);
    }

    &:focus {
      outline: none;
    }

    &:active {
      transform: scale(0.98);
    }

    &:disabled {
      opacity: 0.4;
    }
  `,

  btn_primary: css`
    flex: unset;
    background: #0071ff;
    box-shadow: none;

    &:hover {
      background: #0053b9;
    }
  `,

  btn_icon: css`
    width: 64px;
    flex: 0 0 64px;
  `,

  btn__icon: css``,
}
