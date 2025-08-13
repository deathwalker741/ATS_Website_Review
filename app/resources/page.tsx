"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, BookOpen, FileText, Globe, Download, ExternalLink, Users, GraduationCap, School, ClipboardList, Calendar, CreditCard, Award, CheckCircle, Mail, Phone } from "lucide-react"
import { useState, useEffect } from "react"
import { useRegion } from "@/components/region-context"

interface Testimonial {
  id: string
  title: string
  description: string
  isLocal?: boolean
  src?: string
}

const baseResources = [
  {
    title: "Webinars",
    description:
      "Join our expert-led webinars covering exam preparation strategies, university applications, and academic excellence tips.",
    icon: Video,
    link: "https://ei.study/ei-webinars/",
    color: "bg-red-100 text-red-700",
    type: "Live Sessions",
    features: ["Expert guidance", "Interactive Q&A", "Recorded sessions", "Certificate of participation"],
  },
  {
    title: "Blog",
    description:
      "Read insightful articles about gifted education, success stories, university partnerships, and academic trends.",
    icon: BookOpen,
    link: "https://ei.study/blogs/",
    color: "bg-blue-100 text-blue-700",
    type: "Articles & Insights",
    features: ["Success stories", "Expert insights", "Study tips", "University guides"],
  },
  {
    title: "Sample Papers",
    description:
      "Download official Ei ATS sample papers to understand the exam format, question types, and difficulty level.",
    icon: FileText,
    link: "https://ei.study/wp-content/uploads/2025/01/Sample-Questions-Ei-ASSET-Final-File.pdf",
    color: "bg-green-100 text-green-700",
    type: "PDF Download",
    features: ["Official format", "All subjects", "Answer keys", "Preparation guide"],
  },
  {
    title: "Articles & Research Papers",
    description:
      "Access curated links to insightful articles and research studies about gifted education.",
    icon: FileText,
    link: "/resources/articles",
    color: "bg-orange-100 text-orange-700",
    type: "Reading List",
    features: [
      { title: "How to raise a genius", url: "https://www.nature.com/articles/537152a" },
      { title: "Identifying and nurturing giftedness", url: "https://www.deccanherald.com/education/identifying-and-nurturing-giftedness-3040720" },
      { title: "The Imperative of Nurturing Giftedness in Education", url: "https://giftedworld.org/the-imperative-of-nurturing-giftedness-in-education/" },
      { title: "Gifted and Talented Education", url: "https://www.apa.org/education-career/k12/gifted" }
    ],
  },
  {
    title: "AQAD Platform",
    description:
      "Daily skill-based questions for classes 3-9 with rewards and progress insights.",
    icon: Globe,
    link: "https://www.aqad.in",
    color: "bg-purple-100 text-purple-700",
    type: "Analytics Platform",
    features: [
      "Daily questions",
      "Grades 3-9, multi-subject",
      "Certificates for champs",
      "Monthly progress tracker"
    ],
  },
  {
    title: "Ei ATS Brochure",
    description:
      "Download the comprehensive Ei ATS brochure with detailed information about the program, benefits, and registration process.",
    icon: Download,
    link: "https://ats.ei.study/documents/ATS-India2024.pdf", // will be overridden for INT
    color: "bg-yellow-100 text-yellow-700",
    type: "PDF Brochure",
    features: ["Program overview", "University partners", "Registration guide", "Success metrics"],
  },
]

