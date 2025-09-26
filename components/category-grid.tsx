import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Cpu, Monitor, Mouse, Headphones, Keyboard, HardDrive } from "lucide-react"
import Link from "next/link"
import { t } from "@/lib/translations"

const categories = [
  {
    name: t("categories.processors"),
    description: "Intel & AMD процессорлары",
    icon: Cpu,
    href: "/shop?category=processors",
    image: "/modern-cpu-processor-chip.jpg",
  },
  {
    name: t("categories.graphics"),
    description: "RTX & Radeon GPU",
    icon: Monitor,
    href: "/shop?category=graphics",
    image: "/high-end-graphics-card-with-rgb-lighting.jpg",
  },
  {
    name: "Ойын тышқандары",
    description: "Дәлдік пен өнімділік",
    icon: Mouse,
    href: "/shop?category=mice",
    image: "/gaming-mouse-with-rgb-lighting.jpg",
  },
  {
    name: "Құлақаспаптар",
    description: "Аудио сапасы",
    icon: Headphones,
    href: "/shop?category=headsets",
    image: "/gaming-headset-with-microphone.jpg",
  },
  {
    name: "Пернетақталар",
    description: "Механикалық және сымсыз",
    icon: Keyboard,
    href: "/shop?category=keyboards",
    image: "/mechanical-gaming-keyboard-with-rgb.jpg",
  },
  {
    name: t("categories.storage"),
    description: "SSD және қатты дискілер",
    icon: HardDrive,
    href: "/shop?category=storage",
    image: "/nvme-ssd-and-hard-drive-storage.jpg",
  },
]

export function CategoryGrid() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Санат бойынша сатып алу</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Біздің мұқият таңдалған премиум компьютерлік техника коллекциясынан қажетіңізді дәл табыңыз
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <Link key={category.name} href={category.href}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={category.image || "/placeholder.svg"}
                        alt={category.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center gap-2 mb-2">
                          <IconComponent className="h-5 w-5" />
                          <h3 className="text-lg font-semibold">{category.name}</h3>
                        </div>
                        <p className="text-sm text-white/80">{category.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/shop">
            <Button size="lg" variant="outline">
              Барлық санаттарды көру
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
