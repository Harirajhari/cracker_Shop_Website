import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, Tag, ChevronRight, ShoppingBag, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import api from '../utils/api'

export default function Cart() {
  const { items, subtotal, discountAmount, total, coupon, dispatch } = useCart()
  const [couponCode, setCouponCode] = useState('')
  const [couponLoading, setCouponLoading] = useState(false)
  const [couponError, setCouponError] = useState('')
  const [couponSuccess, setCouponSuccess] = useState('')

  const applyCoupon = async () => {
    if (!couponCode.trim()) return
    setCouponLoading(true)
    setCouponError('')
    try {
      const res = await api.post('/customer/coupons/validate', {
        code: couponCode.trim().toUpperCase(),
        orderAmount: subtotal,
      })
      const c = res.data.coupon || res.data
      dispatch({ type: 'SET_COUPON', payload: { coupon: c, discount: c.discountValue } })
      setCouponSuccess(`"${c.code}" applied!`)
    } catch (err) {
      setCouponError(err.response?.data?.message || 'Invalid or expired coupon code.')
    } finally {
      setCouponLoading(false)
    }
  }

  const removeCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' })
    setCouponCode('')
    setCouponSuccess('')
    setCouponError('')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-surface-warm rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-primary/40" />
          </div>
          <h2 className="font-heading text-ink text-2xl mb-3">Your cart is empty</h2>
          <p className="font-body text-ink-muted text-sm mb-8">Add some crackers to get started!</p>
          <Link to="/products" className="btn-primary text-sm">Browse Products</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="section-title">Your Cart</h1>
          <div className="primary-divider mx-0" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => {
              const d = item.price?.mrp
                ? Math.round(((item.price.mrp - item.price.sellingPrice) / item.price.mrp) * 100)
                : 0
              return (
                <div key={item._id} className="flex gap-4 bg-white border border-gray-100 rounded-2xl p-4 shadow-card hover:shadow-card-hover transition-all">
                  <Link to={`/products/${item._id}`} className="w-20 h-20 bg-surface-soft rounded-xl overflow-hidden shrink-0 border border-gray-100">
                    {item.images?.[0]
                      ? <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center text-2xl">🎆</div>
                    }
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2">
                      <div>
                        {item.category && (
                          <p className="font-body text-[10px] text-primary uppercase tracking-wider font-semibold mb-0.5">
                            {item.category?.name}
                          </p>
                        )}
                        <Link to={`/products/${item._id}`} className="font-heading text-ink text-sm hover:text-primary transition-colors line-clamp-2">
                          {item.name}
                        </Link>
                      </div>
                      <button
                        onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item._id })}
                        className="text-gray-300 hover:text-red-400 transition-colors shrink-0 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden">
                        <button
                          onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { id: item._id, qty: item.qty - 1 } })}
                          className="w-8 h-8 flex items-center justify-center text-ink-muted hover:text-primary hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-body text-sm text-ink font-semibold">{item.qty}</span>
                        <button
                          onClick={() => dispatch({ type: 'UPDATE_QTY', payload: { id: item._id, qty: item.qty + 1 } })}
                          className="w-8 h-8 flex items-center justify-center text-ink-muted hover:text-primary hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-heading text-primary text-sm font-bold">
                          ₹{(item.price.sellingPrice * item.qty).toLocaleString('en-IN')}
                        </p>
                        {d > 0 && (
                          <p className="font-body text-xs text-ink-faint line-through">
                            ₹{(item.price.mrp * item.qty).toLocaleString('en-IN')}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
            <Link to="/products" className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-primary font-body transition-colors mt-2">
              ← Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div>
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card sticky top-24">
              <h3 className="font-display text-ink tracking-wider text-sm mb-5 uppercase">Order Summary</h3>

              {/* Coupon */}
              {coupon ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 px-3 py-2.5 rounded-xl mb-5">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-green-600" />
                    <span className="font-body text-xs text-green-700 font-semibold">{coupon.code}</span>
                    <span className="font-body text-xs text-green-600">{couponSuccess}</span>
                  </div>
                  <button onClick={removeCoupon} className="text-green-400 hover:text-red-400 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="mb-5">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={e => { setCouponCode(e.target.value.toUpperCase()); setCouponError('') }}
                      onKeyDown={e => e.key === 'Enter' && applyCoupon()}
                      className="input-field flex-1 text-xs py-2.5 rounded-xl"
                    />
                    <button
                      onClick={applyCoupon}
                      disabled={couponLoading}
                      className="btn-outline-primary text-xs px-4 py-2 rounded-xl whitespace-nowrap"
                    >
                      {couponLoading ? '...' : 'Apply'}
                    </button>
                  </div>
                  {couponError && <p className="font-body text-xs text-red-500 mt-1.5">{couponError}</p>}
                </div>
              )}

              {/* Breakdown */}
              <div className="space-y-3 text-sm font-body border-t border-gray-100 pt-4">
                <div className="flex justify-between text-ink-muted">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Discount</span>
                    <span>−₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-ink-faint text-xs">
                  <span>Delivery</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-ink font-heading text-base pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-primary">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <Link to="/checkout" className="btn-primary w-full flex items-center justify-center gap-2 mt-6 rounded-xl">
                Proceed to Checkout <ChevronRight className="w-4 h-4" />
              </Link>
              <p className="font-body text-xs text-ink-faint text-center mt-3">No payment required at this step</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
