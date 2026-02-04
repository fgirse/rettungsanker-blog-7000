"use client"

import Link from 'next/link'

import { Button } from './ui/button'
import SignOutForm from './sign-out-form'
import Logo from './logo'
import { GithubStars } from './github-stars'
import { useUser } from '@/context/UserContext'

export default function Navbar() {
   const { user, isLoading } = useUser();

   return (
      <header className="sticky top-0 z-100 flex justify-center py-2">
         <div className="container border rounded-md w-full bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 py-2 px-4">
            <nav className="flex items-center justify-between gap-4 sm:gap-6">
               <div className="flex items-center gap-6">
                  <Logo />
               </div>
               <div className='flex items-center gap-2'>
                  {!isLoading && user ? (
                     <>
                        {user.role === 'admin' ? (
                           <Link
                              href="/admin"
                              className="text-sm font-medium"
                           >
                              <Button className="bg-slate-500 text-white hover:bg-slate-600">
                                 Admin
                              </Button>
                           </Link>
                        ) : (
                           <span className="text-sm text-destructive">
                              User is not admin
                           </span>
                        )}
                        <Link
                           href="/dashboard"
                           className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                           <Button variant="outline">
                              Dashboard
                           </Button>

                        </Link>
                        <SignOutForm />
                     </>
                  ) : !isLoading ? (
                     <>

                        <Link
                           href="/sign-in"
                           className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                           <Button variant="outline">
                              Login
                           </Button>
                        </Link>
                        <Button asChild>
                           <Link href="/sign-up">Sign up</Link>
                        </Button>
                     </>
                  ) : null}
                  <GithubStars />
               </div>
            </nav>
         </div>
      </header>
   )
}
