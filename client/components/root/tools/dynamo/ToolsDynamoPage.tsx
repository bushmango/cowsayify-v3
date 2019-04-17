import React, { useEffect } from 'react'

import Layout from '../../../shared/Layout'
import { _ } from 'imports/lodash'
import { icons, Icon } from '@components/common/icon/Icon'

import * as midboss from 'midboss'
import * as minionDynamo from 'state/minionDynamo'
import { Button } from '@components/shared/Button'
import { LinkButton } from '@components/common/link/LinkButton'

const ToolsDynamo = () => {
  return (
    <Layout title='Dynamo'>
      <ToolsDynamoPage />
    </Layout>
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
        Refresh
      </Button>
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
  )
}

const SelectedTable = (props: { state: minionDynamo.IStateDynamo }) => {
  const { state } = props
  return (
    <div>
      Selected table {state.table}
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
        <SelectTable state={state} />
      </div>
      <div>
        <SelectedTable state={state} />
      </div>
    </div>
  )
}

export { ToolsDynamoPage, ToolsDynamo }
