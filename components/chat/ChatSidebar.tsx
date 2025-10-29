'use client'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus } from 'lucide-react'
import { ChatSession } from '@/types/chat'

export function ChatSidebar({
  sessions,
  activeId,
  setActiveId,
  onCreate,
}: {
  sessions: ChatSession[]
  activeId: string | null
  setActiveId: (id: string) => void
  onCreate: () => void
}) {
  return (
    <div className="w-72 border-r border-neutral-200 h-screen flex flex-col bg-white/95 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
        <div className="font-medium text-[15px] text-neutral-800 tracking-tight">Chats</div>
        <Button
          variant="outline"
          size="icon"
          className="hover:bg-neutral-100 transition"
          onClick={onCreate}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {sessions.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveId(s.id)}
              className={`group w-full flex justify-between items-center text-left px-3 py-2 text-sm rounded-lg ${
                s.id === activeId
                  ? 'bg-neutral-100 font-medium'
                  : 'hover:bg-neutral-50 text-neutral-700'
              }`}
            >
              <span className="truncate">{s.title}</span>
            </button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-neutral-200 text-[12px] text-neutral-400 text-center">
        AI Chat • Minimal
      </div>
    </div>
  )
}

