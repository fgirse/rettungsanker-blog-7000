import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { RichText } from "@payloadcms/richtext-lexical/react"
import { SerializedEditorState, SerializedLexicalNode } from "lexical"
import { getPayload, type CollectionSlug } from "payload"
import config from "@payload-config"



type BentoRichText = {
  root: {
    type: string
    children: { [k: string]: unknown }[]
    direction: "ltr" | "rtl" | null
    format: "left" | "start" | "center" | "right" | "end" | "justify" | ""
    indent: number
    version: number
  }
  [k: string]: unknown
}

interface BentoItem {
  id: string
  title: string
  content: BentoRichText | string
  imageSrc: string
  imageAlt: string
  isMain?: boolean
}

type BentoFieldKeys = {
  titleKey: keyof BentoGridDoc
  contentKey: keyof BentoGridDoc
}

type BentoGridDoc = {
  id?: string
  title_biere?: string
  content_biere?: BentoRichText
  title_weine?: string
  content_weine?: BentoRichText
  title_cocktails?: string
  content_cocktails?: BentoRichText
  title_fussball?: string
  content_fussball?: BentoRichText
  title_events?: string
  content_events?: BentoRichText
  title_albers?: string
  content_albers?: BentoRichText
  title_logoNeu?: string
  content_logoNeu?: BentoRichText
}

const bentoItems: (BentoItem & BentoFieldKeys)[] = [
  {
    id: "bier",
    title: "bier vom fass",
    content: "Flensburger Pils - das kühle Blonde von der Waterkant. Astra-Pils - das Kultbier natürlich direkt vom Kiez !",
    imageSrc: "/Assets/Img/image.png",
    imageAlt: "Frisch gezapftes Flensburger Bier",
    isMain: true,
    titleKey: "title_biere",
    contentKey: "content_biere",
  },
  {
    id: "weine",
    title: "regionale weine",
    content: "Qualitativ hochwertige Weine aus der Region Kaiserstuhl und dem Markgräflerland. Hauslieferant Weingut Heinemann Scherzingen.",
    imageSrc: "/Assets/Img/bottles04.png",
    imageAlt: "Bunte Weinflaschen in Aquarell-Stil",
    titleKey: "title_weine",
    contentKey: "content_weine",
  },
  {
    id: "cocktails",
    title: "cocktails & longdrinks",
    content:
      "Zahlreiche internationale Longdrinks und Cocktails - alles was das Herz begehrt. Zahlreiche \"Kurze\" für jeden Geschmack.",
    imageSrc: "/Assets/Img/cocktails.png",
    imageAlt: "Cocktailglas Illustration",
    titleKey: "title_cocktails",
    contentKey: "content_cocktails",
  },
  {
    id: "fussball",
    title: "fussball live-tv",
    content: "Jeden Samstag-Spieltag der laufenden Bundesliga-Saison Live TV Event in unserer Sportarena natürlich mit Schwerpunkt unseres SC Freiburgs. Wann immer möglich auch Spiele der Champions League und natürlich der grossen Turniere von EM und WM. Bei Topspielen des SC Freiburg mit grosser Publikumsnachfrage sind Reservierungen über unser Booking-Tool zu empfehlen - Unten folgender Button und Du bist direkt dabei !",
    imageSrc: "/Assets/Img/Fussball2.png",
    imageAlt: "Fußball Illustration",
    isMain: true,
    titleKey: "title_fussball",
    contentKey: "content_fussball",
  },
  {
    id: "party",
    title: "party & events",
    content: "Der Rettungsanker ist die ideale Location für Ihren privaten oder Business Event. Im Rahmen einer \"gesckossenen Gesellschaft\" stehen Ihnen die Räumlichkeiten des Rettungsankers zur Verfügung. Auf Wunsch Catering durch unseren Kooperationspartner möglich ! Sprechen Sie uns an oder kontaktieren Sie uns per e.mail.",
    imageSrc: "/Assets/Img/Crowdparty2.png",
    imageAlt: "Party Crowd in Aquarell-Stil",
    titleKey: "title_events",
    contentKey: "content_events",
  },
  {
    id: "albers",
    title: "hans albers",
    content: " Hans Phillip August Albers (* 22.September 1891 in Hamburg , 24. Juli 1960 in Berg, Bayern) war ein deutscher Schauspieler und Sänger, der als 'blonder Hans' Volkssidol wurde. Zu den bekanntesten Spielfilmen in denen er mitwirkte gehören 'der Mann, der Sherlock Holmes war' (1937), 'Münchhausen' (1943), 'die grosse Freiheit Nr.7' (1943) sowie 'Auf fer Reeperbahn Nachts um halb eins'",
    imageSrc: "/Assets/Img/Albers_Illu_white.png",
    imageAlt: "Hans Albers Illustration als Seemann",
    titleKey: "title_albers",
    contentKey: "content_albers",
  },
  {
    id: "logoNeu",
    title: "neues logo",
    content: " Unser neues Logo symbolisiert die Verbindung von Tradition und Moderne. Das alte Rettungsanker Logo ist im oberen Drittel erhalten geblieben. Das mittlere Drittel beschreibt den Rettunganker als trffpunkt für Jung und Alt. Das untere Drittel. zeigt eine Shiluette der Stadt Freiburg Wir freuen uns, Sie unter unserem neuen Zeichen willkommen zu heißen!",
    imageSrc: "/Assets/Img/LogoNeu.png",
    imageAlt: "Neues Logo Illustration",
    titleKey: "title_logoNeu",
    contentKey: "content_logoNeu",
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
          {typeof item.content === "string" ? <p>{item.content}</p> : <RichText data={item.content as unknown as SerializedEditorState<SerializedLexicalNode>} />}
        </CardDescription>
      </CardContent>
    </Card>
  )
}

