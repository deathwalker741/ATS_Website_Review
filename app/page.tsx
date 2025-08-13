import { MediaCarousel } from "@/components/media-carousel"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { GiftednessWithVideo } from "@/components/giftedness-with-video"
import { RewardsSection } from "@/components/rewards-section"
import { HistorySection } from "@/components/history-section"
import { PartnersCarousel } from "@/components/partners-carousel"
import { RoadmapSection } from "@/components/roadmap-section"
import { ExamInfo } from "@/components/exam-info"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { AlumniCTA } from "@/components/alumni-cta"
import { FAQSection } from "@/components/faq-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <MediaCarousel />
      <GiftednessWithVideo />
      <AboutSection />
      <RoadmapSection />
      <RewardsSection />
      <PartnersCarousel />
      <ExamInfo />
      <TestimonialsCarousel />
      <AlumniCTA />
      <HistorySection />
      <FAQSection />
    </main>
  )
}
