"use client"

import type React from "react"

import { useState } from "react"
import { toast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Send } from "lucide-react"
import { useRegion } from "@/components/region-context"
import { REGIONAL_DATES } from "@/lib/dates"

export default function ContactPage() {
  const { region } = useRegion()
  const dates = REGIONAL_DATES[region]
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }),
      })
      if (!res.ok) throw new Error('Request failed')
      toast({ title: 'Message sent', description: 'We will get back to you soon.' })
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      console.error(err)
      toast({ title: 'Submission failed', description: 'Please try again later.', variant: 'destructive' })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Contact info grid removed; details now live exclusively in the global footer.

  const faqs = [
    {
      question: "When is the registration deadline?",
      answer: `Registration deadlines for ATS 2025 are: Early Bird – ${dates.early}, Regular – ${dates.regular}, and Late – ${dates.late}.`,
    },
    {
      question: "What is the exam format?",
      answer: "Online computer-based test with English, Math, and Science (60 minutes each).",
    },
    {
      question: "Who is eligible for ATS?",
      answer: "Students in grades 4-8 who scored in the top 15th percentile in any subject.",
    },
    {
      question: "How can I access my results?",
      answer: "Results are available through the student portal using your PAN ID.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#850101] to-[#650101] text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
          <p className="text-base text-gray-100 max-w-3xl mx-auto">
            Have questions about ATS 2025? We're here to help you navigate your academic journey. Reach out to our
            expert team for guidance and support.
          </p>
        </div>
      </section>

      {/* Contact Information grid removed to consolidate details into the footer */}

      {/* Contact Form and FAQ */}
      <section id="send-message" className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  {submitted ? (
                    <div className="text-center space-y-4">
                      <h3 className="text-2xl font-bold text-[#850101]">Thank You!</h3>
                      <p className="text-gray-700">Your message has been received. Our team will respond shortly.</p>
                      <Button className="bg-[#850101] hover:bg-[#650101] text-white" onClick={() => setSubmitted(false)}>
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="border-gray-300 focus:border-[#850101] focus:ring-[#850101]"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="border-gray-300 focus:border-[#850101] focus:ring-[#850101]"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="border-gray-300 focus:border-[#850101] focus:ring-[#850101]"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="border-gray-300 focus:border-[#850101] focus:ring-[#850101]"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="border-gray-300 focus:border-[#850101] focus:ring-[#850101]"
                        placeholder="Please describe your question or concern in detail..."
                      />
                    </div>

                    <Button type="submit" className="w-full bg-[#850101] hover:bg-[#650101] text-white">
                      Send Message <Send className="h-4 w-4 ml-2" />
                    </Button>
                  </form>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <div id="faq">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <Card key={index} className="border border-gray-200">
                    <CardHeader>
                      <CardTitle className="text-lg text-[#850101]">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="mt-8 bg-[#850101] text-white border-0">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-bold mb-4">Need Immediate Help?</h3>
                  <p className="mb-6">Call us directly during business hours for immediate assistance</p>
                  <Button className="bg-white text-[#850101] hover:bg-gray-100">
                    <Phone className="h-4 w-4 mr-2" />
                    +91 80 4718 7451
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Information */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Office</h2>
            <p className="text-base text-gray-600">Educational Initiatives Pvt Ltd</p>
          </div>

          <Card className="max-w-4xl mx-auto border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-xl font-bold text-[#850101] mb-4">Office Details</h3>
                  <div className="space-y-3">
                    <p className="text-gray-700">
                      <strong>Address:</strong> The CUBE - Karle Town Center, Bengaluru, India
                    </p>
                    <p className="text-gray-700">
                      <strong>CIN:</strong> U80211GJ2000PTC038692103
                    </p>
                    <p className="text-gray-700">
                      <strong>Email:</strong> eitalentsearch@ei.study
                    </p>
                    <p className="text-gray-700">
                      <strong>Phone:</strong> +91 80 4718 7451
                    </p>
                    <p className="text-gray-700">
                      <strong>Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM IST
                    </p>
                  </div>
                </div>
                <div>
                  <img
                    src="/ei-image.png"
                    alt="Educational Initiatives Office"
                    className="rounded-lg shadow-md w-full"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 bg-[#850101] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Begin Your Ei ATS Journey?</h2>
          <p className="text-base text-gray-200 mb-8">
            Don't wait! Register for Ei ATS 2025 and unlock your academic potential
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
