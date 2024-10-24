'use client';

import Loader from "@/components/Loader";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useSearchParams } from "next/navigation";
import { useState } from "react";


const Meeting = ({ params: { id } }: { params: { id: string } }) => {
    const { user, isLoaded } = useUser();
    const [isSetupComplete, setIsSetupComplete] = useState(false)
    const params = useSearchParams()
    const { call, isCallLoading } = useGetCallById(params.get('id') ?? id)   
    if(!isLoaded || isCallLoading ) return <Loader />

    return (
        <main className="h-screen w-full">
            <StreamCall call={call}>
                <StreamTheme>
                    {!isSetupComplete ? (
                        <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
                    ) : (
                        <MeetingRoom meetingId={params.get('id') ?? id} />
                    )}
                </StreamTheme>
            </StreamCall>
        </main>
    )
}

export default Meeting