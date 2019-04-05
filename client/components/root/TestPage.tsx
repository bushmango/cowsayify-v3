import * as React from 'react'

import Layout from '@components/shared/Layout'

import { Input } from '@components/shared/Input'
import { TextArea } from '@components/shared/TextArea'
import { Select, Option } from '@components/shared/Select'

const TestPage = (props: any) => {
  return (
    <Layout title="home">
      <div>This is a test page</div>
      <div>testing stuff goes here</div>
      <Input val="" onChange={() => {}} placeholder="input" />
      <TextArea val="" onChange={() => {}} placeholder="textarea" />
      <Select
        options={[{ value: 'A', display: 'A' }]}
        value="A"
        onChange={() => {}}
      />
    </Layout>
  )
}

export { TestPage }
