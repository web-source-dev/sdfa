import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Target,
  Trophy,
  Puzzle,
  Shield,
  Zap,
  Heart,
  Lightbulb,
  Smile,
  User,
  Lock,
  Activity,
  Coffee,
} from "lucide-react"

const topics = [
  {
    title: "Ziele",
    description:
      "Du wirst Dich und Deine Werte besser kennen lernen und kannst so die Ziele in Deinem Leben genauer definieren und umsetzen.",
    icon: Target,
  },
  {
    title: "Erfolg",
    description: "Du wirst Dein 'Why' definieren, danach handeln und ein zufriedeneres, erfolgreicheres Leben führen.",
    icon: Trophy,
  },
  {
    title: "Konflikte lösen",
    description:
      "Du wirst in der Lage sein, Konflikte im Alltag im Beruf und in der Beziehung zu beruhigen und zu bewältigen.",
    icon: Puzzle,
  },
  {
    title: "Resilienz",
    description:
      "Wir finden heraus, warum Deine inneren Warnsignale dauerhaft auf rot leuchten und stärken Deine eigene Widerstandskraft.",
    icon: Shield,
  },
  {
    title: "Schlechte Gewohnheiten",
    description:
      "Du wirst Handlungsmuster erkennen, die Dich an Deinem persönlichen Wachstum hindern und neue positive Gewohnheiten entwickeln.",
    icon: Zap,
  },
  {
    title: "Glückliche Beziehungen",
    description:
      "Du wirst über das nötige Handwerkszeug verfügen, um das Leben zu gestalten und die Beziehungen zu führen, die Du Dir wirklich wünschst.",
    icon: Heart,
  },
  {
    title: "Einsichten",
    description: "Du wirst Dich besser kennen lernen und der wahre Experte für dein privates und berufliches Leben.",
    icon: Lightbulb,
  },
  {
    title: "Selbstzweifel und Ängste",
    description: "Du wirst Glaubenssätze über den Haufen werfen, Deine Stärken kennen lernen und Mut entwickeln.",
    icon: Smile,
  },
  {
    title: "Du selbst sein",
    description: "Du wirst in Dir ruhen und Authentizität ausstrahlen.",
    icon: User,
  },
  {
    title: "Frei sein",
    description: "Du wirst Abhängigkeiten und toxische Beziehungen überwinden.",
    icon: Lock,
  },
  {
    title: "Gesünder sein",
    description:
      "Du wirst lernen, den Raubbau an Deinem Körper zu beenden und mit einer gelungenen Work-Life-Integration neue Energien freisetzen.",
    icon: Activity,
  },
  {
    title: "Krisen",
    description:
      "Life Coaching kann Dich dabei unterstützen, mit Enttäuschung, Verlust, Krankheit oder Trennung umzugehen.",
    icon: Coffee,
  },
]

export function CoachingTopics() {
  return (
    <section id="topics" className="container mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Themen und Ergebnisse im Personal Coaching</h2>
        <p className="text-muted-foreground">
          Entdecken Sie die verschiedenen Bereiche, in denen wir Sie unterstützen können
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <topic.icon className="h-6 w-6 text-primary" />
                <CardTitle>{topic.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>{topic.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

