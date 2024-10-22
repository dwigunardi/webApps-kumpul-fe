'use client'
import { Calendar } from "@/components/ui/calendar"
import { useGetCalls } from "@/hooks/useGetCalls";
import { addDays } from "date-fns";
import React, { useEffect, useState } from "react"
import { useDebounce } from "@/hooks/useDebounce";
import { Call } from "@stream-io/video-react-sdk";
import { SkeletonCard } from "./SkeletonCard";

export default function DateCalendar() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([new Date()]);
  const [isShowTooltip, setIsShowTooltip] = useState(false);
  const showTooltip = useDebounce(isShowTooltip, 300);
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();

  if (isLoading) return <SkeletonCard />
  
  return (
    <Calendar
      mode="multiple"
      selected={selectedDates}
      onSelect={(dates) => console.log('select', dates)}
      className="rounded-xl shadow-lg bg-white dark:bg-dark-1 text-light-5 dark:text-light-4"
      onDayMouseEnter={(e) => selectedDates.includes(new Date(e)) ? setIsShowTooltip(true) : setIsShowTooltip(false)}
      footer={
        !isLoading &&
        <div className="flex flex-col">
          <p>Upcoming calls</p>
          {(upcomingCalls as Call[])?.map((call, idx) => (
            <p key={idx}>{idx + 1}. {(call as Call).state?.startsAt?.toLocaleDateString()}</p>
          ))}
        </div>
      }
    />
  )
}
