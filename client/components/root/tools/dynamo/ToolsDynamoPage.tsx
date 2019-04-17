import React, { useEffect } from 'react'

import Layout from '@components/shared/Layout'
import { _ } from '@lib/lodash'
import { icons, Icon } from '@components/common/icon/Icon'

import * as midboss from 'midboss'
import * as minionDynamo from 'state/minionDynamo'
import { Button } from '@components/common/button/Button'
import { LinkButton } from '@components/common/link/LinkButton'

const ToolsDynamo = () => {
  return (
    <Layout title='Dynamo'>
      <ToolsDynamoPage />
    </Layout>
  )
}

const Credentials = (props: { state: minionDynamo.IStateDynamo }) => {
  const { state } = props

  return (
    <div>
      <div>Credentials</div>
      {_.map(state.credentials, (c: minionDynamo.ICredentials, cIdx) => (
        <div>
          <div>{c.name}</div>
          <div>{c.isLocal}</div>
          <div>{c.region}</div>
          <div>{c.accessKeyId}</div>
          <div>{c.secretAccessKey}</div>
        </div>
      ))}
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
      {_.map(state.data, (c, cIdx) => (
        <div key={cIdx}>
          <pre>{JSON.stringify(c, null, 2)}</pre>
        </div>
      ))}
    </div>
  )
}

const ToolsDynamoPage = () => {
  const state = midboss.useSubscription(minionDynamo.stateManager)

  return (
    <div>
      <div>Dynamo</div>
      <div>
        <Credentials state={state} />
      </div>
      <div>
        <SelectTable state={state} />
      </div>
      <div>
        <SelectedTable state={state} />
      </div>
    </div>
  )
}

export { ToolsDynamoPage, ToolsDynamo }
