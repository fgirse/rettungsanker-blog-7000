import React from 'react'
import Image from 'next/image'
import LogoNeu from"../public/Assets//Img//LogoNeu.png"
import Waves from"./waves";
import Lighthouse from"../public/Assets/Img/lighthouse3.png"

export default function Footer() {
   return (
      <footer className="border-t py-6 md:py-0">
         <div className=" flex flex-col items-center justify-center overflow-hidden">
            <Image src={LogoNeu} alt="Logo" width={128} height={128} priority className='mb-12'/>
            <div className="text-[2rem] md:text-[5rem] lg:text-[12rem] headingA select-none pointer-events-none leading-none bg-gradient-to-br from-yellow-700/100 to-yellow-500/100 bg-clip-text text-transparent opacity-70 tracking-tighter">
               RETTUNGSANKER
            </div>
            <Image
            src={Lighthouse} alt="Lighthouse" width={50} height={50} priority className='mt-[4rem] relative right-36 z-10 mb-[-2rem] w-20 md:w-32 md:mb-[-3rem] md:right-60 lg:w-40 lg:mb-[-8rem] lg:right-[40vw]'
            
            
            
            />
            <Waves />
         </div>
         <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
            <p className="text-center text-sm leading-loose text-muted-foreground">
               &copy; {new Date().getFullYear()} MEDICUSDESIGN Basel 🇨🇭 All rights reserved.
            </p>
         </div>
      </footer>
   )
}
