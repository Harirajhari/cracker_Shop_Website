import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Star, Shield, Truck, Award, Sparkles, Phone } from 'lucide-react'
import api from '../utils/api'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [featured, setFeatured] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.get('/products?isFeatured=true&limit=8&isActive=true'),
      api.get('/categories'),
    ])
      .then(([prod, cat]) => {
        setFeatured(prod.data.products || prod.data.data || [])
        setCategories(cat.data.categories || cat.data.data || [])
      })
      .catch(() => {
        setFeatured(MOCK_PRODUCTS)
        setCategories(MOCK_CATEGORIES)
      })
      .finally(() => setLoading(false))
  }, [])

  const categoryEmojis = ['🎆', '🎇', '✨', '🧨', '💥', '🌟', '🎉', '🎊']

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
        {/* Background warm gradient blob */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 80% 50%, #FEF0EA 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 20% 80%, #FBF5E6 0%, transparent 60%)',
          }}
        />
        {/* Decorative circle */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #E8450A 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Text side */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-body font-semibold px-4 py-2 rounded-full mb-6 tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              Premium Fireworks from Sivakasi
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-wide text-ink mb-6">
              Light Up{' '}
              <span className="text-gradient-primary">Your</span>
              <br />
              Celebration
            </h1>

            <p className="font-body text-ink-muted text-lg leading-relaxed mb-10 max-w-lg">
              Discover India's finest crackers — from dazzling aerial shells to enchanting sparklers.
              Every piece crafted for your most memorable moments.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="btn-primary flex items-center gap-2 justify-center text-sm">
                Shop All Crackers
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link to="/about" className="btn-outline-primary flex items-center gap-2 justify-center text-sm">
                Our Story
              </Link>
            </div>

            {/* Mini stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-gray-100">
              {[['500+', 'Products'], ['20+', 'Years'], ['50K+', 'Customers']].map(([v, l]) => (
                <div key={l}>
                  <p className="font-display text-2xl text-gradient-primary">{v}</p>
                  <p className="font-body text-xs text-ink-faint mt-0.5">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Logo / visual side */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Outer glow ring */}
              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-20"
                style={{ background: 'radial-gradient(circle, #E8450A, #F5A623)' }}
              />
              {/* Rotating ring */}
              <div
                className="absolute inset-[-20px] rounded-full border-2 border-dashed border-gold/30"
                style={{ animation: 'spin 20s linear infinite' }}
              />
              <div
                className="absolute inset-[-50px] rounded-full border border-primary/10"
                style={{ animation: 'spin 30s linear infinite reverse' }}
              />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

              <img
                src="/Logo.png"
                alt="Gurubhagavan Fire Works"
                className="relative z-10 w-72 h-72 sm:w-80 sm:h-80 rounded-full object-cover shadow-xl"
                style={{ boxShadow: '0 20px 60px rgba(232,69,10,0.25), 0 0 0 8px #fff, 0 0 0 10px rgba(232,69,10,0.1)' }}
              />

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-100 flex items-center gap-2">
                <span className="text-xl">🏆</span>
                <div>
                  <p className="font-body text-xs font-semibold text-ink">100% Licensed</p>
                  <p className="font-body text-[10px] text-ink-faint">PESO Approved</p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-100 flex items-center gap-2">
                <span className="text-xl">✨</span>
                <div>
                  <p className="font-body text-xs font-semibold text-ink">Since 2000+</p>
                  <p className="font-body text-[10px] text-ink-faint">Trusted Brand</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="font-body text-[10px] text-ink-muted tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-ink-muted to-transparent" />
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────── */}
      {categories.length > 0 && (
        <section className="py-20 bg-surface-soft">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="section-subtitle mb-2">Browse by Type</p>
              <h2 className="section-title">Shop by Category</h2>
              <div className="primary-divider" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.slice(0, 12).map((cat, i) => (
                <Link
                  key={cat._id}
                  to={`/products?category=${cat._id}`}
                  className="flex flex-col items-center gap-3 p-5 bg-white rounded-xl border border-gray-100
                             hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">
                    {categoryEmojis[i % categoryEmojis.length]}
                  </span>
                  <span className="font-body text-xs text-ink-light group-hover:text-primary transition-colors text-center font-medium">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FEATURED PRODUCTS ────────────────────────── */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-2">Hand Picked</p>
            <h2 className="section-title">Featured Crackers</h2>
            <div className="primary-divider" />
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {[...Array(8)].map((_, i) => (
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
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {featured.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/products" className="btn-outline-primary inline-flex items-center gap-2 text-sm">
              View All Products <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────── */}
      <section className="py-20 bg-surface-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-2">Why Us</p>
            <h2 className="section-title">The GB Difference</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Safety First', desc: 'All products are PESO licensed and tested to the highest safety standards.' },
              { icon: Award, title: 'Premium Quality', desc: 'Directly sourced from Sivakasi\'s finest manufacturers with strict quality control.' },
              { icon: Truck, title: 'Pan-India Delivery', desc: 'Safely packaged and delivered across India for every occasion.' },
              { icon: Star, title: 'Trusted for Decades', desc: 'Serving families and businesses with the best crackers since generations.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white p-6 rounded-xl border border-gray-100 hover:shadow-md hover:-translate-y-0.5
                           transition-all duration-300 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'linear-gradient(135deg, #FEF0EA, #FBF5E6)' }}
                >
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-ink text-base font-semibold mb-2">{title}</h3>
                <p className="font-body text-sm text-ink-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────── */}
      <section
        className="py-20 relative overflow-hidden text-white"
        style={{ background: 'linear-gradient(135deg, #E8450A 0%, #F5A623 100%)' }}
      >
        {/* Decorative dots */}
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`, backgroundSize: '40px 40px' }}
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-5xl tracking-wide mb-4">
            Ready to Celebrate?
          </h2>
          <p className="font-body text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Order now and make your Diwali, wedding, or any occasion truly spectacular.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-white text-primary font-body font-semibold px-8 py-3.5 rounded-sm
                         hover:bg-white/90 transition-all duration-300 hover:scale-105 active:scale-95
                         flex items-center gap-2 justify-center text-sm shadow-lg"
            >
              <Sparkles className="w-4 h-4" /> Shop Now
            </Link>
            <a
              href="tel:+919500012345"
              className="border-2 border-white/60 text-white font-body font-semibold px-8 py-3.5 rounded-sm
                         hover:bg-white/10 transition-all duration-300 flex items-center gap-2 justify-center text-sm"
            >
              <Phone className="w-4 h-4" /> Call Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

const MOCK_PRODUCTS = [
  { _id: '1', name: 'Diwali Deluxe Gift Box', category: { name: 'Gift Boxes' }, brand: 'Standard', price: { sellingPrice: 999, mrp: 1499 }, stock: { available: 50 }, isFeatured: true },
  { _id: '2', name: 'Sky Shot Aerial Shells', category: { name: 'Aerial' }, brand: 'Premium', price: { sellingPrice: 450, mrp: 600 }, stock: { available: 100 }, isFeatured: true },
  { _id: '3', name: 'Golden Sparklers 30cm', category: { name: 'Sparklers' }, brand: 'Standard', price: { sellingPrice: 120, mrp: 150 }, stock: { available: 200 }, isFeatured: true },
  { _id: '4', name: 'Flower Pots (10 pcs)', category: { name: 'Ground' }, brand: 'Standard', price: { sellingPrice: 280, mrp: 350 }, stock: { available: 80 }, isFeatured: true },
  { _id: '5', name: 'Color Smoke Fountain', category: { name: 'Fountains' }, brand: 'Premium', price: { sellingPrice: 199, mrp: 249 }, stock: { available: 60 }, isFeatured: true },
  { _id: '6', name: 'Thunder King Bombs', category: { name: 'Sound' }, brand: 'Standard', price: { sellingPrice: 350, mrp: 450 }, stock: { available: 0 }, isFeatured: true },
  { _id: '7', name: 'Rainbow Chakkar Pack', category: { name: 'Chakkars' }, brand: 'Standard', price: { sellingPrice: 180, mrp: 220 }, stock: { available: 150 }, isFeatured: true },
  { _id: '8', name: 'Wedding Special Combo', category: { name: 'Combos' }, brand: 'Premium', price: { sellingPrice: 2499, mrp: 3500 }, stock: { available: 30 }, isFeatured: true },
]
const MOCK_CATEGORIES = [
  { _id: 'c1', name: 'Aerial Shells' },
  { _id: 'c2', name: 'Sparklers' },
  { _id: 'c3', name: 'Fountains' },
  { _id: 'c4', name: 'Ground Items' },
  { _id: 'c5', name: 'Gift Boxes' },
  { _id: 'c6', name: 'Combos' },
]
