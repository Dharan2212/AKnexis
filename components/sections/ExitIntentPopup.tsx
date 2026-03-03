'use client'

import { useEffect, useState } from 'react'
import { X, ArrowRight } from 'lucide-react'

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const dismissed = sessionStorage.getItem('exitPopupDismissed')
    if (dismissed) return

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !show) {
        setShow(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [show])

  const handleDismiss = () => {
    setShow(false)
    sessionStorage.setItem('exitPopupDismissed', '1')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    sessionStorage.setItem('exitPopupDismissed', '1')
    setTimeout(() => setShow(false), 2000)
  }

  if (!show) return null

  return (
    <div className="hidden md:flex fixed inset-0 z-50 items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="card-surface w-full max-w-md mx-4 p-8 relative">
        <button onClick={handleDismiss} className="absolute top-4 right-4 text-slate-500 hover:text-white">
          <X size={18} />
        </button>
        {submitted ? (
          <div className="text-center py-4">
            <div className="text-teal-400 text-2xl mb-2">✓</div>
            <p className="text-white font-semibold">Thank you! We will be in touch.</p>
          </div>
        ) : (
          <>
            <div className="text-teal-400 text-xs font-medium tracking-widest uppercase mb-3">Wait — Before You Go</div>
            <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: 'var(--font-syne)' }}>
              Get a Free Business Consultation
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              Leave your email and our team will reach out to discuss how we can help your business launch or grow.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="form-input flex-1"
              />
              <button type="submit" className="btn-primary py-3 px-4 whitespace-nowrap">
                <ArrowRight size={16} />
              </button>
            </form>
            <p className="text-slate-600 text-xs mt-3">No spam. Confidential. One email from us, max.</p>
          </>
        )}
      </div>
    </div>
  )
}
