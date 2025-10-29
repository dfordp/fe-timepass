# 🧠 AI Chatting App (Frontend Assignment)

A minimal, elegant **Claude / Perplexity-inspired AI Chat UI** built with **Next.js 14**, **TypeScript**, **React Query**, and **shadcn/ui** — designed in clean **black & white minimalism**.

Built for the Frontend Developer Technical Assignment.

---

## 🚀 Features

### 💬 Chat Experience

* **Token-by-token streaming** (mocked via `mockStream`)
* **Claude-style inline markdown & code blocks** with syntax highlighting
* **Pre-stream “Thinking…” animation** to simulate reasoning
* **Local persistence** via `localStorage` — chat survives reloads
* **Sticky question header** and scroll-stable chat layout
* **Copy / Regenerate / Edit (extendable hooks ready)**

### ⚙️ Architecture

* **Next.js 14 (App Router)** with Server Components
* **TypeScript** for type safety
* **React Query (TanStack)** for search caching & async control
* **shadcn/ui** for consistent components and styling
* **Tailwind CSS v4** for design system & spacing
* **Clean modular folder structure**

  ```
  app/
  ├── hooks/
  ├── components/
  │   ├── chat/
  │   ├── ui/
  ├── lib/
  ├── types/
  └── ...
  ```

### 🧠 Prompt Bar

* Smart **autocomplete** with mock server-side search
* **Mentions (`@`) support** with mock million-name dataset
* **Keyboard navigation**: ↑ ↓ ↩ Esc
* **Enter to send**, **Shift + Enter** for newline, **Esc to cancel**
* React Query caching for results

### 💻 UX Details

* Fully responsive (mobile ↔ desktop)
* Smooth **auto-scroll to latest message**
* **Thinking animation** shows only before streaming starts
* **“Stop generating” / Cancel** support mid-stream
* Simple, calm typography and whitespace layout

---

## 🛠️ Tech Stack

| Category           | Tool                             |
| ------------------ | -------------------------------- |
| Framework          | [Next.js 14](https://nextjs.org) |
| Language           | TypeScript                       |
| Styling            | Tailwind CSS v4 + shadcn/ui      |
| State / Data       | React Query (TanStack)           |
| Mock Streaming     | Custom `mockStream` utility      |
| Markdown Rendering | `react-markdown`                 |
| Icons              | `lucide-react`                   |

---

## 🧩 How It Works

1. When the user sends a prompt:

   * The `useChatClient()` hook creates a **user message** and an empty **assistant message**.
   * `sending = true`, `streaming = false` → “Thinking…” appears.

2. After a short delay, `mockStream` begins token-by-token updates.

   * Each token triggers `updateActive()` to append to the assistant message.
   * `streaming = true` hides “Thinking…” and begins showing the live reply.

3. When done (or cancelled):

   * The stream stops, `sending` and `streaming` reset to false.
   * State persists to `localStorage`.

---

## 🧱 Folder Structure

```
app/
 ├─ components/
 │   ├─ chat/
 │   │   ├─ ChatLayout.tsx
 │   │   ├─ ChatWindow.tsx
 │   │   ├─ PromptBar.tsx
 │   │   ├─ ChatSidebar.tsx
 │   │   └─ ChatSidebarResponsive.tsx
 │   └─ ui/
 │       ├─ Thinking.tsx
 │       ├─ CommandMenu.tsx
 │       ├─ EmptyState.tsx
 │       └─ MarkdownMessage.tsx
 ├─ hooks/
 │   ├─ useChatClient.ts
 │   ├─ useSearch.ts
 │   └─ ...
 ├─ lib/
 │   ├─ stream.ts
 │   ├─ storage.ts
 │   └─ utils.ts
 ├─ types/
 │   └─ chat.ts
 └─ app/
     ├─ page.tsx
     ├─ layout.tsx
     └─ react-query-provider.tsx
```

---

## ▶️ Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/dfordp/fe-timepass.git
cd ai-chat-assignment

# 2. Install dependencies
pnpm install   # or npm install / yarn

# 3. Run development server
pnpm dev

# 4. Open in browser
http://localhost:3000
```

---

## 🧪 Commands

| Action    | Command       |
| --------- | ------------- |
| Start Dev | `pnpm dev`    |
| Build     | `pnpm build`  |
| Lint      | `pnpm lint`   |
| Format    | `pnpm format` |

---

## 📝 Implementation Notes

* Streaming is **mocked**, not real network streaming — but follows the same incremental pattern used in OpenAI/Anthropic APIs.
* Cancel functionality stops token emission immediately.
* `ReactMarkdown` supports fenced code blocks and inline markdown.
* Chat state is persisted in `localStorage` (`chat_sessions_v1`).
* Layout uses **`min-h-0`** & **`h-dvh`** patterns to ensure scroll doesn’t break.

---

## 🧭 Next Improvements (If Extended)

* Integrate real API streaming (e.g., OpenAI / Claude / Perplexity).
* Add message editing and regenerate logic.
* Improve Markdown syntax highlighting with `rehype-highlight`.
* Add command menu actions for history / settings.

---

## 🖤 Author

Built by **Dilpreet Grover**

> “Elegant UX built with clarity, not clutter.”

