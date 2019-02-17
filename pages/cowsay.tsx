// import styles from './cowsay.scss'
const styles = require('./cowsay.scss')

import cowsay from 'cowsay-browser'

import Layout from '../components/Layout'
import Header from '../components/Header'

import Button from 'antd/lib/button'

function CowsayHi() {
  return (
    <Layout title="cowsay">
      <Header />
      <pre>{cowsay.say({ text: 'hi there!' })}</pre>

      <div className={styles.testSassCow}>Testing</div>
      <Button type="primary">Button</Button>
    </Layout>
  )
}

export default CowsayHi
