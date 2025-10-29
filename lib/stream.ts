export function mockStream(
  text: string,
  opts: { delay?: number; onToken: (t: string) => void; onDone?: () => void }
) {
  const delay = opts.delay ?? 25
  const tokens = text.split(/(\\s+)/)
  let i = 0
  const timer = setInterval(() => {
    if (i >= tokens.length) {
      clearInterval(timer)
      opts.onDone?.()
      return
    }
    opts.onToken(tokens[i++])
  }, delay)
}
