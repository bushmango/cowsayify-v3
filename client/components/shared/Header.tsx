import styles from './Header.scss'
import { ServerlessLink } from '../ServerlessLink'

const linkStyle: React.CSSProperties = {
  marginRight: 15,
}

const HeaderLink = (props: { href: string; children: React.ReactNode }) => {
  return (
    <div style={linkStyle}>
      <ServerlessLink href={props.href}>{props.children}</ServerlessLink>
    </div>
  )
}

const Header = () => (
  <div className={styles.header}>
    <HeaderLink href="/cowsay">Make the cow say something</HeaderLink>
    <HeaderLink href="/about">About</HeaderLink>
    <HeaderLink href="/history">History</HeaderLink>
    <HeaderLink href="/cows">Cows</HeaderLink>
    <HeaderLink href="/news">News</HeaderLink>
  </div>
)

export default Header
