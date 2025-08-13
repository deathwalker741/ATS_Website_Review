"use client"

import { useState } from "react"
import { MessageCircle } from "lucide-react"
import dynamic from "next/dynamic"

const IntelligentChatbot = dynamic(() => import("./intelligent-chatbot"), { 
  ssr: false,
  loading: () => <div>Loading...</div>
})

export default function FloatingChat() {
  const [chatOpen, setChatOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setChatOpen(true)}
        aria-label="Open chat"
        className="fixed bottom-20 right-6 z-50 bg-[#850101] hover:bg-[#650101] text-white p-3 rounded-full shadow-lg btn-hover-lift transition-all duration-300"
      >
        <MessageCircle className="h-5 w-5" />
      </button>
      
      {chatOpen && <IntelligentChatbot open={chatOpen} onOpenChange={setChatOpen} />}
    </>
  )
} 