const testimonials: Testimonial[] = [
  // All actual YouTube video IDs from the provided links - no titles/descriptions yet
  { id: "1YQ5a04xwVs", title: "", description: "" },
  { id: "UgRI1PpDnBA", title: "", description: "" },
  { id: "0hexQQvE1us", title: "", description: "" },
  { id: "Y-_yNZtHdLo", title: "", description: "" },
  { id: "OXvbg02TCs0", title: "", description: "" },
  { id: "FURhmUrdIK4", title: "", description: "" },
  { id: "ulVMBK_B2G8", title: "", description: "" },
  { id: "XHXl_Xxnf1I", title: "", description: "" },
  { id: "-EfEfBYzeVE", title: "", description: "" },
  { id: "2g1_Lv08CSY", title: "", description: "" },
  { id: "gu632GxLlts", title: "", description: "" },
  { id: "3cDx0llkItM", title: "", description: "" },
  { id: "QA0v6DzsCOg", title: "", description: "" },
  { id: "UWZ00Unyx3g", title: "", description: "" },
  { id: "hczA9M2bU1E", title: "", description: "" },
  { id: "ZNHJBeTzLrY", title: "", description: "" },
  { id: "5QVCcMoE-5w", title: "", description: "" },
  { id: "3bApdGVwq-8", title: "", description: "" },
  { id: "qopgHA9FXF0", title: "", description: "" },
  { id: "8G0MbpNPq_0", title: "", description: "" },
  { id: "MOygUsrkk9c", title: "", description: "" },
  { id: "_PoOWP6YLMQ", title: "", description: "" },
  { id: "CS76lx4rGZ8", title: "", description: "" },
  { id: "uVKZ-_VFUNM", title: "", description: "" },
  { id: "MITNthKqm2M", title: "", description: "" },
  { id: "m8lNR2A140o", title: "", description: "" },
  { id: "9iqxlCQ22ck", title: "", description: "" },
  { id: "R9-GSEQiYoA", title: "", description: "" },
  { id: "8BZx_QI2KpM", title: "", description: "" },
  { id: "9ytIlZXisz8", title: "", description: "" }
]

