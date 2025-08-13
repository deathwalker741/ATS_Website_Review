"use client"

import React from "react"
import { useRegion } from "@/components/region-context"
import { REGIONAL_DATES } from "@/lib/dates"

export default function NotificationBar() {
  const { region } = useRegion()
  const dates = REGIONAL_DATES[region]
  
  const messages = React.useMemo(() => {
    return [
      `Early Bird Registration Close Date: ${dates.early}`,
      `Test Dates: ${dates.testWindow}`,
    ]
  }, [dates])

  return (
    <div className="bg-[#650101] text-white overflow-hidden whitespace-nowrap fixed top-16 left-0 right-0 z-40 h-8 flex items-center">
      <div className="inline-block animate-[marquee_25s_linear_infinite] px-4">
        <span className="font-semibold mr-4">Important Dates:</span>
        {messages.map((msg, idx) => (
          <span key={idx} className="mr-10">
            {msg}
          </span>
        ))}
      </div>
    </div>
  )
} 