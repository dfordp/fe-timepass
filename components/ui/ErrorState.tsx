'use client'
export default function ErrorState({ msg }: { msg?: string }) {
  return (
    <div className="text-sm text-red-500 p-6 text-center">
      {msg ?? 'Something went wrong.'}
    </div>
  )
}
