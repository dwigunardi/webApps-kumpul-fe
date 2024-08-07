'use client'

import { useGetCalls } from '@/hooks/useGetCalls';
import { Call } from '@stream-io/video-react-sdk';
import React from 'react'

const UpcomingMeetText = () => {
    const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
    return (
        <div className='flex flex-col gap-4'>
            {upcomingCalls?.map((call: Call) =>
            (
                <h2 className='glassmorphism max-w-fit px-3 rounded py-2 text-center text-base font-normal' key={call.id}>
                    Upcoming Meeting at {call.state?.startsAt?.toLocaleString().split(',')[0] + ', ' + call.state?.startsAt?.toLocaleString().split(',')[1].slice(0, 6) ?? 'No Upcoming Meeting'}
                </h2>
            )
            )}
        </div>
    )
}

export default UpcomingMeetText