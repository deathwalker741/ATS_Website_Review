import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Mail } from "lucide-react"

const partners = [
  {
    id: "johns-hopkins",
    name: "Johns Hopkins Center for Talented Youth (CTY)",
    description:
      "Johns Hopkins Center for Talented Youth (CTY) has been the global leader in gifted education since 1979. CTY offers accredited, advanced online and on-campus courses that go far beyond typical school curricula, personalized instruction, and an inclusive peer community for exceptional learners in grades 2-12. Whether students want to accelerate, deep-dive into a passion subject, or simply find peers who love learning, CTY provides a transformational academic experience.",
    eligibility: "98th percentile in English (Humanities & Writing tracks) or Math (Math & Science tracks)",
    applicationProcess: "Submit Ei ATS scores (≥ 98th percentile), complete CTY application, upload transcripts/recommendations",
    website: "https://cty.jhu.edu/",
    image: "/John-Hopkins-CTY.png",
    grades: "Grades 2-12",
    features: [],
    contact: "ctyinfo@jhu.edu",
  },
  {
    id: "northwestern",
    name: "Northwestern University – Center for Talent Development (CTD)",
    description:
      "Northwestern University is a top-10 U.S. research university with nearly 140 research centers. Its Center for Talent Development (CTD) has, for four decades, helped academically advanced students (age 3 – grade 12) realise their full potential through a continuum of enrichment and accelerated, credit-bearing programs. Options include residential summer courses on Northwestern’s Evanston, Illinois campus and year-round online courses ranging from one-day enrichment to 34-week AP sequences.",
    eligibility:
      "≥ 90th percentile — Indigo Tier (Test-score applicant)  •  < 90th percentile — Indigo Tier via Admission Portfolio (Ei ATS scores + transcript + teacher recommendation)",
    applicationProcess:
      "1) Submit Ei ATS percentile scores  2) Complete CTD online application  3) Upload transcript & teacher recommendation  4) For portfolio route, include résumé/awards",
    website: "https://www.ctd.northwestern.edu/",
    image: "/Northwestern CTD.png",
    grades: "Grades 4-12 (varies by programme)",
    features: [],
    contact: "s-corwith@northwestern.edu",
  },
  {
    id: "uc-berkeley",
    name: "UC Berkeley Academic Talent Development Program (ATDP)",
    description:
      "Established in 1868, UC Berkeley is the flagship public-research university of the University of California system and consistently ranked the world’s No.1 public university. ATDP, administered by Berkeley’s Graduate School of Education since 1982, offers a four-week residential Global Program that combines rigorous college-level courses with community service, outreach projects, college counselling, and weekend excursions across the San Francisco Bay Area. Students’ attendance records become part of their official UC application history.",
    eligibility:
      "80th percentile — Priority Acceptance  •  50-79th percentile — Provisionally qualified (portfolio review).  Applicants must be entering Grades 7-10.",
    applicationProcess:
      "1) Submit Ei ATS percentile scores  2) Complete ATDP online application  3) Upload transcripts & résumé  4) For provisional applicants, add admission-portfolio documents",
    website: "https://atdp.berkeley.edu/",
    image: "/UC Berkeley ATDP.png",
    grades: "Grades 7-10",
    features: [],
    contact: "BerkeleyATDP@cfmedu.com",
  },
  {
    id: "purdue",
    name: "Purdue University – Gifted Education Research & Resource Institute (GER2I)",
    description:
      "GER2I’s Comet, Star, and Pulsar camps provide age-tailored residential programmes blending advanced STEM / humanities classes with creative activities and social-emotional growth sessions for gifted students in grades 5-12.",
    eligibility: "Ei ATS ≥ 90th percentile – direct  |  50-89th percentile – portfolio review",
    applicationProcess: "Ei ATS scores, GER2I application, academic portfolio submission",
    website: "https://www.education.purdue.edu/geri/",
    image: "/Purdue GERI.png",
    grades: "Grades 5-12",
    features: [],
    contact: "geri@purdue.edu",
  },
  {
    id: "sig",
    name: "Summer Institute for the Gifted (SIG)",
    description:
      "SIG combines challenging academics with social and recreational activities at prestigious partner institutions, giving gifted students (ages 5-17) a transformative experience that nurtures intellectual passion and personal growth.",
    eligibility: "Ei ATS ≥ 90th percentile (or equivalent standardised-test score)",
    applicationProcess: "Ei ATS scores, SIG application, health & recommendation forms",
    website: "https://www.giftedstudy.org/",
    image: "/sig.jpg",
    grades: "Ages 5-17",
    features: [],
    contact: "info@giftedstudy.org",
  },
  {
    id: "genwise",
    name: "GENWISE Residential & Online Gifted Programme",
    description:
      "Focused on skill-building in emerging talent areas, GENWISE offers residential and online courses covering computational thinking, math through puzzles, and science investigations – all designed to foster higher-level thinking and problem-solving skills.",
    eligibility: "Ei ATS qualification with strong Math/Science performance (Grades 6-10)",
    applicationProcess: "1) Submit Ei ATS scores  2) Complete GenWise application  3) Aptitude assessment interview",
    website: "https://www.genwise.in/",
    image: "/genwise.png",
    grades: "Grades 6-10",
    features: [],
    contact: "info@genwise.in",
  },
]

