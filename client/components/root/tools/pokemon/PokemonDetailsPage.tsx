import React, { useEffect } from 'react'

import Layout from '@components/shared/Layout'
import { _ } from '@lib/lodash'
import { icons, Icon } from '@components/common/icon/Icon'

import * as midboss from 'midboss'
import * as minionPokemon from 'state/minionPokemon'
import { Button } from '@components/common/button/Button'
import { LinkButton } from '@components/common/link/LinkButton'
import { Group } from '@components/common/group/Group'

import styles from './Pokemon.scss'

const ToolsPokemonDetails = (props: { data: any }) => {
  return (
    <Layout title='Pokemon Details'>
      <ToolsPokemonDetailsPage {...props} />
    </Layout>
  )
}

ToolsPokemonDetails.getInitialProps = async ({ query }) => {
  const { key } = query
  return { data: { key } }
}

const ToolsPokemonDetailsPage = (props: { data: { key: string } }) => {
  let { data } = props
  let { key } = data || ({} as any)

  let c = minionPokemon.getPokemon(key)

  return (
    <div>
      <div>Pokemon '{key}' </div>
      <table className={styles.table}>
        <thead>
          <tr>
            {/* <th>Id</th> */}
            <th>Species Id</th>
            <th>Order</th>
            <th>Name</th>
            <th>Image</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Base Experience</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* <td>{c.id}</td> */}
            <td>{c.species_id}</td>
            <td>{c.order}</td>
            <td>{c.name}</td>
            <td>
              <img src={c.sprites && c.sprites.animated} />
            </td>
            <td>{c.height}</td>
            <td>{c.weight}</td>
            <td>{c.base_experience}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export { ToolsPokemonDetailsPage, ToolsPokemonDetails }
