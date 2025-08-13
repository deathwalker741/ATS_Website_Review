"use client"

import React, { useState } from "react"

export function GiftednessWithVideo() {
  const [videoError, setVideoError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleVideoError = () => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Video error occurred')
    }
    setVideoError(true)
    setIsLoading(false)
  }

  const handleVideoLoad = () => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Video loaded successfully')
    }
    setIsLoading(false)
  }

  // Force hide loading after 3 seconds as fallback
  React.useEffect(() => {
    const timer = setTimeout(() => {
        if (isLoading) {
          if (process.env.NODE_ENV !== 'production') {
            console.log('Forcing loading to false after timeout')
          }
        setIsLoading(false)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [isLoading])

  return (
    <section id="giftedness" className="py-10 bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center animate-fade-in-up">
          {/* Giftedness Copy */}
          <div>
            <h2 className="text-4xl font-bold mb-6 text-hover-glow">
              Importance of Nurturing Giftedness
            </h2>
            <p className="text-base md:text-lg leading-relaxed text-gray-800 bg-white/70 backdrop-blur-md border border-gray-200 shadow-professional-lg rounded-2xl p-6">
              Giftedness, as defined by psychologist <strong className="text-[#850101]">Joseph Renzulli</strong>, combines above-average ability, creativity, and task commitment. Despite a common myth, gifted students often face unique academic and emotional challenges that require specialised support. Investing in gifted education—evident in India's <strong className="text-[#850101]">IIT</strong> system, where alumni drive innovation and leadership—has far-reaching economic benefits. Early identification and nurturing of the top <strong className="text-[#850101]">1–2%</strong> of talent is not just equitable but crucial for sustained national progress.
            </p>
          </div>

          {/* SRR Video */}
          <div className="flex flex-col items-center gap-4">
            {videoError ? (
              <div className="w-full max-w-[280px] md:max-w-[320px] lg:max-w-[360px] h-56 md:h-64 lg:h-72 bg-gray-100 rounded-xl shadow-professional-lg flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="text-gray-500 text-sm mb-1">Video unavailable</div>
                  <div className="text-xs text-gray-400">
                    Check back later
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative">
                {isLoading && (
                  <div className="absolute inset-0 bg-gray-100 rounded-xl flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#850101]"></div>
                  </div>
                )}
                <video
                  src="/media/SRR.mp4"
                  controls
                  className="w-full max-w-[280px] md:max-w-[320px] lg:max-w-[360px] h-56 md:h-64 lg:h-72 rounded-xl shadow-professional-lg bg-black object-contain"
                  preload="auto"
                  playsInline
                  onError={handleVideoError}
                  onLoadedData={handleVideoLoad}
                  onCanPlay={handleVideoLoad}
                />
              </div>
            )}
            <h3 className="text-lg md:text-xl font-semibold text-center leading-snug">
              Why identifying and nurturing gifted students matters<br />
              - Sridhar Rajagopalan
            </h3>
          </div>
        </div>
      </div>
    </section>
  )
} 