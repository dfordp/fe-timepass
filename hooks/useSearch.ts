'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debounced
}

export function useSearch(query: string) {
  const debounced = useDebounce(query, 300)

  return useQuery({
    queryKey: ['search', debounced],
    queryFn: async () => {
      const res = await fetch(`/api/search?q=${debounced}`)
      if (!res.ok) throw new Error('Search failed')
      return res.json()
    },
    enabled: !!debounced,
  })
}

export function useMentionSearch(query: string) {
  const debounced = useDebounce(query, 300)

  return useQuery({
    queryKey: ['mention', debounced],
    queryFn: async () => {
      const res = await fetch(`/api/mentions?q=${debounced}`)
      if (!res.ok) throw new Error('Mention search failed')
      return res.json()
    },
    enabled: !!debounced,
  })
}
