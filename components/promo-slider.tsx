"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Zap, Shield, Truck } from "lucide-react"
import Link from "next/link"

const promos = [
  {
    id: 1,
    title: "Қара жұма жеңілдігі",
    subtitle: "Видеокарталарға 40% дейін жеңілдік",
    description: "Ең соңғы RTX және Radeon карталарын теңдесі жоқ бағамен алыңыз",
    cta: "Видеокарталарды сатып алу",
    href: "/shop?category=graphics",
    icon: Zap,
    gradient: "from-primary/20 to-accent/20",
  },
  {
    id: 2,
    title: "Тегін жеткізу",
    subtitle: "₸135,000-нан жоғары тапсырыстарға",
    description: "Есігіңізге дейін жылдам және қауіпсіз жеткізу",
    cta: "Қазір сатып алу",
    href: "/shop",
    icon: Truck,
    gradient: "from-accent/20 to-primary/20",
  },
  {
    id: 3,
    title: "Кеңейтілген кепілдік",
    subtitle: "3 жылдық қорғау жоспары",
    description: "Толық қамтумен тыныштық",
    cta: "Толығырақ білу",
    href: "/about",
    icon: Shield,
    gradient: "from-primary/10 to-accent/30",
  },
]

export function PromoSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promos.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promos.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promos.length) % promos.length)
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {promos.map((promo) => {
              const IconComponent = promo.icon
              return (
                <div key={promo.id} className="w-full flex-shrink-0">
                  <div className={`bg-gradient-to-r ${promo.gradient} p-8 lg:p-12 text-center`}>
                    <div className="max-w-2xl mx-auto space-y-6">
                      <div className="flex justify-center">
                        <div className="p-3 bg-primary/20 rounded-full">
                          <IconComponent className="h-8 w-8 text-primary" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h2 className="text-3xl lg:text-4xl font-bold text-foreground">{promo.title}</h2>
                        <p className="text-xl text-primary font-semibold">{promo.subtitle}</p>
                        <p className="text-muted-foreground">{promo.description}</p>
                      </div>
                      <Link href={promo.href}>
                        <Button size="lg" className="mt-4">
                          {promo.cta}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
            onClick={nextSlide}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {promos.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? "bg-primary" : "bg-primary/30"
                }`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
