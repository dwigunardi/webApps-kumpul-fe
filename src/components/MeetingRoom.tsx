'use client';

import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks
} from "@stream-io/video-react-sdk";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LayoutList, MessageSquare, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";
import ChatRoom from "./ChatRoom";

type CallLayoutType = 'speaker-left' | 'speaker-right' | 'grid'

const MeetingRoom = ({ meetingId }: { meetingId: string }) => {
  const searchParms = useSearchParams()
  const router = useRouter()
  const isPersonalRoom = !!searchParms.get('personal')
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipant, setShowParticipant] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { useCallCallingState } = useCallStateHooks()

  const callingState = useCallCallingState()

  if (callingState !== CallingState.JOINED) return <Loader />

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className='relative h-screen w-full overflow-hidden text-light-5 dark:text-white'>
      <div className="relative flex size-full items-center justify-center">
        <div className="flex h-[100%] w-[100%] max-w-full items-center mx-20">
          <CallLayout />
        </div>
        <div className={cn(`h-[calc(100vh-86px)] ${showParticipant ? '' : 'hidden'} ml-2`, {
          'show-block': showParticipant
        })}>
          <CallParticipantsList onClose={() => setShowParticipant(false)} />
        </div>
        <div className={cn(`h-[calc(100vh-86px)] ${showChat ? '' : 'hidden'} ml-2`, {
          'show-block': showChat
        })}>
          <ChatRoom onClose={() => {
            setShowChat(false)
            document.getElementById('indicator-badge')?.classList.remove('absolute')
            document.getElementById('indicator-badge')?.classList.add('hidden')
          }} isShow={showChat} />
        </div>
      </div>
      <div className="fixed bottom-0 flex flex-wrap w-full items-center justify-center gap-5 mx-auto">
        <CallControls onLeave={() => {
          router.push('/')
        }} /> 
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] p-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>

          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white ">
            {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, idx) => (
              <div key={idx}>
                <DropdownMenuItem
                  onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
                  className="cursor-pointer"
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button title="Participants" onClick={() => setShowParticipant((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] p-4 py-2 hover:bg-[#4c535b]">
            <Users size={20} className="text-white" />
          </div>
        </button>
        <button title="ChatBox" onClick={() => setShowChat((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] p-4 py-2 hover:bg-[#4c535b]">
            <div className="relative">
              <div className="absolute inset-0 h-2 w-2 rounded-full bg-red-500" id="indicator-badge">
                <div className="absolute inset-0 h-2 w-2 rounded-full animate-ping bg-red-500 hidden"></div>
              </div>
              <MessageSquare size={20} className="text-white" />
            </div>
          </div>
        </button>
        {!isPersonalRoom && (
          <EndCallButton />
        )}
      </div>
    </section>
  )
}

export default MeetingRoom