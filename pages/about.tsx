import * as React from 'react'

import Layout from '../components/Layout'
import Header from '../components/Header'

import cowsay from 'cowsay-browser'

//import styles from './about.scss'
const aboutStyles = require('./about.scss')
const cowStyles = require('./cowsay.scss')

const keywords = [
  'serverless-api',
  'serverless-frontent',
  'full-stack-serverless',
  'next.js',
  'react',
  'dynamodb',
  'aws',
  'lambda',
  'typescript',
  'server-side-rendering',
  'sass',
]

class About extends React.Component<{}> {
  render() {
    return (
      <Layout title="agent">
        <div>
          <h1>About cowsayify</h1>
          <div className={aboutStyles.section}>
            Originally made by Tony Monroe, cowsay is an iconic lunux command to
            send messages
          </div>
          <div className={aboutStyles.section}>
            <a href="https://en.wikipedia.org/wiki/Cowsay">Wikipedia: Cowsay</a>
          </div>
          <div className={aboutStyles.section}>
            Converted for the web by Steve Bushman
          </div>
          <div className={aboutStyles.section}>
            Demonstrates these technologies:
            <br />
            {keywords.map(c => (
              <div key={c} className={aboutStyles.keyword}>
                {c}
              </div>
            ))}
          </div>
          <div className={aboutStyles.section}>
            Source available on github!
            <br />
            <a href="https://github.com/bushmango/cowsayify-v3">
              https://github.com/bushmango/cowsayify-v3
            </a>
          </div>

          <div className={aboutStyles.section}>
            More good stuff at <br />
            <a href="https://stevebushman.com">https://stevebushman.com</a>
          </div>

          <div className={cowStyles.cowBox}>
            <pre>
              {cowsay.say({
                text:
                  'Copyright 2018 Steve Bushman.\nMIT License\nhttps://github.com/bushmango/cowsayify-v3',
              })}
            </pre>
          </div>
        </div>
      </Layout>
    )
  }
}

export default About
