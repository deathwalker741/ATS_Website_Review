"use client"

import React, { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, X, Bot, User, Loader2, Star, BarChart3, ExternalLink } from "lucide-react"
import { chatStorage, saveChatMessage, getChatHistory, endChatSession, clearChatData } from "@/lib/chat-storage"
import { useRegion } from "@/components/region-context"
import { REGIONAL_DATES } from "@/lib/dates"
import type { ChatMessage } from "@/lib/chat-storage"

interface Props {
  open: boolean
  onOpenChange: (o: boolean) => void
}

// Comprehensive website content knowledge base
const createComprehensiveKnowledgeBase = (region: "IND" | "INT") => {
  const dates = REGIONAL_DATES[region]
  const isInternational = region === "INT"
  
  return `You are an intelligent assistant EXCLUSIVELY for Ei ATS ${isInternational ? "International" : ""} (Educational Initiatives Academic Talent Search). You have COMPLETE knowledge of the entire website and can provide direct links to specific pages.

STRICT GUIDELINES:
- ONLY answer questions about Ei ATS, registration, exams, universities, programmes, eligibility, dates, fees, or contact information
- If asked about ANYTHING unrelated to Ei ATS, politely decline and redirect to Ei ATS topics
- ALWAYS provide direct links to relevant website pages when appropriate
- Provide information specific to the ${isInternational ? "International" : "India"} region
- Be helpful and guide users to the exact information they need

COMPREHENSIVE WEBSITE KNOWLEDGE:

📋 **MAIN TEST INFORMATION (${isInternational ? "International" : "India"} 2025):**
- Test Window: ${dates.testWindow}
- Format: Online proctored test, 60 minutes per subject
- Subjects: English, Maths, Science (choose 1, 2, or all 3)
- Level: Two grades above student's current level
- No preparation required, no negative marking
- Registration: https://ats.ei.study/ats_registration.php

💰 **FEES & REGISTRATION:**
- ${isInternational ? "International" : "India"} Fees: ${isInternational ? "AED 170-300 per subject" : "INR 1700-3300 per subject"}
- Registration Deadlines: Early (${dates.early}), Regular (${dates.regular}), Late (${dates.late})
- Registration Link: https://ats.ei.study/ats_registration.php

✅ **ELIGIBILITY & QUALIFICATION CRITERIA:**

**Primary Qualification (ASSET Test):**
1. Students who scored more than 85 percentile in either English, Maths, or Science ASSET exam
2. If a student didn't take part in ASSET, they can take ASSET Online test
3. If they score more than 85 percentile in either English, Maths, or Science ASSET exam, they qualify for ATS

**Alternative Qualification (CAT4):**
- Students scoring Stanine 9 in CAT4 can also register for ATS

**Registration Process:**
1. Students must have their ASSET PAN ID to register for the ATS test
2. Students can find their ASSET PAN ID in the student "My Book" report of ASSET test
3. If students are unable to find their PAN, they can use the ASSET PAN ID Retriever tool
4. Fill all required details and submit - PAN ID will be received in popup
5. Take note of PAN ID and enter in registration form with other required details
6. Complete the registration process

🏆 **RECOGNITION & AWARDS:**
- Bronze Scholar (85-89%): Certificate + Medal
- Silver Scholar (90-94%): Certificate + Medal  
- Gold Scholar (95-99%): Certificate + Medal
- Top grade toppers: Eligible for iPads, tablets, Kindles, Apple Watches

🎓 **UNIVERSITY PARTNERS & SUMMER PROGRAMS:**

**Summer Program Registration:**
- Students can directly reach out to University partners using provided contact information
- Can use ATS Score to get admitted in their summer camp programmes
- For International programmes, Ei doesn't help with Visa - students must handle it themselves

**University Partners:**

1. **Johns Hopkins CTY** (https://cty.jhu.edu/)
   - Global leader in gifted education since 1979
   - Grades 2-12, accredited online and on-campus courses
   - Eligibility: 98th percentile in English or Math
   - Contact: ctyinfo@jhu.edu
   - Website: /programmes/cty

2. **Northwestern CTD** (https://www.ctd.northwestern.edu/)
   - Top-10 U.S. research university
   - Ages 3-12, residential and online programs
   - Eligibility: ≥90th percentile direct, <90th percentile via portfolio
   - Contact: s-corwith@northwestern.edu
   - Website: /programmes/northwestern

3. **UC Berkeley ATDP** (https://atdp.berkeley.edu/)
   - World's #1 public university
   - Grades 7-10, four-week residential program
   - Eligibility: 80th percentile priority, 50-79th percentile portfolio review
   - Contact: BerkeleyATDP@cfmedu.com
   - Website: /programmes/uc-berkeley

4. **Purdue GER2I** (https://www.education.purdue.edu/geri/)
   - STEM and humanities focus
   - Grades 5-12, COMET/STAR/PULSAR programs
   - Eligibility: ≥90th percentile direct
   - Contact: geri@purdue.edu
   - Website: /programmes/purdue

5. **SIG** (https://www.giftedstudy.org/)
   - Prestigious partner institutions
   - Ages 5-17, 2-3 week residential
   - Eligibility: ≥90th percentile
   - Contact: info@giftedstudy.org
   - Website: /programmes/sig

6. **GENWISE** (https://www.genwise.in/)
   - Computational thinking focus
   - Grades 6-10, residential/online
   - Eligibility: Ei ATS qualification + strong Math/Science
   - Contact: info@genwise.in
   - Website: /programmes/genwise

📚 **RESOURCES & SUPPORT:**

**Educational Resources (/resources):**
- Webinars: Expert-led sessions on exam preparation and university applications
- Blog: Success stories, expert insights, study tips, university guides
- Sample Papers: Official Ei ATS sample papers with answer keys
- Articles & Research: Curated links to gifted education research
- AQAD Platform: Daily skill-based questions for classes 3-9
- Ei ATS Brochure: Comprehensive programme information
- Official Sample Papers: https://ei.study/wp-content/uploads/2025/01/Sample-Questions-Ei-ASSET-Final-File.pdf

**Bulk Registration Resources (/resources/bulk-registrations):**
- Excel template for bulk student registration
- 4-step process for schools
- 10% cost savings for bulk registrations
- Contact: eitalentsearch@ei.study

**Articles & Research (/resources/articles):**
- Curated reading list on gifted education
- Research papers and expert insights
- Success stories and case studies

👨‍👩‍👧‍👦 **PARENT INFORMATION:**

**For Parents (/for-parents):**
- Test Details: Format, eligibility, important dates
- Non-ASSET Students: ASSET Online qualification route
- Financial Aid: Application process for scholarships
- FAQ: Common parent questions and answers

**Test Details for Parents:**
- Format: Online computer-based assessment
- Eligibility: Grades 4-8, top 15th percentile
- Important Dates: ${dates.early}, ${dates.regular}, ${dates.late}
- Test & Result Dates: ${dates.testWindowShort}, ${dates.results}

**Non-ASSET Students:**
- Can take ASSET Online test to qualify
- Process: Register → Buy test → Take test → Read report → Qualify for Ei ATS
- Pricing: India ₹600, International USD 6
- Link: https://www.assetonline.in/asset_online/index.php#

**Financial Aid:**
- Available for students with low financial resources
- Application: https://test.assettalentsearch.com/ats/asset_talent_search/financial_aid.php
- Review: Within 7 days
- Contact: eitalentsearch@ei.study

📞 **CONTACT & SUPPORT:**

**Contact Page Details (/contact):**
- Contact Form: Send messages with name, email, phone, subject, message
- Office Address: The CUBE - Karle Town Center, Bengaluru, India
- CIN: U80211GJ2000PTC038692103
- Email: ${isInternational ? "atsinternational@ei.study" : "eitalentsearch@ei.study"}
- Phone: +91 80 4718 7451
- Hours: Monday - Saturday, 9:00 AM - 6:00 PM IST

**Contact Page FAQs:**
- Registration deadline: Early Bird – ${dates.early}, Regular – ${dates.regular}, Late – ${dates.late}
- Exam format: Online computer-based test with English, Math, and Science (60 minutes each)
- Eligibility: Students in grades 4-8 who scored in the top 15th percentile in any subject
- Results access: Available through student portal using PAN ID

**Schedule Call with Alumni (/schedule-call):**
- Process: Fill form to connect with Ei ATS alumni
- Form fields: Student Name, Email, School, Grade, Questions/Topics
- Purpose: Get answers and share alumni experience
- Contact: Alumni will reach out shortly after submission

🏫 **SCHOOL-SPECIFIC INFORMATION:**

**School Dashboard (/for-schools):**
- Bulk Registration Tool: Register multiple students, 10% discount
- School Admin Login: Manage registrations, view results, track qualifiers
- Student Nomination: Non-ASSET schools can nominate top 15% students

**Bulk Registration Process:**
- Eligibility: Schools with 100+ qualifiers (25% minimum) or <100 qualifiers (50% minimum)
- Benefits: 10% discount on registration fee
- Contact: eitalentsearch@ei.study

**Non-ASSET Schools:**
- Can nominate up to top 15% academically talented students
- Process: Send student details from official school email
- Contact: eitalentsearch@ei.study
- Download form: /ATS%20Registration%20Form%20for%20non%20ASSET%20schools-2025.xlsx

**School Benefits:**
- Identify gifted students
- Access performance analytics
- Streamlined registration
- Recognition for achievements
- Professional development opportunities
- Partnership with leading programs

📋 **LEGAL & POLICY INFORMATION:**

**Privacy Policy (/privacy):**
- Information collected: Personal info, payment details, usage data
- Use: Competition participation, payments, communication, improvements
- Sharing: Service providers only, no commercial sale
- Security: Reasonable measures taken
- Contact: competition@ei.study
- Governing law: India

**Terms & Conditions (/terms):**
- Registration fee: ${isInternational ? "AED 170-300" : "INR 1700-3300"} (${isInternational ? "International" : "India"})
- Eligibility: Grades 3-10 students
- User conduct: Respectful and lawful behavior
- Intellectual property: All content belongs to Educational Initiatives
- Liability: Limited liability for damages
- Contact: competition@ei.study
- Governing law: India (Ahmedabad jurisdiction)

**Refund Policy (/refund):**
- Fee: ${isInternational ? "AED 170-300" : "INR 1700-3300"} (${isInternational ? "International" : "India"})
- Refund eligibility: Only for technical glitches from Educational Initiatives
- Process: Contact ${isInternational ? "atsinternational@ei.study" : "eitalentsearch@ei.study"} within 7 days
- Approval: Within 14 days
- Payment: Original method (card back to card)
- No processing fee for technical glitches
- Currency: Refunds in ${isInternational ? "AED" : "INR"}, variations due to fluctuations

🔧 **STUDENT TOOLS & PORTALS:**

**Student Portal Access:**
- Access results using PAN ID
- Available through student portal
- Contact support for access issues

**Ei ASSET PAN ID Retriever:**
- Purpose: Retrieve your unique Ei ASSET PAN ID for Ei ATS registration
- Process: Use the online tool to recover your PAN ID if forgotten
- Link: https://learn.lab-ei.study/asset/ATS/ASSET_PAN/asset_pan_gpt/forgot_asset_pan.html
- Features: Retrieve PAN ID, forgot PAN ID recovery
- For: Students who have forgotten their ASSET PAN ID
- Process: Fill all required details, submit, receive PAN ID in popup

**Student Test Portal:**
- Access personalized dashboard
- View test results and track progress
- Practice with mock tests
- Take Ei ATS test
- Link: https://ats.ei.study/student_portal/index.php

**Where Students Take the ATS Test:**
- Once registered for ATS test, students can take the test from Student Test Portal
- Test Portal Link: https://ats.ei.study/student_portal/index.php
- Login with credentials shared via email after registration
- Test is conducted online through the student portal
- Students receive login credentials by email after successful registration

**Ei ATS Qualifying Certificate:**
- Download certificates
- Link: https://ats.ei.study/ats_qualifier_certificate.php

**Awards & Recognition:**
- View complete list of winners and scholars
- See where you stand among the best
- Link: https://ats.ei.study/reward_winners_india.php

🔗 **IMPORTANT LINKS:**

**Registration & Main Pages:**
- Main Registration: https://ats.ei.study/ats_registration.php
- Homepage: /
- For Parents: /for-parents
- For Schools: /for-schools
- For Students: /for-students
- Programmes: /programmes
- Resources: /resources
- Contact: /contact

**Student Tools:**
- Student Portal: https://ats.ei.study/student_portal/index.php
- PAN ID Retriever: https://learn.lab-ei.study/asset/ATS/ASSET_PAN/asset_pan_gpt/forgot_asset_pan.html
- Qualifying Certificate: https://ats.ei.study/ats_qualifier_certificate.php
- Awards & Recognition: https://ats.ei.study/reward_winners_india.php

**School Tools:**
- School Login: /for-schools/login
- School Dashboard: /for-schools/dashboard
- Student Management: /for-schools/students
- Bulk Registration: /resources/bulk-registrations

**Resources:**
- Webinars: https://ei.study/ei-webinars/
- Blog: https://ei.study/blogs/
- Sample Papers: https://ei.study/wp-content/uploads/2025/01/Sample-Questions-Ei-ASSET-Final-File.pdf
- AQAD Platform: https://www.aqad.in
- Articles: /resources/articles

**External Tools:**
- ASSET Online: https://www.assetonline.in/asset_online/index.php#
- Financial Aid: https://test.assettalentsearch.com/ats/asset_talent_search/financial_aid.php

**RESPONSE RULES:**
- Always provide specific, accurate information
- Include direct links when relevant
- Be helpful and guide users to exact information
- For registration questions: Direct to https://ats.ei.study/ats_registration.php
- For PAN ID questions: Direct users to the specific PAN ID Retriever tool
- For qualification questions: Provide the specific 85 percentile criteria and CAT4 Stanine 9 alternative
- For registration process: Explain the step-by-step PAN ID requirement and retrieval process
- For summer programs: Mention direct contact with universities and visa responsibility
- For school bulk registration: Explain the 10% discount and eligibility criteria
- For non-ASSET students: Guide to ASSET Online qualification route
- For financial aid: Provide the application link and process
- For contact information: Provide region-specific email addresses
- For test dates: Use the specific regional dates provided
- For fees: Use region-specific pricing information

Remember: You have COMPLETE knowledge of the website and can guide users to any specific page or information they need. Always provide direct links when relevant.`
}

