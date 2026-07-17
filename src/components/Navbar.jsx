import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { itemCount } = useCart()
  const location = useLocation()
  

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [location])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ]

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-3'
            : 'bg-white border-b border-gray-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/Logo.png"
              alt="Gurubhagavan Fire Works"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all"
            />
            <div className="hidden sm:block leading-tight">
              <p className="font-display text-ink text-sm tracking-widest font-semibold">GURUBHAGAVAN</p>
              <p className="font-body text-primary text-xs tracking-[0.2em] uppercase font-medium">Fire Works</p>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`nav-link after:absolute after:bottom-[-3px] after:left-0 after:h-[2px] after:rounded-full after:bg-primary after:transition-all after:duration-300 ${
                  isActive(l.to) ? 'text-primary after:w-full' : 'after:w-0 hover:after:w-full'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <Link to="/cart" className="relative group p-2">
              <ShoppingCart className={`w-5 h-5 transition-colors ${itemCount > 0 ? 'text-primary' : 'text-ink-muted group-hover:text-primary'}`} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>
            <Link to="/products" className="hidden md:flex btn-primary text-xs px-4 py-2.5">
              Shop Now
            </Link>
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden p-2 text-ink-muted hover:text-primary transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
        <div
          className={`absolute top-[72px] left-4 right-4 bg-white rounded-2xl shadow-xl border border-gray-100
                      p-5 transition-all duration-300 ${
            mobileOpen ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-1">
            {links.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-4 py-3 rounded-lg font-body text-sm font-medium transition-colors ${
                  isActive(l.to) ? 'bg-primary/10 text-primary' : 'text-ink-light hover:bg-gray-50 hover:text-primary'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-3 mt-2 border-t border-gray-100 space-y-2">
              <Link to="/cart" className="flex items-center gap-2 px-4 py-3 rounded-lg font-body text-sm font-medium text-ink-light hover:bg-gray-50 transition-colors">
                <ShoppingCart className="w-4 h-4" />
                Cart {itemCount > 0 && <span className="bg-primary text-white text-xs px-1.5 py-0.5 rounded-full">{itemCount}</span>}
              </Link>
              <Link to="/products" className="btn-primary w-full flex items-center justify-center text-sm">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
