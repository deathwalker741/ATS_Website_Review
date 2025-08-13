"use client"

import React, { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Globe, GraduationCap, Users, Award, Lightbulb } from "lucide-react"

const timelineEvents = [
  {
    year: "2008-2010",
    title: "Foundation and Duke TIP Partnership",
    description: "Our journey began as a partner to the renowned Duke University Talent Identification Programme (Duke TIP). This collaboration aimed to identify and support academically gifted students by providing enrichment opportunities and international exposure.",
    color: "bg-blue-500",
    badge: "Foundation"
  },
  {
    year: "2011-2015", 
    title: "Expansion and Ei ASSET Summer Programme",
    description: "Ei ASSET Summer Programme (ASP): Introduced an exclusive enrichment programme for the top 2 percentile of Ei ATS-identified students, running successfully until 2019. Global Programme Partnerships: Collaborated with prestigious institutions including Northwestern CTD, Purdue GER2I, Summer Institute for the Gifted (SIG), and UC Berkeley ATDP, opening doors to international learning experiences.",
    color: "bg-green-500",
    badge: "Expansion"
  },
  {
    year: "2016-2020",
    title: "Digital Transformation and GenWise Partnership", 
    description: "Partnered with GenWise to introduce specialized enrichment programmes. Launched the Gifted World platform—an online community designed to connect, engage, and support gifted students and their families.",
    color: "bg-purple-500",
    badge: "Innovation"
  },
  {
    year: "2021",
    title: "Online test from anywhere",
    description: "In response to evolving educational needs, Ei ATS moved to a fully online, computer-based testing format, available at home and fully proctored—ensuring accessibility and integrity.",
    color: "bg-orange-500",
    badge: "Innovation"
  },
  {
    year: "2022",
    title: "Community Building through Partnerships",
    description: "Partnered with GenWise to introduce specialized enrichment programmes. Launched the Gifted World platform—an online community designed to connect, engage, and support gifted students and their families.",
    color: "bg-pink-500",
    badge: "Community"
  },
  {
    year: "2023",
    title: "Johns Hopkins CTY Becomes Our International Partner",
    description: "In a significant milestone, Johns Hopkins CTY became an Ei ATS international partner, opening new avenues for academic excellence for our gifted students.",
    color: "bg-red-500",
    badge: "Milestone"
  }
]

export function HistorySection() {
  return (
    <section id="history" className="py-16 bg-white overflow-x-hidden overflow-y-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-56">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            History & Evolution of Ei ASSET Talent Search
          </h2>
          <p className="text-base text-gray-600 max-w-4xl mx-auto">
            Ei ASSET Talent Search (ATS) has grown tremendously over the years, evolving into a premier platform for identifying and nurturing gifted students across India and beyond.
          </p>
        </div>

        {/* Horizontal Timeline with Connected Boxes */}
        <div className="relative py-16 hidden md:block">
          {/* Main Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#850101] via-[#850101] to-[#650101] transform -translate-y-1/2"></div>
          
          {/* Timeline Events */}
          <div className="relative flex justify-between items-center">
            {timelineEvents.map((event, index) => (
              <div key={index} className="group relative flex flex-col items-center">
                {/* Year Box on Timeline */}
                <div className="relative z-10">
                  <div className="bg-white border-2 border-[#850101] rounded-lg px-4 py-2 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <span className="text-2xl font-bold text-[#850101] font-serif">{event.year}</span>
                  </div>
                </div>

                {/* Connection Line to Heading Box */}
                <div className={`absolute ${
                  index % 2 === 0
                    ? 'top-full h-32'
                    : (index === 1 || index === 3 || index === 5)
                      ? 'bottom-full h-24'
                      : 'bottom-full h-16'
                } left-1/2 transform -translate-x-1/2 w-0.5 bg-[#850101] z-0`}></div>

                {/* Heading Box - Alternating Above/Below */}
                <div
                  className={`absolute ${
                    index % 2 === 0
                      ? (index === 0 || index === 2 || index === 4)
                        ? 'top-32' // push 1st, 3rd, and 5th upper events down to touch the line
                        : 'top-20' // other upper events
                      : index === 1
                        ? '-top-48' // push 2nd block a little up
                        : index === 5
                          ? '-top-56' // push 2023 a bit higher
                          : '-top-40' // default position for other below-timeline events
                  } left-1/2 transform -translate-x-1/2 group-hover:z-20 z-10`}
                >
                  <Card className="w-48 border-2 border-[#850101] bg-[#FFF7F7] shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-4 text-center">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#850101] transition-colors duration-300">
                        {event.title}
                      </h3>
                    </CardContent>
                  </Card>

                  {/* Connection Line to Description Box */}
                  <div className={`absolute ${index % 2 === 0 ? 'top-full' : 'bottom-full'} left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-[#850101] opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                  {/* Description Box - Appears on Hover */}
                  <div
                    className={`absolute ${index % 2 === 0 ? 'top-full' : 'bottom-full'} ${
                      index === 0
                        ? 'left-0 transform-none ml-4' // prevent off-screen overflow for 2010 card
                        : index === 5
                        ? 'right-0 transform-none mr-4' // prevent overflow for 2023 card
                        : 'left-1/2 transform -translate-x-1/2'
                    } opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto z-50 mt-8`}
                  >
                    <Card className="w-[28rem] max-w-[90vw] border-2 border-[#850101] bg-[#FFF7F7] shadow-2xl">
                      <CardContent className="p-6">
                        <h4 className="text-xl font-bold text-gray-900 mb-4">{event.title}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {event.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline (Stacked with Hover) */}
        <div className="md:hidden mt-12">
          <div className="space-y-8">
            {timelineEvents.map((event, index) => (
              <div key={index} className="group relative">
                {/* Timeline Line */}
                {index < timelineEvents.length - 1 && (
                  <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-[#850101]"></div>
                )}
                
                <div className="flex items-start gap-4">
                  {/* Timeline Node */}
                  <div className="w-12 h-12 bg-white border-4 border-[#850101] rounded-full shadow-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300"></div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    {/* Year and Title */}
                    <div className="mb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-5 w-5 text-[#850101]" />
                        <span className="text-xl font-bold text-[#850101]">{event.year}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#850101] transition-colors duration-300">
                        {event.title}
                      </h3>
                    </div>

                    {/* Hover Details */}
                    <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 max-h-0 group-hover:max-h-96 overflow-hidden">
                      <Card className="border-0 shadow-lg bg-gray-50">
                        <CardContent className="p-4">
                          <h4 className="text-sm font-bold text-gray-900 mb-3">{event.title}</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {event.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-40 animate-fade-in-scale">
          <Card className="bg-gradient-to-r from-[#850101] to-[#650101] text-white border-0 shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Join Our Continuing Journey</h3>
              <p className="text-lg text-gray-100 mb-6">
                Be part of the next chapter in our mission to identify and nurture gifted students worldwide
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://ats.ei.study/ats_registration.php"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#850101] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Register for Ei ATS 2025
                </a>
                <a
                  href="/programmes"
                  className="inline-flex items-center px-6 py-3 bg-[#850101] text-white font-semibold rounded-lg hover:bg-[#650101] transition-colors"
                >
                  Explore Partners
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
} 