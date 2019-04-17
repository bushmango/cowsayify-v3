import * as midboss from 'midboss'
const midbossKey = 'dynamo'
export { midbossKey }

import { _ } from '../imports/lodash'

import { secrets } from '../secrets/secrets'
import dynasty from 'dynasty'

export interface IStateDynamo {
  table: string
  tables: string[]
  data: any[]
}

let initialState: IStateDynamo = {
  table: '',
  tables: [],
  data: [],
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

export async function selectTable(table: string) {
  stateManager.produce((ds) => {
    ds.table = table
  })

  const dynTable = dyn.table(table)
  let result = await dynTable.scan()

  stateManager.produce((ds) => {
    ds.data = result
  })
}

const doScan = async () => {
  dyn.list().then((resp) => {
    // List tables
    console.log(resp.TableNames)
  })

  const shipments = dyn.table('shipments')
  let result = await shipments.scan()
  console.log('shipments', result)
}
