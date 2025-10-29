'use client'
import CommandMenu from '@/components/ui/CommandMenu'
import { ChatWindow } from './ChatWindow'
import { useChatClient } from '@/hooks/useChatClient'
import PromptBar from './PromptBar'
import { ChatSidebar } from './ChatSidebar'
import ChatSidebarResponsive from './ChatSidebarResponsive'

export function ChatLayout() {
  const {
    sessions,
    active,
    activeId,
    setActiveId,
    createNew,
    send,
    sending,
    clearAll,
  } = useChatClient()

  return (
    <div className="flex h-screen bg-white text-neutral-900">
      {/* Desktop sidebar */}
      <div className="hidden md:block w-72">
        <ChatSidebar
          sessions={sessions}
          activeId={activeId}
          setActiveId={setActiveId}
          onCreate={createNew}
        />
      </div>

      {/* Mobile sidebar */}
      <ChatSidebarResponsive
        sessions={sessions}
        activeId={activeId}
        setActiveId={setActiveId}
        createNew={createNew}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <ChatWindow session={active} />
        <PromptBar onSend={send} disabled={sending} />
      </div>

      {/* ⌘K Command Menu */}
      <CommandMenu onNew={createNew} onClear={clearAll} />
    </div>
  )
}
