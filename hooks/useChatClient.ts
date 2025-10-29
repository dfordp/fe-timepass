'use client'

import { useEffect, useState, useRef } from 'react'
import { mockStream } from '@/lib/stream'
import { loadSessions, saveSessions } from '@/lib/storage'
import type { ChatSession, Message } from '@/types/chat'

export function useChatClient() {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [streaming, setStreaming] = useState(false) // ✅ new
  const cancelRef = useRef<(() => void) | null>(null)

  // Load chats on mount
  useEffect(() => {
    const stored = loadSessions()
    if (stored.length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSessions(stored)
      setActiveId(stored[0].id)
    } else {
      const first: ChatSession = {
        id: crypto.randomUUID(),
        title: 'New Chat',
        createdAt: Date.now(),
        messages: [],
      }
      setSessions([first])
      setActiveId(first.id)
    }
  }, [])

  // Persist chats
  useEffect(() => {
    if (sessions.length) saveSessions(sessions)
  }, [sessions])

  const active = sessions.find((s) => s.id === activeId) ?? null

  const updateActive = (fn: (s: ChatSession) => ChatSession) => {
    if (!active) return
    setSessions((prev) => prev.map((s) => (s.id === active.id ? fn(s) : s)))
  }

  const createNew = () => {
    const newChat: ChatSession = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      createdAt: Date.now(),
      messages: [],
    }
    setSessions((prev) => [newChat, ...prev])
    setActiveId(newChat.id)
  }

  const clearAll = () => {
    setSessions([])
    setActiveId(null)
    localStorage.removeItem('chat_sessions_v1')
  }

  // ❌ Cancel streaming
  const cancel = () => {
    if (cancelRef.current) {
      cancelRef.current()
      cancelRef.current = null
      setSending(false)
      setStreaming(false)

      updateActive((s) => {
        const msgs = s.messages.map((m) => ({ ...m }))
        const last = msgs[msgs.length - 1]
        if (last?.role === 'assistant') last.content += ' [cancelled]'
        return { ...s, messages: msgs }
      })
    }
  }

  // 💬 Send message
  const send = (prompt: string) => {
    if (sending || streaming) return
    if (!active) return

    setSending(true)
    setStreaming(false)

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: prompt,
      createdAt: Date.now(),
    }

    const asstMsg: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: '',
      createdAt: Date.now(),
    }

    updateActive((s) => ({
      ...s,
      title: s.messages.length ? s.title : prompt.slice(0, 30),
      messages: [...s.messages, userMsg, asstMsg],
    }))

    const reply = "Here is a **mock streamed answer** to your question:\n\n```typescript\nconsole.log(\"Hello from a new chat!\");\n```"


    const cancelStream = mockStream(reply, {
      delay: 25,
      onToken: (token) => {
        // mark streaming started
        setStreaming(true)
        updateActive((s) => {
          const msgs = s.messages.map((m) => ({ ...m }))
          const lastIndex = msgs.length - 1
          if (lastIndex >= 0 && msgs[lastIndex].role === 'assistant') {
            msgs[lastIndex].content = (msgs[lastIndex].content || '') + token
          }
          return { ...s, messages: msgs }
        })
      },
      onDone: () => {
        setSending(false)
        setStreaming(false)
        cancelRef.current = null
      },
    })

    cancelRef.current = cancelStream
  }

  return {
    sessions,
    active,
    activeId,
    setActiveId,
    createNew,
    clearAll,
    send,
    cancel,
    sending,
    streaming, // ✅ exported
  }
}
