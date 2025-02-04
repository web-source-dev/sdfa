import { CalendarCheck, Clock, User, Phone, Loader2 } from 'lucide-react'
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from 'react'

interface FormData {
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
}

interface ToastProps {
  message: string
  type: "success" | "error" | "info"
  onClose: () => void
}

export function Toast({ message, type, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`rounded-md text-center p-2 ${type === "success" ? "text-green-500" : type === "error" ? "text-red-500" : "text-blue-500"} `}
    >
      {message}
    </div>
  )
}

export default function SuccessPage({ formData, onSubmit, onBack, toast }: { formData: FormData, onSubmit: () => void, onBack: () => void, toast: ToastProps | null }) {
  const { date, time, name, phone } = formData
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)
  const [loadingBack, setLoadingBack] = useState<boolean>(false)
  const [showDialog, setShowDialog] = useState<boolean>(false)

  const handleSubmit = async () => {
    setLoadingSubmit(true)
    await onSubmit()
    setLoadingSubmit(false)
    setShowDialog(true)
  }

  const handleBack = () => {
    setLoadingBack(true)
    setTimeout(() => {
      onBack()
      setLoadingBack(false)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen items-start justify-start mt-10 p-4">
      <Card className="relative w-full max-w-[550px] overflow-hidden p-4 mx-auto shadow-none border-none">
        
        {/* Back Button */}
        <div className="mb-10">
          <Button variant="outline" className="w-50" onClick={handleBack} disabled={loadingBack}>
            {loadingBack ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Zurück"}
          </Button>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <div className="rounded-full p-1">
            <CalendarCheck className="h-6 w-6 text-emerald-600" />
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
              <User className="mt-1 h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium">{name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="mt-1 h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium">{time}, {date}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-1 h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">Mitteleuropäische Zeit</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="mt-1 h-5 w-5 text-gray-500" />
              <div>
                <p className="font-medium">{phone}</p>
              </div>
            </div>
          </div>
        </div>
                <p className="mt-6 text-sm text-gray-600 text-center">
  Bevor Sie Ihre Buchung abschließen, lesen Sie bitte unsere{" "}
  <a href="https://sascharoemer.wixsite.com/my-site-4/datenschutz" className="text-blue-600 underline">Datenschutz</a>,{" "}
  <a href="https://sascharoemer.wixsite.com/my-site-4/impressum" className="text-blue-600 underline">Impressum</a> und{" "}
  <a href="https://sascharoemer.wixsite.com/my-site-4/agb" className="text-blue-600 underline">Allgemeinen Geschäftsbedingungen</a>.  
  Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und sichere Transaktionen zu gewährleisten.  
  Ihre Daten werden gemäß unseren Richtlinien geschützt und verarbeitet. Mit dem Fortfahren bestätigen Sie Ihr Einverständnis mit unseren Bedingungen.
</p>

        {/* Submit Button */}
        <div className="mt-6">
          <Button className="w-full" onClick={handleSubmit} disabled={loadingSubmit}>
            {loadingSubmit ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Daten einreichen"}
          </Button>
        </div>

        {/* Toast */}
        {toast && <div className="mt-4"><Toast message={toast.message} type={toast.type} onClose={toast.onClose} /></div>}
      </Card>

      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold">Buchung erfolgreich</h2>
            <p className="mt-2">Ihre Buchung war erfolgreich. Eine Bestätigung wurde an Ihre E-Mail-Adresse gesendet.</p>
            <Button className="mt-4 w-full" onClick={() => setShowDialog(false)}>Schließen</Button>
          </div>
        </div>
      )}
    </div>
  )
}
