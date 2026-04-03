import React, { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import api from '../utils/api'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const [searchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: '',
    maxPrice: '',
    inStock: false,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  })

  const LIMIT = 12

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filters.search) params.set('search', filters.search)
      if (filters.category) params.set('category', filters.category)
      if (filters.minPrice) params.set('minPrice', filters.minPrice)
      if (filters.maxPrice) params.set('maxPrice', filters.maxPrice)
      if (filters.inStock) params.set('inStock', 'true')
      params.set('isActive', 'true')
      params.set('sortBy', filters.sortBy === 'price' ? 'price.sellingPrice' : filters.sortBy)
      params.set('sortOrder', filters.sortOrder)
      params.set('page', page)
      params.set('limit', LIMIT)
      const res = await api.get(`/products?${params}`)
      setProducts(res.data.products || res.data.data || [])
      setTotal(res.data.total || 0)
    } catch {
      setProducts(MOCK_PRODUCTS)
      setTotal(MOCK_PRODUCTS.length)
    } finally {
      setLoading(false)
    }
  }, [filters, page])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  useEffect(() => {
    api.get('/categories')
      .then(r => setCategories(r.data.categories || r.data.data || []))
      .catch(() => setCategories(MOCK_CATEGORIES))
  }, [])

  const updateFilter = (key, val) => {
    setFilters(f => ({ ...f, [key]: val }))
    setPage(1)
  }

  const clearFilters = () => {
    setFilters({ search: '', category: '', minPrice: '', maxPrice: '', inStock: false, sortBy: 'createdAt', sortOrder: 'desc' })
    setPage(1)
  }

  const hasActive = filters.search || filters.category || filters.minPrice || filters.maxPrice || filters.inStock

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-subtitle mb-2">All Products</p>
          <h1 className="section-title">Our Crackers Collection</h1>
          <div className="primary-divider" />
          {total > 0 && <p className="font-body text-ink-faint text-sm mt-3">{total} products found</p>}
        </div>

        {/* Search + controls */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
            <input
              type="text"
              placeholder="Search crackers..."
              value={filters.search}
              onChange={e => updateFilter('search', e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div className="relative">
            <select
              value={`${filters.sortBy}:${filters.sortOrder}`}
              onChange={e => {
                const [s, o] = e.target.value.split(':')
                setFilters(f => ({ ...f, sortBy: s, sortOrder: o }))
              }}
              className="input-field pr-10 appearance-none cursor-pointer min-w-[180px]"
            >
              <option value="createdAt:desc">Newest First</option>
              <option value="price:asc">Price: Low to High</option>
              <option value="price:desc">Price: High to Low</option>
              <option value="name:asc">Name A–Z</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint pointer-events-none" />
          </div>
          <button
            onClick={() => setFiltersOpen(v => !v)}
            className={`flex items-center gap-2 text-sm font-body font-semibold px-5 py-3 rounded-lg border-2 transition-all duration-200 ${
              filtersOpen ? 'bg-primary border-primary text-white' : 'border-gray-200 text-ink-light hover:border-primary hover:text-primary'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasActive && <span className="w-2 h-2 bg-primary rounded-full" />}
          </button>
        </div>

        {/* Filter panel */}
        {filtersOpen && (
          <div className="mb-6 p-5 bg-surface-soft border border-gray-100 rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="font-body text-xs text-ink-muted uppercase tracking-wider mb-2 block">Category</label>
              <select value={filters.category} onChange={e => updateFilter('category', e.target.value)} className="input-field appearance-none">
                <option value="">All Categories</option>
                {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="font-body text-xs text-ink-muted uppercase tracking-wider mb-2 block">Min Price (₹)</label>
              <input type="number" placeholder="0" value={filters.minPrice} onChange={e => updateFilter('minPrice', e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="font-body text-xs text-ink-muted uppercase tracking-wider mb-2 block">Max Price (₹)</label>
              <input type="number" placeholder="Any" value={filters.maxPrice} onChange={e => updateFilter('maxPrice', e.target.value)} className="input-field" />
            </div>
            <div className="flex flex-col gap-3 justify-center">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={filters.inStock} onChange={e => updateFilter('inStock', e.target.checked)} className="w-4 h-4 accent-primary" />
                <span className="font-body text-sm text-ink">In Stock Only</span>
              </label>
              {hasActive && (
                <button onClick={clearFilters} className="flex items-center gap-1.5 text-sm text-primary hover:text-primary-dark font-body font-medium">
                  <X className="w-3.5 h-3.5" /> Clear All
                </button>
              )}
            </div>
          </div>
        )}

        {/* Category chips */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => updateFilter('category', '')}
              className={`px-4 py-1.5 rounded-full text-xs font-body font-medium border transition-all duration-200 ${
                !filters.category ? 'bg-primary border-primary text-white' : 'border-gray-200 text-ink-light hover:border-primary hover:text-primary'
              }`}
            >All</button>
            {categories.map(c => (
              <button
                key={c._id}
                onClick={() => updateFilter('category', c._id)}
                className={`px-4 py-1.5 rounded-full text-xs font-body font-medium border transition-all duration-200 ${
                  filters.category === c._id ? 'bg-primary border-primary text-white' : 'border-gray-200 text-ink-light hover:border-primary hover:text-primary'
                }`}
              >{c.name}</button>
            ))}
          </div>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
                <div className="aspect-square bg-gray-100" />
                <div className="p-4 space-y-2">
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                  <div className="h-4 bg-gray-100 rounded" />
                  <div className="h-8 bg-gray-100 rounded mt-3" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🎆</p>
            <h3 className="font-heading text-ink text-xl mb-2">No products found</h3>
            <p className="font-body text-ink-muted text-sm mb-6">Try adjusting your filters.</p>
            <button onClick={clearFilters} className="btn-outline-primary text-sm">Clear Filters</button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {products.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
            {total > LIMIT && (
              <div className="flex justify-center items-center gap-3 mt-12">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-5 py-2.5 border-2 border-gray-200 text-ink-light text-sm font-body font-medium rounded-lg
                             hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>
                <span className="font-body text-sm text-ink-muted px-2">
                  Page {page} of {Math.ceil(total / LIMIT)}
                </span>
                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={page >= Math.ceil(total / LIMIT)}
                  className="px-5 py-2.5 border-2 border-gray-200 text-ink-light text-sm font-body font-medium rounded-lg
                             hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

const MOCK_PRODUCTS = [
  { _id: '1', name: 'Diwali Deluxe Gift Box', category: { name: 'Gift Boxes' }, brand: 'Standard', price: { sellingPrice: 999, mrp: 1499 }, stock: { available: 50 } },
  { _id: '2', name: 'Sky Shot Aerial Shells', category: { name: 'Aerial' }, brand: 'Premium', price: { sellingPrice: 450, mrp: 600 }, stock: { available: 100 } },
  { _id: '3', name: 'Golden Sparklers 30cm', category: { name: 'Sparklers' }, brand: 'Standard', price: { sellingPrice: 120, mrp: 150 }, stock: { available: 200 } },
  { _id: '4', name: 'Flower Pots (10 pcs)', category: { name: 'Ground' }, brand: 'Standard', price: { sellingPrice: 280, mrp: 350 }, stock: { available: 80 } },
  { _id: '5', name: 'Color Smoke Fountain', category: { name: 'Fountains' }, brand: 'Premium', price: { sellingPrice: 199, mrp: 249 }, stock: { available: 60 } },
  { _id: '6', name: 'Thunder King Bombs', category: { name: 'Sound' }, brand: 'Standard', price: { sellingPrice: 350, mrp: 450 }, stock: { available: 0 } },
  { _id: '7', name: 'Rainbow Chakkar Pack', category: { name: 'Chakkars' }, brand: 'Standard', price: { sellingPrice: 180, mrp: 220 }, stock: { available: 150 } },
  { _id: '8', name: 'Wedding Special Combo', category: { name: 'Combos' }, brand: 'Premium', price: { sellingPrice: 2499, mrp: 3500 }, stock: { available: 30 } },
]
const MOCK_CATEGORIES = [
  { _id: 'c1', name: 'Aerial Shells' },
  { _id: 'c2', name: 'Sparklers' },
  { _id: 'c3', name: 'Fountains' },
  { _id: 'c4', name: 'Gift Boxes' },
  { _id: 'c5', name: 'Combos' },
]
