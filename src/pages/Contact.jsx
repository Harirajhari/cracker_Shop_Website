import React, { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!/^[6-9]\d{9}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit number'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSending(true)
    await new Promise(r => setTimeout(r, 1200))
    setSending(false)
    setSent(true)
  }

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: '' }))
  }

  const contacts = [
    { icon: Phone, title: 'Phone / WhatsApp', lines: ['+91 95000 12345', '+91 95000 12346'], href: 'tel:+919500012345', action: 'Call Now' },
    { icon: Mail, title: 'Email', lines: ['info@gurubhagavanfireworks.com'], href: 'mailto:info@gurubhagavanfireworks.com', action: 'Send Email' },
    { icon: MapPin, title: 'Address', lines: ['Sivakasi, Virudhunagar District', 'Tamil Nadu – 626 123, India'] },
    { icon: Clock, title: 'Business Hours', lines: ['Mon – Sat: 9:00 AM – 7:00 PM', 'Sun: 10:00 AM – 4:00 PM'] },
  ]

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">

      {/* Header */}
      <section className="py-14 bg-surface-warm text-center">
        <div className="max-w-3xl mx-auto px-4">
          <p className="section-subtitle mb-2">Get in Touch</p>
          <h1 className="section-title mb-4">Contact Us</h1>
          <div className="primary-divider" />
          <p className="font-body text-ink-muted mt-5 text-sm leading-relaxed max-w-xl mx-auto">
            Questions about products or want to place a bulk order? We're here to help.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {contacts.map(({ icon: Icon, title, lines, href, action }) => (
            <div key={title} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'linear-gradient(135deg, #FEF0EA, #FBF5E6)' }}
              >
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-body text-xs text-ink-muted uppercase tracking-wider font-semibold mb-3">{title}</h3>
              {lines.map((l, i) => <p key={i} className="font-body text-sm text-ink leading-relaxed">{l}</p>)}
              {href && action && (
                <a
                  href={href}
                  className="inline-flex items-center gap-1.5 text-xs font-body font-semibold text-primary hover:text-primary-dark transition-colors mt-4"
                >
                  {action} →
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Form + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="font-display text-2xl text-ink tracking-wide mb-6">Send Us a Message</h2>
            {sent ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-heading text-ink text-lg mb-2">Message Sent!</h3>
                <p className="font-body text-ink-muted text-sm">We'll get back to you within 24 hours.</p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', phone: '', email: '', subject: '', message: '' }) }}
                  className="btn-outline-primary text-sm mt-6 rounded-xl"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-body text-xs text-ink-muted uppercase tracking-wider mb-1.5 block font-medium">
                      Full Name <span className="text-primary">*</span>
                    </label>
                    <input className="input-field" placeholder="Raj Kumar" value={form.name} onChange={e => set('name', e.target.value)} />
                    {errors.name && <p className="text-xs text-red-500 mt-1 font-body">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="font-body text-xs text-ink-muted uppercase tracking-wider mb-1.5 block font-medium">
                      Phone <span className="text-primary">*</span>
                    </label>
                    <input className="input-field" placeholder="9500012345" value={form.phone} onChange={e => set('phone', e.target.value)} maxLength={10} />
                    {errors.phone && <p className="text-xs text-red-500 mt-1 font-body">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="font-body text-xs text-ink-muted uppercase tracking-wider mb-1.5 block font-medium">Email</label>
                  <input type="email" className="input-field" placeholder="your@email.com (optional)" value={form.email} onChange={e => set('email', e.target.value)} />
                </div>

                <div>
                  <label className="font-body text-xs text-ink-muted uppercase tracking-wider mb-1.5 block font-medium">Subject</label>
                  <select className="input-field appearance-none" value={form.subject} onChange={e => set('subject', e.target.value)}>
                    <option value="">Select a topic...</option>
                    <option>Product Enquiry</option>
                    <option>Bulk / Wholesale Order</option>
                    <option>Order Status</option>
                    <option>Return / Complaint</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="font-body text-xs text-ink-muted uppercase tracking-wider mb-1.5 block font-medium">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea className="input-field resize-none" rows={5} placeholder="Tell us how we can help..." value={form.message} onChange={e => set('message', e.target.value)} />
                  {errors.message && <p className="text-xs text-red-500 mt-1 font-body">{errors.message}</p>}
                </div>

                <button type="submit" disabled={sending} className="btn-primary w-full flex items-center justify-center gap-2 rounded-xl">
                  {sending
                    ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                    : <><Send className="w-4 h-4" /> Send Message</>
                  }
                </button>
              </form>
            )}
          </div>

          {/* Map + WhatsApp */}
          <div className="space-y-6">
            <h2 className="font-display text-2xl text-ink tracking-wide">Find Us</h2>
            <div className="w-full aspect-video bg-surface-soft border border-gray-100 rounded-2xl overflow-hidden">
              <iframe
                title="Gurubhagavan Fire Works Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31625.94!2d77.8058!3d9.4547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cf0c9b0fbb4f%3A0x1e8d0f6e7c9d0!2sSivakasi%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="bg-surface-warm border border-primary/10 rounded-2xl p-6">
              <h3 className="font-heading text-ink font-semibold mb-2">Bulk & Wholesale Orders</h3>
              <p className="font-body text-sm text-ink-muted leading-relaxed mb-4">
                Planning a large event? We offer special pricing for bulk orders with dedicated support.
              </p>
              <a
                href="https://wa.me/919500012345?text=Hi, I'm interested in a bulk order from Gurubhagavan Fire Works"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 font-body font-semibold text-sm px-6 py-3 rounded-xl
                           text-white transition-all hover:scale-[1.02] active:scale-95"
                style={{ background: '#25D366' }}
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
