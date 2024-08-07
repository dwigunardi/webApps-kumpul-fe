'use client'
import { useUser } from '@clerk/nextjs';
import React from 'react'
import { Skeleton } from './ui/skeleton';

const DashboardCard = () => {
    const [dateNow, setDateNow] = React.useState(new Date().getHours() + ':' + new Date().getMinutes().toLocaleString('id-ID', { minimumIntegerDigits: 2 }));
    const { isSignedIn, user, isLoaded } = useUser();

    React.useEffect(() => {
        const interval = setInterval(() => {
            setDateNow(new Date().getHours() + ':' + new Date().getMinutes().toLocaleString('id-ID', { minimumIntegerDigits: 2 }));
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    if (!isLoaded) {
        return (
            <Skeleton className='w-full h-[150px] p-8 bg-light-4 dark:bg-dark-2 shadow-lg rounded-xl'>
                <div className='flex flex-row justify-between items-center'>
                </div>
            </Skeleton>
        );
    }

    return (
        <div className='w-full h-full p-8 bg-light-4 dark:bg-dark-2 shadow-lg rounded-xl'>
            <div className='flex flex-row justify-between items-center'>
                <div className="flex-col">
                    <h1 className='text-3xl font-bold text-light-5 dark:text-light-4'>Hy, {user?.fullName}</h1>
                    <p className='text-xl text-light-5 dark:text-light-4'>Have a nice day for you</p>
                </div>
                <div className="flex-col">
                    <h1 className='text-5xl font-bold text-light-5 dark:text-light-4'>{dateNow}</h1>
                </div>
            </div>
        </div>
    )
}

export default DashboardCard