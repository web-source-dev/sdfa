"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Kontaktieren Sie uns</h2>
            <p className="text-muted-foreground mb-8">
              Haben Sie Fragen oder möchten Sie einen Termin vereinbaren? Kontaktieren Sie uns - wir sind für Sie da.
            </p>
            <div className="space-y-6">
              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <Phone className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-sm mb-1">Telefon</CardTitle>
                    <p className="text-muted-foreground">+49 178 4080561</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <Mail className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-sm mb-1">E-Mail</CardTitle>
                    <p className="text-muted-foreground">info@adaequat.design</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-center gap-4 p-6">
                  <MapPin className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle className="text-sm mb-1">Adresse</CardTitle>
                    <p className="text-muted-foreground">München, Deutschland</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Nachricht senden</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input
                    placeholder="Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="E-Mail"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Telefon"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Ihre Nachricht"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="min-h-[150px]"
                  />
                </div>
                <Button type="submit" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Nachricht senden
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

