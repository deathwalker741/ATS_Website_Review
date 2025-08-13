"use client"

import React, { useState } from "react"
import { toast } from "@/hooks/use-toast"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function ScheduleCallPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      school: formData.get('school') as string,
      grade: formData.get('grade') as string,
      message: formData.get('message') as string,
    }

    try {
      const res = await fetch('/api/schedule-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Request failed')
      toast({ title: 'Details submitted', description: 'We will contact you shortly.' })
      setSubmitted(true)
    } catch (err) {
      toast({ title: 'Submission failed', description: 'Please try again later.', variant: 'destructive' })
      console.error(err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center pt-16 px-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-professional p-8 md:p-10">
        {submitted ? (
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-[#850101]">Thank You!</h1>
            <p className="text-gray-700">Your request has been received. Our team will reach out soon to schedule your call with an Ei ATS alumni.</p>
            <Button className="bg-[#850101] hover:bg-[#650101] text-white" asChild>
              <a href="/">Return to Home</a>
            </Button>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-6 text-center text-[#850101]">Schedule a Call with Our Alumni</h1>
            <p className="text-gray-600 text-center mb-8">Fill out the form below and we will connect you with an Ei ASSET Talent Search alumni to answer your questions and share their experience.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Student Name</label>
                <Input id="name" name="name" placeholder="Your full name" required />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <Input id="email" type="email" name="email" placeholder="you@example.com" required />
              </div>

              <div>
                <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-2">School Name</label>
                <Input id="school" name="school" placeholder="Your school" />
              </div>

              <div>
                <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">Grade / Class</label>
                <Input id="grade" name="grade" placeholder="e.g., Grade 6" />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Questions / Topics</label>
                <Textarea id="message" name="message" rows={4} placeholder="What would you like to discuss?" />
              </div>

              <Button type="submit" className="w-full bg-[#850101] hover:bg-[#650101] text-white">Request Call</Button>
            </form>
          </>
        )}
      </div>
    </div>
  )
} 