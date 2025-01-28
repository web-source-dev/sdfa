import { NextApiRequest, NextApiResponse } from "next"
import { google } from "googleapis"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { date, time, name, email, phone, message } = req.body

    try {
      // Ensure the private key is defined
      if (!process.env.GOOGLE_PRIVATE_KEY) {
        throw new Error("GOOGLE_PRIVATE_KEY is not defined in environment variables")
      }

      // Authenticate with Google Sheets API using environment variables
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: process.env.GOOGLE_CLIENT_EMAIL,
          private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets"],
      })

      const sheets = google.sheets({ version: "v4", auth })

      const spreadsheetId = process.env.GOOGLE_SHEET_ID // Use Google Sheets ID from environment variables
      const range = "Sheet1!A1" // Replace with your desired range

      // Append the form data to the Google Sheet
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        requestBody: {
          values: [
            [date, time, name, email, phone, message],
          ],
        },
      })

      res.status(200).json({ message: "Termin erfolgreich gebucht!" })
    } catch (error) {
      console.error("Error submitting form", error)
      res.status(500).json({ error: "Fehler beim Buchen des Termins" })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
