'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface Message {
  role: 'user' | 'ai'
  text: string
}

const COPY = {
  pl: {
    openLabel: 'Otwórz chat',
    title: 'Asystent Profitia',
    closeLabel: 'Zamknij chat',
    empty: 'Cześć! Jak mogę Ci pomóc w zakupach lub negocjacjach z dostawcami?',
    typing: 'Piszę...',
    noReply: 'Brak odpowiedzi.',
    error: 'Błąd połączenia. Spróbuj ponownie.',
    placeholder: 'Napisz wiadomość...',
  },
  en: {
    openLabel: 'Open chat',
    title: 'Profitia Assistant',
    closeLabel: 'Close chat',
    empty: 'Hello! How can I help you with procurement or supplier negotiations?',
    typing: 'Typing...',
    noReply: 'No reply received.',
    error: 'Connection error. Please try again.',
    placeholder: 'Type a message...',
  },
} as const

export default function ChatWidget() {
  const pathname = usePathname()
  const t = COPY[pathname.startsWith('/en') ? 'en' : 'pl']

  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    const text = input.trim()
    if (!text || loading) return

    setMessages((prev) => [...prev, { role: 'user', text }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'ai', text: data.reply ?? t.noReply }])
    } catch {
      setMessages((prev) => [...prev, { role: 'ai', text: t.error }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 1000 }}>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            background: '#1a365d',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: 56,
            height: 56,
            fontSize: 24,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}
          aria-label={t.openLabel}
        >
          💬
        </button>
      )}

      {open && (
        <div
          style={{
            width: 320,
            height: 460,
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: 12,
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              background: '#1a365d',
              color: 'white',
              padding: '12px 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            <span>{t.title}</span>
            <button
              onClick={() => setOpen(false)}
              style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: 18 }}
              aria-label={t.closeLabel}
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {messages.length === 0 && (
              <p style={{ color: '#718096', fontSize: 13, margin: 0 }}>
                {t.empty}
              </p>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  background: m.role === 'user' ? '#1a365d' : '#f7fafc',
                  color: m.role === 'user' ? 'white' : '#2d3748',
                  padding: '8px 12px',
                  borderRadius: 10,
                  maxWidth: '85%',
                  fontSize: 13,
                  lineHeight: 1.5,
                  whiteSpace: 'pre-wrap',
                }}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: 'flex-start', color: '#718096', fontSize: 13 }}>
                {t.typing}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ borderTop: '1px solid #e2e8f0', padding: 8, display: 'flex', gap: 6 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.placeholder}
              disabled={loading}
              style={{
                flex: 1,
                border: '1px solid #e2e8f0',
                borderRadius: 8,
                padding: '8px 10px',
                fontSize: 13,
                outline: 'none',
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              style={{
                background: '#1a365d',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                padding: '8px 14px',
                fontSize: 13,
                cursor: 'pointer',
                opacity: loading || !input.trim() ? 0.5 : 1,
              }}
            >
              ↑
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
