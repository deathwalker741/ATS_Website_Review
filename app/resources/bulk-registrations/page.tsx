'use client'

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  Download, 
  Mail, 
  Users, 
  Calculator, 
  FileSpreadsheet, 
  CheckCircle2,
  ArrowRight,
  Percent,
  Building2,
  GraduationCap
} from "lucide-react"

export default function BulkRegistrationsPage() {
  const handleDownload = () => {
    // Create a link element and trigger download
    const link = document.createElement('a')
    link.href = '/ATS bulk registration form for schools-2025.xlsx'
    link.download = 'ATS bulk registration form for schools-2025.xlsx'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#850101] to-[#650101] text-white py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Building2 className="h-12 w-12 mr-4" />
              <h1 className="text-4xl font-bold">
                Bulk Registrations for Ei ATS
              </h1>
            </div>
            <p className="text-base text-gray-200 mb-8">
              Streamline your student registrations and save costs with our bulk registration program
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleDownload}
                size="lg" 
                className="bg-white text-[#850101] hover:bg-gray-100 font-semibold"
              >
                <Download className="mr-2 h-5 w-5" />
                Download Excel Template
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white bg-transparent text-white hover:bg-white hover:text-[#850101]"
                asChild
              >
                <a href="mailto:eitalentsearch@ei.study">
                  <Mail className="mr-2 h-5 w-5" />
                  Contact Us
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Overview Card */}
            <Card className="mb-12 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-[#850101] flex items-center justify-center">
                  <Users className="mr-3 h-8 w-8" />
                  Bulk Registration Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 text-center mb-6">
                  Schools can do bulk registration of the students that have qualified and save 10% of the total registration fee amount. 
                  The below criteria and steps will help understanding this process better.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-blue-900 mb-3 flex items-center">
                      <Mail className="mr-2 h-5 w-5" />
                      Contact Email
                    </h3>
                    <p className="text-blue-800 font-medium">
                      eitalentsearch@ei.study
                    </p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold text-green-900 mb-3 flex items-center">
                      <Percent className="mr-2 h-5 w-5" />
                      Cost Savings
                    </h3>
                    <p className="text-green-800 font-medium">
                      Save 10% on total registration fee amount
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits Section */}
            <Card className="mb-12 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#850101] flex items-center">
                  <CheckCircle2 className="mr-3 h-6 w-6" />
                  Benefits of Bulk Registrations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Percent className="h-8 w-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Cost Savings</h3>
                    <p className="text-green-700">
                      Enjoy a 10% discount on the total registration amount when registering students in bulk.
                    </p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                    <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileSpreadsheet className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-blue-800 mb-2">Streamlined Process</h3>
                    <p className="text-blue-700">
                      Use our standardized Excel template for easy data entry and submission.
                    </p>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg">
                    <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-purple-800 mb-2">Efficient Management</h3>
                    <p className="text-purple-700">
                      Manage multiple student registrations efficiently with our bulk processing system.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Eligibility Criteria */}
            <Card className="mb-12 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#850101] flex items-center">
                  <Calculator className="mr-3 h-6 w-6" />
                  Eligibility Criteria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="border-l-4 border-blue-500 pl-6">
                    <h3 className="text-xl font-semibold text-blue-900 mb-3 flex items-center">
                      <GraduationCap className="mr-2 h-5 w-5" />
                      Schools with 100+ Qualifiers
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Must register at least <strong>25% or more</strong> of total qualifiers through bulk registration.
                    </p>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      Minimum 25% bulk registration required
                    </Badge>
                  </div>
                  <div className="border-l-4 border-green-500 pl-6">
                    <h3 className="text-xl font-semibold text-green-900 mb-3 flex items-center">
                      <Building2 className="mr-2 h-5 w-5" />
                      Schools with Less than 100 Qualifiers
                    </h3>
                    <p className="text-gray-700 mb-4">
                      Must register at least <strong>50% or more</strong> of total qualifiers through bulk registration.
                    </p>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Minimum 50% bulk registration required
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* How to Apply */}
            <Card className="mb-12 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#850101]">
                  How to Apply for Bulk Registration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#850101] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Download the Excel Template</h3>
                      <p className="text-gray-700 mb-3">
                        Download our standardized Excel file "Ei ATS bulk registration form for schools-2025" which contains the required format and fields.
                      </p>
                      <Button onClick={handleDownload} variant="outline" className="border-[#850101] text-[#850101] hover:bg-[#850101] hover:text-white">
                        <Download className="mr-2 h-4 w-4" />
                        Download Template
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start space-x-4">
                    <div className="bg-[#850101] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Fill Required Details</h3>
                      <p className="text-gray-700">
                        Complete all mandatory fields in the Excel form with accurate student information including names, 
                        contact details, and other required particulars.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start space-x-4">
                    <div className="bg-[#850101] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                      3
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Payment</h3>
                      <p className="text-gray-700">
                        Make the payment to the Ei account details provided in the Excel file. 
                        Ensure to include the payment reference for tracking purposes.
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-start space-x-4">
                    <div className="bg-[#850101] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-1">
                      4
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit Documents</h3>
                      <p className="text-gray-700 mb-3">
                        Email the completed Excel file along with the payment confirmation to our dedicated email address.
                      </p>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-700 font-medium">
                          <Mail className="inline mr-2 h-4 w-4" />
                          Email: <span className="text-[#850101] font-semibold">eitalentsearch@ei.study</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#850101] flex items-center">
                  <Mail className="mr-3 h-6 w-6" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-lg text-gray-700 mb-6">
                    For any questions or assistance with bulk registrations, please don't hesitate to contact us.
                  </p>
                  <div className="bg-gradient-to-r from-[#850101] to-[#650101] text-white p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
                    <p className="text-lg mb-4">
                      <strong>Email:</strong> eitalentsearch@ei.study
                    </p>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-white bg-transparent text-white hover:bg-white hover:text-[#850101]"
                      asChild
                    >
                      <a href="mailto:eitalentsearch@ei.study">
                        <Mail className="mr-2 h-5 w-5" />
                        Send Email
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>
    </div>
  )
}
