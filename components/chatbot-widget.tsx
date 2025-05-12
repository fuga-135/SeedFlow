"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, User, Bot } from "lucide-react"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hello! I'm SeedFlow's assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [language, setLanguage] = useState("en")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses: Record<string, string> = {
        "how do i repay?":
          "Repayments are made directly through your connected Solana wallet. When a payment is due, you'll receive a notification. Simply click the 'Make Payment' button in your dashboard, confirm the transaction in your wallet, and you're done!",
        "what is drought cover?":
          "Drought coverage is a parametric insurance option that protects your loan if rainfall levels fall below 40% of the seasonal average for 30 consecutive days. If triggered, you'll receive an automatic payout to help offset crop losses without filing any claims.",
        "explain apr vs apy":
          "APR (Annual Percentage Rate) is the simple interest rate over a year. APY (Annual Percentage Yield) includes compound interest. On SeedFlow, loans use APR for simplicity - a 10% APR on a $100 loan means $10 interest over a year, regardless of payment frequency.",
      }

      let responseText =
        "I don't have specific information about that. Could you try asking about loan repayments, insurance coverage, or interest rates?"

      // Check for keyword matches
      const inputLower = input.toLowerCase()
      for (const [keyword, response] of Object.entries(responses)) {
        if (inputLower.includes(keyword)) {
          responseText = response
          break
        }
      }

      // Add AI response
      const aiMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: responseText,
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button size="icon" className="rounded-full h-12 w-12 shadow-lg">
            <MessageCircle className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[90vw] sm:max-w-md p-0 flex flex-col h-[80vh]">
          <SheetHeader className="px-4 py-3 border-b">
            <div className="flex justify-between items-center">
              <SheetTitle>SeedFlow Assistant</SheetTitle>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="sw">Swahili</SelectItem>
                  <SelectItem value="km">Khmer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex max-w-[80%] ${
                    message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                  } rounded-lg px-3 py-2`}
                >
                  <div className="mr-2 mt-0.5">
                    {message.role === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div className="text-sm">{message.content}</div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg px-3 py-2">
                  <div className="flex space-x-1">
                    <div
                      className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <Button size="icon" onClick={handleSendMessage} disabled={!input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              This is a demo assistant. For complex questions, please contact support.
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
