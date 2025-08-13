"use client"

import { useRegion } from "@/components/region-context"
import { REGIONAL_DATES } from "@/lib/dates"

export default function TermsPage() {
  const { region } = useRegion()
  const dates = REGIONAL_DATES[region]
  const isInternational = region === "INT"
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms & Conditions</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#850101] mb-6">Ei ASSET Talent Search Terms & Conditions</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              These terms and conditions govern your use of the Ei ASSET Talent Search website and participation in the competition.
            </p>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Registration & Payment</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>To participate in the Ei ATS competition, you must register on the Site and pay the registration fee, which is {isInternational ? "AED 170-300" : "INR 1700-3300"} ({isInternational ? "United Arab Emirates Dirhams" : "Indian Rupees"}) or an equivalent amount as per your country's currency.</li>
              <li>Payment must be made through the designated payment gateway.</li>
              <li>Registration is not complete until payment is confirmed.</li>
            </ul>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Eligibility</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Students in grades 3-10 are eligible to participate.</li>
              <li>Participants must meet the academic requirements specified by Educational Initiatives.</li>
              <li>Schools and institutions must be registered with Educational Initiatives.</li>
            </ul>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">User Conduct</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Users must provide accurate and complete information during registration.</li>
              <li>Any form of cheating or misconduct will result in immediate disqualification.</li>
              <li>Users must respect the intellectual property rights of Educational Initiatives.</li>
            </ul>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Intellectual Property</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>All content on this website belongs to Educational Initiatives.</li>
              <li>Users may not reproduce, distribute, or modify any content without permission.</li>
              <li>Test questions and materials are confidential and protected by copyright.</li>
            </ul>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Liability</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Educational Initiatives is not liable for any technical issues during the test.</li>
              <li>We are not responsible for any loss of data or connectivity issues.</li>
              <li>Our liability is limited to the amount paid as registration fee.</li>
            </ul>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
            <p className="text-gray-700 mb-4">
              For questions about these terms, contact us at: <strong>competition@ei.study</strong>
            </p>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Governing Law</h3>
            <p className="text-gray-700 mb-6">
              These terms are governed by the laws of India, with jurisdiction in Ahmedabad.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-sm text-gray-600">
                <strong>Last updated:</strong> January 2025<br/>
                <strong>Version:</strong> 1.0
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 