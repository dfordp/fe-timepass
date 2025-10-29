'use client'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Menu, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChatSession } from '@/types/chat'

export default function ChatSidebarResponsive({
  sessions,
  activeId,
  setActiveId,
  createNew,
}: {
  sessions: ChatSession[]
  activeId: string | null
  setActiveId: (id: string) => void
  createNew: () => void
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden m-2" aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-0 w-64">
        <div className="border-b border-neutral-200 flex items-center justify-between p-3">
          <div className="text-sm font-medium">Chats</div>
          <Button
            variant="outline"
            size="icon"
            onClick={createNew}
            aria-label="New Chat"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-3rem)]">
          {sessions.length ? (
            sessions.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveId(s.id)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  s.id === activeId ? 'bg-neutral-100' : 'hover:bg-neutral-50'
                }`}
              >
                {s.title}
              </button>
            ))
          ) : (
            <div className="p-4 text-sm text-neutral-500">No chats yet.</div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
