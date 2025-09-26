import { Navigation } from "@/components/navigation"
import { ShoppingCartPage } from "@/components/shopping-cart-page"
import { Footer } from "@/components/footer"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <ShoppingCartPage />
      </main>
      <Footer />
    </div>
  )
}
