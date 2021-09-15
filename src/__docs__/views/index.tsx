import { css } from '@emotion/react'
import { Route, Routes } from 'react-router-dom'
import { Container } from '../ui/container'
import { CLogo } from '../ui/logo'
import { VHome } from './home'

export function Views() {
  return (
    <>
      <header css={styles.header}>
        <Container css={styles.header__container}>
          <CLogo css={styles.header__logo} />
          <div css={styles.header__links}>
            <a css={styles.header__link} href="#">
              Guide
            </a>
            <a css={styles.header__link} href="https://github.com/mc-petry/useform">
              Github
            </a>
          </div>
        </Container>
      </header>

      <Routes>
        <Route path="/" element={<VHome />} />
      </Routes>
    </>
  )
}

const styles = {
  header: css`
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    color: #fff;
  `,

  header__container: css`
    display: flex;
    align-items: center;
    height: 60px;
  `,

  header__logo: css`
    width: 32px;
    height: 32px;
  `,

  header__links: css`
    display: flex;
    margin: 0 0 0 auto;
  `,

  header__link: css`
    color: #fff;
  `,

  header__content: css`
    width: 100%;
  `,
}
