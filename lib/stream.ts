export function mockStream(
  text: string,
  opts: { delay?: number; onToken: (token: string) => void; onDone?: () => void }
) {
  const tokens = Array.from(text)
  const delay = opts.delay ?? 25
  let cancelled = false

  ;(async () => {
    // 🧠 slight initial delay so "Thinking..." has time to show
    await new Promise((r) => setTimeout(r, 600))

    for (let i = 0; i < tokens.length; i++) {
      if (cancelled) return
      opts.onToken(tokens[i])
      await new Promise((r) => setTimeout(r, delay))
    }
    if (!cancelled) opts.onDone?.()
  })()

  return () => {
    cancelled = true
  }
}