"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import Link from "next/link"

const testimonials = [
  // Featured alumni (displayed first)
  {
    name: "Yamini Prashanth",
    role: "Consulting Intern at Oliver Wyman",
    location: "",
    content:
      "The opportunity to interact with special students from around the country, the opportunity to interact with world-class mentors, and the freedoms coupled with responsibility, and a general sense of dignity for the middle-school student that I was, were the memorable aspects of the Programme.",
    rating: 5,
    link: "https://www.linkedin.com/in/yaminiprashanth/",
  },
  {
    name: "Rupasri",
    role: "Student",
    image: "/media/testimonialphoto_rupasri.png",
    quote: "The Ei ASSET Talent Search was, were the memorable aspects of the Programme.",
    grade: "Grade 8"
  },
  {
    name: "Shaashvat",
    role: "Student", 
    image: "/media/testimonialphoto_shaashvat.png",
    quote: "My first ever exposure to the field was through the Ei ASSET Summer Programme. The experience was an incredible learning and growth opportunity for me, both personally and academically. It inspired my interest in neuroscience and medicine, and I'm so thankful for the memorable experiences.",
    grade: "Grade 10"
  },
  {
    name: "Shivani",
    role: "Student",
    image: "/media/testimonialphoto_shivani.png", 
    quote: "These programmes were learner-friendly environments, extremely focused on honing the skillsets of a group of similarly-abled students. There was an approach towards mastery. The skills I picked up are perennial and have helped me throughout my academic journey.",
    grade: "Grade 12"
  },
  // Other community testimonials
  {
    name: "Parent of ATS Student",
    role: "Parent",
    image: "/media/placeholder-user.jpg",
    quote: "Ei ATS helped identify my daughter's exceptional abilities in mathematics. The programme opened doors to Johns Hopkins CTY, which has been transformative for her academic growth.",
    grade: "Parent"
  },
  {
    name: "Dr. Michael Chen",
    role: "School Principal",
    location: "Singapore",
    content:
      "We've been partnering with Ei ATS for 3 years. Their assessment is comprehensive and the university partnerships provide our gifted students with unparalleled opportunities.",
    rating: 5,
  },
  {
    name: "ATS Gold Scholar",
    role: "Student",
    image: "/media/placeholder-user.jpg",
    quote: "Being recognized as a Gold Scholar through Ei ATS was life-changing. I'm now part of the UC Berkeley ATDP programme and couldn't be more grateful for this opportunity.",
    grade: "Grade 11"
  },
  {
    name: "Parent of ATS Qualifier",
    role: "Parent",
    image: "/media/placeholder-user.jpg",
    quote: "The detailed assessment report helped us understand our son's strengths better. The guidance for university programmes has been invaluable for his academic journey.",
    grade: "Parent"
  },
]

export function TestimonialsCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-10 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            <Link href="/resources#testimonials" className="hover:text-[#850101] underline-offset-4 hover:underline">
              What Our Community Says
            </Link>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Hear from parents, students, and educators who have experienced the Ei ATS difference
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl">
            <CardContent className="p-12">
              <Quote className="h-12 w-12 text-[#850101] mb-6 mx-auto" />
              <blockquote className="text-xl text-gray-700 text-center mb-8 leading-relaxed">
                "{testimonials[currentSlide].content}"
              </blockquote>
              <div className="text-center">
                <h4 className="font-bold text-[#850101] text-lg">
                  {testimonials[currentSlide].link ? (
                    <Link
                      href={testimonials[currentSlide].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {testimonials[currentSlide].name}
                    </Link>
                  ) : (
                    testimonials[currentSlide].name
                  )}
                </h4>
                <p className="text-gray-600">
                  {testimonials[currentSlide].role}
                  {testimonials[currentSlide].role && testimonials[currentSlide].location && " • "}
                  {testimonials[currentSlide].location}
                </p>
                <div className="flex justify-center mt-4">
                  {testimonials[currentSlide].rating && Array.from({ length: testimonials[currentSlide].rating }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 bg-white border-[#850101] text-[#850101] hover:bg-[#850101] hover:text-white"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 bg-white border-[#850101] text-[#850101] hover:bg-[#850101] hover:text-white"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-[#850101]" : "bg-gray-300"
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
