import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Pokemon, PokemonListResponse, TypeResponse } from '../../types/pokemon'
import { API_BASE, POKEMON_PER_PAGE, ALL_TYPES } from '../../constants/pokemon'
import PokemonCard from '../pokemon/PokemonCard'
import PokemonModal from '../pokemon/PokemonModal'
import TypeChart from '../pokemon/TypeChart'
import MovesList from '../pokemon/MovesList'
import ItemsList from '../pokemon/ItemsList'

type Tab = 'pokedex' | 'moves' | 'types' | 'items'

const TABS: { id: Tab; label: string; }[] = [
  { id: 'pokedex', label: 'Pokédex'},
  { id: 'moves', label: 'Moves' },
  { id: 'types', label: 'Type Chart' },
  { id: 'items', label: 'Items' },
]

function PokemonDatabase() {
  const [activeTab, setActiveTab] = useState<Tab>('pokedex')
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [filteredList, setFilteredList] = useState<Pokemon[]>([])
  const [typePokemonList, setTypePokemonList] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [offset, setOffset] = useState(0)
  const [typeOffset, setTypeOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [hasMoreType, setHasMoreType] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [selectedType, setSelectedType] = useState<string>('')
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)
  const [totalCount, setTotalCount] = useState(0)
  const [typeCount, setTypeCount] = useState(0)
  const typePokemonUrls = useRef<string[]>([])
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchPokemonList = useCallback(async (newOffset: number, append: boolean = false) => {
    try {
      if (append) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }

      const listRes = await fetch(
        `${API_BASE}/pokemon?limit=${POKEMON_PER_PAGE}&offset=${newOffset}`
      )
      const listData: PokemonListResponse = await listRes.json()

      setTotalCount(listData.count)
      setHasMore(!!listData.next)

      const detailPromises = listData.results.map((p) =>
        fetch(p.url).then((res) => res.json())
      )
      const details: Pokemon[] = await Promise.all(detailPromises)

      if (append) {
        setPokemonList((prev) => [...prev, ...details])
      } else {
        setPokemonList(details)
      }
    } catch (error) {
      console.error('Error fetching Pokemon:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  const fetchPokemonByType = useCallback(async (type: string, newOffset: number = 0, append: boolean = false) => {
    try {
      if (append) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }

      if (!append) {
        const typeRes = await fetch(`${API_BASE}/type/${type}`)
        const typeData: TypeResponse = await typeRes.json()
        
        const urls = typeData.pokemon
          .map((p) => p.pokemon.url)
          .filter((url) => {
            const id = parseInt(url.split('/').filter(Boolean).pop() || '0')
            return id <= 1025
          })
          .sort((a, b) => {
            const idA = parseInt(a.split('/').filter(Boolean).pop() || '0')
            const idB = parseInt(b.split('/').filter(Boolean).pop() || '0')
            return idA - idB
          })
        
        typePokemonUrls.current = urls
        setTypeCount(urls.length)
      }

      const urlsToFetch = typePokemonUrls.current.slice(newOffset, newOffset + POKEMON_PER_PAGE)
      setHasMoreType(newOffset + POKEMON_PER_PAGE < typePokemonUrls.current.length)

      const detailPromises = urlsToFetch.map((url) =>
        fetch(url).then((res) => res.json())
      )
      const details: Pokemon[] = await Promise.all(detailPromises)

      if (append) {
        setTypePokemonList((prev) => [...prev, ...details])
      } else {
        setTypePokemonList(details)
      }
    } catch (error) {
      console.error('Error fetching Pokemon by type:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  useEffect(() => {
    fetchPokemonList(0)
  }, [fetchPokemonList])

  useEffect(() => {
    if (selectedType) {
      setTypeOffset(0)
      fetchPokemonByType(selectedType, 0)
    } else {
      setTypePokemonList([])
      typePokemonUrls.current = []
    }
  }, [selectedType, fetchPokemonByType])

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (!searchTerm.trim()) {
      setIsSearchMode(false)
      const listToShow = selectedType ? typePokemonList : pokemonList
      setFilteredList(listToShow)
      return
    }

    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearchMode(true)
      setLoading(true)

      try {
        const term = searchTerm.toLowerCase().trim().replace(/\s+/g, '-')
        
        const res = await fetch(`${API_BASE}/pokemon/${term}`)
        if (res.ok) {
          const pokemon: Pokemon = await res.json()
          if (selectedType) {
            if (pokemon.types.some((t) => t.type.name === selectedType)) {
              setFilteredList([pokemon])
            } else {
              setFilteredList([])
            }
          } else {
            setFilteredList([pokemon])
          }
        } else {
          const listToFilter = selectedType ? typePokemonList : pokemonList
          const filtered = listToFilter.filter(
            (p) =>
              p.name.toLowerCase().includes(term) ||
              p.id.toString() === term ||
              p.id.toString().padStart(3, '0') === term
          )
          setFilteredList(filtered)
        }
      } catch {
        setFilteredList([])
      } finally {
        setLoading(false)
      }
    }, 500)

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchTerm, selectedType, pokemonList, typePokemonList])

  useEffect(() => {
    if (!isSearchMode && !searchTerm) {
      const listToShow = selectedType ? typePokemonList : pokemonList
      setFilteredList(listToShow)
    }
  }, [pokemonList, typePokemonList, selectedType, isSearchMode, searchTerm])

  const loadMore = () => {
    if (selectedType) {
      const newOffset = typeOffset + POKEMON_PER_PAGE
      setTypeOffset(newOffset)
      fetchPokemonByType(selectedType, newOffset, true)
    } else {
      const newOffset = offset + POKEMON_PER_PAGE
      setOffset(newOffset)
      fetchPokemonList(newOffset, true)
    }
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedType('')
    setIsSearchMode(false)
    setTypePokemonList([])
    setTypeOffset(0)
    typePokemonUrls.current = []
    setFilteredList(pokemonList)
  }

  const displayCount = selectedType ? typeCount : totalCount
  const canLoadMore = selectedType ? hasMoreType : hasMore

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-lg border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/#projects"
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Back
            </Link>
            <div className="flex items-center gap-3">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                alt="Pokeball"
                className="w-8 h-8"
              />
              <h1 className="text-2xl font-bold text-white">Pokémon Database</h1>
            </div>
            <div className="w-16" />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'pokedex' && (
          <>
            <div className="bg-slate-900 rounded-2xl p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Search any Pokémon (e.g. pikachu, 25, dragonite)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2.5 pl-10 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors capitalize"
                >
                  <option value="">All Types</option>
                  {ALL_TYPES.map((type) => (
                    <option key={type} value={type} className="capitalize">
                      {type}
                    </option>
                  ))}
                </select>

                {(searchTerm || selectedType) && (
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-xl text-white transition-colors"
                  >
                    Clear
                  </button>
                )}
              </div>
              <p className="text-gray-500 text-sm mt-3">
                {selectedType && <span className="capitalize">{selectedType}: </span>}
                {displayCount} Pokémon
              </p>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-gray-400">Loading Pokémon...</p>
              </div>
            ) : filteredList.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-white mb-2">No Pokémon found</h3>
                <p className="text-gray-400">Try adjusting your search or filters</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredList.map((pokemon) => (
                    <PokemonCard
                      key={pokemon.id}
                      pokemon={pokemon}
                      onClick={setSelectedPokemon}
                    />
                  ))}
                </div>

                {canLoadMore && !isSearchMode && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={loadMore}
                      disabled={loadingMore}
                      className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 rounded-xl text-white font-semibold transition-colors flex items-center gap-2"
                    >
                      {loadingMore ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Loading...
                        </>
                      ) : (
                        <>Load More Pokémon</>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {activeTab === 'moves' && <MovesList />}

        {activeTab === 'types' && <TypeChart />}

        {activeTab === 'items' && <ItemsList />}
      </main>

      <PokemonModal pokemon={selectedPokemon} onClose={() => setSelectedPokemon(null)} />
    </div>
  )
}

export default PokemonDatabase
