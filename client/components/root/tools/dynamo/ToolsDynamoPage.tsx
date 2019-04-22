import React, { useEffect } from 'react'

import Layout from '@components/shared/Layout'
import { _ } from '@lib/lodash'
import { icons, Icon } from '@components/common/icon/Icon'

import * as midboss from 'midboss'
import * as minionDynamo from 'state/minionDynamo'
import { Button } from '@components/common/button/Button'
import { LinkButton } from '@components/common/link/LinkButton'
import { Group } from '@components/common/group/Group'

import styles from './Dynamo.scss'

const ToolsDynamo = () => {
  return (
    <Layout title='Dynamo'>
      <ToolsDynamoPage />
    </Layout>
  )
}

const Filtered = (props: { state: minionDynamo.IStateDynamo }) => {
  const { state } = props

  if (!state.table) {
    return null
  }
  if (state.table !== 'shipments') {
    return null
  }

  let filtered = _.filter(
    state.data,
    (c) => c.entity === 'Shipment' && c.id !== 'quotedRate'
  )
  let ids = _.map(filtered, (c) => "'" + c.id + "'")
  let array = _.join(ids, ',')

  return (
    <div>
      Filtered
      <pre>[{array}]</pre>
      {/* <table className={styles.table}>
        <thead>
          <tr>
            <th>Key</th>
            <th>Entity</th>
          </tr>
        </thead>
        <tbody>
          {_.map(state.data, (c, cIdx) => (
            <tr key={cIdx}>
              <td>{c.id}</td>
              <td>{c.entity}</td>
            </tr>
          ))}
          <tr />
        </tbody>
      </table> */}
      {/* {_.map(state.data, (c, cIdx) => (
        <div key={cIdx}>
          <pre>{JSON.stringify(c, null, 2)}</pre>
        </div>
      ))} */}
    </div>
  )
}

const Credentials = (props: { state: minionDynamo.IStateDynamo }) => {
  const { state } = props

  return (
    <div>
      <div>Credentials</div>
      {_.map(state.credentials, (c: minionDynamo.ICredentials, cIdx) => (
        <Group key={cIdx}>
          <div>{c.name}</div>
          <div>{c.isLocal}</div>
          <div>{c.region}</div>
          <div>{c.accessKeyId}</div>
          <div>{c.secretAccessKey}</div>
        </Group>
      ))}
      <div>
        <Button
          onClick={() => {
            minionDynamo.addCredential()
          }}
        >
          <Icon icon={icons.faPlus} />
        </Button>
      </div>
    </div>
  )
}

const SelectTable = (props: { state: minionDynamo.IStateDynamo }) => {
  const { state } = props
  return (
    <div>
      <Button
        onClick={() => {
          minionDynamo.listTables()
        }}
      >
        <Icon icon={icons.faSyncAlt} /> Tables
      </Button>
      <div>Tables</div>
      <div>
        {_.map(state.tables, (c, cIdx) => (
          <div key={cIdx}>
            <LinkButton
              onClick={() => {
                minionDynamo.selectTable(c)
              }}
            >
              {c}
            </LinkButton>
          </div>
        ))}
      </div>
    </div>
  )
}

const SelectedTable = (props: { state: minionDynamo.IStateDynamo }) => {
  const { state } = props

  if (!state.table) {
    return null
  }

  return (
    <div>
      {state.table}

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Key</th>
            <th>Entity</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {_.map(state.data, (c, cIdx) => (
            <tr key={cIdx}>
              <td>{c.id}</td>
              <td>{c.entity}</td>
              <td>
                <pre>{JSON.stringify(c, null, 2)}</pre>
              </td>
            </tr>
          ))}
          <tr />
        </tbody>
      </table>

      {/* {_.map(state.data, (c, cIdx) => (
        <div key={cIdx}>
          <pre>{JSON.stringify(c, null, 2)}</pre>
        </div>
      ))} */}
    </div>
  )
}

const ToolsDynamoPage = () => {
  const state = minionDynamo.useSubscribe()

  return (
    <div>
      <div>Dynamo</div>af
      <div>
        <Credentials state={state} />
      </div>
      <div>
        <SelectTable state={state} />
      </div>
      <div>
        <Filtered state={state} />
      </div>
      <div>
        <SelectedTable state={state} />
      </div>
    </div>
  )
}

export { ToolsDynamoPage, ToolsDynamo }
