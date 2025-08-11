"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, X, Maximize } from "lucide-react"

interface MediaItem {
  id: number
  type: "image" | "video" | "youtube"
  src: string
  youtubeId?: string
  thumbnail: string
  title: string
  description: string
  duration?: string
}

// Helper function to extract YouTube video ID from URL
const getYouTubeId = (url: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  return match && match[2].length === 11 ? match[2] : ''
}

// Helper function to get YouTube thumbnail
const getYouTubeThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

// Debug function to check image loading (disabled for production)
const debugImageLoad = (src: string, type: string) => {
  // Debug logging disabled for production
  // if (process.env.NODE_ENV === 'development') {
  //   console.log(`Loading ${type} image:`, src)
  //   const img = new Image()
  //   img.onload = () => console.log(`✅ Successfully loaded ${type}:`, src)
  //   img.onerror = () => console.log(`❌ Failed to load ${type}:`, src)
  //   img.src = src
  // }
}

const mediaItems: MediaItem[] = [
  {
    id: 1,
    type: "youtube",
    src: "https://www.youtube.com/watch?v=3cDx0llkItM",
    youtubeId: "3cDx0llkItM",
    thumbnail: getYouTubeThumbnail("3cDx0llkItM"),
    title: "Aarav Ei ATS",
    description: "ATS explanation video with an example Aarav",
    duration: "2:21",
  },
  {
    id: 2,
    type: "youtube",
    src: "https://www.youtube.com/watch?v=1YQ5a04xwVs",
    youtubeId: "1YQ5a04xwVs",
    thumbnail: getYouTubeThumbnail("1YQ5a04xwVs"),
    title: "Ei ASSET Talent Search 2024 | Celebrating Giftedness",
    description: "ATS explanation video",
    duration: "1:56",
  },
  {
    id: 3,
    type: "youtube",
    src: "https://www.youtube.com/watch?v=2g1_Lv08CSY",
    youtubeId: "2g1_Lv08CSY",
    thumbnail: getYouTubeThumbnail("2g1_Lv08CSY"),
    title: "Ei ASSET Talent Search Testimonial - Lasya Mohan",
    description: "Student Testimonial",
    duration: "2:06",
  },
  {
    id: 4,
    type: "youtube",
    src: "https://www.youtube.com/watch?v=gu632GxLlts",
    youtubeId: "gu632GxLlts",
    thumbnail: getYouTubeThumbnail("gu632GxLlts"),
    title: "Ei ATS Scholar | Mariah Ann Mathew",
    description: "Student Testimonial",
    duration: "1:28",
  },
  {
    id: 5,
    type: "youtube",
    src: "https://www.youtube.com/watch?v=UgRI1PpDnBA",
    youtubeId: "UgRI1PpDnBA",
    thumbnail: getYouTubeThumbnail("UgRI1PpDnBA"),
    title: "Ei ATS Promo Video",
    description: "ATS explanation video",
    duration: "4:16",
  },
]

