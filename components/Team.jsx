import Image from "next/image";
import MatroseImSeil from "@/public/Assets/Img/matroseimseil.png";
import LogoAlt from "@/public/Assets/Img/LogoAlt.png";





const people = [
  {
    name: 'Mick',
    role: 'Captain',
    imageUrl:
      '/Assets/Img/portraitmick.png',
  },
  {
    name: 'Simon',
    role: 'Obermaat',
    imageUrl:
      '/Assets/Img/matrose.png',
  },
  {
    name: 'Anne',
    role: 'I. Offizierin',
    imageUrl:
      '/Assets/Img/Offizier-weiblich.png',
  },
  {
    name: 'Lindsay',
    role: 'II. Offizierin',
    imageUrl:
      '/Assets/Svg/ankerIcon.svg',
  },
  {
    name: 'Max',
    role: 'Steward',
    imageUrl:
       '/Assets/Svg/ankerIcon.svg',
  },
  {
    name: 'James',
    role: 'Funker',
    imageUrl:
        '/Assets/Svg/ankerIcon.svg',
  },
]

export default function Team() {
  return (
    <div className="bg-slate-900 py-24 sm:py-32">
      <div className="flex flex-col justify-between mx-auto max-w-9xl lg:px-8">
      
        <div className="flex flex-col items-center justify-center-60 xl:">
          <p className="text-[12vw] md:text-[10vw] headingA tracking-tight lg:text-[7.0rem] text-yellow-500 sm:text-4xl">
            unser team
          </p>
          <div className="mx-36 flex flex-row items-center justify-center gap-3"> 
          <Image src={LogoAlt} alt="Logo"  width={800} height={20} />
          <Image src={MatroseImSeil} alt="Logo" width={100} height={100} />
          </div>
          <p className="w-3/4 mt-36 mx-24 font-sans text-xl text-gray-200">
            Wir sind eine dynamische, bunte Crew, welche mit Leidenschaft Gastro lebt und sich schon jetzt auf Deinen Besuch im Rettungsanker freut!
          </p>
        </div>
        <div className="mt-12 flex flex-col items-center">
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img
                  alt=""
                  src={person.imageUrl}
                  className="size-28 rounded-full outline-1 -outline-offset-1 outline-black/5"
                />
                <div>
                  <h1 className="text-base/7 font-sans tracking-tight text-gray-50">{person.name}</h1>
                  <p className="text-sm/ font-sans text-yellow-500">{person.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div/>
      </div>
    </div>
  </div>
  )
}












