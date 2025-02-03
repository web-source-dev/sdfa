import { CalendarCheck, ExternalLink, Clock, User, Phone } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function SuccessPage({ formData }: { formData: any }) {
  const { date, time, name, email, phone } = formData

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="relative w-full max-w-[550px] overflow-hidden p-2 mx-auto shadow-none border-none">
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

        <div className="mt-8 text-center">
          <p className="mt-2 text-sm text-gray-600">
            Vermeiden Sie ewiges Hin und Her per E-Mail um eine Zeit zu finden.
          </p>
        </div>
      </Card>
    </div>
  )
}
