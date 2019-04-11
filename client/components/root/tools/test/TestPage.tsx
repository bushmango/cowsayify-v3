import React from 'react'

import Layout from '@components/shared/Layout'

import { Input } from '@components/shared/Input'
import { TextArea } from '@components/shared/TextArea'
import { Select } from '@components/shared/Select'

const Test = () => {
  return (
    <Layout title='home'>
      <TestPage />
    </Layout>
  )
}

const TestPage = (props: any) => {
  return (
    <div>
      <div>This is a test page</div>
      <div>testing stuff goes here</div>
      <Input value='' onChange={() => {}} placeholder='input' />
      <TextArea value='' onChange={() => {}} placeholder='textarea' />
      <Select
        options={[{ value: 'A', display: 'A' }]}
        value='A'
        onChange={() => {}}
      />
    </div>
  )
}

export { Test, TestPage }
