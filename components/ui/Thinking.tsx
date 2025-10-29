'use client'
import { Skeleton } from '@/components/ui/skeleton'

export default function Thinking() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-neutral-500">
        <span className="animate-pulse">Thinking</span>
        <span className="animate-pulse">…</span>
      </div>

      {/* A few shimmer lines to mimic loading text */}
      <Skeleton className="h-4 w-11/12" />
      <Skeleton className="h-4 w-10/12" />
      <Skeleton className="h-4 w-9/12" />
    </div>
  )
}
