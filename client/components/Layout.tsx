import styles from './styles.scss'
// const styles = require('./styles.scss')

import Head from 'next/head'
import Header from './Header'

const Layout = (props: { title: string; children: any }) => {
  return (
    <div className={styles.layout}>
      <Head>
        <title>Cowsayify - {props.title}!</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Nunito:300,400,500"
        />
        <link rel="stylesheet" href="/static/css/antd.min.css" />
      </Head>
      <Header />
      {props.children}
    </div>
  )
}

export default Layout
