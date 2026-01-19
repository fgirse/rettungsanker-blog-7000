import React from 'react'
import Image from 'next/image'
import LogoNeu from"../public/Assets//Img//LogoNeu.png"

export default function Footer() {
   return (
      <footer className="border-t py-6 md:py-0">
         <div className=" flex flex-col items-center justify-center overflow-hidden">
            <Image src={LogoNeu} alt="Logo" width={128} height={128} priority className='mb-12'/>
            <div className="text-[2rem] md:text-[5rem] lg:text-[12rem] font-bold select-none pointer-events-none leading-none bg-gradient-to-br from-primary/70 to-primary/5 bg-clip-text text-transparent opacity-60 tracking-tighter">
               RETTUNGSANKER
            </div>
         </div>
         <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground">
               &copy; {new Date().getFullYear()} MEDICUSDESIGN Basel 🇨🇭 All rights reserved.
            </p>
         </div>
      </footer>
   )
}
