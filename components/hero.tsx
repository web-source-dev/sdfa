import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-background to-background/50 z-10" />
      <div className="container mx-auto px-4 relative z-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Verändern Sie Ihr Leben durch professionelles Coaching</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Entdecken Sie Ihr Potenzial und erreichen Sie Ihre Ziele mit persönlichen, auf Ihre Bedürfnisse zugeschnittenen Coaching-Sitzungen
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/book">Kostenlose Beratung buchen</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/#topics">Erfahren Sie mehr</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

