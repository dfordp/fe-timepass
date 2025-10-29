'use client'

import { useEffect, useRef } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChatSession } from '@/types/chat'
import { MarkdownMessage } from '@/components/ui/MarkdownMessage'
import Thinking from '../ui/Thinking'

export function ChatWindow({
  session,
  sending,
  streaming,
}: {
  session: ChatSession | null
  sending?: boolean
  streaming?: boolean
}) {
  const endRef = useRef<HTMLDivElement | null>(null)
  const shouldShowThinking = !!sending && !streaming

  // Auto-scroll on new messages or streaming state changes
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [session?.messages?.length, sending, streaming])

  // No session loaded yet
  if (!session) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-neutral-400 text-sm">
        <p className="text-center px-4">Start your first conversation 👇</p>
        {shouldShowThinking && (
          <div className="mt-3">
            <Thinking />
          </div>
        )}
      </div>
    )
  }

  // Session exists but no messages yet
  if (session.messages.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-neutral-400 text-sm">
        <p className="text-center px-4">Ask me anything…</p>
        {shouldShowThinking && (
          <div className="mt-3">
            <Thinking />
          </div>
        )}
      </div>
    )
  }

  // Chat thread
  return (
    <ScrollArea className="h-full">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">
        {session.messages.map((m) => (
          <div
            key={m.id}
            className={`group flex flex-col gap-2 ${
              m.role === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`rounded-2xl px-4 py-3 text-[15px] leading-relaxed border border-neutral-200 whitespace-pre-wrap shadow-sm transition-all duration-200 ${
                m.role === 'user'
                  ? 'bg-black text-white self-end'
                  : 'bg-white text-neutral-900'
              }`}
            >
              <MarkdownMessage content={m.content} />
            </div>
          </div>
        ))}

        {/* Thinking shows between send and first token */}
        {shouldShowThinking && <Thinking />}

        <div ref={endRef} />
      </div>
    </ScrollArea>
  )
}
