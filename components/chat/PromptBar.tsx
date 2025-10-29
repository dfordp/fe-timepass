'use client'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useSearch, useMentionSearch } from '@/hooks/useSearch'

export default function PromptBar({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void
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

  // detect "@" mentions and normal search
  useEffect(() => {
    const at = value.lastIndexOf('@')
    if (at !== -1 && value.slice(at + 1).length >= 1) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsMention(true)
      setQuery(value.slice(at + 1))
      setOpen(true)
    } else if (value.length >= 2) {
      setIsMention(false)
      setQuery(value)
      setOpen(true)
    } else setOpen(false)
  }, [value])

  const handleKey = (e: React.KeyboardEvent) => {
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
    } else if (e.key === 'Escape') {
      setOpen(false)
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
    <div className="border-t border-neutral-200 bg-white relative">
      <div className="mx-auto max-w-3xl px-4 py-3 relative">
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask or @mention someone..."
          className="min-h-[60px] resize-none bg-white"
        />

        {open && results.length > 0 && (
          <div className="absolute left-0 right-0 mt-1 border border-neutral-200 bg-white rounded-lg shadow z-10">
            {results.map((r, i) => {
              const idx = r.text.toLowerCase().indexOf(query.toLowerCase())
              const before = r.text.slice(0, idx)
              const match = r.text.slice(idx, idx + query.length)
              const after = r.text.slice(idx + query.length)
              return (
                <div
                  key={r.id}
                  className={`px-3 py-2 text-sm cursor-pointer ${
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

        <div className="flex justify-end mt-2">
          <Button onClick={submit} disabled={disabled}>
            Send
          </Button>
        </div>
      </div>
    </div>
  )
}
