import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, Package, Shield, Star, Minus, Plus, CheckCircle } from 'lucide-react'
import api from '../utils/api'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeImg, setActiveImg] = useState(0)
  const { dispatch } = useCart()

  useEffect(() => {
    setLoading(true)
    api.get(`/products/${id}`)
      .then(r => {
        const p = r.data.product || r.data
        setProduct(p)
        if (p.category?._id) {
          api.get(`/products?category=${p.category._id}&limit=4&isActive=true`)
            .then(r2 => setRelated((r2.data.products || []).filter(x => x._id !== id)))
            .catch(() => {})
        }
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
    window.scrollTo(0, 0)
  }, [id])

  const handleAdd = () => {
    if (!product) return
    dispatch({ type: 'ADD_ITEM', payload: { ...product, qty } })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const discount = product?.price?.mrp && product?.price?.sellingPrice
    ? Math.round(((product.price.mrp - product.price.sellingPrice) / product.price.mrp) * 100)
    : 0

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
            <div className="aspect-square bg-gray-100 rounded-2xl" />
            <div className="space-y-4 pt-6">
              <div className="h-4 bg-gray-100 rounded w-1/4" />
              <div className="h-8 bg-gray-100 rounded" />
              <div className="h-6 bg-gray-100 rounded w-1/3" />
              <div className="h-24 bg-gray-100 rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🎆</p>
          <h2 className="font-heading text-ink text-xl mb-4">Product not found</h2>
          <Link to="/products" className="btn-outline-primary">Back to Products</Link>
        </div>
      </div>
    )
  }

  const inStock = product.stock?.available > 0
  const images = product.images?.length > 0 ? product.images : []

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8 text-xs font-body text-ink-faint flex-wrap">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
          {product.category && (
            <>
              <span>/</span>
              <Link to={`/products?category=${product.category._id}`} className="hover:text-primary transition-colors">
                {product.category.name}
              </Link>
            </>
          )}
          <span>/</span>
          <span className="text-ink-muted truncate max-w-[160px]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <div>
            <div className="aspect-square bg-surface-soft border border-gray-100 rounded-2xl overflow-hidden relative mb-4">
              {discount > 0 && <span className="badge-discount">{discount}% OFF</span>}
              {images[activeImg] ? (
                <img src={images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                  <span className="text-6xl">🎆</span>
                  <p className="font-body text-sm text-ink-faint">No image available</p>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`w-16 h-16 shrink-0 border-2 rounded-xl overflow-hidden transition-all ${
                      activeImg === i ? 'border-primary' : 'border-gray-100 hover:border-primary/40'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-5">
            {product.category && (
              <Link
                to={`/products?category=${product.category._id}`}
                className="section-subtitle self-start hover:opacity-70 transition-opacity"
              >
                {product.category.name}
              </Link>
            )}

            <h1 className="font-heading text-2xl md:text-3xl text-ink leading-snug">{product.name}</h1>

            {product.brand && (
              <p className="font-body text-sm text-ink-muted">Brand: <span className="text-ink font-medium">{product.brand}</span></p>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-4 py-5 border-y border-gray-100">
              <span className="font-display text-3xl text-gradient-primary">
                ₹{product.price?.sellingPrice?.toLocaleString('en-IN')}
              </span>
              {discount > 0 && (
                <>
                  <span className="font-body text-lg text-ink-faint line-through">
                    ₹{product.price?.mrp?.toLocaleString('en-IN')}
                  </span>
                  <span className="font-body text-sm text-primary font-semibold bg-primary/10 px-2 py-0.5 rounded-full">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            {/* Stock */}
            <div className={`flex items-center gap-2 text-sm font-body font-medium ${inStock ? 'text-green-600' : 'text-red-500'}`}>
              <span className={`w-2 h-2 rounded-full ${inStock ? 'bg-green-500' : 'bg-red-400'}`} />
              {inStock ? `In Stock (${product.stock.available} available)` : 'Currently Out of Stock'}
            </div>

            {product.description && (
              <p className="font-body text-sm text-ink-muted leading-relaxed">{product.description}</p>
            )}

            {/* Specs */}
            {(product.quantityPerBox || product.weight) && (
              <div className="grid grid-cols-2 gap-3">
                {product.quantityPerBox && (
                  <div className="bg-surface-soft border border-gray-100 p-3 rounded-xl">
                    <p className="font-body text-xs text-ink-faint mb-1">Qty per Box</p>
                    <p className="font-body text-sm text-ink font-medium">{product.quantityPerBox} pcs</p>
                  </div>
                )}
                {product.weight && (
                  <div className="bg-surface-soft border border-gray-100 p-3 rounded-xl">
                    <p className="font-body text-xs text-ink-faint mb-1">Weight</p>
                    <p className="font-body text-sm text-ink font-medium">{product.weight}g</p>
                  </div>
                )}
              </div>
            )}

            {/* Qty selector */}
            {inStock && (
              <div className="flex items-center gap-4">
                <span className="font-body text-xs text-ink-muted uppercase tracking-wider">Quantity</span>
                <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-ink-muted hover:bg-gray-50 hover:text-primary transition-colors">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-12 text-center font-body text-ink font-semibold text-sm">{qty}</span>
                  <button onClick={() => setQty(q => Math.min(product.stock.available, q + 1))} className="w-10 h-10 flex items-center justify-center text-ink-muted hover:bg-gray-50 hover:text-primary transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                disabled={!inStock}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-body font-semibold rounded-xl transition-all duration-300 ${
                  !inStock ? 'bg-gray-100 text-ink-faint cursor-not-allowed'
                  : added ? 'bg-green-50 border-2 border-green-200 text-green-600'
                  : 'btn-primary'
                }`}
              >
                {added ? <><CheckCircle className="w-4 h-4" /> Added to Cart!</>
                  : <><ShoppingCart className="w-4 h-4" /> {inStock ? 'Add to Cart' : 'Out of Stock'}</>}
              </button>
              {inStock && (
                <Link
                  to="/cart"
                  onClick={() => dispatch({ type: 'ADD_ITEM', payload: { ...product, qty } })}
                  className="btn-gold flex items-center gap-2 px-6 rounded-xl"
                >
                  Buy Now
                </Link>
              )}
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap gap-5 pt-4 border-t border-gray-100">
              {[{ icon: Shield, t: 'PESO Licensed' }, { icon: Star, t: 'Premium Quality' }, { icon: CheckCircle, t: 'Safe & Tested' }].map(({ icon: Icon, t }) => (
                <div key={t} className="flex items-center gap-1.5 text-xs text-ink-faint font-body">
                  <Icon className="w-3.5 h-3.5 text-gold" /> {t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl text-ink tracking-wide">You Might Also Like</h2>
              <div className="primary-divider" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {related.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