// Add function to load remaining videos dynamically
const additionalVideoIds = [
  "aBlE7PfOlfw", "lNIoLrOsEmw", "kWxmlsLwYss", "KqLBYKisjVY", "ccy1XVWfThU",
  "Cud46eSXwEs", "FpdbYIMh7c0", "OlwJreipL0w", "AM5ye-7S7eQ", "jsnrysIM_gY",
  "_wPdh0X6HYs", "3LQsUyaYR7U", "0hKIiG_oMvU", "bjjOTc7Div0", "aoCn-PTmwlg",
  "6GgPDOMeZ80", "f1DHgHS3ULo", "1rcLrMXnV8s", "1ohIpxXwcIk", "RSVXq_7DatA",
  "K0g_esbMxww", "qMzqCepsMRY", "Nfhz8P5k2qc", "bmjfUQQDeLM", "d1XsBL52nos",
  "0GOtR2acxb4", "KgKZI6Gvidc", "tvCBHmBC8gA", "0fKS7zIPZDg", "Ii7sW7b8YKE",
  "nJpwUdgguwY", "X4nQRuRaRIk", "RkRtzEKKfwY", "3g28ekPYQFg", "-IZDJeeGL6s",
  "53r6xYS384g", "9g0Jdq2-uaU", "MlYbDgexFdA", "3OOm8AuMtb4", "bVxR6nns7hs",
  "-GOnoTPMnI4", "Pngl8TNgrP8", "mjsh8pGUtyc", "puh4xE2UsK4", "yeOH78_XYAg",
  "0CnC9sreYnE", "-5xNoviJZ7s", "d0TnGY_kd4o", "ymEhvMMZobs", "htj3MfxVCRk",
  "eU0AsHfaYe0", "3Ysuf2el23I", "cnRpaMdyZ5o", "Get3Jm4wLa8", "zYI383pJKUI",
  "zYpvYw9Ozw0", "sC-_mluHmn4", "_HgrqsWPV7w", "rXZvFzhHkMI", "qAz3jPRnx9k",
  "lcI7XS2yspE", "XmRwMiEfvWo", "XgyNvW2iMYU", "DkqW17RDXro", "BGCFCMCquPI",
  "B1zY-NLnogc", "7-5HZKsbDck", "64Dqa1tCraA", "HtqQJwbDrOk", "pWM0lMCMEO0",
  "99fweqyaC80", "KIrNXej4KC0", "5_LFbSN9fDI", "z5waGiUfgVs", "IWN2xhFGStM",
  "XUeBcV2aEn8", "9FXf1n4ireE", "3kHVmde3ySc", "zTzOlXMIotI", "vvNXTAeI3DQ",
  "G53Ytdn5rbo", "8vcYGprZgBw", "aWHzirBmLCk", "JtHqsBEXPdk", "lFep69vm0wU",
  "b9ROYD_Vc18", "RfMj3OLD5pY", "kfR13dcxfqQ", "X0UJKiJKdtY", "RJGumZH5TS8",
  "90aMXnp6erM", "VkxD81tRKbo", "oSGn7n_4Ocg", "mPpI-f0hDBE", "_8jC6VLD-0I",
  "JAKTFuJW3uo", "redKZq8seXw", "aoEG0ShtIX8", "QjWboHqe4Yw", "ak2QDoeOneU",
  "w73FN1hevT8", "15o0FuZWLrU", "aRUX1yKzdTQ", "9fFzgYkRILY", "ZQo_HpGUYrc",
  "PscAazkTYOE", "N4UDyzTNVv8", "gNafnLx7XRY", "iYUGuTorLq0", "2JlcFvIhVJ8",
  "6fbxqeI8q1Q", "x0nv-Tq_jXo", "O_taBXN0ht8", "PkhDJ8gjAbs", "7WCRrM6ZXsk",
  "fZc_E3DkFGE", "xLszGEjTN30", "7DVa1YuOajY", "a8F-Phs3hgk", "GYdRKdT_uvE",
  "0glpcxzgajM", "q0Zi0OSNmsg", "U-IAliO2Gco", "RWcyiHE9MIE", "h2UOuFjwjjs",
  "herKSUz0iK0", "pA5EEICF-xE", "qMIa64dyWxc", "upVu00AaJjQ", "LbCtB-BXpdA",
  "mGcE8uv_0xQ", "KivlDFLC_p8", "RpPAuVlo9aY", "eG31pjH4930", "YHL04sMfXl8",
  "5g8A9KtRDQU", "hp_xpUXQrEM", "Ik2bp1TYvtI", "cx1C3LhmFg8", "oUE5OiviChM",
  "NRQMaP-Mqqc", "5YS11CCYw0s", "YrPSfgpWuVg", "TBi57Oj-PLs", "LwpyJhlDRJk",
  "gxHpKxVGXEI", "lI_M_BvAZl0", "JMtLfXJOMi0", "E-a289pqDvA", "Opwe0fw_rI8",
  "yJZe0TGuYKw", "caGXDQzOv1s", "7uhkjtUWQRY", "r_WwHBDnPQw", "UW_TtTu5zyM",
  "lFoVmRQ4aGI", "By4TxgTrUV0", "jgcfvz24LYA", "lAFWtdnXaec", "pKjG2ZlU6xQ",
  "sWX4f6QH_ys", "KYegOAKraNE", "1IW2iXUPsHE", "O_HS8G7_6Zo", "kCvCtwbh2AA",
  "ytVewqLm64c", "ZL_UuYIs4Ho", "cg7I63o5woU", "pfQaHSKPj_M", "4zXdAqAceyk",
  "TWlMZT-sA0c", "ujFolfQ3Ryc", "wqwPqbxgY3Q", "UkVzlOFKwQA", "4hO3BVVNHss",
  "jWQwlky0lTM", "RRGlynLIBVs", "fm5k-IdwgM8", "MKqX2foroOQ", "WYWduLnjsVE",
  "9lYOA-zY39w", "c2nfg32IzuU", "7VUK2DO4WkM", "2qjv_ejIUHM", "trW1EMJkuL0",
  "X0olrupA6xk", "ee9smf7rLd8", "xcFclPB89pk", "nvliRiYSTxg", "bKtoungXEFY",
  "h2uYPy6jlJE", "oo4fE2_0l9A", "5MiOLZlYDcE", "QV3UbkUKb5g", "eWWRXit5F9E",
  "P3lZgJu920E", "HXSpNP1zAV8", "LEK_n3akZrk", "1MQgIxS4CJk", "laQA-65Kdfg",
  "hygC2lQbswc", "OuR0chdg0Qg", "qxtEOpd0Hlw", "TknouE3wqnE", "U0JgsSi_tJU",
  "H9evNz9_yI0", "fxdIAYQRnHs", "4EudwhIGCMM", "5IEd67FnuPY", "mwzcJy4sXVk",
  "VRYGeyboD0U", "oyTJP1V0YUs", "jSbEoL77ufQ", "U9PmJ0R8zus", "G5FqTHvNCxw",
  "nfE9c0yO8p4", "s0wolxDX-PM", "CjnckiSY3D0", "NpVj9DqbzQ8", "XlYa1sIyNPE",
  "LagGb2YAiyM", "WqqiSfhug-w", "Dk20GLGbZ_I", "VlaT7syAcEw", "XhAl6c4isBw"
]

