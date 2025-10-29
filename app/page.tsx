import { Suspense } from 'react'
import { ChatLayout } from '@/components/chat/ChatLayout'

export default function Page() {
  return (
    <Suspense fallback={<div className="p-6 text-sm text-neutral-500">Loading…</div>}>
      <ChatLayout />
    </Suspense>
  )
}
