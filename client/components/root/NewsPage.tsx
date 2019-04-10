import React from 'react'

import Layout from '../shared/Layout'

import DisplayCow from '../shared/DisplayCow'

const news = [
  'Mar 04, 2019\nAdded immer and state management support!',
  'Feb 22, 2019\nAdded different cows!',
  'Feb 22, 2019\nAdded history',
  'Feb 18, 2019\nAdded friendly urls, eyes, tongue, and the ability to think!',
  'Feb 17, 2019\nLaunched the cow',
]

const NewsPage = (props: any) => {
  return (
    <Layout title='news / changelog'>
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

export { NewsPage }
