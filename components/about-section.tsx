import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, Clock, Globe } from "lucide-react"

export function AboutSection() {
  const stats = [
    {
      icon: Globe,
      number: "25000+",
      label: "Gifted students",
      description: "Identified through Ei ATS",
    },
    {
      icon: Users,
      number: "1000+",
      label: "Alumni",
      description: "From 100+ schools globally",
    },
    {
      icon: BookOpen,
      number: "100+",
      label: "Courses",
      description: "Delivered since inception",
    },
    {
      icon: Clock,
      number: "15+",
      label: "Years",
      description: "Of excellence in talent identification",
    },
  ]

  return (
    <section id="about" className="py-10 bg-white border-b border-[#850101]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 text-hover-glow">
            About Ei ASSET Talent Search
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Ei ASSET Talent Search (Ei ATS) is a scientifically designed assessment that identifies academically gifted
            students from Grades 4 to 8 by testing concepts two levels above their current grade. It helps students
            realise their true potential and connects them with global enrichment opportunities. Top performers get
            access to prestigious programmes offered by institutions like Northwestern, Johns Hopkins, and UC Berkeley.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center border-0 shadow-professional hover:shadow-professional-xl card-hover group transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#850101] rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-500 group-hover:scale-110 group-hover:bg-[#650101] group-hover:shadow-lg icon-hover-bounce">
                  <stat.icon className="h-8 w-8 text-white transition-transform duration-300 group-hover:rotate-12" />
                </div>
                <h3 className="text-3xl font-bold text-[#850101] mb-2 transition-all duration-300 group-hover:scale-110 text-hover-glow">
                  {stat.number}
                </h3>
                <h4 className="text-lg font-semibold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-[#850101]">
                  {stat.label}
                </h4>
                <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Eligibility Note - Below Cards */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 mt-12 max-w-5xl mx-auto shadow-lg">
          <h3 className="text-2xl font-bold text-[#850101] mb-6 text-center">
            Who Can Take the Ei ASSET Talent Search Test?
          </h3>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Eligible Students:</h4>
            <p className="text-gray-700 leading-relaxed">
              Students from <strong>Grades 4 to 8</strong> who have achieved either:
            </p>
            <ul className="mt-2 ml-6 space-y-1 text-gray-700">
              <li>• <strong>Top 15 percentile</strong> in the <strong>Ei ASSET</strong> test, OR</li>
              <li>• <strong>Stanine 9</strong> in CAT4</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg p-6 border border-gray-300">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              If your child's school doesn't offer <strong>Ei ASSET</strong>, you have two options:
            </h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h5 className="font-semibold text-[#850101] mb-2">Option 1: Take <strong>Ei ASSET</strong> Online</h5>
                <p className="text-sm text-gray-600 mb-3">
                  Take the <strong>Ei ASSET</strong> test online to qualify for Ei ATS
                </p>
                <a
                  href="/for-parents#non-asset-students"
                  className="inline-flex items-center px-4 py-2 bg-[#850101] text-white rounded-lg hover:bg-[#650101] transition-colors duration-300 font-medium text-sm w-full justify-center"
                >
                  Take Ei ASSET Online Test
                </a>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h5 className="font-semibold text-[#850101] mb-2">Option 2: School Nomination</h5>
                <p className="text-sm text-gray-600 mb-3">
                  Ask your school to nominate your child for Ei ATS
                </p>
                <a
                  href="/for-schools#non-asset-schools"
                  className="inline-flex items-center px-4 py-2 bg-[#850101] text-white rounded-lg hover:bg-[#650101] transition-colors duration-300 font-medium text-sm w-full justify-center"
                >
                  School Nomination Process
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
