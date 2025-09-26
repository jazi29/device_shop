"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Cpu, Monitor, Mouse } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
  suggestions?: string[]
}

const quickQuestions = [
  "Ойын үшін ең жақсы видеокарта қайсысы?",
  "Бюджетті процессор ұсыныңыз",
  "Механикалық пернетақта керек",
  "SSD пен HDD арасындағы айырмашылық",
  "Ойын тышқанын қалай таңдау керек?",
  "Құлақаспап ұсыныңыз",
]

const productRecommendations = [
  {
    name: "Intel Core i5-13600K",
    price: 148500,
    category: "Процессорлар",
    icon: Cpu,
    description: "Ойын мен жұмыс үшін тамаша таңдау",
  },
  {
    name: "NVIDIA RTX 4070",
    price: 270000,
    category: "Видеокарталар",
    icon: Monitor,
    description: "1440p ойындар үшін керемет өнімділік",
  },
  {
    name: "Logitech G502 Hero",
    price: 36000,
    category: "Ойын тышқандары",
    icon: Mouse,
    description: "Дәлдік пен ыңғайлылық",
  },
]

export function AIChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Сәлеметсіз бе! Мен Device Shop AI көмекшісімін. Сізге қандай өнім керек? Мен сізге ең жақсы таңдауды табуға көмектесемін!",
      sender: "ai",
      timestamp: new Date(),
      suggestions: quickQuestions.slice(0, 3),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes("видеокарта") || lowerMessage.includes("gpu")) {
      return "Ойын үшін NVIDIA RTX 4070 немесе RTX 4080 ұсынамын. Бюджетті нұсқа үшін RTX 4060 Ti жақсы таңдау. Қандай ойындарды ойнайсыз және қандай бюджетіңіз бар?"
    }

    if (lowerMessage.includes("процессор") || lowerMessage.includes("cpu")) {
      return "Intel Core i5-13600K немесе AMD Ryzen 5 7600X ойын үшін тамаша. Жұмыс үшін көп ядро керек болса, i7-13700K немесе Ryzen 7 7700X қарастырыңыз. Қандай мақсатта пайдаланасыз?"
    }

    if (lowerMessage.includes("тышқан") || lowerMessage.includes("mouse")) {
      return "Ойын тышқандары үшін Logitech G502 Hero, Razer DeathAdder V3, немесе SteelSeries Rival 650 ұсынамын. Қандай ойын жанрын ойнайсыз? FPS, MOBA, немесе MMO?"
    }

    if (lowerMessage.includes("пернетақта") || lowerMessage.includes("keyboard")) {
      return "Механикалық пернетақталар үшін Cherry MX, Razer Green, немесе Logitech GX Blue қосқыштарын ұсынамын. Corsair K95, Logitech G915, немесе Razer BlackWidow V4 қарастырыңыз."
    }

    if (lowerMessage.includes("ssd") || lowerMessage.includes("сақтау")) {
      return "Samsung 980 PRO, WD Black SN850X, немесе Crucial P5 Plus NVMe SSD ұсынамын. 1TB жеткілікті, бірақ көп ойын болса 2TB алыңыз. SSD HDD-ден 10 есе жылдам!"
    }

    if (lowerMessage.includes("құлақаспап") || lowerMessage.includes("headset")) {
      return "SteelSeries Arctis 7P, HyperX Cloud II, немесе Logitech G Pro X ұсынамын. Жақсы дыбыс сапасы мен микрофон керек. Сымсыз керек пе?"
    }

    if (lowerMessage.includes("бюджет") || lowerMessage.includes("арзан")) {
      return "Бюджетті жинақ үшін: AMD Ryzen 5 5600 + GTX 1660 Super + 16GB RAM + 500GB SSD. Барлығы шамамен ₸360,000-405,000. Қандай бюджетіңіз бар?"
    }

    return "Қызықты сұрақ! Мен сізге дәл осы өнім туралы толығырақ айтып беремін. Қосымша ақпарат үшін біздің каталогты қарап шығыңыз немесе нақты сұрақ қойыңыз."
  }

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(content),
        sender: "ai",
        timestamp: new Date(),
        suggestions: quickQuestions.filter((q) => !content.toLowerCase().includes(q.toLowerCase())).slice(0, 2),
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Chat Messages */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            AI Көмекшісі
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    {message.suggestions && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickQuestion(suggestion)}
                            className="text-xs"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
      </Card>

      {/* Quick Questions */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Жиі қойылатын сұрақтар</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleQuickQuestion(question)}
                className="justify-start text-left h-auto p-3"
              >
                {question}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product Recommendations */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">Ұсынылатын өнімдер</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {productRecommendations.map((product, index) => {
              const IconComponent = product.icon
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <IconComponent className="h-5 w-5 text-primary" />
                      <Badge variant="secondary">{product.category}</Badge>
                    </div>
                    <h3 className="font-semibold mb-1">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                    <p className="text-lg font-bold text-primary">₸{product.price.toLocaleString()}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Input */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Сұрағыңызды жазыңыз..."
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage(inputValue)
                }
              }}
              disabled={isTyping}
            />
            <Button onClick={() => handleSendMessage(inputValue)} disabled={!inputValue.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
