'use client';
import React, { useState } from 'react'
import HomeCard from './HomeCard';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/components/ui/use-toast"

const MeetingTypeList = () => {
    const router = useRouter()
    const [meetingState, setMeetingState] = useState<'isScheduledMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
    const { user } = useUser()
    const client = useStreamVideoClient()
    const { toast } = useToast();

    const [values, setValues] = useState({
        dateTime: new Date(),
        description: '',
        link: '',
    });
    const [callDetail, setCallDetail] = useState<Call>();

    const createMeeting = async () => {
        if (!user || !client) return
        try {
            if (!values.dateTime) {
                toast({
                    title: "Please select a date and time",
                })
                return;
            }

            const id = crypto.randomUUID()
            const call = client.call('default', id)

            if (!call) throw new Error('Failed to create call')

            const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || 'Instant Meeting';

            await call.getOrCreate({
                data: {
                    starts_at: startAt,
                    custom: {
                        description
                    }
                }
            })
            setCallDetail(call)

            if (!values.description) {
                router.push(`/meeting/${call.id}`)
            }

            toast({ title: "Meeting created successfully" })

        } catch (error) {
            console.log(error)
            toast({ title: "Failed to create Meeting", })
        }

    }

    return (
        <section className='grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCard
                img={'/icons/add-meeting.svg'}
                title={'New Meeting'}
                description={'Start a Instant meeting'}
                handleClick={() => setMeetingState('isInstantMeeting')}
                className='bg-orange-1'
            />
            <HomeCard
                img={'/icons/join-meeting.svg'}
                title={'Join Meeting'}
                description={'Via Invitation Link'}
                handleClick={() => setMeetingState('isJoiningMeeting')}
                className='bg-yellow-1'
            />
            <HomeCard
                img={'/icons/schedule.svg'}
                title={'Scheduled Meeting'}
                description={'Plan your meeting'}
                handleClick={() => setMeetingState('isScheduledMeeting')}
                className='bg-blue-1'
            />
            <HomeCard
                img={'/icons/recordings.svg'}
                title={'Views Recordings'}
                description={'Check out your recordings'}
                handleClick={() => router.push('/recordings')}
                className='bg-purple-1'
            />

            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title={'Start Instant Meeting'}
                className='text-center'
                buttonText='Start Meeting'
                handleClick={createMeeting}
            />
        </section>
    )
}

export default MeetingTypeList