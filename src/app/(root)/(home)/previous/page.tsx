import CallList from '@/components/CallList'
import DashboardCard from '@/components/DashboardCard'
import React from 'react'

const Previous = () => {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <DashboardCard />
    <h1 className='text-3xl font-bold text-light-5 dark:text-light-4'>
      Previous
    </h1>
    <CallList type='ended' />
  </section>
  )
}

export default Previous