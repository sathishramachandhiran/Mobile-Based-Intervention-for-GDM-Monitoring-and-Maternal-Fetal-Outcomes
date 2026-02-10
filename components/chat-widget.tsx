'use client'

import React from "react"

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MessageCircle, X, Send } from 'lucide-react'
import { useState } from 'react'

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const { messages, input, setInput, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      sendMessage(input)
      setInput('')
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      {isOpen ? (
        <div className="w-96 max-h-96 bg-card border border-border rounded-lg shadow-lg flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Health Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-secondary/20 rounded transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background/50">
            {messages.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">
                  Ask me about GDM management and health tips
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded text-sm ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-secondary/30 text-foreground rounded-bl-none'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))
            )}
            {status === 'streaming' && (
              <div className="flex justify-start">
                <div className="flex gap-1 px-3 py-2">
                  <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-secondary rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-secondary rounded-full animate-bounce delay-200" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-border flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me..."
              disabled={status === 'streaming'}
              className="text-sm"
            />
            <Button
              type="submit"
              disabled={status === 'streaming' || !input.trim()}
              size="sm"
              className="px-3"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}