// Function to provide direct links based on user queries
const getDirectLinks = (query: string, isInternational: boolean) => {
  const links: { [key: string]: string } = {
    // Core pages
    'register': 'https://ats.ei.study/ats_registration.php',
    'registration': 'https://ats.ei.study/ats_registration.php',
    'sign up': 'https://ats.ei.study/ats_registration.php',
    'apply': 'https://ats.ei.study/ats_registration.php',
    
    // University partners
    'university': '/programmes',
    'universities': '/programmes',
    'partners': '/programmes',
    'johns hopkins': '/programmes/cty',
    'northwestern': '/programmes/northwestern',
    'berkeley': '/programmes/uc-berkeley',
    'purdue': '/programmes/purdue',
    'sig': '/programmes/sig',
    'genwise': '/programmes/genwise',
    
    // Resources
    'resources': '/resources',
    'sample': 'https://ei.study/wp-content/uploads/2025/01/Sample-Questions-Ei-ASSET-Final-File.pdf',
    'papers': 'https://ei.study/wp-content/uploads/2025/01/Sample-Questions-Ei-ASSET-Final-File.pdf',
    'preparation': '/resources',
    'aqad': 'https://www.aqad.in',
    'webinar': 'https://ei.study/ei-webinars/',
    'blog': 'https://ei.study/blogs/',
    
    // Audience pages
    'parents': '/for-parents',
    'parent': '/for-parents',
    'students': '/for-students',
    'student': '/for-students',
    'schools': '/for-schools',
    'school': '/for-schools',
    
    // Contact and support
    'contact': '/contact',
    'support': '/contact',
    'help': '/contact',
    'email': '/contact',
    'phone': '/contact',
    'office': '/contact',
    'address': '/contact',
    
    // Schedule call
    'alumni': '/schedule-call',
    'schedule': '/schedule-call',
    'call': '/schedule-call',
    
    // School-specific
    'bulk': '/for-schools',
    'nomination': '/for-schools',
    'admin': '/for-schools/login',
    'dashboard': '/for-schools',
    'school admin': '/for-schools/login',
    'school login': '/for-schools/login',
    
    // Legal and policies
    'privacy': '/privacy',
    'terms': '/terms',
    'refund': '/refund',
    'policy': '/privacy',
    'legal': '/terms',
    
    // Student tools and PAN ID
    'pan id': 'https://learn.lab-ei.study/asset/ATS/ASSET_PAN/asset_pan_gpt/forgot_asset_pan.html',
    'panid': 'https://learn.lab-ei.study/asset/ATS/ASSET_PAN/asset_pan_gpt/forgot_asset_pan.html',
    'asset pan': 'https://learn.lab-ei.study/asset/ATS/ASSET_PAN/asset_pan_gpt/forgot_asset_pan.html',
    'forgot pan': 'https://learn.lab-ei.study/asset/ATS/ASSET_PAN/asset_pan_gpt/forgot_asset_pan.html',
    'retrieve pan': 'https://learn.lab-ei.study/asset/ATS/ASSET_PAN/asset_pan_gpt/forgot_asset_pan.html',
    'student portal': 'https://ats.ei.study/student_portal/index.php',
    'results access': 'https://ats.ei.study/student_portal/index.php',
    'certificate': 'https://ats.ei.study/ats_qualifier_certificate.php',
    'qualifying certificate': 'https://ats.ei.study/ats_qualifier_certificate.php',
    'awards': 'https://ats.ei.study/reward_winners_india.php',
    'recognition': 'https://ats.ei.study/reward_winners_india.php',
    'winners': 'https://ats.ei.study/reward_winners_india.php',
    
    // Additional resources
    'articles': '/resources/articles',
    'bulk registration': '/resources/bulk-registrations',
    'non asset': '/for-schools',
    'non-asset': '/for-schools',
    
    // Sample papers direct link
    'sample papers': 'https://ei.study/wp-content/uploads/2025/01/Sample-Questions-Ei-ASSET-Final-File.pdf',
    'sample questions': 'https://ei.study/wp-content/uploads/2025/01/Sample-Questions-Ei-ASSET-Final-File.pdf',
    'practice papers': 'https://ei.study/wp-content/uploads/2025/01/Sample-Questions-Ei-ASSET-Final-File.pdf',
    
    // Brochures
    'brochure': isInternational ? 
      'https://ats.ei.study/documents/ATS-International2024.pdf' : 
      'https://ats.ei.study/documents/ATS-India2024.pdf',
    
    // Non-ASSET school form
    'non asset form': '/ATS%20Registration%20Form%20for%20non%20ASSET%20schools-2025.xlsx',
    'nomination form': '/ATS%20Registration%20Form%20for%20non%20ASSET%20schools-2025.xlsx',
  }
  
  const lowerQuery = query.toLowerCase()
  
  // Check for exact matches first
  for (const [keyword, link] of Object.entries(links)) {
    if (lowerQuery.includes(keyword)) {
      return link
    }
  }
  
  // Check for partial matches
  for (const [keyword, link] of Object.entries(links)) {
    const keywordWords = keyword.split(' ')
    if (keywordWords.length > 1) {
      const allWordsPresent = keywordWords.every(word => lowerQuery.includes(word))
      if (allWordsPresent) {
        return link
      }
    }
  }
  
  return null
}

