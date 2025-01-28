"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Star, Clock, Award } from "lucide-react"

const stats = [
  {
    title: "Zufriedene Klienten",
    value: "500+",
    icon: Users,
  },
  {
    title: "Jahre Erfahrung",
    value: "15+",
    icon: Clock,
  },
  {
    title: "Erfolgsrate",
    value: "95%",
    icon: Star,
  },
  {
    title: "Zertifizierungen",
    value: "12",
    icon: Award,
  },
]

export function Statistics() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <section ref={ref} className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className={`transition-all duration-1000 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <stat.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
              <p className="text-muted-foreground text-center">{stat.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

