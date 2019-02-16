import Link from "next/link";

const linkStyle = {
  marginRight: 15,
};

const Header = () => (
  <div>
    <Link href="/index">
      <a style={linkStyle}>Home</a>
    </Link>
    <Link href="/agent">
      <a style={linkStyle}>Agent</a>
    </Link>
    <Link href="/cowsay">
      <a style={linkStyle}>Cowsay</a>
    </Link>
  </div>
);

export default Header;
