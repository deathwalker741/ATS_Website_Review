"use client"

import { Button } from "@/components/ui/button"
import { GraduationCap, Users, Award } from "lucide-react"
import { useState, useEffect } from "react"

export function HeroSection() {
  const images = [
    "/media/asp-image.jpg", // ASP/GenWise Summer Programme
    "/media/ucbphoto1.webp",
    "/media/jhctyphoto.jpg",
    "/media/jhctyphoto1.jpg",
    "/media/jhctyphoto3.jpg",
    "/media/nwphoto1.png",
    "/media/nwphoto2.png",
    "/media/nwphoto3.png",
    "/media/pgeriphoto1.jpg",
    "/media/pgeriphoto2.jpg",
    "/media/pgeriphoto3.jpg",
    "/media/pgeriphoto4.jpg",
    "/media/pgeriphoto5.jpg",
    "/media/pgeriphoto6.jpg",
    "/media/pgeriphoto7.jpg",
    "/media/sigphoto1.jpg",
    "/media/sigphoto2.jpg",
    "/media/sigphoto3.jpg",
    "/media/sigphoto4.jpg",
    "/media/summerprogrammephoto.jpg",
    "/media/summerprogrammephoto2.jpg",
    "/media/summerprogrammephoto3.jpg",
    "/media/summerprogrammephoto4.jpg",
    "/media/summerprogrammephoto5.jpg",
    "/media/summerprogrammephoto6.jpg"
  ]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Helper to map filename tokens to full university / programme names
  const getProgrammeName = (src: string): string => {
    if (src.includes("asp-image")) return "ASP/GenWise Summer Programme"
    if (src.includes("ucb")) return "UC Berkeley ATDP Programme"
    if (src.includes("jhcty")) return "Johns Hopkins CTY Programme"
    if (src.includes("nw")) return "Northwestern CTD Programme"
    if (src.includes("pgeri")) return "Purdue GER2I Programme"
    if (src.includes("sig")) return "SIG Programme"
    if (src.includes("summerprogramme")) return "ASSET/GenWise Summer Programme"
    return "University Programme"
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [images.length])
  return (
    <section id="hero" className="bg-gradient-to-br from-[#850101] to-[#650101] text-white pt-8 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="lg:-mt-8">
            <h1 className="text-4xl font-bold mb-6 leading-tight">Give Your Child the Opportunity to Discover Their True Potential</h1>
            <p className="text-base md:text-lg mb-8 text-gray-100">
              Enroll Them in the Ei ASSET Talent Search 2025 Today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-white text-[#850101] hover:bg-gray-100 font-semibold" asChild>
                <a href="https://ats.ei.study/ats_registration.php" target="_blank" rel="noopener noreferrer">
                  Register Now
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white bg-transparent hover:bg-white hover:text-[#850101] font-semibold"
                asChild
              >
                <a href="#about">
                Learn More
                </a>
              </Button>
            </div>
            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>25000+ Gifted Students Identified</span>
              </div>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>1000+ Alumni</span>
                </div>
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  <span>100+ Courses</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  <span>15+ Years</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
          <div className="relative w-full h-[400px] md:h-[500px]">
            <img
              src={images[currentImageIndex]}
              alt="Gifted students learning"
              className="rounded-lg shadow-2xl object-contain w-full h-full transition-opacity duration-300"
            />
            </div>
            {getProgrammeName(images[currentImageIndex]) && (
              <div key={getProgrammeName(images[currentImageIndex])} className="mt-4 animate-fade-in-up">
                <span className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm md:text-base font-semibold uppercase tracking-wide text-white shadow-professional-lg">
                  {getProgrammeName(images[currentImageIndex])}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
