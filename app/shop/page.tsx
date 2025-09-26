import { Navigation } from "@/components/navigation"
import { ProductCatalog } from "@/components/product-catalog"
import { Footer } from "@/components/footer"

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <ProductCatalog />
      </main>
      <Footer />
    </div>
  )
}
