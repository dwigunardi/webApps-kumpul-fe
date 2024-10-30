'use client';
import { DeviceSettings, OwnCapability, VideoPreview, useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const MeetingSetup = ({setIsSetupComplete}: {setIsSetupComplete: (value: boolean) => void}) => {
    const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(false)
    const { useCallSettings, useMicrophoneState, useCameraState } = useCallStateHooks();
    const settings = useCallSettings();
    const { microphone, isMute } = useMicrophoneState();
    const { camera, hasBrowserPermission } = useCameraState();
    const call = useCall()
    const pathName = usePathname()
    const router = useRouter()
    const param = useSearchParams()

    if(!call) throw new Error('useCall must be used within a StreamCall Component!')

    useEffect(() => {
        let sub = true
        if(isMicCamToggleOn){
            call?.camera.disable()
            call?.microphone.disable()
        }else{
            call?.camera.enable()
            call?.microphone.enable()   
        }
        return () => {
            sub = false
        };
    }, [isMicCamToggleOn, call?.camera, call?.microphone]);

    useEffect(() => {
        const handlePopState = async (event: PopStateEvent | any) => {
            if(event.target as any == null) return
            if(event?.target?.location.pathname != pathName) {
                await call.microphone.disable()
                await call.camera.disable()
                await call.endCall()
                setIsMicCamToggleOn(false)
            }            
        }
        // window.onpopstate = handlePopState
        window.onpopstate = handlePopState
        // return () => window.removeEventListener('popstate', handlePopState)
    }, [isMicCamToggleOn, call, pathName, call?.camera, call?.microphone])

  return (
    <div className='flex flex-col h-screen w-full items-center justify-center gap-3 text-light-5 dark:text-white'>
        <h1 className="text-2xl font-bold">Setup</h1>
        <VideoPreview />
        <div className="flex h-16 items-center justify-center gap-3">
            <label htmlFor="" className="flex items center justify-center gap-2">
                <input type="checkbox" name="" id="" checked={isMicCamToggleOn} onChange={(e) => setIsMicCamToggleOn(e.target.checked)} />
                Join With Mic and Camera Off
            </label>
            <DeviceSettings />
        </div>
        <Button className='rounded-md bg-blue-2 text-white px-4 py-2.5' onClick={() => {
            call?.join()
            setIsSetupComplete(true)
        }}>Join Meeting</Button>
    </div>
  )
}

export default MeetingSetup