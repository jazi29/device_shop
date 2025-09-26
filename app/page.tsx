import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { PromoSlider } from "@/components/promo-slider"
import { CategoryGrid } from "@/components/category-grid"
import { FeaturedProducts } from "@/components/featured-products"
import { ProductTabs } from "@/components/product-tabs"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <PromoSlider />
        <CategoryGrid />
        <FeaturedProducts />
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <ProductTabs />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
