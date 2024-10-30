'use client'
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const EndCallButton = () => {
    const call = useCall()
    const router = useRouter()
    const { useLocalParticipant } = useCallStateHooks()
    const localParticipant = useLocalParticipant()
    const [isLoading, setIsLoading] = React.useState(false)

    const isMeetingOwner = localParticipant && call?.state.createdBy && localParticipant.userId === call.state.createdBy.id
    if(!isMeetingOwner) return null
    return (
        <Button disabled={isLoading} onClick={async() => {
            await setIsLoading(true)
            await call.endCall()
            await setIsLoading(false)
            console.log(call?.state)
            router.push('/')
        }}
        className='bg-red-500 text-white hover:bg-red-600'
        >
        {isLoading ? <Loader2 className='mr-2 h-4 w-4 animate-spin' /> : null}
            End Call For Everyone
        </Button>
    )
}

export default EndCallButton