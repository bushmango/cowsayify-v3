import Link from 'next/link'

const linkStyle = {
  marginRight: 15,
}

const Header = () => (
  <div>
    {/* <Link href="/index">
      <a style={linkStyle}>Home</a>
    </Link> */}
    <Link href="/cowsay">
      <a style={linkStyle}>Make the cow say something</a>
    </Link>
    <Link href="/about">
      <a style={linkStyle}>About</a>
    </Link>
    <Link href="/history">
      <a style={linkStyle}>History</a>
    </Link>
    <Link href="/cows">
      <a style={linkStyle}>Cows</a>
    </Link>
    <Link href="/news">
      <a style={linkStyle}>News</a>
    </Link>
  </div>
)

export default Header
