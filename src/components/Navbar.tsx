'use client';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { ThemeSwitcher } from './ThemeSwitcher'
import SetThemeCookie from '@/hooks/setThemeCookie'
import { useTheme } from 'next-themes';


const Navbar = () => {
  const { theme, setTheme } = useTheme();
  return (
    <nav className={`flex-between fixed z-50 w-full ${theme === 'dark' ? 'bg-gray-950' : 'bg-white'} px-6 py-4 lg:px-10 `}>
      <Link href={'/'} className='flex items-center gap-1'>
        <Image src={'/icons/logo.svg'} alt='Kumpul Logo' width={32} height={32} className='max-sm:size-10' />
        <p className='text-[26px] font-extrabold text-white max-sm:hidden'>Kumpul</p>
      </Link>

      <div className='flex-between gap-5 min-w-fit'>
        <ThemeSwitcher />
        <SetThemeCookie />
        {/* <SignedIn>
          <UserButton />
        </SignedIn> */}
         <MobileNav />
      </div>
    </nav>
  )
}

export default Navbar