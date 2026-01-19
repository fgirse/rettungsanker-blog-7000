import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import LogoNeu from"../public/Assets//Img//LogoNeu.png"

export default function Logo() {
   return (
      <Link href="/" className="flex items-center">
         <Image
            src={LogoNeu}
            alt="Logo"
            width={128}
            height={128}
            priority
         />
      </Link>
   )
}
