"use client"

import { useState } from "react"

export function SrrVideoSection() {
  const [videoError, setVideoError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [useYouTube, setUseYouTube] = useState(false)

  const handleVideoError = () => {
    setVideoError(true)
    setIsLoading(false)
  }

  const handleVideoLoad = () => {
    setIsLoading(false)
  }

  const handleFallbackClick = () => {
    setUseYouTube(true)
    setVideoError(false)
    setIsLoading(false)
  }

  return (
    <section id="srr-video" className="py-10 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in-up">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 md:w-1/2 leading-snug">
            Listen to <span className="text-[#850101] font-bold">Sridhar Rajagopalan</span>,<br />
            Co-founder of Educational Initiatives,<br />
            Explains why discovering and supporting gifted students is crucial.
          </h3>

          <div className="md:w-1/2 w-full flex justify-center">
            {videoError && !useYouTube ? (
              <div className="w-full max-w-xs md:max-w-sm lg:max-w-md h-48 bg-gray-100 rounded-xl shadow-professional-lg flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="text-gray-500 mb-2">Video temporarily unavailable</div>
                  <button 
                    onClick={handleFallbackClick}
                    className="text-sm text-[#850101] hover:text-[#650101] underline"
                  >
                    Try alternative version
                  </button>
                </div>
              </div>
            ) : useYouTube ? (
              <div className="w-full max-w-xs md:max-w-sm lg:max-w-md">
                <iframe
                  src="https://www.youtube.com/embed/1YQ5a04xwVs?autoplay=0&rel=0&modestbranding=1"
                  className="w-full h-48 rounded-xl shadow-professional-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Sridhar Rajagopalan - Educational Initiatives"
                />
              </div>
            ) : (
              <div className="relative">
                {isLoading && (
                  <div className="absolute inset-0 bg-gray-100 rounded-xl flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#850101]"></div>
                  </div>
                )}
                <video
                  src="/media/SRR.mp4"
                  controls
                  className="w-full max-w-xs md:max-w-sm lg:max-w-md rounded-xl shadow-professional-lg bg-black"
                  preload="metadata"
                  onError={handleVideoError}
                  onLoadedData={handleVideoLoad}
                  onCanPlay={handleVideoLoad}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
} 