import { useState, useEffect, useCallback, useRef } from 'react'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'
import { Move, MoveListResponse, TypeResponse, DamageClassResponse } from '../../types/pokemon'
import { API_BASE, MOVES_PER_PAGE, TYPE_COLORS, ALL_TYPES, MOVE_CATEGORIES } from '../../constants/pokemon'
import { getMoveCategoryColor, formatName } from '../../utils/pokemon'

function MovesList() {
  const [moves, setMoves] = useState<Move[]>([])
  const [filteredMoves, setFilteredMoves] = useState<Move[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [offset, setOffset] = useState(0)
  const [filterOffset, setFilterOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [hasMoreFiltered, setHasMoreFiltered] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [filterCount, setFilterCount] = useState(0)
  const [selectedMove, setSelectedMove] = useState<Move | null>(null)
  const allMovesList = useRef<{ name: string; url: string }[]>([])
  const filteredMoveUrls = useRef<string[]>([])
  const baseFilteredMoves = useRef<Move[]>([])

  const fetchMoves = useCallback(async (newOffset: number, append: boolean = false) => {
    try {
      if (append) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }

      if (!append) {
        const listRes = await fetch(`${API_BASE}/move?limit=1000`)
        const listData: MoveListResponse = await listRes.json()
        allMovesList.current = listData.results
        setTotalCount(listData.count)
      }

      const urlsToFetch = allMovesList.current.slice(newOffset, newOffset + MOVES_PER_PAGE).map(m => m.url)
      setHasMore(newOffset + MOVES_PER_PAGE < allMovesList.current.length)

      const detailPromises = urlsToFetch.map((url) =>
        fetch(url).then((res) => res.json())
      )
      const details: Move[] = await Promise.all(detailPromises)

      if (append) {
        setMoves((prev) => [...prev, ...details])
      } else {
        setMoves(details)
      }
    } catch (error) {
      console.error('Error fetching moves:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  const fetchMovesBySearch = useCallback(async (term: string) => {
    try {
      setLoading(true)
      const searchTerm = term.toLowerCase().replace(/\s+/g, '-')
      const matchingMoves = allMovesList.current.filter(m => 
        m.name.toLowerCase().includes(searchTerm)
      )
      
      if (matchingMoves.length === 0) {
        setFilteredMoves([])
        setLoading(false)
        return
      }

      // Limit to first 50 matches to avoid too many requests
      const urlsToFetch = matchingMoves.slice(0, 50).map(m => m.url)
      const detailPromises = urlsToFetch.map((url) =>
        fetch(url).then((res) => res.json())
      )
      const details: Move[] = await Promise.all(detailPromises)
      setFilteredMoves(details)
    } catch (error) {
      console.error('Error searching moves:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchMovesByFilter = useCallback(async (type: string, category: string, newOffset: number = 0, append: boolean = false) => {
    try {
      if (append) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }

      if (!append) {
        let moveUrls: string[] = []

        if (type && category) {
          const [typeRes, categoryRes] = await Promise.all([
            fetch(`${API_BASE}/type/${type}`),
            fetch(`${API_BASE}/move-damage-class/${category}`)
          ])
          const typeData: TypeResponse = await typeRes.json()
          const categoryData: DamageClassResponse = await categoryRes.json()

          const typeUrls = new Set(typeData.moves.map(m => m.url))
          moveUrls = categoryData.moves
            .filter(m => typeUrls.has(m.url))
            .map(m => m.url)
        } else if (type) {
          const typeRes = await fetch(`${API_BASE}/type/${type}`)
          const typeData: TypeResponse = await typeRes.json()
          moveUrls = typeData.moves.map(m => m.url)
        } else if (category) {
          const categoryRes = await fetch(`${API_BASE}/move-damage-class/${category}`)
          const categoryData: DamageClassResponse = await categoryRes.json()
          moveUrls = categoryData.moves.map(m => m.url)
        }

        filteredMoveUrls.current = moveUrls
        setFilterCount(moveUrls.length)
      }

      const urlsToFetch = filteredMoveUrls.current.slice(newOffset, newOffset + MOVES_PER_PAGE)
      setHasMoreFiltered(newOffset + MOVES_PER_PAGE < filteredMoveUrls.current.length)

      const detailPromises = urlsToFetch.map((url) =>
        fetch(url).then((res) => res.json())
      )
      const details: Move[] = await Promise.all(detailPromises)

      if (append) {
        baseFilteredMoves.current = [...baseFilteredMoves.current, ...details]
        setFilteredMoves(baseFilteredMoves.current)
      } else {
        baseFilteredMoves.current = details
        setFilteredMoves(details)
      }
    } catch (error) {
      console.error('Error fetching filtered moves:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  useEffect(() => {
    fetchMoves(0)
  }, [fetchMoves])

  useEffect(() => {
    if (selectedType || selectedCategory) {
      setFilterOffset(0)
      fetchMovesByFilter(selectedType, selectedCategory, 0)
    } else {
      filteredMoveUrls.current = []
      baseFilteredMoves.current = []
      setFilteredMoves(moves)
      setFilterCount(0)
    }
  }, [selectedType, selectedCategory, fetchMovesByFilter, moves])

  useEffect(() => {
    if (!selectedType && !selectedCategory) {
      if (searchTerm) {
        // Debounce search to avoid too many API calls
        const timeoutId = setTimeout(() => {
          fetchMovesBySearch(searchTerm)
        }, 300)
        return () => clearTimeout(timeoutId)
      } else {
        setFilteredMoves(moves)
      }
    } else if (searchTerm) {
      const term = searchTerm.toLowerCase()
      const filtered = baseFilteredMoves.current.filter((m) =>
        m.name.toLowerCase().includes(term.replace(/\s+/g, '-'))
      )
      setFilteredMoves(filtered)
    } else {
      setFilteredMoves(baseFilteredMoves.current)
    }
  }, [moves, searchTerm, selectedType, selectedCategory, fetchMovesBySearch])

  const loadMore = () => {
    if (selectedType || selectedCategory) {
      const newOffset = filterOffset + MOVES_PER_PAGE
      setFilterOffset(newOffset)
      fetchMovesByFilter(selectedType, selectedCategory, newOffset, true)
    } else {
      const newOffset = offset + MOVES_PER_PAGE
      setOffset(newOffset)
      fetchMoves(newOffset, true)
    }
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedType('')
    setSelectedCategory('')
    setFilterOffset(0)
    filteredMoveUrls.current = []
    baseFilteredMoves.current = []
    setFilteredMoves(moves)
  }

  const displayCount = (selectedType || selectedCategory) ? filterCount : totalCount
  const canLoadMore = (selectedType || selectedCategory) ? hasMoreFiltered : hasMore

  return (
    <div>
      <div className="bg-slate-900 rounded-2xl p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search moves..."
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
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors capitalize"
          >
            <option value="">All Categories</option>
            {MOVE_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>

          {(searchTerm || selectedType || selectedCategory) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-xl text-white transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        <p className="text-gray-500 text-sm mt-3">
          {selectedType && <span className="capitalize">{selectedType} </span>}
          {selectedCategory && <span className="capitalize">{selectedCategory} </span>}
          {displayCount} moves
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded animate-spin mb-4" />
          <p className="text-gray-400">Loading moves...</p>
        </div>
      ) : filteredMoves.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">No moves found</h3>
          <p className="text-gray-400">Try adjusting your filters</p>
        </div>
      ) : (
        <>
          <div className="bg-slate-900 rounded-xl overflow-hidden">
            <div className="grid grid-cols-[15%_10%_10%_5%_5%_5%_40%] gap-2 px-4 py-3 bg-slate-800 text-gray-400 text-xs font-semibold uppercase">
              <span>Name</span>
              <span>Type</span>
              <span>Category</span>
              <span className="text-center">Power</span>
              <span className="text-center">Acc</span>
              <span className="text-center">PP</span>
              <span className="text-center">Effect</span>
            </div>
            {filteredMoves.map((move) => (
              <div
                key={move.id}
                onClick={() => setSelectedMove(move)}
                className="grid grid-cols-[15%_10%_10%_5%_5%_5%_40%] gap-2 px-4 py-1 cursor-pointer hover:bg-slate-800 transition-colors border-t border-slate-800 items-center"
              >
                <h3 className="text-white text-sm py-2 font-medium capitalize truncate">
                  {formatName(move.name)}
                </h3>
                <span
                  className="px-2 py-1 rounded text-xs font-semibold text-white capitalize text-center w-fit"
                  style={{ backgroundColor: TYPE_COLORS[move.type.name] || '#666' }}
                >
                  {move.type.name}
                </span>
                <span className={`px-2 py-1 rounded text-xs font-semibold text-white capitalize w-fit ${getMoveCategoryColor(move.damage_class?.name || null)}`}>
                  {move.damage_class?.name || '—'}
                </span>
                <span className="text-white text-sm text-center">{move.power ?? '—'}</span>
                <span className="text-white text-sm text-center">{move.accuracy ? `${move.accuracy}%` : '—'}</span>
                <span className="text-white text-sm text-center">{move.pp ?? '—'}</span>
                <span className="text-white text-sm">{move.effect_entries.find(e => e.short_effect)?.short_effect ||
                   move.effect_entries[0]?.effect ||
                   'No description available.'}</span>
              </div>
            ))}
          </div>

          {canLoadMore && !searchTerm && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 rounded-xl text-white font-semibold transition-colors flex items-center gap-2"
              >
                {loadingMore ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>Load More Moves</>
                )}
              </button>
            </div>
          )}
        </>
      )}

      {selectedMove && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedMove(null)}
        >
          <div
            className="bg-slate-900 rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={() => setSelectedMove(null)}
                className="w-8 h-8 rounded bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700 transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold text-white capitalize">
                {formatName(selectedMove.name)}
              </h2>
            </div>

            {selectedMove.learned_by_pokemon && selectedMove.learned_by_pokemon.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-2">
                  Learned by {selectedMove.learned_by_pokemon.length} Pokémon
                </h3>
                <div className="max-h-[500px] overflow-y-auto bg-slate-800 rounded-lg p-2">
                  <div className="grid grid-cols-4 gap-2">
                    {selectedMove.learned_by_pokemon.map((pokemon) => {
                      const pokemonId = pokemon.url.split('/').filter(Boolean).pop()
                      return (
                        <div
                          key={pokemon.name}
                          className="flex flex-col items-center p-1 hover:bg-slate-700 rounded"
                          title={formatName(pokemon.name)}
                        >
                          <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                            alt={pokemon.name}
                            className="w-15 h-15 object-contain"
                            loading="lazy"
                          />
                          <span className="text-xs text-gray-400 capitalize truncate w-full text-center">
                            {formatName(pokemon.name)}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default MovesList
