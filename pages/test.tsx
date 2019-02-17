
import Layout from '../components/Layout'

import cowsay from 'cowsay-browser'

function CowsayHi() {
  return (
    <Layout title="Test!">
      <pre>{cowsay.say({ text: 'hi there test!' })}</pre>
    </Layout>
  )
}

export default CowsayHi
