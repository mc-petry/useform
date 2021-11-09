import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'
import { Container } from '~/ui/container'
import { CLogo } from '~/ui/logo'

export function VHeader() {
  const navigate = useNavigate()

  return (
    <header css={styles.header}>
      <Container css={styles.header__container}>
        <CLogo css={styles.header__logo} onClick={() => navigate(`/`)} />
        <div css={styles.header__links}>
          <a css={styles.header__link} onClick={() => navigate(`/guide`)}>
            Guide
          </a>
          <a css={styles.header__link} onClick={() => navigate(`/showcase`)}>
            Showcase
          </a>
          <a css={styles.header__link} onClick={() => navigate(`/examples`)}>
            Examples
          </a>
          <a css={styles.header__link} href="https://github.com/mc-petry/useform">
            Github
          </a>
        </div>
      </Container>
    </header>
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
    cursor: pointer;
  `,

  header__links: css`
    display: flex;
    margin: 0 0 0 auto;
  `,

  header__link: css`
    margin-left: 10px;
    color: #ada7b7;
    text-decoration: none;
    transition: all 0.15s;

    &:hover {
      color: #fff;
      cursor: pointer;
    }
  `,

  header__content: css`
    width: 100%;
  `,
}
