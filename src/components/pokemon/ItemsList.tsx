import { useState, useEffect, useCallback, useRef } from 'react'
import { Item, ItemListResponse, ItemCategoryResponse } from '../../types/pokemon'
import { API_BASE, ITEMS_PER_PAGE, ITEM_CATEGORIES } from '../../constants/pokemon'
import { formatName } from '../../utils/pokemon'

function ItemsList() {
  const [items, setItems] = useState<Item[]>([])
  const [filteredItems, setFilteredItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [offset, setOffset] = useState(0)
  const [categoryOffset, setCategoryOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const [hasMoreCategory, setHasMoreCategory] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [categoryCount, setCategoryCount] = useState(0)
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const allItemUrls = useRef<string[]>([])
  const categoryItemUrls = useRef<string[]>([])

  const fetchItems = useCallback(async (newOffset: number, append: boolean = false) => {
    try {
      if (append) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }

      if (!append) {
        const listRes = await fetch(`${API_BASE}/item?limit=2000`)
        const listData: ItemListResponse = await listRes.json()
        allItemUrls.current = listData.results.map(i => i.url)
        setTotalCount(listData.count)
      }

      const urlsToFetch = allItemUrls.current.slice(newOffset, newOffset + ITEMS_PER_PAGE)
      setHasMore(newOffset + ITEMS_PER_PAGE < allItemUrls.current.length)

      const detailPromises = urlsToFetch.map((url) =>
        fetch(url).then((res) => res.json())
      )
      const details: Item[] = await Promise.all(detailPromises)

      if (append) {
        setItems((prev) => [...prev, ...details])
      } else {
        setItems(details)
      }
    } catch (error) {
      console.error('Error fetching items:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  const fetchItemsByCategory = useCallback(async (category: string, newOffset: number = 0, append: boolean = false) => {
    try {
      if (append) {
        setLoadingMore(true)
      } else {
        setLoading(true)
      }

      if (!append) {
        const categoryRes = await fetch(`${API_BASE}/item-category/${category}`)
        const categoryData: ItemCategoryResponse = await categoryRes.json()
        categoryItemUrls.current = categoryData.items.map(i => i.url)
        setCategoryCount(categoryData.items.length)
      }

      const urlsToFetch = categoryItemUrls.current.slice(newOffset, newOffset + ITEMS_PER_PAGE)
      setHasMoreCategory(newOffset + ITEMS_PER_PAGE < categoryItemUrls.current.length)

      const detailPromises = urlsToFetch.map((url) =>
        fetch(url).then((res) => res.json())
      )
      const details: Item[] = await Promise.all(detailPromises)

      if (append) {
        setFilteredItems((prev) => [...prev, ...details])
      } else {
        setFilteredItems(details)
      }
    } catch (error) {
      console.error('Error fetching items by category:', error)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  useEffect(() => {
    fetchItems(0)
  }, [fetchItems])

  useEffect(() => {
    if (selectedCategory) {
      setCategoryOffset(0)
      fetchItemsByCategory(selectedCategory, 0)
    } else {
      categoryItemUrls.current = []
      setFilteredItems(items)
      setCategoryCount(0)
    }
  }, [selectedCategory, fetchItemsByCategory, items])

  useEffect(() => {
    if (!selectedCategory) {
      if (searchTerm) {
        const term = searchTerm.toLowerCase()
        const filtered = items.filter((i) =>
          i.name.toLowerCase().includes(term.replace(/\s+/g, '-'))
        )
        setFilteredItems(filtered)
      } else {
        setFilteredItems(items)
      }
    } else if (searchTerm) {
      const term = searchTerm.toLowerCase()
      setFilteredItems(prev => prev.filter((i) =>
        i.name.toLowerCase().includes(term.replace(/\s+/g, '-'))
      ))
    }
  }, [items, searchTerm, selectedCategory])

  const loadMore = () => {
    if (selectedCategory) {
      const newOffset = categoryOffset + ITEMS_PER_PAGE
      setCategoryOffset(newOffset)
      fetchItemsByCategory(selectedCategory, newOffset, true)
    } else {
      const newOffset = offset + ITEMS_PER_PAGE
      setOffset(newOffset)
      fetchItems(newOffset, true)
    }
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setCategoryOffset(0)
    categoryItemUrls.current = []
    setFilteredItems(items)
  }

  const displayCount = selectedCategory ? categoryCount : totalCount
  const canLoadMore = selectedCategory ? hasMoreCategory : hasMore

  return (
    <div>
      <div className="bg-slate-900 rounded-2xl p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors"
          >
            <option value="">All Categories</option>
            {ITEM_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>

          {(searchTerm || selectedCategory) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-xl text-white transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        <p className="text-gray-500 text-sm mt-3">
          {selectedCategory && <span>{ITEM_CATEGORIES.find(c => c.value === selectedCategory)?.label}: </span>}
          {displayCount} items
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-400">Loading items...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">No items found</h3>
          <p className="text-gray-400">Try adjusting your filters</p>
        </div>
      ) : (
        <>
          <div className="bg-slate-900 rounded-xl overflow-hidden">
          <div className="grid grid-cols-[20%_20%_60%] gap-2 px-4 py-3 bg-slate-800 text-gray-400 text-xs font-semibold uppercase">
              <span>Name</span>
              <span>Category</span>
              <span>Effect</span>
            </div>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="grid grid-cols-[20%_20%_60%] gap-2 px-4 py-1 cursor-pointer hover:bg-slate-800 transition-colors border-t border-slate-800 items-center"
              >
                <div className="flex flex-row items-center gap-2">
                  {item.sprites.default ? (
                    <img
                      src={item.sprites.default}
                      alt={item.name}
                      className="w-12 h-12 object-contain"
                    />
                  ) : (
                    <span className="text-2xl">📦</span>
                  )}
                  <h3 className="text-white text-sm font-medium capitalize mb-1 line-clamp-2">
                    {formatName(item.name)}
                  </h3>
                </div>
                <span className="text-white text-sm font-medium capitalize mb-1 line-clamp-2">
                  {formatName(item.category.name)}
                </span>
                <span className="text-white text-sm font-medium capitalize mb-1 line-clamp-2">
                  {item.effect_entries.find(e => e.short_effect)?.short_effect ||
                   item.effect_entries[0]?.effect ||
                   'No description available.'}
                </span>
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
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Loading...
                  </>
                ) : (
                  <>Load More Items</>
                )}
              </button>
            </div>
          )}
        </>
      )}

      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center hover:bg-slate-700 transition-colors"
            >
              ✕
            </button>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-20 h-20 bg-slate-800 rounded-xl flex items-center justify-center flex-shrink-0">
                {selectedItem.sprites.default ? (
                  <img
                    src={selectedItem.sprites.default}
                    alt={selectedItem.name}
                    className="w-16 h-16 object-contain"
                  />
                ) : (
                  <span className="text-4xl">📦</span>
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white capitalize mb-1">
                  {formatName(selectedItem.name)}
                </h2>
                <p className="text-gray-400 text-sm capitalize">
                  {formatName(selectedItem.category.name)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-800 rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">Price</p>
              </div>
              {selectedItem.fling_power && (
                <div className="bg-slate-800 rounded-lg p-3">
                  <p className="text-gray-400 text-xs mb-1">Fling Power</p>
                  <p className="text-white font-bold">{selectedItem.fling_power}</p>
                </div>
              )}
            </div>

            {selectedItem.effect_entries.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-400 mb-2">Effect</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {selectedItem.effect_entries.find(e => e.short_effect)?.short_effect ||
                   selectedItem.effect_entries[0]?.effect ||
                   'No description available.'}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ItemsList
