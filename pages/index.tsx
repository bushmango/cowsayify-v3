// import * as css from "./styles.scss";
const css = require('./styles.scss')
import Head from 'next/head'

import Header from '../components/Header'

function Home() {
  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <div className={css.testSass}>Welcome to next.js!</div>
      <div>
        <img
          src="/static/images/caffeine-coffee-cup-374780.jpg"
          style={{ width: '300px', height: 'auto' }}
        />
      </div>
    </div>
  )
}

export default Home
