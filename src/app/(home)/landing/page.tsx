import ButtonCustom from '@/components/custom/ButtonCustom'
import { Button } from '@/components/ui/button'
import { ArrowBigRight, ArrowRightCircleIcon, CircleCheckBig } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Landing = () => {
  return (
    <div className='w-full relative'>
      <div className="xs:hidden lg:fixed right-10 bottom-10 z-50">
        <Link href={'/sign-up'}>
          <ButtonCustom variant="outline" bgColor='bg-blue-1' textColor='text-blue-1' shadowColor='shadow-blue-1' >
            <span className='relative z-10'>Sign Up
            </span>
            <ArrowRightCircleIcon className='ml-3 hover:text-white z-10 relative' />
          </ButtonCustom>
        </Link>
      </div>
      <section className="bg-light-1 dark:bg-dark-1 py-12 md:py-24 lg:py-32">
        <div className="container grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-primary-foreground sm:text-4xl md:text-5xl">
              Reliable, secure conference to get the best events
            </h1>
            <p className="text-primary-foreground/80 md:text-xl">
              Hold incredible events, share knowledge, build and grow your product , create opportunity
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/sign-in">
                <Button className='w-full md:w-fit transition-all bg-blue-1 hover:shadow-xl hover:shadow-blue-1'>Try for free</Button>
              </Link>
              <ButtonCustom variant="outline" bgColor='bg-blue-1' textColor='text-blue-1' shadowColor='shadow-blue-1' >
                <span className='relative z-10'>Watch Story
                </span>
                <ArrowRightCircleIcon className='ml-3 hover:text-white z-10 relative' />
              </ButtonCustom>
              {/* <Button variant="outline" className='w-fit px-5 text-nowrap hover:before:bg-blue-1 relative 
                      overflow-hidden border border-blue-1 bg-white text-blue-1 
                      shadow-2xl transition-all before:absolute before:bottom-0 
                      before:left-0 before:top-0 before:z-0 before:h-full 
                      before:w-0 before:bg-blue-1 before:transition-all 
                      before:duration-500 hover:text-white 
                      hover:shadow-blue-1 hover:before:left-0 
                      hover:before:w-full'>
                <span className='relative z-10'>Watch Story
                </span>
                <ArrowRightCircleIcon className='ml-3 hover:text-white z-10 relative' />
              </Button> */}
            </div>
            <p className='text-dark-1 dark:text-light-1 text-sm'>* Ini Hanya Sekedar Demo</p>
            <p className='text-dark-1 dark:text-light-1 text-sm'>* Tidak Terhubung ke Zoom</p>
          </div>
          <Image
            src="/images/hero-image-1.png"
            width={700}
            height={500}
            // loader={() => '/images/loader.gif'}
            priority
            alt="Hero image"
            className="mx-auto rounded-lg bg-transparent"
          />
        </div>
      </section>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 lg:py-16 mx-auto max-w-screen-xl px-4">
          <div className="flex justify-center items-center text-gray-500 dark:text-gray-400">
            <h1 className='text-xl md:text-3xl font-bold text-center'><span className='font-bold'>Kumpul. </span>Multi Platform Conference Video Meet</h1>
          </div>
        </div>
      </section>

      <section className='bg-[#F8F8F8] py-10'>
        <div className="container grid gap-20 md:grid-cols-2 items-center">
          <Image
            src="/images/image-2.png"
            width={700}
            height={500}
            loading='lazy'
            // loader={() => '/images/loader.gif'}
            alt="Hero"
            className="mx-auto rounded-lg"
          />
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-dark-1 sm:text-4xl md:text-5xl">
              Everyone on their own device.
            </h1>
            <p className="text-dark-1 md:text-xl">
              <span className='font-bold'>Kumpul</span> is designed to be inclusive, by being able to use your own device to help hybrid-conference teams create, collaborate and celebrate together.
            </p>
          </div>
        </div>
      </section>
      <section className='flex flex-col py-10 bg-cover bg-no-repeat bg-center bg-fixed relative' style={{ backgroundImage: `url(/images/bg-section-1.svg)` }}>
        <div className="container mt-20 flex justify-center items-center">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-dark-1 dark:text-light-1 sm:text-4xl md:text-5xl text-center">
              Powerful virtual conferencing platform solution
            </h1>
            <p className="text-center text-dark-1 dark:text-light-1 md:text-xl">
              Dedicated spaces that make it easy to come together.
            </p>
            <div className="relative w-100 h-full">
              <Image src="/images/section-image-1.png"
                width={0}
                height={0}
                sizes="100vw"
                alt='Section Image'
                className="mx-auto rounded-lg w-10/12 h-full"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="h-full w-full bg-cover bg-no-repeat bg-center bg-fixed relative py-5" style={{ backgroundImage: `url(/images/bg-section-1.svg)` }}>
        <div className="container grid gap-8 lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <p className="text-dark-3 dark:text-light-2 md:text-xl">---ALL FEATURES</p>
            <h1 className="text-3xl font-bold text-dark-1 dark:text-light-1 sm:text-4xl md:text-5xl">
              Video calls loved by extraordinary teams.
            </h1>
            <p className="text-dark-1 dark:text-light-1 md:text-xl">
              Making hybrid‑conference inclusive with unique audio technology.
            </p>
            <div className="grid grid-cols-2 my-3 gap-5">
              <div className="flex align-middle items-center gap-3">
                <CircleCheckBig className='text-blue-1' />
                <p className="text-dark-1 dark:text-light-1 md:text-xl">
                  Real-time collaboration
                </p>
              </div>
              <div className="flex align-middle items-center gap-3">
                <CircleCheckBig className='text-blue-1' />
                <p className="text-dark-1 dark:text-light-1 md:text-xl">
                  Messages with participation
                </p>
              </div>
              <div className="flex align-middle items-center gap-3">
                <CircleCheckBig className='text-blue-1' />
                <p className="text-dark-1 dark:text-light-1 md:text-xl">
                  Record Your Important Meet!
                </p>
              </div>
              <div className="flex align-middle items-center gap-3">
                <CircleCheckBig className='text-blue-1' />
                <p className="text-dark-1 dark:text-light-1 md:text-xl">
                  Schedule Your Upcoming Meet.
                </p>
              </div>
              <div className="flex align-middle items-center gap-3">
                <CircleCheckBig className='text-blue-1' />
                <p className="text-dark-1 dark:text-light-1 md:text-xl">
                  Support Multi Devices
                </p>
              </div>
              <div className="flex align-middle items-center gap-3">
                <CircleCheckBig className='text-blue-1' />
                <p className="text-dark-1 dark:text-light-1 md:text-xl">
                  With 1 Hour or More Time Every Day
                </p>
              </div>
            </div>
          </div>
          <Image
            src="/images/section-image-2.png"
            width={0}
            height={0}
            sizes="100vw"
            alt='Section Image'
            className="mx-auto rounded-lg w-full md:w-[90%] h-full"
          />
        </div>
        <div className="container grid gap-16 lg:grid-cols-2 items-center mt-10">
          <Image
            src="/images/section-image-3.png"
            width={0}
            height={0}
            sizes="100vw"
            alt='Section Image'
            className="mx-auto rounded-lg w-full h-full"
          />
          <div className="space-y-4">
            <p className="text-dark-3 dark:text-light-2 md:text-xl">---BENEFITS OF YOU</p>
            <h1 className="text-3xl font-bold text-dark-1 dark:text-light-1 sm:text-4xl md:text-5xl">
              Fast, reliable and secure for your conferences
            </h1>
            <p className="text-dark-1 dark:text-light-1 md:text-xl">
              By using us, get the benefits that make it easier for you in the conference for your convenience and the participants
            </p>
            <div className="grid grid-cols-1 my-3 gap-5">
              <div className="flex align-middle items-center gap-3">
                <CircleCheckBig className='text-blue-1' />
                <p className="text-dark-1 dark:text-light-1 md:text-xl">
                  Security & Privacy
                </p>
              </div>
              <div className="flex align-middle items-center gap-3">
                <CircleCheckBig className='text-blue-1' />
                <p className="text-dark-1 dark:text-light-1 md:text-xl">
                  Audience Q&A
                </p>
              </div>
              <div className="flex align-middle items-center gap-3">
                <CircleCheckBig className='text-blue-1' />
                <p className="text-dark-1 dark:text-light-1 md:text-xl">
                  Engagement!
                </p>
              </div>
              <div className="flex align-middle items-center gap-3">
                <CircleCheckBig className='text-blue-1' />
                <p className="text-dark-1 dark:text-light-1 md:text-xl">
                  More Meeting Time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-dark-1 dark:bg-light-1 py-12 md:py-24 lg:py-32">
        <div className="container grid gap-8 md:justify-center lg:grid-cols-2 items-center">
          <div className="space-y-4">
            <div className="flex gap-10 md:justify-center lg:justify-start items-center">
              <div className="flex flex-col gap-3">
                <Image src="/images/unduhan.png" width={0} height={0} sizes='100vw' alt='Section Image' className="rounded-full w-full lg:w-1/2 lg:h-1/2" />
                <h1 className="text-lg font-bold text-light-1 dark:text-dark-1 sm:text-xl md:text-2xl">
                  Dwi Gunardi Meinaki
                </h1>
                <p className="text-light-1 dark:text-dark-1 md:text-xl">
                  Frontend Developer @Kumpul
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <p className='text-light-1 dark:text-dark-1 text-sm'>* Ini Hanya Sekedar Demo</p>
                <p className='text-light-1 dark:text-dark-1 text-sm'>* Tidak Terhubung ke Zoom</p>
                <p className='text-light-1 dark:text-dark-1 text-sm'>* List Fitur</p>
                <div className='grid grid-cols-2'>
                  <p className='text-light-1 dark:text-dark-1 text-sm'>- Video call</p>
                  <p className='text-light-1 dark:text-dark-1 text-sm'>- Audio call</p>
                  <p className='text-light-1 dark:text-dark-1 text-sm'>- Scheduled meeting</p>
                  <p className='text-light-1 dark:text-dark-1 text-sm'>- Recording</p>
                  <p className='text-light-1 dark:text-dark-1 text-sm'>- Reaction</p>
                </div>
                <p className='text-light-1 dark:text-dark-1 text-sm'>* Upcoming Fitur</p>
                <div className='grid grid-cols-2'>
                  <p className='text-light-1 dark:text-dark-1 text-sm'>- Live stream</p>
                  <p className='text-light-1 dark:text-dark-1 text-sm'>- Webinar</p>
                  <p className='text-light-1 dark:text-dark-1 text-sm'>- Chat</p>
                  <p className='text-light-1 dark:text-dark-1 text-sm'>- Notification</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-5 relative">
            <div className="absolute -top-6 -left-3 lg:-top-10 lg:-left-[66px] w-16 h-16 flex items-center justify-center bg-blue-1 rounded-full opacity-80">
              <Image src="/images/icon-kutip.svg" width={40} height={40} alt='Kutip Image' className='' />
            </div>
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-bold text-light-1 dark:text-dark-1 sm:text-4xl md:text-5xl italic">
                Demo ini di buat bertujuan untuk sekedar meningkatkan pemahaman tentang konsep pemrograman Web RTC.
              </h1>
              <div className="absolute -bottom-7 right-7 md:right-3 lg:right-[5%] w-16 h-16 flex items-center justify-center bg-blue-1 rounded-full opacity-80">
                <Image src="/images/icon-kutip.svg" width={40} height={40} alt='Kutip Image' className='' />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container h-full w-full bg-contain bg-repeat bg-center bg-fixed relative py-5 bg-blue-1 rounded-xl" style={{ backgroundImage: `url(/images/bg-section-1.svg)` }}>
          <div className='p-5 min-h-80 grid grid-cols-1 gap-8 align-middle items-center justify-between md:grid-cols-1 lg:grid-cols-6'>
            <div className='space-y-4 lg:col-span-3 lg:col-start-1 '>
              <h1 className="text-3xl font-bold text-dark-1 dark:text-light-1 sm:text-4xl md:text-5xl">
                Ready to setup your next conference?
              </h1>
              <p className="text-dark-1 dark:text-light-1 md:text-xl">Build opportunities for future opportunities for products, startups.</p>
            </div>
            <div className="flex gap-8 items-center lg:col-end-7 lg:col-span-2">
              <Button variant={'default'} className='transition-all text-blue-1 bg-light-1 hover:shadow-xl hover:shadow-blue-1'>Create Conference</Button>
              <Button variant={'outline'} className='transition-all text-white hover:shadow-xl hover:shadow-blue-1'>Watch Demo</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing