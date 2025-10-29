'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css'

export function MarkdownMessage({ content }: { content: string }) {
  return (
    <div className="prose prose-neutral max-w-none text-[15px] leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
        pre: ({ node, ...props }) => (
          <pre
            className="bg-neutral-50 border border-neutral-200 rounded-lg p-3 overflow-x-auto text-[13px]"
            {...props}
          />
        ),
        code: ({ className, children, inline, ...props }: { className?: string; children?: React.ReactNode; inline?: boolean }) => {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <code
              className={`language-${match[1]} text-[13px]`}
              {...props}
            >
              {children}
            </code>
          ) : (
            <code className="bg-neutral-100 rounded px-1 py-0.5 text-[13px]" {...props}>
              {children}
            </code>
          )
        },
      }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}