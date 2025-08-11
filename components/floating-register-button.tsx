"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { ExternalLink, X } from "lucide-react"

export function FloatingRegisterButton() {
  const [isVisible, setIsVisible] = useState(true)

  // Check if user previously dismissed the button
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissed = localStorage.getItem('floating-register-dismissed')
      if (dismissed === 'true') {
        setIsVisible(false)
      }
    }
  }, [])

  // Handle button click with analytics tracking
  const handleRegisterClick = () => {
    // Analytics tracking (if needed)
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'click', {
        event_category: 'Registration',
        event_label: 'Floating Register Button',
        value: 1
      })
    }
    
    // Open registration page in new tab
    window.open('https://ats.ei.study/ats_registration.php', '_blank', 'noopener,noreferrer')
  }

  // Handle dismiss button
  const handleDismiss = () => {
    setIsVisible(false)
    // Store in localStorage to remember user preference
    if (typeof window !== 'undefined') {
      localStorage.setItem('floating-register-dismissed', 'true')
    }
  }

  // Check if user previously dismissed the button
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const dismissed = localStorage.getItem('floating-register-dismissed')
      if (dismissed === 'true') {
        setIsVisible(false)
      }
    }
  }, [])

  if (!isVisible) return null

  if (process.env.NODE_ENV !== 'production') {
    console.log('FloatingRegisterButton rendering:', { isVisible })
  }

  return (
    <>
      {/* Floating Register Button */}
      <div 
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-[60] transition-all duration-300 ease-in-out opacity-100 translate-y-0"
        role="banner"
        aria-label="Registration call to action"
        style={{ zIndex: 9999 }}
      >
        <div className="relative">
          {/* Dismiss Button */}
          <button
            onClick={handleDismiss}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-600 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
            aria-label="Dismiss registration button"
          >
            <X className="w-3 h-3" />
          </button>

          {/* Main Register Button */}
          <Button
            onClick={handleRegisterClick}
            className="bg-[#850101] hover:bg-[#650101] text-white px-6 py-3 rounded-full shadow-2xl font-semibold text-base md:text-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-[#850101]/30 border-2 border-white/20 backdrop-blur-sm min-w-[200px]"
            size="lg"
          >
            <span className="flex items-center gap-2">
              Register Now
              <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
            </span>
          </Button>
        </div>

        {/* Mobile-specific positioning adjustments */}
        <style jsx>{`
          @media (max-width: 768px) {
            .floating-button {
              bottom: 1rem;
              left: 50%;
              transform: translateX(-50%);
            }
          }
          
          @media (max-width: 480px) {
            .floating-button {
              bottom: 0.75rem;
              width: calc(100vw - 2rem);
              max-width: 300px;
            }
          }
        `}</style>
      </div>

      {/* Keyboard navigation support */}
      <div className="sr-only">
        <button onClick={handleRegisterClick}>
          Register for Ei ASSET Talent Search Test
        </button>
      </div>
    </>
  )
} 