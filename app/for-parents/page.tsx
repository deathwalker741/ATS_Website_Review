"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"
import { useRegion } from "@/components/region-context"
import { REGIONAL_DATES } from "@/lib/dates"

export default function ForParentsPage() {
  const { region } = useRegion()
  const dates = REGIONAL_DATES[region]

  const testDetails = [
    {
      title: "Test Format",
      description: "Online, computer-based assessment covering English, Math, and Science (60 minutes each).",
    },
    {
      title: "Eligibility",
      description: "Students in grades 4-8 who scored in the top 15th percentile (any subject) are eligible.",
    },
    {
      title: "Important Dates",
      description: `Registrations: Early Bird till ${dates.early}, Regular till ${dates.regular}, Late till ${dates.late}.`,
    },
    {
      title: "Test & Result Dates",
      description: `Tests: ${dates.testWindowShort}; Results announced ${dates.results}.`,
    },
  ]

  const faqs = [
    {
      q: "How do I register my child?",
      a: "Visit the registration portal and complete the online form. For bulk registrations, schools can use the bulk upload template.",
    },
    {
      q: "My child is not from an ASSET school. Can they still appear?",
      a: "Absolutely! See the Non-ASSET Students section below for detailed steps.",
    },
    {
      q: "When will results be declared?",
      a: "Results will be published on the student portal within 4-6 weeks of the test window.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero / Intro */}
      <section className="bg-gradient-to-br from-[#850101] to-[#650101] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Information for Parents</h1>
          <p className="text-base text-gray-100 max-w-3xl mx-auto">
            Everything you need to know to support your child through the Ei ASSET Talent Search journey.
          </p>
        </div>
      </section>

      {/* Test Details */}
      <section id="test-details" className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Test Details</h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Key information about the Ei ATS assessment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testDetails.map((item, idx) => (
              <Card key={idx} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl text-[#850101]">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Non ASSET Students */}
      <section id="non-asset-students" className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">For Non ASSET Students</h2>
              <p className="text-base text-gray-600 mb-8">
                Not from an ASSET school? You can still benchmark your learning with <strong>ASSET Online</strong>,
                qualify for the <strong>Ei ASSET Talent Search (Ei&nbsp;ATS)</strong>, and discover how you compare with
                peers nationwide.
              </p>

              {/* Four-step guide */}
              <ol className="space-y-4 text-gray-700 list-decimal list-inside">
                <li>
                  <strong>Register / Login&nbsp;–</strong>&nbsp;Create a new account or sign in to an existing one on the
                  ASSET Online portal.
                </li>
                <li>
                  <strong>Buy the Test&nbsp;–</strong>&nbsp;Select your class & subject(s) and pay securely using credit
                  card, debit card or net-banking.
                </li>
                <li>
                  <strong>Take the Test&nbsp;–</strong>&nbsp;Attempt the assessment online at your convenience. Results
                  are available immediately after submission.
                </li>
                <li>
                  <strong>Read the Report&nbsp;–</strong>&nbsp;Get question-wise feedback and skill-based analysis to
                  identify strengths and gaps.
                </li>
                <li>
                  <strong>Qualify for Ei ATS&nbsp;–</strong>&nbsp;Score in the <strong>top&nbsp;15&nbsp;percentile</strong>
                  on ASSET Online to become eligible to take the Ei&nbsp;ATS assessment.
                </li>
              </ol>

              {/* Pricing */}
              <div className="mt-8 space-y-2 text-sm text-gray-700">
                <h3 className="text-lg font-semibold text-[#850101]">Pricing</h3>
                <p><strong>India:</strong> ₹600 per test</p>
                <p><strong>International:</strong> USD&nbsp;6 per test</p>
                <p className="text-xs text-gray-500">Payment is online and 100% secure via third-party gateway.</p>
              </div>

              <Button className="mt-8 bg-[#850101] hover:bg-[#650101]" asChild>
                <a
                  href="https://www.assetonline.in/asset_online/index.php#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Take ASSET Online Test
                </a>
              </Button>
            </div>
            <div className="relative">
              <img
                src="/your%20child.png"
                alt="Child taking online test"
                className="rounded-lg shadow-md w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Financial Aid Application */}
      <section id="financial-aid" className="py-10 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Ei ASSET Talent Search: Financial Aid Application</h2>
            <p className="text-base text-gray-600 max-w-4xl mx-auto">
              Welcome to the Ei ASSET Talent Search (Ei ATS) Financial Aid Application portal. This form allows eligible students to apply for partial or full scholarships to cover the registration fee for the Ei ATS exam. We aim to ensure that financial constraints do not hinder talented students from participating in this prestigious talent search.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-[#850101] to-[#650101] text-white rounded-t-lg">
                <CardTitle className="text-2xl text-center">Apply for Financial Aid</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-3">Who is eligible?</h3>
                    <ul className="space-y-2 text-sm text-yellow-700">
                      <li>• Students from families with low financial resources</li>
                      <li>• Students who have excelled in the Ei ASSET test and received an invitation to participate in Ei ATS</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-blue-800 mb-3">Application Process Overview</h3>
                    <ul className="space-y-2 text-sm text-blue-700">
                      <li>• <strong>Fill the Form:</strong> Provide the required details, review the entered information, and agree to the terms before submission</li>
                      <li>• <strong>Application Review:</strong> Our team will evaluate your application within 7 days</li>
                      <li>• <strong>Receive Financial Aid Code:</strong> If approved, you will receive a unique code to adjust the exam fee during registration</li>
                    </ul>
                  </div>

                  <div className="text-center pt-6">
                    <Button 
                      className="bg-[#850101] hover:bg-[#650101] text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300" 
                      asChild
                    >
                      <a
                        href="https://test.assettalentsearch.com/ats/asset_talent_search/financial_aid.php"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Apply for Financial Aid
                      </a>
                    </Button>
                    <p className="text-sm text-gray-500 mt-3">
                      Application opens in a new window. Complete the multi-step form with your information.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {faqs.map((f, idx) => (
              <Card key={idx} className="border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg text-[#850101] flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" /> {f.q}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{f.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 