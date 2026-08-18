export interface PokemonListResponse {
  count: number
  next: string | null
  previous: string | null
  results: { name: string; url: string }[]
}

export interface PokemonType {
  slot: number
  type: {
    name: string
    url: string
  }
}

export interface PokemonStat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface PokemonSprites {
  front_default: string | null
  front_shiny: string | null
  other?: {
    home?: {
      front_default: string | null
    }
    'official-artwork'?: {
      front_default: string | null
    }
    showdown?: {
      front_default: string | null
    }
  }
}

export interface Pokemon {
  id: number
  name: string
  height: number
  weight: number
  types: PokemonType[]
  stats: PokemonStat[]
  sprites: PokemonSprites
}

export interface TypeResponse {
  pokemon: { pokemon: { name: string; url: string } }[]
  moves: { name: string; url: string }[]
}

export interface Move {
  id: number
  name: string
  type: { name: string }
  damage_class: { name: string } | null
  power: number | null
  accuracy: number | null
  pp: number | null
  effect_entries: { effect: string; short_effect: string }[]
  learned_by_pokemon: { name: string; url: string }[]
}

export interface MoveListResponse {
  count: number
  next: string | null
  results: { name: string; url: string }[]
}

export interface DamageClassResponse {
  moves: { name: string; url: string }[]
}

export interface Item {
  id: number
  name: string
  cost: number
  sprites: { default: string | null }
  effect_entries: { effect: string; short_effect: string }[]
  category: { name: string }
  fling_power: number | null
}

export interface ItemListResponse {
  count: number
  next: string | null
  results: { name: string; url: string }[]
}

export interface ItemCategoryResponse {
  items: { name: string; url: string }[]
}

export interface CategoryOption {
  value: string
  label: string
}
