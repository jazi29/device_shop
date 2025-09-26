"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { t } from "@/lib/translations"
import { useCart } from "@/components/cart-provider"

const featuredProducts = [
  {
    id: "1",
    name: "Intel Core i9-14900K",
    price: 265000,
    originalPrice: 292000,
    rating: 4.8,
    reviews: 124,
    image: "/intel-core-i9-processor-in-packaging.jpg",
    category: "Процессорлар",
    badge: "Ең сатылатын",
  },
  {
    id: "2",
    name: "NVIDIA RTX 4080 Super",
    price: 450000,
    originalPrice: 540000,
    rating: 4.9,
    reviews: 89,
    image: "/nvidia-rtx-4080-graphics-card.jpg",
    category: "Видеокарталар",
    badge: "Жеңілдік",
  },
  {
    id: "3",
    name: "Logitech G Pro X Superlight",
    price: 67500,
    rating: 4.7,
    reviews: 256,
    image: "/logitech-gaming-mouse-white.jpg",
    category: "Ойын тышқандары",
    badge: "Жаңа",
  },
  {
    id: "4",
    name: "Samsung 980 PRO 2TB NVMe",
    price: 90000,
    originalPrice: 112500,
    rating: 4.6,
    reviews: 178,
    image: "/samsung-nvme-ssd-drive.jpg",
    category: "Сақтау құрылғылары",
    badge: "Танымал",
  },
]

export function FeaturedProducts() {
  const { dispatch } = useCart()

  const addToCart = (product: (typeof featuredProducts)[0]) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      },
    })
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">{t("featured.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("featured.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge
                    variant={product.badge === "Жеңілдік" ? "destructive" : "secondary"}
                    className="absolute top-2 left-2"
                  >
                    {product.badge}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                  <h3 className="font-semibold text-foreground line-clamp-2">{product.name}</h3>

                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-foreground">₸{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₸{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <Button className="w-full" onClick={() => addToCart(product)}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {t("catalog.addToCart")}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/shop">
            <Button size="lg">Барлық өнімдерді көру</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
