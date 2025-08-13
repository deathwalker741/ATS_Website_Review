"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Users, MessageSquare } from "lucide-react"

const alumniImages = [
  "/media/summerprogrammephoto4.jpg",
  "/media/summerprogrammephoto5.jpg", 
  "/media/summerprogrammephoto6.jpg"
]

export function AlumniCTA() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % alumniImages.length
      )
    }, 3000) // Change image every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="alumni-cta" className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#850101] rounded-2xl p-8 md:p-12 text-white">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Connect with Our Alumni</h2>
              <p className="text-base text-gray-100 mb-8">
                Connect with students who have participated in Ei ASSET Talent Search and learn about their experiences
                and success stories.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-[#850101] hover:bg-gray-100 font-semibold" asChild>
                  <a href="/schedule-call">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Schedule a Call
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white bg-transparent hover:bg-white hover:text-[#850101] font-semibold"
                >
                  <Users className="h-5 w-5 mr-2" />
                  Join Alumni Network
                </Button>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="relative overflow-hidden rounded-lg shadow-2xl h-80">
                {alumniImages.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Summer Programme Students ${index + 4}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    onError={(e) => {
                      // Failed to load image - handled gracefully
                      e.currentTarget.src = '/placeholder.jpg'
                    }}
                  />
                ))}
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <p className="text-[#850101] font-bold">1000+ Alumni</p>
                <p className="text-gray-600 text-sm">From 100+ schools globally</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
