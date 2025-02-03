"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from "date-fns"
import { CalendarIcon, Clock, Loader2} from "lucide-react"
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
    <div className={`rounded-md text-center shadow-lg p-2 ${type === 'success' ? 'text-green-500' : type === 'error' ? 'text-red-500' : 'text-blue-500'} `}>
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

function SuccessPage({ formData }: { formData: any }) {
  const { date, time, name, phone } = formData

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="relative w-full max-w-[550px] overflow-hidden p-2 mx-auto shadow-none border-none">
        <div className="flex items-center gap-2 justify-center">
          <div className="rounded-full p-1">
          </div>
          <h1 className="text-xl font-semibold text-emerald-600 text-center">Sie haben einen Termin</h1>
        </div>

        <p className="mt-2 text-sm text-gray-600 text-center">
          Eine Kalendereinladung wurde an Ihre E-Mail-Adresse gesendet.
        </p>

        <div className="mt-6 p-6 border border-gray-200 rounded-lg w-full">
          <h2 className="text-lg flex items-start font-semibold text-center">
            Unverbindliches Vorgespräch mit Coach Kai
          </h2>
          
          <div className="mt-4 space-y-4">
            <div className="flex items-start gap-3">
              <div>
                <p className="font-medium">{name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div>
                <p className="font-medium">{time}, {date}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div>
                <p className="text-sm text-gray-600">Mitteleuropäische Zeit</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div>
                <p className="font-medium">{phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="mt-2 text-sm text-gray-600">
            Vermeiden Sie ewiges Hin und Her per E-Mail um eine Zeit zu finden.
          </p>
        </div>
      </Card>
    </div>
  )
}

export default function BookingPage() {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>()
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [formData, setFormData] = useState<any>(null)

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  const validatePhone = (phone: string) => {
    const re = /^\+?[1-9]\d{1,14}$/
    return re.test(String(phone))
  }

  const handleBlur = (field: string) => {
    const newErrors = { ...errors }
    if (field === "email" && (!email || !validateEmail(email))) {
      newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein"
    } else if (field === "phone" && (!phone || !validatePhone(phone))) {
      newErrors.phone = "Bitte geben Sie eine gültige Telefonnummer ein"
    } else {
      delete newErrors[field]
    }
    setErrors(newErrors)
  }

  const handleSubmit = async () => {
    const newErrors: { [key: string]: string } = {}
    if (!date) newErrors.date = "Bitte wählen Sie ein Datum"
    if (!time) newErrors.time = "Bitte wählen Sie eine Uhrzeit"
    if (!name) newErrors.name = "Bitte geben Sie Ihren Namen ein"
    if (!email || !validateEmail(email)) newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein"
    if (!phone || !validatePhone(phone)) newErrors.phone = "Bitte geben Sie eine gültige Telefonnummer ein"
    if (!message) newErrors.message = "Bitte geben Sie eine Nachricht ein"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setToast({ message: "Bitte füllen Sie alle Felder korrekt aus", type: "error" })
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
      await axios.post("https://consultaionwforms.vercel.app/api/consultation/form/21654665456454545454758784545", formData)
      setTimeout(() => {
        setToast({ message: "Termin erfolgreich gebucht!", type: "success" })
        setLoading(false)
        setErrors({})
        setFormData(formData) // Set form data to state
      }, 1000)
    } catch (error) {
      console.error("Error submitting form", error)
      setToast({ message: "Fehler beim Buchen des Termins", type: "error" })
      setLoading(false)
    }
  }

  if (formData) {
    return <SuccessPage formData={formData} />
  }

  return (
    <div className="container mx-auto px-4 py-4">
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
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
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
                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ihr vollständiger Name" />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">E-Mail</label>
                <Input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  onBlur={() => handleBlur("email")} 
                  placeholder="ihre.email@beispiel.de" 
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Telefon</label>
                <Input 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  onBlur={() => handleBlur("phone")} 
                  placeholder="+49" 
                />
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Nachricht (optional)</label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Teilen Sie uns mit, worum es in dem Gespräch gehen soll"
                  className="min-h-[100px]"
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>
            </div>
            <Button size="lg" className="w-full" onClick={handleSubmit} disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Termin buchen"}
            </Button>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
