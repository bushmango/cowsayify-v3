import cowsay from 'cowsay-browser'

import Layout from '../components/Layout'

function CowsayHi() {
  return (
    <Layout title="Test!">
      <pre>{cowsay.say({ text: 'hi there test!' })}</pre>
    </Layout>
  )
}

export default CowsayHi