export default function IntelligentChatbot({ open, onOpenChange }: Props) {
  const { region } = useRegion()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState<number | null>(null)
  const [showRating, setShowRating] = useState(false)
  const [showFeedbackAfterClose, setShowFeedbackAfterClose] = useState(false)
  const [conversationEnded, setConversationEnded] = useState(false)
  const logRef = useRef<HTMLDivElement>(null)

  // Initialize with welcome message and load history
  useEffect(() => {
    const initializeChat = async () => {
      // Load chat history
      try {
        const history = await getChatHistory(20)
        if (history.length > 0) {
          setMessages(history)
        } else {
          // Set welcome message if no history
          const isInternational = region === "INT"
          setMessages([{
            id: 'welcome',
            text: `Hello! I'm your intelligent Ei ATS ${isInternational ? "International" : ""} assistant. I have complete knowledge of our website and can help you with:

🎯 **What I can help with:**
• Registration process and deadlines
• Exam details and preparation materials
• University partnerships and programs
• Resources, sample papers, and webinars
• Contact information and support
• Direct links to specific pages

What would you like to know about? I can guide you to the exact information you need!`,
            isBot: true,
            timestamp: new Date()
          }])
        }
      } catch (error) {
        console.warn('Failed to load chat history:', error)
        // Fallback to welcome message
        const isInternational = region === "INT"
        setMessages([{
          id: 'welcome',
          text: `Hello! I'm your intelligent Ei ATS ${isInternational ? "International" : ""} assistant. I can guide you to any information on our website. What would you like to know?`,
          isBot: true,
          timestamp: new Date()
        }])
      }
    }

    if (open) {
      initializeChat()
      // Reset feedback states when opening dialog
      setShowFeedbackAfterClose(false)
      setConversationEnded(false)
      setUserRating(null)
    }
  }, [open, region])

  useEffect(() => {
    if (open) setTimeout(() => logRef.current?.scrollIntoView({ behavior: "smooth" }), 100)
  }, [messages, open])

  const addMessage = (msg: ChatMessage) => {
    setMessages((m) => [...m, msg])
    // Save to storage
    saveChatMessage(msg).catch(error => {
      console.warn('Failed to save message:', error)
    })
  }

  const callAI = async (userMessage: string): Promise<string> => {
    const startTime = Date.now()
    
    try {
      // Build conversation context
      const recentMessages = messages
        .slice(-6) // Last 6 messages for context
        .map(m => ({
          role: m.isBot ? "assistant" : "user",
          content: m.text
        }));

      const systemPrompt = createComprehensiveKnowledgeBase(region)

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemPrompt },
            ...recentMessages,
            { role: "user", content: userMessage }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
      }

      const data = await response.json();
      const responseTime = Date.now() - startTime
      
      // Check if we got a valid response
      if (data.response && data.response.trim() !== "") {
        return data.response;
      }
      
      // If no valid response, throw error to trigger fallback
      throw new Error('No valid response from AI');
    } catch (error) {
      console.warn('AI API Error:', error)
      const isInternational = region === "INT"
      return `I'm experiencing some technical difficulties right now. For immediate assistance, please contact our support team at ${isInternational ? "atsinternational@ei.study" : "eitalentsearch@ei.study or call +91 80 4718 7451"}.`;
    }
  }

  const send = async () => {
    const trimmed = input.trim()
    if (!trimmed || isLoading) return

    const startTime = Date.now()

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: trimmed,
      isBot: false,
      timestamp: new Date()
    }
    addMessage(userMessage)
    setInput("")
    setIsLoading(true)

    try {
      // Get AI response
      const aiResponse = await callAI(trimmed)
      const responseTime = Date.now() - startTime
      
      // Check if we should add a direct link
      const isInternational = region === "INT"
      const directLink = getDirectLinks(trimmed, isInternational)
      
      let finalResponse = aiResponse
      if (directLink && !aiResponse.includes(directLink)) {
        finalResponse += `\n\n🔗 **Direct Link:** [Click here](${directLink})`
      }
      
      // Add bot response with metadata
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: finalResponse,
        isBot: true,
        timestamp: new Date(),
        metadata: {
          responseTime,
          confidence: 0.95 // You could implement actual confidence scoring
        }
      }
      addMessage(botMessage)
    } catch (error) {
      console.warn('Error getting AI response:', error)
      const isInternational = region === "INT"
      addMessage({
        id: (Date.now() + 1).toString(),
        text: `I apologize, but I'm having trouble connecting right now. Please contact our support team directly at ${isInternational ? "atsinternational@ei.study" : "eitalentsearch@ei.study"} for immediate assistance.`,
        isBot: true,
        timestamp: new Date()
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRating = (rating: number) => {
    setUserRating(rating)
    if (showFeedbackAfterClose) {
      setShowFeedbackAfterClose(false)
    } else {
    setShowRating(false)
    }
    endChatSession(rating)
  }

  const dismissRating = () => {
    if (showFeedbackAfterClose) {
      setShowFeedbackAfterClose(false)
    } else {
    setShowRating(false)
    }
  }

  const clearChat = () => {
    const isInternational = region === "INT"
    setMessages([{
      id: 'welcome-new',
      text: `Hello! I'm your intelligent Ei ATS ${isInternational ? "International" : ""} assistant. I can guide you to any information on our website. What would you like to know?`,
      isBot: true,
      timestamp: new Date()
    }])
    setUserRating(null)
    setShowRating(false)
    setShowFeedbackAfterClose(false)
    setConversationEnded(false)
    clearChatData()
  }

  const handleClose = () => {
    // Mark conversation as ended if there were messages
    if (messages.length > 1) {
      setConversationEnded(true)
      setShowFeedbackAfterClose(true)
    }
    
    // End session when closing
    if (userRating) {
      endChatSession(userRating)
    }
    onOpenChange(false)
  }

  const isInternational = region === "INT"

  return (
    <>
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] flex flex-col h-[80vh]">
        <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-[#850101]" />
              <DialogTitle className="text-lg font-semibold">Ei ATS {isInternational ? "International" : ""} AI Assistant</DialogTitle>
            {/* Removed session number from header */}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={clearChat}
              className="text-xs"
            >
              Clear Chat
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              aria-label="Close chat"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4" aria-live="polite">
                  {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              {message.isBot && (
                <div className="w-8 h-8 rounded-full bg-[#850101] flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                        </div>
              )}
              <div className={`max-w-[80%] rounded-lg px-3 py-2 ${
                            message.isBot 
                  ? 'bg-gray-100 text-gray-900' 
                              : 'bg-[#850101] text-white'
                          }`}>
                <div className="text-sm whitespace-pre-wrap">{message.text}</div>
                <div className="text-xs opacity-70 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                  {/* Removed response time (xxx ms) from message UI */}
                </div>
                      </div>
              {!message.isBot && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                  <User className="h-4 w-4 text-gray-600" />
                </div>
              )}
                    </div>
                  ))}
                  
          {isLoading && (
            <div className="flex justify-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#850101] flex items-center justify-center">
                <Loader2 className="h-4 w-4 text-white animate-spin" />
                        </div>
              <div className="bg-gray-100 rounded-lg px-3 py-2">
                <div className="text-sm text-gray-600">AI is thinking...</div>
                          </div>
                        </div>
          )}
          <div ref={logRef} />
        </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask me anything about Ei ATS ${isInternational ? "International" : ""}...`}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send())}
              disabled={isLoading}
                  className="flex-1"
                />
                <Button
              onClick={send}
              disabled={isLoading || !input.trim()}
              size="icon"
                  className="bg-[#850101] hover:bg-[#650101]"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

    </div>
      </DialogContent>
    </Dialog>

      {/* Post-Conversation Feedback */}
      {showFeedbackAfterClose && conversationEnded && (
        <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg border p-4 max-w-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium text-gray-900">How helpful was this conversation?</div>
            <Button
              variant="ghost"
              size="sm"
              onClick={dismissRating}
              className="h-6 w-6 p-0 hover:bg-gray-200"
              aria-label="Dismiss feedback"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Button
                key={rating}
                variant="ghost"
                size="sm"
                onClick={() => handleRating(rating)}
                className="p-1 hover:bg-gray-100"
              >
                <Star className="h-4 w-4 text-yellow-400" />
              </Button>
            ))}
          </div>
          <div className="text-xs text-gray-500">
            Your feedback helps us improve our service
          </div>
        </div>
      )}
    </>
  )
} 