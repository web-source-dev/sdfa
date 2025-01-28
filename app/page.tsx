import { Hero } from "@/components/hero"
import { CoachingTopics } from "@/components/coaching-topics"
import { ProjectCounter } from "@/components/project-counter"
import { LocationMap } from "@/components/location-map"
import { FAQSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import { BookingCTA } from "@/components/booking-cta"
import { MusicPlayer } from "@/components/music-player"

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <CoachingTopics />
      <ProjectCounter />
      <LocationMap />
      <FAQSection />
      <ContactSection />
      <BookingCTA />
      <MusicPlayer />
    </div>
  )
}

