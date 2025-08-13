"use client"

import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 bg-black hover:bg-[#262626] text-white p-3 rounded-full shadow-lg btn-hover-lift transition-all duration-300"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
} 