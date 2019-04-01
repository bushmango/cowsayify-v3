import styles from './Header.scss'
import { ServerlessLink } from '../ServerlessLink'

const linkStyle = {
  marginRight: 15,
}

const Header = () => (
  <div className={styles.header}>
    <ServerlessLink href="/cowsay">
      <a style={linkStyle}>Make the cow say something</a>
    </ServerlessLink>
    <ServerlessLink href="/about">
      <a style={linkStyle}>About</a>
    </ServerlessLink>
    <ServerlessLink href="/history">
      <a style={linkStyle}>History</a>
    </ServerlessLink>
    <ServerlessLink href="/cows">
      <a style={linkStyle}>Cows</a>
    </ServerlessLink>
    <ServerlessLink href="/news">
      <a style={linkStyle}>News</a>
    </ServerlessLink>
  </div>
)

export default Header
