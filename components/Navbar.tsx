import React from 'react'
import Link from "next/link"
import Image from 'next/image'
import NavItems from './Navitems'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import ThemeToggle from '@/components/darkMode'

const Navbar = () => {
  return (
    <nav className="navbar">
        <Link href="/">   
        <div className="flex items-center gap-2.5 cursor-pointer applybanner">
            
            {/* Light mode logo */}
          <Image
            src="/images/blackthunderx.png"
            alt="logo"
            width={216}
            height={54}
            className="block dark:hidden "
          /> 
          {/* Dark mode logo */}
          <Image

            src="/images/whitethunder.png"
            alt="logo"
            width={216}
            height={54}
            className="hidden dark:block object-fit-cover"
          />



        </div>
        </Link>
        <div className="flex items-center gap-8 ">
          
            <NavItems />
            <ThemeToggle />
            
            <SignedOut>
                <SignInButton >
                    <button className="btn-signin">Sign In</button>
                </SignInButton>
                <SignUpButton>
                    <button className="btn-primary">Sign Up</button>
                </SignUpButton> 
            </SignedOut>
            <SignedIn>
              
                <UserButton afterSignOutUrl='/' />
            </SignedIn>
            
            

        </div>
    </nav>
  )
}

export default Navbar