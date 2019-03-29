import * as React from 'react'

import Layout from '../shared/Layout'

import DisplayCow from '../shared/DisplayCow'

//import styles from './about.scss'
import styles from './about.scss'

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

function Section(props: any) {
  return <div className={styles.section}>{props.children}</div>
}

function AboutPage(props: { data: any }) {
  return (
    <Layout title="about">
      <div>
        <h1>About cowsayify</h1>
        <Section>
          Originally made by Tony Monroe, cowsay is an iconic lunux command to
          send messages
        </Section>
        <Section>
          <a href="https://en.wikipedia.org/wiki/Cowsay">Wikipedia: Cowsay</a>
        </Section>
        <Section>Converted for the web by Steve Bushman</Section>
        <Section>
          Demonstrates these technologies:
          <br />
          {keywords.map(c => (
            <div key={c} className={styles.keyword}>
              {c}
            </div>
          ))}
        </Section>
        <Section>
          Source available on github!
          <br />
          <a href="https://github.com/bushmango/cowsayify-v3">
            https://github.com/bushmango/cowsayify-v3
          </a>
        </Section>

        <Section>
          More good stuff at <br />
          <a href="https://stevebushman.com">https://stevebushman.com</a>
        </Section>

        <DisplayCow
          options={{
            text:
              'Copyright 2018 Steve Bushman\nMIT License\nhttps://github.com/bushmango/cowsayify-v3',
            action: 'say',
          }}
        />
      </div>
    </Layout>
  )
}

export { AboutPage }
