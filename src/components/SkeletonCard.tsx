import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 rounded-xl">
      <div className="space-y-2">
        <Skeleton className="h-4 bg-light-2" />
        <Skeleton className="h-4 bg-light-2" />
      </div>
      <Skeleton className="h-[125px] min-w-[250px] w-full rounded-xl bg-light-2" />
    </div>
  )
}
