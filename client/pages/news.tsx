import * as React from 'react'

import Layout from '../components/Layout'
import Header from '../components/Header'

import cowsay from 'cowsay-browser'

import DisplayCow from '../components/DisplayCow'

//import styles from './about.scss'
const aboutStyles = require('./about.scss')
const cowStyles = require('./cowsay.scss')

const news = [
  'Feb 22, 2019\nAdded different cows!',
  'Feb 22, 2019\nAdded history',
  'Feb 18, 2019\nAdded friendly urls, eyes, tongue, and the ability to think!',
  'Feb 17, 2019\nLaunched the cow',
]

class About extends React.Component<{}> {
  render() {
    return (
      <Layout title="news / changelog">
        <div>
          <h1>Cowsayify news!</h1>
          {news.map((newsItem, cIdx) => (
            <DisplayCow
              options={{
                text: newsItem,
              }}
            />
          ))}
        </div>
      </Layout>
    )
  }
}

export default About
