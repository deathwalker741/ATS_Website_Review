import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, FileText, Award, Download, ExternalLink } from "lucide-react"

const studentResources = [
  {
    title: "Download your Ei ATS Qualifying Certificate",
    description: "Download your official Ei ATS certificates.",
    icon: Download,
    link: "https://ats.ei.study/ats_qualifier_certificate.php",
    color: "bg-purple-100 text-purple-700",
    features: ["Download certificates"],
  },
  {
    title: "Ei ASSET PAN ID Retriever",
    description: "Retrieve your unique Ei ASSET PAN ID for Ei ATS registration.",
    icon: FileText,
    link: "https://learn.lab-ei.study/asset/ATS/ASSET_PAN/asset_pan_gpt/forgot_asset_pan.html",
    color: "bg-green-100 text-green-700",
    features: ["Retrieve PAN ID"],
  },
  {
    title: "Student Test Portal",
    description:
      "Access your personalized dashboard, view test results, track progress, practice with mock tests, and take the Ei ATS test on the Ei ATS Test Portal.",
    icon: User,
    link: "https://ats.ei.study/student_portal/index.php",
    color: "bg-blue-100 text-blue-700",
    features: ["View test results", "Track progress", "Ei ATS test portal", "Mock test portal"],
  },
  {
    title: "Awards & Recognition",
    description: "View the complete list of Ei ATS winners, scholars, and achievers. See where you stand among the best.",
    icon: Award,
    link: "https://ats.ei.study/reward_winners_india.php",
    color: "bg-yellow-100 text-yellow-700",
    features: ["View winners list", "Scholar recognition", "Achievement gallery", "Success stories"],
  },
]

const benefits = [
  "Access to world-class university programs",
  "Recognition as a top 2% gifted student",
  "Scholarship opportunities",
  "Global academic community",
  "Advanced learning resources",
  "Career guidance and mentorship",
]

export default function ForStudentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">


      {/* Student Tools */}
      <section id="student-tools" className="py-10 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Student Tools & Resources</h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Access all your student resources in one place. Manage your Ei ATS journey with ease.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {studentResources.map((resource, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg flex flex-col h-full">
                <CardHeader>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${resource.color}`}>
                    <resource.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl text-[#850101]">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 flex-1 flex flex-col">
                  <p className="text-gray-600">{resource.description}</p>

                  <div className="space-y-2 flex-1">
                    <h4 className="font-semibold text-sm text-gray-800">Features:</h4>
                    <ul className="space-y-1">
                      {resource.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-[#850101] rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button asChild className="w-full bg-[#850101] hover:bg-[#650101] mt-auto">
                    <a href={resource.link} target="_blank" rel="noopener noreferrer">
                      Access {resource.title} <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="why-join-ats" className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Join Ei ATS?</h2>
              <p className="text-base text-gray-600 mb-8">
                Being part of Ei ATS opens doors to exceptional opportunities and recognition for your academic excellence.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#850101] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="/for-students-image.gif"
                alt="Students celebrating success"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="student-cta" className="py-8 bg-[#850101] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-base text-gray-200 mb-8">
            Join thousands of gifted students who have unlocked their potential through Ei ATS
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#850101] hover:bg-gray-100 font-semibold" asChild>
              <a href="https://ats.ei.study/ats_registration.php" target="_blank" rel="noopener noreferrer">
                Register for Ei ATS 2025
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-white hover:text-[#850101] font-semibold"
              asChild
            >
              <a href="https://ats.ei.study/student_portal/index.php" target="_blank" rel="noopener noreferrer">
                Access Student Test Portal
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
