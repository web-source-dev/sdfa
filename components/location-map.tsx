"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

const regions = [
  { id: "north", name: "Nord", active: true },
  { id: "east", name: "Ost", active: true },
  { id: "south", name: "Süd", active: true },
  { id: "west", name: "West", active: true },
]

export function LocationMap() {
  const [, setActiveRegions] = useState(regions)

  const toggleRegion = (id: string) => {
    setActiveRegions((prev) =>
      prev.map((region) => (region.id === id ? { ...region, active: !region.active } : region)),
    )
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Deutschlandweit für Sie da</h2>
          <p className="text-muted-foreground">Wählen Sie eine Region, um mehr über unsere Präsenz zu erfahren</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <Card className="relative aspect-[3/4] lg:aspect-square">
            <CardContent className="p-0 h-full">
              {/* Replace with actual Germany map SVG */}
              <div className="relative h-full bg-muted rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="h-12 w-12 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {regions.map((region) => (
                <Button
                  key={region.id}
                  variant={region.active ? "default" : "outline"}
                  onClick={() => toggleRegion(region.id)}
                  className="w-full"
                >
                  Region {region.name}
                </Button>
              ))}
            </div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Unsere Standorte</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• München (Hauptsitz)</li>
                  <li>• Berlin</li>
                  <li>• Hamburg</li>
                  <li>• Frankfurt</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

