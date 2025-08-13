import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { School, Upload, Users, BarChart3, CheckCircle, UserPlus, Mail, ArrowRight, Info, FileText, Download } from "lucide-react"

const schoolTools = [
  {
    title: "Bulk Registration Tool",
    description:
      "Register multiple students efficiently with our bulk registration system. Save 10% on registration fee and streamline your enrollment process.",
    icon: Upload,
    link: "#bulk-registration",
    color: "bg-blue-100 text-blue-700",
    features: ["10% discount on fee", "Excel template", "Streamlined process", "Dedicated support"],
  },
  {
    title: "School Admin Login",
    description:
      "Access your comprehensive school dashboard to manage student registrations, view results, track qualifiers, and analyze performance data.",
    icon: Users,
    link: "/for-schools/login",
    color: "bg-green-100 text-green-700",
    features: ["Student management", "Results & qualifiers", "Performance analytics", "Year-over-year comparison"],
  },
  {
    title: "Nominate Students",
    description:
      "Non-ASSET schools can nominate their top 15% performing students to participate in the Ei ATS test. Submit your school's brightest talents.",
    icon: UserPlus,
    link: "#non-asset-schools",
    color: "bg-purple-100 text-purple-700",
    features: ["Top 15% nomination", "Student selection criteria", "Academic merit basis", "Direct test access"],
  },
]

const benefits = [
  "Identify gifted students in your institution",
  "Access to detailed performance analytics",
  "Streamlined registration process",
  "Recognition for your school's achievements",
  "Professional development opportunities",
  "Partnership with leading partner programmes",
]



export default function ForSchoolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-br from-[#850101] to-[#650101] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-6">For Schools & Educators</h1>
              <p className="text-base text-gray-100 mb-8">
                Empower your institution with comprehensive tools to identify, nurture, and celebrate academically
                gifted students through Ei ATS 2025.
              </p>
              <Button size="lg" className="bg-white text-[#850101] hover:bg-gray-100 font-semibold" asChild>
                <a href="#school-tools">
                Get Started
                </a>
              </Button>
            </div>
            <div className="relative">
              <img
                src="/ATS Posts/4.png"
                alt="Teachers and students in classroom"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* School Tools */}
      <section id="school-tools" className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">School Dashboard</h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed to make student registration and management seamless for educational
              institutions.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {schoolTools.map((tool, index) => (
              <Card key={index} className="hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg">
                <CardHeader className="text-center">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${tool.color}`}>
                    <tool.icon className="h-10 w-10" />
                  </div>
                  <CardTitle className="text-xl text-[#850101]">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-center">{tool.description}</p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-800">Key Features:</h4>
                    <ul className="space-y-1">
                      {tool.features.map((feature, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-[#850101]" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button asChild className="w-full bg-[#850101] hover:bg-[#650101]">
                    {tool.link.startsWith('/') || tool.link.startsWith('#') ? (
                      <a href={tool.link}>
                        {tool.title === 'School Admin Login' ? 'Log in' : 'Learn More'}
                      </a>
                    ) : (
                      <a href={tool.link} target="_blank" rel="noopener noreferrer">
                        Access Tool
                      </a>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk Registration Highlight */}
      <section id="bulk-registration" className="py-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Bulk Registration of Ei ATS Qualifiers by School</h2>
              <p className="text-base text-gray-600 mb-8">
                Schools can do bulk registration of the students that have qualified and save 10% of the total registration fee amount.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-[#850101] hover:bg-[#650101]" asChild>
                  <a href="/resources/bulk-registrations">
                    Learn More About Bulk Registration
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="border-[#850101] text-[#850101] hover:bg-[#850101] hover:text-white" asChild>
                  <a href="mailto:eitalentsearch@ei.study">
                    Contact Support
                  </a>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white p-8 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Eligibility Criteria</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <div className="font-semibold text-blue-900">Schools with 100+ Qualifiers</div>
                    <div className="text-sm text-gray-600">Minimum 25% bulk registration required</div>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <div className="font-semibold text-green-900">Schools with &lt;100 Qualifiers</div>
                    <div className="text-sm text-gray-600">Minimum 50% bulk registration required</div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">
                    <strong>Contact:</strong> eitalentsearch@ei.study
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Non ASSET Schools Section */}
      <section id="non-asset-schools" className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Non ASSET Schools</h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Non ASSET Schools can register their students through nominating their students by sending their student details on mail. This mail should be sent from school.
            </p>
            <div className="mt-6 bg-orange-100 border border-orange-300 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-orange-800 font-semibold">
                <Users className="inline h-5 w-5 mr-2" />
                Schools can nominate up to top 15% students that school believes as high academically talented students
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white shadow-xl border-t-4 border-t-[#850101]">
              <CardHeader className="text-center bg-gradient-to-r from-[#850101] to-red-700 text-white rounded-t-lg">
                <CardTitle className="text-2xl font-bold flex items-center justify-center">
                  <Mail className="mr-3 h-6 w-6" />
                  Student Nomination Process
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#850101] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-xl font-bold">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Prepare Student Details</h3>
                    <p className="text-gray-600">Compile comprehensive information for each nominated student</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#850101] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-xl font-bold">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Send from School Email</h3>
                    <p className="text-gray-600">Email must be sent from official school email address</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#850101] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-xl font-bold">3</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Await Confirmation</h3>
                    <p className="text-gray-600">Receive confirmation and further instructions</p>
                  </div>
                </div>

                {/* Download Registration Form */}
                <div className="bg-green-50 border border-green-300 rounded-lg p-6 mb-6 text-center">
                  <h4 className="text-lg font-semibold text-green-900 mb-4 flex items-center justify-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Ei ATS Registration Form for Non&nbsp;ASSET Schools
                  </h4>
                  <p className="text-sm text-gray-700 mb-4 max-w-xl mx-auto">
                    Download the registration form, fill in the required student and school details, and email the completed sheet from your official school email address to
                    <span className="font-semibold mx-1">eitalentsearch@ei.study</span>.
                  </p>
                  <a
                    href="/ATS%20Registration%20Form%20for%20non%20ASSET%20schools-2025.xlsx"
                    download
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#850101] text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <Download className="h-5 w-5" />
                    Download Form
                  </a>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
                  <div className="flex items-center mb-2">
                    <Info className="h-6 w-6 text-blue-500 mr-2" />
                    <h4 className="text-lg font-semibold text-blue-900">Contact Email</h4>
                  </div>
                  <p className="text-blue-800 text-lg font-mono">eitalentsearch@ei.study</p>
                </div>

                <div className="text-center">
                  <Button 
                    size="lg"
                    className="bg-[#850101] hover:bg-red-700 text-white px-8 py-3"
                    asChild
                  >
                    <a href="mailto:eitalentsearch@ei.study">
                      <Mail className="mr-2 h-5 w-5" />
                      Send Student Details
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="why-partner-ats" className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/schools.png"
                alt="School success celebration"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Partner with Ei ATS?</h2>
              <p className="text-base text-gray-600 mb-8">
                Join hundreds of schools worldwide in identifying and nurturing academically gifted students.
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
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="school-cta" className="pt-24 pb-12 bg-[#850101] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <School className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Ready to Get Your School Involved?</h2>
          <p className="text-base text-gray-200 mb-8">
            Join the Ei ATS community and help your students unlock their academic potential
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#850101] hover:bg-gray-100 font-semibold" asChild>
              <a href="/for-schools/login">
                School Admin Portal
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-[#850101] font-semibold" asChild>
              <a href="/contact">
              Contact Us
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
