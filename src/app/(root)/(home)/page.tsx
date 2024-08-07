
import DashboardCard from '@/components/DashboardCard';
import MeetingTypeList from '@/components/MeetingTypeList';
import TabsDemo from '@/components/TabsNavigation';
import UpcomingMeetText from '@/components/UpcomingMeetText';


const Home = () => {
  const now = new Date()
  const time = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Jakarta',}).toLowerCase();
  const date = new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(now);
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      {/* <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <UpcomingMeetText />
          <div className="flex flex-col gap-2">
            <h1 className='text-4xl font-extrabold'>
              {time}
            </h1>
            <p className='text-lg font-medium text-sky-1 lg:text-2xl'>{date}</p>
          </div>
        </div>
      </div> */}
      <DashboardCard />
      <TabsDemo />
      <MeetingTypeList />
    </section>
  )
}

export default Home