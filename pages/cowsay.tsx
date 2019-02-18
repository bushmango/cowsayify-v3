import * as React from 'react'

import styles from './cowsay.scss'
import DisplayCow from '../components/DisplayCow'
import CowsayOptions from '../components/CowsayOptions'
// const styles = require('./cowsay.scss')

import Layout from '../components/Layout'

import * as stateCowsay from '../state/stateCowsay'
import { modes, actions } from '../state/stateCowsay'

class Cowsay extends React.Component<{}> {
  subscriptionToken = stateCowsay.subscribe(this)
  componentWillUnmount() {
    stateCowsay.unSubscribe(this.subscriptionToken)
  }

  _onChange_text = ev => {
    stateCowsay.setState({ text: ev.target.value })
  }
  _onChange_mode = val => {
    stateCowsay.setState({ mode: val })
  }
  _onChange_action = val => {
    stateCowsay.setState({ action: val })
  }
  _onChange_eyes = ev => {
    stateCowsay.setState({ eyes: ev.target.value })
  }
  _onChange_tongue = ev => {
    stateCowsay.setState({ tongue: ev.target.value })
  }
  _onSubmit = () => {}

  _onClick_share = () => {
    stateCowsay.doShare()
  }

  render() {
    let state = stateCowsay.getState()
    let options = stateCowsay.calcOptions()

    return (
      <Layout title="cowsay">
        <CowsayOptions />

        <DisplayCow options={options} />
      </Layout>
    )
  }
}

export default Cowsay
