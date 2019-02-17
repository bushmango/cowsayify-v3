//import styles from './index.scss'
const styles = require('./index.scss')

import Layout from '../components/Layout'
import Head from 'next/head'
import Header from '../components/Header'

function Home() {
  return (
    <Layout title="home">
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <div className={styles.testSass}>Welcome to next.js!</div>
      <div>
        <img
          src="/static/images/caffeine-coffee-cup-374780.jpg"
          style={{ width: '300px', height: 'auto' }}
        />
      </div>
    </Layout>
  )
}

export default Home
