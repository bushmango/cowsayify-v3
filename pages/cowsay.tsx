import * as React from 'react'

import styles from './cowsay.scss'
// const styles = require('./cowsay.scss')

import cowsay from 'cowsay-browser'

import Layout from '../components/Layout'

import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import Select from 'antd/lib/select'
const Option = Select.Option
import Form from 'antd/lib/form'

interface IMode {
  key: string
  label: string
}
const modes: IMode[] = [
  {
    key: '',
    label: 'Normal',
  },
  {
    key: 'b',
    label: 'Borg',
  },
  {
    key: 'd',
    label: 'Dead',
  },
  {
    key: 'g',
    label: 'Greedy',
  },
  {
    key: 'p',
    label: 'Paranoid',
  },
  {
    key: 's',
    label: 'Stoned',
  },
  {
    key: 't',
    label: 'Tired',
  },
  {
    key: 'w',
    label: 'Wired',
  },
  {
    key: 'y',
    label: 'Youthful',
  },
]

class Cowsay extends React.Component<{ userAgent: string }> {
  state = {
    text: '',
    mode: '',
  }
  _onChange_text = ev => {
    this.setState({ text: ev.target.value })
  }
  _onChange_mode = val => {
    this.setState({ mode: val })
  }
  _onSubmit = () => {}

  render() {
    let { state } = this
    let { text, mode } = state

    if (text.length === 0) {
      text = 'Moo'
    }

    let options: any = {
      text,
    }
    if (mode) {
      options[mode] = true
    }

    return (
      <Layout title="cowsay">
        {/* <div className={styles.cowForm}>
          <Form onSubmit={this._onSubmit}>
            <Form.Item label="Text">
              <Input
                placeholder="What should the cow say?"
                value={state.text}
                onChange={this._onChange_text}
              />
            </Form.Item>
            <Form.Item label="Mode">
              <Select
                defaultValue="b"
                style={{ width: 120 }}
                onChange={this._onChange_mode}
              >
                {modes.map(c => (
                  <Option value={c.key}>{c.label}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary">Share!</Button>
            </Form.Item>
          </Form>
        </div> */}

        <div className={styles.cowForm}>
          <div>
            <div className={styles.cowFormRow}>
              <div className={styles.cowFormLabel}>Text</div>
              <div className={styles.cowFormItem}>
                <Input
                  placeholder="What should the cow say?"
                  value={state.text}
                  onChange={this._onChange_text}
                />
              </div>
            </div>

            <div className={styles.cowFormRow}>
              <div className={styles.cowFormLabel}>Mode</div>
              <div className={styles.cowFormItem}>
                <Select
                  defaultValue="b"
                  style={{ width: 120 }}
                  onChange={this._onChange_mode}
                >
                  {modes.map(c => (
                    <Option key={c.key} value={c.key}>
                      {c.label}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>

            <div className={styles.cowFormRow}>
              <div className={styles.cowFormLabel} />
              <div className={styles.cowFormItem}>
                <Button type="primary">Share!</Button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.cowBox}>
          <pre>{cowsay.say(options)}</pre>
        </div>

        {/* <div className={styles.cowBox}>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </div> */}
      </Layout>
    )
  }
}

export default Cowsay
