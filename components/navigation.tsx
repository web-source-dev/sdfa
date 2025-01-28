"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "@/components/theme-switcher"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Adaequat
        </Link>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </Button>

        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } md:flex absolute md:relative top-16 md:top-0 left-0 right-0 flex-col md:flex-row items-center gap-4 bg-background md:bg-transparent p-4 md:p-0`}
        >
          <ThemeSwitcher />

          <Link href="/#topics" className="hover:text-primary transition-colors">
            Coaching-Themen
          </Link>
          <Link href="/#about" className="hover:text-primary transition-colors">
            über uns
          </Link>
          <Link href="/#faq" className="hover:text-primary transition-colors">
            FAQ
          </Link>
          <Link href="/contact" className="hover:text-primary transition-colors">
            Kontakt
          </Link>
          <Button asChild>
            <Link href="/book">Buchberatung</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}

