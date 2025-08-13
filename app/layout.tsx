import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import BackToTopButton from "@/components/back-to-top"
import FloatingChat from "@/components/floating-chat"
import { Toaster } from "@/components/ui/toaster"
import NotificationBar from "@/components/notification-bar"
import { RegionProvider } from "@/components/region-context"
import { FloatingRegisterButton } from "@/components/floating-register-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ei ASSET Talent Search - Identifying Gifted Students Globally",
  description:
    "Educational Initiatives' comprehensive platform for identifying and nurturing academically gifted students through rigorous assessment and world-class educational opportunities.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth no-scrollbar overflow-x-hidden">
      <body className={`${inter.className} overflow-x-hidden no-scrollbar`}>
        <RegionProvider>
          <Header />
          <NotificationBar />
          <main className="pt-24">
            {children}
            <Footer />
          </main>
          <FloatingChat />
        </RegionProvider>
        <BackToTopButton />
        <FloatingRegisterButton />
        <Toaster />
      </body>
    </html>
  )
}
