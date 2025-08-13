"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

const partners = [
  {
    id: "johns-hopkins",
    name: "Johns Hopkins CTY",
    logo: "/John-Hopkins-CTY.png",
    description: "Programmes for grades 2-12 with online and campus-based courses",
    url: "https://cty.jhu.edu/",
    features: ["98th percentile requirement", "Online & campus courses", "College preparation"]
  },
  {
    id: "uc-berkeley",
    name: "UC Berkeley ATDP",
    logo: "/UC Berkeley ATDP.png",
    description: "Summer residential programme and college preparation for grades 7-10",
    url: "https://atdp.berkeley.edu/",
    features: ["Summer residential", "College preparation", "Academic excellence"]
  },
  {
    id: "northwestern",
    name: "Northwestern CTD",
    logo: "/Northwestern CTD.png",
    description: "Programmes for children age 3-12 with online and residential options",
    url: "https://www.ctd.northwestern.edu/",
    features: ["Early childhood focus", "Online & residential", "Talent development"]
  },
  {
    id: "purdue",
    name: "Purdue GERI",
    logo: "/Purdue GERI.png",
    description: "COMET, STAR & PULSAR programmes for grades 5-12",
    url: "https://www.education.purdue.edu/geri/",
    features: ["STEM focus", "Multiple programmes", "Research-based"]
  },
  {
    id: "sig",
    name: "SIG",
    logo: "/sig.jpg",
    description: "2-3 week residential programmes at prestigious partner institutions, ages 5-17",
    url: "https://www.giftedstudy.org/",
    features: ["Residential programmes", "Prestigious institutions", "Ages 5-17"]
  },
  {
    id: "genwise",
    name: "GENWISE Programme",
    logo: "/genwise.png",
    description: "Higher-order skill development programme",
    url: "https://genwise.in/",
    features: ["Skill development", "Higher-order thinking", "Indian context"]
  }
]

export function PartnersCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const partnersPerSlide = 3
  const totalSlides = Math.ceil(partners.length / partnersPerSlide)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  // Auto-advance slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(timer)
  }, [totalSlides])

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const getCurrentPartners = () => {
    const start = currentSlide * partnersPerSlide
    return partners.slice(start, start + partnersPerSlide)
  }

  return (
    <section id="partners" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-hover-glow">University Partners</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Access world-class educational opportunities through our prestigious university partnerships
          </p>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 max-w-4xl mx-auto mt-4 rounded-r-lg">
            <p className="text-sm text-amber-800 font-medium">
              <span className="font-bold">Important Note:</span> Applicants to gifted programmes must directly contact the relevant university/organization and submit their ATS scores during application. The ASSET Talent Search team does not provide application assistance.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="grid md:grid-cols-3 gap-4">
            {getCurrentPartners().map((partner, index) => (
              <Card
                key={index}
                id={partner.id}
                className="card-hover group shadow-professional hover:shadow-professional-xl transition-all duration-500 border-0 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={partner.name}
                      className="w-full h-32 object-contain bg-white transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                      <ExternalLink className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-base font-semibold text-[#850101] mb-2 transition-all duration-300 group-hover:text-[#650101] text-hover-glow">
                      {partner.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2 transition-colors duration-300 group-hover:text-gray-800">
                      {partner.description}
                    </p>
                    <div className="mt-auto pt-4">
                      <Button
                        variant="outline"
                        className="w-full border-[#850101] text-xs text-[#850101] hover:bg-[#850101] hover:text-white btn-hover-lift transition-all duration-300 group-hover:shadow-lg"
                        asChild
                      >
                        <a href={`/programmes#${partner.id}`}>
                          Read More
                          <ExternalLink className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white border-[#850101] text-[#850101] hover:bg-[#850101] hover:text-white btn-hover-lift shadow-professional transition-all duration-300"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white border-[#850101] text-[#850101] hover:bg-[#850101] hover:text-white btn-hover-lift shadow-professional transition-all duration-300"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                  index === currentSlide ? "bg-[#850101] animate-glow" : "bg-gray-300 hover:bg-[#850101]/60"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}