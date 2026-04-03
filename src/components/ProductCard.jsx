import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Eye, Package } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function ProductCard({ product }) {
  const { dispatch } = useCart()
  const [added, setAdded] = useState(false)

  const discount = product.price?.mrp && product.price?.sellingPrice
    ? Math.round(((product.price.mrp - product.price.sellingPrice) / product.price.mrp) * 100)
    : 0

  const handleAdd = (e) => {
    e.preventDefault()
    dispatch({ type: 'ADD_ITEM', payload: product })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const inStock = product.stock?.available > 0

  return (
    <div className="card-product group relative flex flex-col">
      {discount > 0 && (
        <span className="badge-discount">{discount}% OFF</span>
      )}
      {!inStock && (
        <span className="absolute top-3 right-3 bg-gray-100 text-ink-muted text-xs font-body px-2 py-1 rounded-full z-10">
          Out of Stock
        </span>
      )}

      {/* Image */}
      <Link to={`/products/${product._id}`} className="block relative overflow-hidden bg-surface-soft aspect-square">
        {product.images?.[0] ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <span className="text-4xl">🎆</span>
            <span className="font-body text-xs text-ink-faint">No image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-ink/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-white rounded-full p-3 shadow-lg">
            <Eye className="w-5 h-5 text-primary" />
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-1.5">
        {product.category && (
          <span className="font-body text-[11px] text-primary uppercase tracking-wider font-semibold">
            {product.category?.name || product.category}
          </span>
        )}
        <Link to={`/products/${product._id}`}>
          <h3 className="font-heading text-ink text-sm leading-snug line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        {product.brand && (
          <p className="font-body text-xs text-ink-faint">{product.brand}</p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-2">
          <span className="font-heading text-primary text-lg font-bold">
            ₹{product.price?.sellingPrice?.toLocaleString('en-IN')}
          </span>
          {discount > 0 && (
            <span className="font-body text-xs text-ink-faint line-through">
              ₹{product.price?.mrp?.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {product.quantityPerBox && (
          <p className="font-body text-[11px] text-ink-faint">{product.quantityPerBox} pcs / box</p>
        )}

        {/* Add to Cart */}
        <button
          onClick={handleAdd}
          disabled={!inStock}
          className={`mt-2 w-full flex items-center justify-center gap-2 py-2.5 text-xs font-body font-semibold rounded-lg transition-all duration-300 ${
            !inStock
              ? 'bg-gray-100 text-ink-faint cursor-not-allowed'
              : added
              ? 'bg-green-50 border border-green-200 text-green-600'
              : 'btn-primary'
          }`}
        >
          {added ? (
            <>✓ Added!</>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5" />
              {inStock ? 'Add to Cart' : 'Out of Stock'}
            </>
          )}
        </button>
      </div>
    </div>
  )
}
