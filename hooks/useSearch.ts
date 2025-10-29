'use client'
import { useQuery } from '@tanstack/react-query'

export function useSearch(query: string) {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      if (!query) return []
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      return (await res.json()) as { id: string; text: string }[]
    },
    enabled: !!query,
    staleTime: 60_000,
  })
}

export function useMentionSearch(query: string) {
  return useQuery({
    queryKey: ['mentions', query],
    queryFn: async () => {
      if (!query) return []
      const res = await fetch(`/api/mentions?q=${encodeURIComponent(query)}`)
      return (await res.json()) as { id: string; text: string }[]
    },
    enabled: !!query,
    staleTime: 60_000,
  })
}