export function MediaCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0) // Start at first item
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fullscreenItem, setFullscreenItem] = useState<MediaItem | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [hasPlayedFirstFive, setHasPlayedFirstFive] = useState(false)
  const [block1ImageIndex, setBlock1ImageIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Block 1 images array
  const block1Images = [
    "/block 1/sigphoto1.jpg",
    "/block 1/sigphoto2.jpg", 
    "/block 1/sigphoto3.jpg",
    "/block 1/sigphoto4.jpg",
    "/block 1/nwphoto1.png",
    "/block 1/nwphoto2.png",
    "/block 1/nwphoto3.png",
    "/block 1/pgeriphoto1.jpg",
    "/block 1/pgeriphoto2.jpg",
    "/block 1/pgeriphoto3.jpg",
    "/block 1/pgeriphoto4.jpg",
    "/block 1/pgeriphoto5.jpg",
    "/block 1/pgeriphoto6.jpg",
    "/block 1/pgeriphoto7.jpg",
    "/block 1/jhctyphoto.jpg",
    "/block 1/jhctyphoto1.jpg",
    "/block 1/jhctyphoto.2jpg.jpg",
    "/block 1/jhctyphoto3.jpg"
  ]

  // Un-mute and set volume to 40 % after the first user interaction
  useEffect(() => {
    const unmuteOnFirstGesture = () => {
      setIsMuted(false)
      if (videoRef.current) {
        videoRef.current.muted = false
        videoRef.current.volume = 0.4 // 40 % volume
      }
      window.removeEventListener("pointerdown", unmuteOnFirstGesture)
      window.removeEventListener("keydown", unmuteOnFirstGesture)
    }

    // Attach once so it removes itself automatically
    window.addEventListener("pointerdown", unmuteOnFirstGesture, { once: true })
    window.addEventListener("keydown", unmuteOnFirstGesture, { once: true })

    return () => {
      window.removeEventListener("pointerdown", unmuteOnFirstGesture)
      window.removeEventListener("keydown", unmuteOnFirstGesture)
    }
  }, [])

  // Ensure volume stays at 40 % whenever the current video changes and audio is un-muted
  useEffect(() => {
    if (!isMuted && videoRef.current) {
      videoRef.current.volume = 0.4
    }
  }, [isMuted, currentIndex])

  const currentItem = mediaItems[currentIndex]

  // Debug: Log which video is currently playing
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      console.log(`🎬 Now playing: Video ${currentIndex + 1} - "${currentItem?.title}"`)
    }
  }, [currentIndex, currentItem?.title])

  // Safety check - don't render if currentItem is undefined
  if (!currentItem) {
    return null
  }

  // Debug image loading when component mounts (disabled for production)
  useEffect(() => {
    // console.log('🔍 Testing image accessibility...')
    // mediaItems.forEach((item, index) => {
    //   if (item.type === 'image' || item.type === 'video') {
    //     debugImageLoad(item.thumbnail, `thumbnail-${index}`)
    //   }
    // })
  }, [])

  // Auto-advance for non-video content only (images, YouTube videos with no end detection)
  useEffect(() => {
    // Don't auto-advance for YouTube videos - let them play completely
    if (!isFullscreen && !isHovered && currentItem?.type === "image") {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          if (!hasPlayedFirstFive && prev < 4) {
            return prev + 1
          } else if (!hasPlayedFirstFive && prev === 4) {
            setHasPlayedFirstFive(true)
            return 5 // jump to the next item after the first five
          } else {
            return (prev + 1) % mediaItems.length
          }
        })
      }, 6000)
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isFullscreen, isHovered, hasPlayedFirstFive, currentItem?.type])

  // Start with the first video (index 0)
  // Removed the useEffect that was setting currentIndex to 4

  // Block 1 image rotation every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setBlock1ImageIndex((prevIndex) => (prevIndex + 1) % block1Images.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [block1Images.length])

  // Handle video play/pause
  useEffect(() => {
    if (videoRef.current && currentItem?.type === "video") {
      // Auto-play when video becomes current item
      setIsPlaying(true)
      videoRef.current.play().catch((error) => {
        // Auto-play failed, set playing to false
        setIsPlaying(false)
      })
    }
  }, [currentIndex])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length)
    setIsPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length)
    setIsPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsPlaying(false)
  }

  const openFullscreen = (item: MediaItem) => {
    setFullscreenItem(item)
    setIsFullscreen(true)
  }

  const closeFullscreen = () => {
    setIsFullscreen(false)
    setFullscreenItem(null)
  }

  // Create YouTube embed URL with autoplay
  const getYouTubeEmbedUrl = (videoId: string, autoplay: boolean = true, muted: boolean = true) => {
    const params = new URLSearchParams({
      autoplay: autoplay ? '1' : '0',
      mute: muted ? '1' : '0',
      controls: '1',
      rel: '0',
      modestbranding: '1',
      playsinline: '1',
      enablejsapi: '1',
      start: '0',
      end: '0' // Let video play to end
    })
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "ArrowLeft") {
        prevSlide()
      } else if (e.code === "ArrowRight") {
        nextSlide()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [currentItem, isPlaying])

  // Auto-advance slides every 10 seconds for non-video content
  useEffect(() => {
    if (currentItem?.type === "image") {
      const timer = setInterval(() => {
        nextSlide()
      }, 10000)
      return () => clearInterval(timer)
    }
  }, [currentIndex, currentItem?.type])

  // Handle YouTube video end event for auto-advance
  useEffect(() => {
    if (currentItem?.type === "youtube") {
      if (process.env.NODE_ENV !== 'production') {
        console.log(`🎬 Setting up YouTube end detection for: "${currentItem?.title}"`)
      }
      
      // For YouTube videos, we need to listen for messages from the iframe
      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== 'https://www.youtube.com') return
        
        if (event.data && typeof event.data === 'object') {
          if (process.env.NODE_ENV !== 'production') {
            console.log('📡 YouTube message received:', event.data)
          }
          
          // YouTube sends various events, we're interested in when video ends
          if (event.data.event === 'onStateChange' && event.data.info === 0) {
            // Video ended (state 0 = ended)
            if (process.env.NODE_ENV !== 'production') {
              console.log('✅ YouTube video ended, advancing to next')
            }
            nextSlide()
          }
        }
      }
      
      window.addEventListener('message', handleMessage)
      
      return () => {
        if (process.env.NODE_ENV !== 'production') {
          console.log('🧹 Cleaning up YouTube message listener')
        }
        window.removeEventListener('message', handleMessage)
      }
    }
  }, [currentItem, currentIndex])

  return (
    <>
      <section
        id="media-carousel"
        className="py-10 bg-gradient-to-b from-[#262626] via-[#262626] to-[#850101] text-white overflow-hidden relative"
      >
        {/* Removed floating background circles for cleaner design */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up group">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-hover-glow">
              We identify the top 2% of talented students
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
              <Link href="/#about" className="text-center border-0 shadow-professional hover:shadow-professional-xl card-hover group transition-all duration-500 bg-white/95 backdrop-blur-sm rounded-lg p-4 md:p-6 lg:p-8 cursor-pointer">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#850101] mb-4 md:mb-6 transition-all duration-300 group-hover:scale-110 text-hover-glow">
                  Discover your child's true potential
                </h3>
                <div className="flex items-center justify-center">
                  <img 
                    src={block1Images[block1ImageIndex]} 
                    alt="Ei ATS Programme" 
                    className="h-20 md:h-24 lg:h-32 w-auto object-contain rounded-lg shadow-lg transition-all duration-500"
                  />
                </div>
              </Link>

              <Link href="/programmes" className="text-center border-0 shadow-professional hover:shadow-professional-xl card-hover group transition-all duration-500 bg-white/95 backdrop-blur-sm rounded-lg p-4 md:p-6 lg:p-8 col-span-1 md:col-span-2 lg:col-span-2 cursor-pointer">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#850101] mb-4 md:mb-6 transition-all duration-300 group-hover:scale-110 text-hover-glow">
                  Access prestigious programs worldwide through our university partnerships
                </h3>
                
                {/* Partner Logos Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
                  <div className="flex items-center justify-center">
                    <img src="/John-Hopkins-CTY.png" alt="Johns Hopkins CTY" className="h-12 md:h-14 lg:h-16 w-auto object-contain" />
                  </div>
                  <div className="flex items-center justify-center">
                    <img src="/UC Berkeley ATDP.png" alt="UC Berkeley ATDP" className="h-12 md:h-14 lg:h-16 w-auto object-contain" />
                  </div>
                  <div className="flex items-center justify-center">
                    <img src="/Northwestern CTD.png" alt="Northwestern CTD" className="h-12 md:h-14 lg:h-16 w-auto object-contain" />
                  </div>
                  <div className="flex items-center justify-center">
                    <img src="/Purdue GERI.png" alt="Purdue GERI" className="h-12 md:h-14 lg:h-16 w-auto object-contain" />
                  </div>
                  <div className="flex items-center justify-center">
                    <img src="/sig.jpg" alt="SIG" className="h-12 md:h-14 lg:h-16 w-auto object-contain" />
                  </div>
                  <div className="flex items-center justify-center">
                    <img src="/genwise.png" alt="GENWISE" className="h-12 md:h-14 lg:h-16 w-auto object-contain" />
                  </div>
                </div>
              </Link>

              <Link href="/#rewards" className="text-center border-0 shadow-professional hover:shadow-professional-xl card-hover group transition-all duration-500 bg-white/95 backdrop-blur-sm rounded-lg p-4 md:p-6 lg:p-8 cursor-pointer">
                <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#850101] mb-4 transition-all duration-300 group-hover:scale-110 text-hover-glow">
                  Win Exciting Prizes
                </h3>
                <div className="flex items-center justify-center gap-3 md:gap-4 lg:gap-6">
                  <div className="flex flex-col items-center">
                    <img src="/media/ipad.png" alt="iPad Prize" className="h-20 md:h-24 lg:h-32 w-auto object-contain mb-2 -mt-2 md:-mt-4" />
                    <span className="text-xs md:text-sm font-medium text-[#850101]">iPad</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <img src="/media/watch.png" alt="Apple Watch Prize" className="h-16 md:h-18 lg:h-20 w-auto object-contain mb-2 mt-2 md:mt-4" />
                    <span className="text-xs md:text-sm font-medium text-[#850101] mt-2 md:mt-4">Apple Watch</span>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Main Carousel */}
          <div className="relative animate-scale-in">
            {/* Main Media Container */}
            <div
              className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/10 card-hover-glow group cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={(e) => {
                // For local videos, only allow fullscreen if clicking on the video content area (not controls)
                if (currentItem?.type === "video") {
                  const target = e.target as HTMLElement
                  const video = target.closest('video')
                  
                  // If clicking on the video element itself, check if it's in the controls area
                  if (video) {
                    const rect = video.getBoundingClientRect()
                    const clickY = e.clientY
                    const controlsHeight = 40 // Approximate height of video controls
                    
                    // If clicking in the bottom area where controls are, don't open fullscreen
                    if (clickY > rect.bottom - controlsHeight) {
                      return
                    }
                  }
                  
                  // If clicking on any control-related elements, don't open fullscreen
                  if (target.tagName === "VIDEO" || target.closest("video")) {
                    // Only open fullscreen if clicking on the main video area, not controls
                    const rect = (target.closest("video") as HTMLVideoElement).getBoundingClientRect()
                    const clickY = e.clientY
                    const controlsHeight = 40
                    
                    if (clickY > rect.bottom - controlsHeight) {
                      return
                    }
                  }
                }
                
                openFullscreen(currentItem)
              }}
            >
              <div className="absolute inset-0">
                {currentItem?.type === "video" ? (
                  <video
                    ref={videoRef}
                    src={currentItem?.src}
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    muted
                    onEnded={() => {
                      if (videoRef.current && currentItem?.type === "video") {
                        nextSlide()
                      }
                    }}
                  />
                ) : currentItem?.type === "image" ? (
                  <img
                    src={currentItem?.src || "/placeholder.svg"}
                    alt={currentItem?.title}
                    className="w-full h-full object-cover"
                  />
                ) : currentItem?.type === "youtube" && currentItem?.youtubeId ? (
                  <iframe
                    src={getYouTubeEmbedUrl(currentItem?.youtubeId, true, true)}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={currentItem?.title}
                    onLoad={() => {
                      // YouTube iframe loaded
                      if (process.env.NODE_ENV !== 'production') {
                        console.log('YouTube iframe loaded for:', currentItem?.title)
                      }
                    }}
                  />
                ) : (
                  <img
                    src={currentItem?.src}
                    alt="Media content"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Navigation Arrows */}
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  prevSlide()
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm btn-hover-lift transition-all duration-300 z-10"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  nextSlide()
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm btn-hover-lift transition-all duration-300 z-10"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="mt-8">
              <div className="flex justify-center gap-4 overflow-x-auto pb-4">
                {mediaItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => goToSlide(index)}
                    className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 card-hover-scale ${
                      index === currentIndex
                        ? "border-white scale-110 shadow-professional-lg"
                        : "border-white/30 hover:border-white/60 hover:scale-105"
                    }`}
                  >
                    <img
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-contain transition-transform duration-300 hover:scale-110"
                      onLoad={() => {
                        // Thumbnail loaded successfully
                      }}
                      onError={(e) => {
                        // Thumbnail failed to load
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                      loading="lazy"
                    />
                    {(item.type === "video" || item.type === "youtube") && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-black/50 rounded-full p-1 transition-all duration-300 hover:bg-black/70 hover:scale-110">
                          <Play className="h-3 w-3 text-white" />
                        </div>
                      </div>
                    )}
                    {index === currentIndex && <div className="absolute inset-0 bg-white/20 animate-shimmer"></div>}
                  </button>
                ))}
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {mediaItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                    index === currentIndex ? "bg-white animate-glow" : "bg-white/30 hover:bg-white/60"
                  }`}
                  aria-label={`Go to video ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Video Progress Text */}
            <div className="text-center mt-4 text-white/80 text-sm">
              Video {currentIndex + 1} of {mediaItems.length}: {currentItem?.title}
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      <Dialog open={isFullscreen} onOpenChange={closeFullscreen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black border-0 animate-scale-in">
          {fullscreenItem && (
            <div className="relative w-full h-[95vh] group">
              <Button
                variant="ghost"
                size="icon"
                onClick={closeFullscreen}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white btn-hover-lift transition-all duration-300"
              >
                <X className="h-6 w-6" />
              </Button>

              {fullscreenItem.type === "image" ? (
                <img
                  src={fullscreenItem.src || "/placeholder.svg"}
                  alt={fullscreenItem.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
              ) : fullscreenItem.type === "youtube" && fullscreenItem.youtubeId ? (
                <iframe
                  src={getYouTubeEmbedUrl(fullscreenItem.youtubeId, false, false)}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={fullscreenItem.title}
                />
              ) : (
                <video 
                  src={fullscreenItem.src} 
                  controls 
                  autoPlay 
                  className="w-full h-full object-contain bg-black" 
                  style={{ outline: 'none' }}
                />
              )}

              {/* Fullscreen Info */}
              {currentItem?.type !== "video" && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl font-bold text-white mb-2 text-hover-glow">{currentItem?.title}</h3>
                  <p className="text-gray-200">{currentItem?.description}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}