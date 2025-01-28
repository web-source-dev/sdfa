"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Building2, Users2 } from "lucide-react"

interface CounterProps {
  end: number
  duration: number
  prefix?: string
  suffix?: string
}

function Counter({ end, duration, prefix = "", suffix = "" }: CounterProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = elementRef.current

    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  useEffect(() => {
    if (!isVisible) return

    const steps = 60
    const increment = end / steps
    const stepDuration = duration / steps
    let currentStep = 0

    const interval = setInterval(() => {
      if (currentStep < steps) {
        setCount(Math.min(Math.round(increment * currentStep), end))
        currentStep++
      } else {
        setCount(end)
        clearInterval(interval)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [end, duration, isVisible])

  return (
    <div ref={elementRef} className="text-4xl font-bold tabular-nums">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  )
}

export function ProjectCounter() {
  return (
    <section className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Projektsteuerung</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
              <Building2 className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-semibold">Gesamte Bausumme</h3>
              <Counter end={10000000} duration={2000} prefix="€ " />
              <p className="text-muted-foreground text-center">Erfolgreich verwaltete Projekte</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6 space-y-4">
              <Users2 className="h-12 w-12 text-primary" />
              <h3 className="text-xl font-semibold">Zufriedene Kunden</h3>
              <Counter end={150} duration={2000} suffix="+" />
              <p className="text-muted-foreground text-center">Deutschlandweit</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

