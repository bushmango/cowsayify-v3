import * as midboss from 'midboss'
import { _ } from '@lib/lodash'

export interface IPokemon {
  id: string
  species_id: string
  order: string
  base_experience: string
  height: string
  weight: string
  name: string
  sprites: {
    normal: string
    animated: string
  }
}

export interface IStatePokemon {
  selected: IPokemon
  pokemon: IPokemon[]
}

let initialState: IStatePokemon = {
  selected: null,
  pokemon: [],
}

const stateManager = midboss.createMidboss('pokemon', '1.0.0', initialState, {
  useLocalStorage: true,
})
export function useSubscribe() {
  return midboss.useSubscription(stateManager)
}

import Pokedex from 'pokedex'

const pokedex = new Pokedex()

export async function fetch() {
  let pokemon = []

  for (let i = 1; i <= 807; i++) {
    let p = pokedex.pokemon(i)
    if (p) {
      pokemon.push(p)
    }
  }

  // for (let i = 10001; i <= 10144; i++) {
  //   let p = pokedex.pokemon(i)
  //   if (p) {
  //     pokemon.push(p)
  //   }
  // }

  stateManager.produce((ds) => {
    ds.pokemon = pokemon
  })
}

export function select(pokemon: IPokemon) {
  stateManager.produce((ds) => {
    ds.selected = pokemon
  })
}
export function deselect() {
  stateManager.produce((ds) => {
    ds.selected = null
  })
}

export function getPokemon(id) {
  return pokedex.pokemon(parseInt(id))
}
