import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, Award, Users, MapPin, ChevronRight } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-white pt-24 pb-20">

      {/* Hero */}
      <section className="py-16 text-center bg-surface-warm">
        <div className="max-w-3xl mx-auto px-4">
          <p className="section-subtitle mb-2">Who We Are</p>
          <h1 className="section-title mb-4">Lighting Joy Since Decades</h1>
          <div className="primary-divider" />
          <p className="font-body text-ink-muted text-lg leading-relaxed max-w-2xl mx-auto mt-6">
            Gurubhagavan Fire Works is a family-run fireworks brand rooted in the heart of Sivakasi —
            India's fireworks capital. We bring authentic, safe, and brilliant crackers to families
            and celebrations across the country.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-subtitle mb-2">Our Story</p>
              <h2 className="font-display text-2xl md:text-3xl text-ink tracking-wide mb-6">
                From Sivakasi to Your Doorstep
              </h2>
              <div className="space-y-4 font-body text-ink-muted text-sm leading-relaxed">
                <p>
                  Founded with a passion for celebration, Gurubhagavan Fire Works has been supplying
                  premium quality crackers and fireworks to households, wholesalers, and event
                  organizers for over two decades.
                </p>
                <p>
                  Based in Sivakasi — the undisputed capital of India's fireworks industry —
                  we work directly with the best manufacturers to ensure every product meets
                  the highest standards of quality and safety.
                </p>
                <p>
                  From Diwali sparklers to grand wedding aerial shells, our collection covers
                  every occasion and every budget, making us the trusted name for celebrations
                  across Tamil Nadu and beyond.
                </p>
              </div>
              <Link to="/products" className="btn-outline-primary inline-flex items-center gap-2 mt-8 text-sm">
                Browse Our Collection <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Logo visual */}
            <div className="flex justify-center">
              <div className="relative">
                <div
                  className="absolute inset-[-40px] rounded-full opacity-10"
                  style={{ background: 'radial-gradient(circle, #E8450A, transparent 70%)' }}
                />
                <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-surface-warm border-4 border-primary/10 flex items-center justify-center">
                  <img
                    src="/Logo.png"
                    alt="Gurubhagavan Fire Works"
                    className="w-52 h-52 sm:w-60 sm:h-60 rounded-full object-cover"
                    style={{ boxShadow: '0 8px 40px rgba(232,69,10,0.2)' }}
                  />
                </div>
                {/* Stats floating */}
                <div className="absolute -bottom-3 -right-3 bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-100">
                  <p className="font-display text-xl text-gradient-primary">50K+</p>
                  <p className="font-body text-xs text-ink-faint">Happy Customers</p>
                </div>
                <div className="absolute -top-3 -left-3 bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-100">
                  <p className="font-display text-xl text-gradient-gold">20+</p>
                  <p className="font-body text-xs text-ink-faint">Years of Trust</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-surface-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-subtitle mb-2">What We Stand For</p>
            <h2 className="font-display text-2xl md:text-3xl text-ink tracking-wide">Our Values</h2>
            <div className="gold-divider" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Shield, title: 'Safety First', desc: 'All products are PESO licensed and tested to the highest safety standards.' },
              { icon: Award, title: 'Quality Assured', desc: 'Only the finest products from Sivakasi\'s most reputed manufacturers.' },
              { icon: Users, title: 'Customer Focus', desc: 'Decades of trust built through honest service and genuine care.' },
              { icon: MapPin, title: 'Proudly Indian', desc: 'Made in India, celebrating India\'s rich festival traditions.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white text-center p-6 rounded-2xl border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                  style={{ background: 'linear-gradient(135deg, #FEF0EA, #FBF5E6)' }}
                >
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-ink font-semibold mb-2">{title}</h3>
                <p className="font-body text-xs text-ink-muted leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[['20+', 'Years in Business'], ['500+', 'Products'], ['50K+', 'Happy Customers'], ['100%', 'Licensed']].map(([v, l]) => (
              <div key={l} className="p-6 bg-surface-warm rounded-2xl border border-primary/10">
                <p className="font-display text-3xl text-gradient-primary mb-1">{v}</p>
                <p className="font-body text-sm text-ink-muted">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 mx-4 sm:mx-8 lg:mx-auto max-w-5xl rounded-3xl text-white text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #E8450A 0%, #F5A623 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`, backgroundSize: '32px 32px' }}
        />
        <div className="relative z-10 px-4">
          <h2 className="font-display text-2xl md:text-3xl tracking-wide mb-4">Ready to Celebrate?</h2>
          <p className="font-body text-white/80 text-sm mb-8">Explore our complete range of crackers for every occasion.</p>
          <Link to="/products" className="bg-white text-primary font-body font-semibold px-8 py-3 rounded-full hover:bg-white/90 transition-all inline-flex items-center gap-2 text-sm shadow-lg">
            Shop Now <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
