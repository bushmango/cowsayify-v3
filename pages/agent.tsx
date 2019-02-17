import * as React from 'react'

import Layout from '../components/Layout'
import Header from '../components/Header'

class Agent extends React.Component<{ userAgent: string }> {
  static async getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent }
  }

  render() {
    return (
      <Layout title="agent">
        <Header />
        Hello World {this.props.userAgent}
      </Layout>
    )
  }
}

export default Agent
