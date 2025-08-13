import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-10 bg-[#850101] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-base text-gray-200 max-w-3xl mx-auto">
            Have questions about the Ei ATS program? Our team is here to help you navigate your child's academic journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Mail className="h-8 w-8 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-sm">eitalentsearch@ei.study</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Phone className="h-8 w-8 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-sm">+91 80 4718 7451</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <Clock className="h-8 w-8 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Hours</h3>
              <p className="text-sm">Mon-Sat, 9AM-6PM</p>
            </CardContent>
          </Card>

          <Card className="bg-white/10 border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <MapPin className="h-8 w-8 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-sm">Bengaluru, India</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
            Join thousands of families who have discovered their child's academic potential through Ei ATS. Register today
            and take the first step towards unlocking exceptional educational opportunities.
          </p>
          <Button size="lg" className="bg-white text-[#850101] hover:bg-gray-100 font-semibold" asChild>
            <a href="https://ats.ei.study/ats_registration.php" target="_blank" rel="noopener noreferrer">
              Register Now
            </a>
          </Button>
        </div>

        <div className="mt-16 pt-8 border-t border-white/20 text-center text-sm text-gray-300">
          <p>Educational Initiatives Pvt Ltd</p>
          <p>The CUBE - Karle Town Center, Bengaluru, India</p>
          <p>CIN: U80211GJ2000PTC038692103</p>
        </div>
      </div>
    </section>
  )
}
