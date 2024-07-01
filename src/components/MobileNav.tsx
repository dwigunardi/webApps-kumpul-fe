'use client';
import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Image from 'next/image'
import Link from 'next/link'
import { SideBarLinks } from '../../constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils';

const MobileNav = () => {
    const pathName = usePathname();
    return (
        <section className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTrigger asChild>
                    <Image src={'/icons/hamburger.svg'} alt='Hamburger Menu' width={36} height={36} className='cursor-pointer sm:hidden' />
                </SheetTrigger>
                <SheetContent side={'left'} className='border-none bg-dark-1'>
                    <Link href={'/'} className='flex items-center gap-1'>
                        <Image src={'/icons/logo.svg'} alt='Kumpul Logo' width={32} height={32} className='max-sm:size-10' />
                        <p className='text-[26px] font-extrabold text-white'>Kumpul</p>
                    </Link>
                    <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
                        <section className='flex h-full flex-col gap-6 pt-16 text-white'>
                            {SideBarLinks.map((link) => {
                                const isActive = pathName === link.route
                                return (
                                    <SheetClose asChild key={link.route}>
                                        <Link href={link.route} key={link.label} className={cn('flex items-center gap-4 p-4 rounded-lg w-full max-w-60', {
                                            'bg-blue-1': isActive,
                                        })}>
                                            <Image src={link.imgUrl} alt={link.label} width={24} height={24} />
                                            <p className="text-lg text-white font-semibold">
                                                {link.label}
                                            </p>
                                        </Link>
                                    </SheetClose>
                                )
                            })}
                        </section>
                    </div>
                </SheetContent>
            </Sheet>

        </section>
    )
}

export default MobileNav