import { NextResponse } from 'next/server'

// Mock search dataset
const docs = [
  'Retrieval-Augmented Generation (RAG)',
  'Transformers architecture',
  'Self-attention mechanism',
  'Vector databases and embeddings',
  'Prompt engineering best practices',
  'Perplexity-style sticky UI',
]

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q')?.toLowerCase() ?? ''
  if (!q) return NextResponse.json([])
  const results = docs.filter((d) => d.toLowerCase().includes(q)).slice(0, 5)
  // simulate latency
  await new Promise((r) => setTimeout(r, 250))
  return NextResponse.json(results.map((t) => ({ id: t, text: t })))
}