export default async function BenroGrid() {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: "bentogrid" as CollectionSlug,
    limit: 1,
  })

  const bentoDoc = docs?.[0] as BentoGridDoc | undefined
  const items = bentoItems.map((item) => ({
    ...item,
    title: (bentoDoc?.[item.titleKey] as string | undefined) ?? item.title,
    content: (bentoDoc?.[item.contentKey] as BentoRichText | undefined) ?? item.content,
  }))

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center gap-y-12 mb-10 md:mb-14">
          <p className=" text-center text-5xl headingA md:text-7xl lg:text-[6rem] font-bold text-yellow-500 ">
            gastlichkeit ist unsere philosophie
          </p>
          <p className="mt-20 mb-24 text-4xl headingA md:text-4xl lg:text-[5rem] font-bold text-slate-700 text-balance">
           unser angebot
          </p>
          <p className=" text-center font-sans text-muted-foreground text-lg md:text-2xl lg:text-[2rem] max-w-2xl mx-auto text-pretty">
            Erleben Sie norddeutsche Gastfreundschaft mit netten Gästen und unvergesslichen Momenten.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Bier vom Fass - Main item, larger on desktop */}
          <BentoCard item={items[0]} className="md:col-span-1 lg:col-span-1 lg:row-span-1" />

          {/* Regionale Weine */}
          <BentoCard item={items[1]} className="md:col-span-1 lg:col-span-1" />

          {/* Cocktails & Longdrinks */}
          <BentoCard item={items[2]} className="md:col-span-1 lg:col-span-1" />

          {/* Fußball Live-TV - Main item */}
          <BentoCard item={items[3]} className="md:col-span-1 lg:col-span-1" />

          {/* Party & Events */}
          <BentoCard item={items[4]} className="md:col-span-1 lg:col-span-1" />

          {/* Hans Albers */}
          <BentoCard item={items[5]} className="md:col-span-2 lg:col-span-1" />

          {/* Logo Neu */}
          <BentoCard item={items[6]} className="md:col-span-2 lg:col-span-3" />
        </div>
      </div>
    </section>
  )
}