// Generate testimonials for all remaining videos with empty titles/descriptions
additionalVideoIds.forEach(videoId => {
  testimonials.push({
    id: videoId,
    title: "",
    description: ""
  })
})

// Add YouTube videos
testimonials.push(
  {
    id: "1YQ5a04xwVs",
    title: "Success Stories Compilation",
    description: "Watch inspiring success stories from students who excelled through our programmes",
    isLocal: false,
    src: "https://www.youtube.com/watch?v=1YQ5a04xwVs"
  },
  {
    id: "UgRI1PpDnBA", 
    title: "Student Achievements",
    description: "Comprehensive overview of student achievements and programme successes",
    isLocal: false,
    src: "https://www.youtube.com/watch?v=UgRI1PpDnBA"
  },
  {
    id: "2g1_Lv08CSY",
    title: "Educational Excellence",
    description: "Showcasing educational excellence and student achievements",
    isLocal: false,
    src: "https://www.youtube.com/watch?v=2g1_Lv08CSY"
  },
  {
    id: "gu632GxLlts",
    title: "Talent Development",
    description: "Talent development and academic recognition through ATS programmes",
    isLocal: false,
    src: "https://www.youtube.com/watch?v=gu632GxLlts"
  },
  {
    id: "3cDx0llkItM",
    title: "Student Success Stories",
    description: "Inspiring success stories from students who excelled through our programmes",
    isLocal: false,
    src: "https://www.youtube.com/watch?v=3cDx0llkItM"
  }
)



