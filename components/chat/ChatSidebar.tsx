'use client'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus } from 'lucide-react'
import { ChatSession } from '@/types/chat'

export function ChatSidebar({
  sessions,
  activeId,
  setActiveId,
  onCreate,                    // ✅ add this prop
}: {
  sessions: ChatSession[]
  activeId: string | null
  setActiveId: (id: string) => void
  onCreate: () => void         // ✅ new prop
}) {
  return (
    <div className="w-64 border-r border-neutral-200 h-screen flex flex-col">
      <div className="flex items-center justify-between p-3 border-b">
        <div className="font-medium text-sm">Chats</div>
        <Button variant="outline" size="icon" onClick={onCreate}>
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {sessions.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={`w-full text-left text-sm px-3 py-2 rounded ${
                s.id === activeId ? 'bg-neutral-100' : 'hover:bg-neutral-50'
              }`}
            >
              {s.title || 'Untitled Chat'}
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
