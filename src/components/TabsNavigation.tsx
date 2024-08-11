'use client';
import { useRef, useState } from 'react';
import 'tailwindcss/tailwind.css';
import { IconMeet, IconRecording, IconSchedule } from './custom/IconList';
import { Button } from './ui/button';
import MeetingModal from './MeetingModal';
import Loader from './Loader';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from './ui/use-toast';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker';
import { Calendar } from 'lucide-react';
import { id } from 'date-fns/locale';

const initialValues = {
  dateTime: new Date(),
  description: '',
  link: '',
};


const TabsNavigation = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [meetingState, setMeetingState] = useState<
    'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
  >(undefined);

  const [values, setValues] = useState(initialValues);
  const [callDetail, setCallDetail] = useState<Call>();
  const client = useStreamVideoClient();
  const { user } = useUser();
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const deskripsiRef = useRef<HTMLTextAreaElement>(null);
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
      content: <div className=' min-h-[200px] flex flex-col gap-6 items-center justify-center text-light-5 dark:text-light-4'>
        <h1 className='text-3xl font-normal'>Start Joining a Meeting</h1>
        <Input
          ref={inputRef}
          placeholder="Meeting link"
          onChange={(e: any) => {
            setValues({ ...values, link: e.target.value })
            inputRef.current ? inputRef.current.style.border = 'none' : null
          }}
          className="border-none bg-light-6 text-light-5 dark:bg-dark-3 dark:text-light-4 focus-visible:ring-0 focus-visible:ring-offset-0 w-full"
        />
        <Button className='font-bold rounded-full px-36 bg-light-6 dark:bg-dark-4 text-light-5 dark:text-light-4 
        hover:text-blue-2 hover:border border-blue-2 transition-all ease-in-out duration-300 active:scale-95'
          onClick={() => {
            if (!values.link) {
              inputRef.current?.focus();
              inputRef.current ? inputRef.current.style.border = '1px solid red' : null
              toast({ title: 'Please enter a link', variant: 'default' });
              return;
            }
            setMeetingState('isJoiningMeeting');
          }}
        >Start Meeting</Button>
      </div>,
      icons: <IconMeet className={`w-6 h-6 transition-colors duration-300 ${activeTab === 1
        ? 'text-white'
        : 'text-gray-500'
        }`} />,
    },
    {
      name: `Schedule Meeting`,
      content: <div className=' min-h-[200px] w-full flex flex-col gap-6 items-center justify-center text-light-5 dark:text-light-4'>
        <h1 className='text-3xl font-normal'>Start Schedule a Meeting</h1>
        <div className="flex flex-col gap-2.5 w-full">
          <label className="text-base font-normal leading-[22.4px] text-light-5 dark:text-light-4">
            Add a description
          </label>
          <Textarea
            ref={deskripsiRef}
            className="border-none bg-light-6 text-light-5 dark:bg-dark-3 dark:text-light-4 focus-visible:ring-0 focus-visible:ring-offset-0"
            onChange={(e) => {
              setValues({ ...values, description: e.target.value })
              deskripsiRef.current ? deskripsiRef.current.style.border = 'none' : null
              }
            }
          />
        </div>
        <div className="flex w-full flex-col gap-2.5">
          <label className="text-base font-normal leading-[22.4px] text-light-5 dark:text-light-4">
            Select Date and Time
          </label>
          <ReactDatePicker
            selected={values.dateTime}
            onChange={(date) => setValues({ ...values, dateTime: date! })}
            showTimeSelect
            showIcon
            icon={<Calendar className="w-6 h-6 mr-3" />}
            calendarIconClassName='text-light-5 dark:text-light-4 absolute right-3 top-1/2 -translate-y-1/2'
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            locale={id}
            dateFormat="MMMM d, yyyy HH:mm"
            yearClassName={(year) => 'bg-light-4 dark:bg-dark-3 text-light-5 dark:text-light-4'}
            calendarClassName='bg-light-4 dark:bg-dark-1 text-light-5 dark:text-light-4'
            dayClassName={(day) => 'bg-light-4 dark:bg-dark-3 text-light-5 aria-selected:bg-blue-2 aria-selected:text-light-4 dark:aria-selected:bg-blue-2 dark:text-light-4 hover:bg-light-5 hover:text-light-4 hover:bg-blue-2 dark:hover:bg-dark-4'}
            timeClassName={(time) => 'bg-light-4 dark:bg-dark-3 text-light-5 aria-selected:text-light-4 dark:aria-selected:text-light-4 !dark:aria-selected:bg-blue-2 dark:text-light-4 hover:bg-blue-2 dark:hover:text-light-5'}
            className="w-full rounded bg-light-6 text-light-5 dark:bg-dark-3 dark:text-light-4  focus:outline-none"
          />
        </div>
        <Button className='font-bold rounded-full px-36 bg-light-6 dark:bg-dark-4 text-light-5 dark:text-light-4 
        hover:text-blue-2 hover:border border-blue-2 transition-all ease-in-out duration-300 active:scale-95'
          onClick={() => {
            if (!values.dateTime) {
              toast({ title: 'Please select a date and time', variant: 'default' });
              return;
            }
            if (!values.description) {
              deskripsiRef.current?.focus();
              deskripsiRef.current ? deskripsiRef.current.style.border = '1px solid red' : null
              toast({ title: 'Please enter a description', variant: 'default' });
              return;
            }
            setMeetingState('isScheduleMeeting');
          }}
        >Start Meeting</Button>
      </div>,
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
            className={`absolute top-0 left-0 h-full w-1/3 bg-blue-2 rounded-full transition-transform duration-300`}
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
      {!callDetail ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting with this Schedule?"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <p>Tanggal: {values.dateTime.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', })}</p>
            <p>Jam: {values.dateTime.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta', })}</p>
            <p>Deskripsi: {values.description}</p>
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'Link Copied' });
          }}
          image={'/icons/checked.svg'}
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )}

      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Are you sure you want to join this meeting?"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
      </MeetingModal>
    </div>
  );
};

export default TabsNavigation;
