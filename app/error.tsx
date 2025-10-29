'use client'
import ErrorState from '@/components/ui/ErrorState'
export default function Error({ error }: { error: Error }) {
  return <ErrorState msg={error.message} />
}
