"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { CalendarIcon, Clock, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import axios from "axios"

// Custom Toast Component
interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`rounded-md text-center shadow-lg ${type === 'success' ? 'text-green-500' : type === 'error' ? 'text-red-500' : 'text-blue-500'} text-white`}>
      {message}
    </div>
  )
}

const timeSlots = [
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
]

export default function BookingPage() {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>()
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null)

  const handleSubmit = async () => {
    if (!date || !time || !name || !email || !phone || !message) {
      setToast({ message: "Bitte füllen Sie alle Felder aus", type: "error" })
      return
    }
    setLoading(true)
    setToast({ message: "Buchung wird verarbeitet...", type: "info" })

    const formData = {
      date: date ? format(date, "PPP") : "",
      time,
      name,
      email,
      phone,
      message,
    }

    try {
      await axios.post("https://consultation-ten.vercel.app/api/consultation/form/21654665456454545454758784545", formData)
      setTimeout(() => {
        setToast({ message: "Termin erfolgreich gebucht!", type: "success" })
        // Clear the fields after submission
        setDate(undefined)
        setTime("")
        setName("")
        setEmail("")
        setPhone("")
        setMessage("")
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error submitting form", error)
      setToast({ message: "Fehler beim Buchen des Termins", type: "error" })
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="relative max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Unverbindliches Vorgespräch mit Coach Kai</CardTitle>
            <CardDescription>Wählen Sie einen passenden Termin für Ihr kostenloses Erstgespräch</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Datum auswählen</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Datum wählen"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Uhrzeit auswählen</label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={time === slot ? "default" : "outline"}
                      className="w-full"
                      onClick={() => setTime(slot)}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ihr vollständiger Name" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">E-Mail</label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ihre.email@beispiel.de" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Telefon</label>
                <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+49" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Nachricht (optional)</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Teilen Sie uns mit, worum es in dem Gespräch gehen soll"
                  className="min-h-[100px]"
                />
              </div>
            </div>
            <Button size="lg" className="w-full" onClick={handleSubmit} disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Termin buchen"}
            </Button>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            <p className="text-sm text-muted-foreground text-center">
              Durch die Buchung stimmen Sie unseren{" "}
              <a href="/privacy" className="underline">
                Datenschutzbestimmungen
              </a>{" "}
              zu
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

