const css = require('./styles.scss')
import Head from 'next/head'
import Header from './Header'

const Layout = (props: { title: string; children: any }) => {
  return (
    <div>
      <Head>
        <title>Cowsayify - {props.title}!</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />
      </Head>
      <Header />
      {props.children}
    </div>
  )
}

export default Layout
