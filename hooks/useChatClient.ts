'use client'
import { useEffect, useState } from 'react'
import { mockStream } from '@/lib/stream'
import { loadSessions, saveSessions } from '@/lib/storage'
import { ChatSession, Message } from '@/types/chat'

export function useChatClient() {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  // 🧠 Load from localStorage on mount
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

  // 💾 Persist whenever sessions change
  useEffect(() => {
    if (sessions.length) saveSessions(sessions)
  }, [sessions])

  const active = sessions.find((s) => s.id === activeId) ?? null

  const updateActive = (fn: (s: ChatSession) => ChatSession) => {
    if (!active) return
    setSessions((prev) => prev.map((s) => (s.id === active.id ? fn(s) : s)))
  }

  // 🆕 Create a brand-new empty chat session
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

  // 🧹 Clear all chats
  const clearAll = () => {
    setSessions([])
    setActiveId(null)
    localStorage.removeItem('chat_sessions_v1')
  }

  // 💬 Send message (mock streaming)
  const send = (prompt: string) => {
    if (!active) return
    setSending(true)

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

    const reply =
      'Here is a **mock streamed answer** to your question.\n\n```ts\nconsole.log("Hello from a new chat!");\n```'

    mockStream(reply, {
      onToken: (token) =>
        updateActive((s) => {
          const msgs = [...s.messages]
          const last = msgs[msgs.length - 1]
          if (last.role === 'assistant') last.content += token
          return { ...s, messages: msgs }
        }),
      onDone: () => setSending(false),
    })
  }

  return {
    sessions,
    active,
    activeId,
    setActiveId,
    createNew,
    send,
    sending,
    clearAll,
  }
}
