import * as React from 'react'

import Layout from '../components/Layout'
import Header from '../components/Header'

import cowsay from 'cowsay-browser'

import DisplayCow from '../components/DisplayCow'

//import styles from './about.scss'
const aboutStyles = require('./about.scss')
const cowStyles = require('./cowsay.scss')

const news = [
  'Mar 04, 2019\nAdded immer and state management support!',
  'Feb 22, 2019\nAdded different cows!',
  'Feb 22, 2019\nAdded history',
  'Feb 18, 2019\nAdded friendly urls, eyes, tongue, and the ability to think!',
  'Feb 17, 2019\nLaunched the cow',
]

const NewsPage = (props: any) => {
  return (
    <Layout title="news / changelog">
      <div>
        <h1>Cowsayify news!</h1>
        {news.map((newsItem, cIdx) => (
          <DisplayCow
            key={cIdx}
            options={{
              text: newsItem,
              action: 'say',
            }}
          />
        ))}
      </div>
    </Layout>
  )
}

export default NewsPage
