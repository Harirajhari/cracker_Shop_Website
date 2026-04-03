import React from 'react'
import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-ink text-white pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <img src="/Logo.png" alt="Logo" className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/40" />
              <div>
                <p className="font-display text-white tracking-widest text-sm">GURUBHAGAVAN</p>
                <p className="font-body text-primary text-xs tracking-[0.2em] uppercase">Fire Works</p>
              </div>
            </Link>
            <p className="font-body text-white/50 text-sm leading-relaxed max-w-sm">
              Bringing joy and brilliance to every celebration since decades. Premium quality crackers
              sourced directly from Sivakasi — crafted for your most memorable moments.
            </p>
            <div className="flex gap-3 mt-6">
              {[Facebook, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center text-white/60 hover:bg-primary hover:text-white transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-white text-xs tracking-widest mb-5 uppercase">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'Shop All' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
                { to: '/cart', label: 'My Cart' },
              ].map(l => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="font-body text-sm text-white/50 hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span className="w-1 h-1 bg-primary/50 rounded-full" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-white text-xs tracking-widest mb-5 uppercase">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <span className="font-body text-sm text-white/50">Sivakasi, Tamil Nadu – 626123, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+919500012345" className="font-body text-sm text-white/50 hover:text-primary transition-colors">
                  +91 95000 12345
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a href="mailto:info@gurubhagavanfireworks.com" className="font-body text-sm text-white/50 hover:text-primary transition-colors break-all">
                  info@gurubhagavanfireworks.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-white/30">
            © {new Date().getFullYear()} Gurubhagavan Fire Works. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/30">
            Licensed Fireworks Dealer · Sivakasi, Tamil Nadu
          </p>
        </div>
      </div>
    </footer>
  )
}
