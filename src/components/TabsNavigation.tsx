'use client';
import { useState } from 'react';
import 'tailwindcss/tailwind.css';
import { IconMeet, IconRecording, IconSchedule } from './custom/IconList';
import { Button } from './ui/button';
import MeetingModal from './MeetingModal';
import Loader from './Loader';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from './ui/use-toast';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
};


const TabsDemo = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined);

  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();
  const client = useStreamVideoClient();
  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  const createMeeting = async () => {
    if (!client || !user) return;
    try {
      if (!values.dateTime) {
        toast({ title: 'Please select a date and time' });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error('Failed to create meeting');
      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';
      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetail(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: 'Meeting Created',
      });
    } catch (error) {
      console.error(error);
      toast({ title: 'Failed to create Meeting' });
    }
  };

  if (!client || !user) return <Loader />;

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

  const tabs = [
    {
      name: 'New Meeting',
      content: <div className=' min-h-[200px] flex flex-col gap-16 items-center justify-center text-light-5 dark:text-light-4'>
        <h1 className='text-3xl font-normal'>Start an instan Meeting</h1>
        <Button className='font-bold rounded-full px-36 bg-light-6 dark:bg-dark-4 text-light-5 dark:text-light-4 
        hover:text-blue-2 hover:border border-blue-2 transition-all ease-in-out duration-300 active:scale-95'
        onClick={() => setMeetingState('isInstantMeeting')}
        >Start Meeting</Button>
      </div>,
      icons: <IconRecording className={`w-6 h-6 transition-colors duration-300 ${activeTab === 0
        ? 'text-white'
        : 'text-gray-500'
        }`} />,
    },
    {
      name: `Join Meeting`,
      content: `Content for Tab 2`,
      icons: <IconMeet className={`w-6 h-6 transition-colors duration-300 ${activeTab === 1
        ? 'text-white'
        : 'text-gray-500'
        }`} />,
    },
    {
      name: `Schedule Meeting`,
      content: `Content for Tab 3`,
      icons: <IconSchedule className={`w-6 h-6 transition-colors duration-300 ${activeTab === 2
        ? 'text-white'
        : 'text-gray-500'
        }`} />,
    }
  ];

  return (
    <div className="w-full">
      <div className="bg-light-4 dark:bg-dark-2 rounded-full p-2">
        <div className="relative">
          <div className="grid grid-cols-3 gap-1 relative z-10">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`py-3 px-4 rounded-full transition-colors duration-300 flex items-center justify-center gap-4
                   ${activeTab === index
                    ? 'text-white'
                    : 'text-light-5 dark:text-light-2'
                  }`}
                onClick={() => setActiveTab(index)}
              >
                {tab.icons}
                <p className='text-lg'>{tab.name}</p>
              </button>
            ))}
          </div>
          <div
            className="absolute top-0 left-0 h-full w-1/3 bg-blue-2 rounded-full transition-transform duration-300"
            style={{ transform: `translateX(${activeTab * 100}%)` }}
          />
        </div>
      </div>
      <div className="mt-7 p-4 rounded-xl bg-light-4 dark:bg-dark-2">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`transition-opacity duration-300 ${activeTab === index ? 'opacity-100' : 'opacity-0'
              } ${activeTab === index ? 'block' : 'hidden'}`}
          >
            <div className='container flex flex-col items-center'>
              {tab.content}
            </div>
          </div>
        ))}
      </div>
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Do you want to start an instant meeting?"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />

    </div>
  );
};

export default TabsDemo;
