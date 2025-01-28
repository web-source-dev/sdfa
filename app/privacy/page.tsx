import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">Datenschutzerklärung</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-gray dark:prose-invert max-w-none">
          <h2>1. Datenschutz auf einen Blick</h2>
          <h3>Allgemeine Hinweise</h3>
          <p>
            Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten
            passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich
            identifiziert werden können.
          </p>

          <h3>Datenerfassung auf dieser Website</h3>
          <p>
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie
            dem Impressum dieser Website entnehmen.
          </p>

          <h2>2. Hosting und Content Delivery Networks (CDN)</h2>
          <h3>Externes Hosting</h3>
          <p>
            Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die auf
            dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert.
          </p>

          <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
          <h3>Datenschutz</h3>
          <p>
            Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre
            personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser
            Datenschutzerklärung.
          </p>

          <h2>4. Datenerfassung auf dieser Website</h2>
          <h3>Cookies</h3>
          <p>
            Unsere Internetseiten verwenden so genannte &quot;Cookies&quot;. Cookies sind kleine Textdateien und richten auf Ihrem
            Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies)
            oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
          </p>

          <h2>5. Analyse-Tools und Werbung</h2>
          <h3>Google Analytics</h3>
          <p>
            Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Ireland
            Limited (&quot;Google&quot;), Gordon House, Barrow Street, Dublin 4, Irland.
          </p>

          <h2>6. Newsletter</h2>
          <h3>Newsletterdaten</h3>
          <p>
            Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine
            E-Mail-Adresse sowie Informationen, welche uns die Überprüfung gestatten, dass Sie der Inhaber der
            angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters einverstanden sind.
          </p>

          <h2>7. Plugins und Tools</h2>
          <h3>Google Web Fonts</h3>
          <p>
            Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Web Fonts. Beim Aufruf einer
            Seite lädt Ihr Browser die benötigten Web Fonts in ihren Browsercache, um Texte und Schriftarten korrekt
            anzuzeigen.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

