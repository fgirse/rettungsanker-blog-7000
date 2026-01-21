import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import  {cn}  from "@/lib/utils"

interface BentoItem {
  id: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  isMain?: boolean
}

const bentoItems: BentoItem[] = [
  {
    id: "bier",
    title: "bier vom fass",
    description: "Flensburger Pils - das kühle Blonde von der Waterkant. Astra-Pils - das Kultbier natürlich direkt vom Kiez !",
    imageSrc: "/Assets/Img/image.png",
    imageAlt: "Frisch gezapftes Flensburger Bier",
    isMain: true,
  },
  {
    id: "weine",
    title: "regionale weine",
    description: "Qualitativ hochwertige Weine aus der Region Kaiserstuhl und dem Markgräflerland. Hauslieferant Weingut Heinemann Scherzingen.",
    imageSrc: "/Assets/Img/bottles04.png",
    imageAlt: "Bunte Weinflaschen in Aquarell-Stil",
  },
  {
    id: "cocktails",
    title: "cocktails & longdrinks",
    description:
      "Zahlreiche internationale Longdrinks und Cocktails - alles was das Herz begehrt. Zahlreiche \"Kurze\" für jeden Geschmack.",
    imageSrc: "/Assets/Img/cocktails.png",
    imageAlt: "Cocktailglas Illustration",
  },
  {
    id: "fussball",
    title: "fussball live-tv",
    description: "Jeden Samstag-Spieltag der laufenden Bundesliga-Saison Live TV Event in unserer Sportarena natürlich mit Schwerpunkt unseres SC Freiburgs. Wann immer möglich auch Spiele der Champions League und natürlich der grossen Turniere von EM und WM. Bei Topspielen des SC Freiburg mit grosser Publikumsnachfrage sind Reservierungen über unser Booking-Tool zu empfehlen - Unten folgender Button und Du bist direkt dabei !",
    imageSrc: "/Assets/Img/Fussball2.png",
    imageAlt: "Fußball Illustration",
    isMain: true,
  },
  {
    id: "party",
    title: "party & events",
    description: "Der Rettungsanker ist die ideale Location für Ihren privaten oder Business Event. Im Rahmen einer \"gesckossenen Gesellschaft\" stehen Ihnen die Räumlichkeiten des Rettungsankers zur Verfügung. Auf Wunsch Catering durch unseren Kooperationspartner möglich ! Sprechen Sie uns an oder kontaktieren Sie uns per e.mail.",
    imageSrc: "/Assets/Img/Crowdparty2.png",
    imageAlt: "Party Crowd in Aquarell-Stil",
  },
  {
    id: "albers",
    title: "hans albers",
    description: " Hans Phillip August Albers (* 22.September 1891 in Hamburg , 24. Juli 1960 in Berg, Bayern) war ein deutscher Schauspieler und Sänger, der als 'blonder Hans' Volkssidol wurde. Zu den bekanntesten Spielfilmen in denen er mitwirkte gehören 'der Mann, der Sherlock Holmes war' (1937), 'Münchhausen' (1943), 'die grosse Freiheit Nr.7' (1943) sowie 'Auf fer Reeperbahn Nachts um halb eins'",
    imageSrc: "/Assets/Img/Albers_Illu_white.png",
    imageAlt: "Hans Albers Illustration als Seemann",
  },
  {
    id: "logoNeu",
    title: "neues logo",
    description: " Unser neues Logo symbolisiert die Verbindung von Tradition und Moderne. Das alte Rettungsanker Logo ist im oberen Drittel erhalten geblieben. Das mittlere Drittel beschreibt den Rettunganker als trffpunkt für Jung und Alt. Das untere Drittel. zeigt eine Shiluette der Stadt Freiburg Wir freuen uns, Sie unter unserem neuen Zeichen willkommen zu heißen!",
    imageSrc: "/Assets/Img/LogoNeu.png",
    imageAlt: "Neues Logo Illustration",
  },
]

function BentoCard({ item, className }: { item: BentoItem; className?: string }) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:shadow-xl",
        item.isMain ? "bg-amber-400 border-amber-400 border-2 ring-2 ring-amber-200" : "bg-card border-border",
        className,
      )}
    >
      {item.isMain && (
        <Badge className="absolute top-3 right-3 z-10 bg-red-700 text-white hover:bg-amber-700">Highlight</Badge>
      )}
      <div className="relative  w-full h-40 md:h-48 lg:h-52 overflow-hidden">
        <Image
          src={item.imageSrc || "/placeholder.svg"}
          alt={item.imageAlt}
          fill
          className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardHeader className={cn("pb-2", item.isMain ? "bg-amber-400" : "")}>
        <CardTitle className={cn("text-center text-2xl md:text-2xl headingA ", item.isMain ? "text-slate-600" : " text-yellow-600")}>
          {item.title}
        </CardTitle>
      </CardHeader>
      <CardContent className={cn(item.isMain ? "bg-amber-400" : "")}>
        <CardDescription
          className={cn(
            "font-sans text-lg md:text-base lg:text-[1.33rem] leading-relaxed",
            item.isMain ? "text-amber-50" : "text-white",
          )}
        >
          {item.description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}

export default function BentoGrid() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <p className="text-5xl headingA md:text-7xl lg:text-8xl font-bold text-yellow-500 text-balance">
            gastlichkeit ist unsere philosophie
          </p>
          <p className="mt-12 mb-24text-4xl headingA md:text-4xl lg:text-5xl font-bold text-slate-700 mb-4 text-balance">
           unser angebot
          </p>
          <p className="text-center font-sans text-muted-foreground text-lg md:text-2xl max-w-2xl mx-auto text-pretty">
            Erleben Sie norddeutsche Gastfreundschaft mit netten Gästen und unvergesslichen Momenten.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Bier vom Fass - Main item, larger on desktop */}
          <BentoCard item={bentoItems[0]} className="md:col-span-1 lg:col-span-1 lg:row-span-1" />

          {/* Regionale Weine */}
          <BentoCard item={bentoItems[1]} className="md:col-span-1 lg:col-span-1" />

          {/* Cocktails & Longdrinks */}
          <BentoCard item={bentoItems[2]} className="md:col-span-1 lg:col-span-1" />

          {/* Fußball Live-TV - Main item */}
          <BentoCard item={bentoItems[3]} className="md:col-span-1 lg:col-span-1" />

          {/* Party & Events */}
          <BentoCard item={bentoItems[4]} className="md:col-span-1 lg:col-span-1" />

          {/* Hans Albers */}
          <BentoCard item={bentoItems[5]} className="md:col-span-2 lg:col-span-1" />

          {/* Logo Neu */}
          <BentoCard item={bentoItems[6]} className="md:col-span-2 lg:col-span-3" />
        </div>
      </div>
    </section>
  )
}
