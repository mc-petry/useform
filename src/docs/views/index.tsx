import { css } from '@emotion/react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { VHome } from './home'

export function Views() {
  return (
    <>
      <header css={styles.header}>Header</header>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<VHome />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

const styles = {
  header: css``,
}
