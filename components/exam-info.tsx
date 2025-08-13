"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, BookOpen, CheckCircle, Home } from "lucide-react"
import { useRegion } from "@/components/region-context"
import { REGIONAL_DATES } from "@/lib/dates"

export function ExamInfo() {
  const { region } = useRegion()
  const dates = REGIONAL_DATES[region]
  const examDetails = [
    {
      icon: Home,
      title: "Online test at home",
      description: "Take the test from the comfort of your home",
    },
    {
      icon: BookOpen,
      title: "Subjects",
      description: "English, Math, Science (60 mins each)",
    },
    {
      icon: Users,
      title: "Eligibility",
      description: "Grades 4 to 8, top 15 percentile in any subject",
    },
    {
      icon: Calendar,
      title: "Test Window",
      description: dates.testWindowShort,
    },
  ]

  return (
    <section id="exam-info" className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Exam Information</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive assessment designed to identify academically gifted students
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {examDetails.map((detail, index) => (
            <Card key={index} className="text-center border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-[#850101] rounded-full flex items-center justify-center mx-auto mb-4">
                  <detail.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-[#850101] mb-2">{detail.title}</h3>
                <p className="text-gray-600">{detail.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-[#850101] rounded-2xl p-8 text-white">
          <div className="text-center">
              <h3 className="text-2xl font-bold mb-6">Important Dates</h3>
            <div className="space-y-4 w-fit mx-auto text-left">
              <div className="flex items-start gap-3 text-left">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>
                    <strong>Early Registration Close Date:</strong> {dates.early}
                  </span>
                </div>
              <div className="flex items-start gap-3 text-left">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>
                    <strong>Regular Registration Closes:</strong> {dates.regular}
                  </span>
                </div>
              <div className="flex items-start gap-3 text-left">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>
                    <strong>Late Registration Closes:</strong> {dates.late}
                  </span>
                </div>
              <div className="flex items-start gap-3 text-left">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>
                    <strong>Test Window:</strong> {dates.testWindow}
                  </span>
                </div>
              <div className="flex items-start gap-3 text-left">
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span>
                    <strong>Results Announced:</strong> {dates.results}
                  </span>
                </div>
              </div>
            <div className="mt-8">
              <Button size="lg" className="bg-white text-[#850101] hover:bg-gray-100 font-semibold" asChild>
                <a href="https://ats.ei.study/ats_registration.php" target="_blank" rel="noopener noreferrer">
                  Register Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
