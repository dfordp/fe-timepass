'use client'
import CommandMenu from '@/components/ui/CommandMenu'
import { ChatWindow } from './ChatWindow'
import { useChatClient } from '@/hooks/useChatClient'
import PromptBar from './PromptBar'
import { ChatSidebar } from './ChatSidebar'

export function ChatLayout() {
  const {
    sessions,
    active,
    activeId,
    setActiveId,
    createNew,
    send,
    sending,
    streaming,   // 🧠 added streaming state from hook
    clearAll,
    cancel,      // ✅ destructure cancel
  } = useChatClient()

  return (
    <div className="flex h-dvh bg-white text-neutral-900">
      {/* Sidebar (desktop) */}
      <div className="hidden md:block w-72 border-r border-neutral-200">
        <ChatSidebar
          sessions={sessions}
          activeId={activeId}
          setActiveId={setActiveId}
          onCreate={createNew}
        />
      </div>

      {/* Main column */}
      <div className="flex flex-1 flex-col min-h-0">
        {/* Scrollable chat section */}
        <div className="flex-1 min-h-0 overflow-hidden">
          <ChatWindow session={active} sending={sending} streaming={streaming} />
        </div>

        {/* Input area */}
        <PromptBar onSend={send} onCancel={cancel} disabled={sending} />
      </div>

      <CommandMenu onNew={createNew} onClear={clearAll} />
    </div>
  )
}
