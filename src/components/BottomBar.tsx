'use client';

import { SideBarLinks } from '@/constants';
import { cn } from '@/lib/utils';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { HomeIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip-mobile';

const BottomBar = () => {
    const { theme, setTheme } = useTheme();
    const pathName = usePathname();
    return (
        <div className='flex items-center justify-evenly gap-3 m-0'>
            <div className="justify-self-center">
                <SignedIn>
                    <UserButton
                        appearance={{
                            elements:
                            {
                                avatarBox: 'w-12 h-12',
                                userPreview: 'hidden',
                                userButtonPopoverFooter: 'hidden',
                                userButtonPopoverMain: theme === 'dark' ? 'bg-blue-2 text-white'
                                    : 'bg-blue-2 text-[#555555]',
                                userButtonPopoverActionButton: theme === 'dark' ? 'bg-dark-2 text-white hover:text-sky-1' : 'bg-white text-[#555555] hover:text-gray-950',
                                scrollBox: theme === 'dark' ? 'bg-dark-2 text-white' : 'bg-white text-[#555555]',
                            }
                        }}
                        userProfileProps={{
                            appearance: {
                                elements: {
                                    footer: 'hidden',
                                    navbar: theme === 'dark' ? '!bg-gradient-to-br !from-gray-800 !to-gray-950 !text-white' : 'bg-white text-[#555555]',
                                    navbarButton: theme === 'dark' ? 'text-white hover:text-sky-1' : 'text-[#555555] hover:text-gray-950',
                                    pageScrollBox: theme === 'dark' ? '!bg-gray-400 text-white' : '!bg-white text-[#555555]',
                                    headerTitle: theme === 'dark' ? 'text-white' : 'text-[#555555]',
                                    headerSubtitle: theme === 'dark' ? 'text-white' : 'text-[#555555]',
                                    profileSection: theme === 'dark' ? '!text-white' : '!text-[#555555]',
                                    profileSectionItem: theme === 'dark' ? '!text-white' : '!text-[#555555]',
                                    userPreview: theme === 'dark' ? 'text-white' : 'text-[#555555]',
                                    profileSectionPrimaryButton: theme === 'dark' ? 'text-white hover:text-sky-1' : 'text-[#555555] hover:text-gray-950',
                                    providerIcon__google: theme === 'dark' ? 'text-white' : 'text-[#555555]',
                                    menuButton: theme === 'dark' ? 'text-white hover:text-sky-1' : 'text-[#555555] hover:text-gray-950',
                                }
                            }
                        }}
                    />
                </SignedIn>
            </div>
            {SideBarLinks.map((link) => {
                const isActive = pathName === link.route || pathName.startsWith(`${link.route}/`);
                return (
                    <TooltipProvider delayDuration={0} key={link.label}>
                        <Tooltip>
                            <TooltipTrigger asChild tabIndex={0}>
                                <Link rel='canonical' href={link.route} className={cn(`flex items-center gap-4 p-4 m-0 rounded-full justify-start`, {
                                    'bg-dark-4 text-light-4': isActive,
                                })}>
                                    {link.imgUrl}
                                    <p className={`text-lg font-semibold transition-opacity duration-300 hidden`}>
                                        {link.label}
                                    </p>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent className='w-fit rounded-full'>
                                <p>{link.label}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                );
            })}

        </div>
    )
}

export default BottomBar