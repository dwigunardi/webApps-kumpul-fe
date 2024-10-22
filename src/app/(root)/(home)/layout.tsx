import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import { ReactNode } from 'react'
import { Metadata } from 'next';
import DateCalendar from '@/components/DateCalendar';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import SetThemeCookie from '@/hooks/setThemeCookie';
import { auth } from '@clerk/nextjs/server';
import Loader from '@/components/Loader';

export const metadata: Metadata = {
    title: "Kumpul",
    description: "Wellcome to Kumpul a Video Conference Platform",
    icons: {
        icon: '/icons/logo.svg'
    }
};

const HomeLayout = ({ children, searchParams }: { children: ReactNode, searchParams: URLSearchParams }) => {
    const { userId, getToken } = auth();
    const token = getToken();
    // console.log(userId, token)
    // if (!userId || !token) {
    //     return (
    //         <main className='flex items-center justify-center bg-light-1 dark:bg-black'>
    //             <Loader />
    //         </main>
    //     )
    // }


    return (
        <main className='relative bg-light-1 dark:bg-black'>
            {/* <Navbar /> */}
            <div className="flex">
                <Sidebar />
                <section className="flex min-h-screen flex-1 px-6 flex-col pb-6 pt-10 max-md:pb-14 max-md:px-14">
                    <div className="w-full">
                        {children}
                    </div>
                </section>
                <section className="flex min-h-screen flex-col px-2 pb-6 pt-10 max-md:pb-14 max-md:px-14">
                    <DateCalendar />
                </section>
            </div>
            <div className='absolute bottom-5 right-5 flex bg-blue-2 p-3 rounded-full text-light-4'>
                <ThemeSwitcher />
                <SetThemeCookie />
            </div>
        </main>
    )
}

export default HomeLayout