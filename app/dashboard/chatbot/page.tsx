'use client'

import React from "react"

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { MessageCircle, Send, AlertCircle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

export default function ChatbotPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [inputValue, setInputValue] = useState('')
  const input = inputValue; // Declare input variable
  const setInput = setInputValue; // Declare setInput variable
  
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue && inputValue.trim()) {
      sendMessage({ text: inputValue })
      setInputValue('')
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">
              Maternal Health Assistant
            </h1>
          </div>
          <p className="text-muted-foreground">
            Ask me anything about GDM management, nutrition, exercise, or maternal health
          </p>
        </div>

        {/* Info Banner */}
        <Card className="mb-6 p-4 border-blue-200 bg-blue-50">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Important Disclaimer</p>
              <p>
                This chatbot provides general information and support only. Always consult
                your healthcare provider for medical advice, diagnosis, or treatment
                decisions.
              </p>
            </div>
          </div>
        </Card>

        {/* Chat Messages */}
        <Card className="mb-6 h-[500px] flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <MessageCircle className="w-12 h-12 text-primary/20 mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    Start a conversation about your maternal health journey
                  </p>
                </div>
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
                    className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground rounded-br-none'
                        : 'bg-secondary/20 text-foreground rounded-bl-none border border-secondary/30'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </div>
              ))
            )}

            {status === 'streaming' && (
              <div className="flex justify-start">
                <div className="bg-secondary/20 text-foreground rounded-lg rounded-bl-none px-4 py-2 border border-secondary/30">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-secondary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-secondary rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-secondary rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="flex justify-center">
                <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-lg text-sm">
                  Error: {error.message}. Please try again.
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about GDM..."
                disabled={status === 'streaming'}
                className="flex-1"
              />
              <Button
                type="submit"
                disabled={status === 'streaming' || !inputValue || !inputValue.trim()}
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-muted-foreground">
            Try asking about:
          </p>
          <div className="grid md:grid-cols-2 gap-2">
            {[
              'What are normal blood glucose levels during pregnancy?',
              'What foods should I eat with GDM?',
              'What exercises are safe during pregnancy?',
              'How often should I monitor my blood sugar?',
            ].map((question) => (
              <button
                key={question}
                onClick={() => {
                  setInputValue(question)
                  setTimeout(() => {
                    sendMessage({ text: question })
                  }, 0)
                }}
                className="text-left p-3 rounded-lg border border-border hover:bg-secondary/10 transition-colors text-sm"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
