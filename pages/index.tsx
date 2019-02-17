//import styles from './index.scss'
const styles = require('./index.scss')

import Layout from '../components/Layout'
import Head from 'next/head'
import Header from '../components/Header'

function Home() {
  return (
    <Layout title="home">
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
