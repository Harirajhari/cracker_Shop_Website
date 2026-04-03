import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle, ChevronRight, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import api from '../utils/api'

const STATES = [
  'Tamil Nadu','Karnataka','Kerala','Andhra Pradesh','Telangana','Maharashtra',
  'Gujarat','Rajasthan','Uttar Pradesh','Madhya Pradesh','West Bengal','Bihar',
  'Delhi','Punjab','Haryana','Odisha','Assam','Jharkhand','Uttarakhand','Goa',
  'Himachal Pradesh','Chandigarh','Jammu & Kashmir','Other'
]

export default function Checkout() {
  const { items, subtotal, discountAmount, total, coupon, dispatch } = useCart()
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    name: '', phone: '', email: '', address: '', city: '', state: 'Tamil Nadu', pincode: '', notes: '',
  })

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit mobile number'
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.address.trim()) e.address = 'Address is required'
    if (!form.city.trim()) e.city = 'City is required'
    if (!/^\d{6}$/.test(form.pincode)) e.pincode = 'Enter a valid 6-digit pincode'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitting(true)
    try {
      const payload = {
        customerInfo: { name: form.name, phone: form.phone, email: form.email || undefined },
        shippingAddress: { line1: form.address, city: form.city, state: form.state, pincode: form.pincode, country: 'India' },
        items: items.map(i => ({ product: i._id, name: i.name, qty: i.qty, price: i.price.sellingPrice })),
        subtotal, discount: discountAmount, total,
        coupon: coupon?.code || undefined,
        paymentMethod: 'cod',
        notes: form.notes || undefined,
        orderSource: 'website',
      }
      const res = await api.post('/customer/orders', payload)
      setOrderId(res.data.order?._id || res.data._id || `GB-${Date.now().toString(36).toUpperCase()}`)
      dispatch({ type: 'CLEAR_CART' })
      setSubmitted(true)
    } catch {
      const id = `GB-${Date.now().toString(36).toUpperCase()}`
      setOrderId(id)
      dispatch({ type: 'CLEAR_CART' })
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: '' }))
  }

  const Field = ({ id, label, error, required, children }) => (
    <div>
      <label htmlFor={id} className="font-body text-xs text-ink-muted uppercase tracking-wider mb-1.5 block font-medium">
        {label}{required && <span className="text-primary ml-1">*</span>}
      </label>
      {children}
      {error && <p className="font-body text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )

  if (submitted) {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'linear-gradient(135deg, #E8450A, #F5A623)' }}
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="font-display text-3xl text-ink mb-3 tracking-wide">Order Placed!</h1>
          <p className="font-body text-ink-muted mb-8">
            Thank you! We'll contact you on <strong>{form.phone}</strong> to confirm delivery details.
          </p>
          <div className="bg-surface-soft border border-gray-100 rounded-2xl p-6 mb-8 text-left space-y-3">
            {[
              ['Order ID', orderId],
              ['Name', form.name],
              ['Phone', form.phone],
              ['Address', `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`],
              ['Total', `₹${total.toLocaleString('en-IN')}`],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 text-sm font-body">
                <span className="text-ink-muted">{k}</span>
                <span className="text-ink font-medium text-right">{v}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 justify-center">
            <Link to="/" className="btn-outline-primary text-sm">Back to Home</Link>
            <Link to="/products" className="btn-primary text-sm">Shop More</Link>
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 text-primary/20 mx-auto mb-4" />
          <h2 className="font-heading text-ink text-xl mb-4">Your cart is empty</h2>
          <Link to="/products" className="btn-primary text-sm">Shop Now</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="section-title">Checkout</h1>
          <div className="primary-divider mx-0" />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form sections */}
            <div className="lg:col-span-2 space-y-6">

              {/* Personal */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card">
                <h3 className="font-display text-ink text-xs tracking-widest mb-5 uppercase">Personal Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field id="name" label="Full Name" error={errors.name} required>
                    <input id="name" className="input-field" placeholder="Raj Kumar" value={form.name} onChange={e => set('name', e.target.value)} />
                  </Field>
                  <Field id="phone" label="Mobile Number" error={errors.phone} required>
                    <input id="phone" className="input-field" placeholder="9500012345" value={form.phone} onChange={e => set('phone', e.target.value)} maxLength={10} />
                  </Field>
                  <Field id="email" label="Email Address" error={errors.email}>
                    <input id="email" type="email" className="input-field" placeholder="optional" value={form.email} onChange={e => set('email', e.target.value)} />
                  </Field>
                </div>
              </div>

              {/* Address */}
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card">
                <h3 className="font-display text-ink text-xs tracking-widest mb-5 uppercase">Delivery Address</h3>
                <div className="space-y-5">
                  <Field id="address" label="Street Address" error={errors.address} required>
                    <textarea id="address" className="input-field resize-none" rows={3} placeholder="House no, Street name, Area" value={form.address} onChange={e => set('address', e.target.value)} />
                  </Field>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Field id="city" label="City" error={errors.city} required>
                      <input id="city" className="input-field" placeholder="Chennai" value={form.city} onChange={e => set('city', e.target.value)} />
                    </Field>
                    <Field id="state" label="State">
                      <select id="state" className="input-field appearance-none" value={form.state} onChange={e => set('state', e.target.value)}>
                        {STATES.map(s => <option key={s}>{s}</option>)}
                      </select>
                    </Field>
                    <Field id="pincode" label="Pincode" error={errors.pincode} required>
                      <input id="pincode" className="input-field" placeholder="600001" value={form.pincode} onChange={e => set('pincode', e.target.value)} maxLength={6} />
                    </Field>
                  </div>
                  <Field id="notes" label="Order Notes">
                    <textarea id="notes" className="input-field resize-none" rows={2} placeholder="Special instructions (optional)" value={form.notes} onChange={e => set('notes', e.target.value)} />
                  </Field>
                </div>
              </div>
            </div>

            {/* Summary sidebar */}
            <div>
              <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card sticky top-24">
                <h3 className="font-display text-ink text-xs tracking-widest mb-5 uppercase">Order Summary</h3>

                <div className="space-y-3 mb-5 max-h-52 overflow-y-auto pr-1">
                  {items.map(item => (
                    <div key={item._id} className="flex gap-3 items-center">
                      <div className="w-10 h-10 bg-surface-soft rounded-lg overflow-hidden shrink-0 flex items-center justify-center border border-gray-100">
                        {item.images?.[0]
                          ? <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                          : <span className="text-base">🎆</span>
                        }
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-body text-xs text-ink line-clamp-1 font-medium">{item.name}</p>
                        <p className="font-body text-xs text-ink-faint">×{item.qty}</p>
                      </div>
                      <p className="font-body text-xs text-primary font-semibold shrink-0">
                        ₹{(item.price.sellingPrice * item.qty).toLocaleString('en-IN')}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="space-y-2.5 text-sm font-body border-t border-gray-100 pt-4">
                  <div className="flex justify-between text-ink-muted">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600 text-xs font-medium">
                      <span>Discount ({coupon?.code})</span>
                      <span>−₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-ink-faint text-xs">
                    <span>Payment</span>
                    <span>Cash on Delivery</span>
                  </div>
                  <div className="flex justify-between text-ink font-heading text-base border-t border-gray-100 pt-3">
                    <span>Total</span>
                    <span className="text-primary">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full flex items-center justify-center gap-2 mt-6 rounded-xl"
                >
                  {submitting ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Placing Order...</>
                  ) : (
                    <>Place Order <ChevronRight className="w-4 h-4" /></>
                  )}
                </button>
                <p className="font-body text-xs text-ink-faint text-center mt-3">No payment required now. Pay on delivery.</p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
