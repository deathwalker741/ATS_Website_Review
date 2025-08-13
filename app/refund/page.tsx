"use client"

import { useRegion } from "@/components/region-context"
import { REGIONAL_DATES } from "@/lib/dates"

export default function RefundPage() {
  const { region } = useRegion()
  const dates = REGIONAL_DATES[region]
  const isInternational = region === "INT"
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Refund Policy</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-[#850101] mb-6">Ei ASSET Talent Search Refund Policy</h2>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              This refund policy outlines the terms and conditions for refunds related to the Ei ASSET Talent Search competition.
            </p>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Registration Fee</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>The registration fee is {isInternational ? "AED 170-300" : "INR 1700-3300"} ({isInternational ? "United Arab Emirates Dirham" : "Indian Rupees"}).</li>
              <li>Fees for participants from other countries will be adjusted based on the equivalent of {isInternational ? "AED 170-300" : "INR 1700-3300"} according to the conversion rate of their respective currencies.</li>
            </ul>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Refund Eligibility</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Refunds are only available for technical glitches or issues caused by Educational Initiatives.</li>
              <li>Refunds are not available for participant cancellations or no-shows.</li>
              <li>Refunds are not available for connectivity issues on the participant's end.</li>
            </ul>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Refund Process</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>To request a refund, contact {isInternational ? "atsinternational@ei.study" : "eitalentsearch@ei.study"} within 7 days of the issue.</li>
              <li>Include your registration details and a description of the technical issue.</li>
              <li>Refund requests will be reviewed within 14 days.</li>
              <li>Approved refunds will be processed to the original payment method.</li>
            </ul>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Processing Time</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Refund processing may take 5-10 business days.</li>
              <li>Processing times may vary based on your bank or payment provider.</li>
              <li>No processing fees will be charged for approved refunds.</li>
            </ul>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Currency & Exchange</h3>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Refunds will be processed in {isInternational ? "AED" : "INR"}.</li>
              <li>Exchange rate variations may affect the final refund amount.</li>
              <li>Currency conversion fees may apply based on your payment method.</li>
            </ul>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
            <p className="text-gray-700 mb-6">
              For refund inquiries, contact us at: <strong>{isInternational ? "atsinternational@ei.study" : "eitalentsearch@ei.study"}</strong>
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