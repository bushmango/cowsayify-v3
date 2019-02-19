import * as React from 'react'

import Layout from '../components/Layout'
import Header from '../components/Header'

import cowsay from 'cowsay-browser'

//import styles from './about.scss'
const aboutStyles = require('./about.scss')
const cowStyles = require('./cowsay.scss')

const news = [
  'Feb 2, 2019\nAdded friendly urls, eyes, tongue, and the ability to think!',
  'Feb 1, 2019\nLaunched the cow',
]

class About extends React.Component<{}> {
  render() {
    return (
      <Layout title="news / changelog">
        <div>
          <h1>Cowsayify news!</h1>
          {news.map(c => (
            <div className={cowStyles.cowBox} style={{ marginBottom: '20px' }}>
              <pre>
                {cowsay.say({
                  text: c,
                })}
              </pre>
            </div>
          ))}
        </div>
      </Layout>
    )
  }
}

export default About
