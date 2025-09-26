"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cpu, Monitor, HardDrive, Gamepad2, Headphones, Star, ShoppingCart, Heart } from "lucide-react"

const productCategories = {
  processors: {
    icon: Cpu,
    title: "Процессорлар",
    products: [
      {
        id: 1,
        name: "Intel Core i9-13900K",
        price: "₸285,000",
        rating: 4.9,
        reviews: 156,
        image: "/intel-i9-processor.jpg",
      },
      {
        id: 2,
        name: "AMD Ryzen 9 7950X",
        price: "₸320,000",
        rating: 4.8,
        reviews: 89,
        image: "/amd-ryzen-processor.jpg",
      },
      {
        id: 3,
        name: "Intel Core i7-13700K",
        price: "₸195,000",
        rating: 4.7,
        reviews: 234,
        image: "/intel-i7-processor.jpg",
      },
    ],
  },
  graphics: {
    icon: Monitor,
    title: "Видеокарталар",
    products: [
      {
        id: 4,
        name: "NVIDIA RTX 4090",
        price: "₸950,000",
        rating: 4.9,
        reviews: 78,
        image: "/nvidia-rtx-4090.jpg",
      },
      {
        id: 5,
        name: "AMD RX 7900 XTX",
        price: "₸485,000",
        rating: 4.6,
        reviews: 45,
        image: "/amd-rx-7900-xtx.jpg",
      },
      {
        id: 6,
        name: "NVIDIA RTX 4080",
        price: "₸675,000",
        rating: 4.8,
        reviews: 123,
        image: "/nvidia-rtx-4080.jpg",
      },
    ],
  },
  storage: {
    icon: HardDrive,
    title: "Сақтау құрылғылары",
    products: [
      {
        id: 7,
        name: "Samsung 980 PRO 2TB",
        price: "₸125,000",
        rating: 4.8,
        reviews: 267,
        image: "/samsung-ssd-nvme.jpg",
      },
      {
        id: 8,
        name: "WD Black SN850X 1TB",
        price: "₸75,000",
        rating: 4.7,
        reviews: 189,
        image: "/western-digital-ssd.png",
      },
      {
        id: 9,
        name: "Seagate FireCuda 4TB",
        price: "₸45,000",
        rating: 4.5,
        reviews: 156,
        image: "/seagate-hdd.jpg",
      },
    ],
  },
  gaming: {
    icon: Gamepad2,
    title: "Gaming жабдықтар",
    products: [
      {
        id: 10,
        name: "Razer DeathAdder V3",
        price: "₸35,000",
        rating: 4.6,
        reviews: 445,
        image: "/razer-gaming-mouse.jpg",
      },
      {
        id: 11,
        name: "SteelSeries Apex Pro",
        price: "₸95,000",
        rating: 4.8,
        reviews: 234,
        image: "/steelseries-mechanical-keyboard.jpg",
      },
      {
        id: 12,
        name: "ASUS ROG Swift PG279Q",
        price: "₸285,000",
        rating: 4.7,
        reviews: 89,
        image: "/asus-gaming-monitor.jpg",
      },
    ],
  },
  audio: {
    icon: Headphones,
    title: "Аудио жабдықтар",
    products: [
      {
        id: 13,
        name: "SteelSeries Arctis 7",
        price: "₸65,000",
        rating: 4.5,
        reviews: 567,
        image: "/steelseries-gaming-headset.jpg",
      },
      {
        id: 14,
        name: "Audio-Technica ATH-M50x",
        price: "₸85,000",
        rating: 4.8,
        reviews: 1234,
        image: "/audio-technica-headphones.jpg",
      },
      {
        id: 15,
        name: "Blue Yeti Microphone",
        price: "₸55,000",
        rating: 4.6,
        reviews: 789,
        image: "/blue-yeti-microphone.jpg",
      },
    ],
  },
}

export function ProductTabs() {
  const [activeTab, setActiveTab] = useState("processors")

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Өнім санаттары</h2>
        <p className="text-muted-foreground">Әр санат бойынша ең жақсы өнімдерді табыңыз</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          {Object.entries(productCategories).map(([key, category]) => {
            const Icon = category.icon
            return (
              <TabsTrigger key={key} value={key} className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{category.title}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {Object.entries(productCategories).map(([key, category]) => (
          <TabsContent key={key} value={key}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.products.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader className="p-4">
                    <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <CardTitle className="text-lg mb-2 line-clamp-2">{product.name}</CardTitle>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium ml-1">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({product.reviews} пікір)</span>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-primary">{product.price}</span>
                      <Badge variant="secondary">Қоймада бар</Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Себетке қосу
                      </Button>
                      <Button variant="outline" size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