export default function ProgrammesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section id="hero" className="bg-gradient-to-br from-[#850101] to-[#650101] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">University Partners</h1>
          <p className="text-base md:text-lg text-gray-100 max-w-3xl mx-auto">
            Access world-class educational opportunities through our prestigious university partnerships. Each program
            is designed to challenge and nurture academically gifted students.
          </p>
          <div className="bg-amber-100 border-l-4 border-amber-500 p-4 max-w-4xl mx-auto mt-6 rounded-r-lg">
            <p className="text-sm text-amber-900 font-medium">
              <span className="font-bold">Important Note:</span> Applicants to gifted programmes must directly contact the relevant university/organization and submit their ATS scores during application. The ASSET Talent Search team does not provide application assistance.
            </p>
          </div>
        </div>
      </section>

      {/* Partners Grid */}
      <section id="programmes" className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {partners.map((partner, index) => (
              <Card
                key={index}
                id={partner.id}
                className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300"
              >
                <CardHeader>
                  <img
                    src={partner.image || "/placeholder.svg"}
                    alt={partner.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <CardTitle className="text-xl text-[#850101]">{partner.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-1 space-y-4 justify-between">
                  <p className="text-gray-600">{partner.description}</p>
                  {/* Feature bullets removed */}

                  <div className="mt-auto space-y-2">
                    {partner.contact && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="h-4 w-4 text-[#850101]" />
                        <a href={`mailto:${partner.contact}`} className="underline">{partner.contact}</a>
                      </div>
                    )}

                    <div className="flex gap-2 flex-col sm:flex-row">
                      {partner.id !== 'genwise' && (
                        <Button
                          variant="outline"
                          className="flex-1 border-[#850101] text-[#850101] hover:bg-[#850101] hover:text-white"
                          asChild
                        >
                          <a
                            href={
                              partner.id === "sig"
                                ? "/programmes/sig"
                                : partner.id === "johns-hopkins"
                                  ? "/programmes/cty"
                                  : partner.id === "northwestern"
                                    ? "/programmes/northwestern"
                                    : partner.id === "uc-berkeley"
                                      ? "/programmes/uc-berkeley"
                                      : partner.id === "purdue"
                                        ? "/programmes/purdue"
                                        : `#${partner.id}-details`
                            }
                          >
                            Learn More
                          </a>
                        </Button>
                      )}
                      <Button className="bg-[#850101] hover:bg-[#650101] flex-1" asChild>
                        <a href={partner.website} target="_blank" rel="noopener noreferrer">
                          Apply Now <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="programmes-cta" className="py-8 bg-[#850101] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Access These Programs?</h2>
          <p className="text-base text-gray-200 mb-8">
            Register for Ei ATS 2025 and unlock opportunities at world's leading partner programs
          </p>
          <Button size="lg" className="bg-white text-[#850101] hover:bg-gray-100 font-semibold" asChild>
            <a href="https://ats.ei.study/ats_registration.php" target="_blank" rel="noopener noreferrer">
              Register for Ei ATS 2025
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}
