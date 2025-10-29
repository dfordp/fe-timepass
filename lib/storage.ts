import { ChatSession } from '@/types/chat'

const KEY = 'chat_sessions_v1'

export function loadSessions(): ChatSession[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveSessions(s: ChatSession[]) {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify(s))
}
