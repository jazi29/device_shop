import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AIChatInterface } from "@/components/ai-chat-interface"

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">AI Көмекшісі</h1>
            <p className="text-xl text-muted-foreground">Біздің AI көмекшісі сізге дұрыс өнімді таңдауға көмектеседі</p>
          </div>
          <AIChatInterface />
        </div>
      </main>
      <Footer />
    </div>
  )
}
