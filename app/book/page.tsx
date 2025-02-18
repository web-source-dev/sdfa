"use client"

import { useState,useEffect} from "react"
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
import SuccessPage, { Toast } from "./success"

interface FormData {
  date: string
  time: string
  name: string
  email: string
  phone: string
  message: string
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

interface ToastProps {
  message: string
  type: "success" | "error" | "info"
  onClose: () => void
}
const ONE_HOUR = 60 * 60 * 1000 // 1 hour in milliseconds
export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>()
  const [time, setTime] = useState<string | undefined>()
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [message, setMessage] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)
  const [toast, setToast] = useState<ToastProps | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [formData, setFormData] = useState<FormData | null>(null)
  const [step, setStep] = useState<number>(1)

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
   useEffect(() => {
    const storedData = localStorage.getItem("bookingFormData")
    if (storedData) {
      const { date, time, name, email, phone, message, timestamp } = JSON.parse(storedData)

      // Check if the stored data is still within one hour
      if (Date.now() - timestamp < ONE_HOUR) {
        setDate(date ? new Date(date) : undefined)
        setTime(time || "")
        setName(name || "")
        setEmail(email || "")
        setPhone(phone || "")
        setMessage(message || "")
      } else {
        localStorage.removeItem("bookingFormData") // Clear outdated data
      }
    }
  }, [])

  // Save data to localStorage on every change
  useEffect(() => {
    const formData = {
      date: date?.toISOString() || null,
      time,
      name,
      email,
      phone,
      message,
      timestamp: Date.now(),
    }
    localStorage.setItem("bookingFormData", JSON.stringify(formData))
  }, [date, time, name, email, phone, message])

  const handleNext = () => {
    setLoading(true)
    setTimeout(() => {
      const newErrors: { [key: string]: string } = {}
      if (!date) newErrors.date = "Bitte wählen Sie ein Datum"
      if (!time) newErrors.time = "Bitte wählen Sie eine Uhrzeit"
      if (!name) newErrors.name = "Bitte geben Sie Ihren Namen ein"
      if (!email || !validateEmail(email)) newErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein"
      if (!phone || !validatePhone(phone)) newErrors.phone = "Bitte geben Sie eine gültige Telefonnummer ein"
      if (!message) newErrors.message = "Bitte geben Sie eine Nachricht ein"

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        setLoading(false)
        return
      }
      const formData: FormData = {
        date: date ? format(date, "PPP") : "",
        time: time || "",
        name,
        email,
        phone,
        message,
      }
      setFormData(formData)
      setStep(2)
      setLoading(false)
    }, 1000)
  }

  const handleBack = () => {
    setLoading(true)
    setTimeout(() => {
      setStep(1)
      setLoading(false)
    }, 1000)
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
      setToast({ message: "Bitte füllen Sie alle Felder korrekt aus", type: "error", onClose: () => setToast(null) })
      return
    }

    setLoading(true)
    setToast({ message: "Buchung wird verarbeitet...", type: "info", onClose: () => setToast(null) })

    const formData: FormData = {
      date: date ? format(date, "PPP") : "",
      time: time || "",
      name,
      email,
      phone,
      message,
    }

    try {
      const response = await axios.post(
        "https://consultation-ten.vercel.app/api/consultation/form/21654665456454545454758784545",
        formData,
      )
      if(response){
        window.parent.postMessage({ type: "quizSubmission", data: response.data }, "*");
        localStorage.removeItem("bookingFormData") // Clear outdated data
        console.log("response",response)
      setTimeout(() => {
        setToast({ message: "Termin erfolgreich gebucht!", type: "success", onClose: () => setToast(null) })
        setLoading(false)
        setErrors({})
        setFormData(formData)
      }, 1000)
      }
    } catch (error) {
      console.error("Error submitting form", error)
      setToast({ message: "Fehler beim Buchen des Termins", type: "error", onClose: () => setToast(null) })
      setLoading(false)
    }
  }

  if (step === 2 && formData) {
    return <SuccessPage formData={formData} onSubmit={handleSubmit} onBack={handleBack} toast={toast} />
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
            <Button size="lg" className="w-full" onClick={handleNext} disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Weiter"}
            </Button>
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}



