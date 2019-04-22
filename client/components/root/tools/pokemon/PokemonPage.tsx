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

const ToolsPokemon = () => {
  return (
    <Layout title='Pokemon'>
      <ToolsPokemonPage />
    </Layout>
  )
}

const ToolsPokemonPage = () => {
  const state = minionPokemon.useSubscribe()

  useEffect(() => {
    minionPokemon.fetch()
  }, [])

  // if (state.selected) {
  //   let c = state.selected

  //   return (
  //     <div>
  //       <div>Pokemon</div>
  //       <Button
  //         onClick={() => {
  //           minionPokemon.deselect()
  //         }}
  //       >
  //         Back
  //       </Button>
  //       <table className={styles.table}>
  //         <thead>
  //           <tr>
  //             {/* <th>Id</th> */}
  //             <th>Species Id</th>
  //             <th>Order</th>
  //             <th>Name</th>
  //             <th>Image</th>
  //             <th>Height</th>
  //             <th>Weight</th>
  //             <th>Base Experience</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           <tr
  //             key={c.id}
  //             onClick={() => {
  //               minionPokemon.select(c)
  //             }}
  //           >
  //             {/* <td>{c.id}</td> */}
  //             <td>{c.species_id}</td>
  //             <td>{c.order}</td>
  //             <td>{c.name}</td>
  //             <td>
  //               <img src={c.sprites && c.sprites.animated} />
  //             </td>
  //             <td>{c.height}</td>
  //             <td>{c.weight}</td>
  //             <td>{c.base_experience}</td>
  //           </tr>
  //         </tbody>
  //       </table>
  //     </div>
  //   )
  // }

  return (
    <div>
      <div>Pokemon</div>

      <table className={styles.table}>
        <thead>
          <tr>
            {/* <th>Id</th> */}
            <th>Species Id</th>
            <th>Order</th>
            <th>Name</th>
            <th>Picture</th>
          </tr>
        </thead>
        <tbody>
          {_.map(state.pokemon, (c: minionPokemon.IPokemon, cIdx) => (
            <tr
              key={c.id}
              // onClick={() => {
              //   minionPokemon.select(c)
              // }}
            >
              {/* <td>{c.id}</td> */}
              <td>{c.species_id}</td>
              <td>{c.order}</td>
              <td>
                <a
                  target='_blank'
                  href={'/tools/pokemon-details/' + c.species_id}
                >
                  {c.name}
                </a>
              </td>
              <td>
                <a
                  target='_blank'
                  href={'/tools/pokemon-details/' + c.species_id}
                >
                  <img src={c.sprites && c.sprites.normal} />
                </a>
              </td>
              {/* <td>
                <pre>{JSON.stringify(c, null, 2)}</pre>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export { ToolsPokemonPage, ToolsPokemon }
