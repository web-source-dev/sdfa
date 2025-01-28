import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar } from "lucide-react"

export function BookingCTA() {
  return (
    <section className="bg-primary/5 py-20">
      <div className="container mx-auto px-4 text-center">
        <Calendar className="h-16 w-16 text-primary mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-4">Bereit für den ersten Schritt?</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Buchen Sie jetzt Ihr kostenloses Erstgespräch und lassen Sie uns gemeinsam Ihre Ziele erreichen.
        </p>
        <Button size="lg" asChild>
          <Link href="/book">Kostenloses Erstgespräch buchen</Link>
        </Button>
      </div>
    </section>
  )
}

