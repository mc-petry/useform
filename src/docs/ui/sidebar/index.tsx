import { mq } from '@app/theme/media'
import { css } from '@emotion/react'
import { SidebarItem } from './item'

const styles = {
  sidebar: css`
    position: sticky;
    top: 20px;
    margin: 36px 0 0;
    padding: 16px 0 16px;
    display: flex;
    flex-direction: column;
    background: #051937;
    border-radius: 4px;

    ${mq.mobile} {
      position: static;
      margin-bottom: 20px;
    }
  `
}

export function Sidebar() {
  return <div css={styles.sidebar}>
    <SidebarItem header="Quick start" link="#quick-start" />
    <SidebarItem header="Recipes" link="#recipes" />
    <SidebarItem sub header="Form defaults" link="#defaults" />
    <SidebarItem sub header="Performance" link="#performance" />
    <SidebarItem header="Demos" link="#demos" />
    <SidebarItem sub header="Simple form" link="#demo-base" />
    <SidebarItem sub header="Dynamic fields" link="#demo-dynamic-fields" />
    <SidebarItem sub header="Dependent fields" link="#demo-dependent-fields" />
    <SidebarItem sub header="Transformers" link="#demo-transformers" />
    <SidebarItem sub header="Array of primitives" link="#demo-array-of-primitives" />
    <SidebarItem sub header="Array of objects" link="#demo-array-of-objects" />
  </div>
}
