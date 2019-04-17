import * as midboss from 'midboss'
const midbossKey = 'dynamo'
export { midbossKey }

import { _ } from '@lib/lodash'

import { secrets } from '../secrets/secrets'
import dynasty from 'dynasty'

export interface ICredentials {
  name: string
  isLocal: boolean
  region: string
  accessKeyId: string
  secretAccessKey: string
}

export interface IStateDynamo {
  table: string
  tables: string[]
  data: any[]
  selectedCredential: string
  credentials: ICredentials[]
}

let initialState: IStateDynamo = {
  table: '',
  tables: [],
  data: [],
  selectedCredential: '',
  credentials: [
    {
      isLocal: true,
      name: 'local',
      region: '',
      accessKeyId: 'local',
      secretAccessKey: 'local',
    },
  ],
}

var credentials = {
  accessKeyId: secrets.aws_accessKeyId, //'<YOUR ACCESS_KEY_ID>',
  secretAccessKey: secrets.aws_secretAccessKey, //'//<YOUR_SECRET_ACCESS_KEY>'
}

const dyn = dynasty(credentials, 'http://localhost:8000')

const stateManager = midboss.createMidboss(midbossKey, '1.0.0', initialState, {
  useLocalStorage: true,
})
export { stateManager }

export async function listTables() {
  let result = await dyn.list()
  console.log(result)
  stateManager.produce((ds) => {
    ds.tables = result.TableNames
  })
}

export async function selectedCredential(name: string) {
  stateManager.produce((ds) => {
    let item = _.find(ds.credentials, (c) => c.name === name)
    if (item) {
      ds.selectedCredential = item.name
    }
  })
  await listTables()
}

export async function selectTable(table: string) {
  stateManager.produce((ds) => {
    ds.table = table
  })
  await scanTable(table)
}

export async function scanTable(table: string) {
  const dynTable = dyn.table(table)
  let result = await dynTable.scan()

  stateManager.produce((ds) => {
    ds.data = result
  })
}
