'use client';

import React, { useEffect } from 'react';
import { SideBarLinks } from '../constants';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTheme } from 'next-themes';

const Sidebar = () => {
  const pathName = usePathname();
  const [isOpen, setIsOpen] = React.useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const [isMobile, setIsMobile] = React.useState(false);
  const userData = useUser();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize the state based on the initial window size

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`sticky top-0 left-0 h-screen transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-32'} ${theme === 'dark' ? 'bg-dark-1 text-white' : 'bg-light-4 text-[#555555]'}`}>
      <div className="flex flex-col justify-between h-full p-6 pt-28 relative">
        <div className="flex justify-between gap-2 border border-blue-2 p-4 rounded-2xl mt-0 mb-8">
          <SignedIn>
            <UserButton
              appearance={{
                elements:
                {
                  avatarBox: 'w-12 h-12',
                  userPreview: 'hidden',
                  userButtonPopoverFooter: 'hidden',
                  userButtonPopoverMain: theme === 'dark' ? 'bg-gray-950 text-white'
                    : 'bg-white text-[#555555]',
                    userButtonPopoverActionButton: theme === 'dark' ? 'bg-gray-950 text-white hover:text-sky-1' : 'bg-white text-[#555555] hover:text-gray-950',
                    scrollBox: theme === 'dark' ? 'bg-gray-950 text-white' : 'bg-white text-[#555555]',
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
          <div>
            <p className={`text-sm text-wrap font-semibold ${isOpen ? 'inline-block' : 'hidden'} max-lg:hidden`}>{userData.user?.firstName}</p>
            <p className={`text-[12px] text-wrap font-light ${isOpen ? 'inline-block' : 'hidden'} max-lg:hidden`}>{userData.user?.emailAddresses[0]?.emailAddress}</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-6">
          {SideBarLinks.map((link) => {
            const isActive = pathName === link.route || pathName.startsWith(`${link.route}/`);
            return (
              <Link rel='canonical' href={link.route} key={link.label} className={cn(`flex items-center gap-4 p-4 rounded-lg ${!isOpen ? 'justify-center' : 'justify-start'}`, {
                'bg-blue-2 text-light-4': isActive,
              })}>
                <Image src={link.imgUrl} alt={link.label} width={24} height={24} />
                <p className={`text-lg font-semibold transition-opacity duration-300 ${isOpen ? 'inline-block' : 'hidden'} max-lg:hidden`}>
                  {link.label}
                </p>
              </Link>
            );
          })}
        </div>
        <Button className='w-full bg-blue-2 absolute bottom-0 left-0 min-h-[7%] transition-all duration-300 ease-in-out' variant='default' onClick={toggleSidebar}>
          {isOpen ? <ArrowLeft className='w-8 h-8 text-white' /> : <ArrowRight className='w-8 h-8 text-white' />}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
