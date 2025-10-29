import { NextResponse } from 'next/server'

const people = Array.from({ length: 1000 }).map(
  (_, i) => `Person ${i + 1}`
)

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.toLowerCase() ?? ''
  if (!q) return NextResponse.json([])
  const results = people
    .filter((n) => n.toLowerCase().includes(q))
    .slice(0, 8)
  await new Promise((r) => setTimeout(r, 200))
  return NextResponse.json(results.map((t) => ({ id: t, text: t })))
}