// Function to fetch YouTube video data
const fetchYouTubeVideoData = async (videoId: string) => {
  try {
    // Note: You'll need to add your YouTube API key to environment variables
    const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY
    if (!API_KEY) {
      return {
        title: `YouTube Video ${videoId}`,
        description: "Click to watch this testimonial video"
      }
    }
    
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`
    )
    const data = await response.json()
    
    if (data.items && data.items.length > 0) {
      const snippet = data.items[0].snippet
      return {
        title: snippet.title,
        description: snippet.description.substring(0, 150) + "..."
      }
    }
  } catch (error) {
    console.error('Error fetching YouTube data:', error)
  }
  
  return {
    title: `YouTube Video ${videoId}`,
    description: "Click to watch this testimonial video"
  }
}

export default function ResourcesPage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(12)
  const { region } = useRegion()

  // Function to get region-specific resources
  const getRegionSpecificResources = () => {
    const regionResources = [...baseResources]
    
    // Update brochure link based on region
    const brochureIndex = regionResources.findIndex(r => r.title === "Ei ATS Brochure")
    if (brochureIndex !== -1) {
      regionResources[brochureIndex] = {
        ...regionResources[brochureIndex],
        link: region === "INT" 
          ? "https://ats.ei.study/documents/ATS-International2025.pdf" 
          : "https://ats.ei.study/documents/ATS-India2024.pdf"
      }
    }
    
    return regionResources
  }

  const resources = getRegionSpecificResources()

  const getYouTubeEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`
  }

  const getYouTubeThumbnail = (videoId: string) => {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement
    const videoId = img.getAttribute('data-video-id')
    
    if (videoId) {
      // Try medium quality if high quality fails
      if (img.src.includes('hqdefault')) {
        img.src = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`
      }
      // Try default quality if medium quality fails
      else if (img.src.includes('mqdefault')) {
        img.src = `https://img.youtube.com/vi/${videoId}/default.jpg`
      }
      // Use placeholder if all YouTube thumbnails fail
      else {
        img.src = '/placeholder.jpg'
      }
    }
  }

  const VideoModal = ({ videoSrc, onClose }: { videoSrc: string; onClose: () => void }) => {
    const isLocal = videoSrc.startsWith('/')
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="relative w-full max-w-4xl">
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
          >
            ✕
          </button>
          <div className="relative w-full h-0 pb-[56.25%]">
            {isLocal ? (
              <video
                src={videoSrc}
                className="absolute inset-0 w-full h-full rounded-lg"
                controls
                autoPlay
              />
            ) : (
              <iframe
                src={videoSrc}
                className="absolute inset-0 w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#850101] to-[#650101] text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Resources & Support</h1>
            <p className="text-sm sm:text-base text-gray-100 max-w-3xl mx-auto px-4">
              Access comprehensive resources to help you prepare for Ei ATS 2025, understand university programs, and
              maximize your academic potential.
            </p>
          </div>
        </div>
      </section>

      {/* Main Resources */}
      <section id="resources" className="py-8 sm:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Available Resources</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto px-4">
              Access all the tools and materials you need for Ei ATS success
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {resources.map((resource, index) => (
              <Card
                key={index}
                className="flex flex-col h-full hover:shadow-xl transition-shadow duration-300 border-0 shadow-lg"
              >
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center ${resource.color} flex-shrink-0`}>
                      <resource.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-lg sm:text-xl text-[#850101] break-words">{resource.title}</CardTitle>
                      <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{resource.type}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col flex-1 space-y-4 justify-between p-4 sm:p-6">
                  <p className="text-sm sm:text-base text-gray-600">{resource.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {resource.features.map((feature: any, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 bg-[#850101] rounded-full mt-2 flex-shrink-0"></div>
                        {typeof feature === 'string' ? (
                        <span className="text-xs sm:text-sm text-gray-600 break-words">{feature}</span>
                        ) : (
                          <a
                            href={feature.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs sm:text-sm text-blue-600 underline break-words"
                          >
                            {feature.title}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>

                  <Button asChild className="w-full bg-[#850101] hover:bg-[#650101] text-sm sm:text-base">
                    {resource.link.startsWith('/') ? (
                      <a href={resource.link}>
                        Access {resource.title}
                      </a>
                    ) : (
                    <a href={resource.link} target="_blank" rel="noopener noreferrer">
                      Access {resource.title} <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
                    </a>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Test Details Section */}
      <section id="test-details" className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Test Details</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-3xl mx-auto px-4">
              Everything you need to know about the <strong>Ei ASSET</strong> Talent Search {region === "INT" ? "International" : ""} test
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl">
              <CardHeader className="bg-gradient-to-r from-[#850101] to-[#650101] text-white p-4 sm:p-6">
                <CardTitle className="text-xl sm:text-2xl text-center">
                  {region === "INT" 
                    ? "Ei ASSET Talent Search International (Ei ATS International) – Test Details"
                    : "Ei ASSET Talent Search (Ei ATS) – Test Details"
                  }
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-8 space-y-6 sm:space-y-8">
                
                {/* Introduction */}
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {region === "INT" 
                      ? "The Ei ASSET Talent Search International is an elite, invite-only platform designed to identify gifted and academically advanced students in Grades 4 to 8 across the UAE, Saudi Arabia, Qatar, Oman, and Bahrain. The test is developed by Educational Initiatives and uniquely challenges students by assessing concepts that are two grade levels above their current academic standing. It serves as the gateway to world-class gifted enrichment programmes and global recognition."
                      : "The Ei ASSET Talent Search (Ei ATS) is a prestigious, invitation-only assessment designed to identify and nurture academically gifted students from Grades 4 to 8. Conducted by Educational Initiatives, the test goes beyond conventional grade-level assessments by evaluating students on concepts two grades above their current academic level, helping them uncover their true potential."
                    }
                  </p>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="text-xl font-bold text-[#850101] mb-6 flex items-center gap-2">
                    <ClipboardList className="h-6 w-6" />
                    Key Features of the {region === "INT" ? "Test" : "Ei ATS Test"}:
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Eligibility:</p>
                          <p className="text-gray-700 text-sm">Students from Grades 4 to 8 who score in the top 15 percentile in the {region === "INT" ? "Ei " : ""}ASSET test or attain Stanine 9 in CAT4.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Subjects Offered:</p>
                          <p className="text-gray-700 text-sm">English, Maths, and Science (students can choose 1, 2, or all 3 subjects).</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Level of Difficulty:</p>
                          <p className="text-gray-700 text-sm">Two grades above the student&apos;s current {region === "INT" ? "enrolled grade" : "level"}.</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Test Format:</p>
                          <div className="text-gray-700 text-sm space-y-1">
                            <p>• Online, proctored {region === "INT" ? "assessment" : "test"}</p>
                            <p>• No preparation required</p>
                            <p>• Multiple {region === "INT" ? "Choice Questions" : "choice questions"}</p>
                            <p>• No negative marking</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-gray-900">Test Duration:</p>
                          <p className="text-gray-700 text-sm">60 minutes per subject</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Test Dates & Fees */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                  <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                    <h4 className="text-base sm:text-lg font-bold text-[#850101] mb-3 sm:mb-4 flex items-center gap-2">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                      Test Dates{region === "INT" ? " (UAE & GCC 2025)" : ""}:
                    </h4>
                    <p className="text-gray-700 font-semibold text-sm sm:text-base">
                      {region === "INT" 
                        ? "March 25 to March 29, 2025"
                        : "November 28 to November 30, 2025"
                      }
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 sm:p-6 rounded-lg">
                    <h4 className="text-base sm:text-lg font-bold text-[#850101] mb-3 sm:mb-4 flex items-center gap-2">
                      <CreditCard className="h-4 w-4 sm:h-5 sm:w-5" />
                      {region === "INT" ? "Registration " : ""}Fees:
                    </h4>
                    <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-700">
                      {region === "INT" ? (
                        <>
                          <p>• 1 Subject: AED 170</p>
                          <p>• 2 Subjects: AED 210</p>
                          <p>• 3 Subjects: AED 250 (Late Fee: AED 300)</p>
                        </>
                      ) : (
                        <>
                          <p>• 1 Subject: INR 1700 (early registration), INR 2700 (late)</p>
                          <p>• 2 Subjects: INR 2200 (early), INR 3300 (late)</p>
                          <p>• 3 Subjects: INR 2500 (early), INR 3300 (late)</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Recognition & Awards */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#850101] mb-4 sm:mb-6 flex items-center gap-2">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6" />
                    Recognition & {region === "INT" ? "Scholarships" : "Awards"}:
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                    <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg text-center">
                      <div className="text-xl sm:text-2xl font-bold text-yellow-700 mb-2">95-99%</div>
                      <p className="font-semibold text-yellow-800 text-sm sm:text-base">{region === "INT" ? "Ei ATS " : ""}Gold Scholar</p>
                      <p className="text-xs sm:text-sm text-yellow-700">Certificate + {region === "INT" ? "Gold " : ""}Medal</p>
                    </div>
                    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg text-center">
                      <div className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">90-94%</div>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">{region === "INT" ? "Ei ATS " : ""}Silver Scholar</p>
                      <p className="text-xs sm:text-sm text-gray-700">Certificate + {region === "INT" ? "Silver " : ""}Medal</p>
                    </div>
                    <div className="bg-amber-50 p-3 sm:p-4 rounded-lg text-center">
                      <div className="text-xl sm:text-2xl font-bold text-amber-700 mb-2">85-89%</div>
                      <p className="font-semibold text-amber-800 text-sm sm:text-base">{region === "INT" ? "Ei ATS " : ""}Bronze Scholar</p>
                      <p className="text-xs sm:text-sm text-amber-700">Certificate + {region === "INT" ? "Bronze " : ""}Medal</p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-lg">
                    <p className="text-blue-800 font-semibold mb-2 text-sm sm:text-base">{region === "INT" ? "Top Grade Toppers" : "Grade-level toppers"} are eligible for prizes such as:</p>
                    <p className="text-blue-700 text-xs sm:text-sm">iPads, {region === "INT" ? "Apple Watches, " : ""}tablets, Kindles, and more.</p>
                    {region === "INT" && (
                      <p className="text-blue-700 text-xs sm:text-sm mt-2"><strong>GiftedWorld Incentive:</strong> All students who register by March 23 receive a 25% discount on GiftedWorld Courses.</p>
                    )}
                  </div>
                </div>

                {/* Benefits/Enrichment Opportunities */}
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#850101] mb-4 sm:mb-6 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
                    {region === "INT" ? "Enrichment Opportunities" : "Benefits of Participating"}:
                  </h3>
                  
                  {region === "INT" ? (
                    <div className="space-y-3 sm:space-y-4">
                      <p className="text-gray-700 text-sm sm:text-base">Qualifying students are eligible to apply for global gifted programmes such as:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-700">Johns Hopkins University Center for Talented Youth (CTY)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-700">Northwestern University – CTD Summer & Online Programs</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-700">Purdue University&apos;s Gifted Education Resource Institute (GERI)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-700">UC Berkeley&apos;s Academic Talent Development Program (ATDP)</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-700">Summer Institute for the Gifted (SIG) – Yale, UCLA, UC Berkeley, and more</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-gray-700">GenWise India – Gifted Summer and Online Programmes</span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-xs sm:text-sm">These world-class opportunities offer students a chance to explore STEM, humanities, and leadership through hands-on, high-order learning experiences with globally diverse peers.</p>
                    </div>
                  ) : (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-gray-900 text-sm sm:text-base">Self-Discovery:</p>
                            <p className="text-gray-700 text-xs sm:text-sm">Encourages students to explore their academic strengths through challenging content.</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 sm:gap-3">
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-gray-900 text-sm sm:text-base">Global Opportunities:</p>
                            <p className="text-gray-700 text-xs sm:text-sm mb-2">Qualifiers get access to some of the world&apos;s leading gifted and enrichment programs including:</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs sm:text-sm text-gray-600">
                              <span>• Northwestern University&apos;s Center for Talent Development (CTD)</span>
                              <span>• Johns Hopkins University&apos;s Center for Talented Youth (CTY)</span>
                              <span>• Purdue University&apos;s Gifted Education Resource Institute (GERI)</span>
                              <span>• UC Berkeley&apos;s Academic Talent Development Program (ATDP)</span>
                              <span>• Summer Institute for the Gifted (SIG)</span>
                              <span>• India&apos;s premier GenWise programs</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 sm:gap-3">
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-gray-900 text-sm sm:text-base">Exclusive Community:</p>
                            <p className="text-gray-700 text-xs sm:text-sm">Students become part of a global gifted network, opening doors to academic mentoring and leadership development.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Why Take the Test */}
                {region === "INT" && (
                  <div>
                    <h3 className="text-xl font-bold text-[#850101] mb-6">Why Take the Ei ATS International Test?</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">Cultivates critical thinking and self-awareness of academic potential</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">Enables access to top-tier global gifted education pathways</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">Builds a global peer network and enhances college-readiness</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">Develops life-long learning habits through enrichment</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contact & Registration */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-[#850101] mb-6 flex items-center gap-2">
                    <Mail className="h-6 w-6" />
                    Contact {region === "INT" ? "Us " : ""} & {region === "INT" ? "More Information" : "Registration"}:
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-[#850101]" />
                        <div>
                          <p className="font-semibold text-gray-900">Website:</p>
                          <a href="https://www.ats.ei.study" className="text-blue-600 hover:text-blue-800 underline">www.ats.ei.study</a>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-[#850101]" />
                        <div>
                          <p className="font-semibold text-gray-900">Email:</p>
                          <a href={`mailto:${region === "INT" ? "atsinternational@ei.study" : "eitalentsearch@ei.study"}`} className="text-blue-600 hover:text-blue-800 underline">
                            {region === "INT" ? "atsinternational@ei.study" : "eitalentsearch@ei.study"}
                          </a>
                        </div>
                      </div>
                    </div>

                    {region === "INT" && (
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Registration Deadlines (UAE GCC 2025):</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-700">Early Registration:</span>
                            <span className="font-semibold text-gray-900">Until March 16, 2025</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700">Regular Registration:</span>
                            <span className="font-semibold text-gray-900">Until March 23, 2025</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-700">Late Registration:</span>
                            <span className="font-semibold text-gray-900">Until March 28, 2025</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Call to Action */}
                <div className="text-center py-6 bg-gradient-to-r from-[#850101] to-[#650101] rounded-lg text-white">
                  <p className="text-lg font-semibold mb-4">
                    {region === "INT" 
                      ? "Challenge yourself. Discover your strengths. Join the Ei ATS International journey to academic excellence."
                      : "Unlock your child's academic brilliance through Ei ATS – a gateway to a world of gifted learning and global excellence."
                    }
                  </p>
                  <Button asChild className="bg-white text-[#850101] hover:bg-gray-100 font-semibold">
                    <a href="https://ats.ei.study/ats_registration.php" target="_blank" rel="noopener noreferrer">
                      Register Now for Ei ATS 2025
                    </a>
                  </Button>
                </div>

              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Testimonials from Students, Parents & Schools
            </h2>
            <p className="text-base text-gray-600 max-w-3xl mx-auto">
              Hear real success stories from our Ei ATS community - students achieving their dreams, 
              parents sharing their experiences, and schools partnering with us for excellence
            </p>
          </div>

          {/* Video Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {testimonials.slice(0, visibleCount).map((testimonial, index) => (
              <Card key={index} className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <div 
                  className="relative aspect-video overflow-hidden"
                  onClick={() => {
                    if (testimonial.isLocal) {
                      setSelectedVideo(testimonial.src!)
                    } else {
                      setSelectedVideo(getYouTubeEmbedUrl(testimonial.id))
                    }
                  }}
                >
                  <img
                    src={testimonial.isLocal ? "/placeholder.jpg" : getYouTubeThumbnail(testimonial.id)}
                    alt={testimonial.title || "Video thumbnail"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    data-video-id={testimonial.isLocal ? undefined : testimonial.id}
                    onError={testimonial.isLocal ? undefined : handleImageError}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                      <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  {testimonial.title && (
                    <h3 className="font-semibold text-[#850101] mb-2 group-hover:text-[#650101] transition-colors">
                      {testimonial.title}
                    </h3>
                  )}
                  {testimonial.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {testimonial.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < testimonials.length && (
            <div className="flex justify-center mt-10">
              <Button onClick={() => setVisibleCount(prev => prev + 12)} className="bg-[#850101] hover:bg-[#650101]">
                Load More
              </Button>
            </div>
          )}

          {/* Summary Stats */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-3xl font-bold text-[#850101] mb-2">{testimonials.length}</div>
              <div className="text-gray-600">Student Success Stories</div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {selectedVideo && (
        <VideoModal
          videoSrc={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      {/* Quick Access Section */}
      <section id="quick-access" className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Quick Access</h2>
            <p className="text-base text-gray-600">Most popular resources for Ei ATS preparation</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <Card className="flex flex-col h-full text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="flex flex-col flex-1 p-8 justify-between">
                <FileText className="h-12 w-12 text-[#850101] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Sample Papers</h3>
                <p className="text-gray-600 text-sm mb-4">Official Ei ATS sample questions</p>
                <Button asChild className="bg-[#850101] hover:bg-[#650101]">
                  <a
                    href="https://ei.study/wp-content/uploads/2025/01/Sample-Questions-Ei-ASSET-Final-File.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download PDF
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="flex flex-col h-full text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="flex flex-col flex-1 p-8 justify-between">
                <Video className="h-12 w-12 text-[#850101] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Live Webinars</h3>
                <p className="text-gray-600 text-sm mb-4">Expert-led preparation sessions</p>
                <Button asChild className="bg-[#850101] hover:bg-[#650101]">
                  <a href="https://ei.study/ei-webinars/" target="_blank" rel="noopener noreferrer">
                    Join Webinar
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="flex flex-col h-full text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="flex flex-col flex-1 p-8 justify-between">
                <Users className="h-12 w-12 text-[#850101] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">Bulk Registration</h3>
                <p className="text-gray-600 text-sm mb-4">Schools register multiple students</p>
                <Button asChild className="bg-[#850101] hover:bg-[#650101]">
                  <a href="/resources/bulk-registrations">
                    Learn More
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="flex flex-col h-full text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="flex flex-col flex-1 p-8 justify-between">
                <Globe className="h-12 w-12 text-[#850101] mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">AQAD Platform</h3>
                <p className="text-gray-600 text-sm mb-4">Performance analytics dashboard</p>
                <Button asChild className="bg-[#850101] hover:bg-[#650101]">
                  <a href="https://www.aqad.in" target="_blank" rel="noopener noreferrer">
                    Access Platform
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="resources-cta" className="py-8 bg-[#850101] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Need More Support?</h2>
          <p className="text-base text-gray-200 mb-8">
            Our team is here to help you make the most of these resources and succeed in Ei ATS 2025
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-[#850101] hover:bg-gray-100 font-semibold" asChild>
              <a href="/contact#send-message">
              Contact Support
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white bg-transparent hover:bg-white hover:text-[#850101] font-semibold"
              asChild
            >
              <a href="https://ats.ei.study/ats_registration.php" target="_blank" rel="noopener noreferrer">
                Register for Ei ATS 2025
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
