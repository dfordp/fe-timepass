/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import {useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useSearch, useMentionSearch } from '@/hooks/useSearch'

export default function PromptBar({
  onSend,
  onCancel,
  disabled,
}: {
  onSend: (text: string) => void
  onCancel: () => void
  disabled?: boolean
}) {
  const [value, setValue] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const [open, setOpen] = useState(false)
  const [isMention, setIsMention] = useState(false)
  const [query, setQuery] = useState('')

  const searchQ = useSearch(!isMention ? query : '')
  const mentionQ = useMentionSearch(isMention ? query : '')
  const results = isMention ? mentionQ.data ?? [] : searchQ.data ?? []

  // detect @mentions and text queries
  useEffect(() => {
    const at = value.lastIndexOf('@')
    if (at !== -1 && value.slice(at + 1).length >= 1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsMention(true)
      setQuery(value.slice(at + 1))
      setOpen(true)
    } else if (value.trim().length >= 2) {
      setIsMention(false)
      setQuery(value.trim())
      setOpen(true)
    } else setOpen(false)
  }, [value])

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
      return
    }

    else if (e.key === 'Escape') {
      e.preventDefault()
      onCancel()
    }


    // existing mention + search navigation logic
    if (!open || !results.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIdx((i) => (i + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIdx((i) => (i - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const pick = results[activeIdx]
      if (pick) {
        const replacement = isMention ? '@' + pick.text : pick.text
        setValue(replacement)
        setOpen(false)
      }
    }
  }

  const submit = () => {
    const v = value.trim()
    if (!v) return
    onSend(v)
    setValue('')
    setOpen(false)
  }

  return (
   <div className="border-t border-neutral-200 bg-white/95 backdrop-blur-sm">
    <div className="mx-auto max-w-3xl px-4 py-4">
      <div className="flex items-end gap-2"> {/* Flex container for textarea and button */}
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask anything or use @mentions..."
          className="min-h-[52px] resize-none rounded-xl border border-neutral-300 focus:border-neutral-400 focus-visible:ring-0 text-sm bg-white flex-1"
        />
        <Button
          disabled={disabled}
          onClick={submit}
          className="h-[40px] rounded-xl px-5 bg-black text-white hover:bg-neutral-800 transition"
        >
          Send
        </Button>
      </div>

      {open && results.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 border border-neutral-200 bg-white rounded-xl shadow-md z-10 overflow-hidden">
          {results.map((r: any, i: number) => {
            const idx = r.text.toLowerCase().indexOf(query.toLowerCase())
            const before = r.text.slice(0, idx)
            const match = r.text.slice(idx, idx + query.length)
            const after = r.text.slice(idx + query.length)
            return (
              <div
                key={r.id}
                className={`px-4 py-2 text-sm cursor-pointer select-none ${
                  i === activeIdx ? 'bg-neutral-100' : ''
                }`}
                onMouseDown={() => {
                  setValue(isMention ? '@' + r.text : r.text)
                  setOpen(false)
                }}
              >
                {before}
                <strong>{match}</strong>
                {after}
              </div>
            )
          })}
        </div>
      )}
    </div>
  </div>
  )
}
