'use client'
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
} from '@/components/ui/command'
import { useEffect, useState } from 'react'
import { PlusCircle, Trash2, Settings } from 'lucide-react'

export default function CommandMenu({
  onNew,
  onClear,
}: {
  onNew: () => void
  onClear: () => void
}) {
  const [open, setOpen] = useState(false)

  // toggle on ⌘ K / Ctrl K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search…" />
      <CommandList>
        <CommandGroup heading="General">
          <CommandItem onSelect={() => { onNew(); setOpen(false) }}>
            <PlusCircle className="mr-2 h-4 w-4" /> New Chat
          </CommandItem>
          <CommandItem onSelect={() => { onClear(); setOpen(false) }}>
            <Trash2 className="mr-2 h-4 w-4" /> Clear History
          </CommandItem>
          <CommandItem onSelect={() => setOpen(false)}>
            <Settings className="mr-2 h-4 w-4" /> Settings (coming soon)
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
