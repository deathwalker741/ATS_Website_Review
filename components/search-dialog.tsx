"use client"

import React, { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ExternalLink, FileText, Users, School, Globe, Award, Calendar, BookOpen, Video, Download, Mail, Phone, MapPin, Clock } from "lucide-react"
import { useRegion } from "@/components/region-context"
import { REGIONAL_DATES } from "@/lib/dates"

interface SearchResult {
  title: string
  description: string
  url: string
  type: "page" | "section" | "content" | "resource" | "partner" | "feature"
  category?: string
}

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const { region } = useRegion()
  const dates = REGIONAL_DATES[region]

  // Search results data
  const searchData: SearchResult[] = [
    // Main Content
    {
      title: "Ei ASSET Talent Search 2025",
      description: "Find out by enrolling your child for the Ei ASSET Talent Search 2025",
      url: "/",
      type: "content",
    },
    {
      title: "Registration",
      description: "Registration for Ei ASSET Talent Search 2025",
      url: "https://ats.ei.study/ats_registration.php",
      type: "content",
    },
    {
      title: "Eligibility",
      description: "Students in grades 4-8 who scored in the top 15th percentile in any subject",
      url: "/#about",
      type: "content",
    },
    {
      title: "Test Format",
      description: "Online computer-based test with English, Math, and Science (60 minutes each)",
      url: "/#exam-info",
      type: "content",
    },
    {
      title: "Test Window",
      description: `Test window for Ei ASSET Talent Search 2025: ${dates.testWindow}`,
      url: "/#exam-info",
      type: "content",
      category: "Exam",
    },
    {
      title: "Early Bird Registration",
      description: `Early bird registration deadline: ${dates.early}`,
      url: "/#exam-info",
      type: "content",
      category: "Registration",
    },
    {
      title: "Regular Registration",
      description: `Regular registration deadline: ${dates.regular}`,
      url: "/#exam-info",
      type: "content",
      category: "Registration",
    },
    {
      title: "Late Registration",
      description: `Late registration deadline: ${dates.late}`,
      url: "/#exam-info",
      type: "content",
      category: "Registration",
    },

    // Programmes
    {
      title: "Johns Hopkins Center for Talented Youth",
      description: "CTY - Programmes for grades 2-12 with online and campus-based courses",
      url: "/programmes#johns-hopkins",
      type: "partner",
    },
    {
      title: "UC Berkeley ATDP",
      description: "Academic Talent Development Programme - Summer residential and online programmes",
      url: "/programmes#uc-berkeley",
      type: "partner",
    },
    {
      title: "Northwestern CTD",
      description: "Center for Talent Development - Programmes for children age 3-12",
      url: "/programmes#northwestern",
      type: "partner",
    },
    {
      title: "Purdue GER2I",
      description: "Programmes for grades 5-12 with STEM focus",
      url: "/programmes#purdue",
      type: "partner",
    },
    {
      title: "SIG",
      description: "SIG - 2-3 week residential programmes at prestigious partner institutions",
      url: "/programmes#sig",
      type: "partner",
    },
    {
      title: "Summer Institute for the Gifted",
      description: "Intensive residential programmes for ages 5-17",
      url: "/programmes#sig",
      type: "partner",
    },
    {
      title: "GENWISE Programme",
      description: "Higher-order skill development programme",
      url: "/programmes#genwise",
      type: "partner",
    },
    {
      title: "GenWise",
      description: "Higher-order skill development programme",
      url: "/programmes#genwise",
      type: "partner",
    },

    // Rewards
    {
      title: "Participation Certificate",
      description: "Certificate for all participants in Ei ASSET Talent Search",
      url: "/#rewards",
      type: "content",
    },
    {
      title: "Bronze Scholar",
      description: "85-89 Percentile - Medal + Certificate recognition",
      url: "/#rewards",
      type: "content",
    },
    {
      title: "Silver Scholar",
      description: "90-94 Percentile - Medal + Certificate recognition",
      url: "/#rewards",
      type: "content",
    },
    {
      title: "Gold Scholar",
      description: "95-99 Percentile - Medal + Certificate recognition",
      url: "/#rewards",
      type: "content",
    },

    // Resources
    {
      title: "Student Portal",
      description: "Access your personalized dashboard and test results",
      url: "/for-students#student-tools",
      type: "resource",
    },
    {
      title: "Ei ASSET PAN ID Retriever",
      description: "Retrieve your unique Ei ASSET PAN ID for Ei ATS registration.",
      url: "https://learn.lab-ei.study/asset/ATS/ASSET_PAN/asset_pan_gpt/forgot_asset_pan.html",
      type: "resource",
    },
    {
      title: "Download your Ei ATS Qualifying Certificate",
      description: "Download your official Ei ATS certificates.",
      url: "https://ats.ei.study/ats_qualifier_certificate.php",
      type: "resource",
    },
    {
      title: "Awards Recognition",
      description: "View winners list and achievement gallery",
      url: "/for-students#student-tools",
      type: "resource",
    },
    {
      title: "Bulk Registration Tool",
      description: "Register multiple students efficiently and save 10% on registration costs",
      url: "/for-schools#bulk-registration",
      type: "resource",
    },
    {
      title: "School Admin Login",
      description: "Secure login portal for school administrators",
      url: "/for-schools/login",
      type: "resource",
    },
    {
      title: "School Dashboard",
      description: "View registration statistics and year-over-year comparisons",
      url: "/for-schools/dashboard",
      type: "resource",
    },
    {
      title: "Student Management",
      description: "View and manage all registered students with detailed information",
      url: "/for-schools/students",
      type: "resource",
    },
    {
      title: "Results Qualifiers",
      description: "Download performance reports and qualification lists",
      url: "/for-schools#school-tools",
      type: "resource",
    },
    {
      title: "School Portal System",
      description: "Comprehensive school administration and student management system",
      url: "/for-schools/login",
      type: "resource",
    },
    {
      title: "Nominate Students",
      description: "Non-ASSET schools can nominate their top 15% performing students via email",
      url: "/for-schools#non-asset-schools",
      type: "resource",
    },
    {
      title: "Bulk Registration of Ei ATS Qualifiers",
      description: "Schools can do bulk registration of qualified students for Ei ATS and save 10% on registration fees",
      url: "/for-schools#bulk-registration",
      type: "section",
    },
    {
      title: "Non ASSET Schools",
      description: "Registration process for Non ASSET Schools through student nomination via email",
      url: "/for-schools#non-asset-schools",
      type: "section",
    },
    {
      title: "Bulk Registrations",
      description: "Comprehensive bulk registration system for schools with Excel template and 10% cost savings",
      url: "/resources/bulk-registrations",
      type: "page",
    },
    {
      title: "Bulk Registration Excel Template",
      description: "Download Excel template for bulk student registration with detailed instructions",
      url: "/resources/bulk-registrations",
      type: "resource",
    },
    {
      title: "School Bulk Registration Process",
      description: "4-step process for schools to register multiple students efficiently",
      url: "/resources/bulk-registrations",
      type: "content",
    },
    {
      title: "Student Nomination Email Process",
      description: "Email-based nomination process for Non ASSET Schools with required student details",
      url: "/for-schools#non-asset-schools",
      type: "content",
    },
    {
      title: "Top 15% Student Nomination",
      description: "Schools can nominate up to top 15% academically talented students",
      url: "/for-schools#non-asset-schools",
      type: "content",
    },

    // Resources Page Content
    {
      title: "Resources & Support",
      description: "Access comprehensive resources to help you prepare for Ei ATS 2025",
      url: "/resources",
      type: "page",
    },
    {
      title: "Test Details",
      description: "Everything you need to know about the Ei ASSET Talent Search test - comprehensive test information, dates, fees, and requirements",
      url: "/resources#test-details",
      type: "section",
    },
    {
      title: "Ei ATS Test Information",
      description: "Complete test details including eligibility, subjects, format, duration, dates and fees for both India and International",
      url: "/resources#test-details",
      type: "content",
    },
    {
      title: "Test Dates 2025",
      description: `Test window: ${dates.testWindow}`,
      url: "/resources#test-details",
      type: "content",
    },
    {
      title: "Test Fees",
      description: `${region === "INT" ? "International" : "India"}: ${region === "INT" ? "AED 170-300" : "INR 1700-3300"} per subject`,
      url: "/resources#test-details",
      type: "content",
    },
    {
      title: "Test Format",
      description: "Online proctored test, 60 minutes per subject (English, Maths, Science), no negative marking, two grades above current level",
      url: "/resources#test-details",
      type: "content",
    },
    {
      title: "Eligibility Criteria",
      description: "Students from Grades 4-8 who score in top 15 percentile in ASSET test or attain Stanine 9 in CAT4",
      url: "/resources#test-details",
      type: "content",
    },
    {
      title: "Recognition & Awards",
      description: "Bronze Scholar (85-89%), Silver Scholar (90-94%), Gold Scholar (95-99%) with certificates and medals",
      url: "/resources#test-details",
      type: "content",
    },
    {
      title: "Contact for Test Details",
      description: `eitalentsearch@ei.study (India) | atsinternational@ei.study (International)`,
      url: "/resources#test-details",
      type: "content",
    },
    {
      title: "Webinars",
      description: "Expert-led webinars covering exam preparation and university applications",
      url: "/resources#quick-access",
      type: "resource",
    },
    {
      title: "Blog",
      description: "Insightful articles about gifted education and success stories",
      url: "/resources#resources",
      type: "resource",
    },
    {
      title: "Sample Papers",
      description: "Official sample papers to understand exam format and difficulty",
      url: "/resources#quick-access",
      type: "resource",
    },
    {
      title: "AQAD",
      description: "Advanced Question Analysis Dashboard for performance analytics and learning insights",
      url: "/resources#quick-access",
      type: "resource",
    },
    {
      title: "AQAD Platform",
      description: "Access detailed performance analytics and personalized learning insights",
      url: "/resources#quick-access",
      type: "resource",
    },
    {
      title: "Advanced Question Analysis Dashboard",
      description: "Comprehensive analytics platform for performance tracking",
      url: "/resources#quick-access",
      type: "resource",
    },
    {
      title: "Brochure",
      description: "Comprehensive programme brochure with detailed information",
      url: "/resources#resources",
      type: "resource",
    },
    {
      title: "Ei ATS Brochure",
      description: "Comprehensive programme brochure with detailed information",
      url: "/resources#resources",
      type: "resource",
    },
    {
      title: "Programme Guide",
      description: "Download the comprehensive Ei ATS programme guide and information",
      url: "/resources#resources",
      type: "resource",
    },
    {
      title: "Articles & Research Papers",
      description: "Curated links to insightful articles and research studies on gifted education",
      url: "/resources/articles",
      type: "page",
    },

    // Contact Information
    {
      title: "eitalentsearch@ei.study",
      description: "Contact email for Ei ASSET Talent Search support",
      url: "/#contact",
      type: "content",
    },
    {
      title: "+91 80 4718 7451",
      description: "Phone number for immediate assistance",
      url: "/#contact",
      type: "content",
    },
    {
      title: "Mon-Sat 9AM-6PM",
      description: "Working hours for support team",
      url: "/#contact",
      type: "content",
    },
    {
      title: "Educational Initiatives",
      description: "Organization behind Ei ASSET Talent Search",
      url: "/#contact",
      type: "content",
    },
    {
      title: "Bengaluru India",
      description: "Office location of Educational Initiatives",
      url: "/#contact",
      type: "content",
    },
    {
      title: "Schedule a Call",
      description: "Schedule a call or send us a message through our contact form",
      url: "/contact#send-message",
      type: "content",
    },
    {
      title: "Send us a Message",
      description: "Contact form to send messages and schedule calls with our team",
      url: "/contact#send-message",
      type: "content",
    },

    // Additional searchable terms
    {
      title: "Gifted Students",
      description: "Programmes designed for academically gifted students",
      url: "/",
      type: "content",
    },
    {
      title: "Talent Search",
      description: "Comprehensive talent identification programme",
      url: "/",
      type: "content",
    },
    {
      title: "Academic Excellence",
      description: "Recognition and development of academic excellence",
      url: "/#rewards",
      type: "content",
    },
    {
      title: "University Partnerships",
      description: "Access to world-class university programmes",
      url: "/programmes",
      type: "content",
    },
    {
      title: "Online Exam",
      description: "Computer-based online examination system",
      url: "/#exam-info",
      type: "content",
    },
    {
      title: "Registration Process",
      description: "Complete registration process for Ei ATS 2025 exam",
      url: "/#exam-info",
      type: "content",
    },
    {
      title: "Top 2% Students",
      description: "Identifying the top 2% gifted students globally",
      url: "/",
      type: "content",
    },

    // Additional Features & Content
    {
      title: "For Students Image",
      description: "Visual representation of student success and celebration",
      url: "/for-students",
      type: "content",
    },
    {
      title: "Why Join Ei ATS",
      description: "Benefits of joining Ei ATS including university access and recognition",
      url: "/for-students#why-join-ats",
      type: "content",
    },
    {
      title: "Student Tools & Resources",
      description: "Comprehensive collection of tools for student success",
      url: "/for-students#student-tools",
      type: "section",
    },
    {
      title: "Video Testimonials",
      description: "Complete collection of student, parent, and school video testimonials",
      url: "/resources#testimonials",
      type: "section",
    },
    {
      title: "Testimonials Gallery",
      description: "Watch real success stories from our Ei ATS community",
      url: "/resources#testimonials",
      type: "section",
    },
    {
      title: "Student Success Videos",
      description: "Real success stories from our Ei ATS participants and their achievements",
      url: "/resources#testimonials",
      type: "content",
    },
    {
      title: "Video Testimonials",
      description: "Real success stories from students, parents, and schools",
      url: "/resources",
      type: "content",
    },
    {
      title: "Success Stories",
      description: "Hear from our Ei ATS community about their achievements",
      url: "/resources",
      type: "content",
    },
    {
      title: "Alumni Network",
      description: "Connect with 1000+ alumni from 100+ schools globally",
      url: "/#alumni-cta",
      type: "content",
    },
    {
      title: "Speak With Alumni",
      description: "Schedule calls and join the alumni network",
      url: "/#alumni-cta",
      type: "section",
    },
    {
      title: "University Programmes Access",
      description: "Direct access to programmes at Johns Hopkins CTY, UC Berkeley ATDP, Northwestern CTD, and more",
      url: "/programmes",
      type: "content",
    },
    {
      title: "School Code Login",
      description: "Login using your school code for secure access",
      url: "/for-schools/login",
      type: "resource",
    },
    {
      title: "Registration Statistics",
      description: "View current year vs last year registration data",
      url: "/for-schools/dashboard",
      type: "content",
    },
    {
      title: "Qualified Students List",
      description: "Complete list of students who qualified with percentiles",
      url: "/for-schools/students",
      type: "content",
    },
    {
      title: "High Performers",
      description: "Students with 90%+ percentile highlighted for recognition",
      url: "/for-schools/students",
      type: "content",
    },
    {
      title: "Intelligent Chatbot",
      description: "AI assistant with comprehensive knowledge about the Ei ATS programme",
      url: "/#chatbot",
      type: "feature",
    },
    {
      title: "Ei ATS Assistant",
      description: "Get instant answers about exam details, registration, and universities",
      url: "/",
      type: "feature",
    },
    {
      title: "Quick Questions",
      description: "Fast access to common Ei ATS questions and information",
      url: "/",
      type: "feature",
    },
    // For Parents Page
    {
      title: "For Parents",
      description: "Information hub for parents: test details, deadlines, FAQ, and support",
      url: "/for-parents",
      type: "page",
    },
    {
      title: "Test Details (Parents)",
      description: "Exam format, eligibility, important dates for parents",
      url: "/for-parents#test-details",
      type: "section",
    },
    {
      title: "Non-ASSET Students (Parents)",
      description: "ASSET Online qualification route for students not in ASSET schools",
      url: "/for-parents#non-asset-students",
      type: "section",
    },
    {
      title: "Parents FAQ",
      description: "Frequently asked questions for parents",
      url: "/for-parents#faq",
      type: "section",
    },
    // For Schools Page
    {
      title: "For Schools",
      description: "Resources and tools for schools to administer Ei ATS",
      url: "/for-schools",
      type: "page",
    },
    {
      title: "School Admin Tools",
      description: "Dashboard and bulk registration utilities for schools",
      url: "/for-schools#school-tools",
      type: "section",
    },
    {
      title: "Bulk Registration (Schools)",
      description: "Excel upload and 10% savings for bulk registrations",
      url: "/for-schools#bulk-registration",
      type: "section",
    },
    {
      title: "Non-ASSET Schools (Nomination)",
      description: "Nominate top 15% students via email if your school is not an ASSET partner",
      url: "/for-schools#non-asset-schools",
      type: "section",
    },
    {
      title: "Why Partner with Ei ATS",
      description: "Benefits of collaboration for schools",
      url: "/for-schools#why-partner-ats",
      type: "section",
    },
    {
      title: "School Login",
      description: "Secure portal for school administrators",
      url: "/for-schools/login",
      type: "page",
    },
    {
      title: "School Dashboard",
      description: "View registration statistics for your school",
      url: "/for-schools/dashboard",
      type: "page",
    },
    {
      title: "Students List (School Portal)",
      description: "Manage registered students",
      url: "/for-schools/students",
      type: "page",
    },
    // For Students Page
    {
      title: "For Students",
      description: "Portal links, certificates, rewards and resources for students",
      url: "/for-students",
      type: "page",
    },
    {
      title: "Download Ei ATS Certificate",
      description: "Get your Ei ATS Qualifying Certificate",
      url: "https://ats.ei.study/ats_qualifier_certificate.php",
      type: "resource",
    },
    {
      title: "Awards & Recognition (Students)",
      description: "Medals and certificates for Bronze, Silver, Gold Scholars",
      url: "/for-students#student-tools",
      type: "section",
    },
    // Resources extra pages
    {
      title: "Bulk Registration Resources",
      description: "Guides and Excel template for bulk uploading students",
      url: "/resources/bulk-registrations",
      type: "page",
    },
    {
      title: "Articles & Research Papers",
      description: "Curated reading list on gifted education",
      url: "/resources/articles",
      type: "page",
    },
    // Policy pages
    {
      title: "Privacy Policy",
      description: "How Ei ASSET Talent Search handles your data",
      url: "/privacy",
      type: "page",
    },
    {
      title: "Terms & Conditions",
      description: "Legal terms for using the site and registering",
      url: "/terms",
      type: "page",
    },
    {
      title: "Refund Policy",
      description: "Information on refunds and cancellations",
      url: "/refund",
      type: "page",
    },
    // Schedule a Call Page
    {
      title: "Schedule a Call",
      description: "Book a consultation call with the Ei ATS team",
      url: "/schedule-call",
      type: "page",
    },
    {
      title: "Schedule Call Form",
      description: "Fill out the form to schedule a call with our advisors",
      url: "/schedule-call#schedule-form",
      type: "section",
    },

    // Individual Programme Pages (detailed)
    {
      title: "Programme – Johns Hopkins CTY",
      description: "Detailed overview of Johns Hopkins Center for Talented Youth programmes",
      url: "/programmes/cty",
      type: "page",
    },
    {
      title: "Programme – Northwestern CTD",
      description: "Detailed overview of Northwestern Center for Talent Development programmes",
      url: "/programmes/northwestern",
      type: "page",
    },
    {
      title: "Programme – Purdue GER2I",
      description: "Detailed overview of Purdue University GER2I programmes",
      url: "/programmes/purdue",
      type: "page",
    },
    {
      title: "Programme – SIG (Summer Institute for the Gifted)",
      description: "Detailed overview of SIG residential programmes",
      url: "/programmes/sig",
      type: "page",
    },
    {
      title: "Programme – UC Berkeley ATDP",
      description: "Detailed overview of UC Berkeley Academic Talent Development Programme",
      url: "/programmes/uc-berkeley",
      type: "page",
    },

    // Additional Home Sections for completeness
    {
      title: "Giftedness Explained",
      description: "Understand giftedness and how Ei ATS nurtures it",
      url: "/#giftedness",
      type: "section",
    },
    {
      title: "Programme Roadmap",
      description: "Step–by–step roadmap from registration to programme admission",
      url: "/#roadmap",
      type: "content",
    },
    {
      title: "Our Heritage & History",
      description: "The legacy and milestones of Ei ASSET Talent Search",
      url: "/#history",
      type: "section",
    },
    {
      title: "Frequently Asked Questions",
      description: "General FAQ covering eligibility, dates, and procedures",
      url: "/#faq",
      type: "section",
    },
  ]

  // Enhanced search function with fuzzy matching
  useEffect(() => {
    if (query.trim() === "") {
      setResults([])
      return
    }

    const queryWords = query.toLowerCase().trim().split(/\s+/)

    const filteredResults = searchData.filter((item) => {
      const searchableText = `${item.title} ${item.description} ${item.category || ""}`.toLowerCase()

      // Exact phrase match gets highest priority
      if (searchableText.includes(query)) {
        return true
      }

      // All words must be found somewhere in the searchable text
      return queryWords.every((word) => searchableText.includes(word))
    })

    // Sort results by relevance
    const sortedResults = filteredResults.sort((a, b) => {
      const aText = `${a.title} ${a.description}`.toLowerCase()
      const bText = `${b.title} ${b.description}`.toLowerCase()

      // Exact title match gets highest priority
      if (a.title.toLowerCase().includes(query) && !b.title.toLowerCase().includes(query)) return -1
      if (b.title.toLowerCase().includes(query) && !a.title.toLowerCase().includes(query)) return 1

      // Then by how early the match appears
      const aIndex = aText.indexOf(query)
      const bIndex = bText.indexOf(query)

      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
      if (aIndex !== -1) return -1
      if (bIndex !== -1) return 1

      return 0
    })

    setResults(sortedResults.slice(0, 10)) // Limit to top 10 results
  }, [query])

  // Handle result click
  const handleResultClick = (url: string) => {
    // If it's a resource, open in a new tab
    if (url.startsWith("http://") || url.startsWith("https://")) {
      window.open(url, "_blank")
    } else {
      // Otherwise, navigate to the URL
      // This part needs to be adapted to handle different URL types (page, section, resource, etc.)
      // For now, we'll assume it's a page or section URL
      // A more robust solution would involve parsing the URL to determine its type
      // For example, if it ends with #, it's a section, if it's a .php, it's a resource
      // For simplicity, we'll just navigate for now
      // If it's a resource, we need to handle it differently (e.g., open in new tab)
      // If it's a page, we navigate
      // If it's a section, we scroll to it
      // If it's a resource, we open in new tab

      // This logic needs to be refined based on the actual URL structure
      // For now, we'll just navigate for pages and sections
      // Resources are handled by opening in new tabs
      if (url.startsWith("/") || url.startsWith("#")) {
        // This is a page or section URL
        // We need to find the element by ID or scroll to it
        const element = document.getElementById(url.substring(1)); // Remove leading # for section
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else {
          // Fallback to navigation if element not found (e.g., for resources)
          // This part needs to be handled more carefully for resources
          window.open(url, "_blank");
        }
      } else {
        // This is a resource URL (e.g., /ats_qualifier_certificate.php)
        window.open(url, "_blank");
      }
    }
    onOpenChange(false)
    setQuery("")
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onOpenChange(false)
      setQuery("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] p-0" onKeyDown={handleKeyDown}>
        <DialogHeader>
          <DialogTitle className="sr-only">Search</DialogTitle>
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search everything on the website..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-lg"
                autoFocus
                ref={inputRef}
              />
              {query && (
                <Button variant="ghost" size="icon" onClick={() => setQuery("")} className="h-5 w-5 p-0">
                  {/* <X className="h-4 w-4" /> */}
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        {results.length > 0 ? (
          <div className="max-h-[500px] overflow-y-auto p-2">
            <div className="text-xs text-gray-500 px-3 py-2">
              {results.length} result{results.length !== 1 ? "s" : ""} found
            </div>
            {results.map((result, index) => (
              <div
                key={index}
                className="p-4 hover:bg-gray-50 rounded-md cursor-pointer border-b border-gray-100 last:border-b-0"
                onClick={() => handleResultClick(result.url)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-[#850101] text-sm">{result.title}</h3>
                      {result.category && (
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                          {result.category}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{result.description}</p>
                    <p className="text-xs text-gray-400 mt-1">{result.url}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-[#850101] text-white rounded-full capitalize flex-shrink-0">
                    {result.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : query ? (
          <div className="p-8 text-center">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">No results found for "{query}"</p>
            <p className="text-sm text-gray-400 mt-2">
              Try different keywords, check spelling, or browse the navigation menu
            </p>
            <div className="mt-4 text-xs text-gray-400">
              <p>Search tips:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Try searching for "AQAD", "webinars", "Johns Hopkins", "school portal", etc.</li>
                <li>Use specific terms like "Bronze Scholar", "exam dates", "PAN ID", "chatbot"</li>
                <li>Search for university names like "UC Berkeley", "Northwestern", or "Purdue"</li>
                <li>Look for "video testimonials", "alumni network", or "school dashboard"</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Start typing to search</p>
            <p className="text-sm text-gray-400 mt-2">
              Search for pages, sections, partners, resources, or any content on the website
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-50 p-2 rounded">
                <p className="font-medium text-gray-700">Popular searches:</p>
                <p className="text-gray-500">AQAD, Johns Hopkins, School Portal, PAN ID</p>
              </div>
              <div className="bg-gray-50 p-2 rounded">
                <p className="font-medium text-gray-700">Quick access:</p>
                <p className="text-gray-500">Registration, Video Testimonials, Chatbot</p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
