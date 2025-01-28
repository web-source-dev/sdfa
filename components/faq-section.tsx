"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"

const faqs = [
  {
    question: "Was ist Life Coaching?",
    answer:
      "Life Coaching ist eine professionelle Begleitung, die Ihnen hilft, Ihre persönlichen und beruflichen Ziele zu erreichen. Durch gezielte Gespräche und Methoden unterstütze ich Sie dabei, Ihre Potenziale zu erkennen und zu entwickeln.",
  },
  {
    question: "Wie läuft eine Coaching-Sitzung ab?",
    answer:
      "Eine typische Coaching-Sitzung dauert 60-90 Minuten. Wir beginnen mit der Klärung Ihres Anliegens, erarbeiten gemeinsam Lösungsansätze und definieren konkrete nächste Schritte. Die Gespräche können persönlich oder online stattfinden.",
  },
  {
    question: "Wie lange dauert ein Coaching-Prozess?",
    answer:
      "Die Dauer des Coaching-Prozesses ist individuell und hängt von Ihren Zielen ab. Typischerweise erstreckt sich ein Coaching über 6-10 Sitzungen, die im Abstand von 2-4 Wochen stattfinden.",
  },
  {
    question: "Was kostet eine Coaching-Sitzung?",
    answer:
      "Die Kosten für eine Coaching-Sitzung werden individuell besprochen. Das Erstgespräch ist kostenlos und unverbindlich. Hier können wir gemeinsam herausfinden, ob die Chemie stimmt und wie ich Sie am besten unterstützen kann.",
  },
  {
    question: "Wo finden die Coaching-Sitzungen statt?",
    answer:
      "Die Coaching-Sitzungen können sowohl in meinen Räumlichkeiten in München als auch online per Video-Call stattfinden. Bei Bedarf sind auch Hausbesuche möglich.",
  },
  {
    question: "Wie vertraulich ist das Coaching?",
    answer:
      "Absolute Vertraulichkeit ist die Basis unserer Zusammenarbeit. Alle Gespräche und Informationen unterliegen der strengsten Verschwiegenheit und werden nicht an Dritte weitergegeben.",
  },
]

export function FAQSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Häufig gestellte Fragen</h2>
          <p className="text-muted-foreground">Finden Sie Antworten auf die wichtigsten Fragen zum Coaching-Prozess</p>
        </div>
        <Card className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left px-4">{faq.question}</AccordionTrigger>
                <AccordionContent className="px-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
      </div>
    </section>
  )
}

