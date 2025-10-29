export type Role = 'user' | 'assistant'

export interface Artifact {
  kind: 'markdown' | 'code'
  language?: string
  content: string
}

export interface Message {
  id: string
  role: Role
  content: string
  createdAt: number
  artifacts?: Artifact[]
}

export interface ChatSession {
  id: string
  title: string
  createdAt: number
  messages: Message[]
}
