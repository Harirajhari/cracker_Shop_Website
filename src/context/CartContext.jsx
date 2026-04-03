import React, { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i._id === action.payload._id)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i._id === action.payload._id
              ? { ...i, qty: i.qty + (action.payload.qty || 1) }
              : i
          ),
        }
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: action.payload.qty || 1 }] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i._id !== action.payload) }
    case 'UPDATE_QTY':
      if (action.payload.qty <= 0) {
        return { ...state, items: state.items.filter(i => i._id !== action.payload.id) }
      }
      return {
        ...state,
        items: state.items.map(i =>
          i._id === action.payload.id ? { ...i, qty: action.payload.qty } : i
        ),
      }
    case 'CLEAR_CART':
      return { items: [], coupon: null, discount: 0 }
    case 'SET_COUPON':
      return { ...state, coupon: action.payload.coupon, discount: action.payload.discount }
    case 'REMOVE_COUPON':
      return { ...state, coupon: null, discount: 0 }
    default:
      return state
  }
}

const initialState = {
  items: JSON.parse(localStorage.getItem('gb_cart') || '[]'),
  coupon: null,
  discount: 0,
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  useEffect(() => {
    localStorage.setItem('gb_cart', JSON.stringify(state.items))
  }, [state.items])

  const subtotal = state.items.reduce((sum, i) => sum + i.price.sellingPrice * i.qty, 0)
  const discountAmount = state.coupon
    ? state.coupon.discountType === 'percentage'
      ? (subtotal * state.coupon.discountValue) / 100
      : state.coupon.discountValue
    : 0
  const total = Math.max(0, subtotal - discountAmount)
  const itemCount = state.items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ ...state, subtotal, discountAmount, total, itemCount, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}
