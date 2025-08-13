"use client"

import React from "react"
import { useRegion } from "@/components/region-context"
import { REGIONAL_DATES } from "@/lib/dates"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Calendar, Award, GraduationCap } from "lucide-react"

export const RoadmapSection = () => {
  const { region } = useRegion()
  const dates = REGIONAL_DATES[region]
  
  const roadmapSteps = [
    {
      id: 1,
      title: "Eligibility",
      description: "Ei ASSET Top 15 percentile in either English, Maths or Science",
      icon: CheckCircle
    },
    {
      id: 2,
      title: "Registration",
      description: [
        `Early Bird closes on ${dates.early}`,
        `Regular registration closes on ${dates.regular}`, 
        `Late Registration Closes on ${dates.late}`
      ],
      icon: Calendar
    },
    {
      id: 3,
      title: "Test and Results",
      description: [
        `Test dates are ${dates.testWindow}`,
        `Results announcement on ${dates.results}`
      ],
      icon: Award
    },
    {
      id: 4,
      title: "Talent Development",
      description: "Summer programmes starts in May 2026",
      icon: GraduationCap
    }
  ]

  return (
    <section id="roadmap" className="py-6 sm:py-8 lg:py-12 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
            Ei ATS Roadmap
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Navigating the journey to academic success
          </p>
        </div>

        {/* Roadmap Container */}
        <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
          {/* Main Timeline Line - Hidden on mobile, visible on larger screens */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-[#850101] to-[#650101] rounded-full opacity-30" />
          
          {/* Roadmap Steps */}
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-4 sm:gap-6">
            {roadmapSteps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center relative flex-1 w-full">
                {/* Step Circle */}
                <div className="relative z-10 w-10 h-10 sm:w-12 sm:h-12 bg-[#850101] rounded-full flex items-center justify-center shadow-lg border-4 border-white mb-3 sm:mb-4">
                  <step.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                
                {/* Heading Rectangle */}
                <div className="w-full bg-gradient-to-r from-[#850101] to-[#650101] text-white rounded-lg p-3 sm:p-4 text-center shadow-md mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-bold">
                    {step.title}
                  </h3>
                </div>
                
                {/* Description Box - Directly attached to heading */}
                <Card className="w-full border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm group flex-1 flex flex-col">
                  <CardContent className="p-4 sm:p-6 flex-1 flex flex-col justify-center">
                    <div className="text-xs sm:text-sm text-gray-600 space-y-2 group-hover:text-gray-800 transition-colors duration-300">
                      {Array.isArray(step.description) ? (
                        <ul className="space-y-1 text-left">
                          {step.description.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#850101] font-bold flex-shrink-0 mt-0.5">•</span>
                              <span className="leading-relaxed group-hover:font-semibold transition-all duration-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-center leading-relaxed group-hover:font-semibold transition-all duration-300">{step.description}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8 sm:mt-12">
          <Card className="inline-block border-0 shadow-lg bg-gradient-to-r from-[#850101] to-[#650101] text-white w-full sm:w-auto">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-bold mb-2">Ready to Start Your Journey?</h3>
              <p className="text-sm sm:text-base text-gray-100 mb-4">
                Join thousands of students who have discovered their true potential through Ei ATS
              </p>
              <a
                href="https://ats.ei.study/ats_registration.php"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto px-4 sm:px-6 py-3 bg-white text-[#850101] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                Register Now for Ei ATS 2025
              </a>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
} 