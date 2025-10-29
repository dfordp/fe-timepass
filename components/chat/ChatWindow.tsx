'use client'
import ReactMarkdown from 'react-markdown'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChatSession } from '@/types/chat'
import EmptyState from '../ui/EmptyState'
import Thinking from '../ui/Thinking'
import { Button } from '@/components/ui/button'
import { RefreshCw, Pencil } from 'lucide-react'

export function ChatWindow({
  session,
  sending,
  onRegenerate,
  onEdit,
}: {
  session: ChatSession | null
  sending?: boolean
  onRegenerate?: () => void
  onEdit?: (id: string) => void
}) {
  if (!session) return <div className="p-8 text-sm text-neutral-500">No chat</div>

  return (
    <ScrollArea className="flex-1">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {!session.messages.length ? (
          <EmptyState />
        ) : (
          session.messages.map((m) => (
            <div key={m.id} className={m.role === 'user' ? 'text-black' : 'text-neutral-700'}>
              <div className="flex items-center justify-between mb-1">
                <div className="text-xs text-neutral-500">
                  {m.role === 'user' ? 'You' : 'Assistant'}
                </div>
                {m.role === 'assistant' && (
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <Button size="icon" variant="ghost" onClick={onRegenerate}>
                      <RefreshCw className="w-3 h-3" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => onEdit?.(m.id)}>
                      <Pencil className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="prose prose-neutral max-w-none text-sm">
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            </div>
          ))
        )}
        {sending && <Thinking />}
      </div>
    </ScrollArea>
  )
}
